import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 overflow-y-auto bg-[#181818]">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;