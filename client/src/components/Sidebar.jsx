import React, { useEffect, useState } from 'react'
import { LibraryIcon, ReceiptTaxIcon, CashIcon, CogIcon } from '@heroicons/react/solid';

const Sidebar = ({ page }) => {
  const [link1, setlink1] = useState("hover:bg-dark_primary hover:text-black");
  const [link2, setlink2] = useState("hover:bg-dark_primary hover:text-black");
  const [link3, setlink3] = useState("hover:bg-dark_primary hover:text-black");
  const [link4, setlink4] = useState("hover:bg-dark_primary hover:text-black");
  useEffect(() => {
    if (page === "inventory-stock")
      setlink1("bg-dark_primary text-black");
    else if (page === "bills")
      setlink2("bg-dark_primary text-black");
    else if (page === "gst-details")
      setlink3("bg-dark_primary text-black");
    else if (page === "settings")
      setlink4("bg-dark_primary text-black");
  }, [page, link1, link2, link3, link4]);
  const onLogoutHandler = (e) => {
    e.preventDefault();
    window.location = '/signin';
  }
  return (
    <div className='sticky overflow-auto w-3/12 top-0 left-0 h-screen border-r-4 border-dark_primary bg-light_primary'>
      <div className='flex justify-start items-center bg-dark_primary p-6'>
        <img src='logo.svg' alt="Logo" className='w-10 h-10' />
        <p className='w-96 text-center text-2xl text-black font-bold'>My Vow Jewels LLP</p>
      </div>
      <div className='w-100 h-[85%] flex flex-col justify-between items-center'>
        <div className='flex flex-col justify-evenly'>
          <div onClick={() => window.location = '/bills'} className={link2 + ' w-72 m-4 p-2 text-xl  rounded-2xl font-extrabold text-black cursor-pointer'}>
            <p className='w-72 flex flex-row justify-start items-center'>
              <ReceiptTaxIcon className='w-8 h-8 mr-4' />
              <span>Bills</span>
            </p>
          </div>
          <div onClick={() => window.location = '/inventory-stock'} className={link1 + ' w-72 m-4 p-2 text-xl  rounded-2xl font-extrabold text-black cursor-pointer'}>
            <p className='w-72 flex flex-row justify-start items-center'>
              <LibraryIcon className='w-8 h-8 mr-4' />
              <span>Inventory</span>
            </p>
          </div>
          <div onClick={() => window.location = '/gst-details'} className={link3 + ' w-72 m-4 p-2 text-xl  rounded-2xl font-extrabold text-black cursor-pointer'}>
            <p className='w-72 flex flex-row justify-start items-center'>
              <CashIcon className='w-8 h-8 mr-4' />
              <span>GST Details</span>
            </p>
          </div>
          <div onClick={() => window.location = '/settings'} className={link4 + ' w-72 m-4 p-2 text-xl  rounded-2xl font-extrabold text-black cursor-pointer'}>
            <p className='w-72 flex flex-row justify-start items-center'>
              <CogIcon className='w-8 h-8 mr-4' />
              <span>Settings</span>
            </p>
          </div>
        </div>
        <div onClick={onLogoutHandler} className='w-72 text-center m-4 p-4 text-xl bg-dark_primary rounded-2xl font-bold cursor-pointer'>
          <p className='text-black'>Logout</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
