import { ENUM_AUDIO_CLIP, ENUM_GAME_MODE, ENUM_UI_TYPE } from "../Enum";
import AudioManager from "../manager/AudioManager";
import DataManager, { CLEVEL_Data, LEVEL_DATA } from "../manager/DataManager";
import EventManager, { EventType } from "../manager/EventManager";
import PoolManager from "../manager/PoolManager";
import SdkManager from "../manager/SdkManager";
import SpriteManager from "../manager/SpriteManager";
import ToastManager from "../manager/ToastManager";
import { StaticInstance } from "../StaticInstance";
import BaseItem from "./BaseItem";
import BaseLanguageLayer from "./BaseLanguageLayer";

const { ccclass, property } = cc._decorator;


/**普通关卡数据 */
interface ILevelData {
    star: number//完成星级，0代表已开启，-1代表未开启
}
enum PanelType {
    Putong = 1,
    Tiaozhan,
}

/**普通关卡 */
class LevelItemPuTong extends BaseItem {
    levelLabel: cc.Label = null;
    sprite: cc.Sprite = null;
    nowData: any = null;
    unLock: cc.Node = null;
    init(): void {
        this.levelLabel = this.node.getChildByName('label').getComponent(cc.Label);
        this.unLock = this.node.getChildByName("unlock");
        this.sprite = this.node.getComponent(cc.Sprite);
        this.onTouch(this.node, this.onTouchClick, this);
    }
    setData(data: any): void {
        this.nowData = data;
        this.levelLabel.string = data.level;
        if (this.nowData.level < DataManager.instance.clevelMax) {//已完成
            this.sprite.spriteFrame = SpriteManager.custemIcon[1];
            this.unLock.active = false;
        } else if (this.nowData.level == DataManager.instance.clevelMax) {//已开启
            this.sprite.spriteFrame = SpriteManager.custemIcon[0];
            this.unLock.active = false;
        } else {//未解锁
            this.sprite.spriteFrame = SpriteManager.custemIcon[0];
            this.unLock.active = true;
        }
    }
    private onTouchClick() {
        if (this.nowData.level > DataManager.instance.clevelMax) {
            ToastManager.instance.show('关卡未解锁，请继续努力', { gravity: 'TOP', bg_color: cc.color(226, 69, 109, 255) })
            return;
        }
        EventManager.instance.emit(EventType.GOTO_LEVEL, PanelType.Putong, this.nowData.level)
    }
}
/**挑战关卡 */
class LevelItemTiaoZhan extends BaseItem {
    levelLabel: cc.Label = null;
    sprite: cc.Sprite = null;
    nowData: any = null;
    unLock: cc.Node = null;
    init(): void {
        this.levelLabel = this.node.getChildByName('label').getComponent(cc.Label);
        this.unLock = this.node.getChildByName('unlock');
        this.sprite = this.node.getComponent(cc.Sprite);
        this.onTouch(this.node, this.onTouchClick, this);
    }
    setData(data: any): void {
        this.nowData = data;
        this.levelLabel.string = data.level;
        if (this.nowData.level < DataManager.instance.levelMax) {//已完成
            this.sprite.spriteFrame = SpriteManager.custemTZIcon[this.nowData.star + 1];
            this.unLock.active = false;
        } else if (this.nowData.level == DataManager.instance.levelMax) {//已开启
            this.sprite.spriteFrame = SpriteManager.custemTZIcon[1];
            this.unLock.active = false;
        } else {//未解锁
            this.sprite.spriteFrame = SpriteManager.custemTZIcon[0];
            this.unLock.active = true;
        }
    }
    private onTouchClick() {
        if (this.nowData.level > DataManager.instance.levelMax) {
            ToastManager.instance.show('关卡未解锁，请继续努力', { gravity: 'TOP', bg_color: cc.color(226, 69, 109, 255) })
            return;
        }
        EventManager.instance.emit(EventType.GOTO_LEVEL, PanelType.Tiaozhan, this.nowData.level);
    }
}

