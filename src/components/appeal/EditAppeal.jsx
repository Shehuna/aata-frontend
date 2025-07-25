import React, { useEffect, useState } from 'react'
import { fetchAppealers, fetchCategory, fetchRespondent, fetchTaxTypes, fetchTaxYear } from '../../utils/SubcityFetcher'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { MdCloudDownload } from "react-icons/md";
import Loader from '../../utils/Loader'

const hyper = "http://localhost:3000/"
const EditAppealScreen = () => {
  const {id} = useParams()
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
    appealFilePath: ''
  })
 
  const [taxTypes, setTaxTypes] = useState([])
  const [taxYears, setTaxYears] = useState([])
  const [respondents, setRespondents] = useState([])
  const [categories, setCategories]= useState([])


  const navigate = useNavigate()

  const [appealers, setAppealers] = useState([])
   

  const [formData, setFormData] = useState({})
     

  const handleChange = (e) => {
      const {name, value, files} = e.target
      if(name === 'appealFile'){
        setAppeal((prevData) => ({...prevData, [name]: files[0] }))
      }else{
        setAppeal((prevData) => ({...prevData, [name]: value }))
      }
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
                appealer: appeal.appealer._id,
                respondent: appeal.respondent._id, 
                taxyear: appeal.taxyear._id, 
                taxtype: appeal.taxtype._id, 
                category: appeal.category._id,
                courtName: appeal.courtName,
                fileOpeningDate: appeal.fileOpeningDate,
                fileNo: appeal.fileNo,
                appealStatus: appeal.appealStatus,
                finalDecisionDate: appeal.finalDecisionDate,
                appealFilePath: appeal.appealFilePath,
            }))
        }
          
      } catch (error) {
        if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
      }
    }
    fetchAppeal()
  }, [])

  useEffect(()=>{
      const getTaxtypes = async () => {
          const taxtypes = await fetchTaxTypes()
          setTaxTypes(taxtypes)
      }
      getTaxtypes()
    }, [])

  useEffect(()=>{
      const getAppealers = async () => {
          const appealers = await fetchAppealers()
          setAppealers(appealers)
      }
      getAppealers()
    }, [])

  useEffect(()=>{
      const getTaxYears = async () => {
          const taxyears = await fetchTaxYear()
          setTaxYears(taxyears)
      }
      getTaxYears()
    }, [])

  useEffect(()=>{
      const getRespondents = async () => {
          const respondents = await fetchRespondent()
          setRespondents(respondents)
      }
      getRespondents()
    }, [])

  useEffect(()=>{
      const getCategories = async () => {
          const categories = await fetchCategory()
          setCategories(categories)
      }
      getCategories()
    }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(appeal)

    const formDataObj = new FormData()
     
    Object.keys(appeal).forEach((key) => {
      formDataObj.append(key, appeal[key])
    })

    try {
            const response = await axios.put(`http://localhost:3000/api/appeal/${id}`, formDataObj, {
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
        <h4 className='font-semibold text-sm text-gray-500'>ይግባኝ ማዘመን</h4>
        <hr className='bg-gray-600 border-0.5 border-gray-300 text-gray-600 mt-4 mb-4'/>
        <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div >
                    <label 
                        htmlFor="courtName"
                        className='text-xs font-medium text-gray-500
                        '>
                        መዝገቡ የተቀጠረበት ችሎት*
                        </label>
                    <input 
                        type="text"  
                        name='courtName'
                        onChange={handleChange} 
                        value={appeal.courtName}                
                        className='mt-1 w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                </div>
                <div>
                    <label 
                        htmlFor="fileOpeningDate"
                        className='text-xs font-medium text-gray-500
                        '>
                        የይግባኝ ፋይል የተከፈተበት ቀን*
                        </label>
                    <input 
                        type="text"
                        name='fileOpeningDate' 
                        disabled
                        onChange={handleChange}
                        value={appeal.fileOpeningDate}  
                        className='mt-1 w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label 
                        htmlFor="fileNo"
                        className='text-xs font-medium text-gray-500
                        '>
                        የመዝገብ ቁጥር*
                        </label>
                    <input 
                        type="text"
                        name='fileNo' 
                        onChange={handleChange}  
                        value={appeal.fileNo}  
                        className='mt-1 w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required/>
                </div>
                <div >
              <div >
                    <label 
                        htmlFor="appealer"
                        className='text-xs text-gray-500 mt-2 mb-3'>
                        ይግባኝ ባይ*
                        </label>
                        <select  
                        name='appealer'
                        onChange={handleChange}   
                        value={appeal.appealer} 
                        className='mt-1 text-sm w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required>
                            <option className='text-gray-500 text-xs' value="">---ምረጥ---</option>
                            {appealers.map((appealer)=>(
                                <option key={appealer._id} className='text-gray-500 text-xs' value={appealer._id}>{appealer.fullName}</option>
                            ))} 
                        </select>
                    </div>
                
              </div>
                
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-4">
                  <div >
                    <label 
                        htmlFor="respondent"
                        className='text-xs text-gray-500 mt-2 mb-3'>
                        መልስ ሰጪ*
                        </label>
                        <select  
                        name='respondent'
                        onChange={handleChange}  
                        value={appeal.respondent}  
                        className='mt-1 text-sm w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required>
                            <option className='text-gray-500 text-xs' value="">---ምረጥ---</option>
                            {respondents.map((resp)=>(
                                <option key={resp._id} className='text-gray-500 text-xs' value={resp._id}>{resp.fullName}</option>
                            ))} 
                        </select>
                    </div>
                <div >
                    <label 
                        htmlFor="taxyear"
                        className='text-xs text-gray-500 mt-2 mb-3'>
                        የታክስ ዘመን*
                        </label>
                        <select  
                        name='taxyear'
                        onChange={handleChange} 
                        value={appeal.taxyear}  
                        className='mt-1 text-sm w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required>
                            <option className='text-gray-500 text-xs' value="">---ምረጥ---</option>
                            {taxYears.map((year)=>(
                                <option key={year._id} className='text-gray-500 text-xs' value={year._id}>{year.description}</option>
                            ))} 
                        </select>
                    </div>
                
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-4">
                  <div >
                    <label 
                        htmlFor="taxtype"
                        className='text-xs text-gray-500 mt-2 mb-3'>
                        የታከስ ዓይነት*
                        </label>
                        <select  
                        name='taxtype'
                        onChange={handleChange}  
                        value={appeal.taxtype}   
                        className='mt-1 text-sm w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required>
                            <option className='text-gray-500 text-xs' value="">---ምረጥ---</option>
                            {taxTypes.map((type)=>(
                                <option key={type._id} className='text-gray-500 text-xs' value={type._id}>{type.description}</option>
                            ))} 
                        </select>
                    </div>
                <div >
                    <label 
                        htmlFor="category"
                        className='text-xs text-gray-500 mt-2 mb-3'>
                        የንግድ ዘርፍ*
                        </label>
                        <select  
                        name='category'
                        onChange={handleChange} 
                        value={appeal.category}     
                        className='mt-1 text-sm w-full p-2 text-gray-700 border-1 border-gray-200 focus:border-gray-400 focus:outline-none focus:border-1.5 rounded-md'
                        required>
                            <option className='text-gray-500 text-xs' value="">---ምረጥ---</option>
                            {categories.map((cat)=>(
                                <option key={cat._id} className='text-gray-500 text-xs' value={cat._id}>{cat.description}</option>
                            ))} 
                        </select>
                    </div>
                
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-4">
                  <div>
                    <div className='flex'>
                        <Link to={hyper+appeal.appealFilePath} target='blank'><MdCloudDownload size={18} className='mr-1 '/></Link>
                        <p className='text-gray-700 text-sm  relative group'>
                           ያለውን ፋይል ያቆዩ ወይ
                        </p>
                         
                    </div>
                      <label 
                        htmlFor="appealFile"
                        className='text-xs font-medium text-gray-500
                        '>
                        አዲስ ፋይል ይምረጡ*
                        </label>
                      <input 
                        type="file" 
                        name='appealFile'
                        onChange={handleChange}
                        placeholder='upload Image' 
                        accept='pdf/*'
                        className='mt-1 w-full p-2  text-xs text-gray-700 border border-gray-300 focus:border-blue-200 rounded-md'
                        />
                        <p className='text-gray-700 text-xs mt-2'>ፒ.ዲኤ.ፍ ፋይል 2ሜ.ባ *</p>
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
                        hover:bg-gray-100 mr-2' onClick={()=>navigate('/admin-dashboard/appealList')}>ሰርዝ</button>
                        <button
                        className='mt-2 text-md bg-green-600 hover:bg-green-500
                        text-white py-1 px-8 rounded-full'>አዘምን</button>
                    </div>
                </div>
            </form>
    </div>}
    </>
    
  )
}

export default EditAppealScreen