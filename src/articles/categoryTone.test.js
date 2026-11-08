import { productTypes } from './productTypes';
import { getCategoryTone } from './categoryTone';

test('every product type has its own background and text classes', () => {
  const toneClasses = productTypes.map(function toneOf(productType) {
    return getCategoryTone(productType).toneClass;
  });

  toneClasses.forEach(function checkTone(toneClass) {
    expect(toneClass).toMatch(/\bbg-category-[a-z]+-bg\b/);
    expect(toneClass).toMatch(/\btext-category-[a-z]+-fg\b/);
  });
  expect(new Set(toneClasses).size).toBe(productTypes.length);
});

test('Lácteos and Panadería use their own named tones', () => {
  expect(getCategoryTone('Lácteos').toneClass).toBe(
    'bg-category-lacteos-bg text-category-lacteos-fg'
  );
  expect(getCategoryTone('Panadería').toneClass).toBe(
    'bg-category-panaderia-bg text-category-panaderia-fg'
  );
});

test('an unknown type falls back to Otros', () => {
  expect(getCategoryTone('Juguetes')).toEqual(getCategoryTone('Otros'));
});

test('the initial is the first letter of the category', () => {
  expect(getCategoryTone('Lácteos').initial).toBe('L');
  expect(getCategoryTone('Panadería').initial).toBe('P');
  expect(getCategoryTone('Juguetes').initial).toBe('O');
});
