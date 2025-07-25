import React from 'react'
import { Link } from 'react-router-dom'

const SettingNavbar = () => {
  return (
     <div className='w-full sticky top-12 shadow-xs  py-1'>
        <div className="inline-flex">
            <Link to={'/admin-dashboard/settings/taxYearList'} className='w-28 rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-200 text-center'>የግብር ዘመን</Link>
            <Link to={'/admin-dashboard/settings/taxTypeList'} className='w-28 rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-200 text-center'>የግብር ዓይነት</Link>
            <Link to={'/admin-dashboard/settings/categoryList'} className='w-28 rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-200 text-center'>የንግድ ዘርፍ</Link>
            <Link to={'/admin-dashboard/settings/respondentList'}  className='w-28 rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-200 text-center'>መልስ ሰጪ</Link>
            <Link to={'/admin-dashboard/settings/subcityList' } className='w-28 rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-200 text-center'>ክፍለ ከተማ</Link>
            <Link to={'/admin-dashboard/settings/userList' } className='w-28 rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-200 text-center'>ተጠቃሚዎች</Link>
        </div>
     </div>
  )
}

export default SettingNavbar