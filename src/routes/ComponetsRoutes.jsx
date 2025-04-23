import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// Project imports
import Loadable from 'components/Loadable';
import MainLayout from '../layout/MinimalLayout';

// Lazy load pages
const Dashboard = Loadable(lazy(() => import('pages/dashboard')));
const Profile = Loadable(lazy(() => import('pages/profile')));
const NotFound = Loadable(lazy(() => import('pages/NotFound')));
const Login = Loadable(lazy(() => import('pages/auth/jwt/login')));

// ==============================|| COMPONENT ROUTES ||============================== //

const ComponentsRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Navigate to="/login" replace />, // Redirect to Login by default
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'dashboard',
      element: <Dashboard />,
    },
    {
      path: 'profile',
      element: <Profile />,
    },
    {
      path: '*',
      element: <NotFound />, // Handles 404 pages
    }
  ]
};

export default ComponentsRoutes;
