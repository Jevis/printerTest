import EscPosEncoder from "esc-pos-encoder";
import { PrintData, TabConfig, TabBean, TabData, TabPrintData } from "../../bean";
import { useEffect, useState } from "react";
import TabConfigAlert from "./tabConfigAlert";

export default function AddTable(props: { tabPrintData: TabData[] | null, addEncoderListen: (data: PrintData) => void }) {
    const [tabNumber, setTabNumber] = useState(3);
    const [printData, setPrintData] = useState<TabData[]>(props.tabPrintData == null ? [] : props.tabPrintData);
    const [tabConfig, setTabConfig] = useState<TabConfig[]>(props.tabPrintData != null && props.tabPrintData.length > 0 ? props.tabPrintData[0].tabConfigs : []);
    const tabColor = ['rebeccapurple', 'greenyellow', 'blue', 'yellow', 'pink', 'black']

    useEffect(() => {
        var configs = []
        for (let i = 0; i < tabNumber; i++) {
            configs.push(new TabConfig())
        }
        setTabConfig(configs)
        changeDataConfig(configs)
    }, [tabNumber])

    function configChangeListener(index: number, data: TabConfig) {
        var allWidth = 0;
        var t = tabConfig.map((d, i) => {
            if (i == index) {
                allWidth += data.width;
                return data;
            }
            allWidth += d.width;
            return d
        })

        var t= t.map((d) => {
            d.allWidth = allWidth;
            return d;
        })
        setTabConfig(t)
        changeDataConfig(t)
    }


    function changeDataConfig(fs: TabConfig[]) {
        if (printData != null && printData.length > 0) {
            printData.map(d => {
                d.tabConfigs = fs
            })
            setPrintData(printData)
        }
    }

    function dataChangeListener(index: number, data: TabBean[]) {
        console.log('ready data', index, data)
        console.log('before', printData)
        if (index < 0) {
            var list = [...printData, new TabData(data, tabConfig)]
            setPrintData(list)
        } else {
            var l = printData.map((d, i) => {
                if (i == index) {
                    d.tabData = data;
                }
                return d;
            })

            setPrintData([...printData])
        }
    }

    function getRender(d: TabData, columnIndex: number) {

        return (
            d.tabConfigs.map((config, rowIndex) => {
                return (
                    <div style={{ flexGrow: config.width, width: '20px', backgroundColor: tabColor[rowIndex], color: 'red', height: '30px', justifyContent: config.align, display: 'flex', marginLeft: config.marginLeft, marginRight: config.marginRight }}>
                        {/* <TabAddContentAlert index={rowIndex} tabCount={tabNumber} tadDatas={d.tabData} dataChangeListener={function (rowIndex: number, data: TabBean[]): void {
                            dataChangeListener(columnIndex, data)
                        }}></TabAddContentAlert> */}
                    </div>
                );
            })
        );
    }


    function saveBtnClick() {
        props.addEncoderListen(new TabPrintData(printData))
    }

    return (
        <div style={{ width: '100%', height: '700px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '100%', height: 'auto' }}>
                <label>
                    列数(范围:2-5) :
                    <input type="number" min={2} max={5} defaultValue={tabNumber} onChange={v => setTabNumber(Number(v.target.value))}>
                    </input>
                </label>
            </div>
            <div style={{ marginTop: '20px' }}>
                点击进行配置：
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '10px' }}>
                    {
                        tabConfig.map((d, index) => {
                            return <TabConfigAlert index={index} tabConfig={d} configChangeListener={configChangeListener}></TabConfigAlert>
                        })
                    }
                </div>
            </div>

            <label style={{ width: '100%', height: '30px', marginTop: '30px', display: 'flex', flexDirection: 'row', fontSize: '18px' }}>
                添加内容：
                {/* <TabAddContentAlert index={-1} tabCount={tabNumber} tadDatas={[]} dataChangeListener={dataChangeListener}></TabAddContentAlert> */}
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5', height: '450px', marginTop: '20px' }}>
                {
                    printData.map((d, columnIndex) => {
                        return (
                            <div style={{ display: 'flex', flexDirection: 'row', height: '30px', marginTop: '3px' }}>
                                {getRender(d, columnIndex)}
                            </div>
                        );
                    })
                }
            </div>
            <div style={{ alignSelf: 'center', marginTop: '10px', width: '80px', height: '40px', backgroundColor: '#282c34', color: 'white', borderRadius: '20px', justifyContent: 'center', alignItems: 'center', display: 'flex' }} onClick={saveBtnClick}>确定</div>
        </div>
    );
}