const { ccclass, property } = cc._decorator;

export interface Transaction{ amount: string, payload?: string, callBack?: (result: any)=>void}
@ccclass('TonConnectUi')
export class TonConnectUi {
    private static _instance: TonConnectUi;
    private tonWallet: string ;
    private constructor() {

    }
    public static get Instance(): TonConnectUi {
        if (!TonConnectUi._instance) {
            TonConnectUi._instance = new TonConnectUi();
        }
        return TonConnectUi._instance;
    }

    public toNano(ton: string) {

        return (parseFloat(ton) * 1000000000).toString();
    }

    public isConnected(): boolean {
        if (!this._tgConnect) {
            console.error("ton ui not inited!");
            return false;
        }
        return this._tgConnect.isConnected();
    }
  public disconnect() {

    if (!this._tgConnect) {
        console.error("ton ui not inited!");
        return;
    }
    this._tgConnect.disconnect();
    }
    public account() {
        if (!this._tgConnect) {
            console.error("ton ui not inited!");
            return null;
        }
        return this._tgConnect.account;

    }
    public parseRaw(raw: string) {
        return this._tgConnect.parseRaw(raw);
    }
    private _tgConnect: any = null;
    public async init(manifestUrl: string, buttonRootId: string,tonWallet: string,  updateConnect:()=>void) : Promise<{success: boolean}> {
        this.tonWallet = tonWallet;
        this._tgConnect =  await new Promise<any>((resolve, reject) => {
            // if (sys.platform === sys.Platform.MOBILE_BROWSER || sys.platform === sys.Platform.DESKTOP_BROWSER) {
                const script = document.createElement("script");
                script.src = "https://unpkg.com/@tonconnect/ui@2.0.9/dist/tonconnect-ui.min.js";
                script.async = true;
                script.onload = () => {
                    const intervalId = setInterval(() => {
                        if ((window as any).TON_CONNECT_UI) {
                            console.log("loading telegram web app sdk success!");
                            resolve( new (window as any).TON_CONNECT_UI.TonConnect(
                                {
                                    manifestUrl: manifestUrl,
                                    buttonRootId: buttonRootId
                                }
                            ));
                            clearInterval(intervalId);
                        }
                    }, 100);
                };
                script.onerror = () => reject(new Error("Unable to load TelegramWebApp SDK, please check logs."));
                document.head.appendChild(script);
            // }
        });

        if (this._tgConnect) {
            const unsubscribeModal = this._tgConnect.onStatusChange(state => {
                console.log("model state changed! : ", state);
    
                updateConnect();
            });
            const unsubscribeConnectUI = this._tgConnect.onStatusChange(info => {
                console.log("wallet info status changed : ", info);
        
                updateConnect();
            });
            return Promise.resolve({success: true});
        } else {
            return Promise.resolve({success: false});
        }

      

    }

    public async openModal() {
        if (!this._tgConnect) return;
        console.log("open modal", this._tgConnect.isConnected());

        if (this._tgConnect.isConnected()) {
            this._tgConnect.disconnect();
        } else {
            this._tgConnect.openModal();
        }
    }

    public async sendTransaction(args:Transaction ) {
    const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 120, // 120 sec
        messages: [
     
            {
                address: this.tonWallet ,
                amount: args.amount,
                 payload: "base64bocblahblahblah==" // just for instance. Replace with your transaction payload or remove
            }
        ]
    }
    
    try {
        const result = await this._tgConnect.sendTransaction(transaction);
        if(args.callBack) {
            args.callBack({
                success: true,
                result: result
            });
        }
        // you can use signed boc to find the transaction
    } catch (e) {
        console.error(e);
        if(args.callBack) {
            args.callBack({
                success: false,
                result: e.message
            });
        }
    }
}

    
}


