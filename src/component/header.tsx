import { useEffect, useRef, useState} from 'react';
import printerUtils from '../priter_utils/printerManager';
import { click } from '@testing-library/user-event/dist/click';
import './component.css'

export default function PriterHeader(props:{utils:printerUtils}) {

    var selectRef = useRef(null);
    const [printers,setPrinters]=useState(['']);
    const [selectValue,setSelectValue] = useState('');
  
  
     useEffect(()=>{
        props.utils.init(); 
     },[])
     
    function scanPrinter(): void {
        props.utils.getPrinters().then((printers)=>{
            const arrays= printers as []
            setPrinters(arrays);  
            arrays.filter((item ,index)=>{
                if(index == 0){
                    setSelectValue(item)
                }
            })
        })
    }


    function clickToChoose(){
        if(selectValue != ''){
            alert('连接成功：'+selectValue)
        }
        console.log(selectValue)
    }

    return (
        <div className="PrinterHeader">
            <div className='Button' onClick={scanPrinter} >
                 扫描
            </div>
            <select  ref={selectRef} className='SelectHeader' onChange={(e)=>{
                setSelectValue(e.target.value)
            }}>
                 {
                  printers.map((item, index) => {
                     return (
                         <option value={item} >{item}</option>
                     );
                 }) 
                }
            </select>
            <div className='Button' onClick={clickToChoose}>连接</div>
        </div>
    );
}