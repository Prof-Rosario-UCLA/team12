import React from 'react';

interface RecipeCardProps {
  recipe: { id: string; name: string; imageUrl?: string; ingredients: string[] }; // Define a proper type later
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  // TODO: Implement logic to compare with pantry and display "You have" / "You need"
  // TODO: Handle click to open RecipeDetailModal
  return (
    <article className="border p-4 my-2 rounded shadow hover:shadow-lg transition-shadow">
      {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-32 object-cover rounded mb-2" />}
      <h3 className="text-lg font-semibold">{recipe.name}</h3>
      {/* TODO: Display ingredient comparison */}
      <button className="text-blue-500 hover:underline mt-2">View Details</button>
    </article>
  );
};

export default RecipeCard; 