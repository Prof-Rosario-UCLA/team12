import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Package, Calendar, Sparkle } from 'lucide-react';
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

  const parseLocalDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed
  };

  const getTodayAtMidnight = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

  const [items, setItems] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<PantryItem | null>(null);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [rowEditData, setRowEditData] = useState({ name: '', quantity: '', unit: '', expirationDate: '' });
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: '',
    expirationDate: '',
  });
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      console.log('Fetching items...');
      const response = await axios.get('/api/pantry', {
        withCredentials: true,
      });
      setItems([...response.data]);
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

      let savedItem: PantryItem | null = null;

      if (editingItem) {
        const response = await axios.put<PantryItem>(`/api/pantry/${editingItem._id}`, data, {
          withCredentials: true,
        });
        savedItem = response.data;
        console.log('Backend response for update:', savedItem);
      } else {
        const response = await axios.post<PantryItem>('/api/pantry', data, {
          withCredentials: true,
        });
        savedItem = response.data;
        console.log('Backend response for create:', savedItem);
      }

      if (savedItem) {
        if (editingItem) {
          setItems(prevItems => 
            prevItems.map(item => (item._id === savedItem!._id ? savedItem! : item))
          );
        } else {
          setItems(prevItems => [...prevItems, savedItem!]);
        }
      } else {
        fetchItems(); 
      }

      setFormData({ name: '', quantity: '', unit: '', expirationDate: '' });
      setShowAddForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Error saving item. Please check console for details and ensure backend is running correctly.'); 
    }
  };

  const handleEdit = (item: PantryItem) => {
    setEditingRowId(item._id);
    setRowEditData({
      name: item.name,
      quantity: item.quantity.toString(),
      unit: item.unit,
      expirationDate: item.expirationDate ? (item.expirationDate.includes('T') ? item.expirationDate.split('T')[0] : item.expirationDate) : '',
    });
  };

  const handleRowSave = async (id: string) => {
    try {
      const data = {
        name: rowEditData.name,
        quantity: parseFloat(rowEditData.quantity),
        unit: rowEditData.unit,
        expirationDate: rowEditData.expirationDate || null,
      };
      const response = await axios.put<PantryItem>(`/api/pantry/${id}`, data, { withCredentials: true });
      const savedItem = response.data;
      setItems(prev => prev.map(it => (it._id === id ? savedItem : it)));
      setEditingRowId(null);
    } catch (err) {
      console.error('Failed to save row edit', err);
    }
  };

  const handleRowCancel = () => {
    setEditingRowId(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`/api/pantry/${id}`, {
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
    const today = getTodayAtMidnight();
    if (typeof expirationDate !== 'string' || expirationDate === '') return false; 
    const dateOnlyString = expirationDate.includes('T') ? expirationDate.split('T')[0] : expirationDate;
    const expDate = parseLocalDate(dateOnlyString);
    const daysDiff = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysDiff <= 7 && daysDiff >= 0;
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(items.map((i) => i._id)));
    }
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleGenerateRecipe = () => {
    if (selectedItems.size === 0) return;
    const selectedIngredientNames = items
      .filter((item) => selectedItems.has(item._id))
      .map((item) => item.name.trim())
      .join(',');

    navigate('/recipes', { state: { ingredients: selectedIngredientNames } });
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Pantry</h1>
              <p className="text-gray-600 mt-2">Manage your pantry inventory</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </button>
          </div>

          {showAddForm && (
            <div className="glass-panel mb-8 p-6">
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
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Add Item
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center mb-4 space-x-4">
                <label className="flex items-center space-x-2 select-none">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary border-gray-300 rounded"
                    checked={items.length > 0 && selectedItems.size === items.length}
                    onChange={toggleSelectAll}
                  />
                  <span className="text-sm text-gray-700">Select All</span>
                </label>
                <button
                  disabled={selectedItems.size === 0}
                  onClick={handleGenerateRecipe}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    selectedItems.size === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  <Sparkle className="w-4 h-4 mr-2" />
                  Generate Recipe
                </button>
              </div>

              <div className="glass-panel overflow-x-auto max-h-[65vh] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-primary border-gray-300 rounded"
                          checked={items.length > 0 && selectedItems.size === items.length}
                          onChange={toggleSelectAll}
                          aria-label="Select all rows"
                        />
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiration Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {items.map((item) => {
                      console.log(`Rendering item: ${item.name}, expirationDate: '${item.expirationDate}', createdAt: '${item.createdAt}'`);
                      const expDateStr = (typeof item.expirationDate === 'string' && item.expirationDate !== '' && item.expirationDate.toLowerCase() !== 'null') 
                        ? (item.expirationDate.includes('T') ? item.expirationDate.split('T')[0] : item.expirationDate) 
                        : null;

                      return (
                      <tr key={item._id} className={`${expDateStr && isExpiringSoon(expDateStr) ? 'bg-yellow-50 hover:bg-yellow-100' : 'hover:bg-gray-50'}`}>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-primary border-gray-300 rounded"
                            checked={selectedItems.has(item._id)}
                            onChange={() => toggleItemSelection(item._id)}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingRowId === item._id ? (
                            <input
                              type="text"
                              value={rowEditData.name}
                              onChange={(e) => setRowEditData({ ...rowEditData, name: e.target.value })}
                              className="w-full border px-2 py-1 rounded"
                            />
                          ) : (
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingRowId === item._id ? (
                            <div className="flex space-x-2">
                              <input
                                type="number"
                                value={rowEditData.quantity}
                                onChange={(e) => setRowEditData({ ...rowEditData, quantity: e.target.value })}
                                className="w-20 border px-2 py-1 rounded"
                              />
                              <select
                                value={rowEditData.unit}
                                onChange={(e) => setRowEditData({ ...rowEditData, unit: e.target.value })}
                                className="border px-2 py-1 rounded"
                              >
                                <option value="pcs">pcs</option>
                                <option value="lbs">lbs</option>
                                <option value="oz">oz</option>
                                <option value="kg">kg</option>
                                <option value="g">g</option>
                                <option value="cups">cups</option>
                                <option value="tbsp">tbsp</option>
                                <option value="tsp">tsp</option>
                                <option value="liters">liters</option>
                                <option value="ml">ml</option>
                              </select>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-900">{item.quantity} {item.unit}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingRowId === item._id ? (
                            <input
                              type="date"
                              value={rowEditData.expirationDate}
                              onChange={(e) => setRowEditData({ ...rowEditData, expirationDate: e.target.value })}
                              className="border px-2 py-1 rounded"
                            />
                          ) : expDateStr ? (
                            <div className={`text-sm ${parseLocalDate(expDateStr) < getTodayAtMidnight() ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                              <Calendar className={`inline-block w-4 h-4 mr-1 ${parseLocalDate(expDateStr) < getTodayAtMidnight() ? 'text-red-500' : (isExpiringSoon(expDateStr) ? 'text-yellow-500' : 'text-gray-400')}`} />
                              {parseLocalDate(expDateStr).toLocaleDateString()}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                          {editingRowId === item._id ? (
                            <>
                              <button onClick={() => handleRowSave(item._id)} className="text-blue-600 hover:text-blue-800 inline-flex items-center">Save</button>
                              <button onClick={handleRowCancel} className="text-gray-600 hover:text-gray-800 inline-flex items-center">Cancel</button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => handleEdit(item)} className="text-green-600 hover:text-green-800 inline-flex items-center">
                                <Edit2 className="w-4 h-4 mr-1" /> Edit
                              </button>
                              <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-800 inline-flex items-center">
                                <Trash2 className="w-4 h-4 mr-1" /> Delete
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );})}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
      </main>
    </>
  );
};

export default PantryPage;