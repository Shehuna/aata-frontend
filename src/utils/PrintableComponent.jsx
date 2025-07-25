import React from 'react';

// Your component to be printed (can be complex JSX)
const PrintableComponent = () => (
  <div style={{ padding: '20px', fontFamily: 'Arial' }}>
    <h1>Sales Report</h1>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th style={tableHeaderStyle}>Product</th>
          <th style={tableHeaderStyle}>Quantity</th>
          <th style={tableHeaderStyle}>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={tableCellStyle}>Laptop</td>
          <td style={tableCellStyle}>15</td>
          <td style={tableCellStyle}>$1200</td>
        </tr>
        <tr>
          <td style={tableCellStyle}>Phone</td>
          <td style={tableCellStyle}>32</td>
          <td style={tableCellStyle}>$800</td>
        </tr>
      </tbody>
    </table>
    <div style={{ marginTop: '20px' }}>
      <p>Generated on: {new Date().toLocaleDateString()}</p>
    </div>
  </div>
);

// Style objects
const tableHeaderStyle = { 
  border: '1px solid #ddd', 
  padding: '8px', 
  textAlign: 'left' 
};

const tableCellStyle = { 
  border: '1px solid #ddd', 
  padding: '8px' 
};

export default PrintableComponent;