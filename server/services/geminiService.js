import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.warn('GEMINI_API_KEY is not set. GeminiService will not function.');
}

const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-1.5-flash"}) : null; // Or your preferred model

export const generateMealPlan = async (promptContent) => {
    if (!model) throw new Error('Gemini model not initialized. Check API Key.');
    try {
        const result = await model.generateContent(promptContent);
        const response = result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating meal plan with Gemini:', error);
        throw new Error('Failed to generate meal plan from Gemini');
    }
};

export const getIngredientSubstitutions = async (promptContent) => {
    if (!model) throw new Error('Gemini model not initialized. Check API Key.');
    try {
        const result = await model.generateContent(promptContent);
        const response = result.response;
        return response.text();
    } catch (error) {
        console.error('Error getting ingredient substitutions with Gemini:', error);
        throw new Error('Failed to get ingredient substitutions from Gemini');
    }
};

export const getCookingTips = async (promptContent) => {
    if (!model) throw new Error('Gemini model not initialized. Check API Key.');
    try {
        const result = await model.generateContent(promptContent);
        const response = result.response;
        return response.text();
    } catch (error) {
        console.error('Error getting cooking tips with Gemini:', error);
        throw new Error('Failed to get cooking tips from Gemini');
    }
}; 