import React, { useState } from 'react';
import { ArrowLeft, Filter, Grid3X3, List, Truck, MapPin } from 'lucide-react';
import { ProductCardCompact } from '../components/product/ProductCardCompact';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { products, stores } from '../data/mockData';
import { useApp } from '../context/AppContext';

export function StoreProductsScreen() {
  const { state, dispatch } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const selectedStore = stores.find(s => s.id === state.selectedStore);
  const storeProducts = products.filter(p => p.storeId === state.selectedStore);

  if (!selectedStore) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Store not found</p>
      </div>
    );
  }

  const handleQuickAdd = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          productId: product.id,
          quantity: 1,
          selectedVariant: product.variants[0],
          storeId: product.storeId
        }
      });
    }
  };

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'home' })}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
              {selectedStore.logo}
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">{selectedStore.name}</h1>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{selectedStore.distanceKm.toFixed(1)} km away</span>
                <Badge variant={selectedStore.open ? 'success' : 'warning'} size="sm">
                  {selectedStore.open ? 'Open' : 'Closed'}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Pickup/Delivery Toggle */}
        <div className="flex gap-2 mb-3">
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              state.deliveryMode === 'delivery'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => dispatch({ type: 'SET_DELIVERY_MODE', payload: 'delivery' })}
          >
            <Truck className="w-4 h-4" />
            Delivery
          </button>
          <button
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              state.deliveryMode === 'pickup'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => dispatch({ type: 'SET_DELIVERY_MODE', payload: 'pickup' })}
          >
            <MapPin className="w-4 h-4" />
            Pickup
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <button
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm font-medium"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
          
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white text-blue-500 shadow-sm' 
                  : 'text-gray-600 hover:text-blue-500'
              }`}
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white text-blue-500 shadow-sm' 
                  : 'text-gray-600 hover:text-blue-500'
              }`}
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Delivery Fee Info */}
      {state.deliveryMode === 'delivery' && (
        <div className="bg-blue-50 border-b px-4 py-2">
          <div className="text-sm text-blue-700">
            Delivery fee: ${(selectedStore.distanceKm * selectedStore.deliveryRatePerKm).toFixed(2)}
            <span className="text-blue-500 ml-1">
              (${selectedStore.deliveryRatePerKm}/km × {selectedStore.distanceKm.toFixed(1)}km)
            </span>
          </div>
        </div>
      )}

      {state.deliveryMode === 'pickup' && (
        <div className="bg-green-50 border-b px-4 py-2">
          <div className="text-sm text-green-700 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            Free pickup from store - no delivery fee
          </div>
        </div>
      )}

      {/* Products */}
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Products ({storeProducts.length})
          </h2>
        </div>
        
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-3 gap-3">
            {storeProducts.map((product) => (
              <ProductCardCompact
                key={product.id}
                product={product}
                onQuickAdd={handleQuickAdd}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {storeProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 flex items-center gap-3"
                onClick={() => {
                  dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product });
                  dispatch({ type: 'SET_SCREEN', payload: 'product-detail' });
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.unit}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-gray-900">
                      ${product.basePrice.toFixed(2)}
                    </span>
                    {product.discount > 0 && (
                      <Badge variant="accent" size="sm">
                        {product.discount}% off
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickAdd(product.id);
                  }}
                >
                  Add
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}