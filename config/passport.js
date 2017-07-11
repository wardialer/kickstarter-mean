const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user');

module.exports = ((passport) => {
// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

// used to deserialize the user
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with username
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true, // allows us to pass back the entire request to the callback
    },
        (req, username, password, done) => {
            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(() => {
                // we are checking to see if the user trying to login already exists
                User.findOne({ username }, (err, user) => {
                    if (err) {
                        return done(err);
                    }

                    // check to see if theres already a user with that username
                    if (user) {
                        return done(null, false, { message: 'That username is already taken.' });
                    }
                    // if there is no user with that username
                    // create the user
                    const newUser = new User();

                    newUser.username = username;
                    newUser.password = newUser.generateHash(password);

                    return newUser.save((errNewUser) => {
                        if (errNewUser) {
                            throw errNewUser;
                        }
                        return done(null, newUser);
                    });
                });
            });
        }));

// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true, // allows us to pass back the entire request to the callback
    },
        (req, username, password, done) => {
            // we are checking to see if the user trying to login already exists
            User.findOne({ username }).select('+password').exec((err, user) => {
                // if there are any errors, return the error before anything else
                if (err) {
                    return done(err);
                }

                // if no user is found, return the message
                if (!user) {
                    return done(null, false, { message: 'No user found.' });
                }

                // if the user is found but the password is wrong
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Oops! Wrong password.' });
                }

                // all is well, return successful user
                return done(null, user);
            });
        }));
});
