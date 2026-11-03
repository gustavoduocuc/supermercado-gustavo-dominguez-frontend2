import { createContext, useContext, useState } from 'react';

const ArticleInventoryContext = createContext(null);

export function ArticleInventoryProvider(props) {
  const [articles, setArticles] = useState([]);

  function addArticle(article) {
    setArticles(function appendArticle(currentArticles) {
      return currentArticles.concat({
        id: crypto.randomUUID(),
        name: article.name,
        brand: article.brand,
        productType: article.productType,
      });
    });
  }

  return (
    <ArticleInventoryContext.Provider value={{ articles, addArticle }}>
      {props.children}
    </ArticleInventoryContext.Provider>
  );
}

export function useArticleInventory() {
  return useContext(ArticleInventoryContext);
}
