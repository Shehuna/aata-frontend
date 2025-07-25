import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../../utils/Loader'
import { useParams } from 'react-router-dom'

const HandoverToPrint = () => {
    const {id} =useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [appealId, setAppealId] = useState('')
    const [handfile, setHandfile] = useState([])
    const [handovers, setHandovers] = useState({
        handoverDate: '',
        giver: '',
        receiver: '',
        handoverFiles: []
    })
   useEffect(() => {
        const getAppeals = async () => {
        const response = await axios.get(`http://localhost:3000/api/appointment/${appealId}`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
              }
        })
        if(response.data.success){
            const appeals = response.data.appointments
            console.log(appeals[0].appeal.appealer.fullName)
            setHandfile(appeals)
        }
    }
    getAppeals()
   },[])
    

    useEffect(()=>{
        const fetchAppointments = async () =>{
          setIsLoading(true)
          try {
            const response = await axios.get(`http://localhost:3000/api/handover/${id}`, {
              headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
              }
            })
        
            if(response.data.success){
                const file = response.data.handoverfile
                setHandovers(()=>({
                    handoverDate: file.handoverDate,
                    giver: file.giver,
                    receiver: file.receiver,
                    handoverFiles: file.handoverFiles
                }))
                handovers.handoverFiles.forEach((handed)=>{
                    console.log(handed)
                    setAppealId(handed.appeal)
                })
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
            <p className='text-gray-700 text-መደ text-center '>በ {handovers.handoverDate} ፕ/ጽ/ቤት የገቡ መዝገቦች </p>
            
              <table className='shadow-xs border-2 border-slate-200 w-full mt-4'>
              <thead className='text-white text-align-start'>
                <tr>
                  <th className='py-2 px-1 bg-slate-800 text-sm'>የይግባኝ ባይ ስም</th>
                  <th className='py-2 px-1 bg-slate-800 text-sm'>የማህደር ቁጥር</th>
                  <th className='py-2 px-1 bg-slate-800 text-sm'>መልስ ሰጪ መስሪያ ቤት</th>
                  <th className='py-2 px-1 bg-slate-800 text-sm'>የተቀጠረበት ቀን</th>
                  <th className='py-2 px-1 bg-slate-800 text-sm'>ሰዓት</th>
                  <th className='py-2 px-1 bg-slate-800 text-sm'>የተቀጠረበት ምክንያት</th>
                  
                </tr>
              </thead>
              <tbody className='bg-cyan-900 '>
                
                {handfile.map((hand) => (
                    <tr key={hand?._id} className='bg-white jutify-center hover:bg-gray-200 items-center cursor-pointer duration-300 border-b border-slate-400'>
                      <td className='py-1.5 px-1 text-xs text-center'>{hand?.appeal.appealer.fullName} </td>
                      <td className='py-1.5 px-1 text-xs text-center'>{hand?.appeal.fileNo} </td>
                      <td className='py-1.5 px-1 text-xs text-center'>{hand?.appeal.respondent.fullName} </td>
                      <td className='py-1.5 px-1 text-xs text-center'>{hand?.appointmentSetDate} </td>
                      <td className='py-1.5 px-1 text-xs text-center'>{hand?.appointmentTime} </td>
                      <td className='py-1.5 px-1 text-xs text-center'>{hand?.reason} </td>
                    </tr>
                ))} 
               

              </tbody>
            </table>
                <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-6 mb-4'/>
                <div className="flex justify-between justify-content items-center w-[50%]">
                    <div >
                        <p className='text-sm mb-3 '>አስረካቢ:- {handovers?.giver}</p>
                        <p className='text-sm mb-3'>ፊርማ .......................................</p>
                        <p className='text-sm mb-3'>ቀን:- {handovers?.handoverDate}</p>
                    </div>
                   <div>
                        <p className='text-sm mb-3'>አስረካቢ:- {handovers?.receiver}</p>
                        <p className='text-sm mb-3'>ፊርማ .......................................</p>
                        <p className='text-sm mb-3'>ቀን:- {handovers?.handoverDate}</p>
                    </div>

                </div>

        </div>}

    </>
  )
}

export default HandoverToPrint