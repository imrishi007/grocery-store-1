import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { Store } from '../../types';
import { Badge } from '../ui/Badge';
import { useApp } from '../../context/AppContext';

interface StoreCardProps {
  store: Store;
}

export function StoreCard({ store }: StoreCardProps) {
  const { dispatch } = useApp();

  return (
    <button
      className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow text-left"
      onClick={() => {
        dispatch({ type: 'SET_SELECTED_STORE', payload: store.id });
        dispatch({ type: 'SET_SCREEN', payload: 'store-products' });
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
            {store.logo}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 text-sm">{store.name}</h3>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              <MapPin className="w-3 h-3" />
              <span>{store.distanceKm.toFixed(1)} km</span>
            </div>
          </div>
        </div>
        
        <Badge
          variant={store.open ? 'success' : 'warning'}
          size="sm"
        >
          <Clock className="w-3 h-3 mr-1" />
          {store.open ? 'Open' : 'Closed'}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-1">
        {store.categories.slice(0, 2).map((category) => (
          <Badge key={category} variant="default" size="sm">
            {category}
          </Badge>
        ))}
        {store.categories.length > 2 && (
          <Badge variant="default" size="sm">
            +{store.categories.length - 2}
          </Badge>
        )}
      </div>
    </button>
  );
}