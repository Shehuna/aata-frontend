import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../../utils/Loader';
import { MdCloudDownload } from "react-icons/md";
import { Link } from 'react-router-dom';



const hyper = "http://localhost:3000/"

const ClosedAppealsScree = () => {
  const [decisions, setDecisions] = useState([])
  const [filteredDecisions, setFilteredDecisions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(()=>{
    const fetchDecisions = async () =>{
      setIsLoading(true)
      try {
        const response = await axios.get("http://localhost:3000/api/decision", {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          console.log(response.data.decisions)
          let sno = 1
          const data = await response.data.decisions.map((decision)=>(
            {
              sno: sno++,
              fileNo: decision.appeal.fileNo,
              fullName: decision.appeal.appealer.fullName,
              respondent: decision.appeal.respondent.fullName,
              taxyear: decision.appeal.taxyear.description,
              taxtype: decision.appeal.taxtype.description,
              finalDecisionDate: decision.finalDecisionDate,
              decisionFilePath: decision.decisionFilePath
            }
          ))
          setDecisions(data)
          setFilteredDecisions(data)
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
      }finally{
        setIsLoading(false)
      }
    }
    fetchDecisions()
  }, [])

  const filterDecisions = (e) => {
    const records = decisions.filter((decision) => 
    decision.fullName.includes(e.target.value))
    setFilteredDecisions(records)
  }
  return (
    <div className='p-6 bg-white m-8 rounded-xl'>
      <div className='flex justify-between items-center '>
        <div><p className='font-semibold text-sm text-gray-600'></p>የይግባኝ ውሳኔ ዝርዝር</div>
        <input 
          type="text"
          placeholder='በይግባኝ ባይ ስም ይፈልጉ ....'
          className='px-8 py-2 text-xs text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-full'
          onChange={filterDecisions} />
        
      </div>
      <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-4 mb-4'/>
       {isLoading ? <Loader isLoading={isLoading} /> : 
          <div className='bg-gray-200  px-6 py-2 mt-6'>
              <div className='px-3 py-1  rounded-xl flex justify-between items-left'>
                <p className='text-gray-700 text-sm w-16'>ተራ.ቁ.</p>
                <p className='text-gray-700 text-sm w-24'>ፋይል ቁጥር</p>
                <p className='text-gray-700 text-sm w-28'>ይግባኝ ባይ</p>
                <p className='text-gray-700 text-sm w-28'>መልስ ሰጪ</p>
                <p className='text-gray-700 text-sm w-24'>የታክስ ዘመን</p>
                <p className='text-gray-700 text-sm w-24'>የታክስ ዓይነት</p> 
                <p className='text-gray-700 text-sm w-32'>ውሳኔ የተሰጠበት ቀን</p>
                <p className='text-gray-700 text-sm w-28'>የውሳኔ ፋይል</p>
              </div> 
              {filteredDecisions.map((decision)=>(
                  <div key={decision._id}  className='px-3 py-2 mt-2 bg-white rounded-xl 
                  flex justify-between items-center hover:bg-gray-100'>
                      <p className='text-gray-700 text-sm w-16'>{decision.sno}</p>
                      <p className='text-gray-700 text-sm w-24'>{decision.fileNo}</p>
                      <p className='text-gray-700 text-sm w-28'>{decision.fullName}</p>
                      <p className='text-gray-700 text-sm w-28'>{decision.respondent}</p>
                      <p className='text-gray-700 text-sm w-24'>{decision.taxyear}</p>
                      <p className='text-gray-700 text-sm w-24'>{decision.taxtype}</p>
                      <p className='text-gray-700 text-sm w-32'>{decision.finalDecisionDate}</p>
                      <p className='text-gray-700 text-sm w-28'>
                          <Link className='flex' to={hyper+decision.decisionFilePath} target='blank'><MdCloudDownload size={18} className='mr-1 '/>
                              ያውርዱ
                          </Link>
                      </p>
                  </div>
                ))} 
                
          </div> }
    </div>
  )
}

export default ClosedAppealsScree