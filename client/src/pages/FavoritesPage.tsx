import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Recipe } from '@/types/recipe'; // Use 'import type' and correct path
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clock, Users, Heart, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const FavoritesPage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = async () => {
    setLoading(true);
    setError(null);
    console.log('[FavoritesPage] Fetching favorite recipes...');
    try {
      const response = await axios.get('http://localhost:5001/api/users/favorites', {
        withCredentials: true,
      });
      console.log('[FavoritesPage] Favorite recipes fetched:', response.data);
      const recipesWithFullImageUrls = response.data.map((recipe: Recipe) => {
        if (recipe.image && !recipe.image.startsWith('http')) {
            return { ...recipe, image: `https://spoonacular.com/recipeImages/${recipe.image}` };
        }
        return recipe;
        }).filter((recipe: Recipe) => recipe.image && typeof recipe.image === 'string' && recipe.image.trim() !== '');

      setFavoriteRecipes(recipesWithFullImageUrls);
    } catch (err) {
      console.error('[FavoritesPage] Error fetching favorite recipes:', err);
      setError('Failed to load favorite recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleUnfavorite = async (recipeId: number) => {
    console.log(`[FavoritesPage] Attempting to unfavorite recipe ID: ${recipeId}`);
    try {
      await axios.delete(`http://localhost:5001/api/users/favorites/${recipeId}`, { 
        withCredentials: true 
      });
      setFavoriteRecipes(prevFavorites => prevFavorites.filter(recipe => recipe.id !== recipeId));
      console.log(`[FavoritesPage] Recipe ID: ${recipeId} unfavorited successfully.`);
    } catch (err) {
      console.error(`[FavoritesPage] Error unfavoriting recipe ID: ${recipeId}:`, err);
      setError('Failed to update favorites. Please try refreshing.');
    }
  };
  
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <>
      <Header />
      <main className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full px-4 py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center h-full">
            <Alert variant="destructive">
              <Info className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        ) : favoriteRecipes.length === 0 ? (
          <div className="container mx-auto px-4 py-8 text-center flex flex-col justify-center items-center h-full">
            <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">No Favorites Yet</h2>
            <p className="text-muted-foreground mb-6">You haven't favorited any recipes. Start exploring and add some!</p>
            <Button asChild>
              <Link to="/recipes">Find Recipes</Link>
            </Button>
          </div>
        ) : (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-foreground">Your Favorite Recipes</h1>
              <p className="text-muted-foreground mt-2">All your saved culinary inspirations in one place.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteRecipes.map((recipe) => (
                <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col bg-card">
                  <Link to={`/recipes/${recipe.id}`} state={{ recipe }} className="block">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title} 
                      className="w-full h-48 object-cover" 
                    />
                  </Link>
                  <CardHeader className="pb-2">
                      <Link to={`/recipes/${recipe.id}`} state={{ recipe }}>
                          <CardTitle className="text-lg line-clamp-2 text-foreground hover:underline">
                              {recipe.title}
                          </CardTitle>
                      </Link>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    {(recipe.readyInMinutes || recipe.servings) && (
                      <div className="flex items-center text-sm text-muted-foreground space-x-3 mb-2">
                        {recipe.readyInMinutes && <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />{recipe.readyInMinutes} min</Badge>}
                        {recipe.servings && <Badge variant="outline"><Users className="w-3 h-3 mr-1" />{recipe.servings} serv.</Badge>}
                      </div>
                    )}
                     {recipe.summary && (
                        <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
                          {stripHtml(recipe.summary)}
                        </p>
                      )}
                  </CardContent>
                  <CardFooter className="p-3 border-t bg-muted/30 flex justify-between items-center">
                    <Link to={`/recipes/${recipe.id}`} state={{ recipe }} className="flex-grow mr-2">
                      <Button variant="outline" size="sm" className="w-full text-xs">View Details</Button>
                    </Link>
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={() => handleUnfavorite(recipe.id)}
                      aria-label="Unfavorite"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default FavoritesPage;