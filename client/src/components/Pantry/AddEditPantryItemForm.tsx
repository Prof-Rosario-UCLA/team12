import React from 'react';

const AddEditPantryItemForm: React.FC = () => {
  // TODO: Implement form handling and API connection for adding/editing items
  // TODO: Use react-query for optimistic updates
  return (
    <form className="mb-4 p-4 border rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Add/Edit Item</h3>
      <div className="mb-2">
        <label htmlFor="itemName" className="block">Item Name</label>
        <input type="text" id="itemName" className="w-full p-2 border rounded" />
      </div>
      <div className="mb-2">
        <label htmlFor="itemQuantity" className="block">Quantity</label>
        <input type="text" id="itemQuantity" className="w-full p-2 border rounded" />
      </div>
      <button type="submit" className="bg-green-500 text-white p-2 rounded">Save Item</button>
    </form>
  );
};

export default AddEditPantryItemForm; 