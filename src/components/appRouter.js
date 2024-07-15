import React, { useContext } from "react";
import {Routes, Route, Navigate} from 'react-router-dom'
import { authRoutes, publicRoutes, managerRoutes } from "../routes";
import { LOGIN_ROUTE } from "../utils/consts";

import {Context} from "../index"

const AppRouter = () => {
    const {employee} = useContext(Context)

    return(
        <Routes>
            {employee.isAuth && employee.role === 'manager' && managerRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {employee.isAuth === true && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact/>
            )}
            
        </Routes>
        
    )
}

export default AppRouter