import Addtoll from "./Addtoll";
import Addvehicle from "./AddVehicleEntry";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Buttonopt from "./Button-op";
import { Link } from "react-router-dom";
const Viewtolls = () =>
{
    const[addtoll,updateaddtoll]  =  useState(false);
    const[addveh,updateaddveh] = useState(false);
    
    const[availabletoll,updavailabletoll] = useState(JSON.parse(localStorage.getItem("tolls")));
    // const[ltoll,updltoll] = useState([{}]);
    //const[temp,updtemp] = useState([]);
    const[deltoll,upddeltol] = useState(false);
    const[text,settext] = useState("");
    const[suggestions,updsuggestion] = useState([]);
    const[listtoll,upup] = useState([]);
    const kero = useRef([]);
    useEffect(()=>
    { 
        
        if(availabletoll)
        {
        console.log(availabletoll)
        var o = "";
        kero.current = availabletoll.map((k)=>{
                
        const t1 = JSON.parse(localStorage.getItem(k));
        const t2 = t1.map((t)=>{
        const fil = t.singlejourney + "/" + t.returnjourney;
                
        o = t.toll;  
        return fil
        })
        console.log(t2);
        const toll = o;
        const car = t2[0];
        const lcv = t2[1];
        const truck = t2[2];
        const heavyveh = t2[3];
        const u = {toll,car,lcv,truck,heavyveh};
       
        return u;
                
        })
        console.log(kero.current);
        upup(kero.current);
       
        }
    },[text === ""])
    useEffect(()=>
    {
        if(suggestions.length > 0)
        {
        document.getElementById("sug").style.display = "block";
        }
        else{
            document.getElementById("sug").style.display = "none";
        }
    },[suggestions])
    useEffect(()=>
    {
        updavailabletoll(JSON.parse(localStorage.getItem("tolls")));
    },[localStorage.getItem("tolls")])
    
    const closeaddtoll = () =>
    {
        updateaddtoll(false);
    }
    const closeaddveh = () =>
    {
        updateaddveh(false);
    }
    const closedelv = () =>
    {
        upddeltol(false);
    }
    const onchangingtoll = (text) =>{
           let matches = [];
           if(text.length > 0)
           {
              matches = availabletoll.filter((k)=>{
                const reg_ex = new RegExp(`${text}`,"gi")
                return k.match(reg_ex)
              })
           }
           updsuggestion(matches)
           
           console.log(matches)
           settext(text);
        //    if(matches.length === 0)
        //    {
        //      updsuggestion(["No tolls found"]);
        //    }
    }
    const changingtab = (suggesstion) =>
    {
        // //updlisttolls([]);
        //        const t1 = JSON.parse(localStorage.getItem(suggesstion));
        //        if(listtolls)
        //        {
        //            updlisttolls(...listtolls,t1);
        //        }
        //        else{
        //         updlisttolls(t1);
        //        }
      
        // settext(suggesstion);
        // updsuggestion([]);
        const t = listtoll.filter((i)=>suggesstion === i.toll);
        console.log(t);
        upup(t);
    }
    return(
        <><div className="home-header-main">
            <div className="home-header-first" style={{ 'width': '10%' }}>
                <p style={{ 'fontWeight': 'bold' }}>Tollgate list</p>
            </div>
            <div className="home-header-third" style={{'marginRight':'40%'}}>
                <div className="search-bar">
                    <i className="icon fa fa-search"></i>
                    <input className="input-text" type="text" value={text} onChange={(e) => onchangingtoll(e.target.value)} placeholder="Search Vehicle" />

                </div>
                <div className="suggest" id="sug" style={{ 'display': 'none' }}>
                    {suggestions ? (suggestions.map((suggestion, idx) => {

                        return (
                            <div key={idx} className="suggest-style"><p onClick={() => changingtab(suggestion)}>{suggestion}</p></div>
                        );
                    })) : <div></div>}
                </div>
            </div>
        
        <div className="home-header-fourth">
                <Buttonopt st_name="but" content="Add Vehicle Entry" onadd={() => updateaddveh(true)} />
                <Buttonopt st_name="but" content="Add new toll" onadd={() => updateaddtoll(true)} />
                <Link to="/"><Buttonopt st_name="but" content="Back to vehicle logs" /></Link>
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
        {listtoll.length !== 0 ? (<div className="home-tab-view">
                <table>
                    <thead>
                        <tr>
                            <th>TOLL NAME</th>
                            <th>CAR/JEEP/VAN</th>
                            <th>LCV</th>
                            <th>TRUCK/BUS</th>
                            <th>HEAVY VEHICLE</th>
                        </tr>
                    </thead>
                    <tbody >
                               
                    {listtoll && listtoll.map((t) => {
                        return(
                            <tr key={t.toll}>
                                <td>{t.toll}</td>
                                <td>{t.car}</td>
                                <td>{t.lcv}</td>
                                <td>{t.truck}</td>
                                <td>{t.heavyveh}</td>
                            </tr>
                        )
                               
                            
                        
                    })}
                    </tbody>
                </table>
            </div>):(<div style={{'textAlign':'center'}}><h2>No Tolls Found</h2></div>)}</>
        
         
            
    )
}
export default Viewtolls;