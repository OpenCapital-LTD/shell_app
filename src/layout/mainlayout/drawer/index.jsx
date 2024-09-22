import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./../../../assets/styles/drawer.scss";
import menuItems, { menuItemsUser } from "../../../menu-items";
import { useGiraf } from "../../../giraff";

const MainDrawer = () => {
    const { gHead, addGHead } = useGiraf();
    const navigate = useNavigate();
    const [mItms, setItms] = useState();

    useEffect(() => {
        // Safely access nested properties
        const roles = gHead.user?.UserRoles?.map((l) => l.Role?.type);
        console.log('Here is the user roles:', roles);
        if (roles) {
            addGHead("user_role", roles);
        }
    }, [gHead, addGHead]);

    // Choose menu based on roles
    const activeMenu = gHead.user_role?.includes('ADMIN') || gHead.user_role?.includes('APPROVER') ? menuItems : menuItemsUser;

    return (
        <div className="drawer_main">
            <div className="logo"></div>
            <div className="nav_container">
                {activeMenu?.items?.map((l, index) => {
                    // Check if l and necessary properties exist before rendering
                    if (!l || !l.url || !l.title || !l.icon) {
                        console.warn('Invalid menu item:', l);
                        return null;
                    }
                    return (
                        <div 
                            key={index} 
                            className="nav_item" 
                            onClick={() => {
                                console.log(l.url);
                                if (l.url === '/') {
                                    addGHead("header", true);
                                } else {
                                    addGHead('header', false);
                                }
                                if (l.url.includes('settings')) {
                                    addGHead('sett', true);
                                } else {
                                    addGHead('sett', false);
                                }
                                navigate(l.url);
                            }}
                        >
                            <div className="atom_icon">
                                {l.icon}
                            </div>
                            <p className="atom_par">{l.title}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MainDrawer;
