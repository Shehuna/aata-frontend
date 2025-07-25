import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import {FaTrash,FaPencilAlt} from 'react-icons/fa'
import Loader from '../../utils/Loader';

const UserList = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    const fetchUsers = async () =>{
      setIsLoading(true)
      try {
        const response = await axios.get("https://aata-api.vercel.app/api/user", {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          console.log(response.data.users)
          let sno = 1
          const data = await response.data.users.map((user)=>(
            {
              _id: user._id,
              sno: sno++,
              userName: user.userName,
              fullName: user.fullName,
              role: user.role,
            }
          ))
          setUsers(data)
          setFilteredUsers(data)
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
      }finally{
        setIsLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const filterUser = (e) => {
    const records = users.filter((user) => 
    user.userName.includes(e.target.value))
    setFilteredUsers(records)
  }
  return (
    <div className='p-6 bg-white m-8 rounded-xl'>
      <div className='flex justify-between items-center '>
        <div><p className='font-semibold text-sm text-gray-500'></p>የሲስተም ተጠቃሚዎች ዝርዝር</div>
        <input 
          type="text"
          placeholder='በተጠቃሚ ስም ይፈልጉ ....'
          className='px-8 py-2 text-xs text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-full'
          onChange={filterUser} />
        <button onClick={()=> setIsOpen(!isOpen)} className='p-0.5 bg-gray-200 rounded-full'>{isOpen ? <IoMdArrowDropup size={20}/> : <IoMdArrowDropdown size={20}/>}</button>
      </div>
      <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-4 mb-4'/>
      {isOpen && (
         <>
          <div>
              <button type='button' onClick={()=>navigate('/admin-dashboard/settings/saveUser')} 
              className='mt-6 text-sm bg-green-600 hover:bg-green-500
              text-white py-1 px-8 rounded-full'>አዲስ ጨምር</button>
          </div>
          <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-4 mb-4'/></>
         
          )}
           <>
          {isLoading ? <Loader isLoading={isLoading} /> : 
          <div className='bg-gray-200  px-6 py-2 mt-6'>
              <div className='px-3 py-1  rounded-xl flex justify-between items-left'>
                <p className='text-gray-700 text-sm w-16'>ተራ.ቁ.</p>
                <p className='text-gray-700 text-sm w-32'>የተጠቃሚ ስም</p>
                <p className='text-gray-700 text-sm w-48'>ሙሉ ስም</p>
                <p className='text-gray-700 text-sm w-32'>ኃላፊነት</p>
                <p className='text-gray-700 text-sm w-32'>ድርጊት</p>
              </div> 
              {filteredUsers.map((user)=>(
                    
                    <div key={user._id}  className='px-3 py-2 mt-2 bg-white rounded-xl 
                    flex justify-between items-center hover:bg-gray-100'>
                        <p className='text-gray-700 text-sm w-16'>{user.sno}</p>
                        <p className='text-gray-700 text-sm w-32'>{user.userName}</p>
                        <p className='text-gray-700 text-sm w-48'>{user.fullName}</p>
                        <p className='text-gray-700 text-sm w-32'>{user.role}</p>
                        <div className='flex w-32'>
                          <FaPencilAlt onClick={()=>navigate(`/admin-dashboard/settings/saveUser/${user._id}`)} className='text-gray-700 mr-2 cursor-pointer' color='#6B7280' size={16}/>
                          <FaTrash  className='text-gray-700 cursor-pointer' color='#6B7280' size={16}/>
                        </div>
                      </div>
                ))} 
                
          </div> }
          
        </>
      
    </div>
  )
}

export default UserList