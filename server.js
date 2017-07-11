const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const http = require('http');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const routes = require('./app/routes');
const db = require('./config/database');

const app = express();
const port = process.env.PORT || 80;

mongoose.connect(db.url);
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));
app.use(cookieParser()); // read cookies (needed for auth)

app.use(session({
    secret: '$J_8ZaV-Sbls[>jt@F6$!B=nJV1{5C?s', // session secret
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('./config/passport')(passport);

// routes ==================================================
app.use('/', routes);

// start app ===============================================
http.createServer(app).listen(port);
console.log(`The magic happens on port ${port}`);
