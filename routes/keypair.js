const router = require('express').Router();
const keypairController =  require('../controllers/keypairController');

router.get('/',keypairController.getKeyPairByUser)
router.post('/',keypairController.createKeyPairByUser)

module.exports = router