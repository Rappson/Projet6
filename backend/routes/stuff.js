const express = require('express');
const router = express.Router();

const controllers = require('../controllers/stuff');
const auth = require('../middleware/auth');

router.post('/', auth, controllers.createSauce);
router.get('/', auth, controllers.getAllSauce);
router.get('/:id', auth, controllers.getOneSauce);
router.put('/:id', auth, controllers.modifySauce);
router.delete('/:id', auth, controllers.deleteSauce);

module.exports = router;