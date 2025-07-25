import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { convertToEthiopian } from '../../utils/ethiopianDateConverter'
import { fetchUsers } from '../../utils/SubcityFetcher'


const SetAppointment = () => {
  const {id} = useParams()
  const [users, setUsers] = useState([])
  const [appeal, setAppeal] = useState(id)
  const [user, setUser] = useState('')
  const [appointmentNo, setAppointmentNo] = useState('')
  const [nextAppointmentDate, setNextAppointmentDate] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')
  const [reason, setReason] = useState('')
  const [comment, setComment] = useState('')

  const today = new Date()
  const ethiopianDate = convertToEthiopian(today);
  const openDate =  ethiopianDate.day + '/' + ethiopianDate.month + '/' + ethiopianDate.year


  useEffect(()=>{
        const getUsers = async () => {
            const users = await fetchUsers()
            setUsers(users)
        }
        getUsers()
      }, [])
  
  //const [isUpdate, setIsUpdate] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) =>{
      const {name, value} = e.target
      setFormData((prevData) => ({...prevData, [name]: value }))
  }

  const handleSubmit = async (e) =>{
      e.preventDefault()
      
      try {
      const response = await axios.post('https://aata-api.vercel.app/api/appointment/add', {
            appeal,
            user,
            appointmentNo,
            appointmentSetDate: openDate,
            nextAppointmentDate,
            appointmentTime,
            reason,
            comment
      }, {
          headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
      })
      if(response.data.success){
          navigate(`/admin-dashboard/appointments/${id}`)
      }
      } catch (error) {
          if(error.response && !error.response.data.success){
              alert(error.response.data.error)
          }
      }  
  }

  return (
     <div className='p-6 bg-white m-8 rounded-xl'>
        <h4 className='font-semibold text-sm text-gray-500'>የቀጠሮ ቀን መጨመሪያ</h4>
        <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-4 mb-4'/>
        <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div >
                    <label 
                        htmlFor="appointmentNo"
                        className='text-xs font-medium text-gray-500
                        '>
                        የቀጠሮ ቁጥር*
                        </label>
                    <input 
                        type="text"  
                        name='appointmentNo'
                        onChange={(e)=>setAppointmentNo(e.target.value)} 
                        value={appointmentNo}                   
                        className='mt-1 w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                </div>
                <div >
                    <label 
                        htmlFor="appointmentSetDate"
                        className='text-xs font-medium text-gray-500
                        '>
                        ቀጠሮ የተሰጠበት ቀን*
                        </label>
                    <input 
                        type="text"  
                        name='appointmentSetDate'
                        disabled
                        onChange={(e)=>setAppointmentSetDate(e.target.value)} 
                        value={openDate}                   
                        className='mt-1 w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                </div>
                                
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
                    <div >
                        <label 
                        htmlFor="nextAppointmentDate"
                        className='text-xs font-medium text-gray-500
                        '>
                        የቀጣይ ቀጠሮ ቀን*
                        </label>
                        <input 
                        type="text"  
                        name='nextAppointmentDate'
                        onChange={(e)=>setNextAppointmentDate(e.target.value)} 
                        value={nextAppointmentDate}                    
                        className='mt-1 w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                    </div>
                  <div>
                    <label 
                        htmlFor="appointmentTime"
                        className='text-xs font-medium text-gray-500
                        '>
                        የቀጠሮ ሰዓት*
                        </label>
                    <input 
                        type="text"
                        name='appointmentTime' 
                        onChange={(e)=>setAppointmentTime(e.target.value)} 
                        value={appointmentTime} 
                        className='mt-1 w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                </div>
                
                   
                </div>
                <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-4">
                    <div >
                    <label 
                        htmlFor="reason"
                        className='text-xs text-gray-500 mt-2 mb-3'>
                        የቀጠሮ ምክንያት*
                        </label>
                        <input 
                        type="text"
                        name='reason' 
                        onChange={(e)=>setReason(e.target.value)} 
                        value={reason}  
                        className='mt-1 w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                    </div>
                <div >
                    <label 
                        htmlFor="user"
                        className='text-xs text-gray-500 mt-2 mb-3'>
                        የተመራለት*
                        </label>
                        <select  
                        name='user'
                        onChange={(e)=>setUser(e.target.value)} 
                        value={user}    
                        className='mt-1 text-sm w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required>
                            <option className='text-gray-500 text-xs' value="">---ምረጥ---</option>
                            {users.map((user)=>(
                                <option key={user._id} className='text-gray-500 text-xs' value={user._id}>{user.fullName}</option>
                            ))} 
                        </select>
                    </div>
                <div>
                      <label 
                          htmlFor="comment"
                          className='block text-xs text-gray-500'
                          >
                          ተጨማሪ አስተያየት
                          </label>
                      <textarea 
                          placeholder='አስተያየትዎን እዚህ ያስፍሩ ....'
                          name='comment'
                          onChange={(e)=>setComment(e.target.value)} 
                          value={comment} 
                          className='mt-1 text-xs w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                          rows="3"></textarea>
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
                        hover:bg-gray-100 mr-2' onClick={()=>navigate(`/admin-dashboard/appointments/${id}`)}>ሰርዝ</button>
                        <button
                        className='mt-2 text-md bg-green-600 hover:bg-green-500
                        text-white py-1 px-8 rounded-full'>አስቀምጥ</button>
                    </div>
                </div>
            </form>
    </div>
  )
}

export default SetAppointment