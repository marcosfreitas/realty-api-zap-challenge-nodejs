const axios = require('axios').default;
const fs = require('fs');

/**
 * Service classes maintain the Business Logic.
 * Services don't know about requests and responses or databases, they just do something.
 * Here, each method do just one or few things related to orchestrate this Service class.
 *
 */
class RealtyService {

    constructor() {

      this.data_source = [];
      /**
       * At first byte, the data source is requested and stored into a local json because it's consume a lot of resource..
       */
      this.setDataSource();

    }

    setDataSource = async function() {
      try {

        if (!fs.existsSync('./source.json')) {

          console.log('Wait, i am just storing this large source...');

          const response = await axios.get(process.env.ZAP_SOURCE);

          this.data_source = response.data;

          fs.writeFileSync('./source.json', JSON.stringify(this.data_source), 'utf8', function(err) {
            if (err) {
              console.log('could not save source response');
              return err;
            }

            console.log('source file saved @ '+ Date.now());
          });

        } else {

          console.log('I am loading that source from file...');

          this.data_source = JSON.parse(fs.readFileSync('./source.json'));
        }

      } catch (error) {
        console.error(error);
      }
    }

    /**
     * Simple search by network. Can be extended.
     */
    search = function(page, filters, callback) {

      let network  = filters.network ? filters.network : null;

      let results = this.getByNetwork(network);
      results = this.paginateResults(page, results);

      callback([],results);
    }

    /**
     * Contain generic Rules applied to the business
     */
    checkSingleSourceForOtherRules = function(source) {

      if (
        source.address.geoLocation.location.lon === 0 ||
        source.address.geoLocation.location.lat === 0
      ) {
        console.log('not passed basic coordinates', source.address);
        return false;
      }

      return true;
    }

    /**
     *  Auto calculate boundaries with some rules.
     */
    checkForBoundingBoxLimit = function(source, network) {

      let percent_assert_value = -10;

      if (network === 'viva-real') {
        percent_assert_value = 50;
      }

      /**
       * Current bounding box of GRUPO ZAP
       */
      if (
        !(
          source.address.geoLocation.location.lon >= -46.693419 &&
          source.address.geoLocation.location.lon <= -46.641146 &&
          source.address.geoLocation.location.lat >= -23.568704 &&
          source.address.geoLocation.location.lat <= -23.546686
        )
      ) {
        console.log('not passed zap boundaries', source);
        return false;
      }

      /**
       * calculating the minimum percentage of bounding box based on source' location coordinates
       * -10% for ZAP
       * +50% for VIVA Real
       */
      let lon_calculated_percentage = (percent_assert_value/100) * (source.address.geoLocation.location.lon * -1);
      let lat_calculated_percentage = (percent_assert_value/100) * (source.address.geoLocation.location.lat * -1);

      /**
       * Rechecking boundaries
       */

       // for zap
      if (
        network === 'zap' &&
        !(
          source.address.geoLocation.location.lon >= lon_calculated_percentage &&
          source.address.geoLocation.location.lon <= -46.641146 &&
          source.address.geoLocation.location.lat >= lat_calculated_percentage &&
          source.address.geoLocation.location.lat <= -23.546686
        )
      ) {
        console.log('not attend adjust of location', [source.address, lon_calculated_percentage, lat_calculated_percentage]);

        return false;
      }

       // for viva real
       if (
        network !== 'zap' &&
        !(
          source.address.geoLocation.location.lon >= -46.693419 &&
          source.address.geoLocation.location.lon <= lon_calculated_percentage &&
          source.address.geoLocation.location.lat >= -23.568704 &&
          source.address.geoLocation.location.lat <= lat_calculated_percentage
        )
      ) {
        return false;
      }

      console.log('passed bounding box');
      return true;

    }

    /**
     * Pre-existent rules for ZAP, refactored.
     */
    getByZAPRules = function() {

      let self = this;

      let filtered = this.data_source.filter(function(source, index) {
        console.log(index);

        if (!self.checkSingleSourceForOtherRules(source)) {
          return false;
        }

        if (
          source.pricingInfos.businessType === 'RENTAL' &&
          source.pricingInfos.rentalTotalPrice >= 3500
        ) {
          console.log('attend rental',source.pricingInfos);
          return true;
        }

        if (
          source.pricingInfos.businessType === 'SALE' &&
          source.pricingInfos.price >= 600000 &&
          source.usableAreas > 3500 &&
          self.checkForBoundingBoxLimit(source, 'zap')
        ) {
          console.log('attend sale',source);
          return true;
        }

        return false;

      });

      return filtered;

    }

    /**
     * Pre-existent rules for VIVA Real, refactored.
     */
    getByVIVARealRules = function() {

      let self = this;

      let filtered = this.data_source.filter(function(source, index) {

        // Added this index, to the response just for follow paginated results and easy comparison.
        source.index = index;

        if (!self.checkSingleSourceForOtherRules(source)) {
          return false;
        }

        if (
          source.pricingInfos.businessType === 'RENTAL' &&
          source.pricingInfos.rentalTotalPrice <= 4000
        ) {

            /**
             * Check if the monthly condominium fee exceeds 30% of the rental total price.
             */
            if (typeof source.pricingInfos.monthlyCondoFee === "undefined" || isNaN(source.pricingInfos.monthlyCondoFee)) {
              return false;
            }

            let limit_condo_fee_percentage = (30/100) * source.pricingInfos.rentalTotalPrice;

            if (source.pricingInfos.monthlyCondoFee >= limit_condo_fee_percentage) {
              return false;
            }

            if (!self.checkForBoundingBoxLimit(source, 'viva-real')) {
              return false;
            }

            return true;
          }

          if (
            source.pricingInfos.businessType === 'SALE' &&
            source.pricingInfos.price <= 700000
          ) {
            return true;
          }

          return false;
      });

      return filtered;

    }

    /**
     * Centralize call of filters by network
     */
    getByNetwork = function(network) {

      if (network === 'zap') {
        return this.getByZAPRules();
      }

      if (network === 'viva-real') {
        return this.getByVIVARealRules();
      }
    }

    /**
     * Very simple pagination, sorry.
     */
    paginateResults = function(page, results) {
      let results_per_page = 20;
      let total_pages = Math.floor(results.length/results_per_page);
      let paginated_results = [];

      if (!total_pages) {
        total_pages = 0;
      }

      if (results.length <= results_per_page) {
        total_pages = 1;
      }

      if (page <= total_pages && results.length > 0) {
          let removed_items = results.splice(0,(page*results_per_page));
          // just for meaning
          paginated_results = results;
      }

      return {
        'pageNumber' : page,
        'pageSize' : results_per_page,
        'totalCount' : total_pages,
        'listings' : paginated_results
      };

    }
}

module.exports = RealtyService;
