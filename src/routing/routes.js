import { createBrowserRouter } from 'react-router';
import { AboutPage } from '../about/AboutPage/AboutPage';
import { products } from '../catalog/products';
import { ContactPage } from '../contact/ContactPage/ContactPage';
import { supermarketProfile } from '../content/supermarketProfile';
import { InventoryPage } from '../inventory/InventoryPage/InventoryPage';
import { AppShell } from '../shell/AppShell/AppShell';
import { NotFoundPage } from './NotFoundPage/NotFoundPage';

export function loadProducts() {
  return products;
}

export function loadAbout() {
  return supermarketProfile.aboutParagraphs;
}

export function loadContact() {
  return {
    address: supermarketProfile.address,
    phone: supermarketProfile.phone,
    email: supermarketProfile.email,
  };
}

function ShellHydrateFallback() {
  return null;
}

export const routes = [
  {
    path: '/',
    Component: AppShell,
    HydrateFallback: ShellHydrateFallback,
    children: [
      { index: true, Component: InventoryPage, loader: loadProducts },
      { path: 'quienes-somos', Component: AboutPage, loader: loadAbout },
      { path: 'contacto', Component: ContactPage, loader: loadContact },
      { path: '*', Component: NotFoundPage },
    ],
  },
];

export const appRouter = createBrowserRouter(routes);
