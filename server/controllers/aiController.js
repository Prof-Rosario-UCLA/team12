import {
    generateMealPlan as geminiGenerateMealPlan,
    getIngredientSubstitutions as geminiGetIngredientSubstitutions,
    getCookingTips as geminiGetCookingTips
} from '../services/geminiService.js';
import { getCache, setCache } from '../services/cacheService.js';

// @desc    generate a meal plan based on user preferences
// @route   POST /api/ai/meal-plan
// @access  private
export const generateMealPlan = async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required for meal plan generation.' });
    }
    const cacheKey = `meal_plan_gemini_${encodeURIComponent(prompt.substring(0, 100))} `;
    try {
        const cachedResult = await getCache(cacheKey);
        if (cachedResult) {
            return res.json({ mealPlan: cachedResult });
        }

        const mealPlan = await geminiGenerateMealPlan(prompt);
        await setCache(cacheKey, mealPlan, 3600 * 6); // cache it for 6 hrs
        res.json({ mealPlan });
    } catch (error) {
        console.error('AI Meal Plan generation error:', error);
        res.status(500).json({ message: 'Failed to generate meal plan' });
    }
};

// @desc    get ingredient substitution suggestions
// @route   POST /api/ai/substitutions
// @access  private
export const getIngredientSubstitutions = async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required for substitutions.' });
    }
    const cacheKey = `substitutions_gemini_${encodeURIComponent(prompt.substring(0, 100))} `;
    try {
        const cachedResult = await getCache(cacheKey);
        if (cachedResult) {
            return res.json({ substitutions: cachedResult });
        }
        const substitutions = await geminiGetIngredientSubstitutions(prompt);
        await setCache(cacheKey, substitutions, 3600 * 24); //cache for 24 hrs
        res.json({ substitutions });
    } catch (error) {
        console.error('AI Ingredient Substitutions error:', error);
        res.status(500).json({ message: 'Failed to get ingredient substitutions' });
    }
};

// @desc    get cooking tips for a dish
// @route   POST /api/ai/cooking-tips
// @access  private
export const getCookingTips = async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required for cooking tips.' });
    }
    const cacheKey = `cookingtips_gemini_${encodeURIComponent(prompt.substring(0, 100))} `;
    try {
        const cachedResult = await getCache(cacheKey);
        if (cachedResult) {
            return res.json({ tips: cachedResult });
        }
        const tips = await geminiGetCookingTips(prompt);
        await setCache(cacheKey, tips, 3600 * 24); //cache for 24 hrs
        res.json({ tips });
    } catch (error) {
        console.error('AI Cooking Tips error:', error);
        res.status(500).json({ message: 'Failed to get cooking tips' });
    }
}; 