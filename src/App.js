import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Addtoll from './components/Addtoll';
import Homeheader from './components/HomeHeader';
import Buttonopt from './components/Button-op';
import { Route, Routes } from 'react-router-dom';
import Viewtolls from './components/Viewtolls';
function App() {
  const[addtoll,updateaddtoll] = useState(false);
  const onadd = () =>
  {
        updateaddtoll(true);
  }
  return (
    <div className='Main'>
        <Header/ >
        {/* <Buttonopt st_name="cd" content="Add Toll" onadd={onadd}/> */}
        {/* {addtoll ? (
        <div className="popupaddtoll">
          
         <Addtoll/>
        
        </div>
        ) : ( <div> </div>)} */}
        <Routes>
          <Route path='' element={<Homeheader />}></Route>
        {/* <Homeheader /> */}
           <Route path='/viewtolls' element={<Viewtolls />}></Route>
        </Routes>
    </div>
  );
}

export default App;
