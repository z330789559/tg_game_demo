// Created by carolsail

import { ENUM_AUDIO_CLIP, ENUM_UI_TYPE } from "../Enum";
import { StaticInstance } from './../StaticInstance';
import AudioManager from "../manager/AudioManager";
import SdkManager from "../manager/SdkManager";
import ToastManager from "../manager/ToastManager";
import DataManager from "../manager/DataManager";
import { formatSeconds } from "../Utils";
import HeaderLayer from "./HeaderLayer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class OverLayer extends HeaderLayer {

    panel: cc.Node = null
    btnRestart: cc.Node = null
    btnShare: cc.Node = null
    scoreNode: cc.Node = null
    noticeNode: cc.Node = null
    particles: cc.Node = null
    btnClose: cc.Node = null

    onLoad() {
        super.onLoad()
        this.panel = cc.find('style/panel', this.node)
        this.btnRestart = cc.find('buttons/btn_restart', this.panel)
        this.btnShare = cc.find('buttons/btn_share', this.panel)
        this.btnRestart.on('click', this.onRestartClick, this)
        this.btnShare.on('click', this.onShareClick, this)
        this.scoreNode = cc.find('score', this.panel)
        this.noticeNode = cc.find('notice', this.panel)
        this.particles = cc.find('particles', this.panel)
        this.btnClose = cc.find('btn_close', this.panel)
        this.btnClose.on('click', this.onCloseClick, this)
    }

    onDestroy() {
        this.btnRestart.off('click', this.onRestartClick, this)
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
        this.rendorScore()
    }

    onDisable() {
        SdkManager.instance.toggleBannerAd(false)
    }

    rendorScore() {
        this.scoreNode.getComponent(cc.Label).string = `${formatSeconds(DataManager.instance.seconds, 'h:i:s')}`
        if (DataManager.instance.seconds < DataManager.instance.secondsRecord) {
            // 刷新纪录
            DataManager.instance.secondsRecord = DataManager.instance.seconds
            DataManager.instance.save()
            // 计入排行榜
            SdkManager.instance.setRank(DataManager.instance.secondsRecord)
            // 特效
            this.noticeNode.active = true
            this.particles.children.forEach(node => {
                node.getComponent(cc.ParticleSystem).resetSystem()
            })
        } else {
            this.noticeNode.active = false
        }
    }

    onRestartClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        StaticInstance.transitionsManager.play(ENUM_UI_TYPE.OVER, null, () => {
            StaticInstance.gameManager.onGameStart()
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
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MAIN, false)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.OVER, false)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MENU)
    }
}
