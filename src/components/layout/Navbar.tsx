import React from 'react';
import { MapPin, Search, Bell, User } from 'lucide-react';
import { userLocation } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export function Navbar() {
  const { state, dispatch } = useApp();

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-500 px-4 py-3 text-white">
      <div className="flex items-center justify-between mb-3">
        {/* Location */}
        <button className="flex items-center gap-2 max-w-[180px]">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-medium truncate">{userLocation.label}</span>
        </button>

        {/* Profile & Notifications */}
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button 
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'profile' })}
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for products or stores..."
          className="w-full pl-10 pr-4 py-3 bg-white rounded-lg text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={state.searchQuery}
          onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
        />
      </div>
    </div>
  );
}