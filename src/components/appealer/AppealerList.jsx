import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import {FaTrash,FaPencilAlt} from 'react-icons/fa'
import Loader from '../../utils/Loader';

const AppealerList = () => {
  const [appealers, setAppealers] = useState([])
  const [filteredAppealers, setFilteredAppealers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()

  const onAppealerDelete = async (id) => {
    const data = appealers.filter(appealer => appealer._id !== id)
    setAppealers(data)
    setFilteredAppealers(data)
  }

  const hadleDelete = async (id) => {
      try {
        const response = await axios.delete(`http://localhost:3000/api/appealer/${id}`, {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          onAppealerDelete(id)
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
    const fetchAppealers = async () =>{
      setIsLoading(true)
      try {
        const response = await axios.get("http://localhost:3000/api/appealer", {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          console.log(response.data.appealers)
          let sno = 1
          const data = await response.data.appealers.map((appealer)=>(
            {
              _id: appealer._id,
              sno: sno++,
              fullName: appealer.fullName,
              city: appealer.city,
              subcity: appealer.subcity._id,
              subcityName: appealer.subcity.description,
              wereda: appealer.wereda,
              houseNo: appealer.houseNo,
            }
          ))
          setAppealers(data)
          setFilteredAppealers(data)
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
      }finally{
        setIsLoading(false)
      }
    }
    fetchAppealers()
  }, [])

  const filterAppealer = (e) => {
    const records = appealers.filter((appealer) => 
    appealer.fullName.includes(e.target.value))
    setFilteredAppealers(records)
  }
  return (
    <div className='p-6 bg-white m-8 rounded-xl'>
      <div className='flex justify-between items-center '>
        <div><p className='font-semibold text-sm text-gray-600'></p>የይግባኝ ባይ ዝርዝር</div>
        <input 
          type="text"
          placeholder='በይግባኝ ባይ ስም ይፈልጉ ....'
          className='px-8 py-2 text-xs text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-full'
          onChange={filterAppealer} />
        <button onClick={()=> setIsOpen(!isOpen)} className='p-0.5 bg-gray-200 rounded-full'>{isOpen ? <IoMdArrowDropup size={20}/> : <IoMdArrowDropdown size={20}/>}</button>
      </div>
      <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-4 mb-4'/>
      {isOpen && (
         <>
          <div>
              <button type='button' onClick={()=>navigate('/admin-dashboard/saveAppealer')} 
              className='mt-6 text-sm bg-green-600 hover:bg-green-500
              text-white py-1 px-8 rounded-full'>አዲስ ጨምር</button>
          </div>
          <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-4 mb-4'/></>
         
          )}
           <>
          {isLoading ? <Loader isLoading={isLoading} /> : 
          <div className='bg-gray-200  px-6 py-2 mt-6'>
              <div className='px-3 py-1  rounded-xl flex justify-between items-left'>
                <p className='text-gray-700 text-sm w-12'>ተራ.ቁ.</p>
                <p className='text-gray-700 text-sm w-36'>ሙሉ ስም</p>
                <p className='text-gray-700 text-sm w-32'>ክ/ከ</p>
                <p className='text-gray-700 text-sm w-32'>ወረዳ</p>
                <p className='text-gray-700 text-sm w-32'>ቤ/ቁ</p>
                <p className='text-gray-700 text-sm w-32'>ድርጊት</p>
              </div> 
              {filteredAppealers.map((appealer)=>(
                    
                    <div key={appealer._id}  className='px-3 py-2 mt-2 bg-white rounded-xl 
                    flex justify-between items-center hover:bg-gray-100'>
                        <p className='text-gray-700 text-sm w-12'>{appealer.sno}</p>
                        <p className='text-gray-700 text-sm w-36'>{appealer.fullName}</p>
                        <p className='text-gray-700 text-sm w-32'>{appealer.subcityName}</p>
                        <p className='text-gray-700 text-sm w-32'>{appealer.wereda}</p>
                        <p className='text-gray-700 text-sm w-32'>{appealer.houseNo}</p>
                        <div className='flex w-32'>
                          <FaPencilAlt onClick={()=>navigate(`/admin-dashboard/saveAppealer/${appealer._id}`)} className='text-gray-700 mr-2 cursor-pointer' color='#6B7280' size={16}/>
                          <FaTrash onClick={()=>hadleDelete(appealer._id)} className='text-gray-700 cursor-pointer' color='#6B7280' size={16}/>
                        </div>
                      </div>
                ))} 
                
          </div> }
          
        </>
      
    </div>
  )
}

export default AppealerList