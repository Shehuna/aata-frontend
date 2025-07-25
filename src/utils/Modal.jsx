import React from 'react'
import { IoMdClose } from "react-icons/io";

const Modal = ({open, onClose, children}) => {
  return (
    <div onClick={onClose} className={
        `fixed inset-0 flex justify-center items-center
        transition-colors ${open ? "visible bg-black/20" : "invisible"}
        `}>
            <div 
                onClick={(e)=>e.stopPropagation()}
                 className={`
                bg-white rounded-xl shadow p-4 transition-all
                ${open ? "scale-100 opacity-100": "scale-125 opacity-0"}
                `}>
                    <button onClick={onClose} className='absolute -top-2 -right-2 p-1.5 rounded-full
                    text-white bg-gray-400 hover:bg-gray-500'>
                        <IoMdClose className='font-bold text-white text-sm'/>
                    </button>
                    {children}

            </div>
            
        </div>
  )
}

export default Modal