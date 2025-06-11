import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import authRoutes from './routes/auth.js';
import pantryRoutes from './routes/pantry.js';
import recipeRoutes from './routes/recipes.js';
import aiRoutes from './routes/ai.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

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
        "default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://spoonacular.com https://img.spoonacular.com; connect-src 'self' ws: wss: https://api.spoonacular.com https://generativelanguage.googleapis.com https://overpass-api.de;"
    );
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const csrfProtection = csurf({ 
  cookie: true,
  ignoreMethods: ['GET', 'HEAD', 'OPTIONS']
});

// Apply CSRF protection for every request. Since ignoreMethods already contains
// GET, HEAD and OPTIONS, normal page/API fetches will not be blocked, but any
// state-changing request (POST, PUT, DELETE, PATCH) must provide the token.
app.use(csrfProtection);

// Expose the token to the client in both a cookie (useful for automatic axios
// handling) and in JSON for manual handling.
app.use((req, res, next) => {
  if (typeof req.csrfToken === 'function') {
    try {
      const csrfToken = req.csrfToken();
      res.cookie('XSRF-TOKEN', csrfToken);
    } catch (err) {
      // Ignore errors here; csurf will handle token validation on protected routes
    }
  }
  next();
});

app.get('/api/csrf-token', (req, res) => {
  const csrfToken = typeof req.csrfToken === 'function' ? req.csrfToken() : null;
  res.json({ csrfToken });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/pantry', pantryRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/users', userRoutes);

// serve static files from client/dist
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'client/dist')));

// serve index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}); 