# Pantry Pal

A full-stack Progressive Web App that helps users manage their pantry, discover recipes, and plan meals using AI-powered recommendations.

## Features

- **Pantry Management**: Add, edit, and track pantry items with expiration dates
- **Recipe Discovery**: Search and browse recipes from Spoonacular API
- **AI-Powered Meal Planning**: Generate personalized meal plans using Google's Gemini AI
- **Favorites System**: Save and manage favorite recipes
- **Ingredient Substitutions**: Get AI-powered ingredient substitution suggestions
- **Progressive Web App**: Installable app with offline capabilities
- **WebAssembly Integration**: Fuzzy ingredient matching for better recipe discovery
- **CSRF Protection**: Secure API endpoints with CSRF token validation

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **React Router** for navigation
- **Axios** for API communication
- **WebAssembly** for fuzzy matching

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Redis** for caching
- **JWT** for authentication
- **bcrypt** for password hashing
- **CSRF protection** with csurf
- **Google Gemini AI** integration

### Deployment
- **Google App Engine** for hosting
- **MongoDB Atlas** for database
- **Redis Cloud** for caching

## 📋 Prerequisites

- Node.js 20+
- npm or yarn
- MongoDB Atlas account
- Google Cloud Platform account (for deployment)
- Spoonacular API key
- Google Gemini API key
- Redis Cloud account (optional)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Prof-Rosario-UCLA/team12.git
cd team12
```

### 2. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Environment Setup

Create a `.env` file in the `server` directory:

```env
# Database
MONGO_URI=your_mongodb_atlas_connection_string
REDIS_URL=your_redis_cloud_url

# Authentication
JWT_SECRET=your_jwt_secret_key

# External APIs
SPOONACULAR_API_KEY=your_spoonacular_api_key
GEMINI_API_KEY=your_gemini_api_key

# Environment
NODE_ENV=development
PORT=5000
```

### 4. Run Development Servers

```bash
# Terminal 1: Start the backend server
cd server
npm start

# Terminal 2: Start the frontend development server
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Deployment to Google App Engine

### 1. Build the Frontend

```bash
cd client
npm run build
```

### 2. Copy Build to Server

```bash
# Copy the built frontend to the server directory
cp -r dist ../server/client/
```

### 3. Set Environment Variables

Update the `server/app.yaml` file with your production environment variables:

```yaml
runtime: nodejs20
env: standard
instance_class: F1

env_variables:
  MONGO_URI: "your_production_mongodb_uri"
  REDIS_URL: "your_production_redis_url"
  JWT_SECRET: "your_production_jwt_secret"
  SPOONACULAR_API_KEY: "your_spoonacular_api_key"
  GEMINI_API_KEY: "your_gemini_api_key"
  NODE_ENV: "production"
```

### 4. Deploy to Google App Engine

```bash
# Navigate to server directory
cd server

# Deploy using gcloud CLI
gcloud app deploy
```

### 5. Access Your Deployed App

After successful deployment, your app will be available at:
`https://your-project-id.appspot.com`

## API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "username": "string",
  "token": "jwt_token"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "username": "string",
  "token": "jwt_token"
}
```

#### Logout User
```http
POST /api/auth/logout
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <jwt_token>
```

### Pantry Management Endpoints

#### Get All Pantry Items
```http
GET /api/pantry
Authorization: Bearer <jwt_token>
```

#### Add Pantry Item
```http
POST /api/pantry
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "string",
  "quantity": "number",
  "unit": "string",
  "expirationDate": "date",
  "category": "string"
}
```

#### Get Pantry Item by ID
```http
GET /api/pantry/:id
Authorization: Bearer <jwt_token>
```

#### Update Pantry Item
```http
PUT /api/pantry/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "string",
  "quantity": "number",
  "unit": "string",
  "expirationDate": "date",
  "category": "string"
}
```

#### Delete Pantry Item
```http
DELETE /api/pantry/:id
Authorization: Bearer <jwt_token>
```

### Recipe Endpoints

#### Search Recipes
```http
GET /api/recipes/search?query=chicken&maxReadyTime=30&diet=vegetarian
```

**Query Parameters:**
- `query`: Search term for recipes
- `maxReadyTime`: Maximum cooking time in minutes
- `diet`: Dietary restrictions (vegetarian, vegan, etc.)
- `cuisine`: Cuisine type
- `intolerances`: Food intolerances

#### Get Recipe Details
```http
GET /api/recipes/:id
```

#### Get Favorite Recipes
```http
GET /api/recipes/favorites
Authorization: Bearer <jwt_token>
```

#### Add Favorite Recipe
```http
POST /api/recipes/favorites
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "recipeId": "number",
  "title": "string",
  "image": "string",
  "readyInMinutes": "number"
}
```

#### Remove Favorite Recipe
```http
DELETE /api/recipes/favorites/:recipeId
Authorization: Bearer <jwt_token>
```

### AI Endpoints

#### Generate Meal Plan
```http
POST /api/ai/meal-plan
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "dietaryRestrictions": ["vegetarian"],
  "cookingTime": "30",
  "servings": "4",
  "pantryItems": ["chicken", "rice", "vegetables"]
}
```

#### Get Ingredient Substitutions
```http
POST /api/ai/substitutions
Content-Type: application/json

{
  "ingredient": "butter",
  "reason": "dairy-free"
}
```

#### Get Cooking Tips
```http
POST /api/ai/cooking-tips
Content-Type: application/json

{
  "recipe": "chicken stir fry",
  "skillLevel": "beginner"
}
```

### User Endpoints

#### Get User Favorites
```http
GET /api/users/favorites
Authorization: Bearer <jwt_token>
```

#### Add User Favorite
```http
POST /api/users/favorites
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "recipeId": "number",
  "title": "string",
  "image": "string"
}
```

#### Remove User Favorite
```http
DELETE /api/users/favorites/:recipeId
Authorization: Bearer <jwt_token>
```

## Security Features

### CSRF Protection
All state-changing requests (POST, PUT, DELETE, PATCH) require a CSRF token. The token is automatically provided via cookies and can be retrieved from:

```http
GET /api/csrf-token
```

### Authentication
- JWT-based authentication with 30-day expiration
- HTTP-only cookies for token storage
- Password hashing with bcrypt
- Protected routes using middleware

### Content Security Policy
The app implements a strict CSP to prevent XSS attacks and ensure secure resource loading.

## Project Structure

```
team12/
├── client/                 # React front-end
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   └── main.tsx        # App entry point
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── config/             # Configuration files
│   ├── services/           # Business logic
│   ├── index.js            # Server entry point
│   ├── app.yaml            # App Engine config
│   └── package.json
├── wasm/                   # WebAssembly modules
└── README.md
```

## Acknowledgments

- [Spoonacular API](https://spoonacular.com/food-api) for recipe data
- [Google Gemini AI](https://ai.google.dev/) for AI-powered features
- [MongoDB Atlas](https://www.mongodb.com/atlas) for database hosting
- [Google App Engine](https://cloud.google.com/appengine) for deployment 
