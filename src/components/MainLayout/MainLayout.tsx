import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../Header/Header'

export const MainLayout: React.FC = () => {
    return (
        <div className="wrapper" >
            <Header />
            <div className="content">
                <Outlet />
            </div>
        </div>

    )
}
