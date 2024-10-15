import React, { lazy } from 'react';
import MainLayout from '../layout/mainlayout'
import { element } from 'prop-types';
import Landing from '../components/landing';
import SsoPage from '../components/authentication/sso';
import SsoErrorPage from '../components/authentication/sso_error';
import { Suspense } from 'react';
const TestComponentTwo = lazy(() => import('fe_projects_service/src'));
const ProjectsApp = lazy(() => import('fe_projects_service/projects_app'));
// const Settings = lazy(() => import('fe_expense_service/user_setting'));
const Settings = lazy(()=>import('fe_expense_service/user_setting'))
const ExpenseSystem = lazy(()=>import('fe_expense_service/expense_app'))

const NotFoundPage = ()=>{
  return(
    <div>not found page</div>
  )
}
const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '/project_service/*',
      element: (
        <Suspense fallback={()=><div>loading ...</div>}>
          <ProjectsApp/>

        </Suspense>
      )
    },{
      path: '/expense_service/*',
      element: (
        <Suspense fallback={()=><div>loading ...</div>}>
          <ExpenseSystem/>

        </Suspense>
      )
    },{
      path: '/config/*',
      element: (
        <Suspense fallback={()=><div>loading ...</div>}>
          <Settings/>

        </Suspense>
      )
    },
    {
      path: '*',
      element: <NotFoundPage />
    },
  ]
}

export default MainRoutes