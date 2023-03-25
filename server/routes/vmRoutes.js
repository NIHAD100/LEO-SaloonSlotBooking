const router = require('express').Router();
const vmController = require('../controllers/vmController/vmSignin');
const saloonController = require('../controllers/vmController/saloonController')

const verifyToken = require('../middleware/vm.verifyToken')

router.post('/signin', vmController.signin);
router.post('/saloon/add',verifyToken,saloonController.addSaloon)

router.get('/venues',verifyToken,saloonController.getSaloons)
router.put('/venues/block',verifyToken,saloonController.changeBlock)

module.exports = router;