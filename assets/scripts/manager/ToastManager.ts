// Created by carolsail

export default class ToastManager {

    private static _instance: any = null

    static getInstance<T>(): T {
        if (this._instance === null) {
            this._instance = new this()
        }

        return this._instance
    }

    static get instance() {
        return this.getInstance<ToastManager>()
    }

    show(text: string = '', {gravity = 'CENTER', duration = 1, bg_color = cc.color(102, 102, 102, 200)} = {}){
        // canvas
        let canvas = cc.director.getScene().getComponentInChildren(cc.Canvas);
        let width = canvas.node.width;
        let height = canvas.node.height;

        // 节点
        let bgNode = new cc.Node();
        bgNode.group = 'ui'

        // Lable文本格式设置
        let textNode = new cc.Node();
        let textLabel = textNode.addComponent(cc.Label);
        textLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        textLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        textLabel.fontSize = 30;
        textLabel.string = text;

        // 当文本宽度过长时，设置为自动换行格式
        if (text.length * textLabel.fontSize > (width * 3) / 5) {
            textNode.width = (width * 3) / 5;
            textLabel.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
        } else {
            textNode.width = text.length * textLabel.fontSize;
        }
        let lineCount =
            ~~((text.length * textLabel.fontSize) / ((width * 3) / 5)) + 1;
        textNode.height = textLabel.fontSize * lineCount;

        // 背景设置
        let ctx = bgNode.addComponent(cc.Graphics);
        ctx.arc(
            -textNode.width / 2,
            0,
            textNode.height / 2 + 20,
            0.5 * Math.PI,
            1.5 * Math.PI,
            true
        );
        ctx.lineTo(textNode.width / 2, -(textNode.height / 2 + 20));
        ctx.arc(
            textNode.width / 2,
            0,
            textNode.height / 2 + 20,
            1.5 * Math.PI,
            0.5 * Math.PI,
            true
        );
        ctx.lineTo(-textNode.width / 2, textNode.height / 2 + 20);
        ctx.fillColor = bg_color;
        ctx.fill();

        bgNode.addChild(textNode);

        // gravity 设置Toast显示的位置
        if (gravity === "CENTER") {
            bgNode.y = 0;
            bgNode.x = 0;
        } else if (gravity === "TOP") {
            bgNode.y = bgNode.y + (height / 5) * 2;
        } else if (gravity === "BOTTOM") {
            bgNode.y = bgNode.y - (height / 5) * 2;
        }

        canvas.node.addChild(bgNode);
        // 执行动画
        let finished = cc.callFunc(function() {
            bgNode.destroy();
        });
        let action = cc.sequence(
            cc.moveBy(duration, cc.v2(0, 0)),
            cc.fadeOut(0.3),
            finished
        );
        // bgNode.runAction(action); 
        cc.tween(bgNode).then(action).start()
    }
}
