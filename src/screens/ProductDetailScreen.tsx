import React, { useState } from 'react';
import { ArrowLeft, Minus, Plus, Heart, Share2, Truck, MapPin } from 'lucide-react';
import { WeightPill } from '../components/product/WeightPill';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { stores } from '../data/mockData';
import { useApp } from '../context/AppContext';

export function ProductDetailScreen() {
  const { state, dispatch } = useApp();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = state.selectedProduct;
  
  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Product not found</p>
      </div>
    );
  }

  const store = stores.find(s => s.id === product.storeId);
  const selectedVariant = product.variants[selectedVariantIndex];
  const hasDiscount = product.discount > 0;
  const discountedPrice = selectedVariant.price * (1 - product.discount / 100);
  const totalPrice = discountedPrice * quantity;
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        productId: product.id,
        quantity,
        selectedVariant,
        storeId: product.storeId
      }
    });
  };

  const handleSubscribe = () => {
    dispatch({ type: 'TOGGLE_SUBSCRIPTION_MODAL' });
  };

  return (
    <div className="pb-20 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <button
          className="p-2 hover:bg-gray-100 rounded-full"
          onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'home' })}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="relative w-full h-80 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Badges */}
        {!product.pickupEligible && (
          <div className="absolute top-4 left-4">
            <Badge variant="default" size="md">
              <Truck className="w-3 h-3 mr-1" />
              Pickup Only
            </Badge>
          </div>
        )}
        
        {hasDiscount && (
          <div className="absolute top-4 right-4">
            <Badge variant="accent" size="md">
              {product.discount}% OFF
            </Badge>
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="warning" size="md">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4 space-y-6">
        {/* Store Info */}
        {store && (
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">
              {store.logo}
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm text-gray-900">{store.name}</div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{store.distanceKm.toFixed(1)} km away</span>
                </div>
                <Badge variant={store.open ? 'success' : 'warning'} size="sm">
                  {store.open ? 'Open' : 'Closed'}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-500">Stock:</span>
            <Badge variant={product.stock > 0 ? 'success' : 'warning'} size="sm">
              {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
            </Badge>
          </div>
        </div>

        {/* Weight/Size Pills */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Size Options</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.variants.map((variant, index) => (
              <WeightPill
                key={index}
                variant={variant}
                selected={index === selectedVariantIndex}
                onClick={() => setSelectedVariantIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-2">
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-gray-900">
              ${hasDiscount ? discountedPrice.toFixed(2) : selectedVariant.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-lg text-gray-500 line-through">
                ${selectedVariant.price.toFixed(2)}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">per {selectedVariant.size}</p>
          
          {hasDiscount && (
            <div className="text-sm text-green-600 font-medium">
              You save ${(selectedVariant.price - discountedPrice).toFixed(2)} ({product.discount}% off)
            </div>
          )}
        </div>

        {/* Quantity & Actions */}
        {!isOutOfStock && (
          <div className="space-y-4">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="flex items-center justify-between py-3 border-t border-b">
              <span className="font-medium text-gray-900">Total</span>
              <span className="text-xl font-bold text-gray-900">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
              >
                Add to Cart - ${totalPrice.toFixed(2)}
              </Button>
              
              {product.subscribable && (
                <Button
                  variant="outline"
                  size="lg"
                  className="px-6"
                  onClick={handleSubscribe}
                >
                  Subscribe
                </Button>
              )}
            </div>

            {product.subscribable && (
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-sm text-blue-700">
                  <strong>Subscribe & Save:</strong> Get 5% off and free delivery on recurring orders
                </div>
              </div>
            )}
          </div>
        )}

        {/* Product Details */}
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Product Details</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• Fresh and high quality</p>
              <p>• Sourced from local suppliers</p>
              <p>• Best consumed within 3-5 days</p>
              <p>• Store in a cool, dry place</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-2">Delivery Information</h3>
            <div className="text-sm text-gray-600 space-y-1">
              {product.pickupEligible ? (
                <>
                  <p>• Available for pickup and delivery</p>
                  <p>• Pickup: Free from store</p>
                  <p>• Delivery: Fee based on distance</p>
                </>
              ) : (
                <>
                  <p>• Pickup only from store</p>
                  <p>• No delivery available for this item</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}