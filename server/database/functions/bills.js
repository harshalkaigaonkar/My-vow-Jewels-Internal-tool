const bills = require("../../models/bills");

exports.get_bills_all = async () => {
 try {
  const all_bills = await bills.find({}).populate({ path: 'items.product', select: 'product_code_no' }).sort({ createdAt: "-1" }).limit(100);
  if (!all_bills) return [203, "Not Found!", "There Isn't Any Bill Present!"];
  return [200, all_bills, "Successfully Fetched Bills."];
 } catch (err) {
  console.error(err.message);
  return [500, err.message, "Server Error!"];
 }
};

exports.get_bills_based_on_timeline = async (date, month, year) => {
 if (year === "" ||
  year === undefined ||
  year === null)
  return [400, "Bad Request!", "Specify Date Correctly"];
 try {
  let bill = [];
  if (year !== undefined && year !== null && month === undefined && month === null && date === undefined && date === null) {
   bill = await bills.find({
    creation_date: {
     $gte: `${year}-01-01`,
     $lt: `${parseInt(year) + 1}-01-01`
    }
   });
  } else if (month !== undefined && month !== null && date === undefined && date === null) {
   bill = await bills.find({
    creation_date: {
     $gte: `${year}-${month}-01`,
     $lt: `${year}-${parseInt(month) + 1}-01`
    }
   });
  } else {
   if (date !== undefined && date !== null) {
    bill = await bills.find({
     creation_date: {
      $gte: `${year}-${month}-${date}`,
      $lt: `${year}-${month}-${parseInt(date) + 1}`
     }
    });
   }
  }
  if (bill === []) return [203, "Not Found!", "There Isn't Any Bill Present!"];
  return [200, bill, "Successfully Fetched Bills"];
 } catch (err) {
  console.error(err.message);
  return [500, err.message, "Server Error!"];
 }
}

exports.get_bill_once = async (bill_no) => {
 if (bill_no === "" ||
  bill_no === undefined ||
  bill_no === null)
  return [400, "Bad Request!", "Specify Bill Number Correctly"];
 try {
  const bill = await bills.findOne({ bill_no }).populate({ path: 'items.product' }).sort({ createdAt: '-1' });
  if (!bill)
   return [203, "Not Found!", "There Isn't Any Bills Present!"];
  return [200, bill, "Successfully Fetched Bill."];
 } catch (err) {
  console.error(err.message);
  return [500, err.message, "Server Error!"];
 }
}

exports.add_bill = async (bill_details) => {
 if (bill_details === {} ||
  bill_details === null
 )
  return [400, "Bad Request!", "Specify Bill Correctly"];
 const bill_count = await bills.count({});
 bill_details.bill_no = bill_count + 1;
 const check_bill = await this.get_bill_once(bill_details.bill_no);
 if (check_bill[0] === 200) return [409, "Already Exists!", "Bill Exists in the Database!"];
 if (check_bill[0] === 400 || check_bill[0] == 500) return [403, "Can't Be Added!", "Bill cannot be added in the Database!"];
 try {
  const new_bill = new bills(bill_details);
  await new_bill.save();
  return [201, new_bill, "Successfully Created New Bill."];
 } catch (err) {
  console.error(err.message);
  return [500, err.message, "Server Error!"];
 }
};

exports.update_bill = async (bill_no_to_change, updated_bill_details) => {
 if (bill_no_to_change === null ||
  bill_no_to_change === "" ||
  updated_bill_details === {} ||
  updated_bill_details === null)
  return [400, "Bad Request!", "Specify Bill Details Correctly"];

 const {
  customer_name,
  customer_phone,
  customer_place,
  items,
  total,
  cgst,
  sgst,
  igst,
  total_gst,
  advance,
  discount,
  grand_total
 } = updated_bill_details;

 // Build bill_fields Object

 let bill_fields = {};
 if (customer_name) bill_fields.customer_name = customer_name;
 if (customer_phone) bill_fields.customer_phone = customer_phone;
 if (customer_place) bill_fields.customer_place = customer_place;
 if (items) bill_fields.items = items;
 if (total) bill_fields.total = total;
 if (cgst) bill_fields.cgst = cgst;
 if (sgst) bill_fields.sgst = sgst;
 if (igst) bill_fields.igst = igst;
 if (total_gst) bill_fields.total_gst = total_gst;
 if (advance) bill_fields.advance = advance;
 if (discount) bill_fields.discount = discount;
 if (grand_total) bill_fields.grand_total = grand_total;

 try {
  const updated_bill = await bills.findOneAndUpdate({
   bill_no: bill_no_to_change
  },
   {
    $set: bill_fields
   },
   {
    new: true,
   }
  );
  if (!updated_bill) return [404, "Not Updated!", "Bill Doesn't Exist, and can't be updated"];
  return [202, updated_bill, "Successfully Updated Bill Details."];
 } catch (err) {
  console.error(err.message);
  return [500, err.message, "Server Error!"];
 }
};

exports.deleted_bill = async (bill_no) => {
 if (bill_no === "" ||
  bill_no === null)
  return [400, "Bad Request!", "Specify Bill Number Correctly"];
 try {
  const deleted_bill = await bills.findOneAndRemove({
   bill_no,
  });
  if (!deleted_bill) return [404, "Not Deleted!", "Bill Can't be Deleted!"];
  return [202, deleted_bill, "Successfully Deleted Bill."];
 } catch (err) {
  console.error(err.message);
  return [500, err.message, "Server Error!"];
 }
};