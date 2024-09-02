// Created by carolsail

import { ENUM_UI_TYPE } from './../Enum';
import { StaticInstance } from './../StaticInstance';
import BaseLayer from '../layer/Baselayer';
import PoolManager from './PoolManager';
import MainLayer from '../layer/MainLayer';
import MainLevelLayer from '../layer/MainLevelLayer';

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {

    private uiMap = new Map<ENUM_UI_TYPE, BaseLayer>()

    protected onLoad(): void {
        StaticInstance.setUIManager(this)
    }

    init() {
        for (let type in ENUM_UI_TYPE) {
            const node: cc.Node = PoolManager.instance.getNode(ENUM_UI_TYPE[type], this.node)
            if (node && !this.uiMap.has(ENUM_UI_TYPE[type])) {
                node.active = false
                node.addComponent(ENUM_UI_TYPE[type])
                this.uiMap.set(ENUM_UI_TYPE[type], node.getComponent(ENUM_UI_TYPE[type]))
            }
        }
    }

    toggle(key: ENUM_UI_TYPE, status: boolean = true, callback?: () => void) {
        if (this.uiMap.has(key)) {
            const layer = this.uiMap.get(key)
            status ? layer.show() : layer.hide()
            callback && callback()
        }
    }

    isActive(key: ENUM_UI_TYPE) {
        if (this.uiMap.has(key)) {
            return this.uiMap.get(key).node.active
        }
        return false
    }

    getActiveTypes() {
        const types: ENUM_UI_TYPE[] = []
        this.uiMap.forEach((layer: BaseLayer, type: ENUM_UI_TYPE) => {
            if (this.isActive(type)) types.push(type)
        })
        return types
    }

    setMainLevelUpNotice() {
        const layer: MainLayer = this.uiMap.get(ENUM_UI_TYPE.MAIN) as MainLayer
        layer?.setLevelUpNotice()
    }

    setMainTimer(status: boolean = true) {
        const layer: MainLayer = this.uiMap.get(ENUM_UI_TYPE.MAIN) as MainLayer
        if (status) {
            layer?.onTimerStart()
        } else {
            layer?.onTimerStop()
        }
    }

    setMainTimerRendor() {
        const layer: MainLayer = this.uiMap.get(ENUM_UI_TYPE.MAIN) as MainLayer
        layer?.setTimerRendor()
    }

    setMainSkillTip() {
        const layer: MainLayer = this.uiMap.get(ENUM_UI_TYPE.MAIN) as MainLayer
        layer?.setSkillTip()
    }

    setMainLevelCrash() {
        const layer: MainLevelLayer = this.uiMap.get(ENUM_UI_TYPE.MAIN_LEVEL) as MainLevelLayer
        layer?.setCrashRendor()
    }

    setMainLevelTip() {
        const layer: MainLevelLayer = this.uiMap.get(ENUM_UI_TYPE.MAIN_LEVEL) as MainLevelLayer
        layer?.setLevelTip()
    }
}
