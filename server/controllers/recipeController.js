import User from '../models/User.js';
import {
    searchRecipesSpoonacular,
    getRecipeInformationSpoonacular,
    getBulkRecipeInformationSpoonacular
} from '../services/spoonacularService.js';
import {
    getCache,
    setCache,
    deleteCacheByPattern
} from '../services/cacheService.js';

// @desc    Search for recipes
// @route   GET /api/recipes/search
// @access  Public
export const searchRecipes = async (req, res) => {
    const { query, ingredients, cuisine, diet, intolerances, number } = req.query;
    
    const cacheKeyObject = {
        query,
        ingredients,
        cuisine,
        diet,
        intolerances,
        number
    };
    Object.keys(cacheKeyObject).forEach(key => cacheKeyObject[key] === undefined && delete cacheKeyObject[key]);
    const cacheKey = `recipes_search_${JSON.stringify(cacheKeyObject)}`;

    try {
        const cachedResults = await getCache(cacheKey);
        if (cachedResults) {
            console.log("Serving search from cache:", cacheKey);
            return res.json(cachedResults);
        }
        console.log("Cache miss for search:", cacheKey);

        const results = await searchRecipesSpoonacular(
            query, 
            ingredients, 
            cuisine, 
            diet, 
            intolerances, 
            number ? parseInt(number) : undefined
        );
        await setCache(cacheKey, results, 3600);  // cache for 1 hr
        res.json(results);
    } catch (error) {
        console.error('Recipe search error:', error);
        res.status(500).json({ message: 'Failed to search recipes' });
    }
};

// @desc    Get details for a specific recipe
// @route   GET /api/recipes/:id
// @access  Public
export const getRecipeDetails = async (req, res) => {
    const { id } = req.params;
    const cacheKey = `recipe_details_${id}`;

    try {
        const cachedRecipe = await getCache(cacheKey);
        if (cachedRecipe) {
            return res.json(cachedRecipe);
        }

        const recipeDetails = await getRecipeInformationSpoonacular(id);
        await setCache(cacheKey, recipeDetails, 3600 * 24); // cache for 24 hrs
        res.json(recipeDetails);
    } catch (error) {
        console.error('Get recipe details error:', error);
        res.status(500).json({ message: 'Failed to get recipe details' });
    }
};

// @desc    Add a recipe to user's favorites
// @route   POST /api/recipes/favorites
// @access  Private
export const addFavoriteRecipe = async (req, res) => {
    const { recipeId } = req.body;
    const userId = req.user._id;
    if (!recipeId) {
        return res.status(400).json({ message: 'Recipe ID is required' });
    }
    try {
        const user = await User.findById(userId);
        if (!user)
        {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.favoriteRecipes.includes(String(recipeId))) 
        {
            user.favoriteRecipes.push(String(recipeId));
            await user.save();
            await deleteCacheByPattern(`user_favorites_${userId}*`);
            res.status(200).json({ message: 'Recipe added to favorites', favoriteRecipes: user.favoriteRecipes });
        } else {
            res.status(400).json({ message: 'Recipe already in favorites' });
        }
    } catch (error) {
        console.error('Add favorite recipe error:', error);
        res.status(500).json({ message: 'Failed to add favorite recipe' });
    }
};

// @desc    Remove a recipe from user's favorites
// @route   DELETE /api/recipes/favorites/:recipeId
// @access  Private
export const removeFavoriteRecipe = async (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        if (!user) 
        {
            return res.status(404).json({ message: 'User not found' });
        }

        const initialLength = user.favoriteRecipes.length;
        user.favoriteRecipes = user.favoriteRecipes.filter(id => id.toString() !== recipeId.toString());

        if (user.favoriteRecipes.length < initialLength) 
        {
            await user.save();
            await deleteCacheByPattern(`user_favorites_${userId}*`);
            res.status(200).json({ message: 'Recipe removed from favorites', favoriteRecipes: user.favoriteRecipes });
        } else {
            res.status(404).json({ message: 'Recipe not found in favorites' });
        }
    } catch (error) {
        console.error('Remove favorite recipe error:', error);
        res.status(500).json({ message: 'Failed to remove favorite recipe' });
    }
};

// @desc    Get user's favorite recipes
// @route   GET /api/recipes/favorites
// @access  Private
export const getFavoriteRecipes = async (req, res) => {
    const userId = req.user._id;
    const cacheKey = `user_favorites_${userId}`;

    try {
        const cachedFavorites = await getCache(cacheKey);
        if (cachedFavorites) {
            return res.json(cachedFavorites);
        }

        const user = await User.findById(userId).select('favoriteRecipes');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.favoriteRecipes && user.favoriteRecipes.length > 0) {
            const recipeDetails = await getBulkRecipeInformationSpoonacular(user.favoriteRecipes);
            await setCache(cacheKey, recipeDetails, 3600); // cache for 1 hr
            res.json(recipeDetails);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error('Get favorite recipes error:', error);
        res.status(500).json({ message: 'Failed to get favorite recipes' });
    }
}; 