import { render } from "@testing-library/react";
import React, { useEffect, useState } from 'react';
import printerUtils from "../priter_utils/printerManager";
import './home.css'
import PriterHeader from "../component/header";
import PrinterModel from "../component/PrinterModel";
import Menu from "../component/menu";


function Home(){
  
    var pUtils = new printerUtils();

  

    return (
        <div className="Home">
            <PriterHeader utils={pUtils}/>
            <Menu utils={pUtils}></Menu>
        </div>
    );
 
}

export default Home;