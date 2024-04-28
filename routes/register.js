const router = require('express').Router();
const registerController = require('../controllers/registerController')

router.post('/',registerController.createRegister)
router.get('/',registerController.getRegisters)
module.exports = router