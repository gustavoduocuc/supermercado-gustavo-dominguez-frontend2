import { useState } from 'react';
import { allCategories } from '../../articles/productTypes';
import { filterByCategory } from '../filterByCategory';

export function useCategoryFilter(articles) {
  const [category, setCategory] = useState(allCategories);

  return {
    category,
    visibleArticles: filterByCategory(articles, category),
    selectCategory: setCategory,
  };
}
