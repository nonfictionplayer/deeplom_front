import React , {useContext, useEffect, useState} from "react";
import { BrowserRouter } from "react-router-dom"
import AppRouter from "./components/appRouter"
import {observer} from "mobx-react-lite";
import {Context} from "./index";



const App = observer( () => {
  
  return (
    <BrowserRouter>
 
      <AppRouter />
    </BrowserRouter>
  )
})

export default App
