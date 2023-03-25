const router = require('express').Router();
const userController = require('../controllers/userController/userSignin&Signup');
const vmController = require('../controllers/userController/vmController')
const venueController = require('../controllers/userController/venueController')

router.post('/signup',userController.userSignup)
router.post('/signin',userController.userSignin)
router.post('/mobileExist',userController.mobileExist)
router.get('/getUser',userController.getUser)
router.get('/forgotPwd/mobileExist',userController.MobileExistForForgot)
router.post('/forgotPwd',userController.newPassSet)

router.post('/vmMobile',vmController.mobileExist)
router.post('/vmSignup',vmController.vmSignup)

router.get('/venues/:district',venueController.getVenues)
router.get('/venue/:_id',venueController.getVenue)

module.exports = router;