import { createRootRoute } from "@tanstack/react-router"
import { homeRoute } from "./homePage.js"
import { authRoute } from "./auth.route.js"
import { dashboardRoute } from "./dashboard.js"
import RootLayout from "../RootLayout.jsx"

export const rootRoute = createRootRoute({
  component: RootLayout,
})

export const routeTree = rootRoute.addChildren([
  homeRoute,
  authRoute,
  dashboardRoute,
])