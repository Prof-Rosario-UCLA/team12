import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import DarkModeToggle from './components/Layout/DarkModeToggle';
import CookieBanner from './components/Layout/CookieBanner';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PantryList from './components/Pantry/PantryList';
import SearchPage from './components/Search/SearchPage';
import ShoppingListComponent from './components/ShoppingList/ShoppingList';
import FavoriteRecipes from './components/Favorites/FavoriteRecipes';
import RecipeDetailPage from './components/Search/RecipeDetailPage';

// Placeholder components for routes
// const Pantry = () => <div>Pantry Page</div>;
// const Search = () => <div>Search Page</div>;
// const Favorites = () => <div>Favorites Page</div>;
// const ShoppingList = () => <div>Shopping List Page</div>;
// const RecipeDetail = () => <div>Recipe Detail Page</div>;

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 bg-blue-600 text-white shadow-md flex justify-between items-center">
        <h1 className="text-xl font-semibold">Pantry Pal</h1>
        <DarkModeToggle />
      </header>
      <nav className="bg-blue-500 text-white p-4">
        <ul className="flex space-x-4">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/pantry">Pantry</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
          <li><Link to="/shopping-list">Shopping List</Link></li>
        </ul>
      </nav>
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pantry" element={<PantryList />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoriteRecipes />} />
          <Route path="/shopping-list" element={<ShoppingListComponent />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        </Routes>
      </main>
      <CookieBanner />
    </div>
  );
};

export default App; 