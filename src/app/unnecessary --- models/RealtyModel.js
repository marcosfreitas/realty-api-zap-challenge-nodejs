const ModelAbstract = require('./ModelAbstract');
let RealtyService

class RealtyModel extends ModelAbstract {
    constructor (conn) {
        // Here, it calls the parent class' constructor
        super(conn);
        // @info In derived classes, super() must be called before you
        // can use 'this'. Leaving this out will cause a reference error.
        this.model = 'vouchers';
    }

}

module.exports = RealtyModel;
