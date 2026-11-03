import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { routes } from './routing/routes';

function renderAt(path) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(<RouterProvider router={router} />);
  return router;
}

test('route table exposes the shell sections', () => {
  expect(routes[0].children).toHaveLength(5);
  expect(routes[0].children.map(function childPath(child) {
    return child.index ? 'index' : child.path;
  })).toEqual([
    'index',
    'quienes-somos',
    'contacto',
    'gestion-articulos',
    '*',
  ]);
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

test('article pages stay inside Gestión de artículos', async () => {
  renderAt('/');

  await screen.findByRole('link', { name: 'Gestión de artículos' });
  expect(screen.queryByRole('link', { name: 'Agregar artículo' })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Inventario de artículos' })).not.toBeInTheDocument();
  expect(screen.queryByText('Admin')).not.toBeInTheDocument();

  await userEvent.click(screen.getByRole('link', { name: 'Gestión de artículos' }));

  expect(
    await screen.findByRole('heading', { level: 1, name: 'Inventario de artículos' })
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Gestión de artículos' })).toHaveAttribute(
    'aria-current',
    'page'
  );
  expect(screen.getByRole('link', { name: 'Inicio' })).not.toHaveAttribute(
    'aria-current',
    'page'
  );
  expect(screen.getByRole('link', { name: 'Agregar artículo' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Inventario de artículos' })).toBeInTheDocument();
  expect(screen.queryByRole('form')).not.toBeInTheDocument();
});

test('submitting an article lists it and leaves the home catalog alone', async () => {
  renderAt('/gestion-articulos/agregar-articulo');

  expect(
    await screen.findByRole('heading', { level: 1, name: 'Agregar artículo' })
  ).toBeInTheDocument();
  expect(screen.queryByText('Admin')).not.toBeInTheDocument();

  await userEvent.type(screen.getByLabelText('Nombre'), 'Leche');
  await userEvent.type(screen.getByLabelText('Marca'), 'Colún');
  await userEvent.type(screen.getByLabelText('Tipo de producto'), 'Lácteos');
  await userEvent.click(screen.getByRole('button', { name: 'Agregar' }));

  expect(screen.getByLabelText('Nombre')).toHaveValue('');
  expect(screen.getByLabelText('Marca')).toHaveValue('');
  expect(screen.getByLabelText('Tipo de producto')).toHaveValue('');

  await userEvent.click(screen.getByRole('link', { name: 'Inventario de artículos' }));

  expect(
    await screen.findByRole('heading', { level: 1, name: 'Inventario de artículos' })
  ).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: 'Leche' })).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: 'Colún' })).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: 'Lácteos' })).toBeInTheDocument();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();

  await userEvent.click(screen.getByRole('link', { name: 'Inicio' }));

  expect(await screen.findByText('Leche entera 1 L')).toBeInTheDocument();
  expect(screen.getByText('24 en stock')).toBeInTheDocument();
  expect(screen.queryByText('Colún')).not.toBeInTheDocument();
});
