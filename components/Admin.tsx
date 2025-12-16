import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Trash, Search } from 'lucide-react';

interface AdminProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

export const Admin: React.FC<AdminProps> = ({ products, onAddProduct, onDeleteProduct }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'Lifestyle',
    description: '',
    image: 'https://picsum.photos/seed/new/800/800'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: `p-${Date.now()}`,
      name: newProduct.name || 'New Product',
      brand: 'Kenya-Amazon',
      price: newProduct.price || 0,
      description: newProduct.description || '',
      image: newProduct.image || '',
      sizes: [7, 8, 9, 10, 11],
      category: newProduct.category as any,
      rating: 0,
      reviews: 0
    };
    onAddProduct(product);
    setIsAdding(false);
    setNewProduct({ name: '', price: 0, category: 'Lifestyle', description: '', image: 'https://picsum.photos/seed/new/800/800' });
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 mb-8 animate-fade-in-down">
          <h2 className="text-lg font-bold mb-4">Add New Sneaker</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                className="border p-2 rounded"
                value={newProduct.name}
                onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                required
              />
              <input
                type="number"
                placeholder="Price"
                className="border p-2 rounded"
                value={newProduct.price || ''}
                onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                required
              />
              <select
                className="border p-2 rounded"
                value={newProduct.category}
                onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}
              >
                <option value="Lifestyle">Lifestyle</option>
                <option value="Running">Running</option>
                <option value="Basketball">Basketball</option>
              </select>
              <input
                type="text"
                placeholder="Image URL"
                className="border p-2 rounded"
                value={newProduct.image}
                onChange={e => setNewProduct({...newProduct, image: e.target.value})}
              />
            </div>
            <textarea
              placeholder="Description"
              className="w-full border p-2 rounded"
              rows={3}
              value={newProduct.description}
              onChange={e => setNewProduct({...newProduct, description: e.target.value})}
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Product List */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center gap-2">
           <Search className="w-5 h-5 text-gray-400" />
           <input 
             type="text" 
             placeholder="Search inventory..." 
             className="flex-1 outline-none text-sm"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => onDeleteProduct(product.id)} className="text-red-600 hover:text-red-900">
                    <Trash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};