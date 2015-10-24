var jwt = require('jsonwebtoken');

var tokenCheck = function (req, res, next) {
  'use strict';
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, req.app.locals.secret, function (err, decoded) {
      console.log(decoded);
      if (err) {
        res.status(403).json({
          error: err
        });
      }
      next();
    });
  }
};

module.exports = tokenCheck;

