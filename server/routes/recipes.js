import express from 'express';
import {
    searchRecipes,
    getRecipeDetails,
    addFavoriteRecipe,
    removeFavoriteRecipe,
    getFavoriteRecipes
} from '../controllers/recipeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/search', searchRecipes);
router.get('/:id', getRecipeDetails);

router.route('/favorites')
    .post(protect, addFavoriteRecipe)
    .get(protect, getFavoriteRecipes);

router.delete('/favorites/:recipeId', protect, removeFavoriteRecipe);

export default router; 