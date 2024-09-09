

const { ccclass, property } = cc._decorator;

@ccclass
export default class SpriteManager extends cc.Component {

    @property(cc.SpriteFrame)
    modelSpriteFrame: Array<cc.SpriteFrame> = [];
    @property(cc.SpriteFrame)
    taskIconSprite: Array<cc.SpriteFrame> = [];
    @property(cc.SpriteFrame)
    shopIconSprite: Array<cc.SpriteFrame> = [];
    @property(cc.SpriteFrame)
    shareIconSprite: Array<cc.SpriteFrame> = [];
    @property(cc.SpriteFrame)
    custemPuSprite: Array<cc.SpriteFrame> = [];
    @property(cc.SpriteFrame)
    custemTZSprite: Array<cc.SpriteFrame> = [];
    @property(cc.SpriteFrame)
    settingBtnSprite: Array<cc.SpriteFrame> = [];


    /**模式选择按钮 */
    static ModelSprite: Array<cc.SpriteFrame> = [];
    /**任务按钮 */
    static taskIcon: Array<cc.SpriteFrame> = [];
    /**商店按钮 */
    static shopIcon: Array<cc.SpriteFrame> = [];
    /**邀请按钮 */
    static shareIcon: Array<cc.SpriteFrame> = [];
    /**普通关卡 */
    static custemIcon: Array<cc.SpriteFrame> = [];
    /**挑战关卡 */
    static custemTZIcon: Array<cc.SpriteFrame> = [];
    /**设置按钮 */
    static settingBtn: Array<cc.SpriteFrame> = [];
    protected onLoad(): void {
        SpriteManager.ModelSprite = this.modelSpriteFrame;
        SpriteManager.taskIcon = this.taskIconSprite;
        SpriteManager.shopIcon = this.shopIconSprite;
        SpriteManager.shareIcon = this.shareIconSprite;
        SpriteManager.custemIcon = this.custemPuSprite;
        SpriteManager.custemTZIcon = this.custemTZSprite;
        SpriteManager.settingBtn = this.settingBtnSprite;
    }

    start() {

    }

}
