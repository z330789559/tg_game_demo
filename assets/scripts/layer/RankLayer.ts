// Created by carolsail 

import { ENUM_AUDIO_CLIP, ENUM_UI_TYPE } from "../Enum";
import BaseLayer from "./Baselayer";
import AudioManager from "../manager/AudioManager";
import SdkManager from "../manager/SdkManager";
import { StaticInstance } from './../StaticInstance';
import ToastManager from "../manager/ToastManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RankLayer extends BaseLayer {

    panel: cc.Node = null
    btnClose: cc.Node = null
    btnShare: cc.Node = null

    onLoad() {
        this.panel = cc.find('style/panel', this.node)
        this.btnClose = cc.find('btn_close', this.panel)
        this.btnShare = cc.find('btn_share', this.panel)
        this.btnClose.on('click', this.onCloseClick, this)
        this.btnShare.on('click', this.onShareClick, this)
    }

    onDestroy() {
        this.btnClose.off('click', this.onCloseClick, this)
        this.btnShare.off('click', this.onShareClick, this)
    }

    onEnable() {
        this.zoomIn(this.panel)
        // 读取排行榜数据
        SdkManager.instance.getRank()
        SdkManager.instance.showInterstitialAd()
    }

    onDisable() { }

    onCloseClick(e: any) {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.RANK, false)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MENU)
    }

    onShareClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        if (SdkManager.instance.getPlatform()) {
            SdkManager.instance.activeShare()
        } else {
            ToastManager.instance.show('仅支持小游戏平台', { gravity: 'TOP', bg_color: cc.color(226, 69, 109, 255) })
        }
    }
}
