import ManagerPanel from './pages/ManegerPanel'
import Main from './pages/MainPage'
import Auth from './pages/Auth'
import OrderPage from './pages/orderPage'
import ShipmentPage from './pages/shipmentPage'
import {MAIN_ROUTE, ORDER_ROUTE,SHIPMENT_ROUTE, MANAGER_PANEL_ROUTE,  LOGIN_ROUTE, REG_ROUTE } from "./utils/consts"

export const authRoutes = [
   
]

export const managerRoutes = [
    {
        path: REG_ROUTE,
        Component: Auth
    },
   
]
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    }, 
    {
        path: MAIN_ROUTE,
        Component: Main
    },
   
    {
        path: ORDER_ROUTE + '/:id',
        Component: OrderPage
    },
    {
        path: SHIPMENT_ROUTE + '/:id',
        Component: ShipmentPage
    },
    {
        path: MANAGER_PANEL_ROUTE,
        Component: ManagerPanel
    },
]