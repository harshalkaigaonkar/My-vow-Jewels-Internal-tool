import React, { useState } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/solid';

const BillProducts = ({ index, items, totalMrp, setTotalMrp, apiItems, setApiItems }) => {

 const [productCode, setProductCode] = useState("");
 const [qty, setQty] = useState(1);
 const [wt, setWt] = useState(0.000);
 const [mrp, setMrp] = useState(0);

 const onChangeProductCode = (e) => {
  setProductCode(e.target.value.toUpperCase());
 }

 const onGetPrice = async () => {
  try {
   const res = await axios.get(`http://localhost:5000/products/get?type=once&product_code_no=${productCode}`);
   if (res.status === 200) {
    let data = res.data.data;
    let weight = parseFloat(data.product_gross_wt) + parseFloat(data.product_gold_wt) + parseFloat(data.product_dia_wt);
    let maxRetPrice = parseInt(data.product_mrp);
    setWt(weight);
    setMrp(maxRetPrice);
    let total_mrp = totalMrp + (qty * maxRetPrice);
    setTotalMrp(total_mrp);
    setApiItems(apiItems.concat({ product: data._id, product_code: data.product_code_no, qty: qty.toString(), amt: (qty * maxRetPrice).toString() }))
   }
  } catch (err) {
   window.alert("We are not able to find product with this Code!!");
  }
 }

 const onDeleteProduct = () => {
  console.log(index);
  let newItems = items;
  console.log(newItems);
  let arr = newItems.filter((item, ind) => ind !== index)
  console.log(arr);
  console.log(items);
  console.log(newItems);
 }

 return (
  <>
   <div className='flex flex-row items-center justify-evenly'>
    <div className='flex flex-col'>
     <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Product Code">Product Code*</label>
     <input type="text" label="Product Code" value={productCode} onChange={onChangeProductCode} placeholder='Eg. PD001' className='w-96 mb-4 p-2 rounded-xl border border-black' />
    </div>
    <div className='flex flex-col'>
     <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Product Quantity">Product Quantity*</label>
     <input type="number" min="1" step="any" label="Product Quantity" value={qty} onChange={(e) => setQty(e.target.value)} placeholder='' className='w-40 mb-4 p-2 rounded-xl border border-black' />
    </div>
    <div className='flex flex-col'>
     <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Product Weight">Product Weight*</label>
     <p className='w-40 mb-4 p-2 rounded-xl border border-black bg-white'>{wt}</p>
    </div>
    <div className='flex flex-col'>
     <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Product MRP">Product MRP</label>
     <p className='w-40 mb-4 p-2 rounded-xl border border-black bg-white'>{mrp}</p>
    </div>
    <div className='h-16 flex flex-row items-end justify-evenly'>
     <p onClick={onGetPrice} className='cursor-pointer p-2 text-lg font-semibold bg-dark_primary hover:shadow-xl rounded-xl'>Get Price</p>
     <p onClick={onDeleteProduct} className='cursor-pointer p-2 text-lg font-semibold bg-white hover:shadow-xl rounded-xl ml-2' ><TrashIcon className='w-7 h-7' /></p>
    </div>
   </div>
  </>
 );
};

export default BillProducts;
