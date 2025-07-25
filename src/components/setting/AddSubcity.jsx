import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AddSubcity = () => {
    const {id} = useParams()
    const [subcity, setSubcity] = useState({
        subcityCode: '',
        description: ''
    })
    
    const [isUpdate, setIsUpdate] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) =>{
        const {name, value} = e.target
        setSubcity({...subcity, [name] : value})
    }

    useEffect(()=>{
        const fetchSubcity = async () =>{
          try {
            const response = await axios.get(`https://aata-api.vercel.app/api/subcity/${id}`, {
              headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
              }
            })
            if(response.data.success){
              setSubcity(response.data.subcity)
              setIsUpdate(!isUpdate)
            }
          } catch (error) {
            if(error.response && !error.response.data.success){
                    alert(error.response.data.error)
                }
          }
        }
        fetchSubcity()
      }, [])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(!isUpdate){
            try {
            const response = await axios.post('https://aata-api.vercel.app/api/subcity/add', subcity, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success){
                navigate('/admin-dashboard/settings/subcityList')
            }
        } catch (error) {
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
      }else{
         try {
            const response = await axios.put(`https://aata-api.vercel.app/api/subcity/${id}`, subcity, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success){
                navigate('/admin-dashboard/settings/subcityList')
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
        <h4 className='font-semibold text-sm text-gray-500'>የክፍለ ከተማ መጨመሪያ</h4>
        <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-4 mb-4'/>
        <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div >
                    <label 
                        htmlFor="subcityCode"
                        className='text-xs font-medium text-gray-500
                        '>
                        ክፍለ ከተማ ኮድ*
                        </label>
                    <input 
                        type="text"  
                        name='subcityCode'
                        onChange={handleChange}   
                        value={subcity.subcityCode}                  
                        className='mt-1 w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                </div>
                <div>
                    <label 
                        htmlFor="description"
                        className='text-xs font-medium text-gray-500
                        '>
                        ክፍለ ከተማ*
                        </label>
                    <input 
                        type="text"
                        name='description' 
                        onChange={handleChange}  
                        value={subcity.description}
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
                        hover:bg-gray-100 mr-2' onClick={()=>navigate('/admin-dashboard/settings/subcityList')}>ሰርዝ</button>
                        <button
                        className='mt-2 text-md bg-green-600 hover:bg-green-500
                        text-white py-1 px-8 rounded-full'>{isUpdate ? 'አዘምን': 'ጨምር'}</button>
                    </div>
                </div>
            </form>
    </div>
  )
}

export default AddSubcity