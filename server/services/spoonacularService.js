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

export const searchRecipesSpoonacular = async (query, cuisine, diet, intolerances, number = 10) => {
    try {
        const params = {
            query,
            cuisine,
            diet,
            intolerances,
            number,
            addRecipeInformation: true,
        };
        Object.keys(params).forEach(key => (params[key] === undefined || params[key] === '') && delete params[key]);

        const response = await spoonacularApi.get('/recipes/complexSearch', { params });
        return response.data;
    } catch (error) {
        console.error('Spoonacular API search error:', error.response ? error.response.data : error.message);
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