// Created by carolsail

import { ENUM_AUDIO_CLIP, ENUM_UI_TYPE } from "../Enum";
import { StaticInstance } from './../StaticInstance';
import AudioManager from "../manager/AudioManager";
import SdkManager from "../manager/SdkManager";
import ToastManager from "../manager/ToastManager";
import DataManager, { CLEVEL_Data } from "../manager/DataManager";
import HeaderLayer from "./HeaderLayer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoseLayer extends HeaderLayer {

    panel: cc.Node = null
    btnRestart: cc.Node = null
    btnNext: cc.Node = null
    btnClose: cc.Node = null

    onLoad() {
        super.onLoad()
        this.panel = cc.find('style/panel', this.node)
        this.btnRestart = cc.find('buttons/btn_restart', this.panel)
        this.btnNext = cc.find('buttons/btn_next', this.panel)
        this.btnRestart.on('click', this.onRestartClick, this)
        this.btnNext.on('click', this.onNextClick, this)
        this.btnClose = cc.find('btn_close', this.panel)
        this.btnClose.on('click', this.onCloseClick, this)
    }

    onDestroy() {
        this.btnRestart.off('click', this.onRestartClick, this)
        this.btnNext.off('click', this.onNextClick, this)
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

    onRestartClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        if (DataManager.instance.power <= 0) {
            ToastManager.instance.show('能量已用完, 请先补充能量', { gravity: 'TOP', bg_color: cc.color(226, 69, 109, 255) })
            return
        }
        DataManager.instance.power -= 1
        DataManager.instance.save()
        StaticInstance.transitionsManager.play(ENUM_UI_TYPE.LOSE, null, () => {
            StaticInstance.gameManager.onGameLevelStart()
        })
    }

    onNextClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        SdkManager.instance.showVideoAd((msg: string) => {
            if (!SdkManager.instance.getPlatform()) {
                ToastManager.instance.show(msg, { gravity: 'BOTTOM', bg_color: cc.color(102, 202, 28, 255) })
            }
            let clevel = DataManager.instance.clevel + 1
            clevel = Math.min(clevel, CLEVEL_Data.length)
            DataManager.instance.clevel = clevel
            if (clevel > DataManager.instance.clevelMax) DataManager.instance.clevelMax = clevel
            DataManager.instance.save()
            StaticInstance.transitionsManager.play(ENUM_UI_TYPE.LOSE, null, () => {
                StaticInstance.gameManager.onGameLevelStart()
            })
        }, (msg: string) => {
            ToastManager.instance.show(msg, { gravity: 'BOTTOM', bg_color: cc.color(226, 69, 109, 255) })
        })
    }

    onCloseClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MAIN_LEVEL, false)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.LOSE, false)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MENU)
    }
}
