// Created by carolsail

import { StaticInstance } from './StaticInstance';
import { ENUM_GAME_MODE, ENUM_RESOURCE_TYPE, ENUM_UI_TYPE } from './Enum';
import AudioManager from "./manager/AudioManager";
import DataManager from './manager/DataManager';
import ResourceManager from "./manager/ResourceManager";
import SdkManager from './manager/SdkManager';
import  EventManager , {EventType} from "./manager/EventManager"
import { allJson } from './AlljsonData';
import { config, type TonAddressConfig } from './Config';
// import  * as cocosSdk  from './cocos-ton';
import { TelegramWebApp,  } from './cocos-telegram-miniapps/telegram-web';
import {TonConnectUi , type Transaction} from './cocos-telegram-miniapps/telegram-ui';
import { WebTon } from './cocos-telegram-miniapps/webton';

//const TelegramWebApp = window['Telegram'].WebApp
const { ccclass, property } = cc._decorator;

@ccclass
export default class Index extends cc.Component {
    @property
    collisionManagerDebug: boolean = false;



    private _bTonInit: boolean = false;
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
            this._initTonUI();
        }).catch(err => { console.error(err); });
        WebTon.Instance.init().then(res => {
            console.log("web ton init : ", res.success);
        })
        DataManager.instance.loadingRate = 0
        // 碰撞系统
        const colManager = cc.director.getCollisionManager();
        colManager.enabled = true;
        if (this.collisionManagerDebug) colManager.enabledDebugDraw = true;
    }

    async _initTonUI() {
        TonConnectUi.Instance.init('https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json',this._config.tonAddress, 'en').then(res => {
            console.log("ton connect ui init : ", res.success);
            TonConnectUi.Instance.subscribeWallet(()=>{
                console.log("wallet change");
                EventManager.instance.emit(EventType.CONNECT_COMPLETE, res.success);
            })
        })
    }

    public isConnected(): boolean {
        if (!TonConnectUi.Instance) {
            console.error("ton ui not inited!");
            return false;
        }
        return TonConnectUi.Instance.isConnected();
    }

 


    public async openModal() {
        if (!TonConnectUi.Instance) return;
        console.log("open modal", this.isConnected());

        if (TonConnectUi.Instance.isConnected()) {
            TonConnectUi.Instance.disconnect();
        } else {
            TonConnectUi.Instance.openModal();
        }
    }
     //open the wallet
    async loadWallet():Promise<boolean>{
        try{
    //   const value =await   fetch(`${config.backendUrl}/config`, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             "ngrok-skip-browser-warning":"1"
    //         },
    //         method: 'GET'}).then(response => {
    //         return response.json();
    //     })
        const addressConfig = {
            tonAddress: 'EQBVa6SwOkmSV7qHdy-iYW3mq3Br3gOoylJAAOeP0o91BS8K',
            jettonAddress: 'EQD_GZls9HhMJGp26xDmSHBNTk7BXBQ5dUAe7Us20hr_-zuo'
        } as TonAddressConfig;
          this._config = addressConfig;
        return true;
    }catch(e){

        console.error('request config failed!',e);
        return false;
    }
       
    }
    public onBuyWithTon(amount: string) {
        const tonTransferReq: Transaction= {
            amount: TonConnectUi.Instance.toNano(amount),
        };
         TonConnectUi.Instance.sendTransaction(tonTransferReq);
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
            return  response.json();
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
