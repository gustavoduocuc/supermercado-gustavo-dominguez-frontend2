import { createContext, useContext, useState } from 'react';
import { defaultArticles } from '../defaultArticles';
import * as transitions from './inventoryTransitions';

const ArticleInventoryContext = createContext(null);

export function ArticleInventoryProvider(props) {
  const [state, setState] = useState({ articles: defaultArticles, cartLines: [] });

  function addArticle(article) {
    setState(function storeArticle(previous) {
      return transitions.registerArticle(previous, article);
    });
  }

  function removeArticle(articleId) {
    setState(function dropArticle(previous) {
      return transitions.deleteArticle(previous, articleId);
    });
  }

  function addUnitToCart(articleId) {
    setState(function moveUnitToCart(previous) {
      return transitions.addUnitToCart(previous, articleId);
    });
  }

  function removeUnitFromCart(articleId) {
    setState(function moveUnitToInventory(previous) {
      return transitions.removeUnitFromCart(previous, articleId);
    });
  }

  const inventory = {
    articles: state.articles,
    cartLines: state.cartLines,
    cartUnitCount: transitions.countCartUnits(state.cartLines),
    addArticle,
    removeArticle,
    addUnitToCart,
    removeUnitFromCart,
  };

  return (
    <ArticleInventoryContext.Provider value={inventory}>
      {props.children}
    </ArticleInventoryContext.Provider>
  );
}

export function useArticleInventory() {
  return useContext(ArticleInventoryContext);
}
