'use strict';

module.exports = function(_, passport, User) {

    return {
        setRouting: function(router) {
            // GET
            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp);
            router.get('/home', this.homePage);

            // POST
            router.post('/signup',User.signUpValidation , this.postSignUp);

        },

        indexPage: function(req, res) {
            return res.render('index', {test: 'This is test funny!!!'});
        },

        getSignUp: function(req, res) {
            // tao bien error luu lai cac gia tri da day vao mang o file user(ext)helpers
            const errors = req.flash('error');
            return res.render('signup', {title: 'Sky Albert | Login', messages: errors, hasErrors: errors.length > 0});
        },

        postSignUp: passport.authenticate('local.signup', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }),

        homePage: function(req, res) {
            return res.render('home');
        }
    }
}