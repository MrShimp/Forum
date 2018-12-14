var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var productsRouter = require('./routes/products');
var topicsRouter = require('./routes/topics');

var app = express();

//mongodb
var mongodbfunc = require('./models/mongodbfunc');



//ejs  use html
var ejs = require('ejs');
app.engine('html', ejs.__express);
app.set('view engine', 'html')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/products', productsRouter);
app.use('/topics', topicsRouter);

//my router
/*
app.get('/login', function(req, res){
	res.send('login');
});
*/
app.get('/home', function(req, res){
	res.send('home');
})


//session settings
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var identityKey = 'key';

app.use(session({
	name : identityKey,
	secret : 'name1', 
	store : new FileStore(), 
	resave : false, 
	saveUninitialized: true,
	cookie : {
		maxAge: 60*1000
	}
}));
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

//users
var users = require('./usersinfo').items;

/*
function findUser(name, password){
	return users.find(function(item){
		return item.name === name && item.password ===password;
	});
};
*/

/*
//login
app.post('/login', function(req, res, next){
	var sess = req.session;
	//var user = findUser(req.body.name, req.body.password);
	//var user = userfunc.findUser(req.body.name, req.body.password);
	
	var user_login_status = function(err, ans){
		ans_name = ans[0].username
		ans_password = ans[0].password
		console.log(ans_name, ans_password);
		if (ans_name === req.body.name && ans_password === req.body.password){
			req.session.regenerate(function(err){
				if(err){
					return res.json({ret_code: 2, ret_msg: 'login failed'});
				}
			req.session.loginUser = ans_name;
			res.json({ret_code: 0, ret_msg: 'login succeeded'});
			});
		}else{
			res.json({ret_code: 1, ret_msg: 'name or pswd error'})
		};
	};
	userfunc.findUser(req.body.name, req.body.password, user_login_status);
});
//logout
app.get('/logout', function(req, res, next){
	req.session.destroy(function(err){
		if(err){
			res.json({ret_code: 2, ret_msg: 'logout error'});
			return;
		}
		res.clearCookie(identityKey);
		res.redirect('/login');
	});
});

app.get('/login', function(req, res, next){
	

	var sess = req.session;
	var loginUser = sess.loginUser;
	var isLogin = !!loginUser;
	//use html
	res.render('login.html', {
		title: 'HTML',
		isLogin: isLogin,
		name: loginUser || ''
	});
});
*/

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


//socket status
app.get('/status', function(req, res, next){
	var sess = req.session;
	res.json((sess));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
