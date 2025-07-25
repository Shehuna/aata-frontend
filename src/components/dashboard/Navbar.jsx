import React from 'react'
import { useAuth } from '../../context/authContext'
import {FaSignOutAlt, FaPowerOff} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const {user} =useAuth()
  const {logout} = useAuth()
  const navigate = useNavigate()

  const exitSite = () =>{
    logout()
    navigate('/')
  }

   return (
     <div className='flex sticky top-0 z-50 bg-white justify-between shadow-md h-12 items-center px-12'>
         <p>  {user.userName}</p>
         <button onClick={()=>exitSite()} className='bg-gray-100 px-4 py-1 rounded-xl hover:bg-gray-200 cursor-pointer'><FaPowerOff className='text-gray-500 ' size={18} /></button>
     </div>
   )
}

export default Navbar