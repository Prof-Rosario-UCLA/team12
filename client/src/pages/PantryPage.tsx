import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Package, Calendar } from 'lucide-react';
import Header from '../components/Header';
import axios from 'axios';

interface PantryItem {
  _id: string;
  name: string;
  quantity: number;
  unit: string;
  expirationDate?: string;
  createdAt: string;
}

const PantryPage = () => {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<PantryItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: '',
    expirationDate: '',
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/pantry', {
        withCredentials: true,
      });
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const data = {
        name: formData.name,
        quantity: parseFloat(formData.quantity),
        unit: formData.unit,
        expirationDate: formData.expirationDate || null,
      };

      if (editingItem) {
        await axios.put(`http://localhost:5001/api/pantry/${editingItem._id}`, data, {
          withCredentials: true,
        });
      } else {
        await axios.post('http://localhost:5001/api/pantry', data, {
          withCredentials: true,
        });
      }

      setFormData({ name: '', quantity: '', unit: '', expirationDate: '' });
      setShowAddForm(false);
      setEditingItem(null);
      fetchItems();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleEdit = (item: PantryItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      quantity: item.quantity.toString(),
      unit: item.unit,
      expirationDate: item.expirationDate 
        ? new Date(item.expirationDate).toISOString().split('T')[0] 
        : '',
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`http://localhost:5001/api/pantry/${id}`, {
          withCredentials: true,
        });
        fetchItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', quantity: '', unit: '', expirationDate: '' });
    setShowAddForm(false);
    setEditingItem(null);
  };

  const isExpiringSoon = (expirationDate: string) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const daysDiff = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysDiff <= 7 && daysDiff >= 0;
  };

  return (
    <>
      <Header />
      <main className="flex-1 overflow-y-auto">
      {loading ? (
        <div className="flex items-center justify-center h-full py-8">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* PantryPage content starts below */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Pantry</h1>
              <p className="text-gray-600 mt-2">Manage your pantry inventory</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </button>
          </div>

          {showAddForm && (
            <div className="bg-white rounded-lg shadow mb-8 p-6">
              <h2 className="text-lg font-semibold mb-4">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  >
                    <option value="">Select unit</option>
                    <option value="pcs">Pieces</option>
                    <option value="lbs">Pounds</option>
                    <option value="oz">Ounces</option>
                    <option value="kg">Kilograms</option>
                    <option value="g">Grams</option>
                    <option value="cups">Cups</option>
                    <option value="tbsp">Tablespoons</option>
                    <option value="tsp">Teaspoons</option>
                    <option value="liters">Liters</option>
                    <option value="ml">Milliliters</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiration Date (Optional)
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.expirationDate}
                    onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2 lg:col-span-4 flex space-x-4">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    {editingItem ? 'Update Item' : 'Save Item'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {items.length === 0 ? (
            <div className="text-center py-10">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No items in pantry</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding your first item.</p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Add Item
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiration</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added</th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item._id} className={`${item.expirationDate && isExpiringSoon(item.expirationDate) ? 'bg-yellow-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.quantity} {item.unit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.expirationDate ? (
                          <div className={`text-sm ${new Date(item.expirationDate) < new Date() ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                            <Calendar className={`inline-block w-4 h-4 mr-1 ${new Date(item.expirationDate) < new Date() ? 'text-red-500' : (isExpiringSoon(item.expirationDate) ? 'text-yellow-500' : 'text-gray-400')}`} />
                            {new Date(item.expirationDate).toLocaleDateString()}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-900 mr-3">
                          <Edit2 className="w-4 h-4 inline-block" />
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4 inline-block" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      </main>
    </>
  );
};

export default PantryPage;