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
                    <div className='ava'>{gHead?.user.firstName[0]}{gHead?.user.lastName[0]}</div>
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
            <div className='right_pane'>
                <div className='header'>
                    <p>{date} am</p>
                    <p>
                        <a href='https://opencapital.com' target='_blank'>Documentation</a>
                    </p>
                    <p>
                        <a href='https://mail.google.com/mail/u/0/#inbox?compose=CllgCHrgCldtGMdfqdGmBHWTZQQcjWnHFBWqhwPSZlTFzsPhQFbTgjdfbHBmKsjZPrdXLvcGqdq        ' target='_blank'>Support</a>

                    </p>
                </div>
                <div className='app_holder'>

                    {/* <div className='app' onClick={() => {
                        navigate('project_service')
                    }}>
                        <FileProtectOutlined className='icon' />
                        <p>Project Code Survey</p>
                    </div>
                    <div className='app'>
                        <SignatureOutlined className='icon' />
                        <p>Expense Logging</p>
                    </div>
                    <div className='app' onClick={() => {
                        navigate('config')
                    }}>
                        <SlidersOutlined className='icon' />
                        <p>Config Settings</p>
                    </div>
                    <div className='app'>
                        <PendingOutlined className='icon' />
                        <p>comming soon...</p>
                    </div> */}

                    {
                        gHead.user ? gHead.user.AppAccess.map(app => {
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
                    <div className='app' onClick={() => {
                        navigate(appList['appid']?.url || '/')
                    }}>
                        {appList['appid']?.icon || <PendingOutlined className='icon' />}
                        <p>{appList['appid']?.title || 'comming soon...'}</p>
                    </div>
                    <div className='app' onClick={() => {
                        navigate(appList['appid']?.url || '/')
                    }}>
                        {appList['appid']?.icon || <PendingOutlined className='icon' />}
                        <p>{appList['appid']?.title || 'comming soon...'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing