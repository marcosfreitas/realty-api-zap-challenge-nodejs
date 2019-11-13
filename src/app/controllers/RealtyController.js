let ControllerAbstract = require('./ControllerAbstract');
let RealtyService = require('../services/RealtyService');

/**
 * A simple controller, that inherit methods from a Abstract class and can override them.
 * Here, I removed the layer of Models from this project because I have not a database. So, The Controller is calling service classes instead.
 */
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
