import EscPosEncoder from "esc-pos-encoder";
import { StyleOneMenu } from "../component/bean";
import { encode } from "iconv-lite";


export class PrintUtls {
    menuList: StyleOneMenu[];
    shopName: string | undefined;
    tableNumber: string | undefined;
    peopleCount: number = 1;
    menuId: number | undefined;
    encoder: EscPosEncoder = new EscPosEncoder();
    endTime:string;
    deletePrice:number = 0;

    constructor(menuList: StyleOneMenu[]) {
        this.menuList = menuList;
        this.endTime = new Date().toLocaleString();
    }

    print(): Uint8Array {
        return new Uint8Array();
    }
}


export class StylePrintUtils extends PrintUtls {
    print(): Uint8Array {

        let buf = this.encoder.initialize();
        buf.width(2).height(2).align('center').raw(encode('结账单', 'gb18030')).newline();
        buf.width(2).height(2).align('center').raw(encode(this.shopName??'', 'gb18030'));
        buf.width(1).height(1).newline().newline();
        buf.width(1).height(1).align('left').raw(encode('桌号：', 'gb18030')).raw(encode(this.tableNumber??'二楼包厢-天地缘', 'gb18030')).newline();
        buf.raw(encode('人数：', 'gb18030')).raw(encode(String(this.peopleCount), 'gb18030')).newline();
        buf.raw(encode('类型：', 'gb18030')).raw(encode('堂食', 'gb18030')).newline();
        buf.raw(encode('结账时间：', 'gb18030')).raw(encode(this.endTime, 'gb18030')).newline();
        buf.raw(encode('收银员：', 'gb18030')).raw(encode('系统', 'gb18030')).newline();
        buf.raw(encode('单号：', 'gb18030')).raw(encode(String(this.menuId)??'4565184654986113', 'gb18030')).newline();
        buf.width(1).height(1).newline().line('-'.repeat(48)).newline();
        var sumPrice = 0;
        const config = {
            tabConfigs: [
                {
                    align: 'left',
                    width: 1,
                },
                {
                    align: 'center',
                    width: 1,
                },
                {
                    align: 'right',
                    width: 1,
                }
            ],
            allWidth: 3
        }
        var printList = [new StyleOneMenu('品项', '数量', '单价'), ...this.menuList]
        printList.map((data, index) => {
            if (index != 0) {
                sumPrice += Number(data.count) * Number(data.price);
            }
            config.tabConfigs.map((c, i) => {
                var itemLength = (c.width / config.allWidth) * 48
                var printContet = i == 0 ? data.name : (i == 1 ? data.count : data.price)
                var encodeData = encode(printContet, 'gb18030');
                var contentLength = encodeData.length;
                var itemWidth;
                var marginLeft = 0;
                var marginRight = 0;
                if (contentLength > itemLength) {
                    encodeData = encodeData.slice(0, itemLength);
                    itemWidth = itemLength;
                } else {
                    if (c.align == 'left') {
                        //left
                        marginRight = itemLength - contentLength;
                    } else {
                        //right
                        marginLeft = itemLength - contentLength;
                    }
                }
                buf.text(marginLeft > 0 ? ' '.repeat(marginLeft) : '').raw(encodeData).text(marginRight > 0 ? ' '.repeat(marginRight) : '')
            })

            buf.newline()
        })
        buf.width(1).height(1).newline().line('-'.repeat(48)).newline();
        buf.newline();
        var sumBuf = encode(String(sumPrice), 'gb18030')
        var sumTitle = encode('菜品总价：', 'gb18030')
        var marginLeft= 48 - sumTitle.length - sumBuf.length
        buf.bold(true).raw(sumTitle).text(' '.repeat(marginLeft)).raw(sumBuf).newline();

        var youhuiPriceTitle =  encode('优惠：', 'gb18030')
        var youhuiPricePrice =   encode(String(this.deletePrice), 'gb18030')
        buf.raw(youhuiPriceTitle).text(' '.repeat(48 -youhuiPricePrice.length - youhuiPriceTitle.length)).raw(youhuiPricePrice).newline();
        buf.width(1).height(1).newline().line('-'.repeat(48)).newline();

        var codePrice = encode(String(sumPrice - this.deletePrice), 'gb18030');
        var endPriceTitle =  encode('应付金额(￥)：', 'gb18030')
        buf.width(2).height(2).align('left').raw(endPriceTitle).text(' '.repeat(24-codePrice.length - endPriceTitle.length)).raw(codePrice);
        buf.width(1).height(1).newline().line('-'.repeat(48)).newline();

        buf.bold(false).raw(encode('操作员：', 'gb18030')).raw(encode('系统', 'gb18030')).newline();

        buf.newline().newline().align('center').raw(encode('欢迎下次光临', 'gb18030')).newline();
        return buf.newline().newline().newline().newline().newline().newline().newline().newline().cut().encode();

    }
}

