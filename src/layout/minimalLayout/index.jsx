import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useGiraf } from "../../giraff";
import "../../assets/styles/global.scss";
import "../../assets/styles/components.scss";
import "../../assets/styles/auth.scss";
import img from "../../assets/images/hand_cit.png";
import useQuery from "../../hooks/query";

const MinimalLayout = () => {
  const { gHead } = useGiraf();
  const { path, param, fun } = useQuery();
  const [some, setSome] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const location = window.location.href;
    setSome(location);
    const player = localStorage.getItem("user_id");
    if (fun) {
      localStorage.setItem("fun", fun);
    }
  });
  return some.includes("puzzle") ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <div className="app_container_min">
      <div className="try" />
      <div className="auth_main">
        <div className="logo_box">
          {/* <div className="short_logo"></div> */}
          <p>
            | OCA <span className="ehub_line">eHub</span>
          </p>
        </div>
        <div className="main_container">
          <div className="vector"></div>
          <div className="rest">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MinimalLayout;
