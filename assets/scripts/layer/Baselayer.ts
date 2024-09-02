// Created by carolsail

const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseLayer extends cc.Component {

    show() {
        this.node.active = true;
    }

    hide() {
        this.node.active = false;
    }

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
}
