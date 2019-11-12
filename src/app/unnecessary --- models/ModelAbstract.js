class ModelAbstract {
  constructor() {
      this.service = null;
  }

  all = function(callback) {
      return this.service.all();
  };

  get = function(filter, callback) {
  };
  /*
  store = function(data, callback) {
      console.log('store'+this.model+' called');
      let model = this.repository(data);
      model.save(callback);
  };

  deleteMany = function(filter, callback) {
      console.log('deleteMany'+this.model+' called');
      this.repository.deleteMany(filter, callback);
  };

  deleteOne = function(filter, callback) {
      console.log('deleteOne'+this.model+' called');
      this.repository.deleteOne(filter, callback);
  };
  update = function(filter, data, callback) {
      console.log('update'+this.model+' called');
      let model = this.repository;
      model.findOneAndUpdate(filter, data, {"new": true}, callback);
  };
  */
}

module.exports = ModelAbstract;
