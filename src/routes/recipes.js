const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/recipeController')

router.get('/recipes', recipeController.index);
router.get('/recipes/new', recipeController.new);
router.post("/recipes/create", recipeController.create);
router.get("/recipes/:id", recipeController.show);
router.post('/recipes/:id/destroy', recipeController.destroy);
router.get("/recipes/:id/edit", recipeController.edit);
router.post('/recipes/:id/update', recipeController.update);

module.exports = router;