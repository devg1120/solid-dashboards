import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";

import Home from "./pages/home";
import Authlayout from "./layout/auth.layout";
import { DashboardLayout } from "./layout/dashboard.layout";

export const routes: RouteDefinition[] = [
  {
    component: DashboardLayout,
    children: [
      {
        path: "/example",
        component: lazy(() => import("./pages/example")),
      },
      {
        path: "/example/:id",
        component: lazy(() => import("./pages/example")),
      },
      {
        path: "/admin-list",
        component: lazy(() => import("./pages/admin-list")),
      },
      {
        path: "/",
        component: lazy(() => import("./pages/home")),
      },
    ],
  },
  {
    component: Authlayout,
    children: [
      {
        path: "/login",
        component: lazy(() => import("./pages/login")),
      },
    ],
  },

  {
    path: "**",
    component: lazy(() => import("./errors/404")),
  },
];
