import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <header className="bg-background text-foreground shadow-sm border-b fixed top-0 left-0 right-0 z-50 h-16 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-primary">PantryPal</h1>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
