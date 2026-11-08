import { act, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderAt } from '../testing/renderAt';

async function goTo(router, path) {
  await act(async function navigate() {
    await router.navigate(path);
  });
}

async function addUnits(router, articleId, units) {
  await goTo(router, `/articulos/${articleId}`);
  for (let unit = 0; unit < units; unit += 1) {
    userEvent.click(await screen.findByRole('button', { name: 'Agregar al carrito' }));
  }
}

async function openCartWithMilkAndBread() {
  const router = renderAt('/');
  await screen.findByRole('heading', { level: 1, name: 'Inventario' });
  await addUnits(router, 'leche', 2);
  await addUnits(router, 'pan', 1);
  await goTo(router, '/carrito');
  return router;
}

test('the cart lists each line with its data and quantity', async () => {
  await openCartWithMilkAndBread();

  const lines = within(await screen.findByRole('list', { name: 'Carrito' })).getAllByRole(
    'listitem'
  );

  expect(lines).toHaveLength(2);
  expect(within(lines[0]).getByText('Leche entera 1 L')).toBeInTheDocument();
  expect(within(lines[0]).getByText('Colún · Lácteos')).toBeInTheDocument();
  expect(within(lines[0]).getByText('Cantidad: 2')).toBeInTheDocument();
  expect(within(lines[1]).getByText('Pan hallulla')).toBeInTheDocument();
  expect(within(lines[1]).getByText('Ideal · Panadería')).toBeInTheDocument();
  expect(within(lines[1]).getByText('Cantidad: 1')).toBeInTheDocument();
});

test('increasing a line adds one unit and takes one from the inventory', async () => {
  const router = await openCartWithMilkAndBread();

  userEvent.click(screen.getByRole('button', { name: 'Aumentar Leche entera 1 L' }));

  expect(screen.getByText('Cantidad: 3')).toBeInTheDocument();

  await goTo(router, '/articulos/leche');

  expect(await screen.findByText('21 unidades')).toBeInTheDocument();
});

test('increasing is disabled when the inventory has no units left', async () => {
  const router = renderAt('/');
  await screen.findByRole('heading', { level: 1, name: 'Inventario' });
  await addUnits(router, 'detergente', 7);
  await goTo(router, '/carrito');

  expect(await screen.findByText('Cantidad: 7')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Aumentar Detergente 1 kg' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Disminuir Detergente 1 kg' })).toBeEnabled();
});

test('decreasing a line gives one unit back to the inventory', async () => {
  const router = await openCartWithMilkAndBread();

  userEvent.click(screen.getByRole('button', { name: 'Disminuir Leche entera 1 L' }));

  const firstLine = screen.getAllByRole('listitem')[0];
  expect(within(firstLine).getByText('Cantidad: 1')).toBeInTheDocument();

  await goTo(router, '/articulos/leche');

  expect(await screen.findByText('23 unidades')).toBeInTheDocument();
});

test('a line disappears when its quantity reaches zero', async () => {
  const router = await openCartWithMilkAndBread();

  userEvent.click(screen.getByRole('button', { name: 'Disminuir Pan hallulla' }));

  expect(screen.queryByText('Pan hallulla')).not.toBeInTheDocument();
  expect(screen.getByText('Leche entera 1 L')).toBeInTheDocument();

  await goTo(router, '/articulos/pan');

  expect(await screen.findByText('40 unidades')).toBeInTheDocument();
});

test('an empty cart shows a message and a link to see articles', async () => {
  renderAt('/carrito');

  expect(await screen.findByText('Tu carrito está vacío.')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Ver artículos' })).toHaveAttribute('href', '/');
});

test('the cart shows a summary with the total units', async () => {
  const router = renderAt('/');
  await screen.findByRole('heading', { level: 1, name: 'Inventario' });
  await addUnits(router, 'leche', 2);
  await addUnits(router, 'pan', 3);
  await goTo(router, '/carrito');

  const summary = await screen.findByRole('complementary');
  const lines = within(screen.getByRole('list', { name: 'Carrito' })).getAllByRole('listitem');

  expect(within(summary).getByText('5 unidades')).toBeInTheDocument();
  expect(within(lines[0]).getByText('Leche entera 1 L')).toBeInTheDocument();
});

test('an empty cart has no summary', async () => {
  renderAt('/carrito');

  await screen.findByText('Tu carrito está vacío.');

  expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
});
