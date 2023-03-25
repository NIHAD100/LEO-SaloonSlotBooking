const router = require('express').Router();
const adminController = require('../controllers/adminController/adminLogin');
const userController = require('../controllers/adminController/userController');
const vmController = require('../controllers/adminController/vmController');
const saloonController = require('../controllers/adminController/saloonController');
const verifyToken = require('../middleware/admin.verifyToken');

router.post('/signin', adminController.adminLogin);

router.get('/users',userController.getUsers)
router.put('/users/blockStatus/:_id',userController.blockUser)

router.get('/vm',vmController.getVms)
router.put('/vm/blockStatus/:_id',vmController.blockVm)
router.put('/vm/approve/:_id',vmController.approve);
router.delete('/vm/:_id',vmController.deleteVm)


router.get('/venue',saloonController.getVenue)
router.put('/venue/approve',verifyToken,saloonController.approve);
router.put('/venue/block',verifyToken,saloonController.changeBlock)
router.delete('/venue/:_id',verifyToken,saloonController.deleteTurf)
router.get('/venue/:_id',verifyToken,saloonController.getPerSaloon)


module.exports = router;