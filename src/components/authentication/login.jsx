import React, { useEffect } from 'react'
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
import useQuery from '../../hooks/query'
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
    const {fun} = useQuery()


    useEffect(()=>{

    },[])
    const actionLogin = () => {
        Cookies.set('fun', fun)
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
            Cookies.set('user_id', jwtDecode(res.token).idName)
            
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
                Cookies.set('pj_role', 'user')
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
            <div className="login" style={{
                height: (!window.location.host.includes('localhost') && !window.location.host.includes("vercel")) && '40%',
                border: (!window.location.host.includes('localhost') && !window.location.host.includes("vercel")) && 'none',
                marginTop: (!window.location.host.includes('localhost') && !window.location.host.includes("vercel")) && '40%'
            }}>
                {response && <MessageBox type={messageType} txt={response} />}
                {loading && <Loading />}

                <h4>LOG IN</h4>
                {(window.location.host.includes('localhost') || window.location.host.includes('vercel')) && <>
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
                </>
                }
                <br></br>
                {(!window.location.host.includes('localhost') && !window.location.host.includes("vercel")) && <button className="gsi-material-button" onClick={() => {
                    actionGoogleSignIn()
                }}>
                    <div className="gsi-material-button-state"></div>
                    <div className="gsi-material-button-content-wrapper">
                        <div className="gsi-material-button-icon">
                            <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                style={{ display: 'block' }}
                            >
                                <path
                                    fill="#EA4335"
                                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                />
                                <path
                                    fill="#4285F4"
                                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                                />
                                <path fill="none" d="M0 0h48v48H0z" />
                            </svg>
                        </div>
                        <span className="gsi-material-button-contents">Continue with Google</span>
                        <span style={{ display: 'none' }}>Continue with Google</span>
                    </div>
                </button>}
            </div>

        )

}

export default Login