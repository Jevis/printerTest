
import { ClientPrintJob, DefaultPrinter, InstalledPrinter, JSPrintManager, WSStatus } from 'jsprintmanager';
class printerUtils {

    private initState: boolean = false;
    public static printerName: string = "";

    public init() {
        JSPrintManager.auto_reconnect = true;
        JSPrintManager.start();
        var ws = JSPrintManager.WS;
        if (ws != null) {
            ws.onStatusChanged = function () {
                if (JSPrintManager.websocket_status == WSStatus.Open)
                    return true;
                else if (JSPrintManager.websocket_status == WSStatus.Closed) {
                    alert('JSPrintManager (JSPM) is not installed or not running! Download JSPM Client App from https://neodynamic.com/downloads/jspm');
                    return false;
                }
                else if (JSPrintManager.websocket_status == WSStatus.Blocked) {
                    alert('JSPM has blocked this website!');
                    return false;
                }
                return false;
            }
        }
    }

    async getPrinters() {
        return JSPrintManager.getPrinters();
    }


    public printData(data: Uint8Array) {
        var cpj = new ClientPrintJob();
        var printerName = printerUtils.printerName
        if (printerName == '') {
            cpj.clientPrinter = new DefaultPrinter();
        } else {
            cpj.clientPrinter = new InstalledPrinter(printerName);
        }


        cpj.binaryPrinterCommands = data;
        cpj.sendToClient();
    }
}

export default printerUtils;