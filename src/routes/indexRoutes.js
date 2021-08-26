import Login from "../views/Login/Login";
import Register from "../views/Register/Register";
import Dashboard from "../views/Dashboard/Dashboard";
import React from "react";


const indexRoutes = [
    {
        path: "/login",
        component: Login
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/dashboard",
        component: Dashboard
    },
];

export default indexRoutes;