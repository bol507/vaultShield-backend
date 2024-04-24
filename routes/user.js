const router = require('express').Router();
const userController =  require('../controllers/userController');


router.get('/',userController.getUser)
router.delete('/',userController.deleteUser)
router.put('/',userController.updateUser)

module.exports = router