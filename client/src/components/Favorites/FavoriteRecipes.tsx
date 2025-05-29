import React from 'react';
// import RecipeCard from '../Search/RecipeCard'; // Will be used to display favorite recipes

const FavoriteRecipes: React.FC = () => {
  // TODO: Fetch favorite recipes from backend
  // TODO: Connect to react-query and implement optimistic updates for removing favorites
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Favorite Recipes</h2>
      {/* TODO: Map over favorite recipes and render RecipeCard components */}
      <div>Favorite recipes will be displayed here.</div>
    </div>
  );
};

export default FavoriteRecipes; 