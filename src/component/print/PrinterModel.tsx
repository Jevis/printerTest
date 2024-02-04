import { useEffect, useRef, useState } from 'react';
import printerUtils from '../../priter_utils/printerManager';
import { click } from '@testing-library/user-event/dist/click';
import EscPosEncoder from 'esc-pos-encoder';
import { encode } from 'iconv-lite';
import { DividPrintData, EmptyPrintData, PrintData, TabPrintData, TextPrinteData } from '../bean';
import { utimes } from 'fs';
import { Utils } from 'jsprintmanager';

function PrinterModel(props: { printData: PrintData[], utils: printerUtils }) {

    type alignType = "left" | "center" | "right";
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
            } else if (d instanceof DividPrintData) {
                buf.line(d.showText);
            } else if (d instanceof TabPrintData) {
                d.tabData.map((data, index) => {
                    var itemStart = 0;
                    var extraData : {marginLeft:Number,mraginRight:number,data:Uint8Array,itemLength:number}[] = [];
                    data.tabData.map((d,i) => {
                            var itemLength = (data.tabConfigs[i].width / data.tabConfigs[i].allWidth) * 48
                            var encodeData= encode(d.content, 'gb18030');
                            var contentLength = encodeData.length;
                            var itemWidth;
                            var marginLeft = 0;
                            var marginRight = 0;
                            if (contentLength > itemLength) {
                                encodeData= encodeData.slice(0,itemLength);
                                itemWidth = itemLength;
                            } else {                          
                                if (data.tabConfigs[i].align == 'left') {
                                    //left
                                    marginRight = itemLength - contentLength;
                                } else {
                                    //right
                                    marginLeft = itemLength - contentLength;
                                }
                            }

                        buf.text(marginLeft>0?' '.repeat(marginLeft):'').raw(encodeData).text(marginRight>0?' '.repeat(marginRight):'')
                        itemStart += itemLength;
                    })
                    buf.newline()       
                })

                
            }

        })

        props.utils.printData(buf.newline().cut().encode())
    }

    return (
        <div style={{ height: '800px', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>

            <div className='SelectedName' style={{ marginTop: '30px' }} onClick={clickPrint}>打印</div>

        </div>
    );


}

export default PrinterModel;

