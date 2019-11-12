const axios = require('axios').default;

class RealtyService {

    getDataSource = async function() {
      try {
        return await axios.get(process.env.ZAP_SOURCE);
      } catch (error) {
        console.error(error);
      }
    }

    all = function(callback) {

      const response = this.getDataSource();

      response
        .then(function (response) {

          // @bug let payload = this.getPayloadMetadata(response.data,1);

          callback([], response.data);
        })
        .catch(function (error) {
          callback(error, []);
        })
      ;
    }

    getPayloadMetadata = function(data, page) {

      return {
        "pageNumber": page,
        "pageSize": data.length / 12,
        "totalCount": data.length,
      }

    }

}

module.exports = RealtyService;
