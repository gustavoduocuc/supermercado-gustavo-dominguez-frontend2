const fallbackType = 'Otros';

// Class names are written out in full so Tailwind can find them when it scans the source.
const toneClassByType = {
  Abarrotes: 'bg-category-abarrotes-bg text-category-abarrotes-fg',
  Bebidas: 'bg-category-bebidas-bg text-category-bebidas-fg',
  Carnes: 'bg-category-carnes-bg text-category-carnes-fg',
  Congelados: 'bg-category-congelados-bg text-category-congelados-fg',
  Frescos: 'bg-category-frescos-bg text-category-frescos-fg',
  Higiene: 'bg-category-higiene-bg text-category-higiene-fg',
  Lácteos: 'bg-category-lacteos-bg text-category-lacteos-fg',
  Limpieza: 'bg-category-limpieza-bg text-category-limpieza-fg',
  Panadería: 'bg-category-panaderia-bg text-category-panaderia-fg',
  Otros: 'bg-category-otros-bg text-category-otros-fg',
};

export function getCategoryTone(productType) {
  const isKnown = Object.prototype.hasOwnProperty.call(toneClassByType, productType);
  const knownType = isKnown ? productType : fallbackType;

  return {
    toneClass: toneClassByType[knownType],
    initial: knownType.charAt(0),
  };
}
