'use strict';

module.exports = function() {
    return {
        // :D buon ngu roi cac ban nho ak T.T, mk se su dung nhieu ham anonymous function nhe :D
        signUpValidation: (req, res, next) => {
            // Doan nay chi la check roi hien thi thoi rat easy nhe :D
            req.checkBody('username', 'Username is Required!').notEmpty();
            req.checkBody('username', 'Username must not be less than 5 characters!').isLength({min: 5});
            req.checkBody('email', 'Email is Required!').notEmpty();
            req.checkBody('email', 'Email is Invalid').isEmail();
            req.checkBody('password', 'Password is Required!').notEmpty();
            req.checkBody('password', 'Password must not be less than 5').isLength({min: 5});

            // Chung ta dem ra hien thi vs cai ben tren thoi :D
            req.getValidationResult().then((result) => {
                const errors = result.array();
                const messages = [];
                // duyet mang errors va day cac messages ben tren vao trong mang de hien thi ra ngoai man hinh giao dien
                errors.forEach((error) => {
                    messages.push(error.msg);
                });

                // phai trung vs flash setup nhe moi ng. mk de la error con cac ban de gi phai tu ghi vao
                req.flash('error', messages);
                res.redirect('/signup');
            }).catch((err) => {
                return next();
            });
        }
    }
}