import React from 'react';
import { ClipLoader} from 'react-spinners'
const Loader = ({ isLoading }) => {
  return (
    <>
      <div className='flex flex-col items-center top-[50%] justify-content-center items-center'>
        <ClipLoader
            color='#36d7b7'
            loading={isLoading}
            size={35}
            aria-label='Loading Spinner'
          />
      </div>
    </>
  )
}

export default Loader;

