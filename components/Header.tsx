import React, { useState } from 'react';
import { ShoppingBag, Menu, User, Sparkles, LayoutDashboard, Bell, X } from 'lucide-react';
import { ViewState, Notification } from '../types';

interface HeaderProps {
  cartItemCount: number;
  setView: (view: ViewState) => void;
  currentView: ViewState;
  userRole?: 'user' | 'admin';
}

export const Header: React.FC<HeaderProps> = ({ cartItemCount, setView, currentView, userRole }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Welcome!', message: 'Thanks for joining Kenya-Amazon.', read: false, time: '2m ago' },
    { id: '2', title: 'New Drop', message: 'The Velocity Runner X2 is now available.', read: false, time: '1h ago' },
    { id: '3', title: 'Flash Sale', message: 'Get 20% off all Basketball gear.', read: true, time: '1d ago' }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

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
              onClick={() => setView('about')}
              className={`${currentView === 'about' ? 'text-indigo-600' : 'text-gray-500'} hover:text-black font-medium transition`}
            >
              About Us
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
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (!showNotifications) markAsRead();
                }}
                className="text-gray-500 hover:text-black transition relative"
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-4 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in-up origin-top-right">
                  <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Notifications</h3>
                    <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4"/></button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition ${!n.read ? 'bg-indigo-50/50' : ''}`}>
                         <div className="flex justify-between items-start mb-1">
                           <p className="font-semibold text-sm text-gray-900">{n.title}</p>
                           <span className="text-xs text-gray-400">{n.time}</span>
                         </div>
                         <p className="text-sm text-gray-600">{n.message}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-gray-50 text-center">
                    <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800">View All</button>
                  </div>
                </div>
              )}
            </div>

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