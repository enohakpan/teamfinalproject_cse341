const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/african');
const { isAuthenticated }= require('../middleware/authenticate');

router.get('/', recipeController.getAllData);
router.get('/:id', recipeController.getData);
router.post('/', recipeController.createData);
router.put('/:id', recipeController.updateData);
router.delete('/:id', recipeController.deleteData);

module.exports = router;