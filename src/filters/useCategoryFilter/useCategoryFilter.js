import { useState } from 'react';
import { allCategories } from '../../articles/productTypes';
import { filterByCategory } from '../filterByCategory';

export function useCategoryFilter(articles) {
  const [state, setState] = useState({ category: allCategories });

  function selectCategory(category) {
    setState(function replaceCategory(previous) {
      return { ...previous, category };
    });
  }

  return {
    category: state.category,
    visibleArticles: filterByCategory(articles, state.category),
    selectCategory,
  };
}
