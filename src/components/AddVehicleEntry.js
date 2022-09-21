import React, { useEffect } from "react";
import { useState } from "react";
import Button from "./Button";
const Addvehicle = ({closeaddv}) =>
{
    const[res,updres] = useState([])
    const[toll,updtoll] = useState([])
    const[toll_name,updtoll_name] = useState("");
    const[veh_type,updveh_type] = useState("");
    const[veh_number,updveh_number] = useState("");
    const[tariff,updtariff] = useState("");
    const[dat,upddat] = useState("");
    const[tim,updtim] = useState("");
    const[dattim,upddattim] = useState("");
    const[al_veh_num,updalvehnum] = useState([]);
    const[hr,updhrs] = useState(false);
    const[vehicles,updvehicles] = useState([]);
    const[temp,updtemp] = useState(false);
    const[isveh,upisveh] =useState(false);
    // useEffect(()=>
    // {
    //     const p = JSON.parse(localStorage.getItem(veh_number));
    //     if(p)
    //     {
    //     updalvehnum(p);
    //     }
    //     if(p)
    //     {
    //         console.log(toll_name)
    //         // updalvehnum(al_veh_num.filter((i)=>i.toll_name !== toll_name));
    //         al_veh_num.map((i) => {
    //             if(i.toll_name !== toll_name)
    //             {
    //                 console.log(i.toll_name)
    //                 const id = i.id;
    //                 const toll_name = i.toll_name;
    //                 const veh_number = i.veh_number;
    //                 const veh_type = i.veh_type;
    //                 const tariff = i.tariff;
    //                 const dat = i.dat;
    //                 const tim = i.tim;
    //                 const dattim = i.dattim;
    //                 const nt = {id,toll_name,veh_number,veh_type,tariff,dat,tim,dattim};
    //                 updres((st)=>[...st,nt]);
                    
    //                 console.log(res);
    //             }
    //         })
    //     }
    // },[veh_number])
    useEffect(()=>{
    const tol  = JSON.parse(localStorage.getItem('tolls'));
     updtoll(tol);
    },[localStorage.getItem('tolls')])
    useEffect(()=>{
        
        if(toll_name !== "" && veh_type !== "" && veh_number.length === 10)
        {
            
            const tt = JSON.parse(localStorage.getItem(veh_number))
            if(tt)
            {
              upisveh(true)
              tt.map((u)=>{
                if(u.toll_name === toll_name)
                {
                  updtemp(true);
                    var options = {hour12 : false}
                    const currdat = new Date().toLocaleDateString('en-us',options);
                    const existingdat = u.dat;
                    const currtim = new Date().toLocaleTimeString('en-us',options);
                    const existingtim = u.tim;
                    var hrs = 3
                    if(currdat === existingdat)
                    {
                         var start =  existingtim.split(':');
                         var end = currtim.split(':');
                         var startDate = new Date(0, 0, 0, start[0], start[1], start[2]);
                         var endDate = new Date(0, 0, 0, end[0], end[1], end[2]);
                         
                         var diff = endDate.getTime() - startDate.getTime();
                        
                         hrs = Math.abs(Math.floor(diff / 1000 / 60 / 60));
                         var minutes = Math.floor(diff / 1000 / 60);
                         var min = Math.abs(minutes);
                         diff -= minutes * (1000 * 60);
                         var seconds = Math.floor(diff / 1000);
                        console.log(hrs);
                        console.log(min)
                        console.log(seconds)
                        // if(hrs < 1)
                        // {
                        //      updhrs(true);
                        //      console.log(hr);
                        // }
                        // else if(hrs == 1)
                        // {
                        //     if(min == 0 && seconds == 0)
                        //     {
                        //         updhrs(true);
                        //         console.log(hr);
                        //     }
                        // }
                    }
                    const toll_tar = JSON.parse(localStorage.getItem(toll_name));
                    console.log(toll_tar);
                    toll_tar.map((t)=>{
                      if(t.vehicletype === veh_type)
                       {
                        
                          if(hrs < 1)
                          {
                          const tar_cal = t.returnjourney;
                          updtariff(tar_cal);
                          }
                          else if(hrs === 1)
                          {
                            if(min === 0 && seconds === 0)
                            {
                                const tar_cal = t.returnjourney;
                                updtariff(tar_cal);
                            }
                            else
                            {
                              updtariff(t.singlejourney);
                            }
                          }
                          else{
                            const tar_cal = t.singlejourney;
                            updtariff(tar_cal);
                          } 
                          
                          
                       }
                       
                    })
                }
                else{
                  console.log(toll_name);
                  const toll_tar = JSON.parse(localStorage.getItem(toll_name));
                  console.log(toll_tar);
                  if(toll_tar)
                  {
                  toll_tar.map((t)=>{
                    if(t.vehicletype === veh_type)
                     {
                        const tar_cal = t.singlejourney; 
                        updtariff(tar_cal);
                        
                     }
                  })
                }
                }
            
            })
            
        }
        else 
            {
                console.log(toll_name);
            const toll_tar = JSON.parse(localStorage.getItem(toll_name));
            console.log(toll_tar);
            toll_tar.map((t)=>{
              if(t.vehicletype === veh_type)
               {
                  const tar_cal = t.singlejourney; 
                  updtariff(tar_cal);
                  
               }
            })
            
            }
            
        }
        // if(veh_number.length === 10 && isveh === true)
        // {
        //   console.log(toll_name);
        //     const toll_tar = JSON.parse(localStorage.getItem(toll_name));
        //     console.log(toll_tar);
        //     if(toll_tar)
        //     {
        //     toll_tar.map((t)=>{
        //       if(t.vehicletype === veh_type)
        //        {
        //           const tar_cal = t.singlejourney; 
        //           updtariff(tar_cal);
                  
        //        }
        //     })
        //   }
        // }
            var options = {hour12 : false}
            const currDate = new Date().toLocaleDateString('en-us',options);
            upddat(currDate);
            const currTime = new Date().toLocaleTimeString('en-us',options);
            updtim(currTime)
            const currDatTime = currDate+","+currTime
            upddattim(currDatTime);
            // var start = currTime.split(":");
            // var end = "24:55:56".split(":");
            // var startDate = new Date(0, 0, 0, start[0], start[1], start[2]);
            // var endDate = new Date(0, 0, 0, end[0], end[1], end[2]);
            // var diff = endDate.getTime() - startDate.getTime();
            // var hours = Math.floor(diff / 1000 / 60 / 60);
            // diff -= hours * (1000 * 60 * 60);
            // var minutes = Math.floor(diff / 1000 / 60);
            // diff -= minutes * (1000 * 60);
            // var seconds = Math.floor(diff / 1000);
            // console.log(minutes)
            
         
    },[toll_name,veh_type,veh_number])
    // useEffect(()=>{
    //     updalvehnum(JSON.parse(localStorage.getItem(veh_number)));
    //     if(al_veh_num)
    //     {
    //         console.log(toll_name)
    //         // updalvehnum(al_veh_num.filter((i)=>i.toll_name !== toll_name));
    //         al_veh_num.map((i) => {
    //             if(i.toll_name !== toll_name)
    //             {
    //                 console.log(i.toll_name)
    //                 const id = i.id;
    //                 const toll_name = i.toll_name;
    //                 const veh_number = i.veh_number;
    //                 const veh_type = i.veh_type;
    //                 const tariff = i.tariff;
    //                 const dat = i.dat;
    //                 const tim = i.tim;
    //                 const dattim = i.dattim;
    //                 const nt = {id,toll_name,veh_number,veh_type,tariff,dat,tim,dattim};
    //                 if(res.length == 0)
    //                 {
    //                     updres(nt);
    //                 }
    //                 else{
    //                 updres(...res,nt);
    //                 }
    //                 console.log(res);
    //             }
    //         })
    //     }
    // },[veh_number])
    const subentry = () =>
    {
        // const pt = JSON.parse(localStorage.getItem(veh_number));
        // if(pt)
        // {
        //     console.log(toll_name)
        //     updalvehnum(pt);
        //     // updalvehnum(al_veh_num.filter((i)=>i.toll_name !== toll_name));
        //     al_veh_num.forEach((i) => {
        //         if(i.toll_name !== toll_name)
        //         {
        //             console.log(i.toll_name)
        //             const id = i.id;
        //             const toll_name = i.toll_name;
        //             const veh_number = i.veh_number;
        //             const veh_type = i.veh_type;
        //             const tariff = i.tariff;
        //             const dat = i.dat;
        //             const tim = i.tim;
        //             const dattim = i.dattim;
        //             const nt = {id,toll_name,veh_number,veh_type,tariff,dat,tim,dattim};
        //             if(res !== [])
        //             {
        //             updres((st)=>[...st,nt]);
        //             }
        //             else
        //             {
        //                 updres(nt);
        //             }
        //         }
        //     })
        // }
          const arr = [];
          const p = toll_name;
          const tt = JSON.parse(localStorage.getItem(veh_number))
          const id  = Math.floor(Math.random() * 10000)+1;
        //   if(tt)
        //   {
        //     tt.map((u)=>{
        //         if(u.toll_name === toll_name)
        //         {
        //             const toll_tar = JSON.parse(localStorage.getItem(toll_name));
        //             console.log(toll_tar);
        //             toll_tar.map((t)=>{
        //               if(t.vehicletype === veh_type)
        //                {
        //                   const tar_cal = t.returnjourney; 
        //                   updtariff(tar_cal);
                          
        //                }
        //         })
        //     }
        //   })
        // }
        //   updres(al_veh_num);
        //   console.log(res);
        const nt = {id,toll_name,veh_type,veh_number,tariff,dat,tim,dattim};
          if(tt)
          {
            // updres(res.filter((element) => p !== element.toll_name)); 
            // console.log(al_veh_num);
            
            
            // updalvehnum(al_veh_num.filter((k)=> k.toll_name !== p)) curr
            
            // al_veh_num.map((k)=>{
            //     if(k.toll_name !== toll_name)
            //     {
            //         updres(...res,k);
            //     }
            // })
            const nt = {id,toll_name,veh_type,veh_number,tariff,dat,tim,dattim};

            // const tc = tt.filter((t)=>t.toll_name !== toll_name)
            arr.push(...tt,nt);
          }
          else{
            arr.push(nt);
          }
          localStorage.setItem(veh_number,JSON.stringify(arr));
          const allveh = JSON.parse(localStorage.getItem("vehicles"));
          const ar = []
          if(allveh)
          {
                const tc = allveh.filter((t)=>t !== veh_number)
                ar.push(...tc,veh_number);
          }
          else
          {
            ar.push(veh_number);
          }
          localStorage.setItem("vehicles",JSON.stringify(ar));
          alert("Vehicle Entry Added Successfully")

    }
    return(
        <div className="popupstyle" style={{'width':'25%'}}>
        <div className='popupchild' style={{'width':'80%'}}>
        <div className="head">
        <h4>Add new vehicle <i className="fa fa-window-close" style={{'float':'right','cursor':'pointer'}} aria-hidden="true" onClick={closeaddv} ></i></h4>
            
        </div>
        {/* <form className='form-class' onSubmit={onsub}>
            <div className='tollname'>
                 <label>Toll Name</label>
                 <input type="text" value={toll} placeholder="Enter toll name" onChange={(e)=>updtoll(e.target.value)} className='tollhead' required></input>
            </div>
            <div>
                <p>Vehicle fare details</p>
            </div>
        </form> */}
        <form className="form-class" onSubmit={subentry}>
            <div className="tollname1">
                <div className="tollnamestyle">
                <label>Select toll name*</label>
                </div>
                <select type="select" name="select toll " className="tollheadnext" onChange={(e)=>{updtoll_name(e.target.value)}} required>
                <option value="">Select toll name</option>
                {toll && toll.map((element,idx) => {
                    
                    return(
                    
                        <option value={element} key={element}>{element}</option>
                      
                    )
                    
})}
</select>
               
        </div>
        <div className="tollname1">
            <div className="tollnamestyle">
             <label>Select Vehicle type*</label>
             </div>
             <select type="select" className="tollheadnext" required onChange={(e)=>{updveh_type(e.target.value)}}>
                <option value="">Select Vehicle type</option>
                <option value="Car/Jeep/Van">Car/Jeep/Van</option>
                <option value="LCV">LCV</option>
                <option value="Truck/Bus">Truck/Bus</option>
                <option value="Heavy Vehicle">Heavy Vehicle</option>
             </select>
        </div>

        <div className="tollname1">
             <div className="tollnamestyle">
             <label>Vehicle Number*(Length should be 10)</label>
             </div>
             <input type="text" placeholder="Enter your login id" className="tollheadnext" onChange={(e)=>updveh_number(e.target.value)} required minLength="10" maxLength="10"/>
        </div>

        <div className="tollname1">
            <div className="tollnamestyle">
            <label>Tariff*</label>
            </div>
            <input type="text" placeholder="Tariff Amount" className="tollheadnext" value={tariff} disabled required />
        </div>
        <Button st_name="btn" content="Add Entry"/>
       
        </form>
         </div> 
    </div>
    )
}
export default Addvehicle;