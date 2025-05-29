import React from 'react';
import IngredientInput from './IngredientInput';
import RecipeResults from './RecipeResults';

const SearchPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Recipe Search</h2>
      <IngredientInput />
      <RecipeResults />
    </div>
  );
};

export default SearchPage; 