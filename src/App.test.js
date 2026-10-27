import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { routes } from './routing/routes';

function renderAt(path) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(<RouterProvider router={router} />);
  return router;
}

test('route table exposes the four child routes', () => {
  expect(routes[0].children).toHaveLength(4);
  expect(routes[0].children.map(function childPath(child) {
    return child.index ? 'index' : child.path;
  })).toEqual(['index', 'quienes-somos', 'contacto', '*']);
});

test('home marks only Inicio as current', async () => {
  renderAt('/');

  expect(await screen.findByRole('link', { name: 'Inicio' })).toHaveAttribute(
    'aria-current',
    'page'
  );
  expect(
    screen.getByRole('link', { name: 'Quiénes somos' })
  ).not.toHaveAttribute('aria-current', 'page');
  expect(
    screen.getByRole('link', { name: 'Contáctanos' })
  ).not.toHaveAttribute('aria-current', 'page');
});

test('choosing Quiénes somos shows that section', async () => {
  renderAt('/');

  await screen.findByRole('link', { name: 'Quiénes somos' });
  await userEvent.click(screen.getByRole('link', { name: 'Quiénes somos' }));

  expect(
    await screen.findByRole('heading', { level: 1, name: 'Quiénes somos' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: 'Quiénes somos' })
  ).toHaveAttribute('aria-current', 'page');
  expect(screen.getByRole('link', { name: 'Inicio' })).not.toHaveAttribute(
    'aria-current',
    'page'
  );
});

test('unknown address keeps the menu and explains the miss', () => {
  renderAt('/no-existe');

  expect(
    screen.getByRole('heading', { level: 1, name: 'Página no encontrada' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('navigation', { name: 'Secciones' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: 'Volver a Inicio' })
  ).toBeInTheDocument();
});

test('home lists a product with stock and no edit controls', async () => {
  renderAt('/');

  expect(await screen.findByRole('list')).toBeInTheDocument();
  expect(screen.getByText('Leche entera 1 L')).toBeInTheDocument();
  expect(screen.getByText('24 en stock')).toBeInTheDocument();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
  expect(screen.queryByRole('form')).not.toBeInTheDocument();
});

test('about and contact show their content', async () => {
  renderAt('/');

  await screen.findByRole('link', { name: 'Quiénes somos' });
  await userEvent.click(screen.getByRole('link', { name: 'Quiénes somos' }));

  expect(
    await screen.findByRole('heading', { level: 1, name: 'Quiénes somos' })
  ).toBeInTheDocument();
  expect(screen.getByText(/Supermercado La Quinta es una tienda de barrio/)).toBeInTheDocument();

  await userEvent.click(screen.getByRole('link', { name: 'Contáctanos' }));

  expect(
    await screen.findByRole('heading', { level: 1, name: 'Contáctanos' })
  ).toBeInTheDocument();
  expect(screen.getByText('Avenida Principal 120, La Quinta')).toBeInTheDocument();
  expect(screen.getByText('+56 9 5555 0142')).toBeInTheDocument();
  expect(screen.getByText('contacto@supermercadolquinta.cl')).toBeInTheDocument();
  expect(screen.queryByRole('form')).not.toBeInTheDocument();
});
