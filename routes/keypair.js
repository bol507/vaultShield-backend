const router = require('express').Router();
const keypairController =  require('../controllers/keypairController');

router.get('/',keypairController.getKeyPairByUser)

module.exports = router