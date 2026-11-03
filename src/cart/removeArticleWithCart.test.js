import { act, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderAt } from '../testing/renderAt';

async function goTo(router, path) {
  await act(async function navigate() {
    await router.navigate(path);
  });
}

test('removing an article from the table also removes it from home and the cart', async () => {
  const router = renderAt('/articulos/leche');

  userEvent.click(await screen.findByRole('button', { name: 'Agregar al carrito' }));
  userEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }));

  await goTo(router, '/gestion-articulos/inventario-articulos');
  const row = await screen.findByRole('row', { name: /Leche entera 1 L/ });
  userEvent.click(within(row).getByRole('button', { name: 'Eliminar' }));

  expect(screen.queryByRole('link', { name: 'Leche entera 1 L' })).not.toBeInTheDocument();

  await goTo(router, '/');

  expect(await screen.findByText('Pan hallulla')).toBeInTheDocument();
  expect(screen.queryByText('Leche entera 1 L')).not.toBeInTheDocument();

  await goTo(router, '/carrito');

  expect(await screen.findByText('Tu carrito está vacío.')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Carrito' })).toBeInTheDocument();
});
