import express from 'express';
import {
    getFavoriteRecipes,
    addFavoriteRecipe,
    removeFavoriteRecipe
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/favorites')
    .get(protect, getFavoriteRecipes)
    .post(protect, addFavoriteRecipe);

router.route('/favorites/:recipeId')
    .delete(protect, removeFavoriteRecipe);

export default router; 