var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController')

router.get('/', (req,res) => res.send('home page'))

router.get('/sign_up', indexController.signUp_form_get)

router.post('/sign_up', indexController.signUp_form_post)

module.exports = router;
