import { useState } from "react";
import printerUtils from "../priter_utils/printerManager";
import "./component.css"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import PrinterModel from "./PrinterModel";
import AddCpmponent from "./addComponent";
import SettingPage from "./setting";


function Menu(props: { utils: printerUtils }) {
    const [selectIndex, setSelectIndex] = useState(0);



    function selectItem(index: number, lastIndex: number, event: Event) {
        setSelectIndex(index);
        console.log(index)
    }

    return (
        <div className="Menu">
            <div>
                <Tabs onSelect={selectItem} selectedIndex={selectIndex}>
                    <TabList className={'MenuAdd'}>
                        <Tab tabIndex="0" className={selectIndex == 0 ? 'SelectedName' : 'DisableName'}>
                            添加组件
                        </Tab>
                        <Tab tabIndex="1" className={selectIndex == 1 ? 'SelectedName' : 'DisableName'} >
                            设置
                        </Tab>
                        <Tab tabIndex="2" className={selectIndex == 2 ? 'SelectedName' : 'DisableName'}>
                            打印
                        </Tab>
                        <Tab tabIndex="3" className={selectIndex == 3 ? 'SelectedName' : 'DisableName'}>
                            存储样式
                        </Tab>
                        <Tab tabIndex="4" className={selectIndex == 4 ? 'SelectedName' : 'DisableName'}>
                            恢复样式
                        </Tab>
                    </TabList>
                    <TabPanel>
                        <div className={'Plane'}>
                            <AddCpmponent />
                        </div>
                    </TabPanel >
                    <TabPanel>
                        <div className={'Plane'}>
                            <SettingPage />
                        </div>
                    </TabPanel>
                    <TabPanel >
                        <div className={'Plane'}>
                            <PrinterModel utils={props.utils} />
                        </div>
                    </TabPanel>
                    <TabPanel><div className={'Plane'} style={{ color: 'black'}}>暂不支持</div></TabPanel>
                    <TabPanel><div className={'Plane'} style={{ color: 'black'}}>暂不支持</div></TabPanel>
                </Tabs>


            </div >
            <div className="MenuLKist"></div>
        </div >
    );

}

export default Menu;