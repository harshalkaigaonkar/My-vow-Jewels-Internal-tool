import React, { useState, Fragment, useEffect } from 'react'
import axios from 'axios';
import { Listbox, Transition, Dialog } from '@headlessui/react'
import { SelectorIcon, SearchIcon, PlusCircleIcon, CheckIcon } from '@heroicons/react/solid'
import Temptable from '../../components/Temptable';
import Loading from '../../components/Loading';



const Inventory = () => {

  document.title = "My Vow Jewels LLP | Stock Inventory"
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({ category_type: "Categories" })
  const [selectedSubCategory, setSelectedSubCategory] = useState({ sub_category_type: "Sub-Categories" })
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  // FORM FIELDS
  const [productCode, setProductCode] = useState("");
  const [goldKt, setGoldKt] = useState("0");
  const [stamp, setStamp] = useState("0");
  const [grossWt, setGrossWt] = useState("0.000");
  const [goldWt, setGoldWt] = useState("0.000");
  const [diaPcs, setDiaPcs] = useState("0");
  const [diaWt, setDiaWt] = useState("0.000");
  const [diaQt, setDiaQt] = useState("");
  const [color, setColor] = useState("");
  const [qty, setQty] = useState("0");
  const [karigarName, setKarigarName] = useState("");
  const [mrp, setMrp] = useState("0");
  const [certificate, setCertificate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [prodImg, setProdImg] = useState({ raw: "" });

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/categories/get?type=all');
        if (res.status === 200) {
          setCategories(res.data.data);
        }
      } catch (err) {
        window.alert('Categories Not Found!!, Add them from Settings Tab.')
      }
    }
    const getSubCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/sub_categories/get?type=all');
        if (res.status === 200) {
          setSubCategories(res.data.data);
        }
      } catch (err) {
        window.alert('Sub-Categories Not Found!!, Add them from Settings Tab.');
      }
    }
    const getProductFunc = async () => {
      try {
        const res = await axios.get('http://localhost:5000/products/get?type=all');
        if (res.status === 200) {
          setData(res.data.data);
        }
      } catch (err) {
        window.alert("No Products Found!!, Add them using Add Button.")
      }
    };
    getProductFunc();
    getCategories();
    getSubCategories();
  }, [setCategories, setSubCategories, setData]);

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const onSearchChange = (e) =>
    setSearch(e.target.value.toUpperCase());

  const onFindHandler = async () => {
    if (selectedCategory.category_type === "Categories") window.alert('Select Categories!!');
    else if (selectedSubCategory.sub_category_type === "Sub-Categories") window.alert('Select Sub-Categories!!');
    else {
      setData(null);
      try {
        const res = await axios.get(`http://localhost:5000/products/get?type=category&category_type=${selectedCategory.category_type}&sub_category_type=${selectedSubCategory.sub_category_type}`);
        if (res.status === 200) {
          console.log(res.data.data);
          setData(res.data.data);
        }
      } catch (err) {
        window.alert(err.message);
      }
    }
  };

  const onImgAttached = (e) => {
    if (e.target.files.length) {
      setProdImg({
        raw: e.target.files[0]
      });
      console.log(prodImg)
    }
  }

  const onAddProduct = async (e) => {
    e.preventDefault();
    const productForm = new FormData();
    productForm.append('product_image', prodImg.raw)
    productForm.append('product_code_no', productCode);
    productForm.append('product_category', selectedCategory._id);
    productForm.append('product_sub_category', selectedSubCategory._id);
    productForm.append('product_gold_kt', goldKt);
    productForm.append('product_stamp', stamp);
    productForm.append('product_gross_wt', grossWt);
    productForm.append('product_gold_wt', goldWt);
    productForm.append('product_dia_pcs', diaPcs);
    productForm.append('product_dia_wt', diaWt);
    productForm.append('product_dia_qt', diaQt);
    productForm.append('product_color', color);
    productForm.append('product_qty', qty);
    productForm.append('product_karigar_name', karigarName);
    productForm.append('product_mrp', mrp);
    productForm.append('product_certificate_no', certificate);
    try {
      const res = await axios.post('http://localhost:5000/products/add', productForm);
      if (res.status === 201) {
        setProdImg({ raw: "" });
        setProductCode("");
        setGoldKt("0");
        setStamp("0");
        setGrossWt("0.000");
        setGoldWt("0.000");
        setDiaPcs("0");
        setDiaWt("0.000");
        setDiaQt("");
        setColor("");
        setQty("0");
        setKarigarName("");
        setMrp("0");
        setCertificate("");
        window.alert("Successfully Added Product")
        closeModal();
        window.location.assign('/inventory-stock');
        return;
      }
    } catch (err) {
      window.alert("Product Can't be Added!!")
    }
  }

  const settings = {
    code_settings: {
      title: "Product Code",
      readOnly: true
    },
    image_settings: {
      title: "Product Image",
      readOnly: true,
    },
    gold_kt_settings: {
      title: "Gold Kt.",
      readOnly: true
    },
    stamp_settings: {
      title: "Stamp",
      readOnly: true
    },
    gross_wt_settings: {
      title: "Gross Weight",
      readOnly: true
    },
    gold_wt_settings: {
      title: "Gold Weight",
      readOnly: true
    },
    dia_pcs_settings: {
      title: "Dia Pieces",
      readOnly: true
    },
    dia_wt_settings: {
      title: "Dia Weight",
      readOnly: true
    },
    dia_qt_settings: {
      title: "Dia Qty",
      readOnly: true
    },
    color_settings: {
      title: "Color",
      readOnly: true
    },
    qty_settings: {
      title: "Quantity",
      readOnly: true
    },
    karigar_name_settings: {
      title: "Karigar Name",
      readOnly: true
    },
    // total_gold_wt_settings : {
    //  title: "Total Gold Wt.",
    //  readOnly: true
    // },
    // total_dia_wt_settings : {
    //  title: "Total Dia Wt.",
    //  readOnly: true
    // },
    mrp_settings: {
      title: "MRP",
      readOnly: true
    },
    // total_amt_settings : {
    //  title: "Total Amt.",
    //  readOnly: true
    // },
    certificate_settings: {
      title: "Certificate",
      readOnly: true
    },
  }

  return (
    <>
      <div className='flex-grow overflow-auto h-screen top-0 left-0 bg-light_primary'>
        <div className='flex flex-row items-center justify-between p-6 m-2 border-2 border-dark_primary rounded-xl'>
          <h1 className='text-3xl font-bold text-black'>Inventory</h1>
          <div className="flex flex-row top-16">
            <Listbox value={selectedCategory} onChange={setSelectedCategory}>
              <div className="relative z-40 mt-1">
                <Listbox.Button className="relative w-40 mr-10 py-2 pl-3 pr-10 text-left bg-dark_primary rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                  <span className="block truncate text-lg font-semibold text-black">{selectedCategory.category_type}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute w-[80%]  py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {categories ? categories.map((person, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `${active ? 'text-amber_900 bg-amber_100' : 'text-grey_900'}
                          cursor-default select-none relative z-0 py-2 pl-10 pr-4 `
                        }
                        value={person}
                      >
                        {({ selectedCategory }) => (
                          <>
                            <span
                              className={`${selectedCategory ? 'font-medium' : 'font-normal'
                                } block truncate font-semibold cursor-pointer`}
                            >
                              {person.category_type}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    )) : <Loading />}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            <Listbox value={selectedSubCategory} onChange={setSelectedSubCategory}>
              <div className="relative z-40 mt-1">
                <Listbox.Button className="relative w-40 py-2 pl-3 pr-10 text-left bg-dark_primary rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                  <span className="block truncate text-lg font-semibold text-black">{selectedSubCategory.sub_category_type}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {subCategories ? subCategories.map((person, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `${active ? 'text-amber_900 bg-amber_100' : 'text-grey_900'}
                          cursor-default select-none relative z-0 py-2 pl-10 pr-4 `
                        }
                        value={person}
                      >
                        {({ selectedSubCategory }) => (
                          <>
                            <span
                              className={`${selectedSubCategory ? 'font-medium' : 'font-normal'
                                } block truncate font-semibold cursor-pointer`}
                            >
                              {person.sub_category_type}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    )) : <Loading />}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            <div className='relative z-40 mt-1' >
              <button onClick={onFindHandler} className='mx-10 w-36 mr-10 py-2 px-8 flex flex-row items-center justify-evenly cursor-pointer rounded-xl text-center font-bold bg-dark_primary text-xl hover:shadow-xl'><span>Find</span><SearchIcon className='w-5 h-5' /></button>
            </div>
          </div>
        </div>
        <div className='flex flex-row justify-around items-center h-[80px]'>
          <div className='py-6 px-6 w-4/6 flex flex-row'>
            <input
              type="text"
              placeholder='Search Any Product'
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
                className="fixed inset-0 z-40 overflow-y-auto bg-black bg-opacity-30"
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
                        Product Details
                      </Dialog.Title>
                      <hr className='inline-block w-[95%] align-middle pb-5' />
                      <div className="w-full px-10 flex flex-col">
                        <div className='flex flex-col'>
                          <p className='text-center text-lg font-bold opacity-60 mb-6'>Primary Details</p>
                          <div className='flex flex-row justify-around items-center'>
                            <div className='flex flex-col'>
                              <div className='flex flex-col w-full'>
                                <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Product Category">Product Category*</label>
                                {/* className='w-96 mb-4 p-2 rounded-xl border border-black' */}
                                <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                                  <div className="relative mt-1">
                                    <Listbox.Button className="relative w-40 py-2 pl-3 pr-10 text-left bg-dark_primary rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                      <span className="block truncate text-lg font-semibold text-black">{selectedCategory.category_type}</span>
                                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <SelectorIcon
                                          className="w-5 h-5 text-gray-400"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    </Listbox.Button>
                                    <Transition
                                      as={Fragment}
                                      leave="transition ease-in duration-100"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <Listbox.Options className="absolute z-40 w-[80%]  py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {categories ? categories.map((person, personIdx) => (
                                          <Listbox.Option
                                            key={personIdx}
                                            className={({ active }) =>
                                              `${active ? 'text-amber_900 bg-amber_100' : 'text-grey_900'}
                          cursor-default select-none relative z-0 py-2 pl-10 pr-4 `
                                            }
                                            value={person}
                                          >
                                            {({ selectedCategory }) => (
                                              <>
                                                <span
                                                  className={`${selectedCategory ? 'font-medium' : 'font-normal'
                                                    } block truncate font-semibold cursor-pointer`}
                                                >
                                                  {person.category_type}
                                                </span>
                                                {selectedCategory ? (
                                                  <span
                                                    className={'text-black absolute inset-y-0 left-0 flex items-center pl-3'}
                                                  >
                                                    <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                  </span>
                                                ) : null}
                                              </>
                                            )}
                                          </Listbox.Option>
                                        )) : <Loading />}
                                      </Listbox.Options>
                                    </Transition>
                                  </div>
                                </Listbox>
                              </div>
                              <div className='flex flex-col'>
                                <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Product Sub-Category">Product Sub-Category*</label>
                                <Listbox value={selectedSubCategory} onChange={setSelectedSubCategory}>
                                  <div className="relative mt-1">
                                    <Listbox.Button className="relative w-40 py-2 pl-3 pr-10 text-left bg-dark_primary rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                      <span className="block truncate text-lg font-semibold text-black">{selectedSubCategory.sub_category_type}</span>
                                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <SelectorIcon
                                          className="w-5 h-5 text-gray-400"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    </Listbox.Button>
                                    <Transition
                                      as={Fragment}
                                      leave="transition ease-in duration-100"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <Listbox.Options className="absolute z-40 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {subCategories ? subCategories.map((person, personIdx) => (
                                          <Listbox.Option
                                            key={personIdx}
                                            className={({ active }) =>
                                              `${active ? 'text-amber_900 bg-amber_100' : 'text-grey_900'}
                          cursor-default select-none relative z-0 py-2 pl-10 pr-4 `
                                            }
                                            value={person}
                                          >
                                            {({ selectedSubCategory }) => (
                                              <>
                                                <span
                                                  className={`${selectedSubCategory ? 'font-medium' : 'font-normal'
                                                    } block truncate font-semibold cursor-pointer`}
                                                >
                                                  {person.sub_category_type}
                                                </span>
                                              </>
                                            )}
                                          </Listbox.Option>
                                        )) : <Loading />}
                                      </Listbox.Options>
                                    </Transition>
                                  </div>
                                </Listbox>
                              </div>
                            </div>
                            <div className='flex flex-col'>
                              <div className='flex flex-col'>
                                <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Product Image">Product Image</label>
                                <input type="file" label="Product Image" onChange={onImgAttached} className='w-full mb-4 p-2 rounded-xl border border-black bg-white' />
                              </div>
                              <div className='flex flex-col'>
                                <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Product Code">Product Code*</label>
                                <input type="text" label="Product Code" value={productCode} onChange={(e) => setProductCode(e.target.value.toUpperCase())} placeholder='Eg. PD001' className='w-96 mb-4 p-2 rounded-xl border border-black' />
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className='inline-block w-full align-middle pb-5' />
                        <p className='text-center text-lg font-bold opacity-60 mb-6'>Secondary Details</p>
                        <div className='flex flex-row justify-around items-center'>
                          <div className='flex flex-col'>
                            <div className='flex flex-col'>
                              <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Gold Kt.">Gold Kt.</label>
                              <input type="number" min="0" required label="Gold Kt." value={goldKt} onChange={(e) => setGoldKt(e.target.value)} className='w-96 mb-4 p-2 rounded-xl border border-black' />
                            </div>
                            <div className='flex flex-col'>
                              <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Stamp">Stamp</label>
                              <input type="number" min="0" label="Stamp" value={stamp} onChange={(e) => setStamp(e.target.value)} className='w-96 mb-4 p-2 rounded-xl border border-black' />
                            </div>
                            <div className='flex flex-col'>
                              <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Gross Wt.">Gross Wt.</label>
                              <input type="number" min="0" step=".001" label="Gross Wt." value={grossWt} onChange={(e) => setGrossWt(e.target.value)} className='w-96 mb-4 p-2 rounded-xl border border-black' />
                            </div>
                            <div className='flex flex-col'>
                              <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Gold Wt.">Gold Wt.</label>
                              <input type="number" min="0" step=".001" label="Gold Wt." value={goldWt} onChange={(e) => setGoldWt(e.target.value)} className='w-96 mb-4 p-2 rounded-xl border border-black' />
                            </div>
                            <div className='flex flex-col'>
                              <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Diamond Pcs.">Diamond Pcs.</label>
                              <input type="number" min="0" label="Diamond Pcs." value={diaPcs} onChange={(e) => setDiaPcs(e.target.value)} className='w-96 mb-4 p-2 rounded-xl border border-black' />
                            </div>
                            <div className='flex flex-col'>
                              <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Diamond Wt.">Diamond Wt.</label>
                              <input type="number" min="0" step=".001" label="Diamond Wt." value={diaWt} onChange={(e) => setDiaWt(e.target.value)} className='w-96 mb-4 p-2 rounded-xl border border-black' />
                            </div>
                          </div>
                          <div>
                            <div className='flex flex-col'>
                              <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Diamond Qt.">Diamond Qt.</label>
                              <input type="text" label="Diamond Qt." value={diaQt} onChange={(e) => setDiaQt(e.target.value.toUpperCase())} className='w-96 mb-4 p-2 rounded-xl border border-black' />
                            </div>
                            <div className='flex flex-col'>
                              <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Color">Color</label>
                              <input type="text" label="Color" value={color} onChange={(e) => setColor(e.target.value.toUpperCase())} className='w-96 mb-4 p-2 rounded-xl border border-black' />
                            </div>
                            <div className='flex flex-col'>
                              <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Quantity">Quantity</label>
                              <input required type="number" min="0" label="Quantity" value={qty} onChange={(e) => setQty(e.target.value)} className='w-96 mb-4 p-2 rounded-xl border border-black' />
                            </div>
                            <div className='flex flex-col'>
                              <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Karigar Name">Karigar Name</label>
                              <input type="text" label="Karigar Name" value={karigarName} onChange={(e) => setKarigarName(e.target.value.toUpperCase())} className='w-96 mb-4 p-2 rounded-xl border border-black' />
                            </div>
                            <div className='flex flex-col'>
                              <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="MRP">MRP</label>
                              <input required type="number" min="0" step=".01" label="MRP" value={mrp} onChange={(e) => setMrp(e.target.value)} className='w-96 mb-4 p-2 rounded-xl border border-black' />
                            </div>
                            {/* <div className='flex flex-col'>
                            <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Total Amt.">Total Amt.</label>
                            <input required type="number" min="0" step=".01" label="Total Amt." value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} className='w-96 mb-4 p-2 rounded-xl border border-black' />
                          </div> */}
                            <div className='flex flex-col'>
                              <label className='my-2 text-left text-black font-semibold text-sm' htmlFor="Certificate No.">Certificate No.</label>
                              <input type="text" label="Certificate No." value={certificate} onChange={(e) => setCertificate(e.target.value.toUpperCase())} className='w-96 mb-4 p-2 rounded-xl border border-black' />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-xl font-bold text-black bg-dark_primary rounded-xl hover:shadow-xl"
                          onClick={onAddProduct}
                        >
                          Add Product
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
          <h2 className='text-xl ml-10 my-4 font-bold'>All Products</h2>
          <div className='mr-20'>
            <p>Showing <span className='font-semibold w-2/12'>{data ? data.filter((product) => {
              if (search === "") return product;
              else return product.product_code_no.includes(search);
            }).length : "-"}</span> Results</p>
          </div>
        </div>
        <div className='relative z-10 overflow-y-auto h-[68%] mx-4 my-2'>
          {(data) ?
            <>
              <Temptable data={data.filter((product) => {
                if (search === "") return product;
                else return product.product_code_no.includes(search);
              })} type="inventory" settings={settings} className='border-2 border-dark_primary' />
            </>
            :
            <Loading />}
        </div>
      </div >
    </>
  )
}

export default Inventory
