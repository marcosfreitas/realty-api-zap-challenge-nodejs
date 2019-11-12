module.exports = function(app) {

  /**
  * Preparing required modules
  */
  global.express = require('express');
  global.router = express.Router();

  const dotenv = require('dotenv');
  dotenv.config();

  const { check, validationResult } = require('express-validator');
  global.app = express();

  app = global.app;

  /**
  * Extras
  */
  app.use(express.urlencoded({
      extended : true
  }));
  app.use(express.json());

  /**
  * View Engine
  */
  // app.set('view engine', 'ejs');
  // app.set('views', './app/views');

  /**
  * Assets
  */

  // app.use(express.static('./app/public'));

  app.use(express.json());
  app.use(function (err, req, res, next) {
      console.error(err.stack);
      res.status(500).send('Whoops! Something went wrong');
  });

  /**
  * Routes
  */
  const api = require('../app/routes/api');

  app.use('/api', api);

  app.listen(2000, function(){
      console.log('server listening at port 2000');
  });

};
