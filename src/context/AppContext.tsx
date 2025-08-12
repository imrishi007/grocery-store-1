import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, Subscription, Product, Store } from '../types';

interface AppState {
  currentScreen: string;
  selectedStore: string | null;
  selectedProduct: Product | null;
  cart: CartItem[];
  subscriptions: Subscription[];
  deliveryMode: 'delivery' | 'pickup';
  showSubscriptionModal: boolean;
  showCart: boolean;
  selectedCategory: string;
  searchQuery: string;
}

type AppAction =
  | { type: 'SET_SCREEN'; payload: string }
  | { type: 'SET_SELECTED_STORE'; payload: string | null }
  | { type: 'SET_SELECTED_PRODUCT'; payload: Product | null }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'SET_DELIVERY_MODE'; payload: 'delivery' | 'pickup' }
  | { type: 'TOGGLE_SUBSCRIPTION_MODAL' }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'ADD_SUBSCRIPTION'; payload: Subscription };

const initialState: AppState = {
  currentScreen: 'home',
  selectedStore: null,
  selectedProduct: null,
  cart: [],
  subscriptions: [],
  deliveryMode: 'delivery',
  showSubscriptionModal: false,
  showCart: false,
  selectedCategory: 'All',
  searchQuery: ''
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, currentScreen: action.payload };
    case 'SET_SELECTED_STORE':
      return { ...state, selectedStore: action.payload };
    case 'SET_SELECTED_PRODUCT':
      return { ...state, selectedProduct: action.payload };
    case 'ADD_TO_CART':
      const existingIndex = state.cart.findIndex(item => 
        item.productId === action.payload.productId && 
        item.selectedVariant.size === action.payload.selectedVariant.size
      );
      if (existingIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingIndex].quantity += action.payload.quantity;
        return { ...state, cart: updatedCart };
      }
      return { ...state, cart: [...state.cart, action.payload] };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.productId !== action.payload)
      };
    case 'SET_DELIVERY_MODE':
      return { ...state, deliveryMode: action.payload };
    case 'TOGGLE_SUBSCRIPTION_MODAL':
      return { ...state, showSubscriptionModal: !state.showSubscriptionModal };
    case 'TOGGLE_CART':
      return { ...state, showCart: !state.showCart };
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'ADD_SUBSCRIPTION':
      return { ...state, subscriptions: [...state.subscriptions, action.payload] };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}