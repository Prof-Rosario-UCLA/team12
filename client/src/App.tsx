import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PantryPage from './pages/PantryPage';
import RecipesPage from './pages/RecipesPage';
import FavoritesPage from './pages/FavoritesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useAuth } from './context/AuthContext';
import { useOfflineStatus } from './hooks/useOfflineStatus';
import './App.css';

function App() {
  const { user, loading } = useAuth();
  const isOffline = useOfflineStatus();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {isOffline && (
        <div className="w-full bg-yellow-400 text-yellow-900 text-center py-2 font-semibold z-50">
          Offline mode: Some features (like recipe search) are disabled.
        </div>
      )}
      {user && (
        <main className="flex flex-col flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pantry" element={<PantryPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/recipes/:id" element={<RecipesPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
          </Routes>
        </main>
      )}
      {!user && (
        <main className="flex flex-col flex-grow">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
      )}
    </div>
  );
}

export default App;
