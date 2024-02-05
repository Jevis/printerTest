import EscPosEncoder from 'esc-pos-encoder';
import { encode } from 'iconv-lite';
import TextComponent from './textComponent';
import { useState } from 'react';
import { PrintData, TextData, TextPrinteData } from '../../../bean';
import MenuItem from '../../../tab/menuItem';
export default function AddText(props: { initData: TextData[] | null, addEncoderListen: (data: PrintData) => void }) {
    const [textValue, setTextValue] = useState<TextData[]>(props.initData ?? []);

    function addContent(data: TextData) {
        var isOk = true;
        textValue.map((d) => {
            if (d.aligin == data.aligin) {
                isOk = false;
            }
        })
        if (isOk) {
            setTextValue([...textValue, data])
        }
    }


    function ext() {
        if (textValue.length > 0) {
            let text: string = '';
            textValue.map((d, i) => {
                text = text.concat(i == 0 ? '' : "    /     ").concat(d.content)
            })
            var t = new TextPrinteData(text, textValue);
            props.addEncoderListen(t)
        }
    }

    function editClick(index: number, item: TextData) {
        var code = textValue;
        var list = textValue.map((d, i) => {
            if (i === index) {
                return item;
            }
            return d;
        })

        var isOk = true;
        textValue.map((d) => {
            if (d.aligin == item.aligin) {
                isOk = false;
            }
        })
        if (isOk) {
            setTextValue([...list])
        }else{
            setTextValue([...code])
        }
    }

    function removeClick(index: number) {
        const dd = textValue.filter((v, i) => i != index)
        setTextValue(dd)
    }

    return (
        <div style={{ width: '100%', height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <TextComponent type={1} data={new TextData('', 'left', '0', false)} listener={addContent} />
            <div style={{ fontSize: '12px', marginTop: '4px', color: 'red' }}>注意：文案在每个位置的只会存在一个</div>
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

