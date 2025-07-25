import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchSubcities } from '../../utils/SubcityFetcher'

const AddRespondentScreen = () => {
    const {id} = useParams()
    const [respondent, setRespondent] = useState({
        fullName: '',
        city: 'Addis Ababa',
        subcity: '',
        wereda: '',
        houseNo: '',
    })

    const [subcities, setSubcities] = useState([])
    
    const [isUpdate, setIsUpdate] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) =>{
        const {name, value} = e.target
        setRespondent({...respondent, [name] : value})
    }

    useEffect(()=>{
        const getSubcities = async () => {
            const subcities = await fetchSubcities()
            setSubcities(subcities)
        }
        getSubcities()
  }, [])

    useEffect(()=>{
        const fetchRespondent = async () =>{
          try {
            const response = await axios.get(`https://aata-api.vercel.app/api/respondent/${id}`, {
              headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
              }
            })
            if(response.data.success){
              setRespondent(response.data.respondent)
              setIsUpdate(!isUpdate)
            }
          } catch (error) {
            if(error.response && !error.response.data.success){
                    alert(error.response.data.error)
                }
          }
        }
        fetchRespondent()
      }, [])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(!isUpdate){
            try {
            const response = await axios.post('https://aata-api.vercel.app/api/respondent/add', respondent, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success){
                navigate('/admin-dashboard/settings/respondentList')
            }
        } catch (error) {
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
      }else{
         try {
            const response = await axios.put(`https://aata-api.vercel.app/api/respondent/${id}`, respondent, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success){
                navigate('/admin-dashboard/settings/respondentList')
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
        <h4 className='font-semibold text-sm text-gray-500'>የመልስ ሰጪ መጨመሪያ</h4>
        <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-4 mb-4'/>
        <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div >
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
                        value={respondent.fullName}                  
                        className='mt-1 w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                </div>
                <div>
                    <label 
                        htmlFor="city"
                        className='text-xs font-medium text-gray-500
                        '>
                        ከተማ*
                        </label>
                    <input 
                        type="text"
                        name='city' 
                        disabled
                        onChange={handleChange}  
                        value={respondent.city}
                        className='mt-1 w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div >
                    <label 
                        htmlFor="subcity"
                        className='text-sm text-gray-500 mt-2 mb-3'>
                        ክፍለ ከተማ*
                        </label>
                        <select  
                        name='subcity'
                        onChange={handleChange}   
                        value={respondent.subcity}
                        className='mt-2 text-sm w-full p-2 text-gray-600 border border-gray-300 focus:border-blue-200 rounded-md'
                        required>
                            <option className='text-gray-500 text-xs' value="">---ምረጥ---</option>
                            {subcities.map((subcity)=>(
                                <option key={subcity._id} className='text-gray-500 text-xs' value={subcity._id}>{subcity.description}</option>
                            ))}
                        </select>
                    </div>
                <div>
                    <label 
                        htmlFor="wereda"
                        className='text-xs font-medium text-gray-500
                        '>
                        ወረዳ*
                        </label>
                    <input 
                        type="number"
                        name='wereda' 
                        onChange={handleChange}  
                        value={respondent.wereda}
                        className='mt-1 w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div >
                    <label 
                        htmlFor="houseNo"
                        className='text-xs font-medium text-gray-500
                        '>
                        የቤት ቁጥር*
                        </label>
                    <input 
                        type="text"  
                        name='houseNo'
                        onChange={handleChange}   
                        value={respondent.houseNo}                  
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
                        hover:bg-gray-100 mr-2' onClick={()=>navigate('/admin-dashboard/settings/respondentList')}>ሰርዝ</button>
                        <button
                        className='mt-2 text-md bg-green-600 hover:bg-green-500
                        text-white py-1 px-8 rounded-full'>{isUpdate ? 'አዘምን': 'ጨምር'}</button>
                    </div>
                </div>
            </form>
    </div>
  )
}

export default AddRespondentScreen