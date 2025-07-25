import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import HandoverToPrint from '../components/filetransfer/HandoverToPrint';

const PrintComponent = () => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "ፋይል ማስረከቢያ",
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
          <HandoverToPrint />
        </div>
      </div>
      
      {/* Visible UI */}
      
      <div style={{ padding: '20px' }}>
        <HandoverToPrint ref={componentRef}/> {/* Visible preview */}
        <button 
          onClick={handlePrint}
          className='px-4 py-1 bg-green-600 mt-2 ml-6
          justify-right text-white rounded-lg cursor-pointer hover:bg-green-500'
        >
          አትም
        </button>
      </div>
    </div>
  );
};

export default PrintComponent;
