import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Home, Package, ChefHat, Heart } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isRecipeActive = () => location.pathname.startsWith('/recipes') || location.pathname.startsWith('/favorites');

  return (
    <header className="bg-background text-foreground shadow-sm border-b fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-primary">PantryPal</h1>
            </Link>
          </div>

          <nav className="flex-1 flex justify-center items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${isActive('/') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
            >
              <Home className="inline-block w-4 h-4 mr-1.5 mb-0.5" /> Dashboard
            </Link>
            <Link
              to="/pantry"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${isActive('/pantry') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
            >
              <Package className="inline-block w-4 h-4 mr-1.5 mb-0.5" /> Pantry
            </Link>
            <Link
              to="/recipes"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${isRecipeActive() && !isActive('/favorites')
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
            >
              <ChefHat className="inline-block w-4 h-4 mr-1.5 mb-0.5" /> Recipes
            </Link>
            <Link
              to="/favorites"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${isActive('/favorites') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
            >
              <Heart className="inline-block w-4 h-4 mr-1.5 mb-0.5" /> Favorites
            </Link>
            
            <div className="flex items-center space-x-3 ml-4">
              <ThemeToggle />
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </Button>
            </div>
          </nav>

          <div className="flex-shrink-0 flex items-center space-x-3">
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 