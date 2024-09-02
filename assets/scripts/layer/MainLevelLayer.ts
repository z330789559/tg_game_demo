// Created by carolsail

import { ENUM_AUDIO_CLIP, ENUM_GAME_STATUS, ENUM_UI_TYPE } from "../Enum";
import AudioManager from "../manager/AudioManager";
import DataManager, { CLEVEL_Data } from "../manager/DataManager";
import SdkManager from "../manager/SdkManager";
import ToastManager from "../manager/ToastManager";
import { StaticInstance } from "../StaticInstance";
import BaseLayer from "./Baselayer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainLevelLayer extends BaseLayer {

    btnPause: cc.Node = null
    btnPass: cc.Node = null
    crashNum: cc.Node = null
    tip: cc.Node = null

    onLoad() {
        this.btnPause = cc.find('btn_pause', this.node)
        this.btnPause.on('click', this.onPauseClick, this)
        this.btnPass = cc.find('btn_pass', this.node)
        this.btnPass.on('click', this.onPassClick, this)
        this.crashNum = cc.find('bar_crash/nums', this.node)
        this.tip = cc.find('bar_crash/tip', this.node)
    }

    onDestroy() {
        this.btnPause.off('click', this.onPauseClick, this)
        this.btnPass.off('click', this.onPassClick, this)
    }

    onEnable() { }

    onDisable() { }

    setCrashRendor() {
        let nums = DataManager.instance.crashTotal - DataManager.instance.crashCurrent
        nums = Math.max(0, nums)
        this.crashNum.getComponent(cc.Label).string = `${nums}`
    }

    setLevelTip() {
        let tip = '请将红色小车挪出车库'
        if (DataManager.instance.carNum > 1) tip = '请将所有车辆挪出车库'
        this.tip.getComponent(cc.Label).string = `${tip}`
    }

    onPauseClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.EXIT_LEVEL)
    }

    onPassClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        SdkManager.instance.showVideoAd((msg: string) => {
            if (!SdkManager.instance.getPlatform()) {
                ToastManager.instance.show(msg, { gravity: 'BOTTOM', bg_color: cc.color(102, 202, 28, 255) })
            }
            if (DataManager.instance.status == ENUM_GAME_STATUS.RUNING) {
                DataManager.instance.status = ENUM_GAME_STATUS.UNRUNING
                let clevel = DataManager.instance.clevel + 1
                clevel = Math.min(clevel, CLEVEL_Data.length)
                DataManager.instance.clevel = clevel
                if (clevel > DataManager.instance.clevelMax) DataManager.instance.clevelMax = clevel
                DataManager.instance.save()
                StaticInstance.transitionsManager.play(null, null, () => {
                    StaticInstance.gameManager.onGameLevelStart()
                })
            }
        }, (msg: string) => {
            ToastManager.instance.show(msg, { gravity: 'BOTTOM', bg_color: cc.color(226, 69, 109, 255) })
        })
    }
}
