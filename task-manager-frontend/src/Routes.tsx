import { Outlet, useRoutes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './views/Home';
import BlankLayout from './layouts/BlankLayout';
import Register from './views/Register';
import AuthLayout from './layouts/AuthLayout';
import Login from './views/Login';

export function Routes() {
    return useRoutes([
      {
        path: '/auth',
        element: (
            <BlankLayout>
              <Outlet />
            </BlankLayout>
        ),
        children: [
          { path: '/auth/register', element: <Register /> },
          { path: '/auth/login', element: <Login /> },
        ]
      },
      {
        path: '/',
        element: (
          <AuthLayout>
            <MainLayout>
              <Outlet />
            </MainLayout>
          </AuthLayout>
        ),
        children: [
          { path: '/', element: <Home /> },
        ]
      },
      // No match
      // { path: '*', element: <Navigate to="/404" replace /> },
    ]);
}