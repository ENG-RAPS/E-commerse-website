import React from 'react';
import { ShoppingBag, Menu, User, Sparkles, LayoutDashboard } from 'lucide-react';
import { ViewState } from '../types';

interface HeaderProps {
  cartItemCount: number;
  setView: (view: ViewState) => void;
  currentView: ViewState;
  userRole?: 'user' | 'admin';
}

export const Header: React.FC<HeaderProps> = ({ cartItemCount, setView, currentView, userRole }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer" 
            onClick={() => setView('home')}
          >
            <span className="text-2xl font-black tracking-tighter text-black">
              KENYA<span className="text-indigo-600">AMAZON</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => setView('home')}
              className={`${currentView === 'home' ? 'text-indigo-600' : 'text-gray-500'} hover:text-black font-medium transition`}
            >
              Home
            </button>
            <button 
              onClick={() => setView('shop')}
              className={`${currentView === 'shop' ? 'text-indigo-600' : 'text-gray-500'} hover:text-black font-medium transition`}
            >
              Shop
            </button>
            <button 
              onClick={() => setView('generator')}
              className={`flex items-center gap-1 ${currentView === 'generator' ? 'text-indigo-600' : 'text-gray-500'} hover:text-black font-medium transition`}
            >
              <Sparkles className="w-4 h-4" />
              Custom Studio
            </button>
            {userRole === 'admin' && (
               <button 
               onClick={() => setView('admin')}
               className={`flex items-center gap-1 ${currentView === 'admin' ? 'text-indigo-600' : 'text-gray-500'} hover:text-black font-medium transition`}
             >
               <LayoutDashboard className="w-4 h-4" />
               Admin
             </button>
            )}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button onClick={() => setView('login')} className="text-gray-500 hover:text-black transition">
              <User className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setView('cart')}
              className="text-gray-500 hover:text-black transition relative"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button className="md:hidden text-gray-500 hover:text-black">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};