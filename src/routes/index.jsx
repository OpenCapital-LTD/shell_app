import React, { useEffect, useState } from "react";
import { useGiraf } from "../giraff";
import { useRoutes } from "react-router-dom";
import MainRoutes from "./mainRoutes";
import AuthRoutes from "./authRoutes";
import Cookies from "js-cookie";
import { LoadingOutlined } from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";
import useGetApi from "../hooks/getapi";
import appConfig from "../config";
import useQuery from "../hooks/query";

const ThemeRoutes = () => {
  const [logedIn, setLogedIn] = useState(false); // This state seems unused; consider removing or using properly
  const { gHead, addGHead } = useGiraf();
  const [loading, setLoading] = useState(true);
  const { actionRequest } = useGetApi();
  const { path, param, fun } = useQuery()


  useEffect(() => {
    addGHead("header", true);
    addGHead("toolbar", true);
    console.log("");
    const token = Cookies.get("auth_token");
    if (!token) {
      setLoading(false);
      return;
    }
    addGHead("auth_token", token);
    addGHead("user", jwtDecode(token.split(" ")[1]));
    Cookies.set("user_id", jwtDecode(token.split(" ")[1]).idName);

    const userRoles = jwtDecode(token.split(" ")[1]).UserRoles;
    const appAccess = jwtDecode(token.split(" ")[1]).AppAccess;
    let array = [];

    const pj_id = appAccess.find((l) => l.App.nav_path == "pj_service").app_id;
    // const roles_list = userRoles.find(l=>l.)
    console.log(userRoles);
    // let prs = userRoles.map(async l => {
    //     try {
    //         let res = await actionRequest({ endPoint: appConfig.api.AUTH_URL + 'accounts/roles/id', params: { role: l.role_id} })
    //         let data = res.data
    //         console.log('here is the user role : ',data)
    //         return res

    //     } catch (err) {
    //         console.log(err)
    //         return ''
    //     }
    // })

    // Promise.all(prs)
    let rolesArray = userRoles.map((l) => l.Role.type);
    console.log("here is user : ", rolesArray);
    if (rolesArray.includes("ADMIN")) {
      Cookies.set("pj_role", "admin");
    } else if (rolesArray.includes("APPROVER")) {
      Cookies.set("pj_role", "approver");
    } else {
      Cookies.set("pj_role", "user");
    }
    setLoading(false);
    addGHead("logedIn", true);
    // return addGHead('logedIn', null)
  }, [gHead.logedIn]);

  const routes = useRoutes([gHead.logedIn ? MainRoutes : AuthRoutes]);

  if (loading) {
    return (
      <div
        style={{
          fontSize: "30px",
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingOutlined
          size={40}
          style={{
            fontSize: "35px",
          }}
        />
      </div>
    );
  }

  return routes;
};

export default ThemeRoutes;
