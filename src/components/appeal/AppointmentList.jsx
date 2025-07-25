import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate, useParams } from 'react-router-dom';
import {FaList,FaPencilAlt} from 'react-icons/fa'
import Loader from '../../utils/Loader';
import { MdCloudDownload } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import Modal from '../../utils/Modal';
import ViewAppeal from './ViewAppeal'

const AppointmentList = () => {
    const {id} = useParams()
    
    const [fileNumber, setFileNumber] = useState('')
    const [appealer, setAppealer] = useState('')
    const [appointments, setAppointments] = useState([])
    const [isOpen, setIsOpen] = useState(true)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
    const fetchAppeal = async () =>{
      try {
        const response = await axios.get(`http://localhost:3000/api/appeal/${id}`, {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
            const appeal = response.data.appeal
            setFileNumber(appeal.fileNo)
            setAppealer(appeal.appealer.fullName)
        }
          
      } catch (error) {
        if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
      }
    }
    fetchAppeal()
  }, [])

  useEffect(()=>{
    const fetchAppointments = async () =>{
      try {
        const response = await axios.get(`http://localhost:3000/api/appointment/${id}`, {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
            const data = response.data.appointments
            setAppointments(data)
        }
          
      } catch (error) {
        if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
      }
    }
    fetchAppointments()
  }, [])
  return (
    <div className='p-6 bg-white m-8 rounded-xl'>
      <div className='flex justify-between items-center '>
        <div><p className='font-semibold text-sm text-gray-600'>የቀጠሮ ዝርዝር</p></div>
        <button onClick={()=> setIsOpen(!isOpen)} className='p-0.5 bg-gray-200 rounded-full'>{isOpen ? <IoMdArrowDropup size={20}/> : <IoMdArrowDropdown size={20}/>}</button>
      </div>
      <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-4 mb-4'/>
      {isOpen && (
         <>
          <div className='flex justify-between items-center'>
            <div>
                <p className='text-sm text-gray-600 mb-2 font-underline'>የፋይል ቁጥር፡- {fileNumber}</p>
                <p className='text-sm text-gray-600'>ይግባኝ ባይ፡- {appealer}</p>
            </div>
            <div>
                <button type='button' className='mt-2 text-md bg-gray border 
                border-green-200 text-gray-700 py-1 px-8 rounded-full 
                hover:bg-gray-100 mr-2' onClick={()=>navigate('/admin-dashboard/appealList')}>ተመለስ</button>
                <button type='button' onClick={()=>navigate(`/admin-dashboard/setAppointment/${id}`)} 
                className='mt-6 text-sm bg-green-600 hover:bg-green-500
                text-white py-1 px-8 rounded-full'>አዲስ ቀጠሮ</button>
            </div>
              
          </div>
          <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-4 mb-4'/></>
          )}
           <>
          {isLoading ? <Loader isLoading={isLoading} /> : 
          <div className='bg-gray-200  px-6 py-2 mt-6'>
              <div className='px-3 py-1  rounded-xl flex justify-between items-left'>
                <p className='text-gray-700 text-sm w-24'>የቀጠሮ ተራ</p>
                <p className='text-gray-700 text-sm w-36'>ቀጠሮ የተሰጠበት ቀን</p>
                <p className='text-gray-700 text-sm w-32'>የቀጠሮ ቀን</p>
                <p className='text-gray-700 text-sm w-32'>የቀጠሮ ሰዓት</p>
                <p className='text-gray-700 text-sm w-32'>የቀጠሮ ምክንያት</p>               
                <p className='text-gray-700 text-sm w-32'>ድርጊት</p>
              </div> 
              {appointments.map((apps)=>(
                    <div key={apps._id}  className='px-3 py-2 mt-2 bg-white rounded-xl 
                    flex justify-between items-center hover:bg-gray-100'>
                        <p className='text-gray-700 text-sm w-24'>{apps.appointmentNo}</p>
                        <p className='text-gray-700 text-sm w-36'>{apps.appointmentSetDate}</p>
                        <p className='text-gray-700 text-sm w-32'>{apps.nextAppointmentDate}</p>
                        <p className='text-gray-700 text-sm w-32'>{apps.appointmentTime}</p>
                        <p className='text-gray-700 text-sm w-32'>{apps.reason}</p>
                        <div className='flex w-32'>
                          <FaPencilAlt onClick={()=>navigate(`/admin-dashboard/editAppointment?appointmentId=${apps._id}&appealId=${id}`)} className='text-gray-700 mr-2 cursor-pointer' color='#6B7280' size={16}/>
                          
                        </div>
                      </div>
                ))} 
                
          </div> }
          
        </>
      
    </div>
  )
}

export default AppointmentList