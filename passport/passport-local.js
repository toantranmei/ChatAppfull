// Remember require a file to server Example: require('./passport/passport-local');

const passport = require('passport');
const User = require('../models/users');
const localStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
})

// make code signup
passport.use('local.signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({
        'email': email
    }, (err, user) => {
        if (err) {
            return done(err);
        } else if (user) {
            return done(null, false, req.flash('error', 'User with email already exitst!')); // check ki trong helpers
        }

        const newUser = new User();

        newUser.username = req.body.username;
        newUser.password = newUser.encryptPassword(req.body.password);
        newUser.email = req.body.email;

        newUser.save((err) => {
            done(null, newUser);
        })
    })
}));