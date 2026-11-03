import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { routes } from './routing/routes';
import { renderAt } from './testing/renderAt';

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

test('home lists the shared articles and no edit controls', async () => {
  renderAt('/');

  expect(await screen.findByRole('list')).toBeInTheDocument();
  expect(screen.getByText('Leche entera 1 L')).toBeInTheDocument();
  expect(screen.getByText('24 unidades')).toBeInTheDocument();
  expect(screen.getByText('40 unidades')).toBeInTheDocument();
  expect(screen.getByText('18 unidades')).toBeInTheDocument();
  expect(screen.getByText('15 unidades')).toBeInTheDocument();
  expect(screen.getByText('9 unidades')).toBeInTheDocument();
  expect(screen.getByText('7 unidades')).toBeInTheDocument();
  expect(screen.getByText('Pan hallulla')).toBeInTheDocument();
  expect(screen.getByText('Colún · Lácteos')).toBeInTheDocument();
  expect(screen.queryByText(/en stock/)).not.toBeInTheDocument();
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

test('submitting an article shows it in the table and on home', async () => {
  renderAt('/gestion-articulos/inventario-articulos');

  expect(await screen.findByRole('cell', { name: 'Pan hallulla' })).toBeInTheDocument();

  await userEvent.click(screen.getByRole('link', { name: 'Agregar artículo' }));
  expect(
    await screen.findByRole('heading', { level: 1, name: 'Agregar artículo' })
  ).toBeInTheDocument();

  await userEvent.type(screen.getByLabelText('Nombre'), 'Yogur natural');
  await userEvent.type(screen.getByLabelText('Marca'), 'Soprole');
  await userEvent.selectOptions(screen.getByLabelText('Tipo de producto'), 'Lácteos');
  await userEvent.clear(screen.getByLabelText('Unidades'));
  await userEvent.type(screen.getByLabelText('Unidades'), '2');
  await userEvent.click(screen.getByRole('button', { name: 'Agregar' }));

  expect(screen.getByLabelText('Nombre')).toHaveValue('');
  expect(screen.getByLabelText('Marca')).toHaveValue('');
  expect(screen.getByLabelText('Tipo de producto')).toHaveValue('Abarrotes');
  expect(screen.getByLabelText('Unidades')).toHaveValue(1);

  await userEvent.click(screen.getByRole('link', { name: 'Inventario de artículos' }));

  expect(
    await screen.findByRole('heading', { level: 1, name: 'Inventario de artículos' })
  ).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: 'Yogur natural' })).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: 'Soprole' })).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: '2 unidades' })).toBeInTheDocument();

  await userEvent.click(screen.getByRole('link', { name: 'Inicio' }));

  expect(await screen.findByText('Yogur natural')).toBeInTheDocument();
  expect(screen.getByText('Soprole · Lácteos')).toBeInTheDocument();
  expect(screen.getByText('Pan hallulla')).toBeInTheDocument();
});

test('initial articles show their unit counts in the table', async () => {
  renderAt('/gestion-articulos/inventario-articulos');

  expect(await screen.findByRole('cell', { name: '24 unidades' })).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: '40 unidades' })).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: '18 unidades' })).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: '15 unidades' })).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: '9 unidades' })).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: '7 unidades' })).toBeInTheDocument();
});

