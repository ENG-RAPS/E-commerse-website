import React from 'react';

interface LoginProps {
  onLogin: (role: 'user' | 'admin') => void;
  onSwitchToRegister: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister }) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-md w-full space-y-8 bg-gray-900 p-10 rounded-xl shadow-2xl border border-gray-800">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-white">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-400">Sign in to your account</p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <input 
                type="email" 
                required 
                className="appearance-none block w-full px-3 py-3 border border-gray-700 bg-gray-800 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors" 
                placeholder="Email address" 
              />
            </div>
            <div>
              <input 
                type="password" 
                required 
                className="appearance-none block w-full px-3 py-3 border border-gray-700 bg-gray-800 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors" 
                placeholder="Password" 
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <button onClick={() => onLogin('user')} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg">
              Sign in as User
            </button>
            <button onClick={() => onLogin('admin')} className="group relative w-full flex justify-center py-3 px-4 border border-gray-600 text-sm font-medium rounded-md text-white bg-transparent hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Sign in as Admin
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <button 
                onClick={onSwitchToRegister} 
                className="font-medium text-indigo-400 hover:text-indigo-300"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};