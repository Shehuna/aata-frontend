import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import {FaTrash,FaPencilAlt} from 'react-icons/fa'
import Loader from '../../utils/Loader';

const SubcityScreen = () => {
  const [subcities, setSubcities] = useState([])
  const [filteredSubcities, setFilteredSubcities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()

  const onSubcityDelete = async (id) => {
    const data = subcities.filter(subcity => subcity._id !== id)
    setSubcities(data)
    setFilteredSubcities(data)
  }

  const hadleDelete = async (id) => {
      try {
        const response = await axios.delete(`http://localhost:3000/api/subcity/${id}`, {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          onSubcityDelete(id)
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
      }finally{
        setIsLoading(false)
      }
  }

  useEffect(()=>{
    const fetchSubcities = async () =>{
      setIsLoading(true)
      try {
        const response = await axios.get("http://localhost:3000/api/subcity", {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          console.log(response.data.subcities)
          let sno = 1
          const data = await response.data.subcities.map((subcity)=>(
            {
              _id: subcity._id,
              sno: sno++,
              subcityCode: subcity.subcityCode,
              description: subcity.description
            }
          ))
          setSubcities(data)
          setFilteredSubcities(data)
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
      }finally{
        setIsLoading(false)
      }
    }
    fetchSubcities()
  }, [])

  const filterSubcity = (e) => {
    const records = subcities.filter((subcity) => 
    subcity.description.includes(e.target.value))
    setFilteredSubcities(records)
  }
  return (
    <div className='p-6 bg-white m-8 rounded-xl'>
      <div className='flex justify-between items-center '>
        <div><p className='font-semibold text-sm text-gray-600'>የንግድ ዘርፍ ዝርዝር</p></div>
        <input 
          type="text"
          placeholder='በክፍለ ከተማ ስም ይፈልጉ ....'
          className='px-8 py-2 text-xs text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-full'
          onChange={filterSubcity} />
        <button onClick={()=> setIsOpen(!isOpen)} className='p-0.5 bg-gray-200 rounded-full'>{isOpen ? <IoMdArrowDropup size={20}/> : <IoMdArrowDropdown size={20}/>}</button>
      </div>
      <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-4 mb-4'/>
      {isOpen && (
         <>
          <div>
              <button type='button' onClick={()=>navigate('/admin-dashboard/settings/saveSubcity')} 
              className='mt-6 text-sm bg-green-600 hover:bg-green-500
              text-white py-1 px-8 rounded-full'>አዲስ ጨምር</button>
          </div>
          <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-4 mb-4'/></>
         
          )}
           <>
          {isLoading ? <Loader isLoading={isLoading} /> : 
          <div className='bg-gray-200  px-6 py-2 mt-6'>
              <div className='px-3 py-1  rounded-xl flex justify-between items-left'>
                <p className='text-gray-700 text-sm w-32'>ተራ.ቁ.</p>
                <p className='text-gray-700 text-sm w-32'>የክፍለ ከተማ ኮድ</p>
                <p className='text-gray-700 text-sm w-32'>ክፍለ ከተማ</p>
                <p className='text-gray-700 text-sm w-32'>ድርጊት</p>
              </div> 
              {filteredSubcities.map((subcity)=>(
                    
                    <div key={subcity._id}  className='px-3 py-2 mt-2 bg-white rounded-xl 
                    flex justify-between items-center hover:bg-gray-100'>
                        <p className='text-gray-700 text-sm w-32'>{subcity.sno}</p>
                        <p className='text-gray-700 text-sm w-32'>{subcity.subcityCode}</p>
                        <p className='text-gray-700 text-sm w-32'>{subcity.description}</p>
                        <div className='flex w-32'>
                          <FaPencilAlt onClick={()=>navigate(`/admin-dashboard/settings/saveSubcity/${subcity._id}`)} className='text-gray-700 mr-2 cursor-pointer' color='#6B7280' size={16}/>
                          <FaTrash onClick={()=>hadleDelete(subcity._id)} className='text-gray-700 cursor-pointer' color='#6B7280' size={16}/>
                        </div>
                      </div>
                ))} 
                
          </div> }
          
        </>
      
    </div>
  )
}

export default SubcityScreen