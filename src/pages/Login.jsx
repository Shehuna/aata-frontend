import { CiUser } from "react-icons/ci";
import { BiKey, BiSolidErrorAlt } from "react-icons/bi";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState(false)
    const {login} = useAuth()
    const navigate = useNavigate()
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            const response = await axios.post(
                'https://aata-api.vercel.app/api/auth/login',
                {userName, password})
            if(response.data.success){
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                if(response.data.user.role === "admin") {
                    navigate('/admin-dashboard')
                }
                else{
                    navigate('/user-dashboard')
                }
            }
        } catch (error) {
            if(error.response && !error.response.data.success){
                setError(true)
            }
        }
    }
  return (
     <>
        <div className='flex flex-col items-center
    h-screen justify-center bg-gradient-to-b 
    from-slate-800 from-50% to-gray-100 to-50%
    space-y-6' 
    >
        <h2 className='font-pacific text-2xl text-white'>
            አዲስ አበባ የታክስ ይግባኝ ሪከርድ ሲስተም
        </h2>
        <div className="shadow-lg p-6 w-96 bg-white rounded-lg">
            <h2 className="text-xl text-center font-bold mb-4 text-gray-500">መግቢያ</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-4 px-1">
                    <div className='flex justify-content-center items-center mr-2 mb-2'><CiUser/>
                    <label htmlFor="userName" className="block text-gray-700 ml-1 text-sm">የተጠቃሚ ስም</label></div>
                    
                    <input 
                        type="text" 
                        className="w-full px-3 py-3 border border-gray-200 text-xs focus:border-slate-300 focus:outline-none focus:border-2 rounded-lg" 
                        placeholder='የመጠቀሚያ ስም'
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        />
                </div>
                <div className="mb-4 px-1">
                <div className='flex justify-content-center items-center mr-2 mb-2'><BiKey/>
                <label htmlFor="password" className="block text-gray-700 ml-1 text-sm ">የይለፍ ቃል</label>
                </div>
                    <input 
                        type="password" 
                        className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-slate-300 focus:border-2 rounded-lg" 
                        placeholder='******'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        />
                </div>
                {error && <div className='flex flex-row bg-gray-100 p-1 justify-content items-center text-center  rounded-lg'>
                <div>
                    <BiSolidErrorAlt className='text-red-500 mr-1' />
                </div>
                <div>
                    <span><p className='text-red-500 text-xs py-2 text-center font-semibold'>የተሳሳተ የይለፍ መረጃ በድጋሚ ይሞክሩ!!</p></span>
                </div>
                
            </div>
             }
                
                <div className="mb-4 mt-6">
                    <button type='submit' className="w-full bg-slate-700 hover:bg-slate-600 cursor-pointer text-white py-1.5 rounded-lg">
                        ግባ
                    </button>
                </div>
                
            </form>
        </div>
                    <div className='text-center'>
                        <p className='text-gray-600 text-sm font-semibold'>AATA V.1.0</p>
                        <p className='text-gray-600 text-sm'>Copyright &copy; 2024-2025 All Rights Reserved</p>
                    </div> 
                    
    </div>
    
    </>
  )
}

export default Login