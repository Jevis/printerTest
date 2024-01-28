export class TextData {
    content: string = '';
    aligin: string = 'left';
    fontSize: string = '0';
    fontBlod: boolean = false;

    constructor(content: string, aligin: string, fontSize: string, fontBlod: boolean) {
        this.content = content;
        this.aligin = aligin;
        this.fontSize = fontSize;
        this.fontBlod = fontBlod;
    }

}

export class PrintData {
    showText: string = ''

    constructor(text: string) {
        this.showText = text;
    };
}

export class TextPrinteData extends PrintData {
    data: TextData[] = [];
    constructor(text:string,d: TextData[]) {
        super(text);
        this.data = d;
    }
}

export class EmptyPrintData extends PrintData{
   num:number=0;
   constructor(num:number){
    super("空行数量："+ num)
    this.num = num;
   }

}

export class DividPrintData  extends PrintData{
}