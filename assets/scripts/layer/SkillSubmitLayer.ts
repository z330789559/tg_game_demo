// Created by carolsail

import { ENUM_AUDIO_CLIP, ENUM_UI_TYPE } from "../Enum";
import { StaticInstance } from './../StaticInstance';
import AudioManager from "../manager/AudioManager";
import SdkManager from "../manager/SdkManager";
import DataManager from "../manager/DataManager";
import HeaderLayer from "./HeaderLayer";
import ToastManager from "../manager/ToastManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkillSubmitLayer extends HeaderLayer {

    style: cc.Node = null
    btnSubmit: cc.Node = null
    btnClose: cc.Node = null

    onLoad() {
        super.onLoad()
        this.style = cc.find('style', this.node)
    }

    onDestroy() { }

    onEnable() {
        SdkManager.instance.showInterstitialAd()
        this.rendorPower()
        this.rendorPowerTimer()
        this.rendorKeys()
        this.rendorPanel()
    }

    onDisable() { }

    rendorPanel() {
        let panel = null
        this.style.children.forEach((node, index) => {
            if (index == DataManager.instance.skillIndex) panel = node
            node.active = index == DataManager.instance.skillIndex
        })
        this.zoomIn(panel)
        const btnClose: cc.Node = panel.getChildByName('btn_close')
        const btnSubmit: cc.Node = panel.getChildByName('btn_submit')
        if (!btnClose.hasEventListener('click')) btnClose.on('click', this.onCloseClick, this)
        let keys = 0
        if (DataManager.instance.skillIndex > 1) keys = 1
        btnSubmit.getChildByName('icon_key').active = !(DataManager.instance.keys <= keys)
        btnSubmit.getChildByName('icon_video').active = (DataManager.instance.keys <= keys)
        if (!btnSubmit.hasEventListener('click')) btnSubmit.on('click', this.onSubmitClick, this)
    }

    onCloseClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        StaticInstance.uiManager.setMainTimer()
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.SKILL_SUBMIT, false)
    }

    onSubmitClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        let keys = 0
        if (DataManager.instance.skillIndex > 1) keys = 1
        if (DataManager.instance.keys <= keys) {
            SdkManager.instance.showVideoAd((msg: string) => {
                if (!SdkManager.instance.getPlatform()) {
                    ToastManager.instance.show(msg, { gravity: 'TOP', bg_color: cc.color(102, 202, 28, 255) })
                }
                DataManager.instance.isSkilling = true
                StaticInstance.uiManager.setMainSkillTip()
                StaticInstance.uiManager.setMainTimer(true)
                StaticInstance.uiManager.toggle(ENUM_UI_TYPE.SKILL_SUBMIT, false)
            }, (msg: string) => {
                ToastManager.instance.show(msg, { gravity: 'TOP', bg_color: cc.color(226, 69, 109, 255) })
            })
        } else {
            DataManager.instance.keys -= keys + 1
            DataManager.instance.isSkilling = true
            StaticInstance.uiManager.setMainSkillTip()
            StaticInstance.uiManager.setMainTimer(true)
            StaticInstance.uiManager.toggle(ENUM_UI_TYPE.SKILL_SUBMIT, false)
        }
    }
}
