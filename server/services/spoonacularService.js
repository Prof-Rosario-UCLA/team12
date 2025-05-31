import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com';

const spoonacularApi = axios.create({
    baseURL: SPOONACULAR_BASE_URL,
    params: {
        apiKey: SPOONACULAR_API_KEY,
    },
});

export const searchRecipesSpoonacular = async (query, ingredients, cuisine, diet, intolerances, number = 10) => {
    try {
        let response;
        const commonParams = {
            number,
            apiKey: SPOONACULAR_API_KEY,
        };

        if (ingredients) {
            const params = {
                ...commonParams,
                ingredients,
                ranking: 2,
                ignorePantry: true,
            };
            Object.keys(params).forEach(key => (params[key] === undefined || params[key] === '') && delete params[key]);
            
            console.log('Searching Spoonacular by ingredients with params:', params);
            response = await spoonacularApi.get('/recipes/findByIngredients', { params });
        } else if (query) {
            const params = {
                ...commonParams,
                query,
                cuisine,
                diet,
                intolerances,
                addRecipeInformation: true,
            };
            Object.keys(params).forEach(key => (params[key] === undefined || params[key] === '') && delete params[key]);

            console.log('Searching Spoonacular by complex query with params:', params);
            response = await spoonacularApi.get('/recipes/complexSearch', { params });
        } else {
            console.log('No ingredients or query provided for recipe search.');
            return [];
        }
        
        return response.data;
    } catch (error) {
        const errorMsg = error.response ? error.response.data : error.message;
        console.error('Spoonacular API search error:', errorMsg);
        if (error.response && error.response.status === 401) {
            throw new Error('Spoonacular API Key is invalid or unauthorized. Please check server .env configuration.');
        }
        throw new Error('Failed to fetch recipes from Spoonacular');
    }
};

export const getRecipeInformationSpoonacular = async (recipeId) => {
    try {
        const response = await spoonacularApi.get(`/recipes/${recipeId}/information`);
        return response.data;
    } catch (error) {
        console.error(`Spoonacular API get recipe info error for ID ${recipeId}:`, error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch recipe details from Spoonacular');
    }
};

export const getBulkRecipeInformationSpoonacular = async (ids) => {
    if (!ids || ids.length === 0) {
        return [];
    }
    try {
        const response = await spoonacularApi.get(`/recipes/informationBulk`, {
            params: {
                ids: ids.join(','),
            }
        });
        return response.data;
    } catch (error) {
        console.error('Spoonacular API get bulk recipe info error:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch bulk recipe details from Spoonacular');
    }
}; 