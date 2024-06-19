import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const Private = () => {
    const user = localStorage.getItem("user-token");
    console.log(user);
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export const PrivateRole = () => {
    const user = localStorage.getItem("user")
    console.log(user);
    if (user) {
        const userRole = JSON.parse(user)
        const role = userRole.role

        return role === "Author" ? <Outlet /> : <Navigate to="/" />
    }
    else {
        return
    }
}

export default Private;