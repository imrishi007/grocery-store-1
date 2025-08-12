import React from 'react';
import { Home, Grid3X3, Search, ShoppingCart, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function BottomNav() {
  const { state, dispatch } = useApp();
  const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'categories', icon: Grid3X3, label: 'Categories' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'cart', icon: ShoppingCart, label: 'Cart', badge: cartItemCount },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1 safe-area-pb">
      <div className="flex items-center justify-around">
        {navItems.map(({ id, icon: Icon, label, badge }) => (
          <button
            key={id}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors min-w-[60px] ${
              state.currentScreen === id
                ? 'text-blue-500 bg-blue-50'
                : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'
            }`}
            onClick={() => {
              if (id === 'cart') {
                dispatch({ type: 'TOGGLE_CART' });
              } else {
                dispatch({ type: 'SET_SCREEN', payload: id });
              }
            }}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {badge && badge > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {badge > 9 ? '9+' : badge}
                </span>
              )}
            </div>
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}