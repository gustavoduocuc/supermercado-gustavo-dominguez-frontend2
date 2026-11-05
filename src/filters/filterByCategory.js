import { allCategories } from '../articles/productTypes';

export function filterByCategory(articles, category) {
  if (category === allCategories) {
    return articles;
  }
  return articles.filter(function isInCategory(article) {
    return article.productType === category;
  });
}
