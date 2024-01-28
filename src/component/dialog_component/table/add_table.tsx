import EscPosEncoder from "esc-pos-encoder";
import { PrintData } from "../../bean";

export default function AddTable(props:{addEncoderListen:(data:PrintData)=>void}){
     
    return (
        <div style={{width:'100%',height:'700px',display:'flex',flexDirection:'column'}}>

            <div style={{width:'100%',height:'200px'}}>
                配置
            </div>
            <div style={{width:'100%',height:'500px'}}>
                表格
            </div>
        </div>
    );
}