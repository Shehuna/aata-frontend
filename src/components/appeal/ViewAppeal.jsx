import React, { useEffect, useState } from 'react'
import { fetchAppealers, fetchCategory, fetchRespondent, fetchTaxTypes, fetchTaxYear } from '../../utils/SubcityFetcher'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { MdCloudDownload } from "react-icons/md";
import Loader from '../../utils/Loader'

const hyper = "http://localhost:3000/"
const ViewAppeal = () => {

  const {id} = useParams()
  const [updatedAppeal, setUpdatedAppeal] = useState({

  })
    const [appeal, setAppeal] = useState({
    appealer: '', 
    respondent: '', 
    taxyear: '', 
    taxtype: '', 
    category: '',
    courtName: '',
    fileOpeningDate: '',
    fileNo: '',
    appealStatus: '',
    finalDecisionDate: '',
    appealFilePath: '',
  })
 
  const navigate = useNavigate()

  const handleChange = (e) => {
      const {name, value} = e.target
      setUpdatedAppeal((prevData) => ({...prevData, [name]: value }))
  }

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
            setAppeal((prev) => ({...prev, 
                appealer: appeal.appealer.fullName,
                respondent: appeal.respondent.fullName, 
                taxyear: appeal.taxyear.description, 
                taxtype: appeal.taxtype.description, 
                category: appeal.category.description,
                courtName: appeal.courtName,
                fileOpeningDate: appeal.fileOpeningDate,
                fileNo: appeal.fileNo,
                appealStatus: appeal.appealStatus,
                finalDecisionDate: appeal.finalDecisionDate,
                appealFilePath: appeal.appealFilePath,
                teamLeaderComment: appeal.teamLeaderComment
            }))
            setUpdatedAppeal(appeal)
        }
          
      } catch (error) {
        if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
      }
    }
    fetchAppeal()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(updatedAppeal)

    try {
            const response = await axios.put(`http://localhost:3000/api/appeal/${id}`, updatedAppeal, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success){
                navigate('/admin-dashboard/appealList')
            }
        } catch (error) {
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        } 
  }
  return (
    <>
        {!appeal ? <div>Loading...</div>: <div className='p-6 bg-white m-8 rounded-xl'>
        <h4 className='font-semibold text-sm text-gray-500'>ይግባኝ ማረጋገጥ</h4>
        <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-4 mb-4'/>
        <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div >
                    <label 
                        htmlFor="courtName"
                        className='text-xs font-medium text-gray-500
                        '>
                        መዝገቡ የተቀጠረበት ችሎት
                        </label>
                    <input 
                        type="text"  
                        name='courtName'
                        disabled
                        value={appeal.courtName}                
                        className='mt-1 text-sm w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                </div>
                <div>
                    <label 
                        htmlFor="fileOpeningDate"
                        className='text-xs font-medium text-gray-500
                        '>
                        የይግባኝ ፋይል የተከፈተበት ቀን
                        </label>
                    <input 
                        type="text"
                        name='fileOpeningDate' 
                        disabled
                        value={appeal.fileOpeningDate}  
                        className='mt-1 text-sm w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label 
                        htmlFor="fileNo"
                        className='text-xs font-medium text-gray-500
                        '>
                        የመዝገብ ቁጥር
                        </label>
                    <input 
                        type="text"
                        name='fileNo'
                        disabled 
                        value={appeal.fileNo}  
                        className='mt-1 text-sm w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                </div>
                <div >
              <div >
                    <label 
                        htmlFor="appealer"
                        className='text-xs text-gray-500 mt-2 mb-3'>
                        ይግባኝ ባይ
                        </label>
                        <input 
                        type="text"  
                        name='appealer'
                        disabled  
                        value={appeal.appealer}                
                        className='mt-1 text-sm w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                        
                    </div>
                
              </div>
                
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-4">
                  <div >
                    <label 
                        htmlFor="respondent"
                        className='text-xs text-gray-500 mt-2 mb-3'>
                        መልስ ሰጪ
                        </label>
                        <input 
                        type="text"  
                        name='respondent'
                        disabled  
                        value={appeal.respondent}                
                        className='mt-1 text-sm w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                    </div>
                <div >
                    <label 
                        htmlFor="taxyear"
                        className='text-xs text-gray-500 mt-2 mb-3'>
                        የታክስ ዘመን
                        </label>
                        <input 
                        type="text"  
                        name='taxyear'
                        disabled 
                        value={appeal.taxyear}                 
                        className='mt-1 text-sm w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                    </div>
                
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-4">
                  <div >
                    <label 
                        htmlFor="taxtype"
                        className='text-xs text-gray-500 mt-2 mb-3'>
                        የታክስ ዓይነት
                        </label>
                        <input 
                        type="text"  
                        name='taxtype'
                        disabled 
                        value={appeal.taxtype}                 
                        className='mt-1 text-sm w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                    </div>
                <div >
                    <label 
                        htmlFor="category"
                        className='text-xs text-gray-500 mt-2 mb-3'>
                        የንግድ ዘርፍ
                        </label>
                        <input 
                        type="text"  
                        name='category'
                        disabled
                        value={appeal.category}                 
                        className='mt-1 text-sm w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                    </div>
                
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-4">
                  <div >
                    <label 
                        htmlFor="appealStatus"
                        className='text-xs text-gray-500 mt-2 mb-3'>
                        ያለበት ደረጃ
                        </label>
                        <select  
                        name='appealStatus'
                        onChange={handleChange}  
                        value={updatedAppeal.appealStatus}  
                        className='mt-1 text-sm w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required>
                            <option className='text-gray-500 text-xs' value="">---ምረጥ---</option>
                            <option className='text-gray-500 text-xs' value="new">አዲስ</option>
                            <option className='text-gray-500 text-xs' value="returned">እንዲስተካከል የተመለሰ</option>
                            <option className='text-gray-500 text-xs' value="directedForJudge">ለዳኞች የተመራ</option>
                            <option className='text-gray-500 text-xs' value="reply ">መልስ ላይ</option>
                            <option className='text-gray-500 text-xs' value="reReply">የመልስ መልስ ላይ</option>
                            <option className='text-gray-500 text-xs' value="hearing">ክርክር ላይ</option>
                            <option className='text-gray-500 text-xs' value="competed">ውሳኔ ያገኘ</option>
                        </select>
                    </div>
                 <div className='flex mt-8'>
                      <Link to={hyper+appeal.appealFilePath} target='blank'><MdCloudDownload size={28} className='mr-2 bg-gray-400 px-1 rounded-xl text-white'/></Link>
                      <p className='text-gray-700 text-sm  relative group'>
                           የይግባኝ ፋይል 
                      </p>
                        
                  </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-3'>
                 
                  <div>
                      <label 
                          htmlFor="teamLeaderComment"
                          className='block text-xs text-gray-500'
                          >
                          አስተያየት
                          </label>
                      <textarea 
                          placeholder='አስተያየትዎን እዚህ ያስፍሩ ....'
                          name='teamLeaderComment'
                          onChange={handleChange} 
                          value={updatedAppeal.teamLeaderComment} 
                          className='mt-1 text-xs w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                          rows="3"></textarea>
                  </div>  
                </div>
               
                <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-6 mb-4'/>
                <div className='flex justify-between'>
                    <div>
                        
                    </div>
                    <div>
                      <button type='button' className='mt-2 text-md bg-gray border 
                        border-green-200 text-gray-700 py-1 px-8 rounded-full 
                        hover:bg-gray-100 mr-2' onClick={()=>navigate('/admin-dashboard/appealList')}>ሰርዝ</button>
                        <button type='button' className='mt-2 text-md bg-slate-700 text-white py-1 px-8 rounded-full 
                        hover:bg-slate-600 mr-2' onClick={()=>navigate('/admin-dashboard/appealList')}>ይስተካከል</button>
                        <button
                        className='mt-2 text-md bg-green-600 hover:bg-green-500
                        text-white py-1 px-8 rounded-full'>አረጋግጥ</button>
                    </div>
                </div>
            </form>
    </div>}
    </>
    
  )
}

export default ViewAppeal