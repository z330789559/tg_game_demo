// Created by carolsail

import { StaticInstance } from './StaticInstance';
import { ENUM_GAME_MODE, ENUM_RESOURCE_TYPE, ENUM_UI_TYPE } from './Enum';
import AudioManager from "./manager/AudioManager";
import DataManager from './manager/DataManager';
import ResourceManager from "./manager/ResourceManager";
import SdkManager from './manager/SdkManager';
import { allJson } from './AlljsonData';
import { config, type TonAddressConfig } from './Config';
// import  * as cocosSdk  from './cocos-ton';
// import { TelegramWebApp,  } from './cocos-telegram-miniapps/scripts/telegram-web';
import cocosSdk = require('@ton/cocos-sdk')
const TelegramWebApp = require('telegram-web-app')
//const TelegramWebApp = window['Telegram'].WebApp
const { ccclass, property } = cc._decorator;

@ccclass
export default class Index extends cc.Component {
    @property
    collisionManagerDebug: boolean = false;

    @property(cc.Label)
    connectLabel: cc.Label = null;

    private _bTonInit: boolean = false;
    private _cocosGameFi: any;
    private _connectUI;
    //ton 和jetton地址， ton是买东西付款到的地址
    private _config: TonAddressConfig;

    onLoad() {
        this.node.getChildByName('UI').opacity = 255
        cc.view.setResizeCallback(() => this.responsive())
        this.responsive()
        TelegramWebApp.Instance.init().then(res => {
            console.log("telegram web app init : ", res.success);
        }).catch(err => { console.error(err); });

        this.loadWallet().then(res => {
            if (!res) {
                console.error('load wallet failed!')
                return;
            }
        }).catch(err => { console.error(err); });
        DataManager.instance.loadingRate = 0
        // 碰撞系统
        const colManager = cc.director.getCollisionManager();
        colManager.enabled = true;
        if (this.collisionManagerDebug) colManager.enabledDebugDraw = true;
    }

    async _initTonUI(addressConfig: TonAddressConfig) {
        let connector = new cocosSdk.TonConnectUI({
            manifestUrl: 'https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json',
            restoreConnection: true,
            actionsConfiguration:{
                twaReturnUrl: config.URL_YOU_ASSIGNED_TO_YOUR_APP ,
            }
            
        });
        this._cocosGameFi = await cocosSdk.GameFi.create({
            connector: connector,
            network: 'mainnet',
             // where in-game purchases come to
                merchant: {
                    // in-game jetton purchases (FLAP)
                    // use address you got running `assets-cli deploy-jetton`
                    jettonAddress:  addressConfig.jettonAddress  ,
                    // in-game TON purchases
                    // use master wallet address you got running `assets-cli setup-env`
                    tonAddress:  addressConfig.tonAddress
                }

        });
        this._connectUI = this._cocosGameFi.walletConnector;

        const unsubscribeModal = this._connectUI.onModalStateChange(state => {
            console.log("model state changed! : ", state);

            this.updateConnect();
        });

        const unsubscribeConnectUI = this._connectUI.onStatusChange(info => {
            console.log("wallet info status changed : ", info);

            this.updateConnect();
        });

        this._bTonInit = true;
        this.updateConnect();
    }

    public isConnected(): boolean {
        if (!this._connectUI) {
            console.error("ton ui not inited!");
            return false;
        }
        return this._connectUI.connected;
    }

    private updateConnect() {
        if (this.isConnected()) {
            const address = this._connectUI.account.address;
            const add =cocosSdk.Address.parseRaw(address);

            this.setWalletUi(add.toString( {testOnly: true, bounceable: false }).substring(0, 6) + '...');
            if(this.connectLabel){
                this.connectLabel.string = add.toString( {testOnly: true, bounceable: false }).substring(0, 6) + '...';
            }
                
        } else {
            this.setWalletUi("Connect");
        }
    }

    private setWalletUi(address:string){
        if(this.connectLabel){
            this.connectLabel.string =address;
        }
    }

