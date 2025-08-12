import React, { useState } from 'react';
import { X, Calendar, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export function SubscriptionModal() {
  const { state, dispatch } = useApp();
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [customDays, setCustomDays] = useState<number[]>([1, 3, 5]); // Mon, Wed, Fri
  const [startDate, setStartDate] = useState('');

  if (!state.showSubscriptionModal || !state.selectedProduct) return null;

  const product = state.selectedProduct;
  const basePrice = product.basePrice;

  const handleSubscribe = () => {
    const subscription = {
      id: `sub_${Date.now()}`,
      productId: product.id,
      frequency,
      customDays: frequency === 'weekly' ? customDays : undefined,
      startDate: startDate || new Date().toISOString().split('T')[0],
      isActive: true,
      nextDelivery: getNextDeliveryDate()
    };

    dispatch({ type: 'ADD_SUBSCRIPTION', payload: subscription });
    dispatch({ type: 'TOGGLE_SUBSCRIPTION_MODAL' });
    
    // Also add to cart
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        productId: product.id,
        quantity: 1,
        selectedVariant: product.variants[0],
        storeId: product.storeId
      }
    });
  };

  const getNextDeliveryDate = () => {
    const today = new Date();
    switch (frequency) {
      case 'daily':
        today.setDate(today.getDate() + 1);
        break;
      case 'weekly':
        // Find next occurrence of selected day
        const nextDay = customDays[0]; // Use first selected day
        const daysUntil = (nextDay - today.getDay() + 7) % 7 || 7;
        today.setDate(today.getDate() + daysUntil);
        break;
      case 'monthly':
        today.setMonth(today.getMonth() + 1);
        break;
    }
    return today.toISOString().split('T')[0];
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="w-full bg-white rounded-t-2xl max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-12 h-12 rounded object-cover"
            />
            <div>
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500">Subscribe & Save</p>
            </div>
          </div>
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => dispatch({ type: 'TOGGLE_SUBSCRIPTION_MODAL' })}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-4 space-y-6">
          {/* Frequency Selection */}
          <div>
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Delivery Frequency
            </h3>
            <div className="space-y-2">
              {[
                { id: 'daily', label: 'Daily', desc: 'Every day' },
                { id: 'weekly', label: 'Weekly', desc: 'Select specific days' },
                { id: 'monthly', label: 'Monthly', desc: 'Once a month' }
              ].map((option) => (
                <button
                  key={option.id}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    frequency === option.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setFrequency(option.id as typeof frequency)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-500">{option.desc}</div>
                    </div>
                    {frequency === option.id && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Weekly Day Selection */}
          {frequency === 'weekly' && (
            <div>
              <h3 className="font-medium mb-3">Select Days</h3>
              <div className="flex gap-2">
                {dayNames.map((day, index) => (
                  <button
                    key={index}
                    className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                      customDays.includes(index)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => {
                      if (customDays.includes(index)) {
                        setCustomDays(customDays.filter(d => d !== index));
                      } else {
                        setCustomDays([...customDays, index]);
                      }
                    }}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Start Date */}
          <div>
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Start Date
            </h3>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Pricing Preview */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium mb-2">Subscription Preview</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Price per delivery:</span>
                <span className="font-medium">${basePrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery frequency:</span>
                <span className="font-medium">
                  {frequency === 'daily' ? 'Daily' : 
                   frequency === 'weekly' ? `${customDays.length}x per week` :
                   'Monthly'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Next delivery:</span>
                <span className="font-medium">{getNextDeliveryDate()}</span>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-blue-200">
              <Badge variant="success" size="md">
                Save 5% on subscription orders
              </Badge>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="font-medium mb-3">Subscription Benefits</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>5% discount on all subscription orders</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Skip or pause deliveries anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free delivery on subscription orders</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Cancel anytime with no commitment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-white">
          <Button 
            fullWidth 
            size="lg" 
            onClick={handleSubscribe}
            disabled={frequency === 'weekly' && customDays.length === 0}
          >
            Subscribe & Add to Cart - ${basePrice.toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  );
}