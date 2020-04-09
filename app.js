var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { config, engine } = require('express-edge');
const fileUpload = require("express-fileupload");
var edge = require("edge.js");
var mongoose = require('mongoose')
var bodyParser = require("body-parser");
var connectMongo = require("connect-mongo");
var expressSession = require("express-session");
const flash = require('express-flash');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mentorsRouter = require('./routes/mentors');
var partnersRouter = require('./routes/partners');
var galleryRouter = require('./routes/gallery');
var servicesRouter = require('./routes/services');
var loginRouter = require('./routes/loginPage');
var applyRouter = require('./routes/apply');
var signUpRouter = require('./routes/signup');
var storeUserRouter = require("./routes/storeUser");
var loginUserRouter = require('./routes/loginUser');
var logoutRouter = require('./routes/logout');
var storeApplicationRouter = require("./routes/storeApplication");
var previewApplication = require("./routes/previewApplication");
var listApplicationsRouter = require("./routes/listApplications");
var updateApplicationRouter = require("./routes/updateApplication");
var myApplicationsRouter = require("./routes/myApplications");

var app = express();

const mongoStore = connectMongo(expressSession);

app.use(
  expressSession({
    secret: "secret",
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

//connect to mongodb
mongoose
  .connect("mongodb://localhost/HitamEDC", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.use(fileUpload());
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(engine);
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("*", (req, res, next) => {
  edge.global("auth", req.session.userId);
  edge.global("admin", req.session.email == "admin@hitamedc.com");
  next();
});

const auth = require("./middleware/auth");
const admin = require("./middleware/admin");

app.use('/', indexRouter);
app.use('/mentors', mentorsRouter);
app.use('/partners', partnersRouter);
app.use('/gallery', galleryRouter);
app.use('/services', servicesRouter);
app.use('/users', usersRouter);
app.use('/apply', applyRouter);
app.get('/loginPage', loginRouter);
app.get('/registerPage', signUpRouter);
app.post('/storeUser', storeUserRouter);
app.post('/loginUser', loginUserRouter);
app.get('/logout', logoutRouter);
app.post('/storeApplication', storeApplicationRouter);
app.get('/preview/:id', previewApplication);
app.get('/listApplications', auth, admin, listApplicationsRouter);
app.get('/update/:id/:code/:status', auth, admin, updateApplicationRouter);
app.get('/myApplications', myApplicationsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
