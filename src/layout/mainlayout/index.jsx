
import React from 'react'
import { Box, Breadcrumbs, Toolbar } from "@mui/material"
import { Outlet } from "react-router-dom"
import Floater from '../../components/floater'
import useQuery from '../../hooks/query'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
const MainLayout = () => {
    const {path,param} = useQuery()
    const navigate = useNavigate()
    useEffect(()=>{
        navigate(path + param)
    },[])
    return (
        <div className="app_container">
            <Floater/>
            <Outlet />
        </div>
    )
}

export default MainLayout