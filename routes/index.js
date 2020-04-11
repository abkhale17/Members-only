var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController')
const passport = require("passport");

router.get('/', indexController.index)

router.get('/sign_up', indexController.signUp_form_get)

router.post('/sign_up', indexController.signUp_form_post)

router.post('/join_the_club', indexController.join_the_club_post)

router.get('/login', indexController.login_form_get)

router.post('/login', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
)

router.get("/log-out", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get('/create-message', indexController.create_message_get)

router.post('/create-message', indexController.create_message_post)

router.get('/:id/delete-message', indexController.delete_message_get)

router.post('/:id/delete-message', indexController.delete_message_post)

module.exports = router;
