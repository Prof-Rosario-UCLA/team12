import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pantry: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PantryItem'
    }],
    favoriteRecipes: [String]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User; 