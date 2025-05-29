import { useState, useEffect } from 'react';
import { Search, Clock, Users, Heart, ExternalLink } from 'lucide-react';
import axios from 'axios';

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  sourceUrl: string;
}

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const searchRecipes = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5001/api/recipes/search', {
        params: { query, number: 12 },
        withCredentials: true,
      });
      setRecipes(response.data.results || []);
    } catch (error) {
      console.error('Error searching recipes:', error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchRecipes(searchQuery);
  };

  const getRecipeDetails = async (recipeId: number) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/recipes/${recipeId}`, {
        withCredentials: true,
      });
      setSelectedRecipe(response.data);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  useEffect(() => {
    searchRecipes('chicken');
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Recipe Discovery</h1>
        <p className="text-gray-600 mt-2">Find delicious recipes based on your ingredients</p>
      </div>

      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for recipes (e.g., chicken, pasta, vegetarian)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => getRecipeDetails(recipe.id)}
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {recipe.title}
                </h3>
                <div className="flex items-center text-sm text-gray-600 space-x-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {recipe.readyInMinutes} min
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {recipe.servings} servings
                  </div>
                </div>
                {recipe.summary && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {stripHtml(recipe.summary)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {recipes.length === 0 && !loading && (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No recipes found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try searching for different ingredients or recipe types.
          </p>
        </div>
      )}

      {selectedRecipe && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedRecipe.title}
                </h3>
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              
              <div className="flex items-center space-x-6 mb-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {selectedRecipe.readyInMinutes} minutes
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {selectedRecipe.servings} servings
                </div>
              </div>

              {selectedRecipe.summary && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">About this recipe</h4>
                  <div 
                    className="text-gray-700 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedRecipe.summary }}
                  />
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
                {selectedRecipe.sourceUrl && (
                  <a
                    href={selectedRecipe.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-center flex items-center justify-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Full Recipe
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipesPage; 