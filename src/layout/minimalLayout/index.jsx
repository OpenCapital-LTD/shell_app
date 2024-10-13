import React from 'react'
import { Outlet } from "react-router-dom"
import { useGiraf } from "../../giraff"
import '../../assets/styles/global.scss'
import '../../assets/styles/components.scss'
import '../../assets/styles/auth.scss'
import img from '../../assets/images/hand_cit.png'

const MinimalLayout = () => {
    const { gHead } = useGiraf()
    return (
        <div className="app_container_min">
            <div className='try' />
            <div className="auth_main">
                <div className="logo_box">
                    {/* <div className="short_logo"></div> */}
                    <p>| OCA <span className='ehub_line'>eHub</span></p>
                </div>
                <div className="main_container" >
                    <div className="vector"></div>
                    <div className="rest" >
                        <Outlet />
                    </div>
                </div>

            </div>

        </div>
    )
}
export default MinimalLayout