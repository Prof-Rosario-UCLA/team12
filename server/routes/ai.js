import express from 'express';
import {
    generateMealPlan,
    getIngredientSubstitutions,
    getCookingTips
} from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/meal-plan', protect, generateMealPlan);
router.post('/substitutions', getIngredientSubstitutions);
router.post('/cooking-tips', getCookingTips);

export default router; 