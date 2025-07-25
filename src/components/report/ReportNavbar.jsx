import React from 'react'
import { Link } from 'react-router-dom'

const ReportNavbar = () => {
  return (
     <div className='w-full sticky top-12 shadow-sm  py-1'>
        <div className="inline-flex">
            <Link to={'/admin-dashboard/report/orderFollowUp'} className='w-48 rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-200 text-center'>የትዕዛዝ መዝገብ መከታተያ</Link>
            <Link to={'/admin-dashboard/report/closedAppeals'} className='w-48 rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-200 text-center'>የተዘጉ ፋይሎች</Link>
            
        </div>
     </div>
  )
}

export default ReportNavbar