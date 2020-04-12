const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
require('dotenv').config()
var User = require('../models/user')
var Message = require('../models/message')
const bcrypt = require('bcryptjs')

exports.index = function(req, res, next){
	Message.find()
		.populate('user')
		.exec((err, messages) => {
			if(err) { return next(err)}
			res.render('home-page', {title:'Roaster Club', messages:messages})
		})
}

exports.signUp_form_get = function(req, res, next){
	res.render('sign-up-form', {title:"Sign Up Form"})
}

exports.signUp_form_post =  [
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
    	// Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
        	console.log(errors,"**errror occured")
        	req.flash("error", "Error while creating new  Account" );
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('sign-up-form', { title: 'Sign Up Form' });
            return;
        } else {

        	var is_Admin = req.body.isAdmin === 'on' ? true : false
        	console.log(is_Admin)
        	bcrypt.hash(req.body.confirmPassword, 10, (err, hashPassword) => {
				if(err){ return next(err)}
				var user = new User(
			    	{
			    		first_name: req.body.first_name,
			    		last_name : req.body.last_name,
			    		username  : req.body.username,
			    		password  : hashPassword,
			    		admin     : is_Admin
			    }).save((err,user) => {
				    	if (err) { return next(err) };
				    	console.log(user.username,"user saved")
				    	req.flash("success", "Account created succesfully! LOGIN to continue!" );
				    	res.render("join-the-club", {title:"Join the Club", user:user.username, id:user._id});
				})
        	})
    	}
	}
]

exports.join_the_club_get  = (req, res, next) => {
	User.findById(req.params.id, function(err, user){
		if(err) {return next()}
		res.render("join-the-club", {title:"Join the Club", user:user})
	})
	
}
exports.join_the_club_post = (req, res, next) => {
	if( req.body.adminPW === process.env.adminPW){
		User.findByIdAndUpdate(req.body.userid, {$set:{membership_status:'Active', _id:req.body.userid}}, function(err, updatedUser){
			req.flash("success", "You have joined the club succesfully!" );
			res.redirect('/')
		})
	} else {
		User.findById(req.params.id, function(err, user){
			if(err) {return next()}
			req.flash("error", "Wrong Password for admin" );
			res.render("join-the-club", {title:"Join the Club", user:user})
		})
	}
}

exports.login_form_get = (req, res, next) => {
	res.render('login-form', {title: 'login form'})
}

exports.create_message_get = (req, res, next) => {
	res.render('new-msg-form',{title:'Create new Message'})
}

exports.create_message_post = [
	body('title')
		.isLength({ min: 1 })
		.trim()
		.withMessage('title must be specified.'),
	body('message')
		.isLength({ min: 2 })
		.trim()
		.withMessage('U must leave a message'),
	sanitizeBody('title').escape(),
    sanitizeBody('message').escape(),

    (req, res, next) => {
    	// Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
        	console.log(errors,"**errror occured")
        	req.flash("error", "Error while creating new  message! try again!" );
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('new-msg-form', { title: 'Create new Message' });
            return;
        } else {
        	var new_msg = new Message(
	        	{
	        		title: req.body.title,
	        		text : req.body.message,
	        		user: req.body.userid
	        	})

        	new_msg.save((err, msg) => {
        		if(err) { return next(err)}
        		req.flash("success", "Message posted succesfully!" );
        		res.redirect('/')
        	})
        }
    }
]

exports.delete_message_get = (req, res, next) => {
	res.render('delete-msg-form',{title:'Delete Message', msgid:req.params.id})
}

exports.delete_message_post = (req, res, next) => {
	Message.findByIdAndRemove(req.body.del_msg, (err) => {
		if(err) { return next(err)}
			//#flash SUCCESSE message
			res.redirect('/')
	})
}