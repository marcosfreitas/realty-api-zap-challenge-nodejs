let ControllerAbstract = require('./ControllerAbstract');
let RealtyService = require('../services/RealtyService');

class RealtyController extends ControllerAbstract {
    constructor () {
        // Here, it calls the parent class' constructor
        super();

        // @info In derived classes, super() must be called before you
        // can use 'this'. Leaving this out will cause a reference error.
        this.service = new RealtyService();
    };

}

module.exports = RealtyController;
