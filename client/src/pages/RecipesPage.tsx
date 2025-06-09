import { useState, useEffect } from 'react';
import { Search, Clock, Users, ExternalLink, ChefHat, X, Info, Filter, Heart } from 'lucide-react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import type { Recipe, PantryItem } from '@/types/recipe';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';

const RecipesPage = () => {
  const { id: recipeIdFromParams } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [maxMissingIngredients, setMaxMissingIngredients] = useState<number>(3);
  const [favoritedRecipeIds, setFavoritedRecipeIds] = useState<number[]>([]);

  const fetchPantryItems = async () => {
    console.log('[RecipesPage] Fetching pantry items...');
    try {
      const response = await axios.get('http://localhost:5001/api/pantry', {
        withCredentials: true,
      });
      setPantryItems(response.data || []);
      console.log('[RecipesPage] Pantry items fetched:', response.data);
    } catch (error) {
      console.error('[RecipesPage] Error fetching pantry items:', error);
      setPantryItems([]);
      setMessage('Could not load pantry items.');
    }
  };

  const fetchFavoriteIds = async () => {
    console.log('[RecipesPage] Fetching favorite recipe IDs...');
    try {
      const response = await axios.get('http://localhost:5001/api/users/favorites', { withCredentials: true });
      setFavoritedRecipeIds(response.data || []);
      console.log('[RecipesPage] Favorite IDs fetched:', response.data);
    } catch (error) {
      console.error('[RecipesPage] Error fetching favorite IDs:', error);
    }
  };

  useEffect(() => {
    fetchPantryItems();
    fetchFavoriteIds();
    if (recipeIdFromParams) {
      const numericId = parseInt(recipeIdFromParams, 10);
      if (!isNaN(numericId)) {
        console.log(`[RecipesPage] Recipe ID from URL: ${numericId}. Fetching details.`);
        getRecipeDetails(numericId, false);
      }
    }
  }, [recipeIdFromParams]);

  const searchRecipesAPI = async (params: Record<string, any>, searchType: string) => {
    console.log(`[RecipesPage] Initiating ${searchType} search with params:`, params);
    setLoading(true);
    setRecipes([]);
    setSearchAttempted(true);
    setMessage(null);

    if (Object.keys(params).length === 0 || (params.ingredients === '' && !params.query)) {
        console.warn('[RecipesPage] Search attempted with no ingredients and no query.');
        setMessage("Please enter a search keyword or ensure your pantry has items for a pantry search.");
        setLoading(false);
        setRecipes([]);
        return;
    }

    try {
      const response = await axios.get('http://localhost:5001/api/recipes/search', {
        params: { number: 12, ...params },
        withCredentials: true,
      });
      console.log('[RecipesPage] API response received:', response.data);
      let foundRecipes = response.data.results || response.data || [];

      foundRecipes = foundRecipes.filter((recipe: Recipe) => recipe.image && typeof recipe.image === 'string' && recipe.image.trim() !== '');
      console.log('[RecipesPage] Recipes after filtering out missing images:', foundRecipes);

      if (searchType === 'pantry' || params.ingredients) {
        console.log(`[RecipesPage] Filtering recipes by maxMissingIngredients: ${maxMissingIngredients}`);
        foundRecipes = foundRecipes.filter((recipe: Recipe) => 
          recipe.missedIngredientCount !== undefined && recipe.missedIngredientCount <= maxMissingIngredients
        );
        console.log('[RecipesPage] Recipes after filtering:', foundRecipes);
      }
      
      setRecipes(foundRecipes);

      if (foundRecipes.length === 0) {
        if (searchType === 'pantry' || params.ingredients) {
          setMessage(`No recipes found matching your criteria with ${maxMissingIngredients} or fewer missing ingredients. Try increasing the limit or changing your search.`);
        } else {
          setMessage('No recipes found matching your criteria. Try different keywords.');
        }
      }
    } catch (error) {
      console.error('[RecipesPage] Error searching recipes:', error);
      setRecipes([]);
      setMessage('An error occurred while searching for recipes.');
    } finally {
      setLoading(false);
    }
  };

  const handleGeneralSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    console.log('[RecipesPage] General search triggered.');
    if (!searchQuery.trim()) {
        setMessage("Please enter a keyword to search.");
        setRecipes([]);
        setSearchAttempted(true);
        return;
    }
    searchRecipesAPI({ query: searchQuery }, 'general');
  };

  const handlePantrySearch = () => {
    console.log('[RecipesPage] Pantry search triggered.');
    if (pantryItems.length === 0) {
      setMessage('Your pantry is empty. Add items to your pantry to use this feature, or use the keyword search.');
      setRecipes([]);
      setSearchAttempted(true);
      return;
    }
    const ingredients = pantryItems.map(item => item.name).join(',');
    const apiParams: Record<string, any> = { ingredients };
    if (searchQuery.trim()) {
      apiParams.query = searchQuery;
      console.log('[RecipesPage] Pantry search refined with keyword:', searchQuery);
    }
    searchRecipesAPI(apiParams, 'pantry');
  };

  const getRecipeDetails = async (recipeId: number, shouldNavigate = true) => {
    if (shouldNavigate) {
      navigate(`/recipes/${recipeId}`);
    }
    const existingRecipeInList = recipes.find(r => r.id === recipeId);
    const alreadyFetchedFullDetails = existingRecipeInList && existingRecipeInList.extendedIngredients && existingRecipeInList.analyzedInstructions;

    if (alreadyFetchedFullDetails) {
      setSelectedRecipe(existingRecipeInList);
      setIsModalOpen(true);
      console.log('[RecipesPage] Displaying cached full details for recipe:', existingRecipeInList.title);
      return;
    }
    if (existingRecipeInList && !alreadyFetchedFullDetails) {
        setSelectedRecipe(existingRecipeInList);
    } else if (!existingRecipeInList) {
        setSelectedRecipe({ id: recipeId, title: 'Loading recipe...', image: '' });
    }
    setIsModalOpen(true);
    setLoadingDetails(true);

    console.log(`[RecipesPage] Fetching full details for recipe ID: ${recipeId}`);
    try {
      const response = await axios.get(`http://localhost:5001/api/recipes/${recipeId}`, {
        withCredentials: true,
      });
      console.log('[RecipesPage] Full recipe details fetched:', response.data);

      setRecipes(prevRecipes => {
        const recipeExistsInList = prevRecipes.some(r => r.id === recipeId);
        if (recipeExistsInList) {
          return prevRecipes.map(r => r.id === recipeId ? { ...r, ...response.data } : r);
        }
        return prevRecipes;
      });
      setSelectedRecipe(response.data);
    } catch (error) {
      console.error('[RecipesPage] Error fetching full recipe details:', error);
      setMessage('Could not load full recipe details. Please try again.');
      if (!existingRecipeInList) 
      {
        setIsModalOpen(false);
        if (recipeIdFromParams) navigate('/recipes');
      }
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleModalOpenChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
    if (!isOpen && recipeIdFromParams) {
      navigate('/recipes');
    }
  };

  const toggleFavorite = async (recipeId: number) => {
    const isFavorited = favoritedRecipeIds.includes(recipeId);
    console.log(`[RecipesPage] Toggling favorite for recipe ID: ${recipeId}, currently favorited: ${isFavorited}`);
    try {
      if (isFavorited) {
        await axios.delete(`http://localhost:5001/api/users/favorites/${recipeId}`, { withCredentials: true });
        setFavoritedRecipeIds(prev => prev.filter(id => id !== recipeId));
        console.log('[RecipesPage] Recipe unfavorited successfully');
      } else {
        await axios.post('http://localhost:5001/api/users/favorites', { recipeId }, { withCredentials: true });
        setFavoritedRecipeIds(prev => [...prev, recipeId]);
        console.log('[RecipesPage] Recipe favorited successfully');
      }
    } catch (error) {
      console.error('[RecipesPage] Error toggling favorite:', error);
      setMessage(`Error ${isFavorited ? 'unfavoriting' : 'favoriting'} recipe. Please try again.`);
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-foreground">Recipe Discovery</h1>
        <p className="text-muted-foreground mt-2">Find delicious recipes based on your ingredients or by searching.</p>
      </div>

      <div className="mb-8 p-6 bg-card border rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-start mb-4">
          <Input
            type="text"
            className="flex-grow w-full sm:w-auto text-base py-3 px-4"
            placeholder="Optional: Add keyword to refine (e.g., spicy, quick)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search Keyword"
          />
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto pt-2 sm:pt-0">
            <Button onClick={handlePantrySearch} disabled={loading || pantryItems.length === 0} className="w-full sm:w-auto">
              <ChefHat className="mr-2 h-4 w-4" /> 
              {loading && (searchQuery.trim() || pantryItems.length > 0) ? 'Searching Pantry...' : 'Use My Pantry'}
            </Button>
            <Button onClick={handleGeneralSearch} disabled={loading} className="w-full sm:w-auto" variant="outline">
              <Search className="mr-2 h-4 w-4" /> 
              {loading && searchQuery.trim() ? 'Searching...' : 'Search Keyword Only'}
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-grow w-full sm:w-auto">
            <Label htmlFor="maxMissing" className="text-sm font-medium text-muted-foreground mb-1 block">
              Max Missing Ingredients (for Pantry Search)
            </Label>
            <Input
              id="maxMissing"
              type="number"
              min="0"
              max="10"
              value={maxMissingIngredients}
              onChange={(e) => setMaxMissingIngredients(parseInt(e.target.value, 10))}
              className="w-full sm:w-48 text-base py-3 px-4"
              aria-label="Maximum Missing Ingredients"
            />
          </div>
        </div>

        {pantryItems.length > 0 && (
          <p className="text-sm text-muted-foreground mt-3">
            Your pantry items: {pantryItems.map(i => i.name).join(', ')}. 
            Adjust "Max Missing Ingredients" if needed.
          </p>
        )}
         {pantryItems.length === 0 && (
          <p className="text-sm text-muted-foreground mt-3">
            Your pantry is currently empty. Add items in the Pantry tab to search by ingredients.
          </p>
        )}
      </div>

      {message && (
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {loading && (
        <div className="flex items-center justify-center h-full py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}

      {!loading && searchAttempted && recipes.length === 0 && (
        <div className="text-center py-12">
          <Filter className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-medium text-foreground">No Recipes Found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {message || "Try adjusting your search, increasing the max missing ingredients, or adding more items to your pantry."}
          </p>
        </div>
      )}

      {!loading && recipes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-h-[65vh] overflow-y-auto pr-2 custom-scrollbar">
          {recipes.map((recipe) => (
            <Card
              key={recipe.id}
              className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col bg-card"
            >
              <Link to={`/recipes/${recipe.id}`} onClick={(e) => { e.preventDefault(); getRecipeDetails(recipe.id, true); }}>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover cursor-pointer"
                />
              </Link>
              <CardHeader className="pb-2">
                <Link to={`/recipes/${recipe.id}`} onClick={(e) => { e.preventDefault(); getRecipeDetails(recipe.id, true); }}>
                  <CardTitle 
                    className="text-lg line-clamp-2 text-foreground hover:underline cursor-pointer"
                  >
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
                {(recipe.usedIngredientCount !== undefined || recipe.missedIngredientCount !== undefined) && (
                  <div className="mt-2 text-xs space-y-1">
                    {recipe.usedIngredientCount !== undefined && recipe.usedIngredientCount > 0 && <Badge variant="secondary" className="text-green-600 dark:text-green-400 border-green-600/50 dark:border-green-400/50">Uses: {recipe.usedIngredientCount} pantry items</Badge>}
                    {recipe.missedIngredientCount !== undefined && recipe.missedIngredientCount > 0 && <Badge variant="destructive" className="text-orange-600 dark:text-orange-400 border-orange-600/50 dark:border-orange-400/50">Missing: {recipe.missedIngredientCount}</Badge>}
                  </div>
                )}
                {recipe.summary && !((recipe.usedIngredientCount !== undefined || recipe.missedIngredientCount !== undefined)) && (
                  <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
                    {stripHtml(recipe.summary)}
                  </p>
                )}
              </CardContent>
              <CardFooter className="p-3 border-t bg-muted/30">
                <Link to={`/recipes/${recipe.id}`} className="w-full text-xs mr-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full"
                    onClick={(e) => { 
                      e.preventDefault(); 
                      getRecipeDetails(recipe.id, true);
                    }}
                  >
                    View Details
                  </Button>
                </Link>
                <Button 
                  variant={favoritedRecipeIds.includes(recipe.id) ? "default" : "outline"} 
                  size="icon" 
                  className="ml-2 h-8 w-8" 
                  onClick={() => toggleFavorite(recipe.id)}
                  aria-label={favoritedRecipeIds.includes(recipe.id) ? "Unfavorite" : "Favorite"}
                >
                  <Heart className={`h-4 w-4 ${favoritedRecipeIds.includes(recipe.id) ? 'fill-destructive text-destructive' : ''}`} />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={handleModalOpenChange}>
        <DialogContent className="sm:max-w-[700px] md:max-w-[800px] lg:max-w-[900px] max-h-[90vh] flex flex-col bg-card">
          {selectedRecipe && (
            <>
              <DialogHeader className="border-b pb-3">
                <div className="flex justify-between items-start">
                    <DialogTitle className="text-2xl font-semibold text-foreground leading-tight pr-8">{selectedRecipe.title || 'Recipe Details'}</DialogTitle>
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <X className="h-5 w-5" />
                        </Button>
                    </DialogClose>
                </div>
              </DialogHeader>
              
              {loadingDetails && (
                <div className="flex-grow flex items-center justify-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              )}

              {!loadingDetails && selectedRecipe.extendedIngredients && (
                <div className="flex-grow overflow-y-auto p-1 custom-scrollbar pr-2_5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <img
                        src={selectedRecipe.image}
                        alt={selectedRecipe.title}
                        className="w-full h-auto max-h-80 object-contain rounded-lg mb-4 shadow-md"
                      />
                      <div className="flex items-center flex-wrap gap-2 mb-3 text-sm">
                          {selectedRecipe.readyInMinutes && <Badge variant="secondary"><Clock className="w-4 h-4 mr-1" />{selectedRecipe.readyInMinutes} min</Badge>}
                          {selectedRecipe.servings && <Badge variant="secondary"><Users className="w-4 h-4 mr-1" />{selectedRecipe.servings} servings</Badge>}
                      </div>
                      {(selectedRecipe.usedIngredientCount !== undefined || selectedRecipe.missedIngredientCount !== undefined) && (
                        <div className="mb-3 text-sm space-y-1">
                          {selectedRecipe.usedIngredientCount !== undefined && selectedRecipe.usedIngredientCount > 0 && <p className="text-green-600 dark:text-green-400 font-medium">Matches {selectedRecipe.usedIngredientCount} of your ingredients.</p>}
                          {selectedRecipe.missedIngredientCount !== undefined && selectedRecipe.missedIngredientCount > 0 && <p className="text-orange-600 dark:text-orange-400 font-medium">You might need {selectedRecipe.missedIngredientCount} additional ingredients.</p>}
                        </div>
                      )}
                      {selectedRecipe.cuisines && selectedRecipe.cuisines.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-xs uppercase text-muted-foreground font-semibold mb-1">Cuisines</h4>
                          <div className="flex flex-wrap gap-1">
                            {selectedRecipe.cuisines.map(c => <Badge key={c} variant="outline" className="text-xs">{c}</Badge>)}
                          </div>
                        </div>
                      )}
                      {selectedRecipe.dishTypes && selectedRecipe.dishTypes.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-xs uppercase text-muted-foreground font-semibold mb-1">Dish Types</h4>
                          <div className="flex flex-wrap gap-1">
                            {selectedRecipe.dishTypes.map(d => <Badge key={d} variant="outline" className="text-xs">{d}</Badge>)}
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-foreground">Ingredients</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm mb-6 pl-2">
                        {selectedRecipe.extendedIngredients?.map((ing, index) => (
                          <li key={`${ing.id}-${index}`}>{ing.original}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {selectedRecipe.analyzedInstructions && selectedRecipe.analyzedInstructions.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3 text-foreground">Instructions</h4>
                      <div className="space-y-4">
                        {selectedRecipe.analyzedInstructions.map((instructionSet, setIndex) => (
                          <div key={`set-${setIndex}`}>
                            {instructionSet.name && <p className="font-medium text-md mb-2 text-foreground">{instructionSet.name}</p>}
                            <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm pl-4">
                              {instructionSet.steps.map((step) => (
                                <li key={step.number}>{step.step}</li>
                              ))}
                            </ol>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {!selectedRecipe.analyzedInstructions && selectedRecipe.instructions && (
                     <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-2 text-foreground">Instructions</h4>
                        <div className="text-muted-foreground prose prose-sm dark:prose-invert max-w-none break-words whitespace-pre-line" dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }}></div>
                    </div>
                  )}
                  {!selectedRecipe.analyzedInstructions && !selectedRecipe.instructions && (
                    <p className="text-muted-foreground text-sm">No detailed instructions provided for this recipe.</p>
                  )}

                  {selectedRecipe.summary && (
                    <div className="mb-6 pt-4 border-t border-border">
                      <h4 className="text-lg font-semibold mb-2 text-foreground">Summary</h4>
                      <div 
                        className="text-muted-foreground prose prose-sm dark:prose-invert max-w-none break-words"
                        dangerouslySetInnerHTML={{ __html: selectedRecipe.summary }}
                      />
                    </div>
                  )}
                </div>
              )}
              
              {!loadingDetails && selectedRecipe.id !== undefined && (
                (() => {
                  const isFavorited = favoritedRecipeIds.includes(selectedRecipe.id);
                  return (
                    <DialogFooter className="sm:justify-between gap-2 pt-4 border-t mt-auto border-border">
                      {isFavorited ? (
                        <Button 
                          variant="default" 
                          onClick={() => toggleFavorite(selectedRecipe.id)} 
                          className="w-full sm:w-auto"
                        >
                          <Heart className="mr-2 h-4 w-4 fill-destructive text-destructive-foreground" />
                          Unfavorite
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          onClick={() => toggleFavorite(selectedRecipe.id)} 
                          className="w-full sm:w-auto"
                        >
                          <Heart className="mr-2 h-4 w-4" />
                          Favorite Recipe
                        </Button>
                      )}
                      <div className="flex gap-2">
                        <DialogClose asChild>
                          <Button type="button" variant="outline">Close</Button>
                        </DialogClose>
                        {selectedRecipe.sourceUrl && (
                          <a
                            href={selectedRecipe.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button className="w-full sm:w-auto">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Full Recipe
                            </Button>
                          </a>
                        )}
                      </div>
                    </DialogFooter>
                  );
                })()
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
      </main>
   </>
  );
};

export default RecipesPage; 