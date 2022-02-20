import React from "react";

import { Logo } from "@components";
import { UserInfo } from "./UserInfo";

export const Header: React.FC = () => {
    return (
        <div className="headerContainer">
            <div className="logoContainer">
                <Logo />
            </div>
            <div className="infoContainer">
                <UserInfo />
            </div>
        </div>
    );
};
