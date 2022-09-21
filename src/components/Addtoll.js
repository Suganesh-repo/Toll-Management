import './Addtoll.css'
import '../index.css'
import React, { useEffect } from 'react';
import { useState } from 'react';
import Addtolltypeone from './Add-toll-type-one';
import Button from './Button';
const Addtoll = ({closeaddt}) =>
{
    const[toll,updtoll] = useState('');
    const[car,upcar] = useState(false);
    const[lcv,uplcv] = useState(false);
    const[truck,uptruck] = useState(false);
    const[heavyveh,upheavyveh] = useState(false);
    const [state, setState] = useState([]);
    useEffect(()=>{

    },[localStorage.getItem("tolls")])
    
   const onaddone = (t) =>{
    if(t.vehicletype === "Car/Jeep/Van")
    {
        upcar(true);
    }
    else if(t.vehicletype === "LCV")
    {
        uplcv(true);
    }
    else if(t.vehicletype === "Truck/Bus")
    {
        uptruck(true);
    }
    else
    {
        upheavyveh(true);
    }
    setState(state.filter((state) => state.vehicletype !== t.vehicletype))
    console.log(state)
    const id = Math.floor(Math.random() * 10000)+1;
    const nt = {id,toll,...t};
    setState(st => [...st,nt]);
   }
  

    const onsub = () =>{
        if(car === true && truck === true && lcv === true && heavyveh === true)
        {
        const items = JSON.parse(localStorage.getItem('tolls'));
        const toll_value = toll;
        const arr = []
        if(items)
        {
            arr.push(...items,toll_value);
        }
        else{
            arr.push(toll_value);
        }
        localStorage.setItem(toll_value,JSON.stringify(state));
        localStorage.setItem('tolls',JSON.stringify(arr));
        alert("Toll Added Successfully");
    }
    else{
        alert("Vehicle Type should not be repetitive. Include all types to add toll");
    }
    }
    return (
        <div className="popupstyle">
            <div className='popupchild'>
            <div className="head">
            <h4 className='closebut'>Add new toll <i className="fa fa-window-close" style={{'float':'right','cursor':'pointer'}} aria-hidden="true" onClick={closeaddt} ></i></h4>
            

            </div>
            <form className='form-class' onSubmit={onsub}>
                <div className='tollname'>
                     <label>Toll Name</label>
                     <input type="text" value={toll} placeholder="Enter toll name" onChange={(e)=>updtoll(e.target.value)} className='tollhead' required></input>
                </div>
                <div>
                    <p>Vehicle fare details</p>
                <Addtolltypeone onadd={onaddone}/>
                <Addtolltypeone onadd={onaddone}/>
                <Addtolltypeone onadd={onaddone}/>
                <Addtolltypeone onadd={onaddone}/>
                <Button  st_name="btn" content="Add details" />
                </div>
            </form>
            
             </div> 
        </div>
    )
}
export default Addtoll;