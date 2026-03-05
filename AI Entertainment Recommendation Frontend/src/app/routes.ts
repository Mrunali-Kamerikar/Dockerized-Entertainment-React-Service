import { createBrowserRouter, redirect } from 'react-router';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Login,
  },
  {
    path: '/dashboard',
    Component: Dashboard,
  },
  {
    path: '*',
    loader: () => redirect('/'),
  },
]);
