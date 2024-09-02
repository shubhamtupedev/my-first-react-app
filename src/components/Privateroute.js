import React from 'react';
import { Outlet } from 'react-router-dom';
import { isLogin } from '../auth/authentication';
// import { json, useNavigate } from 'react-router-dom';

const privateroute = () => {

    // const navigate = useNavigate();

    if (!isLogin()) {
        console.log("hello world");
        return <Outlet></Outlet>
    } else {
        alert("User is not logged in");
    }



}

export default privateroute