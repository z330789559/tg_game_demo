/*
 * @Author: carolsail 
 * @Date: 2023-07-19 11:53:28 
 * @Last Modified by:   carolsail 
 * @Last Modified time: 2023-07-19 11:53:28 
 */

import PoolManager from "./PoolManager";

export default class EffectManager {
    public static _instance: EffectManager = null

    public static get instance() {
        if (null == this._instance) {
            this._instance = new EffectManager();
        }
        return this._instance
    }

    play(effect: string, parent: cc.Node, options?: any) {
        const effNode = PoolManager.instance.getNode(`${effect}`, parent)
        if (options) {
            options.pos && effNode.setPosition(options.pos)
        }
        if (effNode.getComponent(cc.Animation)) {
            const anim = effNode.getComponent(cc.Animation)
            anim.on('finished', () => {
                effNode.removeFromParent()
            })
            anim.play()
        } else if (effNode.getComponent(cc.ParticleSystem)) {
            effNode.getComponent(cc.ParticleSystem).resetSystem()
        }
    }

    /**
     * 震动节点
     * @param targetNode 目标节点
     * @param duration 震动时间
     * @param cb 震动结束回调
     * @param once 多节点是否只回调一次
     */
    shake(targetNode: cc.Node | cc.Node[], duration: number, cb?: Function, once: boolean = true) {
        /** 单个节点震动 */
        const onceNodeShake = function (targetNode: cc.Node, duration: number, cb: Function, once: boolean) {
            // 获取目标节点的初始位置
            const nodeStartPos = targetNode.getPosition();
            // 单次震动的时间
            const onceDuration = 0.02;
            // 最大值和最小值之间的坐标
            const maxNum = 10;
            const minNum = -10;
            // 停止目标动画
            cc.Tween.stopAllByTarget(targetNode);
            // 每次震动频率随机位置
            let randomX: number[] = [];
            let randomY: number[] = [];
            // 基于初始位置，随机生成8个坐标
            for (let i = 0; i < 8; i++) {
                let random1 = Math.round(Math.random() * (minNum - maxNum)) + maxNum;
                randomX.push(random1 + nodeStartPos.x);
                let random2 = Math.round(Math.random() * (minNum - maxNum)) + maxNum;
                randomY.push(random2 + nodeStartPos.y);
            }
            // 播放动画
            cc.tween(targetNode)
                .sequence(
                    cc.tween().to(onceDuration, { position: cc.v3(randomX[0], randomY[0], 0) }),
                    cc.tween().to(onceDuration, { position: cc.v3(randomX[1], randomY[1], 0) }),
                    cc.tween().to(onceDuration, { position: cc.v3(randomX[2], randomY[2], 0) }),
                    cc.tween().to(onceDuration, { position: cc.v3(randomX[3], randomY[3], 0) }),
                    cc.tween().to(onceDuration, { position: cc.v3(randomX[4], randomY[4], 0) }),
                    cc.tween().to(onceDuration, { position: cc.v3(randomX[5], randomY[5], 0) }),
                    cc.tween().to(onceDuration, { position: cc.v3(randomX[6], randomY[6], 0) }),
                    cc.tween().to(onceDuration, { position: cc.v3(randomX[7], randomY[7], 0) }),
                )
                .repeatForever()
                .start();

            return new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    cc.Tween.stopAllByTarget(targetNode);
                    targetNode.setPosition(nodeStartPos.x, nodeStartPos.y);
                    if (!once) {
                        cb && cb();
                    } else {
                        resolve();
                    }
                }, duration * 1000)
            })
        }

        if (targetNode instanceof Array) {
            if (once) {
                let tweens: Promise<void>[] = [];
                for (let i = 0; i < targetNode.length; i++) {
                    let tween = onceNodeShake(targetNode[i], duration, cb, once);
                    tweens.push(tween);
                }
                Promise.all(tweens).then(() => cb && cb());
            } else {
                // 注：这里每个节点震动后都会回调一次
                targetNode.forEach(node => onceNodeShake(node, duration, cb, once));
            }
        } else {
            onceNodeShake(targetNode, duration, cb, once);
        }
    }
}