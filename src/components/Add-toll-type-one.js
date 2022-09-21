import React from "react";
import { useState,useEffect} from "react";
const Addtolltypeone = ({onadd}) => {
    const[vehicletype,updvehtype] = useState('');
    const[singlejourney,updsingle] = useState(0);
    const[returnjourney,updreturn] = useState(0);
    useEffect(()=>
    {
         if(vehicletype !== '' && singlejourney !== 0 && returnjourney !== 0)
         {
            onadd({vehicletype,singlejourney,returnjourney})
         }
    },[vehicletype,singlejourney,returnjourney]
    )
    return (
         <div className='fare'>
                    <div className='vehicle-type'>
                        <div className='vehicle-type-child'>
                         <select name="select vehicle type" value={vehicletype} onChange={(e)=>updvehtype(e.target.value)} className='tollheadnext' required>
                            <option value="">Select vehicle type</option>
                            <option value="Car/Jeep/Van">Car/Jeep/Van</option>
                            <option value="LCV">LCV</option>
                            <option value="Truck/Bus">Truck/Bus</option>
                            <option value="Heavy Vehicle">Heavy Vehicle</option>
                         </select>
                         </div>
                         <div className='vehicle-type-child'>
                            <input type="number" className='tollheadnext' placeholder='Single Journey' required onChange={(e)=>updsingle(e.target.value)}></input>
                         </div>
                         <div className='vehicle-type-child'>
                            <input type="number" className='tollheadnext' placeholder='Return Journey' required  onChange={(e)=>updreturn(e.target.value)}></input>
                         </div>
                  </div>
             </div>
    )
}

export default Addtolltypeone;