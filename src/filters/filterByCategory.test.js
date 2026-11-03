import { allCategories, productTypes } from '../articles/productTypes';
import { filterByCategory } from './filterByCategory';

const articles = [
  { id: 'leche', productType: 'Lácteos' },
  { id: 'pan', productType: 'Panadería' },
  { id: 'queso', productType: 'Lácteos' },
];

test('Todas keeps every article', () => {
  expect(filterByCategory(articles, allCategories)).toEqual(articles);
});

test('a category keeps only its articles', () => {
  const visible = filterByCategory(articles, 'Lácteos');

  expect(visible.map(function readId(article) { return article.id; })).toEqual([
    'leche',
    'queso',
  ]);
});

test('a category without articles gives an empty list', () => {
  expect(filterByCategory(articles, 'Carnes')).toEqual([]);
});

test('filtering leaves the original list untouched', () => {
  const copy = articles.slice();

  filterByCategory(articles, 'Lácteos');

  expect(articles).toEqual(copy);
});

test('there are ten closed categories', () => {
  expect(productTypes).toHaveLength(10);
});
