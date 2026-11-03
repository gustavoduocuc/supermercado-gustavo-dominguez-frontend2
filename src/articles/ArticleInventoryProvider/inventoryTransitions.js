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

function withQuantity(article, quantity) {
  return { ...article, quantity };
}

function addOneToLine(cartLines, articleId) {
  const hasLine = cartLines.some(function isLine(line) {
    return line.articleId === articleId;
  });
  if (!hasLine) {
    return cartLines.concat({ articleId, quantity: 1 });
  }
  return cartLines.map(function addUnit(line) {
    if (line.articleId !== articleId) {
      return line;
    }
    return { articleId, quantity: line.quantity + 1 };
  });
}

function removeOneFromLine(cartLines, articleId) {
  return cartLines
    .map(function takeUnit(line) {
      if (line.articleId !== articleId) {
        return line;
      }
      return { articleId, quantity: line.quantity - 1 };
    })
    .filter(function keepLine(line) {
      return line.quantity > 0;
    });
}

function changeArticleQuantity(articles, articleId, difference) {
  return articles.map(function changeQuantity(article) {
    if (article.id !== articleId) {
      return article;
    }
    return withQuantity(article, article.quantity + difference);
  });
}

export function findArticle(articles, articleId) {
  return articles.find(function isArticle(article) {
    return article.id === articleId;
  });
}

export function countCartUnits(cartLines) {
  return cartLines.reduce(function sumUnits(total, line) {
    return total + line.quantity;
  }, 0);
}

export function registerArticle(state, article) {
  const key = articleKey(article);
  const match = state.articles.find(function sameArticle(current) {
    return articleKey(current) === key;
  });
  if (match) {
    return {
      ...state,
      articles: changeArticleQuantity(state.articles, match.id, article.quantity),
    };
  }
  return {
    ...state,
    articles: state.articles.concat({
      id: crypto.randomUUID(),
      name: article.name,
      brand: article.brand,
      productType: article.productType,
      quantity: article.quantity,
    }),
  };
}

export function deleteArticle(state, articleId) {
  return {
    articles: state.articles.filter(function keepArticle(article) {
      return article.id !== articleId;
    }),
    cartLines: state.cartLines.filter(function keepLine(line) {
      return line.articleId !== articleId;
    }),
  };
}

export function addUnitToCart(state, articleId) {
  const article = findArticle(state.articles, articleId);
  if (!article || article.quantity < 1) {
    return state;
  }
  return {
    articles: changeArticleQuantity(state.articles, articleId, -1),
    cartLines: addOneToLine(state.cartLines, articleId),
  };
}

export function removeUnitFromCart(state, articleId) {
  const hasLine = state.cartLines.some(function isLine(line) {
    return line.articleId === articleId;
  });
  if (!hasLine) {
    return state;
  }
  return {
    articles: changeArticleQuantity(state.articles, articleId, 1),
    cartLines: removeOneFromLine(state.cartLines, articleId),
  };
}
