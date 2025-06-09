import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Home, Package, ChefHat, Heart } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';

const Header = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isRecipeActive = () => location.pathname.startsWith('/recipes') || location.pathname.startsWith('/favorites');

  return (
    <header className="bg-background text-foreground shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-primary">PantryPal</h1>
            </Link>
          </div>

          <nav aria-label="Main navigation" className="flex flex-1 justify-center items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <Home className="inline-block w-4 h-4 mr-1.5 mb-0.5" aria-hidden="true" /> Dashboard
            </Link>
            <Link
              to="/pantry"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/pantry') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <Package className="inline-block w-4 h-4 mr-1.5 mb-0.5" aria-hidden="true" /> Pantry
            </Link>
            <Link
              to="/recipes"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isRecipeActive() && !isActive('/favorites')
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <ChefHat className="inline-block w-4 h-4 mr-1.5 mb-0.5" aria-hidden="true" /> Recipes
            </Link>
            <Link
              to="/favorites"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/favorites') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <Heart className="inline-block w-4 h-4 mr-1.5 mb-0.5" aria-hidden="true" /> Favorites
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" aria-hidden="true" /> Logout
            </Button>
          </div>
          
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <Button variant="outline" size="icon" onClick={logout} className="ml-2" aria-label="Logout">
                <LogOut className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
