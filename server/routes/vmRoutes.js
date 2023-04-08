const router = require('express').Router();
const vmController = require('../controllers/vmController/vmSignin');
const salonController = require('../controllers/vmController/salonController')
const bookingController = require('../controllers/vmController/bookingController')
const verifyToken = require('../middleware/vm.verifyToken')

router.post('/signin', vmController.signin);
router.get('/approve', verifyToken, vmController.isApproved)
router.post('/salon', verifyToken, salonController.addSalon)
router.get('/salons', verifyToken, salonController.getSalons)
router.get('/salon/:id', salonController.getSalon)
router.put('/salon', salonController.updateSalon)
router.put('/salon/block', verifyToken, salonController.changeBlock)

router.get('/bookings',verifyToken, bookingController.getBookings)

router.put('/profile', verifyToken, vmController.updateProfile)


module.exports = router;