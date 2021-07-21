const express = require('express');
const router = express.Router();

const Sauce = require('../models/Sauce');
const controllers = require('../controllers/stuff');

router.post('/', controllers.createSauce);
router.get('/', controllers.getAllSauce);
router.get('/:id', controllers.getOneSauce);
router.put('/:id', controllers.modifySauce);
router.delete('/:id', controllers.deleteSauce);

module.exports = router;