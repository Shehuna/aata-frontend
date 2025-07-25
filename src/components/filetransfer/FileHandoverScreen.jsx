import React, { useEffect, useState } from 'react'
import Loader from '../../utils/Loader'
import { convertToEthiopian } from '../../utils/ethiopianDateConverter'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const FileHandoverScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [filteredAppointments, setFilteredAppointments] = useState([])

  const [handoverFiles, setHandoverFiles] = useState([])
  const [handoverDate, setHandoverDate] = useState('')
  const [giver, setGiver] = useState('')
  const [receiver, setReceiver] = useState('')
  const [selected, setSelected] = useState([])

  const navigate = useNavigate()

  const toggleSelect = (id) =>{
    console.log(id)
    if(!selected.includes(id) && !handoverFiles.includes(id)){
      setHandoverFiles([...handoverFiles, {appeal: id, fileStatus: 'out'}])
    }
    if(selected.includes(id) && handoverFiles.filter(handoverFile => handoverFile.appeal === id)){
      setHandoverFiles(handoverFiles.filter(handoverFile =>handoverFile.appeal !== id))
    }
    
    setSelected(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
    
  }

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

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
            const response = await axios.post('https://aata-api.vercel.app/api/handover/add', 
              {
                handoverFiles, 
                handoverDate: openDate, 
                giver, 
                receiver,
              }, 
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success){
              let id = await response.data.handoverFileId
              navigate(`/admin-dashboard/fileTransfer/handoverToPrint/${id}`)
            }
        } catch (error) {
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        } 
    }
  return (
    <>
        {isLoading ? <Loader isLoading={isLoading}/> : <div className='bg-white p-6 jutify-center items-center'>
            <p className='text-gray-700 text-መደ text-center '>ፕ/ጽ/ቤት የገቡ መዝገቦች ማስረከቢያ</p>
            <form onSubmit={handleSubmit}>
              <table className='shadow-md border-2 border-slate-200 w-full mt-4'>
              <thead className='text-white text-align-start'>
                <tr>
                  <th className='py-2 px-1 bg-slate-800 text-sm'>የይግባኝ ባይ ስም</th>
                  <th className='py-2 px-1 bg-slate-800 text-sm'>የማህደር ቁጥር</th>
                  <th className='py-2 px-1 bg-slate-800 text-sm'>መልስ ሰጪ መስሪያ ቤት</th>
                  <th className='py-2 px-1 bg-slate-800 text-sm'>የተቀጠረበት ቀን</th>
                  <th className='py-2 px-1 bg-slate-800 text-sm'>ሰዓት</th>
                  <th className='py-2 px-1 bg-slate-800 text-sm'>የተቀጠረበት ምክንያት</th>
                  <th className='py-2 px-1 bg-slate-800 text-sm'>ወጥቷል?</th>
                </tr>
              </thead>
              <tbody className='bg-cyan-900 '>

                {filteredAppointments.map((apps) => (
                    <tr key={apps._id} className='bg-white jutify-center hover:bg-gray-200 items-center cursor-pointer duration-300 border-b border-slate-400'>
                      <td className='py-1.5 px-1 text-xs text-center'>{apps.appeal.appealer.fullName} </td>
                      <td className='py-1.5 px-1 text-xs text-center'>{apps.appeal.fileNo} </td>
                      <td className='py-1.5 px-1 text-xs text-center'>{apps.appeal.respondent.fullName} </td>
                      <td className='py-1.5 px-1 text-xs text-center'>{apps.nextAppointmentDate} </td>
                      <td className='py-1.5 px-1 text-xs text-center'>{apps.appointmentTime} </td>
                      <td className='py-1.5 px-1 text-xs text-center'>{apps.reason} </td>
                      <td className='py-1.5 px-1 text-xs text-center'>
                        <input 
                        type="checkbox"      
                        checked={selected.includes(apps._id)}
                        onChange={() => toggleSelect(apps._id)}    
                        className='ml-2 text-sm p-2 text-gray-700 border border-gray-300
                        focus:border-blue-200 rounded-md'
                        /></td>
                    </tr>
                ))}
               

              </tbody>
            </table>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div >
                    <label 
                        htmlFor="giver"
                        className='text-xs font-medium text-gray-500
                        '>
                        አስረካቢ*
                        </label>
                    <input 
                        type="text"  
                        name='giver'
                        onChange={(e)=>setGiver(e.target.value)}    
                        value={giver}       
                        className='mt-1 w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                </div>
                <div>
                    <label 
                    htmlFor="handoverDate"
                    className='text-xs font-medium text-gray-500
                    '>
                    ተረካቢ*
                    </label>
                    <input 
                    type="text"
                    name='receiver'
                    onChange={(e)=>setReceiver(e.target.value)}    
                    value={receiver}  
                    className='mt-1 w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                    required/>
                </div>
                <div>
                    <label 
                    htmlFor="handoverDate"
                    className='text-xs font-medium text-gray-500
                    '>
                    ቀን*
                    </label>
                    <input 
                    type="text"
                    name='handoverDate' 
                    disabled
                    value={openDate}
                    className='mt-1 w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                    required/>
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
                        hover:bg-gray-100 mr-2' >ሰርዝ</button>
                        <button
                        className='mt-2 text-md bg-green-600 hover:bg-green-500
                        text-white py-1 px-8 rounded-full'> ጨምር</button>
                    </div>
                </div>
            </form>
            
        </div>}

    </>
  )
}

export default FileHandoverScreen