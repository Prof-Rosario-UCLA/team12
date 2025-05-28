import mongoose from 'mongoose';

const pantryItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    expirationDate: {
        type: Date,
        optional: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const PantryItem = mongoose.model('PantryItem', pantryItemSchema);

export default PantryItem; 