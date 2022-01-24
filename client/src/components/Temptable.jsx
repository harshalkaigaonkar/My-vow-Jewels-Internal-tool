import React from 'react'
import { HotColumn, HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css';

// register Handsontable's modules
registerAllModules();


const arrayBufferToBase64 = (buffer) => {
 let binary = '';
 let bytes = [].slice.call(new Uint8Array(buffer));
 bytes.forEach((b) => binary += String.fromCharCode(b));
 return window.btoa(binary);
};

const imgRenderer = (instance, td, row, col, prop, value, cellProperties) => {
 const img = document.createElement('IMG');

 if (value && value.contentType && value.data) {
  img.src = "data:" + value.contentType + ";base64," + arrayBufferToBase64(value.data.data);
 } else {
  img.src = 'no_image.png';
 }
 img.className = "w-32 h-32"
 img.addEventListener('mousedown', event => {
  event.preventDefault();
 });
 td.innerText = '';
 td.appendChild(img);
 return td;
}

// const headers = {
//  label: "Items",
//  colSpan: 8
// }

const Temptable = ({ data, type, settings }) => {
 return (
  <>
   {type === "inventory" ? (
    <HotTable
     data={data}
     rowHeaders={true}
     licenseKey='non-commercial-and-evaluation'
    >
     <HotColumn settings={settings.code_settings} data={'product_code_no'} />
     <HotColumn settings={settings.image_settings} data={'product_image'} renderer={imgRenderer} />
     <HotColumn settings={settings.gold_kt_settings} data={'product_gold_kt'} />
     <HotColumn settings={settings.stamp_settings} data={'product_stamp'} />
     <HotColumn settings={settings.gross_wt_settings} data={'product_gross_wt'} />
     <HotColumn settings={settings.gold_wt_settings} data={'product_gold_wt'} />
     <HotColumn settings={settings.dia_pcs_settings} data={'product_dia_pcs'} />
     <HotColumn settings={settings.dia_wt_settings} data={'product_dia_wt'} />
     <HotColumn settings={settings.dia_qt_settings} data={'product_dia_qt'} />
     <HotColumn settings={settings.color_settings} data={'product_color'} />
     <HotColumn settings={settings.qty_settings} data={'product_qty'} />
     <HotColumn settings={settings.karigar_name_settings} data={'product_karigar_name'} />
     {/* <HotColumn settings={settings.total_gold_wt_settings} data={'product_total_gold_wt'} />
    <HotColumn settings={settings.total_dia_wt_settings} data={'product_total_dia_wt'} /> */}
     <HotColumn settings={settings.mrp_settings} data={'product_mrp'} />
     {/* <HotColumn settings={settings.total_amt_settings} data={'product_total_amt'} /> */}
     <HotColumn settings={settings.certificate_settings} data={'product_certificate_no'} />
    </HotTable>
   ) : (
    <HotTable
     data={data}
     rowHeaders={true}
     licenseKey='non-commercial-and-evaluation'
    >
     <HotColumn settings={settings.bill_no_settings} data={'bill_no'} />
     <HotColumn settings={settings.item_settings} data={"items.length"} />
     <HotColumn settings={settings.date_settings} data={'creation_date'} />
     <HotColumn settings={settings.name_settings} data={'customer_name'} />
     <HotColumn settings={settings.phone_settings} data={'customer_phone'} />
     <HotColumn settings={settings.place_settings} data={'customer_place'} />
     <HotColumn settings={settings.total_mrp_settings} data={'total'} />
     <HotColumn settings={settings.cgst_settings} data={'cgst'} />
     <HotColumn settings={settings.sgst_settings} data={'sgst'} />
     <HotColumn settings={settings.igst_settings} data={'igst'} />
     <HotColumn settings={settings.total_gst_settings} data={'total_gst'} />
     <HotColumn settings={settings.advance_settings} data={'advance'} />
     <HotColumn settings={settings.discount_settings} data={'discount'} />
     <HotColumn settings={settings.grand_total_settings} data={'grand_total'} />
    </HotTable>
   )}
  </>
 )
}

export default Temptable

