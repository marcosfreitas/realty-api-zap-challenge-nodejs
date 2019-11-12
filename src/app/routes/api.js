const router = global.router;

router.get('/status', function (req, res) {
    res.json({"working" : true});
});

let RealtyController = require('../../app/controllers/RealtyController');
let RealtyControllerInstance = new RealtyController();

router.get('/realty', function(req, res) {
  return RealtyControllerInstance.index(req,res);
});


module.exports = router;
