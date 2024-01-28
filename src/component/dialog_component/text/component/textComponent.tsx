import * as Dialog from '@radix-ui/react-dialog';
import './text.css'
import { useRef, useState } from 'react';
import { TextData } from '../../../bean';


export default function AddTextComponent(props: { type: number, data: TextData, listener: (addData: TextData) => void }) {
    const [contentValue, setContentValue] = useState(props.data.content);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [hitHeight, setHitHeight] = useState(0);
    const [fontPosition, setFontPosition] = useState(props.data.aligin);
    const [fontSize, setFontSize] = useState(props.data.fontSize);
    const [fontBold, setFontbold] = useState(props.data.fontBlod);
    const contentRef = useRef(null);

    function saveButton() {
        if (contentValue == "") {
            setHitHeight(20)
        } else {
            props.listener(new TextData(contentValue, fontPosition, fontSize, fontBold));
            setContentValue('')
            setHitHeight(0)
            setFontPosition('left')
            setFontSize('0')
            setFontbold(false)
            setDialogOpen(false)
        }
    }

    return (
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger asChild>
                {
                    props.type == 0 ?
                        <div style={{ flex: 1 }} >
                            <img id='edit' style={{ width: '25px', height: '100%', right: '20px' }} src='data:image/png;base64,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'></img>

                        </div>
                        :
                        <button className="DisableName" style={{ backgroundColor: 'rgb(104, 134, 226)', fontSize: '18px' }}> {contentValue == '' ? '增加文案' : '修改文案'}</button>

                }

            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='DialogOverlay'></Dialog.Overlay>
                <Dialog.Content className='DialogContent'>
                    <Dialog.Title>修改/添加数据</Dialog.Title>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '20px' }}>
                        <label className="ItemLable">
                            文案:
                            <input ref={contentRef} type='text' style={{ marginLeft: '10px', width: '300px', height: '30px', fontSize: '17px' }} value={contentValue} onChange={(e) => {
                                if (e.target.value.length > 0) {
                                    setHitHeight(0)
                                }
                                setContentValue(e.target.value)
                            }} >
                            </input>
                        </label>
                        <div style={{ height: hitHeight, fontSize: '11px', color: 'red', marginLeft: '20px' }}>内容不能为空</div>
                        <label className="ItemLable">
                            位置：
                            <select id='textPosition' style={{ fontSize: '16px' }} defaultValue={fontPosition} onChange={(e) => setFontPosition(e.target.value)}>
                                <option value='left'>居左</option>
                                <option value='right'>居右</option>
                                <option value='center'>居中</option>
                            </select>
                        </label>
                        <label className="ItemLable" defaultValue={fontSize}>
                            字号：
                            <select style={{ fontSize: '16px' }} defaultValue={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                                <option value={'0'}>1</option>
                                <option value={'1'}>2</option>
                                <option value={'2'}>3</option>
                                <option value={'3'}>4</option>
                            </select>
                        </label>
                        <label className="ItemLable">
                            加粗
                            <input type='checkbox' defaultChecked={fontBold} style={{ marginLeft: '15px', width: '20px', height: '20px' }} onChange={(e) => setFontbold(e.target.checked)}></input>
                        </label>
                        <button style={{ width: '100px', height: '40px', backgroundColor: 'gold', justifySelf: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: '20px', borderRadius: '10px' }} onClick={saveButton}>保存</button>
                    </div>

                    <Dialog.Close asChild>
                        <button className="IconButton" aria-label="Close">
                            <img style={{ width: '20px', height: '20px' }} src="data:image/png;base64,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"></img>
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}