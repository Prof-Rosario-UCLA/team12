import PantryItem from '../models/PantryItem.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

// @desc    Get all pantry items for a user
// @route   GET /api/pantry
// @access  Private
export const getPantryItems = async (req, res) => {
    try {
        const pantryItems = await PantryItem.find({ userId: req.user._id });
        res.json(pantryItems);
    } catch (error) {
        console.error('Error fetching pantry items:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Add a new pantry item
// @route   POST /api/pantry
// @access  Private
export const addPantryItem = async (req, res) => {
    const { name, quantity, unit, expirationDate } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: 'Name is required and must be a string' });
    }
    if (quantity === undefined || typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({ message: 'Quantity is required and must be a positive number' });
    }
    if (!unit || typeof unit !== 'string') {
        return res.status(400).json({ message: 'Unit is required and must be a string' });
    }
    if (expirationDate && isNaN(new Date(expirationDate).getTime())) {
        return res.status(400).json({ message: 'Invalid expiration date format' });
    }

    try {
        const pantryItem = new PantryItem({
            name,
            quantity,
            unit,
            expirationDate: expirationDate ? new Date(expirationDate) : null,
            userId: req.user._id,
        });
        const createdItem = await pantryItem.save();

        const user = await User.findById(req.user._id);
        if (user) 
        {
            user.pantry.push(createdItem._id);
            await user.save();
        }

        res.status(201).json(createdItem);
    } catch (error) {
        console.error('Error adding pantry item:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get a single pantry item by ID
// @route   GET /api/pantry/:id
// @access  Private
export const getPantryItemById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid item ID format' });
        }
        const pantryItem = await PantryItem.findById(req.params.id);

        if (!pantryItem) {
            return res.status(404).json({ message: 'Pantry item not found' });
        }

        if (pantryItem.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to access this item' });
        }

        res.json(pantryItem);
    } catch (error) {
        console.error('Error fetching single pantry item:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update a pantry item
// @route   PUT /api/pantry/:id
// @access  Private
export const updatePantryItem = async (req, res) => {
    const { name, quantity, unit, expirationDate } = req.body;

    if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
        return res.status(400).json({ message: 'Name must be a non-empty string if provided' });
    }
    if (quantity !== undefined && (typeof quantity !== 'number' || quantity <= 0)) {
        return res.status(400).json({ message: 'Quantity must be a positive number if provided' });
    }
    if (unit !== undefined && (typeof unit !== 'string' || unit.trim() === '')) {
        return res.status(400).json({ message: 'Unit must be a non-empty string if provided' });
    }
    if (expirationDate !== undefined && expirationDate !== null && isNaN(new Date(expirationDate).getTime())) {
        return res.status(400).json({ message: 'Invalid expiration date format if provided' });
    }

    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid item ID format' });
        }
        const pantryItem = await PantryItem.findById(req.params.id);

        if (!pantryItem) {
            return res.status(404).json({ message: 'Pantry item not found' });
        }

        if (pantryItem.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this item' });
        }

        if (name !== undefined) pantryItem.name = name;
        if (quantity !== undefined) pantryItem.quantity = quantity;
        if (unit !== undefined) pantryItem.unit = unit;
        if (expirationDate !== undefined) pantryItem.expirationDate = expirationDate ? new Date(expirationDate) : null;

        const updatedItem = await pantryItem.save();
        res.json(updatedItem);
    } catch (error) {
        console.error('Error updating pantry item:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete a pantry item
// @route   DELETE /api/pantry/:id
// @access  Private
export const deletePantryItem = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid item ID format' });
        }
        const pantryItem = await PantryItem.findById(req.params.id);

        if (!pantryItem) {
            return res.status(404).json({ message: 'Pantry item not found' });
        }

        if (pantryItem.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this item' });
        }

        await pantryItem.deleteOne();

        const user = await User.findById(req.user._id);
        if (user) {
            user.pantry = user.pantry.filter(itemId => itemId.toString() !== req.params.id);
            await user.save();
        }

        res.json({ message: 'Pantry item removed' });
    } catch (error) {
        console.error('Error deleting pantry item:', error);
        res.status(500).json({ message: 'Server error' });
    }
}; 