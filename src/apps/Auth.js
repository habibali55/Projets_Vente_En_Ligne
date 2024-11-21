import React from 'react'
import { Outlet } from 'react-router-dom'
import TopNavbar from '../components/Nav/TopNavbar'
import Footer from '../components/Sections/Footer'

export default function Auth() {
    return (
        <div>
            <TopNavbar />
            <Outlet />
            <Footer />
        </div>
    )
}
