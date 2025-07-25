import React from 'react'
import {NavLink} from 'react-router-dom'
import {FaTachometerAlt, FaCogs, FaArrowCircleLeft, FaFileContract, FaSyncAlt} from 'react-icons/fa'
import { LuUserSearch } from "react-icons/lu";
import { RiContactsBook3Fill } from "react-icons/ri";

const AdminSidebar = () => {
  return (
    <div className='bg-slate-800 h-screen w-56 text-white fixed left-0 bottom-0 space-y-2'>
        <div className='h-12 flex items-center justify-center'>
            <h2 className='text-2xl text-center mt-8 mb-4'>Record MS</h2>
        </div>
        <div className='px-4'>
            <NavLink to={'/admin-dashboard'} 
                className={({isActive}) => `${isActive ? "bg-slate-600" :"hover:bg-slate-600" } flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-slate-600`}
                end>
                <FaTachometerAlt /> 
                <span>ፊት ገፅ </span>
            </NavLink>
            <NavLink to={'/admin-dashboard/appealerList'}
                className={({isActive}) => `${isActive ? "bg-slate-600" : "hover:bg-slate-600" } flex items-center space-x-4 block py-2.5 px-4 rounded `}
                end>
                <LuUserSearch />
                <span>ይግባኝ ባይ</span>
            </NavLink>
            <NavLink to={'/admin-dashboard/appealList'}
                className={({isActive}) => `${isActive ? "bg-slate-600" : "hover:bg-slate-600" } flex items-center space-x-4 block py-2.5 px-4 rounded `}
                end>
                <FaFileContract />
                <span>ይግባኝ </span>
            </NavLink>
            <NavLink to={'/admin-dashboard/fileTransfer'}
                className={({isActive}) => `${isActive ? "bg-slate-600" : "hover:bg-slate-600" } flex items-center space-x-4 block py-2.5 px-4 rounded `}
                end>
                <FaSyncAlt  />
                <span>ፋይል ዝውውር</span>
            </NavLink>
            <NavLink to={'/admin-dashboard/report'}
                className={({isActive}) => `${isActive ? "bg-slate-600" : "hover:bg-slate-600" } flex items-center space-x-4 block py-2.5 px-4 rounded `}
                end>
                <RiContactsBook3Fill  />
                <span>ሪፖርት</span>
            </NavLink>
            <NavLink to={'/admin-dashboard/settings'}
                className={({isActive}) => `${isActive ? "bg-slate-600" : "hover:bg-slate-600" } flex items-center space-x-4 block py-2.5 px-4 rounded `}
                end>
                <FaCogs />
                <span>ቅንብሮች</span>
            </NavLink>
        </div>
    </div>
  )
}

export default AdminSidebar