import React, { useState } from 'react'


const Signin = () => {

  document.title = "My Vow Jewels LLP | Sign In"

  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");


  const onSigninHandler = (e) => {
    e.preventDefault();
    if (employeeId === "EMP001" && password === "Pass123")
      window.location = '/inventory-stock';
    else
      window.alert("Employee Id or Password is not correct!!")
  }
  return (
    <div className='w-screen h-screen bg-light_primary flex flex-col justify-start items-center'>
      <div>
        <p className='pt-16 pb-3 text-4xl font-semibold text-black'>Welcome to,</p>
        <p className='text-5xl font-bold text-black'>My Vow Jewels LLP</p>
        <div className='flex justify-center my-8'>
          <img src="logo.svg" alt="Logo" className="m-1 w-32 h-32 rounded-xl object-right" />
        </div>
      </div>
      <div className='flex flex-col'>
        <label className='my-4 text-black font-semibold' htmlFor="Employee Id">Your Employee Id</label>
        <input type="text" label="Employee Id" placeholder='Eg. Emp1234' className='w-96 mb-4 p-2 rounded-xl border border-black' value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
        <label className='my-4 text-black font-semibold' htmlFor="Password">Your Password</label>
        <input type="password" label="Password" placeholder='Eg. Pass1234' className='w-full mb-4 p-2 rounded-xl border border-black' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className='mt-8 p-2 bg-dark_primary hover:border hover:border-blue text-black rounded-xl font-bold' onClick={onSigninHandler}>Submit</button>
      </div>
    </div>
  )
}

export default Signin
