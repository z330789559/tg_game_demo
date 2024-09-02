// Created by carolsail

import { StaticInstance } from './StaticInstance';
import { ENUM_RESOURCE_TYPE, ENUM_UI_TYPE } from './Enum';
import AudioManager from "./manager/AudioManager";
import DataManager from './manager/DataManager';
import ResourceManager from "./manager/ResourceManager";
import SdkManager from './manager/SdkManager';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Index extends cc.Component {
    @property
    collisionManagerDebug: boolean = false;

    onLoad() {
        this.node.getChildByName('UI').opacity = 255
        cc.view.setResizeCallback(() => this.responsive())
        this.responsive()
        DataManager.instance.loadingRate = 0
        // 碰撞系统
        const colManager = cc.director.getCollisionManager();
        colManager.enabled = true;
        if (this.collisionManagerDebug) colManager.enabledDebugDraw = true;
    }

    async start() {
        // 加载资源
        for (const index in ENUM_RESOURCE_TYPE) {
            const resource = ENUM_RESOURCE_TYPE[index]
            await ResourceManager.instance.loadRes(resource)
        }
        // 加载ui
        StaticInstance.uiManager.init()
        // 读档
        DataManager.instance.restore()
        // 播放音乐
        AudioManager.instance.playMusic()
        // 加载sdk
        SdkManager.instance.initAudioEndListener()
        SdkManager.instance.passiveShare()
        SdkManager.instance.getRank()
        SdkManager.instance.initBannerAd()
        SdkManager.instance.initInterstitialAd()
        SdkManager.instance.initVideoAd()
        SdkManager.instance.initCustomRowAd()
        SdkManager.instance.initCustomColAd()
        // 离开后体力恢复逻辑
        this.onPowerIncrease()
        // 操作ui
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MENU, true, () => {
            DataManager.instance.loadingRate = 1
        })
    }

    // 屏幕响应式
    responsive() {
        const designSize = cc.view.getDesignResolutionSize();
        const viewSize = cc.view.getFrameSize();

        const setFitWidth = () => {
            cc.Canvas.instance.fitHeight = false;
            cc.Canvas.instance.fitWidth = true;
        }

        const setFitHeight = () => {
            cc.Canvas.instance.fitHeight = true;
            cc.Canvas.instance.fitWidth = false;
        }

        const setFitBoth = () => {
            cc.Canvas.instance.fitHeight = true;
            cc.Canvas.instance.fitWidth = true;
        }

        const designRatio = designSize.width / designSize.height
        const viewRatio = viewSize.width / viewSize.height
        if (designRatio < 1) {
            // console.error('--竖屏游戏')
            if (viewRatio < 1) {
                if (viewRatio > designRatio) {
                    setFitBoth()
                } else {
                    setFitWidth()
                }
            } else {
                setFitBoth()
            }
        } else {
            // console.error('--宽屏游戏')
            if (viewRatio > 1) {
                if (viewRatio < designRatio) {
                    setFitBoth()
                } else {
                    setFitHeight()
                }
            } else {
                setFitBoth()
            }
        }
    }

    onPowerIncrease() {
        // 体力小于5的时候需要补充
        if (DataManager.instance.power < 5) {
            const now = new Date().getTime()
            const seconds = Math.floor((now - DataManager.instance.lastPowerUpdateTime) / 1000)
            const powers = Math.floor(seconds / DataManager.instance.powerRefreshTime)
            if (DataManager.instance.power + powers >= 5) {
                DataManager.instance.power = 5
                DataManager.instance.lastPowerRefreshTime = 0
            } else {
                DataManager.instance.power += powers
            }
            // console.log('自动补充体力', powers)
            DataManager.instance.save()
        }
    }
}
