// Created by carolsail

import { ENUM_AUDIO_CLIP, ENUM_GAME_STATUS, ENUM_UI_TYPE } from "../Enum";
import { StaticInstance } from './../StaticInstance';
import AudioManager from "../manager/AudioManager";
import BaseLayer from "./Baselayer";
import SdkManager from "../manager/SdkManager";
import DataManager from "../manager/DataManager";
import BaseLanguageLayer from "./BaseLanguageLayer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ExitLevelLayer extends BaseLanguageLayer {

    panel: cc.Node = null
    btnClose: cc.Node = null
    btnSubmit: cc.Node = null
    btnRestart: cc.Node = null

    onLoad() {
        super.onLoad()
        this.panel = cc.find('style/panel', this.node)
        this.btnSubmit = cc.find('btn_submit', this.panel)
        this.btnRestart = cc.find('btn_restart', this.panel)
        this.btnClose = cc.find('btn_close', this.panel)
        this.btnSubmit.on('click', this.onSubmitClick, this)
        this.btnRestart.on('click', this.onRestartClick, this)
        this.btnClose.on('click', this.onCloseClick, this)
    }

    onDestroy() {
        this.btnSubmit.off('click', this.onSubmitClick, this)
        this.btnRestart.off('click', this.onRestartClick, this)
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
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.EXIT_LEVEL, false)
    }

    onSubmitClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        DataManager.instance.status = ENUM_GAME_STATUS.UNRUNING
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MAIN_LEVEL, false)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.EXIT_LEVEL, false)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MENU)
    }

    onRestartClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        StaticInstance.transitionsManager.play(ENUM_UI_TYPE.EXIT_LEVEL, null, () => {
            StaticInstance.gameManager.onGameLevelStart()
        })
    }
}
