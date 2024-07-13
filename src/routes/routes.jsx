import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ParentElement from './ParentElement';
import AuthLayout from '../components/AuthLayout.jsx';
import PrivateRoute from '../components/PrivateRoute';

const MainPage = lazy(() => import('./../pages/Mainpage.jsx'));
const Login = lazy(() => import('./../pages/Login.jsx'));
const Signup = lazy(() => import('./../pages/Signup.jsx'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: 'signup',
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Signup />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/app',
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <ParentElement />
      </Suspense>
    ),
    children: [
      {
        path: '/app/dashboard',
        element: (
          <Suspense fallback={<p>Loading...</p>}>
             <PrivateRoute>
              <MainPage />
             </PrivateRoute>
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
