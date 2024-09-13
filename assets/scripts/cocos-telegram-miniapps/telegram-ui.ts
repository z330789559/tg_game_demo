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
        return this._tgConnect.connected;
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
        return raw;
    }
    private _tgConnect: any = null;
    public async init(manifestUrl: string, tonWallet: string, language?: string) : Promise<{success: boolean}> {
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
                          const tonConnect =  new window['TON_CONNECT_UI'].TonConnectUI(
                                {
                                    manifestUrl: manifestUrl
                                }
                            )
                            tonConnect.uiOptions = {
                                language: language||'en',
                            };
                            resolve(tonConnect);
                            clearInterval(intervalId);
                        }
                    }, 100);
                };
                script.onerror = () => reject(new Error("Unable to load TelegramWebApp SDK, please check logs."));
                document.head.appendChild(script);
            // }
        });

        if (this._tgConnect ) {
      
            return Promise.resolve({success: true});
        } else {
            return Promise.resolve({success: false});
        }

      

    }
    public  subscribeWallet(updateConnect:()=>void) {
        console.log("subscribe wallet");
        if(this._tgConnect) {
        const unsubscribeModal = this._tgConnect.onStatusChange(state => {
            console.log("model state changed! : ", state);

            updateConnect();
        });
        const unsubscribeConnectUI = this._tgConnect.onStatusChange(info => {
            console.log("wallet info status changed : ", info);
    
            updateConnect();
        });
    }



    }

    public async openModal() {
        if (!this._tgConnect) return;
        console.log("open modal", await this._tgConnect.getWallets());

        if (this._tgConnect.connected) {
            this._tgConnect.disconnect();
        } else {
            this._tgConnect.openModal();
        }
    }

    private createPayload() {

        return '';
    }

    public async sendTransaction(args:Transaction ) {
    const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 120, // 120 sec
        messages: [
            {
                address: this.tonWallet ,
                amount: args.amount,
                payload: args.payload // just for instance. Replace with your transaction payload or remove

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


