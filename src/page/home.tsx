import { render } from "@testing-library/react";
import React, { useEffect, useState } from 'react';
import printerUtils from "../priter_utils/printerManager";
import './home.css'
import PriterHeader from "../component/header";


function Home(){
  
    var pUtils = new printerUtils();

   
  

    return (
        <div className="Home">
            <PriterHeader utils={pUtils}/>
         
        </div>
    );
 
}

export default Home;