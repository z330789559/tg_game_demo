// Created by carolsail
import { StaticInstance } from '../StaticInstance';
import { ENUM_UI_TYPE } from '../Enum';

const {ccclass, property} = cc._decorator;

@ccclass
export default class UITransitionControl extends cc.Component {

    @property
    transitionTime: number = 0.3

    mask: cc.Mask = null
    img: cc.Node = null
    scale: number = 0
    
    protected onLoad(): void {
        StaticInstance.setTransitionManager(this)

        const winSize = cc.winSize;
        this.mask = this.node.getComponent(cc.Mask)
        this.img = this.node.getChildByName('img')
        this.img.width = winSize.width
        this.img.height = winSize.height

        const size = Math.max(winSize.width, winSize.height)
        this.scale = size / this.node.width
        this.node.scale = this.scale
    }

    play(from: ENUM_UI_TYPE = null, to: ENUM_UI_TYPE = null, changed?: () => void, finished?: () => void){
        this.img.opacity = 255
        const act1 = cc.scaleTo(this.transitionTime, 1)
        const act2 = cc.callFunc(()=>{
            if (from) StaticInstance.uiManager.toggle(from, false)
            if (to) StaticInstance.uiManager.toggle(to)
            changed && changed()
        })
        const act3 = cc.scaleTo(this.transitionTime, this.scale)
        const act4 = cc.callFunc(()=>{
            this.img.opacity = 0
            finished && finished()
        })
        const act = cc.sequence(act1, act2, act3, act4)
        cc.tween(this.node).then(act).start()
    }

    onStart(from: ENUM_UI_TYPE = null, to: ENUM_UI_TYPE = null, callback?: () => void){
        this.img.opacity = 255
        const act1 = cc.scaleTo(this.transitionTime, 1)
        const act2 = cc.callFunc(()=>{
            this.mask.enabled = false
            if (from) StaticInstance.uiManager.toggle(from, false)
            if (to) StaticInstance.uiManager.toggle(to)
            callback && callback()
        })
        const act = cc.sequence(act1, act2)
        cc.tween(this.node).then(act).start()
    }

    onEnd(){
        this.scheduleOnce(()=>{
            this.mask.enabled = true
            const act1 = cc.scaleTo(this.transitionTime, this.scale)
            const act2 = cc.callFunc(()=>{
                this.img.opacity = 0
            })
            const act = cc.sequence(act1, act2)
            cc.tween(this.node).then(act).start()
        })
    }
}
