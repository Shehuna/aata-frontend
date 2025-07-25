import React from 'react'
import { Link } from 'react-router-dom'

const TransferNavbar = () => {
  return (
    <div className='w-full sticky top-12 shadow-sm  py-1'>
        <div className="inline-flex">
            <Link to={'/admin-dashboard/fileTransfer/handover'} className='w-48 rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-200 text-center'>ፋይል ማስረከቢያ</Link>
            <Link to={'/admin-dashboard/fileTransfer/recieve'} className='w-48 rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-200 text-center'>ፋይል መረከቢያ</Link>
            
        </div>
     </div>
  )
}

export default TransferNavbar