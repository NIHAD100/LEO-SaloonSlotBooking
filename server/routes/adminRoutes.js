const router = require('express').Router();
const adminController = require('../controllers/adminController/adminLogin');
const userController = require('../controllers/adminController/userController');
const vmController = require('../controllers/adminController/vmController');
const salonController = require('../controllers/adminController/salonController');
const verifyToken = require('../middleware/admin.verifyToken');
const bookingController = require('../controllers/adminController/BookingController');

router.post('/signin', adminController.adminLogin);
router.get('/', verifyToken, adminController.getDashboardDetails)

router.get('/users', userController.getUsers)
router.put('/users/blockStatus/:_id', userController.blockUser)

router.get('/vm', vmController.getVms)
router.put('/vm/blockStatus/:_id', vmController.blockVm)
router.put('/vm/status', verifyToken, vmController.changeStatus);

router.get('/bookings', verifyToken, bookingController.getBookings)

router.get('/salon', salonController.getSalon)
router.put('/salon/approve', verifyToken, salonController.approve);
router.delete('/salon/:id', verifyToken, salonController.deleteSalon)
router.put('/salon/block', verifyToken, salonController.changeBlock)
router.get('/salon/:_id', verifyToken, salonController.getPerSalon)


module.exports = router;