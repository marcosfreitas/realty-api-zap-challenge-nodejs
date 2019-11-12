class ControllerAbstract {
  constructor() {
    this.service = null;
  }

  index = function(req,res) {

      this.service.all(function(error, data) {
          /**
          * @info difference between text/html and application/json responses
          */
          res.send(data);
      });
  };

}

module.exports = ControllerAbstract;
