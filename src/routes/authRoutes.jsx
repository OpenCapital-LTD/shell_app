import React, { lazy } from 'react';
import MinimalLayout from '../layout/minimalLayout';
import Login from '../components/authentication/login';
import SsoPage from '../components/authentication/sso'
import SsoErrorPage from '../components/authentication/sso_error';
const AuthRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/',
            element: <Login />
        },{
            path: '/sso-redirect',
            element: <SsoPage />
        }
        ,{
          path: '/auth_error',
          element: <SsoErrorPage />
      },
        ,{
            path:'*',
            element:<Login/>
          }
    ]
}

export default AuthRoutes
// console