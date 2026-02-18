const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/african');
const { isAuthenticated }= require('../middleware/authenticate');

router.get('/', recipeController.getAllData);
router.get('/:id', isAuthenticated, recipeController.getData);
router.post('/', isAuthenticated, recipeController.createData);
router.put('/:id', isAuthenticated, recipeController.updateData);
router.delete('/:id', isAuthenticated, recipeController.deleteData);

module.exports = router;