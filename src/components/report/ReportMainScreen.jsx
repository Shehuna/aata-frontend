import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import ReportNavbar from './ReportNavbar'

const ReportMainScreen = () => {
  return (
     <>
        <ReportNavbar />
        <Outlet />
    </>
  )
}

export default ReportMainScreen