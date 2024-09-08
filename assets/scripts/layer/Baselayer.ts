// Created by carolsail

import { ENUM_AUDIO_CLIP } from "../Enum";
import AudioManager from "../manager/AudioManager";
import EventManager, { EventType } from "../manager/EventManager";
import BaseItem from "./BaseItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseLayer extends cc.Component {

    /**保存当前所有的注册的节点点击事件 */
    allNodeClickEvent: Array<any> = [];
    protected onLoad(): void {
        this.allNodeClickEvent = [];
    }
    show() {
        this.node.active = true;
        EventManager.instance.on(EventType.UPDATE_LANGUAGE, this.updateLanguage);
        this.updateLanguage();
    }

    hide() {
        this.node.active = false;
        EventManager.instance.off(EventType.UPDATE_LANGUAGE, this.updateLanguage);
    }
    /**语言更新 */
    updateLanguage() { }

    zoomIn(node: cc.Node, scale: number = 1.5, speed: number = 0.3) {
        node.setScale(scale)
        const act = cc.scaleTo(speed, 1)
        cc.tween(node).then(act).start()
    }

    zoomOut(node: cc.Node, scale: number = 0.5, speed: number = 0.3) {
        node.setScale(scale)
        const act = cc.scaleTo(speed, 1)
        cc.tween(node).then(act).start()
    }
    onTouch(node: cc.Node, cb: any, target?: any) {
        if (!node.getComponent(cc.Button)) {
            node.addComponent(cc.Button);
            node.getComponent(cc.Button).transition = cc.Button.Transition.SCALE;
            node.getComponent(cc.Button).duration = 0.1;
            node.getComponent(cc.Button).zoomScale = 0.9;
        }
        let callback = () => {
            AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
            cb && cb.call(target)
        }
        node.on('click', callback, this);
        this.allNodeClickEvent.push({
            node: node,
            callback: callback,
            target: this
        })
    }
    protected onDestroy(): void {
        for (let i = 0; i < this.allNodeClickEvent.length; i++) {
            let item = this.allNodeClickEvent[i];
            item.node.off('click', item.callback, item.target);
        }
        this.allNodeClickEvent = [];
    }
    protected CreateListItem(content: cc.Node, itemNode: any, data: Array<any>, Base: typeof BaseItem) {
        let child = content.children;
        for (let i = 0; i < data.length; i++) {
            if (!child[i]) {
                let item = cc.instantiate(itemNode);
                content.addChild(item);
            }
            child[i].active = true;
            if (!child[i].getComponent(Base)) {
                child[i].addComponent(Base);
                child[i].getComponent(Base).init();
            }
            child[i].getComponent(Base).setData(data[i]);
        }
        if (child.length > data.length) {
            for (let i = data.length; i < child.length; i++) {
                child[i].active = false;
            }
        }
    }
}
