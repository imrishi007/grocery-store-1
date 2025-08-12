import React from 'react';
import { ArrowRight, Truck, Calendar, Gift } from 'lucide-react';
import { ProductCardCompact } from '../components/product/ProductCardCompact';
import { StoreCard } from '../components/store/StoreCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { stores, products, categories } from '../data/mockData';
import { useApp } from '../context/AppContext';

export function HomeScreen() {
  const { state, dispatch } = useApp();

  const featuredProducts = products.slice(0, 9);
  const nearbyStores = stores.filter(s => s.open);

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
      {/* Hero Carousel */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-500 px-4 py-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
          <h2 className="text-xl font-bold mb-2">Fresh groceries delivered</h2>
          <p className="text-blue-100 mb-4">Get your daily essentials delivered to your door</p>
          <Button variant="secondary" className="bg-white text-blue-500 hover:bg-blue-50">
            Shop Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Nearby Stores */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Nearby Stores</h2>
          <button className="text-blue-500 text-sm font-medium">View All</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {nearbyStores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </div>

      {/* Featured Products Grid */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Featured Products</h2>
          <button 
            className="text-blue-500 text-sm font-medium"
            onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'categories' })}
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {featuredProducts.map((product) => (
            <ProductCardCompact
              key={product.id}
              product={product}
              onQuickAdd={handleQuickAdd}
            />
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Services</h2>
        <div className="grid grid-cols-1 gap-4">
          {/* Takeout */}
          <div 
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'takeout' })}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Takeout</h3>
                <p className="text-sm text-gray-500">Pickup from store - no delivery fee</p>
              </div>
              <Badge variant="accent" size="sm">Free</Badge>
            </div>
          </div>

          {/* Subscriptions */}
          <div 
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'subscriptions' })}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Subscriptions</h3>
                <p className="text-sm text-gray-500">Never run out of essentials</p>
              </div>
              <Badge variant="success" size="sm">Save 5%</Badge>
            </div>
          </div>

          {/* Perks */}
          <div 
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'perks' })}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Gift className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Member Perks</h3>
                <p className="text-sm text-gray-500">Exclusive deals and rewards</p>
              </div>
              <Badge variant="success" size="sm">New</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Category Scroller */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Shop by Category</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.slice(1).map((category) => (
            <button
              key={category}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                state.selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => {
                dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
                dispatch({ type: 'SET_SCREEN', payload: 'categories' });
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}