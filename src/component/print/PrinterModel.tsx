import { useEffect, useRef, useState } from 'react';
import printerUtils from '../../priter_utils/printerManager';
import { click } from '@testing-library/user-event/dist/click';
import EscPosEncoder from 'esc-pos-encoder';
import { encode } from 'iconv-lite';

function PrinterModel(props: { utils: printerUtils }) {

    function clickPrint() {
        const data = new EscPosEncoder();
        var ff =  encode("你好我也好",'gb18030');
        let cc = data.initialize().text("nihaodsadsadasdsadsad ").newline().text("他也好aaa").newline().raw(ff).cut().cut().encode();
        props.utils.printData(cc);

    }

    return (
        <div onClick={clickPrint}>
            打印
        </div>
    );


}

export default PrinterModel;

