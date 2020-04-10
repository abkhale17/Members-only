const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var User = require('../models/user')
const bcrypt = require('bcryptjs')

exports.signUp_form_get = function(req, res, next){
	res.render('sign-up-form', {title:"Sign Up Form"})
}

exports.signUp_form_post =  [
	(req, res, next) => {
		console.log(req.body, "**1**")
		next();
	},
	body('first_name')
		.isLength({ min: 1 })
		.trim()
		.withMessage('First name must be specified.')
        .isAlphanumeric()
        .withMessage('First name has non-alphanumeric characters.'),
    body('last_name')
    	.isLength({ min: 1 })
    	.trim()
    	.withMessage('last name must be specified.')
    	.isAlphanumeric()
    	.withMessage('last name has non-alphanumeric characters.'),
    body('username')
		.isLength({ min: 1 })
		.trim()
		.withMessage('username must be specified.'),
	body('password').exists(),
	body('confirmPassword', 'passwordConfirmation field must have the same value as the password field')
		.exists()
		.custom((value, { req }) => value === req.body.password),

    sanitizeBody('first_name').escape(),
    sanitizeBody('last_name').escape(),
    sanitizeBody('username').escape(),
    sanitizeBody('password').escape(),
    sanitizeBody('confirmPassword').escape(),

    (req, res, next) => {
    	console.log(req.body, "**2**")
    	// Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
        	console.log("**errror occured")

        	// Flash error messages implementation
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('sign-up-form', { title: 'Sign Up Form' });
            return;
        } else {

        	bcrypt.hash(req.body.confirmPassword, 10, (err, hashPassword) => {
				if(err){ return next(err)}
				var user = new User(
			    	{
			    		first_name: req.body.first_name,
			    		last_name : req.body.last_name,
			    		username  : req.body.username,
			    		password  : hashPassword
			    }).save(err => {
				    	if (err) { return next(err) };
				    	console.log("user saved")
				    	res.redirect("/");
				})
        	})
    	}
	}
]