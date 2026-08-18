import React from 'react';

/**
 * Animal Species Photographic Badge Component
 * Displays authentic high-definition animal photography for Camels, Horses, Cows, Sheep & Poultry.
 */
export const PetroglyphIcon = ({
  species = 'camel',
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  badge = true,
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-10 h-10 sm:w-12 sm:h-12',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
    xl: 'w-24 h-24 sm:w-28 sm:h-28',
  };

  const key = species ? species.toLowerCase() : 'camel';
  const imageSrc = `/images/species/${key}.jpg`;

  if (!badge) {
    return (
      <img
        src={imageSrc}
        alt={`${species} photo`}
        className={`rounded-full object-cover shadow-sm ${sizeMap[size] || sizeMap.md} ${className}`}
        loading="lazy"
        onError={(e) => {
          e.target.src = '/images/species/camel.jpg';
        }}
      />
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden border-2 border-surface-bordered shadow-md group-hover:border-clay transition-all duration-300 ${
        sizeMap[size] || sizeMap.md
      } ${className}`}
    >
      <img
        src={imageSrc}
        alt={`${species} photography`}
        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
        onError={(e) => {
          e.target.src = '/images/species/camel.jpg';
        }}
      />
    </div>
  );
};
