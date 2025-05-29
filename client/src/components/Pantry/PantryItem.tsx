import React from 'react';

interface PantryItemProps {
  item: { id: string; name: string; quantity: string }; // Define a proper type later
}

const PantryItem: React.FC<PantryItemProps> = ({ item }) => {
  // TODO: Implement edit and delete functionality
  return (
    <article className="border p-4 my-2 rounded shadow">
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p>Quantity: {item.quantity}</p>
      {/* TODO: Add Edit/Delete buttons */}
    </article>
  );
};

export default PantryItem; 