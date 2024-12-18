import React, { lazy, Suspense, useEffect, useState } from 'react'
import '../../assets/styles/global.scss'
import '../../assets/styles/landing.scss'
import { ExperimentOutlined, FileProtectOutlined, ProjectOutlined, SignatureOutlined, SlidersOutlined } from '@ant-design/icons'
import { Logout, MoneyOutlined, PendingOutlined } from '@mui/icons-material'
import { useGiraf } from '../../giraff'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import appList from './applist'
import Loading from '../load'
import img from '../../assets/images/ehub_line.png'
// const TestComponent = lazy(() => import('app_1/src'));
const TestComponent = lazy(() => import('fe_expense_service/user_setting'))
const Landing = () => {
    const [date, setDate] = useState()
    const navigate = useNavigate()
    const { gHead, addGHead } = useGiraf()
    useEffect(() => {
        let now = new Date()
        console.log(gHead.user)
        setInterval(() => {
            let t = `${(new Date().getHours()).toString().padStart(2, '0')} : ${(new Date().getMinutes()).toString().padStart(2, '0')} : ${(new Date().getSeconds()).toString().padStart(2, '0')}`
            setDate(t)

        }, 1000)
    }, [])
    const logOut = () => {
        Cookies.remove('auth_token')
        Cookies.remove('pj_role')
        addGHead('auth_token', null)
        addGHead('logedIn', false)
        navigate('/')
    }
    return (
        <div className='landing'>
            <div className='oca_logo'></div>
            <div className='left_pane'>
                <h2><span className='line'></span>OCA <span className='ehub_line'>eHub</span> </h2>
                <div className='profile'>
                    {/* <div className='ava'>{gHead?.user.firstName[0]}{gHead?.user.lastName[0]}</div> */}
                    {/* background: `url('${gHead.user?.url_image ? gHead.user.url_image : gHead.user.picture}')`, */}
                    <div className='ava' style={{
                        background: `url('${gHead.user?.url_image ? gHead.user.url_image : gHead.user.picture}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}></div>
                    <div>
                        <p className='hd'>{gHead?.user.idName}</p>
                        <p style={{
                            cursor: 'pointer'
                        }} onClick={() => {
                            logOut()
                        }}>log out?</p>
                    </div>
                </div>
            </div>
            <img src={img} style={{
                width: '0px',
                height: '0px'
            }} />
            <div className='right_pane'>
                <div className='header'>
                    <p>{date} am</p>
                    <p>
                        <a href='https://www.dropbox.com/scl/fi/guiia8wmktyol4dyb847f/240806-Project-Tracker-Manual-vF.pptx?rlkey=c5erko781h7ef4f19lba8rrgw&st=7xgftw1g&dl=0' target='_blank'>Documentation</a>
                    </p>
                    <p>
                        <a href='https://mail.google.com/mail/u/0/#inbox?compose=CllgCHrgCldtGMdfqdGmBHWTZQQcjWnHFBWqhwPSZlTFzsPhQFbTgjdfbHBmKsjZPrdXLvcGqdq        ' target='_blank'>Support</a>

                    </p>
                </div>
                <div className='app_holder'>


                    {
                        gHead.user ? [...new Set(gHead.user.AppAccess?.map(l => l.app_id))].map(app_id => gHead.user.AppAccess?.find(l => l.app_id == app_id)).map(app => {
                            return (

                                <div className='app' onClick={() => {
                                    navigate(appList[app.App.nav_path]?.url || '/')
                                }}>
                                    {appList[app.App.nav_path]?.icon || <PendingOutlined className='icon' />}
                                    <p>{appList[app.App.nav_path]?.title || 'comming soon...'}</p>
                                </div>
                            )
                        })
                            :
                            <div><Loading /></div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Landing