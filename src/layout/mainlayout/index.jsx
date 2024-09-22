
import React from 'react'
import { Box, Breadcrumbs, Toolbar } from "@mui/material"
import { Outlet } from "react-router-dom"
import Floater from '../../components/floater'

const MainLayout = () => {

    return (
        <div className="app_container">
            <Floater/>
            <Outlet />
        </div>
    )
}

export default MainLayout