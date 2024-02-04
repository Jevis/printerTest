import EscPosEncoder from "esc-pos-encoder";
import { DividPrintData, PrintData } from "../../bean";
import '../../component.css'
import { useState } from "react";


export default function AddLine(props: { initData: string, addEncoderListen: (data: PrintData) => void }) {

    const [showText, setShowText] = useState(props.initData);



    function saveData() {
       if(showText.length>0){
        props.addEncoderListen(new DividPrintData(showText))
       }
    }

    return (
        <div style={{ height: '300px', width: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', justifySelf: 'center' }}>
            <label>
                选择样式:
                <select defaultValue={showText} onChange={(e) => { setShowText(e.target.value) }}>
                    <option value={""}>选择样式</option>
                    <option value={"==".repeat(24)}>=======================</option>
                    <option value={"--".repeat(24)}>-----------------------</option>
                </select>
            </label>
            <div className="SelectedName" style={{ marginTop: '30px' }} onClick={saveData}>
                保存
            </div>
        </div>
    );
}