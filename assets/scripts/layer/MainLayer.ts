// Created by carolsail

import { ENUM_AUDIO_CLIP, ENUM_GAME_STATUS, ENUM_UI_TYPE } from "../Enum";
import AudioManager from "../manager/AudioManager";
import DataManager from "../manager/DataManager";
import { StaticInstance } from "../StaticInstance";
import { formatSeconds } from "../Utils";
import BaseLayer from "./Baselayer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainLayer extends BaseLayer {

    btnPause: cc.Node = null
    levelUpNode: cc.Node = null
    timerNum: cc.Node = null
    skills: cc.Node
    skillTip: cc.Node

    onLoad() {
        this.btnPause = cc.find('btn_pause', this.node)
        this.btnPause.on('click', this.onPauseClick, this)
        this.levelUpNode = cc.find('level_up', this.node)
        this.timerNum = cc.find('bar_seconds/nums', this.node)
        this.skills = cc.find('skills', this.node)
        this.skills.children.forEach((node, index) => {
            node.on('click', () => this.onSkillClick(index), this)
        })
        this.skillTip = cc.find('skill_tip', this.node)
    }

    onDestroy() {
        this.btnPause.off('click', this.onPauseClick, this)
    }

    onEnable() { }

    onDisable() { }

    onPauseClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.EXIT)
    }

    setLevelUpNotice() {
        this.levelUpNode.stopAllActions()
        this.levelUpNode.x = 600
        const act1 = cc.moveTo(0.5, 0, this.levelUpNode.y)
        const act2 = cc.delayTime(1)
        const act3 = cc.moveTo(0.5, -600, this.levelUpNode.y)
        const act = cc.sequence(act1, act2, act3)
        cc.tween(this.levelUpNode).then(act).start()
    }

    setTimerRendor() {
        const label = this.timerNum.getComponent(cc.Label)
        label.string = formatSeconds(`${DataManager.instance.seconds}`, 'h:i:s')
    }

    onTimerStart() {
        const label = this.timerNum.getComponent(cc.Label)
        this.unscheduleAllCallbacks()
        this.schedule(() => {
            DataManager.instance.seconds++
            label.string = formatSeconds(`${DataManager.instance.seconds}`, 'h:i:s')
        }, 1)
    }

    onTimerStop() {
        this.unscheduleAllCallbacks()
    }

    onSkillClick(index: number) {
        if (DataManager.instance.isSkilling) return
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        DataManager.instance.skillIndex = index
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.SKILL_SUBMIT)
        StaticInstance.uiManager.setMainTimer(false)
    }

    setSkillTip() {
        this.skillTip.active = DataManager.instance.isSkilling
        if (DataManager.instance.isSkilling) {
            const tips = cc.find('content/tips', this.skillTip)
            tips.children.forEach((tip, index) => {
                tip.active = DataManager.instance.skillIndex == index
            })
            const btnClose = cc.find('content/btn_close', this.skillTip)
            if (!btnClose.hasEventListener('click')) {
                btnClose.on('click', () => {
                    AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
                    this.skillTip.active = false
                    DataManager.instance.skillIndex = -1
                    DataManager.instance.isSkilling = false
                }, this)
            }
        }
    }
}
