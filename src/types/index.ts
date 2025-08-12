export interface UserLocation {
  lat: number;
  lng: number;
  label: string;
}

export interface Store {
  id: string;
  name: string;
  distanceKm: number;
  deliveryRatePerKm: number;
  open: boolean;
  categories: string[];
  logo?: string;
}

export interface ProductVariant {
  size: string;
  price: number;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  image: string;
  basePrice: number;
  unit: string;
  variants: ProductVariant[];
  pickupEligible: boolean;
  discount: number;
  stock: number;
  subscribable?: boolean;
  category: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedVariant: ProductVariant;
  storeId: string;
}

export interface Subscription {
  id: string;
  productId: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  customDays?: number[];
  startDate: string;
  endDate?: string;
  isActive: boolean;
  nextDelivery: string;
}

export interface Screen {
  id: string;
  name: string;
}