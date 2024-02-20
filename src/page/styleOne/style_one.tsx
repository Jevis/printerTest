import { render } from "@testing-library/react";
import { PrintStyle, StyleOneMenu, TabBean } from "../../component/bean";
import AddMenuAlert from "../../component/addMenu/AddMenuAlert";
import "../../component/component.css"
import { useEffect, useState } from "react";
import { log } from "console";
import { PrintUtls, StylePrintUtils } from "../printUtil";
import PriterHeader from "../../component/header";
import printerUtils from "../../priter_utils/printerManager";
export default function StyleOne() {
    var style: PrintStyle;
    var pUtils = new printerUtils();
    const [menuData, setMenuData] = useState<StyleOneMenu[]>([])
    const [sumPrice, setSumPrice] = useState(0)

    const [shopName, setShopName] = useState('')
    const [tableName, setTableName] = useState('')
    const [peopleCount, setPeopleCount] = useState(1)
    const [menuId, setMenuId] = useState(0)
    const [endTime, setEndTime] = useState('')
    useEffect(() => {
        style = PrintStyle.StyleOne;
    }, [])

    useEffect(() => {
        var sum = 0;
        menuData.map(d => {
            sum += Number(d.price) * Number(d.count);
        })
        setSumPrice(sum)
    }, [menuData])

    function delteMenuItem(index: number): void {
        setMenuData(menuData.filter((v, i) => i != index))
    }

    function dataChangeListener(index: number, data: StyleOneMenu) {
        if (index < 0) {
            setMenuData([...menuData, data])
        } else {
            var t = menuData.map((d, i) => {
                if (i == index) {
                    return data;
                } else {
                    return d;
                }
            })
            setMenuData([...t])
        }
    }

    function printClick(): void {

        console.log(style)
        var utils;
        if (style == PrintStyle.StyleOne) {
            utils = new StylePrintUtils(menuData)
        } else {
            utils = new StylePrintUtils(menuData)
        }

    

        utils.shopName = shopName;
        utils.tableNumber = tableName;
        utils.peopleCount = peopleCount;
        utils.menuId = menuId;
        var d = new Date(endTime)
        utils.endTime = d.toLocaleString();
        var printData =  utils.print()
        console.log('打印机',pUtils)
        console.log('打印数据',printData)
        pUtils.printData(printData)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginTop: '70px' }}>
            <label style={{ width: '100%', marginBottom: '20px' }}>
                <PriterHeader utils={pUtils} />
            </label>
            <label className="bigLabel">
                店铺名称：
                <input type="text" className="bigInput" onChange={v => setShopName(v.target.value)}></input>
            </label>
            <label className="bigLabel">
                桌号：
                <input type="text" className="bigInput" onChange={v => setTableName(v.target.value)}></input>
            </label>
            <label className="bigLabel">
                人数：
                <input type="number" className="bigInput" onChange={v => setPeopleCount(Number(v.target.value))}></input>
            </label>
            <label className="bigLabel">
                结账时间：
                <input type="datetime-local" className="bigInput" onChange={v => setEndTime(v.target.value)}></input>
            </label>
            <label className="bigLabel">
                单号：
                <input type="number" className="bigInput" onChange={v => setMenuId(Number(v.target.value))}></input>
            </label>
            <div style={{ width: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px', marginBottom: '20px', marginLeft: '40px' }}>
                <AddMenuAlert index={-1} initData={null} dataChangeListener={dataChangeListener} ></AddMenuAlert>
                <div style={{ height: '500px', background: 'white', borderRadius: '40px', width: '100%', marginTop: '20px', overflow: 'scroll' }}>
                    {
                        menuData.map((d, i) => {
                            return (
                                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5px', marginLeft: '20px', marginRight: '20px', background: '#282c34', height: '40px', borderRadius: '10px', alignItems: 'center' }}>
                                    <div style={{ flexGrow: 9, display: 'flex', flexDirection: 'row', justifyContent: 'start', marginLeft: '5px', fontSize: '16px' }}>
                                        <div style={{ flex: 2, display: 'flex', justifyContent: 'start' }}>菜名： {d.name} </div>
                                        <div style={{ flex: 1, display: 'flex', justifyContent: 'start' }}>数量： {d.count} </div>
                                        <div style={{ flex: 1, display: 'flex', justifyContent: 'start' }}>单价： {d.price}</div>
                                    </div>
                                    <div style={{ flexGrow: 1 }}>
                                        <AddMenuAlert index={i} initData={d} dataChangeListener={dataChangeListener} ></AddMenuAlert>
                                    </div>
                                    <div style={{ flexGrow: 1, marginLeft: '10px', marginRight: '5px' }}>
                                        <div style={{ height: "auto", width: 'auto', backgroundColor: 'white', color: 'black', borderRadius: '20px', fontSize: 17, paddingTop: 4, paddingBottom: 4, paddingLeft: 10, paddingRight: 10 }} onClick={(e) => delteMenuItem(i)}>刪除</div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className="bigLabel">
                目前总价：{sumPrice}
            </div>
            <div style={{ width: "200px", height: '40px', background: 'white', color: 'black', alignItems: 'center', alignSelf: 'center', borderRadius: '20px', marginTop: '20px', marginBottom: '20px', fontSize: '20px' }} onClick={printClick}>
                打印
            </div>
        </div>
    );

}