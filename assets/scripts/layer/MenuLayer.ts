// Created by carolsail

import { ENUM_AUDIO_CLIP, ENUM_GAME_MODE, ENUM_UI_TYPE } from "../Enum";
import { StaticInstance } from './../StaticInstance';
import AudioManager from "../manager/AudioManager";
import SdkManager from "../manager/SdkManager";
import ToastManager from "../manager/ToastManager";
import HeaderLayer from "./HeaderLayer";
import DataManager from "../manager/DataManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MenuLayer extends HeaderLayer {

    btnStartTimer: cc.Node = null
    btnStartLevel: cc.Node = null
    btnSetting: cc.Node = null
    btnGames: cc.Node = null
    btnShare: cc.Node = null
    btnRank: cc.Node = null

    onLoad() {
        super.onLoad()
        this.btnStartTimer = cc.find('buttons/btn_start_timer', this.node)
        this.btnStartLevel = cc.find('buttons/btn_start_level', this.node)
        this.btnSetting = cc.find('right/btn_setting', this.node)
        this.btnShare = cc.find('right/btn_share', this.node)
        this.btnGames = cc.find('btn_more', this.node)
        this.btnStartTimer.on('click', this.onStartTimerClick, this)
        this.btnStartLevel.on('click', this.onStartLevelClick, this)
        this.btnSetting.on('click', this.onSettingClick, this)
        this.btnGames.on('click', this.onGamesClick, this)
        this.btnShare.on('click', this.onShareClick, this)
        this.btnRank = cc.find('buttons/btn_rank', this.node)
        this.btnRank.on('click', this.onRankClick, this)
    }

    onDestroy() {
        this.btnStartTimer.off('click', this.onStartTimerClick, this)
        this.btnStartLevel.off('click', this.onStartLevelClick, this)
        this.btnSetting.off('click', this.onSettingClick, this)
        this.btnGames.off('click', this.onGamesClick, this)
        this.btnShare.off('click', this.onShareClick, this)
        this.btnRank.off('click', this.onRankClick, this)
    }

    onEnable() {
        this.rendorKeys()
        this.rendorPower()
        this.rendorPowerTimer()
    }

    onDisable() { }

    onStartTimerClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        if (DataManager.instance.power <= 0) {
            ToastManager.instance.show('能量已用完, 请先补充能量', { gravity: 'TOP', bg_color: cc.color(226, 69, 109, 255) })
            return
        }
        DataManager.instance.mode = ENUM_GAME_MODE.TIMER
        DataManager.instance.power -= 1
        DataManager.instance.save()
        StaticInstance.transitionsManager.play(ENUM_UI_TYPE.MENU, ENUM_UI_TYPE.MAIN, () => {
            StaticInstance.gameManager.onGameStart()
        })
    }

    onStartLevelClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        if (DataManager.instance.power <= 0) {
            ToastManager.instance.show('能量已用完, 请先补充能量', { gravity: 'TOP', bg_color: cc.color(226, 69, 109, 255) })
            return
        }
        DataManager.instance.mode = ENUM_GAME_MODE.LEVEL
        DataManager.instance.power -= 1
        DataManager.instance.save()
        StaticInstance.transitionsManager.play(ENUM_UI_TYPE.MENU, ENUM_UI_TYPE.MAIN_LEVEL, () => {
            StaticInstance.gameManager.onGameLevelStart()
        })
    }

    onSettingClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MENU, false)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.SETTING)
    }

    onGamesClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MENU, false)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MORE)
    }

    onShareClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        if (SdkManager.instance.getPlatform()) {
            SdkManager.instance.activeShare()
        } else {
            ToastManager.instance.show('仅支持小游戏平台', { gravity: 'TOP', bg_color: cc.color(226, 69, 109, 255) })
        }
    }

    onRankClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MENU, false)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.RANK)
    }
}
