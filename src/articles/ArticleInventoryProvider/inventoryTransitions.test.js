import * as transitions from './inventoryTransitions';

const milk = {
  id: 'leche',
  name: 'Leche entera 1 L',
  brand: 'Colún',
  productType: 'Lácteos',
  quantity: 24,
};

const bread = {
  id: 'pan',
  name: 'Pan hallulla',
  brand: 'Ideal',
  productType: 'Panadería',
  quantity: 40,
};

function createState() {
  return { articles: [milk, bread], cartLines: [] };
}

test('registering a repeated article adds units to the same row', () => {
  const next = transitions.registerArticle(createState(), {
    name: ' leche entera 1 l ',
    brand: 'COLÚN',
    productType: 'Lácteos',
    quantity: 20,
  });

  expect(next.articles).toHaveLength(2);
  expect(next.articles[0].quantity).toBe(44);
  expect(next.articles[0].name).toBe('Leche entera 1 L');
});

test('registering a new article appends a row with an id', () => {
  const next = transitions.registerArticle(createState(), {
    name: 'Queso',
    brand: 'Colún',
    productType: 'Lácteos',
    quantity: 20,
  });

  expect(next.articles).toHaveLength(3);
  expect(next.articles[2].name).toBe('Queso');
  expect(typeof next.articles[2].id).toBe('string');
});

test('deleting an article also drops its cart lines without returning stock', () => {
  const state = {
    articles: [{ ...milk, quantity: 22 }, bread],
    cartLines: [
      { articleId: 'leche', quantity: 2 },
      { articleId: 'pan', quantity: 1 },
    ],
  };

  const next = transitions.deleteArticle(state, 'leche');

  expect(next.articles.map(function readId(article) { return article.id; })).toEqual(['pan']);
  expect(next.cartLines).toEqual([{ articleId: 'pan', quantity: 1 }]);
  expect(next.articles[0].quantity).toBe(40);
});

test('adding a unit moves one from the inventory to a new cart line', () => {
  const next = transitions.addUnitToCart(createState(), 'leche');

  expect(next.articles[0].quantity).toBe(23);
  expect(next.cartLines).toEqual([{ articleId: 'leche', quantity: 1 }]);
});

test('adding a second unit increases the existing line', () => {
  const once = transitions.addUnitToCart(createState(), 'leche');
  const twice = transitions.addUnitToCart(once, 'leche');

  expect(twice.articles[0].quantity).toBe(22);
  expect(twice.cartLines).toEqual([{ articleId: 'leche', quantity: 2 }]);
});

test('adding a unit without stock leaves the state as it was', () => {
  const state = { articles: [{ ...milk, quantity: 0 }], cartLines: [] };

  expect(transitions.addUnitToCart(state, 'leche')).toBe(state);
});

test('adding a unit of an unknown article leaves the state as it was', () => {
  const state = createState();

  expect(transitions.addUnitToCart(state, 'xyz')).toBe(state);
});

test('removing a unit returns it to the inventory', () => {
  const twice = transitions.addUnitToCart(
    transitions.addUnitToCart(createState(), 'leche'),
    'leche'
  );

  const next = transitions.removeUnitFromCart(twice, 'leche');

  expect(next.articles[0].quantity).toBe(23);
  expect(next.cartLines).toEqual([{ articleId: 'leche', quantity: 1 }]);
});

test('removing the last unit drops the line and restores the inventory', () => {
  const once = transitions.addUnitToCart(createState(), 'leche');

  const next = transitions.removeUnitFromCart(once, 'leche');

  expect(next.articles[0].quantity).toBe(24);
  expect(next.cartLines).toEqual([]);
});

test('removing a unit without a line leaves the state as it was', () => {
  const state = createState();

  expect(transitions.removeUnitFromCart(state, 'leche')).toBe(state);
});

test('transitions do not mutate the previous state', () => {
  const state = createState();

  transitions.addUnitToCart(state, 'leche');

  expect(state.articles[0].quantity).toBe(24);
  expect(state.cartLines).toEqual([]);
});

test('counting cart units sums every line', () => {
  const lines = [
    { articleId: 'leche', quantity: 2 },
    { articleId: 'pan', quantity: 3 },
  ];

  expect(transitions.countCartUnits(lines)).toBe(5);
  expect(transitions.countCartUnits([])).toBe(0);
});

test('finding an article returns it by id or nothing', () => {
  const articles = [milk, bread];

  expect(transitions.findArticle(articles, 'pan')).toBe(bread);
  expect(transitions.findArticle(articles, 'xyz')).toBeUndefined();
});
