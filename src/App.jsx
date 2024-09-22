import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Outlet, useRoutes, Routes, Route, BrowserRouter } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '../public/vite.svg';
import ocaLogo from './assets/images/oca_short_logo.png'
import './App.css';
import Loading from './components/load';
import Login from './components/authentication/login';
import { useGiraf } from './giraff';
import AuthRoutes from './routes/authRoutes';
import ThemeRoutes from './routes';
import Landing from './components/landing';

// const ExpenseService = lazy(() => import('app_1/src'))
// const ExpenseServiceDashboard = lazy(() => import('fe_expense_service/defaultDashboard'))
const ForTest = () => {
  return (
    <div>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>SHELL APP</h1>
    </div>
  );
};


const MainLayout = () => {
  const { gHead, addGHead } = useGiraf()
  return (
    <div className="app_container">
      <Outlet />
    </div>
  )
}

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/test',
      element: (
        <Suspense >
          <ForTest />
          <Outlet />
        </Suspense >
      ),
      children: [
        {
          path: 'expse',
          element: <ForTest />
        }
      ]
    },
  ]
}

const MRoutes = () => {
  const routes = useRoutes([AuthRoutes]);
  return routes;
}

function App() {
  const { gHead, addGHead } = useGiraf()
  
  return (
      <ThemeRoutes />
  )
}

export default App;
