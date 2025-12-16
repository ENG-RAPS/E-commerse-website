import React, { useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from './constants';
import { Product, CartItem, ViewState, User } from './types';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { CustomGenerator } from './components/CustomGenerator';
import { Admin } from './components/Admin';
import { ArrowRight, Star, Shield, Truck } from 'lucide-react';

// Simple Hero Component internal to App for brevity, or could be separate
const Hero = ({ onShopNow }: { onShopNow: () => void }) => (
  <div className="relative bg-black text-white overflow-hidden">
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1556906781-9a412961d289?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        alt="Sneaker Background"
        className="w-full h-full object-cover opacity-60"
      />
    </div>
    <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
        Step Into the <span className="text-indigo-400">Future</span>
      </h1>
      <p className="mt-6 text-xl text-gray-300 max-w-3xl">
        Experience the perfect blend of street culture and athletic performance. Kenya-Amazon brings you the latest drops and custom AI-designed kicks.
      </p>
      <div className="mt-10 flex gap-4">
        <button
          onClick={onShopNow}
          className="bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700 flex items-center gap-2"
        >
          Shop Now <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);

// Product Detail Component (Internal for simple state mgmt)
const ProductDetailView = ({ 
  product, 
  onAddToCart, 
  onBack 
}: { 
  product: Product; 
  onAddToCart: (p: Product, size: number, qty: number) => void;
  onBack: () => void;
}) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <button onClick={onBack} className="text-gray-500 hover:text-black mb-6 flex items-center gap-2">
        &larr; Back to Shop
      </button>
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover object-center" />
        </div>
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">${product.price.toFixed(2)}</p>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Description</h3>
            <p className="mt-2 text-base text-gray-500">{product.description}</p>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Size guide</a>
            </div>
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 mt-4">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none ${
                    selectedSize === size
                      ? 'bg-indigo-600 border-transparent text-white ring-2 ring-indigo-500'
                      : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
              <span className="text-sm font-medium text-gray-900">Quantity</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  className="px-3 py-1 hover:bg-gray-100" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >-</button>
                <span className="px-3 py-1">{quantity}</span>
                <button 
                  className="px-3 py-1 hover:bg-gray-100"
                  onClick={() => setQuantity(quantity + 1)}
                >+</button>
              </div>
          </div>

          <button
            onClick={() => {
              if (selectedSize) {
                onAddToCart(product, selectedSize, quantity);
              } else {
                alert("Please select a size");
              }
            }}
            type="submit"
            className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add to bag
          </button>

          <div className="mt-6 flex gap-4 text-sm text-gray-500">
             <div className="flex items-center gap-1"><Shield className="w-4 h-4"/> Secure Checkout</div>
             <div className="flex items-center gap-1"><Truck className="w-4 h-4"/> Free Shipping over $150</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Login Mock
const LoginView = ({ onLogin }: { onLogin: (role: 'user' | 'admin') => void }) => (
  <div className="flex items-center justify-center min-h-[60vh] px-4">
    <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome Back</h2>
        <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
      </div>
      <div className="mt-8 space-y-6">
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <input type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
          </div>
          <div>
            <input type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => onLogin('user')} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Sign in as User
          </button>
          <button onClick={() => onLogin('admin')} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            Sign in as Admin
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Cart Logic
  const addToCart = (product: Product, selectedSize: number, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === selectedSize);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === selectedSize)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, selectedSize, quantity }];
    });
    setView('cart');
  };

  const removeFromCart = (id: string, size: number) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const updateCartQty = (id: string, size: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('product');
  };

  const handleAdminAddProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const handleAdminDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleLogin = (role: 'user' | 'admin') => {
    setUser({ id: 'u1', name: 'Demo User', email: 'demo@example.com', role });
    setView('home');
  };

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Render Logic
  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <>
            <Hero onShopNow={() => setView('shop')} />
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
              <div className="flex justify-between items-end mb-8">
                 <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured Drops</h2>
                 <button onClick={() => setView('shop')} className="text-indigo-600 hover:text-indigo-800 font-medium">View All &rarr;</button>
              </div>
              <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} onProductClick={handleProductClick} />
                ))}
              </div>
              
              <div className="mt-24 bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
                 <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-12 flex flex-col justify-center">
                       <h3 className="text-3xl font-bold text-white mb-4">Design Your Own</h3>
                       <p className="text-gray-400 mb-8 text-lg">
                         Unleash your creativity with our AI-powered studio. Generate unique colorways and styles that no one else has.
                       </p>
                       <button 
                         onClick={() => setView('generator')}
                         className="bg-white text-black px-8 py-3 rounded-full font-bold self-start hover:bg-gray-200 transition"
                       >
                         Open Studio
                       </button>
                    </div>
                    <div className="relative h-64 lg:h-auto">
                       <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" className="absolute inset-0 w-full h-full object-cover" alt="Creative"/>
                    </div>
                 </div>
              </div>
            </div>
          </>
        );
      case 'shop':
        return (
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">All Sneakers</h1>
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.map(product => (
                <ProductCard key={product.id} product={product} onProductClick={handleProductClick} />
              ))}
            </div>
          </div>
        );
      case 'product':
        return selectedProduct ? (
          <ProductDetailView 
            product={selectedProduct} 
            onAddToCart={addToCart} 
            onBack={() => setView('shop')} 
          />
        ) : null;
      case 'cart':
        return (
          <Cart 
            items={cart} 
            onRemove={removeFromCart} 
            onUpdateQty={updateCartQty} 
            onCheckout={() => alert('Checkout Integration Coming Soon!')} 
            onContinueShopping={() => setView('shop')}
          />
        );
      case 'generator':
        return (
          <CustomGenerator 
            onAddToCatalog={(newProduct) => {
              setProducts([newProduct, ...products]);
              setView('shop');
            }} 
          />
        );
      case 'login':
        return <LoginView onLogin={handleLogin} />;
      case 'admin':
        return user?.role === 'admin' ? (
          <Admin 
            products={products} 
            onAddProduct={handleAdminAddProduct} 
            onDeleteProduct={handleAdminDeleteProduct} 
          />
        ) : (
          <div className="text-center py-20">
             <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
             <p className="mt-2 text-gray-500">You must be logged in as an admin to view this page.</p>
             <button onClick={() => setView('login')} className="mt-4 text-indigo-600 underline">Go to Login</button>
          </div>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        cartItemCount={cartItemCount} 
        setView={setView} 
        currentView={view} 
        userRole={user?.role}
      />
      <main className="flex-grow bg-gray-50">
        {renderContent()}
      </main>
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <span className="text-lg font-black tracking-tighter text-black">
                KENYA<span className="text-indigo-600">AMAZON</span>
              </span>
              <p className="mt-4 text-gray-500 text-sm">
                Redefining footwear culture since 2024.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Pricing</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Documentation</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Guides</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Privacy</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Terms</a></li>
              </ul>
            </div>
          </div>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; 2024 Kenya-Amazon Sneakers. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}