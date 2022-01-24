import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Signin from './pages/Auth/Signin';
import GstDetails from './pages/Gst-Details/GstDetails';
import Inventory from './pages/Inventory/Inventory';
import NotFound from './pages/NotFound/NotFound';
import Settings from './pages/Settings/Settings';
import Bills from './pages/Bills/Bills';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={
          <>
            <Navigate to='/signin' />
          </>
        } />
        <Route path="/signin" element={
          <>
            <Signin />
          </>
        } />
        <Route path="/inventory-stock" element={
          <div className='flex flex-row'>
            <Sidebar page="inventory-stock" />
            <Inventory />
          </div>
        } />
        <Route path="/bills" element={
          <div className='flex flex-row'>
            <Sidebar page="bills" />
            <Bills />
          </div>
        } />
        <Route path="/gst-details" element={
          <div className='flex flex-row'>
            <Sidebar page="gst-details" />
            <GstDetails />
          </div>
        } />
        <Route path="/settings" element={
          <div className='flex flex-row'>
            <Sidebar page="settings" />
            <Settings />
          </div>
        } />
        <Route path="*" element={
          <>
            <NotFound />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
