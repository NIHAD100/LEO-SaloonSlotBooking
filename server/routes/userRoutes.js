const router = require('express').Router();
const userController = require('../controllers/userController/userSignin&Signup');
const vmController = require('../controllers/userController/vmController')
const salonController = require('../controllers/userController/salonController')

const verifyToken = require('../middleware/user.verifyToken')

router.post('/signup', userController.userSignup)
router.post('/signin', userController.userSignin)
router.post('/mobileExist', userController.mobileExist)
router.get('/getUser', userController.getUser)
router.get('/forgotPwd/mobileExist', userController.MobileExistForForgot)
router.post('/forgotPwd', userController.newPassSet)

router.post('/signin/google', userController.googleSignin)

router.post('/vmMobile', vmController.mobileExist)
router.post('/vmSignup', vmController.vmSignup)

router.get('/venues/:district', salonController.getSalons)
router.get('/venue/:_id', salonController.getSalon)

router.post('/bookedSlot', salonController.getBookedSlots)

router.post('/book', verifyToken, salonController.bookSalon)
router.post('/verifyPayment', verifyToken, salonController.verifyPayment)
router.put('/changeName',verifyToken,userController.setName)

// router.put('/profile',verifyToken,userController.updateProfile)


module.exports = router;