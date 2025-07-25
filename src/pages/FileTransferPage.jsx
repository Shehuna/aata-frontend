import React from 'react'
import TransferNavbar from '../components/filetransfer/TransferNavbar'
import { Outlet } from 'react-router-dom'

const FileTransferPage = () => {
  return (
    <>
        <TransferNavbar />
        <Outlet />
    </>
  )
}

export default FileTransferPage