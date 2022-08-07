import React from 'react';
import { Outlet } from 'react-router-dom';



const Layout = () => {
    return (
        <div className="Layout">
            Le layout
            <Outlet></Outlet>
        </div>
    );
};

export default Layout;