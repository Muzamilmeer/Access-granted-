import React from 'react';
import { ShoppingCart, User, Search } from 'lucide-react';
import { useShoppingContext } from '../context/ShoppingContext';

interface HeaderProps {
  onCartClick: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, searchTerm, onSearchChange }) => {
  const { getTotalItems, user } = useShoppingContext();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">ShopEase</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search products..."
              />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {/* User Info */}
            <div className="flex items-center space-x-2 text-gray-700">
              <User className="h-5 w-5" />
              <span className="hidden sm:block">{user?.name}</span>
            </div>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:block">Cart</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;