import React from 'react';
import GroceryStoreFinder from './GroceryStoreFinder';

const ShoppingList: React.FC = () => {
  // TODO: Implement shopping list functionality (add, remove, check off items)
  // TODO: Connect to backend API and potentially use react-query
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Shopping List</h2>
      {/* TODO: Display shopping list items */}
      <div>Shopping list items will be here.</div>
      <GroceryStoreFinder />
    </div>
  );
};

export default ShoppingList; 