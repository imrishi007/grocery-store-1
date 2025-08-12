import React from 'react';
import { ProductVariant } from '../../types';

interface WeightPillProps {
  variant: ProductVariant;
  selected: boolean;
  onClick: () => void;
}

export function WeightPill({ variant, selected, onClick }: WeightPillProps) {
  return (
    <button
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 whitespace-nowrap ${
        selected
          ? 'bg-blue-500 text-white shadow-sm'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
      onClick={onClick}
    >
      {variant.size}
    </button>
  );
}