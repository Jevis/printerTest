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