    public async openModal() {
        if (!this._bTonInit) return;
        console.log("open modal", this.isConnected(), this._connectUI);

        if (this.isConnected()) {
            this._connectUI.disconnect();
        } else {
            this._connectUI.openModal();
        }
    }
     //open the wallet
    async loadWallet():Promise<boolean>{
        try{
      const value =await   fetch(`${config.backendUrl}/config`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "ngrok-skip-browser-warning":"1"
            },
            method: 'GET'}).then(response => {
            return response.json();
        })
        const addressConfig = {
            tonAddress: value.tokenRecipient,
            jettonAddress: value.jettonMaster
        } as TonAddressConfig;
          this._config = addressConfig;
        return true;
    }catch(e){

        console.error('request config failed!',e);
        return false;
    }
       
    }
    public onBuyWithTon(amount: number) {
        const tonTransferReq = {
            amount: cocosSdk.toNano(amount)
        };
        this._cocosGameFi.buyWithTon(tonTransferReq);
    }
    public onShare() {
        let userId = '';
        const userData = TelegramWebApp.Instance.getTelegramUser();
        console.log("userData : ", userData);
        if (userData) {
            userId = userData.id + '';
        }
        TelegramWebApp.Instance.share(`${config.URL_YOU_ASSIGNED_TO_YOUR_APP}&user=${userId}`, "Invite you to play a very interesting game");
    }
    /*      tg_data: z.string(),
        payload:z.string(), order id
        amount: z.number(), amount 
        title: z.string(), //order title
        product: z.string(),  product name
        buy star
    */
    public onBuyWithStars(params:{tg_data:any,payload:string,amount:number,title:string,product:string}){ 
        fetch(`${config.backendUrl}/create-stars-invoice`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "ngrok-skip-browser-warning":"1"
            },
            method: 'POST',
            body: JSON.stringify({
                tg_data:  (window as any).Telegram.WebApp.initData,
                title: params.title,
                payload: params.payload,
                amount: params.amount,
                product: params.product
            }),
        }).then(response => {
            return response.json();
        }).then(value => {
            console.log("starts invoice : ", value);
            if (value.ok) {
                TelegramWebApp.Instance.openInvoice(value.invoiceLink, (result) => {
                    console.log("buy stars : ", result);
                }).catch((error) => {
                    console.error("open invoice error : ", error);
                })
            } else {
                console.error('request config failed!');
            }
        });
    }

    async start() {
        // 加载资源
        for (const index in ENUM_RESOURCE_TYPE) {
            const resource = ENUM_RESOURCE_TYPE[index]
            await ResourceManager.instance.loadRes(resource)
        }
        // 读档
        DataManager.instance.restore()
        // 加载ui
        StaticInstance.uiManager.init()
        // 播放音乐
        AudioManager.instance.playMusic()
        // 加载sdk
        SdkManager.instance.initAudioEndListener()
        SdkManager.instance.passiveShare()
        SdkManager.instance.getRank()
        SdkManager.instance.initBannerAd()
        SdkManager.instance.initInterstitialAd()
        SdkManager.instance.initVideoAd()
        SdkManager.instance.initCustomRowAd()
        SdkManager.instance.initCustomColAd()
        // 离开后体力恢复逻辑
        this.onPowerIncrease()
        // 操作ui
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.LEVEL_UI, true);
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.LEVEL_SELECT, true);
        // StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MENU, true, () => {
        //     DataManager.instance.loadingRate = 1
        // })
    }

    // 屏幕响应式
    responsive() {
        const designSize = cc.view.getDesignResolutionSize();
        const viewSize = cc.view.getFrameSize();

        const setFitWidth = () => {
            cc.Canvas.instance.fitHeight = false;
            cc.Canvas.instance.fitWidth = true;
        }

        const setFitHeight = () => {
            cc.Canvas.instance.fitHeight = true;
            cc.Canvas.instance.fitWidth = false;
        }

        const setFitBoth = () => {
            cc.Canvas.instance.fitHeight = true;
            cc.Canvas.instance.fitWidth = true;
        }

        const designRatio = designSize.width / designSize.height
        const viewRatio = viewSize.width / viewSize.height
        if (designRatio < 1) {
            // console.error('--竖屏游戏')
            if (viewRatio < 1) {
                if (viewRatio > designRatio) {
                    setFitBoth()
                } else {
                    setFitWidth()
                }
            } else {
                setFitBoth()
            }
        } else {
            // console.error('--宽屏游戏')
            if (viewRatio > 1) {
                if (viewRatio < designRatio) {
                    setFitBoth()
                } else {
                    setFitHeight()
                }
            } else {
                setFitBoth()
            }
        }
    }

    onPowerIncrease() {
        // 体力小于5的时候需要补充
        if (DataManager.instance.power < 5) {
            const now = new Date().getTime()
            const seconds = Math.floor((now - DataManager.instance.lastPowerUpdateTime) / 1000)
            const powers = Math.floor(seconds / DataManager.instance.powerRefreshTime)
            if (DataManager.instance.power + powers >= 5) {
                DataManager.instance.power = 5
                DataManager.instance.lastPowerRefreshTime = 0
            } else {
                DataManager.instance.power += powers
            }
            // console.log('自动补充体力', powers)
            DataManager.instance.save()
        }
    }
}
