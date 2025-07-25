import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import {FaList,FaPencilAlt, FaCheckCircle} from 'react-icons/fa'
import Loader from '../../utils/Loader';
import { MdCloudDownload } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import Modal from '../../utils/Modal';
import ViewAppeal from './ViewAppeal'

const hyper = "http://localhost:3000/"

const AppealMainScreen = () => {
  const [appeals, setAppeals] = useState([])
  const [open, setOpen] = useState(false)
  const [filteredAppeals, setFilteredAppeals] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [appealId, setAppealId] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    const fetchAppeals = async () =>{
      setIsLoading(true)
      try {
        const response = await axios.get("http://localhost:3000/api/appeal", {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          console.log(response.data.appeals)
          let sno = 1
          const data = await response.data.appeals.map((appeal)=>(
            {
              _id: appeal._id,
              sno: sno++,
              courtName: appeal.courtName,
              fileNo: appeal.fileNo,
              openingDate: appeal.openingDate,
              appealer: appeal.appealer.fullName,
              respondent: appeal.respondent.fullName,
              taxyear: appeal.taxyear.description,
              taxtype: appeal.taxtype.description,
              category: appeal.category.description,
              appealStatus: appeal.appealStatus,
              decisionDate: appeal.decisionDate,
              appealFilePath: appeal.appealFilePath
            }
          ))
          setAppeals(data)
          setFilteredAppeals(data)
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
      }finally{
        setIsLoading(false)
      }
    }
    fetchAppeals()
  }, [])

  const filterAppeals = (e) => {
    const records = appeals.filter((appeal) => 
    appeal.fileNo.includes(e.target.value))
    setFilteredAppeals(records)
  }

  const handleViewButton = (appealid) => {
    setAppealId(appealid)
    setOpen(true)
  }
  return (
      <div className='p-6 bg-white m-8 rounded-xl'>
      <div className='flex justify-between items-center '>
        <div><p className='font-semibold text-sm text-gray-600'></p>የይግባኝ ዝርዝር</div>
        <input 
          type="text"
          placeholder='በይግባኝ ባይ ስም ይፈልጉ ....'
          className='px-8 py-2 text-xs text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-full'
          onChange={filterAppeals} />
        <button onClick={()=> setIsOpen(!isOpen)} className='p-0.5 bg-gray-200 rounded-full'>{isOpen ? <IoMdArrowDropup size={20}/> : <IoMdArrowDropdown size={20}/>}</button>
      </div>
      <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-4 mb-4'/>
      {isOpen && (
         <>
          <div>
              <button type='button' onClick={()=>navigate('/admin-dashboard/createAppeal')} 
              className='mt-6 text-sm bg-green-600 hover:bg-green-500
              text-white py-1 px-8 rounded-full'>አዲስ ፍጠር</button>
          </div>
          <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-4 mb-4'/></>
         
          )}
           <>
          {isLoading ? <Loader isLoading={isLoading} /> : 
          <div className='bg-gray-200  px-6 py-2 mt-6'>
              <div className='px-3 py-1  rounded-xl flex justify-between items-left'>
                <p className='text-gray-700 text-sm w-16'>ተራ.ቁ.</p>
                <p className='text-gray-700 text-sm w-32'>ፋይል ቁጥር</p>
                <p className='text-gray-700 text-sm w-32'>ይግባኝ ባይ</p>
                <p className='text-gray-700 text-sm w-32'>መልስ ሰጪ</p>
                <p className='text-gray-700 text-sm w-32'>የታክስ ዘመን</p>
                <p className='text-gray-700 text-sm w-32'>የታክስ ዓይነት</p>
                
                <p className='text-gray-700 text-sm w-32'>ድርጊት</p>
              </div> 
              {filteredAppeals.map((appeal)=>(
                    
                    <div key={appeal._id}  className='px-3 py-2 mt-2 bg-white rounded-xl 
                    flex justify-between items-center hover:bg-gray-100'>
                        <p className='text-gray-700 text-sm w-16'>{appeal.sno}</p>
                        <p className='text-gray-700 text-sm w-32'>{appeal.fileNo}</p>
                        <p className='text-gray-700 text-sm w-32'>{appeal.appealer}</p>
                        <p className='text-gray-700 text-sm w-32'>{appeal.respondent}</p>
                        <p className='text-gray-700 text-sm w-32'>{appeal.taxyear}</p>
                        <p className='text-gray-700 text-sm w-32'>{appeal.taxtype}</p>
                        <div className='flex w-32'>
                          <FaPencilAlt onClick={()=>navigate(`/admin-dashboard/appeal/edit/${appeal._id}`)} className='text-gray-700 mr-2 cursor-pointer' color='#6B7280' size={16}/>
                          <IoEye onClick={()=>navigate(`/admin-dashboard/appeal/approveAppeal/${appeal._id}`)}  className='text-gray-700 mr-2 cursor-pointer' color='#6B7280' size={20}/>
                          {appeal.appealStatus === 'directedForJudge' && <FaList onClick={()=>navigate(`/admin-dashboard/appointments/${appeal._id}`)} className='text-gray-700 cursor-pointer mr-2' color='#6B7280' size={16}/>}
                          {appeal.appealStatus === 'directedForJudge' && <FaCheckCircle onClick={()=>navigate(`/admin-dashboard/saveDecision/${appeal._id}`)} className='text-gray-700 cursor-pointer' color='#6B7280' size={16}/>}
                        </div>
                      </div>
                ))} 
                
          </div> }
          
        </>
      
    </div>

  )
}

export default AppealMainScreen