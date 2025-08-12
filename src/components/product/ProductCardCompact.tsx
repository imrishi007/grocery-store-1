import React from 'react';
import { Plus, Truck } from 'lucide-react';
import { Product } from '../../types';
import { Badge } from '../ui/Badge';
import { useApp } from '../../context/AppContext';

interface ProductCardCompactProps {
  product: Product;
  onQuickAdd?: (id: string) => void;
}

export function ProductCardCompact({ product, onQuickAdd }: ProductCardCompactProps) {
  const { dispatch } = useApp();
  const isOutOfStock = product.stock === 0;
  const hasDiscount = product.discount > 0;
  const discountedPrice = product.basePrice * (1 - product.discount / 100);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickAdd) {
      onQuickAdd(product.id);
    } else {
      // Add to cart with default variant
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

  const handleProductClick = () => {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product });
    dispatch({ type: 'SET_SCREEN', payload: 'product-detail' });
  };

  return (
    <div 
      className={`relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md active:scale-98 ${
        isOutOfStock ? 'opacity-60' : ''
      }`}
      onClick={handleProductClick}
    >
      {/* Image */}
      <div className="relative w-full h-32 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Badges */}
        {!product.pickupEligible && (
          <div className="absolute top-2 left-2">
            <Badge variant="default" size="sm">
              <Truck className="w-3 h-3 mr-1" />
              Pickup
            </Badge>
          </div>
        )}
        
        {hasDiscount && (
          <div className="absolute top-2 right-2">
            <Badge variant="accent" size="sm">
              {product.discount}% off
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

      {/* Content */}
      <div className="p-3">
        <h3 className="font-medium text-sm text-gray-900 line-clamp-1 mb-2">
          {product.name}
        </h3>
        
        <div className="flex items-end justify-between">
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-gray-900">
                ${hasDiscount ? discountedPrice.toFixed(2) : product.basePrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-gray-500 line-through">
                  ${product.basePrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">{product.unit}</span>
          </div>

          {!isOutOfStock && (
            <button
              className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors active:scale-95"
              onClick={handleQuickAdd}
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}