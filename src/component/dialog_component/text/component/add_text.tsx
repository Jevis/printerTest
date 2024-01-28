import EscPosEncoder from 'esc-pos-encoder';
import { encode } from 'iconv-lite';
import TextComponent from './textComponent';
import { useState } from 'react';
import { PrintData, TextData, TextPrinteData } from './Text';
import MenuItem from '../../../tab/menuItem';
export default function AddText(props: { initData: TextData[] | null, addEncoderListen: (data: PrintData) => void }) {
    const [textValue, setTextValue] = useState<TextData[]>(props.initData ?? []);

    function addContent(data: TextData) {
        setTextValue([...textValue, data])
        console.log('data', textValue);
    }


    function ext() {
        // const data = new EscPosEncoder();
        // textValue.map((d, i) => {
        //     if (d.content != '') {  
        //         data.align('left').bold(d.fontBlod).size('normal').raw(encode(d.content, 'gb18030'))         
        //     }
        // })
        if (textValue.length > 0) {
            let text:string='';
            textValue.map((d,i)=>{
               text=  text.concat(i==0?'':"    /     ").concat(d.content)
            })
            var t = new TextPrinteData(text, textValue);
            props.addEncoderListen(t)
        }
    }

    function editClick(index: number, item: TextData) {
        var list = textValue.map((d, i) => {
            if (i === index) {
                return item;
            }
            return d;
        })
        setTextValue([...list])
    }

    function removeClick(index: number) {
        const dd = textValue.filter((v, i) => i != index)
        setTextValue(dd)
    }

    return (
        <div style={{ width: '100%', height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextComponent type={1} data={new TextData('', 'left', '0', false)} listener={addContent} />

            <div style={{ height: '300px', width: '100%', overflow: 'scroll', marginTop: '50px', overflowX: 'hidden' }} >
                {
                    textValue.map((data, index) => {
                        return <MenuItem id={index} data={data} editListenrer={editClick} removeListener={removeClick}></MenuItem>
                    })
                }
            </div>
            <div className="SelectedName" style={{ marginTop: '50px' }} onClick={ext}>
                保存
            </div>
        </div>
    );
}

