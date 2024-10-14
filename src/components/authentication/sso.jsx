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
            const token = v.db_token
            Cookies.set('auth_token', "Bearer "+v.db_token)
            addGHead('auth_token', v.db_token)
            addGHead('logedIn', true)
            addGHead('user', { ...jwtDecode(v.db_token), picture: v.d.picture })

            console.log(token)
            const userRoles = jwtDecode(token.split(" ")[1]).UserRoles
            let rolesArray = userRoles.map(l => l.Role.type)
            if (rolesArray.includes('ADMIN')) {
                Cookies.set('pj_role', 'admin')
            } else if (rolesArray.includes('APPROVER')) {
                Cookies.set('pj_role', 'approver')
            } else {
                Cookies.set('pj_role', 'user')
            }
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