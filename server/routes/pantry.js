import express from 'express';
import {
    getPantryItems,
    addPantryItem,
    getPantryItemById,
    updatePantryItem,
    deletePantryItem
} from '../controllers/pantryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getPantryItems)
    .post(protect, addPantryItem);

router.route('/:id')
    .get(protect, getPantryItemById)
    .put(protect, updatePantryItem)
    .delete(protect, deletePantryItem);

export default router; 