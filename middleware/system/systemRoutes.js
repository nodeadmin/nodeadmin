
module.exports = function(router) {
  router.route('/modules')
    .get(function (req, res){
      res.send('eyyyy in system');
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json({error: err});
    });
};
