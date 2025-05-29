import React from 'react';

interface RecipeDetailModalProps {
  recipe: { id: string; name: string; instructions: string; ingredients: string[] }; // Define a proper type later
  onClose: () => void;
}

const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({ recipe, onClose }) => {
  // TODO: Integrate Gemini API responses (meal plans, substitutions, tips)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded shadow-xl max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">{recipe.name}</h2>
        <h3 className="text-xl font-semibold mt-4 mb-2">Ingredients:</h3>
        <ul>
          {recipe.ingredients.map((ing, index) => <li key={index}>{ing}</li>)}
        </ul>
        <h3 className="text-xl font-semibold mt-4 mb-2">Instructions:</h3>
        <p>{recipe.instructions}</p>
        {/* TODO: Display Gemini API content here */}
        <button onClick={onClose} className="bg-red-500 text-white p-2 rounded mt-4">Close</button>
      </div>
    </div>
  );
};

export default RecipeDetailModal; 