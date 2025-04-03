import React, { lazy, Suspense } from 'react';
import MinimalLayout from '../layout/minimalLayout';
import Login from '../components/authentication/login';
import SsoPage from '../components/authentication/sso'
import SsoErrorPage from '../components/authentication/sso_error';
import Page from '../components/page';
const OCAFun = lazy(()=>import('fe_oca_fun/oca_fun'))
const OcaPuzzle = lazy(()=>import('fe_oca_puzzle/oca_puzzle'))

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
      {
        path: '/oca_fun/*',
        element: (
          <Suspense fallback={()=><div>loading ...</div>}>
            <OCAFun/>
          </Suspense>
        )
      },{
        path: '/oca_puzzle/*',
        element: (
          <Suspense fallback={()=><div>loading ...</div>}>
            <OcaPuzzle/>
          </Suspense>
        )
      },
      {
        path: '/oca_fun_page',
        element: (
          <Suspense fallback={()=><div>loading ...</div>}>
            <Page/>
          </Suspense>
        )
      },
        ,{
            path:'*',
            element:<Login/>
          }
    ]
}

export default AuthRoutes
// console