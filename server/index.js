import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import authRoutes from './routes/auth.js';
import pantryRoutes from './routes/pantry.js';
import recipeRoutes from './routes/recipes.js';
import aiRoutes from './routes/ai.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();

// Enable CORS for the client origin
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

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

// Temporarily disable CSRF for development
// const csrfProtection = csurf({ 
//   cookie: true,
//   ignoreMethods: ['GET', 'HEAD', 'OPTIONS']
// });

// app.use((req, res, next) => {
//   if (req.path === '/api/csrf-token' || req.path === '/') {
//     return next();
//   }
//   csrfProtection(req, res, next);
// });

// app.use((req, res, next) => {
//     if (req.csrfToken) {
//         res.cookie('XSRF-TOKEN', req.csrfToken());
//     }
//     next();
// });

app.use('/api/auth', authRoutes);
app.use('/api/pantry', pantryRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Pantry Pal Server!');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}); 