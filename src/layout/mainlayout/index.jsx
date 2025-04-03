
import React from 'react'
import { Box, Breadcrumbs, Toolbar } from "@mui/material"
import { Outlet } from "react-router-dom"
import Floater from '../../components/floater'
import useQuery from '../../hooks/query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/react';
const MainLayout = () => {
    const { path, param, fun } = useQuery()
    const navigate = useNavigate()
    useEffect(() => {
        if (path) {
            navigate(path + param)
        }
        if(fun){
            navigate(fun)
        }
    }, [])
    return (
        <div className="app_container">
            {/* <Floater /> */}
            <Outlet />
            <Analytics/>
            <SpeedInsights/>
        </div>
    )
}

export default MainLayout