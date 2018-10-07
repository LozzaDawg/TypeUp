const express = require('express');
const todoController = require('./controllers/todoController');
const authRoutes = require('./controllers/auth-routes');

const app = express();

//set up template engine 
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));
app.use('/auth', authRoutes);

//fire controllers
todoController(app);

app.get('/home', function(req,res){
  res.render('home')
});
app.get('/profile', function(req,res){
  res.render('profile')
});
app.get('/type', function(req,res){
  res.render('type')
});



//listen to port
app.listen(1000, () => {
  console.log('listening to port 1000');
});
