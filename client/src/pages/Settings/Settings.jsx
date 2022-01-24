import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';

const Settings = () => {

 const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
 const [isAddSubCategoryOpen, setIsAddSubCategoryOpen] = useState(false);
 const [isModifyStockOpen, setIsModifyStockOpen] = useState(false);
 const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
 const [isEditSubCategoryOpen, setIsEditSubCategoryOpen] = useState(false);
 const [isDeleteProductOpen, setIsDeleteProductOpen] = useState(false);
 const [categoryTyped, setCategoryTyped] = useState("");
 const [subCategoryTyped, setSubCategoryTyped] = useState("");
 const [qtyTyped, setQtyTyped] = useState(0);
 const [productCodeTyped, setProductCodeTyped] = useState("");
 const [mrpTyped, setMrpTyped] = useState("0");
 const [prevCategoryTyped, setPrevCategoryTyped] = useState("");
 const [newCategoryTyped, setNewCategoryTyped] = useState("");
 const [prevSubCategoryTyped, setPrevSubCategoryTyped] = useState("");
 const [newSubCategoryTyped, setNewSubCategoryTyped] = useState("");

 const openAddCategoryModal = () => {
  setIsAddCategoryOpen(true);
 }
 const closeAddCategoryModal = () => {
  setIsAddCategoryOpen(false);
 }
 const openModifyStockModal = () => {
  setIsModifyStockOpen(true);
 }
 const closeModifyStockModal = () => {
  setIsModifyStockOpen(false);
 }
 const openAddSubCategoryModal = () => {
  setIsAddSubCategoryOpen(true);
 }
 const closeAddSubCategoryModal = () => {
  setIsAddSubCategoryOpen(false);
 }
 const openEditCategoryModal = () => {
  setIsEditCategoryOpen(true);
 }
 const closeEditCategoryModal = () => {
  setIsEditCategoryOpen(false);
 }
 const openEditSubCategoryModal = () => {
  setIsEditSubCategoryOpen(true);
 }
 const closeEditSubCategoryModal = () => {
  setIsEditSubCategoryOpen(false);
 }
 const openDeleteProductModal = () => {
  setIsDeleteProductOpen(true);
 }
 const closeDeleteProductModal = () => {
  setIsDeleteProductOpen(false);
 }

 const onAddCategory = async () => {
  try {
   if (categoryTyped === "") window.alert("Please Specify any Category!!")
   const body = { category_type: categoryTyped };
   const res = await axios.post('http://localhost:5000/categories/add', body);
   if (res.status === 201) {
    setCategoryTyped("");
    closeAddCategoryModal();
    window.alert("Successfully Added Category.");
   }
   else {
    window.alert("Category Cannot be Added!!")
   }
  } catch (err) {
   window.alert("Category Cannot be Added!!")
  }
 }
 const onAddSubCategory = async () => {
  try {
   if (subCategoryTyped === "") window.alert("Please Specify any Sub-Category!!")
   const body = { sub_category_type: subCategoryTyped };
   const res = await axios.post('http://localhost:5000/sub_categories/add', body);
   if (res.status === 201) {
    setSubCategoryTyped("");
    closeAddSubCategoryModal();
    window.alert("Successfully Added Sub-Category.");
   } else {
    window.alert("Sub-Category Cannot be Added!!")
   }
  } catch (err) {
   window.alert("Sub-Category Cannot be Added!!")
  }
 }
 const onFindStock = async () => {
  try {
   if (productCodeTyped === "") window.alert("Product Code cannot be Empty!!")
   const res = await axios.get(`http://localhost:5000/products/get?type=once&product_code_no=${productCodeTyped}`);
   console.log(res)
   if (res.status === 200) {
    setQtyTyped(res.data.data.product_qty);
    setMrpTyped(res.data.data.product_mrp);
   }
   else
    window.alert("No Product Found!!")
  } catch (err) {
   window.alert("No Product's There!!")
  }
 }
 const onModifyStock = async () => {
  try {
   if (qtyTyped === "" || mrpTyped === "") window.alert("Please Specify Quantity / MRP !!")
   const body = { updated_details: { product_qty: qtyTyped, product_mrp: mrpTyped } };
   const res = await axios.patch(`http://localhost:5000/products/update?product_code_no=${productCodeTyped}`, body);
   if (res.status === 202) {
    setQtyTyped("");
    setMrpTyped("");
    setProductCodeTyped("");
    closeModifyStockModal();
    window.alert("Successfully Updated Stock.");
   }
  } catch (err) {
   window.alert("Stock Cannot be Updated!!")
  }
 }
 const onEditCategory = async () => {
  try {
   if (prevCategoryTyped === "" || newCategoryTyped === "") window.alert("Please Specify Prev and New Category !!");
   else if (prevCategoryTyped === newCategoryTyped) window.alert("Prev and New Category Cannot be Same!!");
   else {
    const body = { prev_category_type: prevCategoryTyped, updated_category_type: newCategoryTyped };
    const res = await axios.patch(`http://localhost:5000/categories/update`, body);
    if (res.status === 202) {
     setPrevCategoryTyped("");
     setNewCategoryTyped("");
     closeEditCategoryModal();
     window.alert("Successfully Updated Category.");
    }
   }
  } catch (err) {
   window.alert("Category Cannot be Updated!!")
  }
 }
 const onEditSubCategory = async () => {
  try {
   if (prevSubCategoryTyped === "" || newSubCategoryTyped === "") window.alert("Please Specify Prev and New Sub-Category !!");
   else if (prevSubCategoryTyped === newSubCategoryTyped) window.alert("Prev and New Sub-Category Cannot be Same!!");
   else {
    const body = { prev_sub_category_type: prevSubCategoryTyped, updated_sub_category_type: newSubCategoryTyped };
    const res = await axios.patch(`http://localhost:5000/sub_categories/update`, body);
    if (res.status === 202) {
     setPrevSubCategoryTyped("");
     setNewSubCategoryTyped("");
     closeEditSubCategoryModal();
     window.alert("Successfully Updated Sub-Category.");
    }
   }
  } catch (err) {
   window.alert("Sub-Category Cannot be Updated!!")
  }
 }
 const onDeleteProduct = async () => {
  try {
   if (productCodeTyped === "") window.alert("Please Specify Product Code No.!!");
   else {
    const res = await axios.delete(`http://localhost:5000/products/delete?product_code_no=${productCodeTyped}`);
    if (res.status === 202) {
     setProductCodeTyped("");
     closeDeleteProductModal();
     window.alert("Successfully Deleted Product.");
    }
   }
  } catch (err) {
   window.alert("Product Cannot be Deleted!!")
  }
 }

 return (
  <div className='flex-grow overflow-auto h-screen top-0 left-0 bg-light_primary'>
   <div className='flex flex-row items-center justify-between p-6 m-2 border-2 border-dark_primary rounded-xl'>
    <h1 className='text-3xl font-bold text-black'>Settings</h1>
   </div>
   <div className='flex flex-col'>
    <div>
     <p className='text-lg mt-8 mx-8 px-2 font-bold opacity-60 mb-6'>Add / Create</p>
     <hr className='w-[96%] ml-6 border border-dark_primary bg-dark_primary' />
     <div className='flex flex-row items-center'>
      <div>
       <div className="mx-10 my-8">
        <button
         type="button"
         onClick={openModifyStockModal}
         className="px-4 py-2 text-lg font-semibold text-black bg-dark_primary rounded-md  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
         Add/Modify Stock
        </button>
       </div>

       <Transition appear show={isModifyStockOpen} as={Fragment}>
        <Dialog
         as="div"
         className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-30"
         onClose={closeModifyStockModal}
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
           <div className="inline-block w-full max-w-md p-6 my-8 text-center align-middle transition-all transform bg-light_primary rounded-2xl">
            <Dialog.Title
             as="h3"
             className="text-xl mt-6 mb-10 font-medium leading-6 text-gray-900"
            >
             Add/Modify Stock
            </Dialog.Title>
            <div className="flex flex-col items-center mt-2">
             <div className='flex flex-row justify-start items-center w-100'>
              <div className='flex flex-col mr-4'>
               <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Product Code">Product Code*</label>
               <input type="text" label="Product Code" value={productCodeTyped} onChange={(e) => setProductCodeTyped(e.target.value.toUpperCase())} placeholder='Eg. PD001' className='w-full mb-4 p-2 rounded-xl border border-black' />
              </div>
              <button onClick={onFindStock} className='mt-5 w-2/6 text-lg p-2 rounded-xl border border-dark_primary bg-dark_primary'>Get Product</button>
             </div>
             <div className='flex flex-col'>
              <div className='flex flex-col'>
               <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Product Quantity">Product Quantity</label>
               <input type="number" min="0" label="Product Quantity" value={qtyTyped} onChange={(e) => setQtyTyped(e.target.value)} className='w-96 mb-4 p-2 rounded-xl border border-black' />
              </div>
              <div className='flex flex-col'>
               <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Product MRP">Product MRP</label>
               <input type="number" min="0" label="Product MRP" value={mrpTyped} onChange={(e) => setMrpTyped(e.target.value)} className='w-96 mb-4 p-2 rounded-xl border border-black' />
              </div>
             </div>
            </div>

            <div className="mt-4">
             <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-lg font-medium bg-dark_primary border border-dark_primary rounded-md hover:shadow-2xl focus:outline-none"
              onClick={onModifyStock}
             >
              Modify
             </button>
            </div>
           </div>
          </Transition.Child>
         </div>
        </Dialog>
       </Transition>
      </div>
      <div>
       <div className="mx-10 my-8">
        <button
         type="button"
         onClick={openAddCategoryModal}
         className="px-4 py-2 text-lg font-semibold text-black bg-dark_primary rounded-md  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
         Add/Create Category
        </button>
       </div>

       <Transition appear show={isAddCategoryOpen} as={Fragment}>
        <Dialog
         as="div"
         className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-30"
         onClose={closeAddCategoryModal}
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
           <div className="inline-block w-full max-w-md p-6 my-8 text-center align-middle transition-all transform  bg-light_primary shadow-xl rounded-2xl">
            <Dialog.Title
             as="h3"
             className="mb-10 mt-6 text-xl font-semibold leading-6"
            >
             Add/Create Category
            </Dialog.Title>
            <div className="mt-2">
             <div className='flex flex-col'>
              <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Product Category">New Product Category</label>
              <input type="text" label="Product Category" value={categoryTyped} onChange={(e) => setCategoryTyped(e.target.value.toUpperCase())} className='w-96 mb-4 p-2 rounded-xl border border-black' />
             </div>
            </div>
            <div className="mt-4">
             <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md bg-dark_primary hover:shadow-xl focus:outline-none"
              onClick={onAddCategory}
             >
              Add
             </button>
            </div>
           </div>
          </Transition.Child>
         </div>
        </Dialog>
       </Transition>
      </div>
      <div>
       <div className="mx-10 my-8">
        <button
         type="button"
         onClick={openAddSubCategoryModal}
         className="px-4 py-2 text-lg font-semibold text-black bg-dark_primary rounded-md  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
         Add/Create Sub-Category
        </button>
       </div>

       <Transition appear show={isAddSubCategoryOpen} as={Fragment}>
        <Dialog
         as="div"
         className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-30"
         onClose={closeAddSubCategoryModal}
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
           <div className="inline-block w-full max-w-md p-6 my-8 text-center align-middle transition-all transform bg-light_primary shadow-xl rounded-2xl">
            <Dialog.Title
             as="h3"
             className="mb-10 mt-6 text-xl font-semibold leading-6"
            >
             Add/Create Sub-Category
            </Dialog.Title>
            <div className="mt-2">
             <div className='flex flex-col'>
              <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Product Sub-Category">New Product Sub-Category</label>
              <input type="text" label="Product Sub-Category" value={subCategoryTyped} onChange={(e) => setSubCategoryTyped(e.target.value.toUpperCase())} className='w-96 mb-4 p-2 rounded-xl border border-black' />
             </div>
            </div>

            <div className="mt-4">
             <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-semibold rounded-md bg-dark_primary hover:shadow focus:outline-none"
              onClick={onAddSubCategory}
             >
              Add
             </button>
            </div>
           </div>
          </Transition.Child>
         </div>
        </Dialog>
       </Transition>
      </div>
     </div>
    </div>
    <div>
     <p className='text-lg mt-8 mx-8 px-2 font-bold opacity-60 mb-6'>Edit / Modify</p>
     <hr className='w-[96%] ml-6 border border-dark_primary bg-dark_primary' />
     <div className='flex flex-row items-center'>
      <div>
       <div className="mx-10 my-8">
        <button
         type="button"
         onClick={openEditCategoryModal}
         className="px-4 py-2 text-lg font-semibold text-black bg-dark_primary rounded-md  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
         Edit Category
        </button>
       </div>

       <Transition appear show={isEditCategoryOpen} as={Fragment}>
        <Dialog
         as="div"
         className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-30"
         onClose={closeEditCategoryModal}
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
           <div className="inline-block w-full max-w-md p-6 my-8 text-center align-middle transition-all transform bg-light_primary shadow-xl rounded-2xl">
            <Dialog.Title
             as="h3"
             className="mb-10 mt-6 text-xl font-semibold leading-6"
            >
             Edit Category
            </Dialog.Title>
            <div className="mt-2">
             <div className='flex flex-col'>
              <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Previous Category">Previous Category*</label>
              <input type="text" label="Previous Category" value={prevCategoryTyped} required onChange={(e) => setPrevCategoryTyped(e.target.value.toUpperCase())} placeholder='' className='w-96 mb-4 p-2 rounded-xl border border-black' />
             </div>
             <div className='flex flex-col'>
              <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="New Category">New Category*</label>
              <input type="text" label="New Category" value={newCategoryTyped} required onChange={(e) => setNewCategoryTyped(e.target.value.toUpperCase())} placeholder='' className='w-96 mb-4 p-2 rounded-xl border border-black' />
             </div>
            </div>

            <div className="mt-4">
             <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-semibold rounded-md bg-dark_primary hover:shadow focus:outline-none"
              onClick={onEditCategory}
             >
              Edit
             </button>
            </div>
           </div>
          </Transition.Child>
         </div>
        </Dialog>
       </Transition>
      </div>
      <div>
       <div className="mx-10 my-8">
        <button
         type="button"
         onClick={openEditSubCategoryModal}
         className="px-4 py-2 text-lg font-semibold text-black bg-dark_primary rounded-md  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
         Edit Sub-Category
        </button>
       </div>

       <Transition appear show={isEditSubCategoryOpen} as={Fragment}>
        <Dialog
         as="div"
         className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-30"
         onClose={closeEditSubCategoryModal}
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
           <div className="inline-block w-full max-w-md p-6 my-8 text-center align-middle transition-all transform bg-light_primary shadow-xl rounded-2xl">
            <Dialog.Title
             as="h3"
             className="mb-10 mt-6 text-xl font-semibold leading-6"
            >
             Edit Sub-Category
            </Dialog.Title>
            <div className="mt-2">
             <div className='flex flex-col'>
              <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Previous Sub-Category">Previous Sub-Category*</label>
              <input type="text" label="Previous Sub-Category" value={prevSubCategoryTyped} required onChange={(e) => setPrevSubCategoryTyped(e.target.value.toUpperCase())} placeholder='' className='w-96 mb-4 p-2 rounded-xl border border-black' />
             </div>
             <div className='flex flex-col'>
              <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="New Sub-Category">New Sub-Category*</label>
              <input type="text" label="New Sub-Category" value={newSubCategoryTyped} required onChange={(e) => setNewSubCategoryTyped(e.target.value.toUpperCase())} placeholder='' className='w-96 mb-4 p-2 rounded-xl border border-black' />
             </div>
            </div>

            <div className="mt-4">
             <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-semibold rounded-md bg-dark_primary hover:shadow focus:outline-none"
              onClick={onEditSubCategory}
             >
              Edit
             </button>
            </div>
           </div>
          </Transition.Child>
         </div>
        </Dialog>
       </Transition>
      </div>
     </div>
    </div>
    <div>
     <p className='text-lg mt-8 mx-8 px-2 font-bold opacity-60 mb-6'>Delete / Remove</p>
     <hr className='w-[96%] ml-6 border border-dark_primary bg-dark_primary' />
     <div className='flex flex-row items-center'>
      <div>
       <div className="mx-10 my-8">
        <button
         type="button"
         onClick={openDeleteProductModal}
         className="px-4 py-2 text-lg font-semibold text-black bg-dark_primary rounded-md  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
         Delete Product
        </button>
       </div>

       <Transition appear show={isDeleteProductOpen} as={Fragment}>
        <Dialog
         as="div"
         className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-30"
         onClose={closeDeleteProductModal}
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
           <div className="inline-block w-full max-w-md p-6 my-8 text-center align-middle transition-all transform bg-light_primary shadow-xl rounded-2xl">
            <Dialog.Title
             as="h3"
             className="mb-10 mt-6 text-xl font-semibold leading-6"
            >
             Delete Product
            </Dialog.Title>
            <div className="mt-2">
             <div className='flex flex-col'>
              <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Product Code ">Product Code *</label>
              <input type="text" label="Product Code " value={productCodeTyped} required onChange={(e) => setProductCodeTyped(e.target.value.toUpperCase())} placeholder='' className='w-96 mb-4 p-2 rounded-xl border border-black' />
             </div>
            </div>

            <div className="mt-4">
             <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-semibold rounded-md bg-dark_primary hover:shadow focus:outline-none"
              onClick={onDeleteProduct}
             >
              Delete
             </button>
            </div>
           </div>
          </Transition.Child>
         </div>
        </Dialog>
       </Transition>
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}

export default Settings
