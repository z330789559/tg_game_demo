// Created by carolsail

import { ENUM_AUDIO_CLIP, ENUM_GAME_STATUS, ENUM_UI_TYPE } from "../Enum";
import { StaticInstance } from './../StaticInstance';
import AudioManager from "../manager/AudioManager";
import BaseLayer from "./Baselayer";
import SdkManager from "../manager/SdkManager";
import DataManager from "../manager/DataManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ExitLayer extends BaseLayer {

    panel: cc.Node = null
    btnSubmit: cc.Node = null
    btnClose: cc.Node = null

    onLoad() {
        this.panel = cc.find('style/panel', this.node)
        this.btnSubmit = cc.find('btn_submit', this.panel)
        this.btnClose = cc.find('btn_close', this.panel)
        this.btnSubmit.on('click', this.onSubmitClick, this)
        this.btnClose.on('click', this.onCloseClick, this)
    }

    onDestroy() {
        this.btnSubmit.off('click', this.onSubmitClick, this)
        this.btnClose.off('click', this.onCloseClick, this)
    }

    onEnable() {
        this.zoomIn(this.panel)
        SdkManager.instance.toggleBannerAd(true)
    }

    onDisable() {
        SdkManager.instance.toggleBannerAd(false)
    }

    onCloseClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.EXIT, false)
    }

    onSubmitClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        StaticInstance.uiManager.setMainTimer(false)
        DataManager.instance.status = ENUM_GAME_STATUS.UNRUNING
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MAIN, false)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.EXIT, false)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MENU)
    }
}
