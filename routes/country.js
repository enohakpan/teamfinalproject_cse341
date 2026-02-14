const express = require('express');
const router = express.Router();
const countryController = require('../controllers/country');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', countryController.getAllData);
router.get('/:id', isAuthenticated, countryController.getData);
router.post('/', isAuthenticated, countryController.createData);
router.put('/:id', isAuthenticated, countryController.updateData);
router.delete('/:id', isAuthenticated, countryController.deleteData);

module.exports = router;