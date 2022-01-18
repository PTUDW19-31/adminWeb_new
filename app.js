const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars')
const express_handlebars_sections = require('express-handlebars-sections');
const session = require('express-session');
const passport = require('./auth/passport');
const app = express();
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');

const authRouter = require('./auth/authRouter');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./components/products/index');
const accountsRouter = require('./components/accounts/index');
const billsRouter = require('./components/bills/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine(
  '.hbs',
  exphbs.engine({
      extname :'hbs',
      helpers: require('./helper/handlebar'),
      handlebars: allowInsecurePrototypeAccess(Handlebars),
      layoutsDir: 'views',
      defaultLayout: 'layout',
  })
);
express_handlebars_sections(exphbs);
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
})

app.use('/editAccount', accountsRouter);
app.use('/editProduct', productsRouter);
app.use('/manageBill', billsRouter);
app.use('/users', usersRouter);
app.use('/dashboard', indexRouter);
app.use('/', authRouter);



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
