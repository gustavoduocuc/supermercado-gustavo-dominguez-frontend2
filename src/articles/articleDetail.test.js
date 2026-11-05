import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderAt } from '../testing/renderAt';

test('the table name links to the article detail', async () => {
  renderAt('/gestion-articulos/inventario-articulos');

  const row = await screen.findByRole('row', { name: /Leche entera 1 L/ });

  expect(within(row).getByRole('link', { name: 'Leche entera 1 L' })).toHaveAttribute(
    'href',
    '/articulos/leche'
  );
});

test('the home name links to the article detail', async () => {
  renderAt('/');

  expect(await screen.findByRole('link', { name: 'Leche entera 1 L' })).toHaveAttribute(
    'href',
    '/articulos/leche'
  );
});

test('clicking a name opens the detail of that article', async () => {
  renderAt('/');

  userEvent.click(await screen.findByRole('link', { name: 'Leche entera 1 L' }));

  expect(
    await screen.findByRole('heading', { level: 1, name: 'Leche entera 1 L' })
  ).toBeInTheDocument();
});

test('the detail shows name, brand, type and units', async () => {
  renderAt('/articulos/leche');

  expect(
    await screen.findByRole('heading', { level: 1, name: 'Leche entera 1 L' })
  ).toBeInTheDocument();
  expect(screen.getByText('Colún')).toBeInTheDocument();
  expect(screen.getByText('Lácteos')).toBeInTheDocument();
  expect(screen.getByText('24 unidades')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Agregar al carrito' })).toBeEnabled();
});

test('adding to the cart takes one unit from the inventory', async () => {
  renderAt('/articulos/leche');

  userEvent.click(await screen.findByRole('button', { name: 'Agregar al carrito' }));

  expect(screen.getByText('23 unidades')).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }));

  expect(screen.getByText('22 unidades')).toBeInTheDocument();
});

test('an article without stock shows a disabled Agotado button', async () => {
  renderAt('/articulos/detergente');

  await screen.findByRole('button', { name: 'Agregar al carrito' });
  for (let unit = 0; unit < 7; unit += 1) {
    userEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }));
  }

  expect(screen.getByText('0 unidades')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Agotado' })).toBeDisabled();
});

test('an unknown article shows a notice, a link home and the menu', async () => {
  renderAt('/articulos/xyz');

  expect(
    await screen.findByRole('heading', { level: 1, name: 'Artículo no encontrado' })
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Volver a Inicio' })).toHaveAttribute('href', '/');
  expect(screen.getByRole('navigation', { name: 'Secciones' })).toBeInTheDocument();
});
