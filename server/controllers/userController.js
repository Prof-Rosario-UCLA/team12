import User from '../models/User.js';
import mongoose from 'mongoose';
import { getBulkRecipeInformationSpoonacular } from '../services/spoonacularService.js';
import { getCache, setCache } from '../services/cacheService.js';

// @desc    Get user's favorite recipes (full details)
// @route   GET /api/users/favorites
// @access  Private
export const getFavoriteRecipes = async (req, res) => {
    const userId = req.user.id;
    const cacheKey = `user_favorites_details_${userId}`;

    try {
        const cachedRecipeDetails = await getCache(cacheKey);
        if (cachedRecipeDetails) {
            console.log('Serving favorite recipe details from cache:', cacheKey);
            return res.json(cachedRecipeDetails);
        }
        console.log('Cache miss for favorite recipe details:', cacheKey);

        const user = await User.findById(userId).select('favoritedRecipes');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.favoritedRecipes && user.favoritedRecipes.length > 0) {
            const recipeDetails = await getBulkRecipeInformationSpoonacular(user.favoritedRecipes);
            await setCache(cacheKey, recipeDetails, 3600);
            res.json(recipeDetails);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error('Error getting favorite recipes details:', error);
        res.status(500).json({ message: 'Server error fetching favorite recipe details' });
    }
};

// @desc    Add a recipe to favorites
// @route   POST /api/users/favorites
// @access  Private
export const addFavoriteRecipe = async (req, res) => {
    const { recipeId } = req.body;
    const userId = req.user.id;

    if (!recipeId || typeof recipeId !== 'number') {
        return res.status(400).json({ message: 'Numeric recipeId is required' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.favoritedRecipes.includes(recipeId)) {
            return res.status(200).json({ message: 'Recipe already in favorites', favoritedRecipes: user.favoritedRecipes });
        }

        user.favoritedRecipes.push(recipeId);
        await user.save();
        await setCache(`user_favorites_details_${userId}`, null, 1);
        res.status(201).json(user.favoritedRecipes);
    } catch (error) {
        console.error('Error adding favorite recipe:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Remove a recipe from favorites
// @route   DELETE /api/users/favorites/:recipeId
// @access  Private
export const removeFavoriteRecipe = async (req, res) => {
    const recipeId = parseInt(req.params.recipeId, 10);
    const userId = req.user.id;

    if (isNaN(recipeId)) {
        return res.status(400).json({ message: 'Numeric recipeId parameter is required' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const initialLength = user.favoritedRecipes.length;
        user.favoritedRecipes = user.favoritedRecipes.filter(id => id !== recipeId);

        if (user.favoritedRecipes.length === initialLength) {
            return res.status(404).json({ message: 'Recipe not found in favorites' });
        }

        await user.save();
        await setCache(`user_favorites_details_${userId}`, null, 1);
        res.json(user.favoritedRecipes);
    } catch (error) {
        console.error('Error removing favorite recipe:', error);
        res.status(500).json({ message: 'Server error' });
    }
}; 