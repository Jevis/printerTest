import EscPosEncoder from "esc-pos-encoder";
import { EmptyPrintData, PrintData } from "../../bean";


import '../.././component.css'
import { useState } from "react";
export default function AddEmptyLine(props: { initData: number, addEncoderListen: (data: PrintData) => void }) {
    const [lineNumber, setLineNumber] = useState(props.initData);

    function saveBtnClick() {
        if (lineNumber > 0) {
            props.addEncoderListen(new EmptyPrintData(lineNumber))
        }
    }

    return (
        <div style={{ width: '100%', paddingTop: '10px', marginLeft: '20px', flexDirection: 'column', display: "flex" }}>
            <label style={{ fontSize: '19px' }}>
                空行行数:
                <input style={{ marginLeft: '20px', height: '43px', fontSize: '19px' }} type="number" value={lineNumber} onChange={(e) => {
                    setLineNumber(Number.parseInt(e.target.value))
                }}></input>
            </label>
            <button className='SelectedName' style={{ marginTop: '40px', alignSelf: 'center', marginBottom: '40px' }} onClick={saveBtnClick}>保存</button>
        </div>
    );
}