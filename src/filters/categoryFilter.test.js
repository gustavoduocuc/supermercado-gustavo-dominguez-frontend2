import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderAt } from '../testing/renderAt';

async function openTable() {
  renderAt('/gestion-articulos/inventario-articulos');
  return screen.findByRole('combobox', { name: 'Categoría' });
}

async function openHome() {
  renderAt('/');
  return screen.findByRole('combobox', { name: 'Categoría' });
}

test('the table filter offers Todas and the ten categories', async () => {
  const select = await openTable();

  const options = within(select).getAllByRole('option');

  expect(options).toHaveLength(11);
  expect(options[0]).toHaveTextContent('Todas');
  expect(select).toHaveValue('Todas');
});

test('filtering the table by Lácteos keeps only that type and Todas restores all', async () => {
  const select = await openTable();

  userEvent.selectOptions(select, 'Lácteos');

  expect(screen.getByRole('cell', { name: 'Leche entera 1 L' })).toBeInTheDocument();
  expect(screen.queryByRole('cell', { name: 'Pan hallulla' })).not.toBeInTheDocument();
  expect(screen.getAllByRole('row')).toHaveLength(2);

  userEvent.selectOptions(select, 'Todas');

  expect(screen.getAllByRole('row')).toHaveLength(7);
});

test('filtering the table does not remove articles from the inventory', async () => {
  const select = await openTable();

  userEvent.selectOptions(select, 'Lácteos');
  userEvent.click(screen.getByRole('link', { name: 'Inicio' }));

  expect(await screen.findByText('Pan hallulla')).toBeInTheDocument();
});

test('the table shows a message when the category has no articles', async () => {
  const select = await openTable();

  userEvent.selectOptions(select, 'Carnes');

  expect(screen.getByText('No hay artículos en esta categoría.')).toBeInTheDocument();
  expect(screen.queryByRole('table')).not.toBeInTheDocument();
});

test('home offers the same filter and keeps its read-only controls', async () => {
  const select = await openHome();

  expect(within(select).getAllByRole('option')).toHaveLength(11);

  userEvent.selectOptions(select, 'Lácteos');

  expect(screen.getByText('Leche entera 1 L')).toBeInTheDocument();
  expect(screen.queryByText('Pan hallulla')).not.toBeInTheDocument();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();

  userEvent.selectOptions(select, 'Todas');

  expect(screen.getByText('Pan hallulla')).toBeInTheDocument();
});

test('home shows a message when the category has no articles', async () => {
  const select = await openHome();

  userEvent.selectOptions(select, 'Carnes');

  expect(screen.getByText('No hay artículos en esta categoría.')).toBeInTheDocument();
});
