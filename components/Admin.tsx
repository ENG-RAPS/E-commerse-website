import React, { useState, useRef } from 'react';
import { Product } from '../types';
import { Plus, Trash, Search, BarChart3, Package, TrendingUp, TrendingDown, PieChart, Bot, Sparkles, Zap, ArrowRight, Save, Loader2, Upload, Database } from 'lucide-react';
import { analyzeMarketTrends, generateCampaignOffers, PriceUpdateSuggestion } from '../services/geminiService';

interface AdminProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateProduct: (product: Product) => void;
}

// Simple Bar Chart Component
const SimpleBarChart = ({ data, color = "bg-indigo-500" }: { data: { label: string; value: number, secondaryValue?: number }[], color?: string }) => {
  const maxValue = Math.max(...data.map(d => Math.max(d.value, d.secondaryValue || 0)), 1);
  return (
    <div className="h-64 flex items-end gap-2 sm:gap-4 mt-4 w-full">
      {data.map((item, idx) => {
        const heightPercent = (item.value / maxValue) * 100;
        const secondaryHeightPercent = item.secondaryValue ? (item.secondaryValue / maxValue) * 100 : 0;
        return (
          <div key={idx} className="flex-1 flex flex-col items-center group relative">
            <div className="w-full h-full flex items-end justify-center gap-1">
               {/* Primary Bar */}
               <div 
                 className={`w-full max-w-[20px] rounded-t-md transition-all duration-700 ease-out hover:brightness-110 relative ${color}`}
                 style={{ height: `${heightPercent}%` }}
               >
               </div>
               {/* Secondary Bar (Comparison) */}
               {item.secondaryValue && (
                 <div 
                   className={`w-full max-w-[20px] rounded-t-md transition-all duration-700 ease-out hover:brightness-110 relative bg-gray-300`}
                   style={{ height: `${secondaryHeightPercent}%` }}
                 >
                 </div>
               )}
            </div>
            <span className="text-xs text-gray-500 mt-2 font-medium truncate w-full text-center">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export const Admin: React.FC<AdminProps> = ({ products, onAddProduct, onDeleteProduct, onUpdateProduct }) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'analytics' | 'ai-agent'>('analytics');
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dbInputRef = useRef<HTMLInputElement>(null);

  // AI Agent State
  const [marketAnalysis, setMarketAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [campaignPrompt, setCampaignPrompt] = useState('');
  const [offerSuggestions, setOfferSuggestions] = useState<PriceUpdateSuggestion[]>([]);
  const [isGeneratingOffers, setIsGeneratingOffers] = useState(false);
  
  // Analytics Data
  const sortedBySales = [...products].sort((a, b) => b.sales - a.sales);
  const topProducts = sortedBySales.slice(0, 3);
  const bottomProducts = [...products].sort((a, b) => a.sales - b.sales).slice(0, 3);
  const totalRevenue = products.reduce((acc, p) => acc + (p.price * p.sales), 0);

  // Derived Data for Graphs
  const categorySales = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + p.sales;
    return acc;
  }, {} as Record<string, number>);

  const categoryChartData = Object.entries(categorySales).map(([label, value]) => ({ label, value }));

  // Mock Weekly Data
  const weeklyData = [
    { label: 'Mon', value: 12400 },
    { label: 'Tue', value: 15600 },
    { label: 'Wed', value: 9800 },
    { label: 'Thu', value: 18200 },
    { label: 'Fri', value: 24500 },
    { label: 'Sat', value: 32000 },
    { label: 'Sun', value: 28100 },
  ];

  // AI Handler: Trends
  const handleAnalyzeTrends = async () => {
    setIsAnalyzing(true);
    try {
      const categories = Array.from(new Set(products.map(p => p.category)));
      const analysis = await analyzeMarketTrends(categories);
      setMarketAnalysis(analysis);
    } catch (e) {
      console.error(e);
      setMarketAnalysis("Failed to fetch market trends. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // AI Handler: Offers
  const handleGenerateOffers = async () => {
    if (!campaignPrompt) return;
    setIsGeneratingOffers(true);
    setOfferSuggestions([]);
    try {
      const suggestions = await generateCampaignOffers(products, campaignPrompt);
      setOfferSuggestions(suggestions);
    } catch (e) {
      console.error(e);
      alert("Failed to generate offers.");
    } finally {
      setIsGeneratingOffers(false);
    }
  };

  const handleApplyOffers = () => {
    offerSuggestions.forEach(suggestion => {
      const product = products.find(p => p.id === suggestion.productId);
      if (product) {
        onUpdateProduct({
          ...product,
          originalPrice: product.originalPrice || product.price, // Save old price
          price: suggestion.suggestedPrice
        });
      }
    });
    setOfferSuggestions([]);
    setCampaignPrompt('');
    alert("Offers applied successfully!");
  };

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
      reviews: 0,
      sales: 0
    };
    onAddProduct(product);
    setIsAdding(false);
    setNewProduct({ name: '', price: 0, category: 'Lifestyle', description: '', image: 'https://picsum.photos/seed/new/800/800' });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDbImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
         try {
           const importedProducts = JSON.parse(event.target?.result as string);
           if (Array.isArray(importedProducts)) {
             // Mocking the import by just adding the first valid one or alerting
             alert(`Successfully simulated import of ${importedProducts.length} products from Database Backup.`);
           } else {
             alert("Invalid Database File Format");
           }
         } catch(err) {
           alert("Failed to parse database file.");
         }
      };
      reader.readAsText(file);
    }
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // Compare Graph Data for Offers
  const offersGraphData = offerSuggestions.slice(0, 5).map(s => {
    const p = products.find(prod => prod.id === s.productId);
    return {
      label: p?.name.substring(0, 10) || 'Item',
      value: p?.price || 0,        // Old Price
      secondaryValue: s.suggestedPrice // New Price
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex gap-2">
          <button 
             onClick={() => setActiveTab('analytics')}
             className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === 'analytics' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <BarChart3 className="w-4 h-4"/> Analytics
          </button>
          <button 
             onClick={() => setActiveTab('ai-agent')}
             className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === 'ai-agent' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Bot className="w-4 h-4"/> AI Agent
          </button>
          <button 
             onClick={() => setActiveTab('inventory')}
             className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === 'inventory' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Package className="w-4 h-4"/> Inventory
          </button>
        </div>
      </div>

      {activeTab === 'ai-agent' && (
        <div className="animate-fade-in space-y-8">
          {/* Market Intelligence Section */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white shadow-xl">
             <div className="flex items-center gap-3 mb-6">
               <div className="p-3 bg-indigo-500/20 rounded-lg">
                 <TrendingUp className="w-6 h-6 text-indigo-400" />
               </div>
               <div>
                 <h2 className="text-xl font-bold text-white">Market Intelligence</h2>
                 <p className="text-gray-400 text-sm">Real-time analysis of inventory trends</p>
               </div>
             </div>
             
             <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                {!marketAnalysis ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400 mb-6">Click below to analyze your current catalog against Kenyan market trends.</p>
                    <button 
                      onClick={handleAnalyzeTrends}
                      disabled={isAnalyzing}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto transition-all"
                    >
                      {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin"/> : <Sparkles className="w-5 h-5"/>}
                      Analyze Market Trends
                    </button>
                  </div>
                ) : (
                  <div className="prose prose-invert max-w-none">
                     <div className="whitespace-pre-wrap">{marketAnalysis}</div>
                     <button 
                      onClick={() => setMarketAnalysis('')}
                      className="mt-6 text-sm text-indigo-400 hover:text-indigo-300 underline"
                    >
                      Clear Analysis
                    </button>
                  </div>
                )}
             </div>
          </div>

          {/* Campaign Creator Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
             <div className="flex items-center gap-3 mb-6">
               <div className="p-3 bg-purple-100 rounded-lg">
                 <Zap className="w-6 h-6 text-purple-600" />
               </div>
               <div>
                 <h2 className="text-xl font-bold text-gray-900">Campaign & Offer Creator</h2>
                 <p className="text-gray-500 text-sm">Generate smart discounts for holidays (Christmas, Black Friday)</p>
               </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">Campaign Theme</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={campaignPrompt}
                      onChange={(e) => setCampaignPrompt(e.target.value)}
                      placeholder="e.g., Christmas Super Sale, 50% Off Running Shoes..."
                      className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3 bg-gray-900 text-white placeholder-gray-400" 
                    />
                    <button 
                      onClick={handleGenerateOffers}
                      disabled={!campaignPrompt || isGeneratingOffers}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap disabled:opacity-50 transition-colors"
                    >
                      {isGeneratingOffers ? <Loader2 className="w-5 h-5 animate-spin"/> : <Bot className="w-5 h-5"/>}
                      Generate
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    The AI will analyze your inventory and suggest price reductions based on your theme.
                  </p>
                </div>

                {offerSuggestions.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4"/> Projected Price Adjustments
                    </h3>
                    <SimpleBarChart data={offersGraphData} color="bg-indigo-400" />
                    <div className="flex justify-center mt-2 gap-4 text-xs">
                       <span className="flex items-center gap-1"><div className="w-2 h-2 bg-indigo-400 rounded-full"></div> Current Price</span>
                       <span className="flex items-center gap-1"><div className="w-2 h-2 bg-gray-300 rounded-full"></div> Discount Price</span>
                    </div>
                  </div>
                )}
             </div>

             {offerSuggestions.length > 0 && (
               <div className="mt-8 border-t border-gray-100 pt-8">
                 <div className="flex justify-between items-center mb-4">
                   <h3 className="font-bold text-gray-900">Suggested Updates ({offerSuggestions.length})</h3>
                   <button 
                     onClick={handleApplyOffers}
                     className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                   >
                     <Save className="w-4 h-4"/> Apply All Offers
                   </button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {offerSuggestions.map((offer, idx) => {
                     const product = products.find(p => p.id === offer.productId);
                     if (!product) return null;
                     const discount = Math.round(((product.price - offer.suggestedPrice) / product.price) * 100);
                     
                     return (
                       <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                         <div className="flex items-center gap-3">
                           <img src={product.image} className="w-10 h-10 rounded object-cover" alt="" />
                           <div>
                             <p className="font-medium text-sm text-gray-900">{product.name}</p>
                             <p className="text-xs text-gray-500">{offer.reasoning}</p>
                           </div>
                         </div>
                         <div className="text-right">
                           <div className="flex items-center gap-2 justify-end">
                             <span className="text-xs text-gray-400 line-through">KSh {product.price}</span>
                             <ArrowRight className="w-3 h-3 text-gray-400"/>
                             <span className="text-sm font-bold text-green-600">KSh {offer.suggestedPrice}</span>
                           </div>
                           <span className="text-xs font-bold text-red-500">-{discount}% OFF</span>
                         </div>
                       </div>
                     );
                   })}
                 </div>
               </div>
             )}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-fade-in">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">KSh {totalRevenue.toLocaleString()}</p>
             </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 font-medium">Total Products</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{products.length}</p>
             </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 font-medium">Top Category</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">Basketball</p>
             </div>
          </div>

          {/* Graphs Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" /> Revenue Traffic (Last 7 Days)
              </h3>
              <SimpleBarChart data={weeklyData} color="bg-indigo-600" />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-emerald-600" /> Sales by Category
              </h3>
              <SimpleBarChart data={categoryChartData} color="bg-emerald-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Most Bought */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-6 border-b border-gray-100 bg-green-50">
                  <h3 className="text-lg font-bold text-green-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5"/> Most Bought Products
                  </h3>
               </div>
               <div className="divide-y divide-gray-100">
                 {topProducts.map((p, idx) => (
                   <div key={p.id} className="p-4 flex items-center gap-4">
                     <span className="text-xl font-bold text-gray-300 w-6">#{idx + 1}</span>
                     <img src={p.image} className="w-12 h-12 rounded object-cover" alt={p.name}/>
                     <div className="flex-1">
                       <h4 className="font-medium text-gray-900">{p.name}</h4>
                       <p className="text-xs text-gray-500">KSh {p.price}</p>
                     </div>
                     <div className="text-right">
                       <p className="font-bold text-gray-900">{p.sales.toLocaleString()}</p>
                       <p className="text-xs text-gray-500">Sales</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Least Bought */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-6 border-b border-gray-100 bg-red-50">
                  <h3 className="text-lg font-bold text-red-900 flex items-center gap-2">
                    <TrendingDown className="w-5 h-5"/> Least Bought Products
                  </h3>
               </div>
               <div className="divide-y divide-gray-100">
                 {bottomProducts.map((p, idx) => (
                   <div key={p.id} className="p-4 flex items-center gap-4">
                     <img src={p.image} className="w-12 h-12 rounded object-cover" alt={p.name}/>
                     <div className="flex-1">
                       <h4 className="font-medium text-gray-900">{p.name}</h4>
                       <p className="text-xs text-gray-500">KSh {p.price}</p>
                     </div>
                     <div className="text-right">
                       <p className="font-bold text-gray-900">{p.sales.toLocaleString()}</p>
                       <p className="text-xs text-gray-500">Sales</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="animate-fade-in">
          <div className="flex justify-end gap-3 mb-4">
             {/* Hidden Inputs for File Upload */}
             <input type="file" ref={dbInputRef} accept=".json" className="hidden" onChange={handleDbImport}/>
             
             <button
               onClick={() => dbInputRef.current?.click()}
               className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700"
             >
                <Database className="w-4 h-4"/> Import DB
             </button>
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
                    className="border border-gray-600 bg-gray-800 text-white p-2 rounded placeholder-gray-400"
                    value={newProduct.name}
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    className="border border-gray-600 bg-gray-800 text-white p-2 rounded placeholder-gray-400"
                    value={newProduct.price || ''}
                    onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                    required
                  />
                  <select
                    className="border border-gray-600 bg-gray-800 text-white p-2 rounded"
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}
                  >
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Running">Running</option>
                    <option value="Basketball">Basketball</option>
                  </select>
                  
                  {/* Image Upload Handling */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Image URL"
                      className="border border-gray-600 bg-gray-800 text-white p-2 rounded placeholder-gray-400 flex-1"
                      value={newProduct.image}
                      onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                    />
                    <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleImageUpload}/>
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-gray-700 text-white px-3 py-2 rounded hover:bg-gray-600"
                      title="Upload Image File"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <textarea
                  placeholder="Description"
                  className="w-full border border-gray-600 bg-gray-800 text-white p-2 rounded placeholder-gray-400"
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
                      KSh {product.price.toFixed(2)}
                      {product.originalPrice && <span className="ml-2 text-xs line-through text-red-400">KSh {product.originalPrice.toFixed(2)}</span>}
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
      )}
    </div>
  );
};