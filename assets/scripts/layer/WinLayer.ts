// Created by carolsail

import { ENUM_AUDIO_CLIP, ENUM_UI_TYPE } from "../Enum";
import { StaticInstance } from './../StaticInstance';
import AudioManager from "../manager/AudioManager";
import SdkManager from "../manager/SdkManager";
import ToastManager from "../manager/ToastManager";
import DataManager from "../manager/DataManager";
import HeaderLayer from "./HeaderLayer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoseLayer extends HeaderLayer {

    panel: cc.Node = null
    btnNext: cc.Node = null
    btnShare: cc.Node = null
    btnClose: cc.Node = null

    onLoad() {
        super.onLoad()
        this.panel = cc.find('style/panel', this.node)
        this.btnNext = cc.find('buttons/btn_next', this.panel)
        this.btnShare = cc.find('buttons/btn_share', this.panel)
        this.btnNext.on('click', this.onNextClick, this)
        this.btnShare.on('click', this.onShareClick, this)
        this.btnClose = cc.find('btn_close', this.panel)
        this.btnClose.on('click', this.onCloseClick, this)
    }

    onDestroy() {
        this.btnNext.off('click', this.onNextClick, this)
        this.btnShare.off('click', this.onShareClick, this)
        this.btnClose.off('click', this.onCloseClick, this)
    }

    onEnable() {
        this.zoomIn(this.panel)
        SdkManager.instance.toggleBannerAd(true)
        StaticInstance.uiManager.setMainTimer(false)
        this.rendorKeys()
        this.rendorPower()
        this.rendorPowerTimer()
    }

    onDisable() {
        SdkManager.instance.toggleBannerAd(false)
    }

    onNextClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        if (DataManager.instance.power <= 0) {
            ToastManager.instance.show('能量已用完, 请先补充能量', { gravity: 'TOP', bg_color: cc.color(226, 69, 109, 255) })
            return
        }
        DataManager.instance.power -= 1
        DataManager.instance.save()
        StaticInstance.transitionsManager.play(ENUM_UI_TYPE.WIN, null, () => {
            StaticInstance.gameManager.onGameLevelStart()
        })
    }

    onShareClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        if (SdkManager.instance.getPlatform()) {
            SdkManager.instance.activeShare()
        } else {
            ToastManager.instance.show('仅支持小游戏平台', { gravity: 'TOP', bg_color: cc.color(226, 69, 109, 255) })
        }
    }

    onCloseClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MAIN_LEVEL, false)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.WIN, false)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MENU)
    }
}
