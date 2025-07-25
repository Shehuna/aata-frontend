import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AddUserScreen = () => {
    const {id} = useParams()
    const [user, setUser] = useState({
        userName: '',
        password: '',
        fullName: '',
        role: '',
    })

    const [isUpdate, setIsUpdate] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) =>{
        const {name, value} = e.target
        setUser({...user, [name] : value})
    }

    useEffect(()=>{
        const fetchUser = async () =>{
          try {
            const response = await axios.get(`http://localhost:3000/api/user/${id}`, {
              headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
              }
            })
            if(response.data.success){
              setUser(response.data.user)
              setIsUpdate(!isUpdate)
            }
          } catch (error) {
            if(error.response && !error.response.data.success){
                    alert(error.response.data.error)
                }
          }
        }
        fetchUser()
      }, [])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(!isUpdate){
            try {
            const response = await axios.post('http://localhost:3000/api/user/add', user, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success){
                navigate('/admin-dashboard/settings/userList')
            }
        } catch (error) {
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
      }else{
         try {
            const response = await axios.put(`http://localhost:3000/api/user/${id}`, user, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success){
                navigate('/admin-dashboard/settings/userList')
            }
        } catch (error) {
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
      }
        
    }
  return (
    <div className='p-6 bg-white m-8 rounded-xl'>
        <h4 className='font-semibold text-sm text-gray-500'>የተጠቃሚ መጨመሪያ</h4>
        <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-4 mb-4'/>
        <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div >
                    <label 
                        htmlFor="userName"
                        className='text-xs font-medium text-gray-500
                        '>
                        የተጠቃሚ ስም*
                        </label>
                    <input 
                        type="text"  
                        name='userName'
                        onChange={handleChange}   
                        value={user.userName}                  
                        className='mt-1 w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                </div>
                <div>
                    <label 
                        htmlFor="fullName"
                        className='text-xs font-medium text-gray-500
                        '>
                        ሙሉ ስም*
                        </label>
                    <input 
                        type="text"
                        name='fullName' 
                        onChange={handleChange}  
                        value={user.fullName}
                        className='mt-1 w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label 
                        htmlFor="password"
                        className='text-xs font-medium text-gray-500
                        '>
                        የይለፍ ቃል*
                        </label>
                    <input 
                        type="password"
                        name='password' 
                        onChange={handleChange}  
                        value={user.password}
                        className='mt-1 w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                </div>
                <div >
                    <label 
                        htmlFor="role"
                        className='text-sm text-gray-500 mt-2 mb-3'>
                        ኃላፊነት*
                        </label>
                        <select  
                        name='role'
                        onChange={handleChange}   
                        value={user.role}
                        className='mt-2 text-sm w-full p-2 text-gray-600 border border-gray-300 focus:border-blue-200 rounded-md'
                        required>
                            <option className='text-gray-500 text-xs' value="">---ምረጥ---</option>
                            <option className='text-gray-500 text-xs' value="admin">አድሚን</option>
                            <option className='text-gray-500 text-xs' value="registrar">ሬጅስትራር</option>
                            <option className='text-gray-500 text-xs' value="record">ሪከርድ</option>
                            <option className='text-gray-500 text-xs' value="judge">ዳኛ</option>
                            <option className='text-gray-500 text-xs' value="teamLeader">የቡድን መሪ</option>
                        </select>
                    </div>
               
                </div>
                
                <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-6 mb-4'/>
                <div className='flex justify-between'>
                    <div>
                        <p className='text-sm font-medium text-gray-500'>*አስፈላጊ </p>
                    </div>
                    <div>
                        <button type='button' className='mt-2 text-md bg-gray border 
                        border-green-200 text-gray-700 py-1 px-8 rounded-full 
                        hover:bg-gray-100 mr-2' onClick={()=>navigate('/admin-dashboard/settings/userList')}>ሰርዝ</button>
                        <button
                        className='mt-2 text-md bg-green-600 hover:bg-green-500
                        text-white py-1 px-8 rounded-full'>{isUpdate ? 'አዘምን': 'አስቀምጥ'}</button>
                    </div>
                </div>
            </form>
    </div>
  )
}

export default AddUserScreen