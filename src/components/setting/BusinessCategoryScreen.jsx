import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import {FaTrash,FaPencilAlt} from 'react-icons/fa'
import Loader from '../../utils/Loader';

const BusinessCategoryScreen = () => {
  const [categories, setCategories] = useState([])
  const [filteredCategories, setFilteredCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()

  const onCategoryDelete = async (id) => {
    const data = categories.filter(category => category._id !== id)
    setCategories(data)
    setFilteredCategories(data)
  }

  const hadleDelete = async (id) => {
      try {
        const response = await axios.delete(`http://localhost:3000/api/category/${id}`, {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          onCategoryDelete(id)
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
    const fetchCategories = async () =>{
      setIsLoading(true)
      try {
        const response = await axios.get("http://localhost:3000/api/category", {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          console.log(response.data.categories)
          let sno = 1
          const data = await response.data.categories.map((category)=>(
            {
              _id: category._id,
              sno: sno++,
              catCode: category.catCode,
              description: category.description
            }
          ))
          setCategories(data)
          setFilteredCategories(data)
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
      }finally{
        setIsLoading(false)
      }
    }
    fetchCategories()
  }, [])

  const filterCategory = (e) => {
    const records = categories.filter((category) => 
    category.description.includes(e.target.value))
    setFilteredCategories(records)
  }
  return (
    <div className='p-6 bg-white m-8 rounded-xl'>
      <div className='flex justify-between items-center '>
        <div><p className='font-semibold text-sm text-gray-600'>የንግድ ዘርፍ ዝርዝር</p></div>
        <input 
          type="text"
          placeholder='በንግድ ዘርፍ ይፈልጉ ....'
          className='px-8 py-2 text-xs text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-full'
          onChange={filterCategory} />
        <button onClick={()=> setIsOpen(!isOpen)} className='p-0.5 bg-gray-200 rounded-full'>{isOpen ? <IoMdArrowDropup size={20}/> : <IoMdArrowDropdown size={20}/>}</button>
      </div>
      <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-4 mb-4'/>
      {isOpen && (
         <>
          <div>
              <button type='button' onClick={()=>navigate('/admin-dashboard/settings/saveBusinessCategory')} 
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
                <p className='text-gray-700 text-sm w-32'>የንግድ ዘርፍ ኮድ</p>
                <p className='text-gray-700 text-sm w-32'>የንግድ ዘርፍ</p>
                <p className='text-gray-700 text-sm w-32'>ድርጊት</p>
              </div> 
              {filteredCategories.map((cat)=>(
                    
                    <div key={cat._id}  className='px-3 py-2 mt-2 bg-white rounded-xl 
                    flex justify-between items-center hover:bg-gray-100'>
                        <p className='text-gray-700 text-sm w-32'>{cat.sno}</p>
                        <p className='text-gray-700 text-sm w-32'>{cat.catCode}</p>
                        <p className='text-gray-700 text-sm w-32'>{cat.description}</p>
                        <div className='flex w-32'>
                          <FaPencilAlt onClick={()=>navigate(`/admin-dashboard/settings/saveBusinessCategory/${cat._id}`)} className='text-gray-700 mr-2 cursor-pointer' color='#6B7280' size={16}/>
                          <FaTrash onClick={()=>hadleDelete(cat._id)} className='text-gray-700 cursor-pointer' color='#6B7280' size={16}/>
                        </div>
                      </div>
                ))} 
                
          </div> }
          
        </>
      
    </div>
  )
}

export default BusinessCategoryScreen