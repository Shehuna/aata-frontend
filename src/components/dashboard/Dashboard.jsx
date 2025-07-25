import React from 'react'
import { useAuth } from '../../context/authContext'

const Dashboard = () => {
    const user =useAuth()
  return (
    <div className='flex justify-between items-center h-12'>
        <p> {user.userName}</p>
        <button>ውጣ</button>
    </div>
  )
}

export default Dashboard