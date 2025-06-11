import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Home, Package, ChefHat, Heart } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';

const SideNav = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isRecipeActive = () => location.pathname.startsWith('/recipes') || location.pathname.startsWith('/favorites');

  const navItems = [
    { to: '/', label: 'Dashboard', icon: Home },
    { to: '/pantry', label: 'Pantry', icon: Package },
    { to: '/recipes', label: 'Recipes', icon: ChefHat, activeCheck: () => isRecipeActive() && !isActive('/favorites') },
    { to: '/favorites', label: 'Favorites', icon: Heart },
  ];

  return (
    <aside className="bg-background text-foreground shadow-md border-r fixed left-0 top-16 bottom-0 z-40 w-60 flex flex-col p-4 space-y-2">
      <nav aria-label="Sidebar navigation" className="flex-grow flex flex-col space-y-1">
        {navItems.map((item) => {
          const active = item.activeCheck ? item.activeCheck() : isActive(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                ${
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
            >
              <item.icon className="w-5 h-5 mr-3" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto space-y-2 pt-4 border-t">
        <ThemeToggle />
        <Button variant="outline" size="sm" onClick={logout} className="w-full">
          <LogOut className="w-4 h-4 mr-2" aria-hidden="true" /> Logout
        </Button>
      </div>
    </aside>
  );
};

export default SideNav;
