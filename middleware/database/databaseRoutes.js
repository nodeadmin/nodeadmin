
module.exports = function(router) {

  router.route('/').get(function(req, res){
    res.send('eyyyy in db');
  });

};

