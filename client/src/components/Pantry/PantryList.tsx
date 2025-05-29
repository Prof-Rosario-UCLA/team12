import React from 'react';
// import PantryItem from './PantryItem'; // Will be created later
// import AddEditPantryItemForm from './AddEditPantryItemForm'; // Will be created later

const PantryList: React.FC = () => {
  // TODO: Fetch pantry items from backend and connect to react-query
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Pantry</h2>
      {/* <AddEditPantryItemForm /> */}
      {/* TODO: Map over pantry items and render PantryItem components */}
      <div>Pantry items will be listed here.</div>
    </div>
  );
};

export default PantryList; 