import { ENUM_AUDIO_CLIP, ENUM_UI_TYPE } from "../Enum";
import { Languages } from "../Languages";
import AudioManager from "../manager/AudioManager";
import DataManager from "../manager/DataManager";
import EventManager, { EventType } from "../manager/EventManager";
import SpriteManager from "../manager/SpriteManager";
import { StaticInstance } from "../StaticInstance";
import BaseLanguageLayer from "./BaseLanguageLayer";
import BaseLayer from "./Baselayer";

import {TonConnectUi , type Transaction} from '../cocos-telegram-miniapps/telegram-ui';
import { WebTon } from "../cocos-telegram-miniapps/webton";

// import * as TonWeb from "tonweb";
const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelUILayer extends BaseLanguageLayer {
    btnPause: cc.Node = null
    btnLevel: cc.Node = null;
    btnSkills: cc.Node = null;
    btnSuoduan: cc.Node = null;
    btnTouming: cc.Node = null;
    btnYichu: cc.Node = null;
    btnDown: cc.Node = null;
    btnZhuanQv: cc.Node = null;
    btnRenwu: cc.Node = null;
    btnShop: cc.Node = null;
    btnShare: cc.Node = null;
    btnWallet: cc.Node = null;
    btnSend: cc.Node = null;
    connectLabel: cc.Label = null;

    onLoad() {
   
        super.onLoad();
        this.btnPause = cc.find('btn_pause', this.node)
        this.btnLevel = cc.find('btn_level', this.node)
        this.btnSkills = cc.find('skills', this.node);
        this.btnSuoduan = cc.find('btn_shuffle', this.btnSkills);
        this.btnTouming = cc.find('btn_opacity', this.btnSkills);
        this.btnYichu = cc.find('btn_delete', this.btnSkills);
        this.btnDown = cc.find('btndown', this.node);
        this.btnZhuanQv = cc.find('btnzhuanqv', this.btnDown);
        this.btnRenwu = cc.find('btnrenwu', this.btnDown);
        this.btnShop = cc.find('btnshop', this.btnDown);
        this.btnShare = cc.find('btnshare', this.btnDown);
        this.btnWallet = cc.find('btn_wallet', this.node);
        this.btnSend = cc.find('btn_send', this.node);
        this.connectLabel = cc.find('btn_wallet/connect', this.node).getComponent(cc.Label);
        this.onTouch(this.btnPause, this.onPauseClick, this);
        this.onTouch(this.btnLevel, this.onLevelClick, this);
        this.onTouch(this.btnSuoduan, this.onSuoDuanClick, this);
        this.onTouch(this.btnTouming, this.onTouMingClick, this);
        this.onTouch(this.btnYichu, this.onYiChuClick, this);
        this.onTouch(this.btnRenwu, this.onRenWuClick, this);
        this.onTouch(this.btnShop, this.onShopClick, this);
        this.onTouch(this.btnShare, this.onShareClick, this);
        this.onTouch(this.btnZhuanQv, this.onZhuanQvClick, this);
        this.onTouch(this.btnWallet, this.openWallet, this);
        this.onTouch(this.btnSend, this.sendTon, this);
        EventManager.instance.on(EventType.OPEN_LEVEL_BTN, this.openLevelBtn, this);
        EventManager.instance.on(EventType.CONNECT_COMPLETE, this.subscribe, this);

    }




  private async sendTon() {
   await  TonConnectUi.Instance.sendTransaction({
        amount: "100000",
        payload: await WebTon.Instance.createMessagePayload("hello"),
        callBack: (result) => {
            console.log('sendTon',result);
        }
    });

  }
    private subscribe(success: boolean) {
         console.log('subscribe success');
         this.updateConnect();
    }
    private async setWalletUi(address:string){
        console.log('setWalletUi',address);

        if(this.connectLabel){
   
                if(address=="Connect"){
                    this.connectLabel.string = address;
                }else{
                    const longAddress = await WebTon.Instance.parseAddress(address);
                  
                    this.connectLabel.string =  longAddress.length>10?longAddress.substr(0,10)+'...':longAddress;
                }
        
    }
    }

     private async  openWallet() {

       await TonConnectUi.Instance.openModal();

     }
    start() {
        this.btnSkills.active = false;
    }
    private openLevelBtn() {
        this.btnSkills.active = true;
    }

    public updateConnect() {
        console.log('updateConnect');
        debugger
        if (TonConnectUi.Instance.isConnected()) {
            const address = TonConnectUi.Instance.account().address;
            const add=TonConnectUi.Instance.parseRaw(address);

            this.setWalletUi(add);
                
        } else {
            this.setWalletUi("Connect");
        }
    }
    onPauseClick() {
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.SETTING)
    }
    onLevelClick() {
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.LEVEL_SELECT)
    }
    onSuoDuanClick() {//缩短

    }
    onTouMingClick() {//透明

    }
    onYiChuClick() {//移除

    }
    onZhuanQvClick() {//赚取

    }
    onRenWuClick() {//任务
        if (StaticInstance.uiManager.isActive(ENUM_UI_TYPE.TASK)) {
            StaticInstance.uiManager.toggle(ENUM_UI_TYPE.TASK, false)
        } else {
            StaticInstance.uiManager.toggle(ENUM_UI_TYPE.TASK, true)
            StaticInstance.uiManager.toggle(ENUM_UI_TYPE.SHOP, false)
            StaticInstance.uiManager.toggle(ENUM_UI_TYPE.SHARE, false)
        }
        this.updateBtnState();
    }
    onShopClick() {//商店
        if (StaticInstance.uiManager.isActive(ENUM_UI_TYPE.SHOP)) {
            StaticInstance.uiManager.toggle(ENUM_UI_TYPE.SHOP, false)
        } else {
            StaticInstance.uiManager.toggle(ENUM_UI_TYPE.SHOP, true)
            StaticInstance.uiManager.toggle(ENUM_UI_TYPE.TASK, false)
            StaticInstance.uiManager.toggle(ENUM_UI_TYPE.SHARE, false)
        }
        this.updateBtnState();
    }
    onShareClick() {//邀请
        if (StaticInstance.uiManager.isActive(ENUM_UI_TYPE.SHARE)) {
            StaticInstance.uiManager.toggle(ENUM_UI_TYPE.SHARE, false)
        } else {
            StaticInstance.uiManager.toggle(ENUM_UI_TYPE.SHARE, true)
            StaticInstance.uiManager.toggle(ENUM_UI_TYPE.SHOP, false)
            StaticInstance.uiManager.toggle(ENUM_UI_TYPE.TASK, false)
        }
        this.updateBtnState();
    }

    private updateBtnState() {
        let index = StaticInstance.uiManager.isActive(ENUM_UI_TYPE.TASK) ? 1 : 0;
        this.btnRenwu.getComponent(cc.Sprite).spriteFrame = SpriteManager.taskIcon[index];
        index = StaticInstance.uiManager.isActive(ENUM_UI_TYPE.SHOP) ? 1 : 0;
        this.btnShop.getComponent(cc.Sprite).spriteFrame = SpriteManager.shopIcon[index];
        index = StaticInstance.uiManager.isActive(ENUM_UI_TYPE.SHARE) ? 1 : 0;
        this.btnShare.getComponent(cc.Sprite).spriteFrame = SpriteManager.shareIcon[index];
    }

    // update (dt) {}
}
