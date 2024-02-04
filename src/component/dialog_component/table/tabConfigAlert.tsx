import { render } from "@testing-library/react";
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from "react";
import { TabConfig } from "../../bean";

export default function TabConfigAlert(props: { index: number, tabConfig: TabConfig, configChangeListener: (index: number, data: TabConfig) => void }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [data, setData] = useState(props.tabConfig)

    const tabColor = ['rebeccapurple', 'greenyellow', 'blue', 'yellow', 'pink', 'black']

    function saveBtnClick() {
        if (data.width > 0) {
            props.configChangeListener(props.index, data)
            setDialogOpen(false)
        }
    }


    return (
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger asChild>
                <div style={{ flexGrow: data.width, width: '20px', backgroundColor: tabColor[props.index], color: 'red', height: '30px', justifyContent: data.align, display: 'flex', marginLeft: data.marginLeft, marginRight: data.marginRight }}>{props.index + 1}列配置</div>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='DialogOverlay'></Dialog.Overlay>
                <Dialog.Content className='DialogContent'>
                    <Dialog.Title>设置第{props.index + 1}列的参数</Dialog.Title>
                    <div style={{ width: '300px', height: '300px', display: 'flex', flexDirection: 'column' }}>
                        <label style={{ marginTop: '10px', fontSize: '18px' }}>
                            宽度(倍数):
                            <input type="number" style={{ marginLeft: '10px' }} max={10} min={1} defaultValue={data.width} onChange={e => {
                                data.width = Number(e.target.value)
                                setData(data)
                            }}></input>
                        </label>
                        <label style={{ marginTop: '10px', fontSize: '18px' }}>
                            水平方向:
                            <select style={{ marginLeft: '10px' }} defaultValue={data.align} onChange={e => {
                                data.align = e.target.value =='left'?'left':'right';
                                setData(data)
                            }}>
                                <option value={'left'}>居左</option>
                                <option value={'right'}>居右</option>
                            </select>
                        </label>
                        <label style={{ marginTop: '10px', fontSize: '18px' }} >
                            左边距:
                            <input style={{ marginLeft: '10px' }} max={48} min={0} defaultValue={data.marginLeft} onChange={e => {
                                data.marginLeft = Number(e.target.value);
                                setData(data)
                            }}></input>
                        </label>
                        <label style={{ marginTop: '10px', fontSize: '18px' }}>
                            右边距:
                            <input style={{ marginLeft: '10px' }} max={48} min={0} defaultValue={data.marginRight} onChange={e => {
                                data.marginRight = Number(e.target.value);
                                setData(data)
                            }}></input>
                        </label>
                        <button onClick={saveBtnClick}>保存</button>
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