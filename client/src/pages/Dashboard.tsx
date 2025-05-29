import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChefHat, Clock, TrendingUp } from 'lucide-react';
import axios from 'axios';

interface PantryItem {
  _id: string;
  name: string;
  quantity: number;
  unit: string;
  expirationDate?: string;
}

const Dashboard = () => {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPantryItems = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/pantry', {
          withCredentials: true,
        });
        setPantryItems(response.data);
      } catch (error) {
        console.error('Error fetching pantry items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPantryItems();
  }, []);

  const getExpiringItems = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return pantryItems.filter(item => {
      if (!item.expirationDate) return false;
      const expDate = new Date(item.expirationDate);
      return expDate <= nextWeek && expDate >= today;
    });
  };

  const expiringItems = getExpiringItems();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your pantry.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Total Items</h2>
              <p className="text-3xl font-bold text-blue-600">{pantryItems.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Expiring Soon</h2>
              <p className="text-3xl font-bold text-yellow-600">{expiringItems.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <ChefHat className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Recipes Available</h2>
              <p className="text-3xl font-bold text-green-600">∞</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
              <p className="text-3xl font-bold text-purple-600">
                {new Set(pantryItems.map(item => item.name.split(' ')[0])).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Items Expiring Soon</h3>
          </div>
          <div className="p-6">
            {expiringItems.length > 0 ? (
              <div className="space-y-3">
                {expiringItems.slice(0, 5).map((item) => (
                  <div key={item._id} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.quantity} {item.unit}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-yellow-600">
                        Expires: {new Date(item.expirationDate!).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                {expiringItems.length > 5 && (
                  <Link
                    to="/pantry"
                    className="block text-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View all {expiringItems.length} expiring items
                  </Link>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No items expiring in the next week! 🎉
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6 space-y-4">
            <Link
              to="/pantry"
              className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Manage Pantry
            </Link>
            <Link
              to="/recipes"
              className="block w-full bg-green-600 text-white text-center py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              Find Recipes
            </Link>
            <button className="block w-full bg-purple-600 text-white text-center py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors">
              Generate Meal Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 