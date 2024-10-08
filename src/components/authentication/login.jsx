import React from 'react'
import { ArrowBackOutlined, BackupOutlined, LockOutlined, MailOutlined, OutputOutlined, TurnedIn } from "@mui/icons-material"
import { useState } from "react"
import Cookies from 'js-cookie'
import { jwtDecode } from "jwt-decode"
import usePushMessage from '../../hooks/pushmessage'
import usePostApi from '../../hooks/postapi'
import { useGiraf } from '../../giraff'
import MessageBox from '../message'
import Loading from '../loading'
import appConfig from '../../config'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import useGetApi from '../../hooks/getapi'
import { useNavigate } from 'react-router-dom'
import { lazy } from 'react'
import { Suspense } from 'react'
const TestComponent = lazy(() => import('fe_projects_service/src'));


const Login = () => {
    const [loading, setLoading] = useState(false)
    const { messageType, response, pushMessage } = usePushMessage()
    const { actionRequest } = useGetApi()
    const { actionRequest: actionPostApi } = usePostApi()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const { gHead, addGHead } = useGiraf()
    const [showPass, setShowPass] = useState(false)
    const [otp, setOTP] = useState('')
    const [openOtp, setOpenOtp] = useState(false)
    const navigation = useNavigate()

    const actionLogin = () => {
        if (!name || !password) return pushMessage('missing email or password')
        console.log('logging app config here :: ', appConfig)
        console.log(import.meta.env)
        setLoading(true)
        actionRequest({
            endPoint: `${appConfig.api.AUTH_URL}accounts/user`, params: { email: name, password }, hd: {
                'x-resource-type': 'sign-in'
            }
        }).then((res) => {
            // const token = 'Bearer ' + res.token
            // Cookies.set('auth_token', token)
            // addGHead('auth_token', token)
            pushMessage(res.message, 'success')
            let creds = {
                email: name,
                password
            }
            addGHead('auth_creds', creds)
            setOpenOtp(true)
            // addGHead('logedIn', true)
            // addGHead('user', jwtDecode(res.token))
        }).catch(err => {
            console.log(err)
            pushMessage(err.message, 'error')
        }).finally(() => {
            setLoading(false)
        })
    }

    const actionVerify = () => {
        if (!otp) return pushMessage('missing email or password')

        setLoading(true)
        actionRequest({
            endPoint: `${appConfig.api.AUTH_URL}accounts/otp/verify`, params: { email: name, otp }, hd: {
                'x-resource-type': 'sign-in'
            }
        }).then((res) => {
            const token = 'Bearer ' + res.token
            Cookies.set('auth_token', token)
            addGHead('auth_token', token)
            pushMessage(res.message, 'success')

            // addGHead('auth_creds', creds)    
            addGHead('logedIn', true)
            addGHead('user', jwtDecode(res.token))
            const userRoles = jwtDecode(res.token.split(" ")[1]).UserRoles
            const appAccess = jwtDecode(res.token.split(" ")[1]).AppAccess

            const pj_id = appAccess.find(l => l.App.nav_path == "pj_service").app_id
            let rolesArray = userRoles.map(l => l.Role.type)
            console.log('here is user : ', rolesArray);
            if (rolesArray.includes('ADMIN')) {
                Cookies.set('pj_role', 'admin')
            } else if (rolesArray.includes('APPROVER')) {
                Cookies.set('pj_role', 'approver')
            } else {
                Cookies.set('pj_role', 'USER')
            }
            
            navigate('/')
        }).catch(err => {
            console.log(err)
            pushMessage(err.message, 'error')
        }).finally(() => {
            setLoading(false)
        })
    }

    const actionGoogleSignIn = () => {
        setLoading(true)
        actionPostApi({
            endPoint: `${appConfig.api.AUTH_URL}auth/request`, params: { email: name, otp }, hd: {
                'x-resource-type': 'sign-in'
            }
        }).then((res) => {
            window.location = res.url
        }).catch(err => {
            console.log(err)
            pushMessage(err.message, 'error')
        }).finally(() => {
            setLoading(false)
        })
    }


    return openOtp ?
        (< div className="login" >
            {response && <MessageBox type={messageType} txt={response} />
            }
            {loading && <Loading />}
            <ArrowBackOutlined style={{
                marginTop: '30%',
                marginBottom: '-5%',
                cursor: 'pointer'
            }} onClick={() => {
                setOpenOtp(false)
            }} />
            <h4 style={{
            }}>ENTER OTP</h4>
            <div className="input_holder" >
                <label className="input" style={{
                    backgroundColor: 'white'
                }}>
                    <LockOutlined className="icon" />
                    <div className="l_input">
                        <p>Enter OTP</p>
                        <input placeholder="000000" onChange={(e) => {
                            setOTP(e.target.value)
                        }} value={otp} />
                    </div>
                </label>

            </div>
            <div onClick={() => {
                actionLogin()
            }}>
                <p style={{
                    fontSize: '12px',
                    marginLeft: '5px',
                    marginTop: '5px',
                    marginBottom: '15px',
                    cursor: 'pointer'
                }}>resend otp?</p>
            </div>
            <div className="signin_butt" onClick={() => {
                actionVerify()
            }}>Verify</div>

        </div >) : (
            <div className="login">
                {response && <MessageBox type={messageType} txt={response} />}
                {loading && <Loading />}

                <h4>LOG IN</h4>
                <div className="input_holder">
                    <label className="input">
                        <MailOutlined className="icon" />
                        <div className="l_input">
                            <p>Email Address</p>
                            <input placeholder="example@opencapital.com" onChange={(e) => {
                                setName(e.target.value)
                            }} />
                        </div>
                    </label>
                    <label className="input" style={{
                        backgroundColor: 'transparent'
                    }}>
                        <LockOutlined className="icon" />
                        <div className="l_input">
                            <p>Password</p>
                            <input placeholder="********" type={showPass ? "text" : "password"} onKeyDown={(e) => {
                                if (e.key == 'Enter') {
                                    actionLogin()
                                }


                            }} onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                            <div>
                                {showPass ? <EyeOutlined onClick={() => {
                                    setShowPass(false)
                                }} /> :
                                    <EyeInvisibleOutlined onClick={() => {
                                        setShowPass(true)
                                    }} />
                                }</div>
                        </div>
                    </label>
                </div>
                <div className="signin_butt" onClick={() => {
                    actionLogin()
                }}> Sign In</div>
                <div style={{
                    textAlign: 'center',
                    fontSize: '12px'
                }}>or</div>
                <div className="signin_butt google" onClick={() => {
                    actionGoogleSignIn()
                }}></div>
            </div>

        )

}

export default Login