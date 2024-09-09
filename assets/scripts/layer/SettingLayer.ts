// Created by carolsail

import { ENUM_AUDIO_CLIP, ENUM_GAME_STATUS, ENUM_UI_TYPE } from "../Enum";
import { StaticInstance } from './../StaticInstance';
import AudioManager from "../manager/AudioManager";
import BaseLayer from "./Baselayer";
import DataManager from "../manager/DataManager";
import SdkManager from "../manager/SdkManager";
import BaseLanguageLayer from "./BaseLanguageLayer";
import SpriteManager from "../manager/SpriteManager";
import { Languages, LanguageType } from "../Languages";
import BaseItem from "./BaseItem";
import EventManager, { EventType } from "../manager/EventManager";

const { ccclass, property } = cc._decorator;

class YuYanItem extends BaseItem {
    label: cc.Label = null;
    nowData: any = null;
    init(): void {
        this.label = this.node.getChildByName("label").getComponent(cc.Label);
        this.onTouch(this.node, this.onTouchNode, this);
    }
    setData(data: any): void {
        this.nowData = data;
        this.label.string = Languages[this.nowData][DataManager.instance.language];
    }
    onTouchNode() {
        DataManager.instance.language = LanguageType[this.nowData];
        EventManager.instance.emit(EventType.UPDATE_LANGUAGE)
    }
}
@ccclass
export default class SettingLayer extends BaseLanguageLayer {

    panel: cc.Node = null
    btnMusic: cc.Node = null
    btnSound: cc.Node = null
    btnClose: cc.Node = null

    btnLanguage: cc.Node = null;
    content: cc.Node = null;
    nowLanguage: cc.Label = null;
    yuyanItem: cc.Node = null;

    show(): void {
        super.show();
        this.CreateListItem(this.content, this.yuyanItem, Object.keys(LanguageType), YuYanItem)
    }

    onLoad() {
        super.onLoad();
        this.panel = cc.find('style/panel', this.node)
        this.btnMusic = cc.find('buttons/btn_music', this.panel)
        this.btnSound = cc.find('buttons/btn_sound', this.panel)
        this.btnClose = cc.find('btn_close', this.panel);
        this.btnLanguage = cc.find('btnyuyan', this.panel);
        this.content = cc.find('content', this.btnLanguage);
        this.yuyanItem = cc.find('yuyanItem', this.node);
        this.nowLanguage = cc.find('nowyuyan', this.btnLanguage).getComponent(cc.Label);
        this.btnMusic.on('click', this.onMusicClick, this)
        this.btnSound.on('click', this.onSoundClick, this)
        this.btnClose.on('click', this.onCloseClick, this)
        this.onTouch(this.btnLanguage, this.onLanguageClick, this);
    }

    onDestroy() {
        super.onDestroy();
        this.btnMusic.off('click', this.onMusicClick, this)
        this.btnSound.off('click', this.onSoundClick, this)
        this.btnClose.off('click', this.onCloseClick, this)
    }

    onEnable() {
        this.zoomIn(this.panel)
        this.rendorMusic()
        this.rendorSound()
        this.content.active = false;
        this.updateNowLanguageLabel();
        SdkManager.instance.showInterstitialAd()
    }

    updateNowLanguageLabel() {
        // this.nowLanguage.string=Languages[]
    }
    onDisable() { }

    onCloseClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.SETTING, false)
        // StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MENU)
    }
    onLanguageClick() {
        if (this.content.active) {
            this.content.active = false;
        } else {
            this.content.active = true;
        }
    }

    onSoundClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        DataManager.instance.isSoundOn = !DataManager.instance.isSoundOn
        DataManager.instance.save()
        this.rendorSound()
    }

    onMusicClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        DataManager.instance.isMusicOn = !DataManager.instance.isMusicOn
        DataManager.instance.save()
        if (DataManager.instance.isMusicOn) {
            AudioManager.instance.playMusic()
        } else {
            AudioManager.instance.stopMusic()
        }
        this.rendorMusic()
    }

    rendorMusic() {
        let index = DataManager.instance.isMusicOn ? 1 : 0
        this.btnMusic.getComponent(cc.Sprite).spriteFrame = SpriteManager.settingBtn[index]
        // this.btnMusic.getChildByName('on').active = DataManager.instance.isMusicOn
        // this.btnMusic.getChildByName('off').active = !DataManager.instance.isMusicOn
    }

    rendorSound() {
        let index = DataManager.instance.isSoundOn ? 1 : 0
        this.btnSound.getComponent(cc.Sprite).spriteFrame = SpriteManager.settingBtn[index]
        // this.btnSound.getChildByName('on').active = DataManager.instance.isSoundOn
        // this.btnSound.getChildByName('off').active = !DataManager.instance.isSoundOn
    }
}
