// Created by carolsail

import { ENUM_AUDIO_CLIP } from "../Enum";
import { formatSeconds } from "../Utils";
import AudioManager from "../manager/AudioManager";
import DataManager from "../manager/DataManager";
import SdkManager from "../manager/SdkManager";
import ToastManager from "../manager/ToastManager";
import BaseLanguageLayer from "./BaseLanguageLayer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HeaderLayer extends BaseLanguageLayer {

    barPower: cc.Node = null
    barKey: cc.Node = null
    timerPower: cc.Node = null

    onLoad() {
        super.onLoad();
        this.barPower = cc.find('bar/power', this.node)
        this.barKey = cc.find('bar/key', this.node)
        this.timerPower = cc.find('timer', this.barPower)
    }

    rendorPower() {
        if (!this.barPower) return
        const num = this.barPower.getChildByName('nums')
        const btn = this.barPower.getChildByName('icon')
        if (num) num.getComponent(cc.Label).string = `${DataManager.instance.power}`
        if (btn && !btn.hasEventListener('click')) {
            btn.on('click', () => {
                this.getRewardByVideo('power')
            })
        }
    }

    rendorKeys() {
        if (!this.barKey) return
        const num = this.barKey.getChildByName('nums')
        const btn = this.barKey.getChildByName('icon')
        if (num) num.getComponent(cc.Label).string = `${DataManager.instance.keys}`
        if (btn && !btn.hasEventListener('click')) {
            btn.on('click', () => {
                this.getRewardByVideo('keys')
            })
        }
    }

    getRewardByVideo(type: string = 'keys') {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        SdkManager.instance.showVideoAd((msg: string) => {
            if (!SdkManager.instance.getPlatform()) {
                ToastManager.instance.show(msg, { gravity: 'BOTTOM', bg_color: cc.color(102, 202, 28, 255) })
            }
            if (type == 'keys') {
                AudioManager.instance.playSound(ENUM_AUDIO_CLIP.GET_MONEY)
                DataManager.instance.keys += DataManager.instance.keysCollectByVideo
                DataManager.instance.save()
                this.rendorKeys()
            } else {
                AudioManager.instance.playSound(ENUM_AUDIO_CLIP.GET_MONEY)
                DataManager.instance.power += DataManager.instance.powerCollectByVideo
                DataManager.instance.save()
                this.rendorPower()
            }
        }, (msg: string) => {
            ToastManager.instance.show(msg, { gravity: 'BOTTOM', bg_color: cc.color(226, 69, 109, 255) })
        })
    }

    rendorPowerTimer() {
        if (!this.timerPower) return
        this.unscheduleAllCallbacks()
        let isSchedule: boolean = true
        if (DataManager.instance.power >= 5) isSchedule = false
        if (DataManager.instance.lastPowerRefreshTime > 0) isSchedule = true
        if (isSchedule) {
            let time = DataManager.instance.powerRefreshTime - DataManager.instance.lastPowerRefreshTime
            this.timerPower.getComponent(cc.Label).string = formatSeconds(time, 'i:s')
            const callback = () => {
                time -= 1
                if (time <= 0) {
                    DataManager.instance.power += 1
                    this.rendorPower()
                    if (DataManager.instance.power >= 5) {
                        this.unschedule(callback)
                        this.timerPower.getComponent(cc.Label).string = ''
                        DataManager.instance.lastPowerRefreshTime = 0
                    } else {
                        time = DataManager.instance.powerRefreshTime
                        DataManager.instance.lastPowerRefreshTime = 0
                        this.timerPower.getComponent(cc.Label).string = formatSeconds(time, 'i:s')
                    }
                } else {
                    this.timerPower.getComponent(cc.Label).string = formatSeconds(time, 'i:s')
                    DataManager.instance.lastPowerRefreshTime = DataManager.instance.powerRefreshTime - time
                }
                DataManager.instance.lastPowerUpdateTime = new Date().getTime()
                DataManager.instance.save()
            }
            this.schedule(callback, 1)
        }
    }
}
