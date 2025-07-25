import React from 'react'
import SettingNavbar from './SettingNavbar'
import { Outlet } from 'react-router-dom'

const SettingMainScreen = () => {
  return (
    <>
        <SettingNavbar />
        <Outlet />
    </>
    
  )
}

export default SettingMainScreen