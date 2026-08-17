import React from 'react';

/**
 * PetroglyphIcon Component
 * Single-line vector art for Camels, Horses, Cows, Sheep, and Poultry.
 * Rendered inside soft sand-teal circular badge with desert clay stroke (#B85C2E).
 */
export const PetroglyphIcon = ({
  species = 'camel',
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  badge = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { container: 'w-10 h-10', svg: 'w-6 h-6', stroke: 2 },
    md: { container: 'w-16 h-16', svg: 'w-10 h-10', stroke: 2.2 },
    lg: { container: 'w-24 h-24', svg: 'w-14 h-14', stroke: 2.5 },
    xl: { container: 'w-32 h-32', svg: 'w-20 h-20', stroke: 2.8 },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const renderSvgPath = () => {
    switch (species.toLowerCase()) {
      case 'camel':
      case 'camels':
        return (
          <g fill="none" stroke="#B85C2E" strokeWidth={currentSize.stroke} strokeLinecap="round" strokeLinejoin="round">
            {/* Camel Petroglyph single-line profile */}
            <path d="M 12 78 L 12 55 Q 12 40 22 40 Q 30 40 32 30 C 33 22 42 22 47 28 L 52 38 Q 62 33 66 42 Q 78 40 82 52 L 82 78" />
            <path d="M 47 28 C 47 25 50 22 53 22 C 57 22 59 25 59 28" />
            {/* Legs */}
            <path d="M 22 78 L 22 92 M 32 78 L 32 92" />
            <path d="M 68 78 L 68 92 M 78 78 L 78 92" />
            {/* Eye / Accent dot */}
            <circle cx="53" cy="27" r="1.5" fill="#B8862E" stroke="none" />
            {/* Hump line */}
            <path d="M 52 38 Q 60 22 72 38" />
          </g>
        );

      case 'horse':
      case 'horses':
        return (
          <g fill="none" stroke="#B85C2E" strokeWidth={currentSize.stroke} strokeLinecap="round" strokeLinejoin="round">
            {/* Arabian Horse Head & Neck Line Art */}
            <path d="M 20 85 C 25 65 32 45 42 32 C 46 26 50 20 54 15 C 57 12 62 14 62 18 C 62 25 58 30 52 38 Q 65 34 78 30 C 82 29 85 33 82 37 C 78 44 68 52 56 56 C 46 60 36 68 30 85" />
            <path d="M 50 22 L 58 20 C 56 12 52 14 50 22 Z" fill="#B85C2E" opacity="0.3" />
            {/* Mane line work */}
            <path d="M 40 35 Q 30 40 28 50" />
            <path d="M 32 48 Q 24 55 22 65" />
            <circle cx="68" cy="38" r="1.5" fill="#B8862E" stroke="none" />
          </g>
        );

      case 'cow':
      case 'cows':
      case 'cattle':
        return (
          <g fill="none" stroke="#B85C2E" strokeWidth={currentSize.stroke} strokeLinecap="round" strokeLinejoin="round">
            {/* Cattle Head & Horn Line Art */}
            <path d="M 30 35 C 22 28 15 28 12 35 C 10 40 16 42 28 42" />
            <path d="M 70 35 C 78 28 85 28 88 35 C 90 40 84 42 72 42" />
            {/* Head outline */}
            <path d="M 28 42 L 32 65 C 34 76 42 84 50 84 C 58 84 66 76 68 65 L 72 42 Z" />
            {/* Crown & Muzzle */}
            <path d="M 38 72 C 44 76 56 76 62 72" />
            <path d="M 28 42 Q 50 35 72 42" />
            <circle cx="40" cy="52" r="2" fill="#B85C2E" />
            <circle cx="60" cy="52" r="2" fill="#B85C2E" />
          </g>
        );

      case 'sheep':
      case 'goat':
        return (
          <g fill="none" stroke="#B85C2E" strokeWidth={currentSize.stroke} strokeLinecap="round" strokeLinejoin="round">
            {/* Ruminant Line Art */}
            <path d="M 30 45 C 25 35 22 25 30 20 C 35 18 42 22 45 32" />
            <path d="M 70 45 C 75 35 78 25 70 20 C 65 18 58 22 55 32" />
            <path d="M 45 32 Q 50 30 55 32 L 60 55 C 62 65 56 75 50 75 C 44 75 38 65 40 55 Z" />
            <circle cx="46" cy="46" r="1.5" fill="#B8862E" />
            <circle cx="54" cy="46" r="1.5" fill="#B8862E" />
          </g>
        );

      default:
        return (
          <g fill="none" stroke="#B85C2E" strokeWidth={currentSize.stroke} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="50" cy="50" r="30" />
            <path d="M 50 30 L 50 70 M 30 50 L 70 50" />
          </g>
        );
    }
  };

  const svgElement = (
    <svg viewBox="0 0 100 100" className={`${currentSize.svg} transition-transform duration-300 transform hover:scale-105`}>
      {renderSvgPath()}
    </svg>
  );

  if (!badge) {
    return <div className={`inline-flex items-center justify-center ${className}`}>{svgElement}</div>;
  }

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full petroglyph-badge ${currentSize.container} ${className}`}
    >
      {svgElement}
    </div>
  );
};
