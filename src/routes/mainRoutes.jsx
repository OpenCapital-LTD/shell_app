import React, { lazy } from "react";
import MainLayout from "../layout/mainlayout";
import { element } from "prop-types";
import Landing from "../components/landing";
import SsoPage from "../components/authentication/sso";
import SsoErrorPage from "../components/authentication/sso_error";
import { Suspense } from "react";
import Page from "../components/page";
const TestComponentTwo = lazy(() => import("fe_projects_service/src"));
const ProjectsApp = lazy(() => import("fe_projects_service/projects_app"));
// const Settings = lazy(() => import('fe_expense_service/user_setting'));
const Settings = lazy(() => import("fe_expense_service/user_setting"));
const ExpenseSystem = lazy(() => import("fe_expense_service/expense_app"));
const OCAFun = lazy(() => import("fe_oca_fun/oca_fun"));
const OcaPuzzle = lazy(() => import("fe_oca_puzzle/oca_puzzle"));

const NotFoundPage = () => {
  return <div>not found page</div>;
};
const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/project_service/*",
      element: (
        <Suspense fallback={() => <div>loading ...</div>}>
          <ProjectsApp />
        </Suspense>
      ),
    },
    {
      path: "/expense_service/*",
      element: (
        <Suspense fallback={() => <div>loading ...</div>}>
          <ExpenseSystem />
        </Suspense>
      ),
    },
    {
      path: "/oca_fun/*",
      element: (
        <Suspense fallback={() => <div>loading ...</div>}>
          <OCAFun />
        </Suspense>
      ),
    },
    {
      path: "/oca_puzzle/*",
      element: (
        <Suspense fallback={() => <div>loading ...</div>}>
          <OcaPuzzle
            recentlyCreatedOwnerStacks={[
              { id: 1, name: "Stack A" },
              { id: 2, name: "Stack B" },
            ]}
          />
        </Suspense>
      ),
    },
    {
      path: "/oca_fun_page",
      element: (
        <Suspense fallback={() => <div>loading ...</div>}>
          <Page />
        </Suspense>
      ),
    },
    {
      path: "/config/*",
      element: (
        <Suspense fallback={() => <div>loading ...</div>}>
          <Settings />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ],
};

export default MainRoutes;
