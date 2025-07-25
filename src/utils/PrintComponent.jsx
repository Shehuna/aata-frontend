import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import OrderFollowup from '../components/report/OrderFollowup';

const PrintComponent = () => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "ቅጽ-5",
    pageStyle: `
      @media print {
        @page { 
          size: A4 landscape; 
          margin: 10mm; 
        }
        body { 
          -webkit-print-color-adjust: exact; 
        }
      }
    `
  });

  return (
    <div>
      {/* Hidden during printing */}
      <div style={{ display: 'none' }}>
        <div ref={componentRef}>
          <OrderFollowup />
        </div>
      </div>
      
      {/* Visible UI */}
      <div style={{ padding: '20px' }}>
        <OrderFollowup ref={componentRef}/> {/* Visible preview */}
        <button 
          onClick={handlePrint}
          className='px-4 py-1 bg-green-600 mt-2 
          justify-right text-white rounded-lg cursor-pointer hover:bg-green-500'
        >
          አትም
        </button>
      </div>
    </div>
  );
};

export default PrintComponent;
