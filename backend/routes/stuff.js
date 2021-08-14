const express = require('express');
const router = express.Router();


const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const controllers = require('../controllers/stuff');

router.post('/', auth, multer, controllers.createSauce);
router.get('/', auth, controllers.getAllSauce);
router.get('/:id', auth, controllers.getOneSauce);
router.put('/:id', auth, multer, controllers.modifySauce);
router.delete('/:id', auth, controllers.deleteSauce);

module.exports = router;