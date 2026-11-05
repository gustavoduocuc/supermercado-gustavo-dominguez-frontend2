import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { routes } from './routes';
import { getRouterBasename } from './routerBasename';

const publishedBase = '/supermercado-gustavo-dominguez-frontend2';

test('an empty public url keeps the app at the root', () => {
  expect(getRouterBasename('')).toBe('/');
  expect(getRouterBasename(undefined)).toBe('/');
});

test('a public url becomes the router base without a trailing slash', () => {
  expect(getRouterBasename(publishedBase)).toBe(publishedBase);
  expect(getRouterBasename(`${publishedBase}/`)).toBe(publishedBase);
});

function renderPublished(path) {
  const router = createMemoryRouter(routes, {
    basename: publishedBase,
    initialEntries: [`${publishedBase}${path}`],
  });
  render(<RouterProvider router={router} />);
}

test('a known address under the base opens that section', async () => {
  renderPublished('/quienes-somos');

  expect(
    await screen.findByRole('heading', { level: 1, name: 'Quiénes somos' })
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Quiénes somos' })).toHaveAttribute(
    'aria-current',
    'page'
  );
  expect(screen.getByRole('link', { name: 'Contáctanos' })).toHaveAttribute(
    'href',
    `${publishedBase}/contacto`
  );
});

test('an unknown address under the base shows the app notice', async () => {
  renderPublished('/no-existe');

  expect(
    await screen.findByRole('heading', { level: 1, name: 'Página no encontrada' })
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Volver a Inicio' })).toHaveAttribute(
    'href',
    publishedBase
  );
});
