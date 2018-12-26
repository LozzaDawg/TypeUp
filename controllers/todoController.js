var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://test:test99@ds157422.mlab.com:57422/website-data')
var urlencodedParser = bodyParser.urlencoded({extended:false});

//Create schema - blueprint
var todoSchema = new mongoose.Schema({
  item: String
})

var TodoObj = mongoose.model('TodoObj', todoSchema)

module.exports = function(app){

  app.get('/todo', function(req,res){
    //get data from Mongo and pass to view
    TodoObj.find({}, function(err,data){
      if(err) throw err;
      res.render('todo',{todos:data});
    })
  });

  app.post('/todo', urlencodedParser, function(req,res){
    //get data from view and add to Mongo
    var newTodo = TodoObj(req.body);
    newTodo.save(function(err,data){
      if(err) throw err;
      res.json(data);
    })
  });

  app.delete('/todo/:item', function(req,res){
    //delete requested item from Mongo
    TodoObj.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
      if (err) throw err;
      res.json(data);
    });
  });
};
