import React, { useEffect } from 'react'
import useQuery from '../../hooks/query'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useGiraf } from '../../giraff'
const SsoPage = () => {
    const { user } = useQuery()
    const { gHead, addGHead } = useGiraf()
    const navigation = useNavigate()
    useEffect(() => {
        if (!user) navigation('/')
        try {
            let v = JSON.parse(user)
            const token = 'Bearer ' + v.db_token
            Cookies.set('auth_token', "Bearer "+v.db_token)
            addGHead('auth_token', v.db_token)
            addGHead('logedIn', true)
            addGHead('user', { ...jwtDecode(v.db_token), picture: v.d.picture })
            navigation('/')
            console.log(v)
        } catch (err) {
            // navigation('/')
            console.log(err)

        }

    }, [])
    return (
        <div>
            redirecting ...
        </div>
    )
}
export default SsoPage