const router = require("express").Router();
const controller = require('../controllers/auth.controller');

router.post('/register', controller.postRegistrationData);

router.post('/login',controller.postLoginData );

//auth with react-login  
router.post('/oauthlogin', controller.postOuthLogin);

module.exports = router;