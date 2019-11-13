/**
 * In O.O. An abstract class can't be instantiate directly, so it serves main Controllers those can override the inherit methods.
 */
class ControllerAbstract {

  constructor() {
    this.service = null;
  }

  index = function(req,res) {

      let page = req.query.page ? req.query.page : 1;
      let filters = req.query.filters ? req.query.filters : {};

      /**
       * This method receive params from query string. Actually just filtering by network and paginating results.
       */
      this.service.search(page, filters, function(error, data) {

          // very basic verification of returned error
          if (error.length) {
            return res.send(error);
          }

          /**
          * @info difference between text/html and application/json responses
          */
          return res.send(data);
      });
  };

}

module.exports = ControllerAbstract;
