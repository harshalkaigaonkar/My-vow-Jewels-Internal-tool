import React, { useState, Fragment, useEffect } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { PlusCircleIcon, PlusIcon } from '@heroicons/react/solid'
import moment from 'moment';
import axios from 'axios';
import Loading from '../../components/Loading';
import BillProducts from './BillProducts';
import Temptable from '../../components/Temptable';


const Bills = () => {
 document.title = "My Vow Jewels LLP | Bills"
 const [search, setSearch] = useState("");
 const [isOpen, setIsOpen] = useState(false);
 const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
 const [customerName, setCustomerName] = useState("");
 const [customerPlace, setCustomerPlace] = useState("");
 const [customerPhone, setCustomerPhone] = useState("");
 const [totalMrp, setTotalMrp] = useState(0);
 const [items, setItems] = useState([]);
 const [apiItems, setApiItems] = useState([]);
 const [cgst, setCgst] = useState(0.00);
 const [sgst, setSgst] = useState(0.00);
 const [igst, setIgst] = useState(0.00);
 const [cgstValue, setCgstValue] = useState(0.00);
 const [sgstValue, setSgstValue] = useState(0.00);
 const [igstValue, setIgstValue] = useState(0.00);
 const [advance, setAdvance] = useState(0);
 const [discount, setDiscount] = useState(0);
 const [grandTotal, setGrandTotal] = useState(0);
 const [data, setData] = useState([]);

 useEffect(() => {
  const getData = async () => {
   const today = date.split("-");
   try {
    const res = await axios.get(`http://localhost:5000/bills/get?type=timeline&year=${parseInt(today[0])}&month=${parseInt(today[1])}&date=${parseInt(today[2])}`);
    if (res.status === 200) {
     setData(res.data.data);
    }
   } catch (err) {
    window.alert("Bills Cannot be fetched!!")
   }
  }
  getData();
 }, [setData, date]);

 const closeModal = () => {
  setIsOpen(false)
 }

 const openModal = () => {
  setIsOpen(true)
 }

 const onDateChange = (e) => {
  setDate(e.target.value);
 }
 const onSearchChange = (e) => {
  setSearch(e.target.value.toUpperCase());
 }

 const onCgstChange = (e) => {
  setCgst(e.target.value);
 }
 const onSgstChange = (e) => {
  setSgst(e.target.value);
 }
 const onIgstChange = (e) => {
  setIgst(e.target.value);
 }

 const getCgstValue = () => {
  let newCgstValue = totalMrp * (cgst / 100);
  setCgstValue(newCgstValue);
 }
 const getSgstValue = () => {
  let newSgstValue = totalMrp * (sgst / 100);
  setSgstValue(newSgstValue);
 }
 const getIgstValue = () => {
  let newIgstValue = totalMrp * (igst / 100);
  setIgstValue(newIgstValue);
 }

 const getGrandTotalValue = () => {
  let grand_total = totalMrp + cgstValue + sgstValue + igstValue - discount - advance;
  setGrandTotal(grand_total);
 }

 const onBillGenerate = async () => {
  // make call request to server for bill add, give a modal for generting the pdf copy of the bill

  try {
   const body = {
    bill_details: {
     customer_name: customerName,
     customer_phone: customerPhone,
     customer_place: customerPlace,
     items: apiItems,
     total: grandTotal,
     cgst: cgstValue.toString(),
     sgst: sgstValue.toString(),
     igst: igstValue.toString(),
     total_gst: (cgstValue + sgstValue + igstValue).toString(),
     advance: advance.toString(),
     discount: discount.toString(),
     grand_total: grandTotal.toString(),
    }
   }

   const res = await axios.post('http://localhost:5000/bills/add', body);
   if (res.status === 201) {
    setCustomerName("")
    setCustomerPhone("")
    setCustomerPlace("")
    setTotalMrp(0);
    setItems([]);
    setApiItems([]);
    setCgst(0.00);
    setSgst(0.00);
    setIgst(0.00);
    setCgstValue(0.00);
    setSgstValue(0.00);
    setIgstValue(0.00);
    setAdvance(0);
    setDiscount(0);
    setGrandTotal(0);
    // open a modal for printing bill
    closeModal();
   }
  } catch (err) {
   window.alert("Bill won't be Generated!!")
  }
 }

 const onAddProducts = () => {
  setItems(items.concat(<BillProducts key={items.length} items={items} index={items.length} apiItems={apiItems} setApiItems={setApiItems} totalMrp={totalMrp} setTotalMrp={setTotalMrp} />));
 }

 const settings = {
  bill_no_settings: {
   title: "Bill No.",
   readOnly: true
  },
  item_settings: {
   title: " Total Items Buyed",
   readOnly: true,
  },
  date_settings: {
   title: "Creation Date",
   readOnly: true,
  },
  name_settings: {
   title: "Customer Name",
   readOnly: true
  },
  phone_settings: {
   title: "Customer Phone",
   readOnly: true
  },
  place_settings: {
   title: "Customer Place",
   readOnly: true
  },
  total_mrp_settings: {
   title: "Total MRP",
   readOnly: true
  },
  cgst_settings: {
   title: "CGST",
   readOnly: true
  },
  sgst_settings: {
   title: "SGST",
   readOnly: true
  },
  igst_settings: {
   title: "IGST",
   readOnly: true
  },
  total_gst_settings: {
   title: "Total GST",
   readOnly: true
  },
  advance_settings: {
   title: "Advance",
   readOnly: true
  },
  discount_settings: {
   title: "Discount",
   readOnly: true
  },
  grand_total_settings: {
   title: "Grand Total",
   readOnly: true
  }
 }

 return (
  <div className='flex-grow overflow-auto h-screen top-0 left-0 bg-light_primary'>
   <div className='flex flex-row items-center justify-between p-6 m-2 border-2 border-dark_primary rounded-xl'>
    <h1 className='text-3xl font-bold text-black'>Bills</h1>
    <div className='w-3/12 flex flex-row items-center justify-between mx-5'>
     <input type="date" name="date" value={date} onChange={onDateChange} min="2022-01-01" max="2030-01-01" className='w-full bg-dark_primary p-2 text-xl font-bold rounded' />
     {/* <p className='p-2 w-24 bg-dark_primary rounded-xl hover:shadow-xl cursor-pointer flex flex-row justify-evenly items-center text-lg font-semibold'><span>Find</span><SearchIcon className="w-5 h-5" /></p> */}
    </div>
   </div>
   <div className='flex flex-row justify-around items-center h-[80px]'>
    <div className='py-6 px-6 w-4/6 flex flex-row'>
     <input
      type="text"
      placeholder='Search'
      className='w-full px-4 py-2 rounded-2xl shadow-xl'
      name='search'
      value={search}
      onChange={onSearchChange}
     />
    </div>
    <div className='w-1/6'>
     <p onClick={openModal} className='flex flex-row items-center justify-center cursor-pointer hover: w-40 p-2 rounded-xl text-center font-bold bg-dark_primary text-xl hover:shadow-xl'>
      <span className='px-px'>Add</span>
      <PlusCircleIcon className='w-6 h-6 p-1' />
     </p>
     <Transition appear show={isOpen} as={Fragment}>
      <Dialog
       as="div"
       className="fixed inset-0 z-40 overflow-y-scroll bg-black bg-opacity-30"
       onClose={closeModal}
      >
       <div className="min-h-screen px-4 text-center">
        <Transition.Child
         as={Fragment}
         enter="ease-out duration-300"
         enterFrom="opacity-0"
         enterTo="opacity-100"
         leave="ease-in duration-200"
         leaveFrom="opacity-100"
         leaveTo="opacity-0"
        >
         <Dialog.Overlay className="fixed inset-0" />
        </Transition.Child>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
         className="inline-block h-screen align-middle"
         aria-hidden="true"
        >
         &#8203;
        </span>
        <Transition.Child
         as={Fragment}
         enter="ease-out duration-300"
         enterFrom="opacity-0 scale-95"
         enterTo="opacity-100 scale-100"
         leave="ease-in duration-200"
         leaveFrom="opacity-100 scale-100"
         leaveTo="opacity-0 scale-95"
        >
         <div className="inline-block w-[85%] p-6 my-8 transition-all transform bg-light_primary rounded-2xl">
          <Dialog.Title
           as="h2"
           className="text-2xl font-bold px-2 mb-3"
          >
           Bill Details
          </Dialog.Title>
          <hr className='inline-block w-[93%] align-middle pb-5' />
          <div className="w-full px-10 flex flex-col">
           <div className='flex flex-col'>
            <p className='text-center text-lg font-bold opacity-60 mb-6'>Bill Issuing Details</p>
            <div className='flex flex-row items-center justify-evenly mb-10'>
             <div className='flex flex-col'>
              <div className='flex flex-col'>
               <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Customer Name">Customer Name*</label>
               <input type="text" label="Customer Name" value={customerName} required onChange={(e) => setCustomerName(e.target.value.toUpperCase())} placeholder='' className='w-96 mb-4 p-2 rounded-xl border border-black' />
              </div>
              <div className='flex flex-col'>
               <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Date">Date</label>
               <input type="date" label="Date" value={date} readOnly onChange={(e) => setDate(e.target.value)} placeholder='' className='w-96 mb-4 p-2 rounded-xl border border-black' />
              </div>
             </div>
             <div>
              <div className='flex flex-col'>
               <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Customer Phone">Customer Phone</label>
               <input type="number" minLength="10" label="Customer Phone" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder='' className='w-96 mb-4 p-2 rounded-xl border border-black' />
              </div>
              <div className='flex flex-col'>
               <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Customer Place">Customer Place</label>
               <input type="text" label="Customer Place" value={customerPlace} onChange={(e) => setCustomerPlace(e.target.value.toUpperCase())} placeholder='' className='w-96 mb-4 p-2 rounded-xl border border-black' />
              </div>
             </div>
            </div>
           </div>
           <hr className='inline-block w-full align-middle pb-5' />
           <p className='text-center text-lg font-bold opacity-60 mb-6'>Product Details</p>
           <div id="items">
            {items}
           </div>
           <p onClick={onAddProducts} className='flex flex-row items-center w-40 my-4 justify-evenly cursor-pointer hover:shadow-xl p-2  bg-dark_primary text-sm font-bold rounded-xl'><span>Add Products</span><PlusIcon className='w-5 h-5' /></p>
           <div className='flex flex-col'>
            <div className='flex flex-row items-center justify-end m-2 font-semibold'>
             <p>Total MRP:</p>
             <input type="number" min="0" step="0.01" className='rounded border-2 mx-2 px-2 text-lg' required value={totalMrp} disabled readOnly />
            </div>
            <hr />
            <div className='flex flex-row items-center justify-end m-2'>
             <p>CGST :</p>
             <input type="number" min="0" step="0.01" className='w-20 mx-2 rounded border px-2' required value={cgst} onChange={onCgstChange} />
             <input type="number" min="0" step="0.01" className='w-20 mx-2 rounded border px-2' required value={cgstValue} disabled readOnly />
             <p onClick={getCgstValue} className='text-sm cursor-pointer rounded-xl hover:shadow-xl mx-2 font-semibold p-2 bg-dark_primary '>Get Value</p>
            </div>
            <div className='flex flex-row items-center justify-end m-2'>
             <p>SGST :</p>
             <input type="number" min="0" step="0.01" className='w-20 mx-2 rounded border px-2' required value={sgst} onChange={onSgstChange} />
             <input type="number" min="0" step="0.01" className='w-20 mx-2 rounded border px-2' required value={sgstValue} disabled readOnly />
             <p onClick={getSgstValue} className='text-sm cursor-pointer rounded-xl hover:shadow-xl mx-2 font-semibold p-2 bg-dark_primary '>Get Value</p>
            </div>
            <div className='flex flex-row items-center justify-end m-2'>
             <p>IGST :</p>
             <input type="number" min="0" step="0.01" className='w-20 mx-2 rounded border px-2' required value={igst} onChange={onIgstChange} />
             <input type="number" min="0" step="0.01" className='w-20 mx-2 rounded border px-2' required value={igstValue} disabled readOnly />
             <p onClick={getIgstValue} className=' text-sm cursor-pointer rounded-xl hover:shadow-xl mx-2 font-semibold p-2 bg-dark_primary '>Get Value</p>
            </div>
            {/* <div className='flex flex-row items-center justify-end m-2'>
             <p>Total GST :</p>
             <input type="number" min="0" step="0.01" className='w-32 mx-2 rounded border' required value={totalGst} disabled readOnly />
             <input type="number" min="0" step="0.01" className='w-32 mx-2 rounded border' required value={totalGstValue} disabled readOnly />
            </div> */}
            <hr />
            <div className='flex flex-row items-center justify-end m-2'>
             <p>Advance :</p>
             <input type="number" min="0" value={advance} className='border-2 rounded mx-8 px-2' onChange={(e) => setAdvance(e.target.value)} />
            </div>
            <div className='flex flex-row items-center justify-end m-2'>
             <p>Discount :</p>
             <input type="number" min="0" value={discount} className='border-2 rounded mx-8 px-2' onChange={(e) => setDiscount(e.target.value)} />
            </div>
            <hr />
            <div className='flex flex-row items-center justify-end m-2 font-semibold'>
             <p>Grand Total :</p>
             <input type="number" min="0" step="0.01" className='rounded border-2 mx-2 px-2 text-lg' required value={grandTotal} disabled readOnly />
             <p onClick={getGrandTotalValue} className='text-sm cursor-pointer rounded-xl hover:shadow-xl mx-2 font-semibold p-3 bg-dark_primary '>Get Value</p>
            </div>
           </div>
          </div>
          <div className="mt-4">
           <button
            type="button"
            className="inline-flex justify-center px-4 py-2 text-xl font-bold text-black bg-dark_primary rounded-xl hover:shadow-xl"
            onClick={onBillGenerate}
           >
            Generate Bill
           </button>
          </div>
         </div>
        </Transition.Child>
       </div>
      </Dialog>
     </Transition>
    </div>
   </div>
   <div className='flex flex-row items-center justify-between'>
    <div className='mr-20 mx-10'>
     <p className='font-medium text-lg'>Showing <span className='font-bold w-2/12'>{data ? data.filter((product) => {
      if (search === "") return product;
      else return product.customer_name.includes(search);
     }).length : "-"}</span> Results</p>
    </div>
   </div>
   <div className='relative z-10 overflow-y-auto h-[68%] mx-4 my-2'>
    {(data) ?
     <>
      <Temptable data={data.filter((bill) => {
       if (search === "") return bill;
       else return bill.customer_name.includes(search);
      })} settings={settings} type="bills" className='border-2 border-dark_primary' />
     </>
     :
     <Loading />}
   </div>
  </div>
 )
}

export default Bills
