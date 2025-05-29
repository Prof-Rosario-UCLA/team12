import React from 'react';

const IngredientInput: React.FC = () => {
  // TODO: Implement ingredient input and search triggering
  return (
    <div className="mb-4">
      <input type="text" placeholder="Enter ingredients (e.g., chicken, broccoli)" className="w-full p-2 border rounded" />
      <button className="bg-blue-500 text-white p-2 rounded mt-2">Search Recipes</button>
    </div>
  );
};

export default IngredientInput; 