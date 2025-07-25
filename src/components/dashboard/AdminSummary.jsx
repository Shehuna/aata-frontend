import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AdminSummary = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [filteredAppeals, setFilteredAppeals] = useState([])
  const [filteredAppointments, setFilteredAppointments] = useState([])
  const [teamLeaderComment, setTeamLeaderComment] = useState(false)
  useEffect(()=>{
    const fetchAppointments = async () =>{
      setIsLoading(true)
      try {
        const response = await axios.get("http://localhost:3000/api/appointment", {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          console.log(response.data.appeals)
          const data = response.data.appointments
          const searchResult = await data.filter((dat)=>{
             return dat.nextAppointmentDate === '12/11/2017' 
          })
          setFilteredAppointments(searchResult)
          setTeamLeaderComment(true)
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
      }finally{
        setIsLoading(false)
      }
    }
    fetchAppointments()
  }, [])

  useEffect(()=>{
    const fetchAppeals = async () =>{
      setIsLoading(true)
      try {
        const response = await axios.get("https://aata-api.vercel.app/api/appeal", {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          console.log(response.data.appeals)
          const data = response.data.appeals
          const searchResult = await data.filter((dat)=>{
             return dat.teamLeaderComment !== '' && dat.appealStatus === 'returned'
          })
          setFilteredAppeals(searchResult)
          setTeamLeaderComment(true)
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
      }finally{
        setIsLoading(false)
      }
    }
    fetchAppeals()
  }, [])
  return (
    <div className='flex m-12'>
      <div className='w-64 mr-4 text-gray-600 py-2  px-4 bg-white rounded-lg h-64'>
        <p className='text-center'>የይግባኝ ማስተካከያ አስተያየት</p>
        <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-2 mb-4'/>
        {!teamLeaderComment && (
          <p className='text-sm text-slate-600 mb-2'>ምንም አስተያየት የለም.....</p>
        )}
        {filteredAppeals.map((appeal) => (
           <div>
            <p className='text-sm text-slate-600 mb-2'>የፋይል ቁጥር፡- {appeal.fileNo}</p>
            <p className='text-sm text-slate-600'>{appeal.teamLeaderComment}</p>
            </div>
           
          ))}
      </div>
      <div className='w-64 text-gray-600 py-2 mr-4 px-4 bg-white rounded-lg'>
        <p className='text-center'>ለዛሬ የተቀጠሩ ፋይሎች</p>
        <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-2 mb-4'/>
        <Link to={'/admin-dashboard/report/orderFollowUp'}><p>ለዛሬ የተቀጠሩ መዝገቦች {filteredAppointments.length}</p></Link> 
      </div>
      <div className='w-64 text-gray-600 py-2 bg-white px-4  rounded-lg'>
        <p  className='text-center'>ሌሎች አስተያየቶች </p>
        <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-2 mb-4'/>
        
      </div>
    </div>
    
    
  )
}

export default AdminSummary