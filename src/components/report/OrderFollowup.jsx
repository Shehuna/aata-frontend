import React, { useEffect, useState } from 'react'
import Loader from '../../utils/Loader'
import { convertToEthiopian } from '../../utils/ethiopianDateConverter'
import axios from 'axios'


const OrderFollowup = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [filteredAppointments, setFilteredAppointments] = useState([])

    const today = new Date()
    const ethiopianDate = convertToEthiopian(today);
    const openDate =  ethiopianDate.day + '/' + ethiopianDate.month + '/' + ethiopianDate.year

    useEffect(()=>{
    const fetchAppointments = async () =>{
      setIsLoading(true)
      try {
        const response = await axios.get("https://aata-api.vercel.app/api/appointment", {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
         
          const data = response.data.appointments
          const searchResult = await data.filter((dat)=>{
             return dat.nextAppointmentDate === '12/11/2017' 
          })
          setFilteredAppointments(searchResult)
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
  return (
    <>
        {isLoading ? <Loader isLoading={isLoading}/> : <div className='bg-white p-6 jutify-center items-center'>
            <p className='text-gray-700 text-sm text-center'>የትዕዛዝ መዝገብ መከታተያ </p>
            <p className='text-gray-700 text-sm text-center '>ቀን፡ {openDate}</p>
            <table className='shadow-md border-2 border-slate-200 w-full mt-4'>
              <thead className='text-white text-align-start'>
                <tr>
                  <th className='py-2 px-1 bg-slate-800 text-sm'>የይግባኝ ባይ ስም</th>
                  <th className='py-2 px-1 bg-slate-800 text-sm'>መዝገብ ቁጥር</th>
                  <th className='py-2 px-1 bg-slate-800 text-sm'>መልስ ሰጪ</th>
                  <th className='py-2 px-1 bg-slate-800 text-sm'>የችሎት ትዕዛዝ የተሰጠበት ቀን</th>
                  <th className='py-2 px-1 bg-slate-800 text-sm'>የቀጣይ ቀጠሮ ቀን</th>
                  <th className='py-2 px-1 bg-slate-800 text-sm'>ትዕዛዙን የተቀበለው ሠራተኛ</th>
                  
                </tr>
              </thead>
              <tbody className='bg-cyan-900 '>

                {filteredAppointments.map((apps) => (
                    <tr key={apps._id} className='bg-white jutify-center hover:bg-gray-200 items-center cursor-pointer duration-300 border-b border-slate-400'>
                      <td className='py-1.5 px-1 text-xs text-center'>{apps.appeal.appealer.fullName} </td>
                      <td className='py-1.5 px-1 text-xs text-center'>{apps.appeal['fileNo']} </td>
                      <td className='py-1.5 px-1 text-xs text-center'>{apps.appeal.respondent.fullName} </td>
                      <td className='py-1.5 px-1 text-xs text-center'>{apps.appointmentSetDate} </td>
                      <td className='py-1.5 px-1 text-xs text-center'>{apps.nextAppointmentDate} </td>
                      <td className='py-1.5 px-1 text-xs text-center'>{apps.user.fullName} </td>
                    </tr>
                ))}
               

              </tbody>
            </table>
        </div>}
    </>
    
  )
}

export default OrderFollowup