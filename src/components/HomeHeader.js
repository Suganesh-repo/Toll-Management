import React, { useEffect, useState } from "react";
import Buttonopt from "./Button-op";
import Addtoll from "./Addtoll";
import Addvehicle from "./AddVehicleEntry";
import { Link } from "react-router-dom";
const Homeheader = () =>
{
    const[addtoll,updateaddtoll]  =  useState(false);
    const[addveh,updateaddveh] = useState(false);
    const[toll,updtoll] = useState(JSON.parse(localStorage.getItem("tolls")));
    const[all_veh,updall_veh] = useState(JSON.parse(localStorage.getItem("vehicles")));
    const[listveh,updlistveh] = useState([]);
    const[suggestions,setsuggesstion] = useState([]);
    const[text,settext] = useState("");
    useEffect(()=>{
        updtoll(JSON.parse(localStorage.getItem("tolls")))
    },[localStorage.getItem("tolls")])
    useEffect(()=>{
        console.log(suggestions)
         if(suggestions.length === 0)
         {
         document.getElementById("sug").style.display = "none";
         }
         else{
            document.getElementById("sug").style.display = "block";
         }
        //  if(suggestions !== [])
        //  {
        //  id.style.display = "block";
        //  }
        //  else{
        //     id.style.display = "none";
        //  }
    },[suggestions])
    useEffect(()=>{
        updlistveh([]);
        if(all_veh)
        {
        all_veh.map((t)=>{
            const t1 = JSON.parse(localStorage.getItem(t));
            if(t1)
            {
                t1.map((p)=>{
                    if(listveh)
                    {
                        updlistveh((listveh)=>[...listveh,p]);
                    }
                    else{
                        updlistveh(p);
                    }
                })
            }  
        })
        console.log(all_veh)
        console.log(listveh)
        }
    },[text === ""])
    const filterdata = ((p) =>
    {
        updlistveh([]);
        all_veh.map((t)=>{
            const t1 = JSON.parse(localStorage.getItem(t));
            if(t1)
            {
                t1.map((s)=>{
                    if(s.toll_name === p || p === "All")
                    {
                    if(listveh)
                    {
                        
                        updlistveh((listveh)=>[...listveh,s]);
                    }
                    else{
                        updlistveh(s);
                    }
                }
                })
            }  
        })
    
    })
    const onchangingtext = (text) =>{
           let matches = []
           if(text.length > 0)
           {
              matches = all_veh.filter((k)=>{
                const reg_ex = new RegExp(`${text}`,"gi")
                return k.match(reg_ex)
              })
           }
           console.log(matches)
           setsuggesstion(matches);
           console.log("suggesstion",suggestions);
           settext(text);
    }
    const changingtab = ((t) => {
        updlistveh([]);
        setsuggesstion([]);
        const t1 = JSON.parse(localStorage.getItem(t));
        if(t1)
        {
            t1.map((s)=>{
                
                if(listveh)
                {
                    
                    updlistveh((listveh)=>[...listveh,s]);
                }
                else{
                    updlistveh(s);
                }
         })
        }})
            
          
    const closeaddtoll = () =>
    {
        updateaddtoll(false);
    }
    const closeaddveh = () =>
    {
        updateaddveh(false);
    }
    return(
        <><div className="home-header-main">
            <div className="home-header-first">
                <p style={{ 'fontWeight': 'bold' }}>Toll entries/vehicle entries</p>
            </div>
            <div className="home-header-second">
                <i className={"fa fa-filter"} style={{ 'border': 'black' }}>
                </i>
                <div className="item">
                    <p onClick={()=>filterdata("All")}>All</p>
                    {toll && toll.map((t, idx) => <p onClick={()=>filterdata(t)} key={t}>{t}</p>

                    )}
                </div>
            </div>
            <div className="home-header-third">
                <div className="search-bar">
                    <i className="icon fa fa-search"></i>
                <input className="input-text" type="text" value={text} onChange={(e)=>onchangingtext(e.target.value)} placeholder="Search Vehicle" />
                   
                </div>
                
                 <div className="suggest" id="sug" style={{'display':'none'}}>
                {suggestions ? (suggestions.map((suggestion,idx)=>{
                    
                    return (
                    <div key={idx} className="suggest-style"><p onClick={()=>changingtab(suggestion)}>{suggestion}</p></div>
                 )
                 })):<div></div>} 
                 </div>
                </div>
            <div className="home-header-fourth">
                <Buttonopt st_name="but" content="Add Vehicle Entry" onadd={() => updateaddveh(true)} />
                <Buttonopt st_name="but" content="Add new toll" onadd={() => updateaddtoll(true)} />
                <Link to="/viewtolls"><Buttonopt st_name="but" content="View all tolls" /></Link>
            </div>

            {addtoll ? (
                <div className="popupaddtoll">

                    <Addtoll closeaddt ={closeaddtoll}/>

                </div>) : (<div></div>)}
            {addveh ? (
                <div className="popupaddtoll">
                    <Addvehicle closeaddv = {closeaddveh}/>
                </div>
            ) : (<div></div>)}

        </div>
        <div className="home-tab-view">
                <table>
                    <thead>
                        <tr>
                            <th>VEHICLE TYPE</th>
                            <th>VEHICLE NUMBER</th>
                            <th>DATE/TIME</th>
                            <th>TOLL NAME</th>
                            <th>TARIFF</th>
                        </tr>
                    </thead>
                    <tbody >
                               
                    {listveh.map((t, idx) => {
                        return(
                            <tr key={idx}>
                                <td>{t.veh_type}</td>
                                <td>{t.veh_number}</td>
                                <td>{t.dattim}</td>
                                <td>{t.toll_name}</td>
                                <td>{t.tariff}</td>
                            </tr>
                        )
                               
                            
                        
                    })}
                    </tbody>
                </table>
            </div></>
        
   )
}
export default Homeheader;