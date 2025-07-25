import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import {FaTrash,FaPencilAlt} from 'react-icons/fa'
import Loader from '../../utils/Loader';

const TaxyearScreen = () => {
  const [taxyears, setTaxyears] = useState([])
  const [filteredYear, setFilteredYear] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()

  const onYearDelete = async (id) => {
    const data = taxyears.filter(year => year._id !== id)
    setTaxyears(data)
    filteredYear(data)
  }

  const hadleDelete = async (id) => {
      try {
        const response = await axios.delete(`https://aata-api.vercel.app/api/taxyear/${id}`, {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          onYearDelete(id)
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
    const fetchTaxYears = async () =>{
      setIsLoading(true)
      try {
        const response = await axios.get("https://aata-api.vercel.app/api/taxyear", {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          console.log(response.data.taxyears)
          let sno = 1
          const data = await response.data.taxyears.map((taxyear)=>(
            {
              _id: taxyear._id,
              sno: sno++,
              taxYearCode: taxyear.taxYearCode,
              description: taxyear.description
            }
          ))
          setTaxyears(data)
          setFilteredYear(data)
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
      }finally{
        setIsLoading(false)
      }
    }
    fetchTaxYears()
  }, [])

  const filterYear = (e) => {
    const records = taxyears.filter((year) => 
    year.description.toString().includes(e.target.value))
    setFilteredYear(records)
  }
  return (
    <div className='p-6 bg-white m-8 rounded-xl'>
      <div className='flex justify-between items-center '>
        <div><p className='font-semibold text-sm text-gray-600'>የታክስ ዘመን ዝርዝር</p></div>
        <input 
          type="number"
          placeholder='በታክስ ዘመን ይፈልጉ ....'
          className='px-8 py-2 text-xs text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-full'
          onChange={filterYear} />
        <button onClick={()=> setIsOpen(!isOpen)} className='p-0.5 bg-gray-200 rounded-full'>{isOpen ? <IoMdArrowDropup size={20}/> : <IoMdArrowDropdown size={20}/>}</button>
      </div>
      <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-4 mb-4'/>
      {isOpen && (
         <>
          <div>
              <button type='button' onClick={()=>navigate('/admin-dashboard/settings/saveTaxYear')} 
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
                <p className='text-gray-700 text-sm w-32'>የታክስ ዘመን ኮድ</p>
                <p className='text-gray-700 text-sm w-32'>የታክስ ዘመን</p>
                <p className='text-gray-700 text-sm w-32'>ድርጊት</p>
              </div> 
              {filteredYear.map((year)=>(
                    
                    <div key={year._id}  className='px-3 py-2 mt-2 bg-white rounded-xl 
                    flex justify-between items-center hover:bg-gray-100'>
                        <p className='text-gray-700 text-sm w-32'>{year.sno}</p>
                        <p className='text-gray-700 text-sm w-32'>{year.taxYearCode}</p>
                        <p className='text-gray-700 text-sm w-32'>{year.description}</p>
                        <div className='flex w-32'>
                          <FaPencilAlt onClick={()=>navigate(`/admin-dashboard/settings/saveTaxYear/${year._id}`)} className='text-gray-700 mr-2 cursor-pointer' color='#6B7280' size={16}/>
                          <FaTrash onClick={()=>hadleDelete(year._id)} className='text-gray-700 cursor-pointer' color='#6B7280' size={16}/>
                        </div>
                      </div>
                ))} 
                
          </div> }
          
        </>
      
    </div>
  )
}

export default TaxyearScreen