import { UserLocation, Store, Product } from '../types';

export const userLocation: UserLocation = {
  lat: 22.302711,
  lng: 70.802159,
  label: "HOME - Sultan Bhag"
};

export const stores: Store[] = [
  {
    id: "s1",
    name: "Shree Ganesh Grocers",
    distanceKm: 1.2,
    deliveryRatePerKm: 8,
    open: true,
    categories: ["Grocery", "Dairy"],
    logo: "🏪"
  },
  {
    id: "s2", 
    name: "City Mart",
    distanceKm: 2.8,
    deliveryRatePerKm: 10,
    open: false,
    categories: ["Snacks", "Beverages"],
    logo: "🏬"
  },
  {
    id: "s3",
    name: "Fresh Valley",
    distanceKm: 0.8,
    deliveryRatePerKm: 6,
    open: true,
    categories: ["Organic", "Vegetables"],
    logo: "🌿"
  }
];

export const products: Product[] = [
  {
    id: "p1",
    storeId: "s1",
    name: "Red Apples",
    image: "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=300",
    basePrice: 1.2,
    unit: "1 kg",
    variants: [
      { size: "500g", price: 0.65 },
      { size: "1kg", price: 1.2 },
      { size: "2kg", price: 2.3 }
    ],
    pickupEligible: true,
    discount: 0,
    stock: 100,
    category: "Fruits"
  },
  {
    id: "p2",
    storeId: "s1", 
    name: "Fresh Milk",
    image: "https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=300",
    basePrice: 2.0,
    unit: "1L",
    variants: [
      { size: "500ml", price: 1.1 },
      { size: "1L", price: 2.0 },
      { size: "2L", price: 3.8 }
    ],
    pickupEligible: true,
    discount: 10,
    stock: 50,
    subscribable: true,
    category: "Dairy"
  },
  {
    id: "p3",
    storeId: "s1",
    name: "Brown Bread",
    image: "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=300",
    basePrice: 1.5,
    unit: "1 loaf",
    variants: [
      { size: "Small", price: 1.2 },
      { size: "Regular", price: 1.5 },
      { size: "Large", price: 2.0 }
    ],
    pickupEligible: false,
    discount: 0,
    stock: 30,
    subscribable: true,
    category: "Bakery"
  },
  {
    id: "p4",
    storeId: "s1",
    name: "Basmati Rice",
    image: "https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=300",
    basePrice: 5.2,
    unit: "5kg",
    variants: [
      { size: "1kg", price: 1.1 },
      { size: "5kg", price: 5.2 },
      { size: "10kg", price: 10.0 }
    ],
    pickupEligible: true,
    discount: 15,
    stock: 25,
    category: "Grains"
  },
  {
    id: "p5",
    storeId: "s3",
    name: "Organic Bananas",
    image: "https://images.pexels.com/photos/2238309/pexels-photo-2238309.jpeg?auto=compress&cs=tinysrgb&w=300",
    basePrice: 0.8,
    unit: "1 dozen",
    variants: [
      { size: "6 pcs", price: 0.45 },
      { size: "1 dozen", price: 0.8 },
      { size: "2 dozen", price: 1.5 }
    ],
    pickupEligible: true,
    discount: 0,
    stock: 0,
    category: "Fruits"
  },
  {
    id: "p6",
    storeId: "s3",
    name: "Fresh Tomatoes",
    image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=300",
    basePrice: 1.8,
    unit: "1kg",
    variants: [
      { size: "500g", price: 0.95 },
      { size: "1kg", price: 1.8 },
      { size: "2kg", price: 3.5 }
    ],
    pickupEligible: true,
    discount: 0,
    stock: 75,
    category: "Vegetables"
  },
  {
    id: "p7",
    storeId: "s1",
    name: "Greek Yogurt",
    image: "https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=300",
    basePrice: 3.2,
    unit: "500g",
    variants: [
      { size: "200g", price: 1.4 },
      { size: "500g", price: 3.2 },
      { size: "1kg", price: 6.0 }
    ],
    pickupEligible: true,
    discount: 0,
    stock: 40,
    subscribable: true,
    category: "Dairy"
  },
  {
    id: "p8",
    storeId: "s1",
    name: "Olive Oil",
    image: "https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=300",
    basePrice: 8.5,
    unit: "1L",
    variants: [
      { size: "250ml", price: 2.5 },
      { size: "500ml", price: 4.5 },
      { size: "1L", price: 8.5 }
    ],
    pickupEligible: true,
    discount: 20,
    stock: 15,
    category: "Cooking"
  },
  {
    id: "p9",
    storeId: "s3",
    name: "Organic Spinach",
    image: "https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=300",
    basePrice: 2.2,
    unit: "bunch",
    variants: [
      { size: "Small bunch", price: 1.5 },
      { size: "Regular bunch", price: 2.2 },
      { size: "Large bunch", price: 3.0 }
    ],
    pickupEligible: true,
    discount: 0,
    stock: 60,
    category: "Vegetables"
  }
];

export const categories = [
  "All",
  "Fruits", 
  "Vegetables",
  "Dairy",
  "Bakery",
  "Grains",
  "Cooking"
];