var express = require('express');
const path = require('path');
const router = express.Router();
const { parse } = require('querystring');
var cookieparse=require('cookie-parser')

var app= express()
app.use(express.static('res'));
app.set("view engine", "ejs"); 
app.set("views", __dirname + "/res/");
app.use(cookieparse())

//App Routing Functions start
router.get('/',function(req,res){
	res.render('login')
})

router.get('/register',function(req,res){
	res.setHeader('Content-type','text/html')
	res.render('register')
})

router.get('/index',function(req,res){
	if(req.cookies['auth']=='true' ){
	res.render('index',{
		user:req.cookies['user']
	})
	}
	else{
		res.render('unauth')
	}
})

router.get('*',function(req,res){
	res.render('404')
})

app.use('/',router);

app.listen(process.env.PORT || 8080)