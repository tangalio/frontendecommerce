import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

const FrontendLayout = () => {

    return (
        <div>
            <Navbar />

            <div id="layoutSidenav_content">
                <main>
                    <Outlet />
                </main>
            </div>
            {/* <div>
                <main>
                    <Outlet />
                </main>
            </div> */}

        </div>
    );

}
export default FrontendLayout;