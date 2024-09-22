import React, { useEffect, useState } from "react";
import { useGiraf } from "../giraff";
import { useRoutes } from "react-router-dom";
import MainRoutes from "./mainRoutes";
import AuthRoutes from "./authRoutes";
import Cookies from 'js-cookie';
import { LoadingOutlined } from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";

const ThemeRoutes = () => {
    const [logedIn, setLogedIn] = useState(false); // This state seems unused; consider removing or using properly
    const { gHead, addGHead } = useGiraf();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        addGHead("header", true);
        addGHead("toolbar", true);
        console.log('');
        const token = Cookies.get('auth_token');
        if (!token) {
            setLoading(false);
            return;
        }
        addGHead('auth_token', token);
        addGHead('user', jwtDecode(token.split(" ")[1]));
        console.log(jwtDecode(token.split(" ")[1]));    
        setLoading(false);
        addGHead('logedIn', true);
        // return addGHead('logedIn', null)
    }, [gHead.logedIn]); 
    const routes = useRoutes([gHead.logedIn ? MainRoutes : AuthRoutes]);

    if (loading) {
        return (
            <div style={{
                fontSize: '30px',
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <LoadingOutlined size={40} style={{
                    fontSize: '35px',
                }} />
            </div>
        );
    }

    return routes;
};

export default ThemeRoutes;
