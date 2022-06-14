const express = require ('express');
const { authController } = require ('../controllers')
const router = express.Router();
const passport = require('../lib/passport')
const restrict = require ('../middleware/restrict');
const restrictjwt = require('../middleware/restrictjwt');

// router.get('/', (req, res) => res.send('Server On'))
router.get('/register', authController.formRegister);
router.get('/login', authController.formLogin);
router.post('/register', authController.register);
router.post('/login', passport.authenticate('local', {
    successRedirect:"/auth/whoami",
    failureRedirect:"/login",
    failureFlash: true,
}));
router.get('/whoami', restrict, authController.whoami)

///JWT
router.post('/registerplayer', authController.registerPlayer);
router.get('/player', restrictjwt, authController.viewPlayerUser);
router.post('/loginplayer', authController.loginPlayer);
router.get('/profilplayer', restrictjwt, authController.profilPlayer);

module.exports = router;