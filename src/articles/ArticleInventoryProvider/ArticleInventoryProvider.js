import { createContext, useContext, useState } from 'react';
import { defaultArticles } from '../defaultArticles';

const ArticleInventoryContext = createContext(null);

function normalizeText(value) {
  return value.trim().toLocaleLowerCase('es');
}

function articleKey(article) {
  return [
    normalizeText(article.name),
    normalizeText(article.brand),
    normalizeText(article.productType),
  ].join('\n');
}

export function ArticleInventoryProvider(props) {
  const [articles, setArticles] = useState(defaultArticles);

  function addArticle(article) {
    setArticles(function storeArticle(currentArticles) {
      const key = articleKey(article);
      const match = currentArticles.find(function sameArticle(current) {
        return articleKey(current) === key;
      });
      if (match) {
        return currentArticles.map(function addUnits(current) {
          if (current.id !== match.id) {
            return current;
          }
          return {
            id: current.id,
            name: current.name,
            brand: current.brand,
            productType: current.productType,
            quantity: current.quantity + article.quantity,
          };
        });
      }
      return currentArticles.concat({
        id: crypto.randomUUID(),
        name: article.name,
        brand: article.brand,
        productType: article.productType,
        quantity: article.quantity,
      });
    });
  }

  function removeArticle(articleId) {
    setArticles(function dropArticle(currentArticles) {
      return currentArticles.filter(function keepArticle(current) {
        return current.id !== articleId;
      });
    });
  }

  return (
    <ArticleInventoryContext.Provider value={{ articles, addArticle, removeArticle }}>
      {props.children}
    </ArticleInventoryContext.Provider>
  );
}

export function useArticleInventory() {
  return useContext(ArticleInventoryContext);
}
