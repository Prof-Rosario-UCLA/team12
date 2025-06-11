import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        // required: false, // Email is optional
        // unique: true, // If making unique, ensure proper error handling for duplicates
        trim: true,
        lowercase: true,
        // match: [/.+\@.+\..+/, 'Please fill a valid email address'] // Optional: Add email validation regex
    },
    pantryItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PantryItem'
    }],
    favoritedRecipes: [{
        type: Number, // Storing Spoonacular recipe IDs (which are numbers)
    }]
    // `createdAt` and `updatedAt` are automatically added by `timestamps: true`
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare password for login
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User; 