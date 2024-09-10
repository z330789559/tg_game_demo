import { ENUM_AUDIO_CLIP } from "../Enum";
import { Languages } from "../Languages";
import AudioManager from "../manager/AudioManager";
import DataManager from "../manager/DataManager";
import EventManager, { EventType } from "../manager/EventManager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseItem extends cc.Component {

    /**保存当前所有的注册的节点点击事件 */
    allNodeClickEvent: Array<any> = [];
    allLabels: Array<any> = [];
    protected onLoad(): void {
        this.allNodeClickEvent = [];
        this.allLabels = [];
        this.node.walk((node) => {
            if (node.getComponent(cc.Label)) {
                this.allLabels.push(node.getComponent(cc.Label))
            }
        }, null)
    }

    start() {
        this.updateLanguage();
    }
    init() {

    }
    setData(data: any) {

    }

    protected onEnable(): void {
        EventManager.instance.on(EventType.UPDATE_LANGUAGE, this.updateLanguage, this);
    }
    protected onDisable(): void {
        EventManager.instance.off(EventType.UPDATE_LANGUAGE, this.updateLanguage, this);
    }
    updateLanguage() {
        for (let i = 0; i < this.allLabels.length; i++) {
            let name = this.allLabels[i].node.name;
            if (Languages[name]) {
                this.allLabels[i].string = Languages[name][DataManager.instance.language]
            }
        }
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

    // update (dt) {}
}
