import React, { useEffect, useState } from 'react'
import useQuery from '../../hooks/query'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useGiraf } from '../../giraff'
import '../../assets/styles/auth.scss'
const SsoErrorPage = () => {
    const { error } = useQuery()
    const { gHead, addGHead } = useGiraf()
    const navigation = useNavigate()
    const [err, setErr] = useState()
    
    useEffect(() => {
      if(error){
        addGHead('error',error)
        navigation('/auth_error')
      }else{
        if(gHead.error){
            setErr(gHead.error)
        }else{
            navigation('/')
        }
      }
    }, [])
    return (
        <div className='auth_error'>
        <h4 style={{

        }}>403 : <br/>Authentication Forbidden</h4>
        <p>{gHead.error}</p>
        </div>
    )
}
export default SsoErrorPage