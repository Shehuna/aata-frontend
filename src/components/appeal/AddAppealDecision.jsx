import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { convertToEthiopian } from '../../utils/ethiopianDateConverter'

const AddAppealDecision = () => {
    const {id} = useParams() 
  const navigate = useNavigate()

  const [formData, setFormData] = useState({})
  const handleChange = (e) => {
      const {name, value, files} = e.target
      if(name === 'decisionFile'){
        setFormData((prevData) => ({...prevData, [name]: files[0] }))
      }else{
        setFormData((prevData) => ({...prevData, [name]: value }))
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formDataObj = new FormData()
     const defaults = {
      appeal: id
    };

     Object.entries(defaults).forEach(([key, value]) => {
      if (!formDataObj.has(key)) {
        formDataObj.append(key, value);
      }
      // For existing but empty fields
      else if (!formDataObj.get(key) && formDataObj.get(key) !== '0') {
        formDataObj.set(key, value);
      }
    });
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key])
    })
    try {
            const response = await axios.post('https://aata-api.vercel.app/api/decision/add', formDataObj, {
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
    <div className='p-6 bg-white m-8 rounded-xl'>
        <h4 className='font-semibold text-sm text-gray-500'>የይግባኝ ውሳኔ</h4>
        <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-4 mb-4'/>
        <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label 
                        htmlFor="appealFile"
                        className='text-xs font-medium text-gray-500
                        '>
                        ውሳኔ*
                        </label>
                      <input 
                        type="file" 
                        name='decisionFile'
                        onChange={handleChange}
                        placeholder='upload Image' 
                        accept='pdf/*'
                        className='mt-1 w-full p-2  text-ሰመ text-gray-700 border border-gray-300 focus:border-blue-200 rounded-md'
                        required/>
                        <p className='text-gray-700 text-xs mt-2'>ፒ.ዲኤ.ፍ ፋይል 2ሜ.ባ *</p>
                  </div>
                <div >
                    
                    <label 
                        htmlFor="finalDecisionDate"
                        className='text-xs font-medium text-gray-500
                        '>
                        ውሳኔ የተሰጠበት ቀን*
                        </label>
                    <input 
                        type="text"  
                        name='finalDecisionDate'
                        onChange={handleChange}                 
                        className='mt-1 w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                </div>
                
                </div>
              
                <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-4">

                  <div>
                      <label 
                          htmlFor="judgeComment"
                          className='block text-xs text-gray-500'
                          >
                          አስተያየት
                          </label>
                      <textarea 
                          placeholder='አስተያየትዎን እዚህ ያስፍሩ ....'
                          name='judgeComment'
                          onChange={handleChange} 
                           
                          className='mt-1 text-xs w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                          rows="4"></textarea>
                  </div> 
                
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 mt-2 gap-4'>
                </div>
                <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-6 mb-4'/>
                <div className='flex justify-between'>
                    <div>
                        <p className='text-sm font-medium text-gray-500'>*አስፈላጊ </p>
                    </div>
                    <div>
                        <button type='button' className='mt-2 text-md bg-gray border 
                        border-green-200 text-gray-700 py-1 px-8 rounded-full 
                        hover:bg-gray-100 mr-2' onClick={()=>navigate('/admin-dashboard/appealList')}>ሰርዝ</button>
                        <button
                        className='mt-2 text-md bg-green-600 hover:bg-green-500
                        text-white py-1 px-8 rounded-full'>አስቀምጥ</button>
                    </div>
                </div>
            </form>
    </div>
  )
}

export default AddAppealDecision