@ccclass
export default class LevelSelectLayer extends BaseLanguageLayer {
    panel: cc.Node = null;
    btnClose: cc.Node = null;
    levelItemPuTong: cc.Node = null;
    levelItemTiaoZhan: cc.Node = null;
    content: cc.Node = null;
    btnPuTong: cc.Node = null;
    btnTiaoZhan: cc.Node = null;
    labelPuTong: cc.Node = null;
    labelTiaoZhan: cc.Node = null;
    panelType: PanelType = null;
    mode: cc.Sprite = null;

    onLoad() {
        super.onLoad()
        this.panel = cc.find('style/panel', this.node);
        this.btnClose = cc.find('close', this.panel);
        this.levelItemPuTong = cc.find('levelItemPuTong', this.node);
        this.levelItemTiaoZhan = cc.find('levelItemTiaoZhan', this.node);
        this.mode = cc.find('moshi', this.panel).getComponent(cc.Sprite);
        this.btnPuTong = cc.find('moshi/btnputong', this.panel);
        this.btnTiaoZhan = cc.find('moshi/btntiaozhan', this.panel);
        this.labelPuTong = cc.find('moshi/label1', this.panel);
        this.labelTiaoZhan = cc.find('moshi/label2', this.panel);
        this.content = cc.find('content', this.panel);
        this.onTouch(this.btnClose, this.onCloseClick, this);
        this.onTouch(this.btnPuTong, this.onPuTongClick, this);
        this.onTouch(this.btnTiaoZhan, this.onTiaoZhanClick, this);
        EventManager.instance.on(EventType.GOTO_LEVEL, this.gotoLevel, this);
    }
    show(): void {
        super.show();
        this.initPanel();
    }
    initPanel() {
        if (this.panelType == null) {
            this.panelType = PanelType.Putong
        }
        if (this.panelType == PanelType.Putong) {
            this.labelPuTong.active = true;
            this.labelTiaoZhan.active = false;
            this.mode.spriteFrame = SpriteManager.ModelSprite[0];
            this.removeItem();
            this.CreateListItem(this.content, this.levelItemPuTong, CLEVEL_Data, LevelItemPuTong)
        } else {
            this.labelPuTong.active = false;
            this.labelTiaoZhan.active = true;
            this.mode.spriteFrame = SpriteManager.ModelSprite[1];
            this.removeItem();
            this.CreateListItem(this.content, this.levelItemTiaoZhan, DataManager.instance.levelData, LevelItemTiaoZhan)
        }
    }
    onCloseClick() {
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.LEVEL_SELECT, false)
    }
    /**点击普通模式 */
    onPuTongClick() {
        if (this.panelType == PanelType.Putong) {
            return;
        }
        this.panelType = PanelType.Putong;
        this.initPanel();
    }
    /**点击挑战模式 */
    onTiaoZhanClick() {
        if (this.panelType == PanelType.Tiaozhan) {
            return;
        }
        this.panelType = PanelType.Tiaozhan;
        this.initPanel();
    }
    /**进入游戏 */
    gotoLevel(type, level) {
        if (DataManager.instance.power <= 0) {
            ToastManager.instance.show('能量已用完, 请先补充能量', { gravity: 'TOP', bg_color: cc.color(226, 69, 109, 255) })
            return
        }
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.LEVEL_SELECT, false)
        let layer = ENUM_UI_TYPE.MAIN_LEVEL
        if (type == PanelType.Putong) {
            DataManager.instance.mode = ENUM_GAME_MODE.LEVEL
        } else {
            layer = ENUM_UI_TYPE.MAIN;
            DataManager.instance.mode = ENUM_GAME_MODE.TIMER
        }
        DataManager.instance.power -= 1
        DataManager.instance.save()
        console.log(layer, "-------------------")
        StaticInstance.transitionsManager.play(null, layer, () => {
            StaticInstance.gameManager.onGameStart()
        })
    }
    onEnable() {
        this.zoomIn(this.panel)
        SdkManager.instance.toggleBannerAd(true)
    }

    onDisable() {
        SdkManager.instance.toggleBannerAd(false)
    }
    private removeItem() {
        let child = this.content.children;
        for (let i = child.length - 1; i >= 0; i--) {
            PoolManager.instance.putNode(child[i]);
        }
    }

    start() {

    }

    // update (dt) {}
}
