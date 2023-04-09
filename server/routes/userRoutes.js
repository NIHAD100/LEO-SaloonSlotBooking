const router = require('express').Router();
const userController = require('../controllers/userController/userSignin&Signup');
const vmController = require('../controllers/userController/vmController')
const salonController = require('../controllers/userController/salonController')
const bookingController = require('../controllers/userController/bookingController')

const verifyToken = require('../middleware/user.verifyToken')

router.post('/signup', userController.userSignup)
router.post('/signin', userController.userSignin)
router.post('/mobileExist', userController.mobileExist)
router.get('/getUser', userController.getUser)
router.get('/forgotPwd/mobileExist', userController.MobileExistForForgot)
router.post('/forgotPwd', userController.newPassSet)

router.post('/signin/google', userController.googleSignin)
router.put('/changeName', verifyToken, userController.setName)

router.post('/vmMobile', vmController.mobileExist)
router.post('/vmSignup', vmController.vmSignup)

router.get('/venues/:district', salonController.getSalons)
router.get('/venue/:_id', salonController.getSalon)

router.post('/bookedSlot', salonController.getBookedSlots)
router.post('/book', verifyToken, bookingController.bookSalon) //
router.post('/verifyPayment', verifyToken, bookingController.verifyPayment) //

router.get(`/booking/:bookingId/refund`, verifyToken, bookingController.refundToWallet)

router.get('/bookings', verifyToken, bookingController.getBookings) //


module.exports = router;