import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import authRoutes from './routes/auth.js';
import pantryRoutes from './routes/pantry.js';
import recipeRoutes from './routes/recipes.js';
import aiRoutes from './routes/ai.js';

dotenv.config();
connectDB();

const app = express();

// CSP Middleware
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy", 
        "default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://spoonacular.com; connect-src 'self' ws: wss: https://api.spoonacular.com https://generativelanguage.googleapis.com;"
    );
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const csrfProtection = csurf({ cookie: true }); //csrf protection for security
app.use(csrfProtection);
app.use((req, res, next) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/pantry', pantryRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Pantry Pal Server!');
});

app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        console.warn('CSRF token validation failed for request:', req.path);
        res.status(403).json({ message: 'Invalid CSRF token. Please refresh the page or try again.' });
    } else {
        next(err);
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}); 