import EscPosEncoder from 'esc-pos-encoder';
import '../component.css'
import { encode } from 'iconv-lite';
export default function AddText() {
  
    function ext() {
        const data = new EscPosEncoder();
        var ff =  encode("你好我也好",'gb18030');
    
    }

    return (
        <div className="Fieldset">
            <label className="Label">
                类型
            </label>
        </div>
    );
}