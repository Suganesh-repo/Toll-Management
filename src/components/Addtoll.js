import './Addtoll.css'
import '../index.css'
import React, { useEffect } from 'react';
import { useState } from 'react';
import Addtolltypeone from './Add-toll-type-one';
import Button from './Button';
const Addtoll = ({closeaddt}) =>
{
    const[toll,updtoll] = useState('');
    // const[vehicletype,updvehtype] = useState('');
    // const[singlejourney,updsingle] = useState(0);
    // const[returnjourney,updreturn] = useState(0);
    const [state, setState] = useState([]);
    useEffect(()=>{

    },[localStorage.getItem("tolls")])
    // useEffect(()=>
    // {
    //     const toll_val = toll
    //     if(state.length === 4)
    //     {
    //         localStorage.setItem(toll_val,JSON.stringify(state));
           
    //     }
    // },[state],toll)
    // const[state,setState] = useState(new Map());
//     useEffect((toll,vehicletype,singlejourney,returnjourney,state) => {
//     if(toll !== '' && vehicletype !== '' && singlejourney !== 0 && returnjourney !== 0)
//     {
//         const nt = {toll,vehicletype,singlejourney,returnjourney};
//         setState([...state,nt]);
//         updvehtype('');
//         updreturn(0);
//         updsingle(0);
//     }
// });
   const onaddone = (t) =>{
    setState(state.filter((state) => state.vehicletype !== t.vehicletype))
    console.log(state)
    const id = Math.floor(Math.random() * 10000)+1;
    const nt = {id,toll,...t};
    setState(st => [...st,nt]);
   }
  
//    const onaddtwo = (t) => {
//     const id = Math.floor(Math.random() * 10000)+1;
//     const nt = {id,toll,...t};
//     setState([...state,nt]);
//    }
    const onsub = () =>{
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