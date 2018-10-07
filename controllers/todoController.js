var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://test:test99@ds157422.mlab.com:57422/website-data')

//Create schema - blueprint
var todoSchema = new mongoose.Schema({
  item: String
})

var Todo = mongoose.model('Todo', todoSchema)

var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){

  app.get('/todo', function(req,res){
    //get data from Mongo and pass to view
    Todo.find({}, function(err,data){
      if(err) throw err;
      res.render('todo',{todos:data})
    })
  });

  app.post('/todo', urlencodedParser, function(req,res){
    //get data from view and add to Mongo
    var newTodo = Todo(req.body).save(function(err,data){
      if(err) throw err;
      res.json(data)
    })
  });

  app.delete('/todo/:item', function(req,res){
    //delete requested item from Mongo
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
      if (err) throw err;
      res.json(data);
    });
  });
};
