import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Pause, Play, Trash2, Edit3 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { products } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export function SubscriptionDashboard() {
  const { state, dispatch } = useApp();
  const [view, setView] = useState<'list' | 'calendar'>('list');

  // Mock subscription data for demo
  const mockSubscriptions = [
    {
      id: 'sub_1',
      productId: 'p2', // Milk
      frequency: 'daily' as const,
      startDate: '2025-01-01',
      isActive: true,
      nextDelivery: '2025-01-15'
    },
    {
      id: 'sub_2',
      productId: 'p3', // Bread
      frequency: 'weekly' as const,
      customDays: [1, 3, 5], // Mon, Wed, Fri
      startDate: '2025-01-01',
      isActive: true,
      nextDelivery: '2025-01-17'
    },
    {
      id: 'sub_3',
      productId: 'p7', // Yogurt
      frequency: 'monthly' as const,
      startDate: '2025-01-01',
      isActive: false,
      nextDelivery: '2025-02-01'
    }
  ];

  const getProduct = (id: string) => products.find(p => p.id === id);

  const getFrequencyText = (subscription: typeof mockSubscriptions[0]) => {
    switch (subscription.frequency) {
      case 'daily':
        return 'Daily';
      case 'weekly':
        return `Weekly (${subscription.customDays?.length || 1}x/week)`;
      case 'monthly':
        return 'Monthly';
      default:
        return 'Custom';
    }
  };

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center gap-3 mb-4">
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'home' })}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">My Subscriptions</h1>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 w-fit">
          <button
            className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
              view === 'list' 
                ? 'bg-white text-blue-500 shadow-sm' 
                : 'text-gray-600 hover:text-blue-500'
            }`}
            onClick={() => setView('list')}
          >
            List View
          </button>
          <button
            className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
              view === 'calendar' 
                ? 'bg-white text-blue-500 shadow-sm' 
                : 'text-gray-600 hover:text-blue-500'
            }`}
            onClick={() => setView('calendar')}
          >
            Calendar View
          </button>
        </div>
      </div>

      {view === 'list' ? (
        <div className="p-4 space-y-4">
          <div className="text-sm text-gray-600 mb-4">
            {mockSubscriptions.filter(s => s.isActive).length} active subscriptions
          </div>

          {mockSubscriptions.map((subscription) => {
            const product = getProduct(subscription.productId);
            if (!product) return null;

            return (
              <div key={subscription.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-start gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">{getFrequencyText(subscription)}</p>
                      </div>
                      
                      <Badge 
                        variant={subscription.isActive ? 'success' : 'warning'} 
                        size="sm"
                      >
                        {subscription.isActive ? 'Active' : 'Paused'}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Next delivery: {subscription.nextDelivery}</span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ${product.basePrice.toFixed(2)} per delivery
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        {subscription.isActive ? (
                          <>
                            <Pause className="w-3 h-3" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3" />
                            Resume
                          </>
                        )}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        Edit
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {mockSubscriptions.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No subscriptions yet</h3>
              <p className="text-gray-500 mb-6">Start subscribing to your favorite products for regular delivery</p>
              <Button onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'home' })}>
                Browse Products
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="p-4">
          {/* Calendar View */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">January 2025</h2>
              <p className="text-sm text-gray-600">Upcoming deliveries</p>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
              
              {/* Calendar days with delivery indicators */}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const hasDelivery = [3, 5, 7, 10, 12, 14, 15, 17, 19, 21, 24, 26, 28].includes(day);
                
                return (
                  <div
                    key={day}
                    className={`aspect-square flex items-center justify-center text-sm rounded-lg relative ${
                      hasDelivery 
                        ? 'bg-blue-500 text-white font-medium' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {day}
                    {hasDelivery && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 pt-4 border-t text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Delivery day</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Multiple items</span>
              </div>
            </div>
          </div>

          {/* Upcoming Deliveries */}
          <div className="mt-6">
            <h3 className="font-medium text-gray-900 mb-3">Next 7 Days</h3>
            <div className="space-y-2">
              {[
                { date: 'Jan 15', items: ['Fresh Milk'] },
                { date: 'Jan 17', items: ['Brown Bread', 'Greek Yogurt'] },
                { date: 'Jan 19', items: ['Fresh Milk'] }
              ].map((delivery, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm text-gray-900">{delivery.date}</div>
                      <div className="text-xs text-gray-500">
                        {delivery.items.join(', ')}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Skip
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}