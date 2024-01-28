import { useEffect, useRef, useState } from 'react';
import printerUtils from '../../priter_utils/printerManager';
import { click } from '@testing-library/user-event/dist/click';
import EscPosEncoder from 'esc-pos-encoder';
import { encode } from 'iconv-lite';
import { EmptyPrintData, PrintData, TextPrinteData } from '../bean';
import { utimes } from 'fs';
import { Utils } from 'jsprintmanager';

function PrinterModel(props: { printData: PrintData[], utils: printerUtils }) {

    function clickPrint() {
        const data = new EscPosEncoder();
        let buf = data.initialize().newline();
        props.printData.map((d) => {
            if (d instanceof TextPrinteData) {
                d.data.map((t) => {
                    if (t.content != '') {
                        buf.align(t.aligin == 'center' ? 'center' : (t.aligin == 'left' ? 'left' : 'right')).bold(t.fontBlod).size('normal').raw(encode(t.content, 'gb18030'))
                    }
                })
                buf.newline()
            } else if (d instanceof EmptyPrintData) {
                for (var i = 0; i < d.num; i++) {
                    buf.newline();
                }
            }
        })
        var d= "-".repeat(48)
        var tt = "=".repeat(48)
        buf.line(d)
        buf.line(tt)
        props.utils.printData(buf.newline().cut().encode())
    }

    return (
        <div style={{ height: '800px', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>

            <div className='SelectedName' style={{ marginTop: '30px' }} onClick={clickPrint}>打印</div>

        </div>
    );


}

export default PrinterModel;

