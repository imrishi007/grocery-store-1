import React from 'react';
import { X, Minus, Plus, Truck, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { products, stores } from '../../data/mockData';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export function MiniCart() {
  const { state, dispatch } = useApp();

  if (!state.showCart) return null;

  const getProduct = (id: string) => products.find(p => p.id === id);
  const getStore = (id: string) => stores.find(s => s.id === id);

  // Group cart items by store
  const itemsByStore = state.cart.reduce((acc, item) => {
    const key = item.storeId;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, typeof state.cart>);

  const getTotalPrice = () => {
    return state.cart.reduce((total, item) => {
      return total + (item.selectedVariant.price * item.quantity);
    }, 0);
  };

  const getTotalDeliveryFee = () => {
    if (state.deliveryMode === 'pickup') return 0;
    
    return Object.keys(itemsByStore).reduce((total, storeId) => {
      const store = getStore(storeId);
      if (!store) return total;
      return total + (store.distanceKm * store.deliveryRatePerKm);
    }, 0);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="w-full bg-white rounded-t-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Cart ({state.cart.reduce((sum, item) => sum + item.quantity, 0)} items)</h2>
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => dispatch({ type: 'TOGGLE_CART' })}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Delivery Mode Toggle */}
        <div className="p-4 border-b">
          <div className="flex gap-2">
            <button
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
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
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
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
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[40vh]">
          {Object.entries(itemsByStore).map(([storeId, items]) => {
            const store = getStore(storeId);
            if (!store) return null;

            const storeSubtotal = items.reduce((sum, item) => 
              sum + (item.selectedVariant.price * item.quantity), 0
            );
            const deliveryFee = state.deliveryMode === 'delivery' 
              ? store.distanceKm * store.deliveryRatePerKm 
              : 0;

            return (
              <div key={storeId} className="border border-gray-200 rounded-lg">
                {/* Store Header */}
                <div className="p-3 bg-gray-50 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{store.logo}</span>
                      <span className="font-medium text-sm">{store.name}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {store.distanceKm.toFixed(1)} km away
                    </div>
                  </div>
                  
                  {state.deliveryMode === 'pickup' && (
                    <div className="mt-2">
                      <Badge variant="success" size="sm">
                        Free pickup - no delivery fee
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Store Items */}
                <div className="p-3 space-y-3">
                  {items.map((item) => {
                    const product = getProduct(item.productId);
                    if (!product) return null;

                    return (
                      <div key={`${item.productId}-${item.selectedVariant.size}`} className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{product.name}</h3>
                          <p className="text-xs text-gray-500">{item.selectedVariant.size}</p>
                          <p className="text-sm font-medium">${item.selectedVariant.price.toFixed(2)} each</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                            onClick={() => dispatch({ 
                              type: 'UPDATE_CART_QUANTITY', 
                              payload: { productId: item.productId, quantity: item.quantity - 1 }
                            })}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                            onClick={() => dispatch({ 
                              type: 'UPDATE_CART_QUANTITY', 
                              payload: { productId: item.productId, quantity: item.quantity + 1 }
                            })}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Store Totals */}
                  <div className="pt-3 border-t space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${storeSubtotal.toFixed(2)}</span>
                    </div>
                    {deliveryFee > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Delivery fee</span>
                        <span>${deliveryFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold">
                      <span>Store Total</span>
                      <span>${(storeSubtotal + deliveryFee).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {state.cart.length > 0 && (
          <div className="p-4 border-t bg-white">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Items Total</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              {getTotalDeliveryFee() > 0 && (
                <div className="flex justify-between">
                  <span>Total Delivery Fees</span>
                  <span>${getTotalDeliveryFee().toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg">
                <span>Grand Total</span>
                <span>${(getTotalPrice() + getTotalDeliveryFee()).toFixed(2)}</span>
              </div>
            </div>
            
            <Button fullWidth size="lg">
              Proceed to Checkout
            </Button>
          </div>
        )}

        {state.cart.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p>Your cart is empty</p>
          </div>
        )}
      </div>
    </div>
  );
}