test('a quantity below 1 keeps the draft and a valid quantity creates the row', async () => {
  renderAt('/gestion-articulos/agregar-articulo');

  await screen.findByRole('heading', { level: 1, name: 'Agregar artículo' });
  await userEvent.type(screen.getByLabelText('Nombre'), 'Queso');
  await userEvent.type(screen.getByLabelText('Marca'), 'Colún');
  await userEvent.selectOptions(screen.getByLabelText('Tipo de producto'), 'Lácteos');
  await userEvent.clear(screen.getByLabelText('Unidades'));
  await userEvent.type(screen.getByLabelText('Unidades'), '0');
  await userEvent.click(screen.getByRole('button', { name: 'Agregar' }));

  expect(screen.getByLabelText('Nombre')).toHaveValue('Queso');
  expect(screen.getByLabelText('Marca')).toHaveValue('Colún');
  expect(screen.getByLabelText('Tipo de producto')).toHaveValue('Lácteos');
  expect(screen.getByLabelText('Unidades')).toHaveValue(0);

  await userEvent.click(screen.getByRole('link', { name: 'Inventario de artículos' }));
  expect(
    await screen.findByRole('heading', { level: 1, name: 'Inventario de artículos' })
  ).toBeInTheDocument();
  expect(screen.queryByRole('cell', { name: 'Queso' })).not.toBeInTheDocument();

  await userEvent.click(screen.getByRole('link', { name: 'Agregar artículo' }));
  await userEvent.type(screen.getByLabelText('Nombre'), 'Queso');
  await userEvent.type(screen.getByLabelText('Marca'), 'Colún');
  await userEvent.selectOptions(screen.getByLabelText('Tipo de producto'), 'Lácteos');
  await userEvent.clear(screen.getByLabelText('Unidades'));
  await userEvent.type(screen.getByLabelText('Unidades'), '20');
  await userEvent.click(screen.getByRole('button', { name: 'Agregar' }));

  expect(screen.getByLabelText('Nombre')).toHaveValue('');
  expect(screen.getByLabelText('Marca')).toHaveValue('');
  expect(screen.getByLabelText('Tipo de producto')).toHaveValue('Abarrotes');
  expect(screen.getByLabelText('Unidades')).toHaveValue(1);

  await userEvent.click(screen.getByRole('link', { name: 'Inventario de artículos' }));
  expect(await screen.findByRole('cell', { name: 'Queso' })).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: '20 unidades' })).toBeInTheDocument();
});

test('matching articles add units and a different brand stays separate', async () => {
  renderAt('/gestion-articulos/agregar-articulo');

  await screen.findByLabelText('Nombre');
  await userEvent.type(screen.getByLabelText('Nombre'), 'leche entera 1 l');
  await userEvent.type(screen.getByLabelText('Marca'), 'colún');
  await userEvent.selectOptions(screen.getByLabelText('Tipo de producto'), 'Lácteos');
  await userEvent.clear(screen.getByLabelText('Unidades'));
  await userEvent.type(screen.getByLabelText('Unidades'), '20');
  await userEvent.click(screen.getByRole('button', { name: 'Agregar' }));

  await userEvent.type(screen.getByLabelText('Nombre'), 'Leche entera 1 L');
  await userEvent.type(screen.getByLabelText('Marca'), 'Soprole');
  await userEvent.selectOptions(screen.getByLabelText('Tipo de producto'), 'Lácteos');
  await userEvent.clear(screen.getByLabelText('Unidades'));
  await userEvent.type(screen.getByLabelText('Unidades'), '4');
  await userEvent.click(screen.getByRole('button', { name: 'Agregar' }));

  await userEvent.click(screen.getByRole('link', { name: 'Inventario de artículos' }));

  expect(await screen.findByRole('cell', { name: '44 unidades' })).toBeInTheDocument();
  expect(screen.getAllByRole('cell', { name: 'Leche entera 1 L' })).toHaveLength(2);
  expect(screen.getByRole('cell', { name: 'Soprole' })).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: '4 unidades' })).toBeInTheDocument();
  expect(screen.queryByRole('cell', { name: 'leche entera 1 l' })).not.toBeInTheDocument();
});

test('removing an article drops it from the table and from home', async () => {
  renderAt('/gestion-articulos/inventario-articulos');

  const row = await screen.findByRole('row', { name: /Detergente 1 kg/ });
  await userEvent.click(within(row).getByRole('button', { name: 'Eliminar' }));

  expect(screen.queryByRole('cell', { name: 'Detergente 1 kg' })).not.toBeInTheDocument();

  await userEvent.click(screen.getByRole('link', { name: 'Inicio' }));

  expect(await screen.findByText('Leche entera 1 L')).toBeInTheDocument();
  expect(screen.queryByText('Detergente 1 kg')).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Eliminar' })).not.toBeInTheDocument();
});
