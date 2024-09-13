const { ccclass, property } = cc._decorator;


@ccclass
export class WebTon{
    private static _instance: WebTon;
    private _webTon: any = null;
    private constructor() {

    }
    public static get Instance(): WebTon {
        if (!WebTon._instance) {
            WebTon._instance = new WebTon();
        }
        return WebTon._instance;
    }
    public async init(): Promise<{success: boolean}> {


        this._webTon = await new Promise<any>((resolve, reject) => {
            const intervalId = setInterval(() => {
                debugger
                if ((window as any).TonWeb) {
                    console.log("loading ton sdk success!");
                    resolve(new (window as any).TonWeb());
                    clearInterval(intervalId);
                }
            }, 100);
        });
        if (this._webTon) {
            return Promise.resolve({success: true});
        } else {
            return Promise.resolve({success: false});
        }
    }

    public async createMessagePayload( message:string){

        const cell =  new this._webTon.boc.Cell();
        cell.bits.writeUint(0, 32)
        cell.bits.writeString(message);
        const cellBytes = await cell.toBoc(false);
        const payload =this._webTon.utils.bytesToBase64(cellBytes);
         return payload;
    
    }
    




}