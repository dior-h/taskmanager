import React from 'react';
import { Outlet } from 'react-router-dom';
import DashHeader from './DashHeader';
import DashFooter from './DashFooter';

const DashLayout = () => {
    return (
        <>
            <DashHeader />
            <div className='inline-flex max-h-full max-w-full bg-gray-100'>
                <Outlet />
            </div>
            <DashFooter />
        </>
    );
}

export default DashLayout
