import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { HomeScreen } from './screens/HomeScreen';
import { StoreProductsScreen } from './screens/StoreProductsScreen';
import { ProductDetailScreen } from './screens/ProductDetailScreen';
import { SubscriptionDashboard } from './screens/SubscriptionDashboard';
import { MiniCart } from './components/cart/MiniCart';
import { SubscriptionModal } from './components/subscription/SubscriptionModal';

function AppContent() {
  const { state } = useApp();

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'store-products':
        return <StoreProductsScreen />;
      case 'product-detail':
        return <ProductDetailScreen />;
      case 'subscriptions':
        return <SubscriptionDashboard />;
      case 'categories':
        return <HomeScreen />; // For now, same as home but could filter
      case 'search':
        return <HomeScreen />; // For now, same as home but could show search results
      case 'profile':
        return (
          <div className="p-4 pb-20">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <p className="text-gray-600">Profile screen coming soon...</p>
          </div>
        );
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="relative">
        {renderScreen()}
      </main>
      <BottomNav />
      <MiniCart />
      <SubscriptionModal />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;