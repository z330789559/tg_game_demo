/*
 * @Author: carolsail 
 * @Date: 2023-07-18 08:46:38 
 * @Last Modified by: carolsail
 * @Last Modified time: 2023-07-19 11:55:30
 */

import { ENUM_AUDIO_CLIP, ENUM_COLLIDER_TYPE } from "../Enum";
import { StaticInstance } from "../StaticInstance";
import { getAngle, getDistance, random, toXY } from "../Utils";
import AudioManager from "../manager/AudioManager";
import DataManager from "../manager/DataManager";
import EffectManager from "../manager/EffectManager";
import ResourceManager from "../manager/ResourceManager";

const { ccclass, property } = cc._decorator;

const CAR_RESOUCE_PREFIX = ['car_black_', 'car_blue_', 'car_green_', 'car_yellow_', 'car_red_']


// 目前同时只能一辆车在移动，后续改进
@ccclass
export default class Car extends cc.Component {

    @property({ type: cc.Enum({ up: 0, right: 1, down: 2, left: 3 }), tooltip: '朝向' })
    dir: number = 0
    speed: number = 1200
    speedExit: number = 600


    touchPos: cc.Vec2 = null
    touchSlideDis: number = 5
    touchSlideDir: cc.Vec2 = cc.v2(0, 0)

    isMoving: boolean = false

    protected onLoad(): void {
        // 注册事件
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchOver, this)
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchOver, this)
    }

    setDir(dir: number) {
        this.dir = dir
    }

    setSprite(dir: number) {
        const name = `${CAR_RESOUCE_PREFIX[random(0, 4)] + dir}`
        this.node.getChildByName('body').getComponent(cc.Sprite).spriteFrame = ResourceManager.instance.getSprite(name)
    }

    setCollider() {
        const collider: cc.BoxCollider = this.node.getComponent(cc.BoxCollider)
        const size = new cc.Size(this.node.width - 10, this.node.height - 10)
        collider.size = size
    }

    setParticle() {
        const collect = this.node.getChildByName('collect')
        if (collect) collect.getComponent(cc.ParticleSystem).resetSystem()
    }

    onTouchStart(e: cc.Event.EventTouch) {
        if (this.isMoving || DataManager.instance.currentCar) return
        DataManager.instance.currentCar = this
        const location = e.getLocation()
        const touchPos = this.node.parent.convertToNodeSpaceAR(location)
        this.touchPos = touchPos
        if (!DataManager.instance.isTimerStart) StaticInstance.uiManager.setMainTimer()
    }

    onTouchMove(e: cc.Event.EventTouch) {
        if (this.isMoving || DataManager.instance.currentCar != this) return
        // 判断移动方向
        if (this.touchPos) {
            const location = e.getLocation()
            const touchPos = this.node.parent.convertToNodeSpaceAR(location)
            const dis = getDistance(this.touchPos, touchPos)
            if (dis >= this.touchSlideDis) {
                const angle = Math.abs(getAngle(this.touchPos, touchPos))
                if (angle > 45 && angle < 135) {
                    this.touchSlideDir.x = 0
                    if (this.touchPos.y - touchPos.y > 0) {
                        this.touchSlideDir.y = -1
                    } else {
                        this.touchSlideDir.y = 1
                    }
                } else {
                    this.touchSlideDir.y = 0
                    if (this.touchPos.x - touchPos.x < 0) {
                        this.touchSlideDir.x = 1
                    } else {
                        this.touchSlideDir.x = -1
                    }
                }
            }
        }
    }

    onTouchOver() {
        if (this.isMoving || DataManager.instance.currentCar != this) return
        if ((this.touchSlideDir.x || this.touchSlideDir.y)) {
            if ((this.touchSlideDir.x && (this.dir == 1 || this.dir == 3)) || (this.touchSlideDir.y && (this.dir == 0 || this.dir == 2))) {
                this.isMoving = true
            } else {
                // console.log("滑动方向错误，不移动")
                AudioManager.instance.playSound(ENUM_AUDIO_CLIP.BI)
                this.resetStatus()
            }
        } else {
            // console.log('没有滑动或滑动距离不够，不移动')
            AudioManager.instance.playSound(ENUM_AUDIO_CLIP.BIBI)
            this.resetStatus()
        }
    }

    protected update(dt: number): void {
        if (this.isMoving) {
            this.node.x += this.speed * this.touchSlideDir.x * dt
            this.node.y += this.speed * this.touchSlideDir.y * dt
        }
    }

    onCollisionEnter(other: any, self: any) {
        if (DataManager.instance.isShaking) return
        if (this.touchSlideDir.x || this.touchSlideDir.y) {
            if (other.tag == ENUM_COLLIDER_TYPE.CAR || other.tag == ENUM_COLLIDER_TYPE.BLOCK) {
                AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CRASH)
                DataManager.instance.isShaking = true
                EffectManager.instance.shake(StaticInstance.gameManager.stage, 0.1, () => {
                    DataManager.instance.isShaking = false
                }, false)

                const { x, y } = this.touchSlideDir
                let crashPos = cc.v2(0, 0)
                if (x) {
                    // 水平碰撞
                    this.touchSlideDir.x = 0
                    this.node.x = other.node.x + ((other.node.width + self.node.width) / 2) * -x
                    crashPos = cc.v2(this.node.width / 2 * x, 0)
                } else {
                    // 垂直碰撞
                    this.touchSlideDir.y = 0
                    this.node.y = other.node.y + ((other.node.height + self.node.height) / 2) * -y
                    crashPos = cc.v2(0, this.node.height / 2 * y)
                }
                EffectManager.instance.play('Bomb', this.node, { pos: crashPos })

                this.isMoving = false
                this.resetStatus()
            } else if (other.tag == ENUM_COLLIDER_TYPE.EXIT) {
                // console.log('成功出库')
                AudioManager.instance.playSound(ENUM_AUDIO_CLIP.Exit)
                const { x, y } = this.touchSlideDir
                const { width: swidth, height: sheight } = cc.winSize
                let act = null
                if (x) {
                    let angle = -90
                    if ((this.dir == 1 && x == 1) || (this.dir == 3 && x == -1)) angle = 90
                    // 水平碰撞
                    this.node.angle += angle
                    this.touchSlideDir.x = 0
                    this.node.x = other.node.x + ((other.node.width + self.node.height) / 2) * x + other.offset.x
                    // 计算移动距离
                    const p = toXY(this.node, StaticInstance.gameManager.stage)
                    let dis = 0
                    if (x > 0) {
                        dis = Math.abs(sheight / 2 - p.y) + this.node.height / 2
                    } else {
                        dis = Math.abs(-sheight / 2 - p.y) + this.node.height / 2
                    }
                    const mtime = dis / this.speedExit
                    act = cc.moveTo(mtime, this.node.x, this.node.y + dis * x)
                } else {
                    // 垂直碰撞
                    let angle = -90
                    if ((this.dir == 2 && y == 1) || (this.dir == 0 && y == -1)) angle = 90
                    this.node.angle += angle
                    this.touchSlideDir.y = 0
                    this.node.y = other.node.y + ((other.node.height + self.node.width) / 2) * y + other.offset.y
                    // 计算移动距离
                    const p = toXY(this.node, StaticInstance.gameManager.stage)
                    let dis = 0
                    if (y > 0) {
                        dis = Math.abs(swidth / 2 - p.x) + this.node.width / 2
                    } else {
                        dis = Math.abs(-swidth / 2 - p.x) + this.node.width / 2
                    }
                    const mtime = dis / this.speedExit
                    act = cc.moveTo(mtime, this.node.x + dis * y, this.node.y)
                }
                this.setParticle()
                this.isMoving = false
                // 离场动画
                if (act) {
                    cc.tween(this.node).then(act).call(() => {
                        DataManager.instance.carExitNum += 1
                        StaticInstance.gameManager.onGameCheck()
                        this.node.removeFromParent()
                    }).start()
                }

                this.scheduleOnce(() => {
                    this.resetStatus()
                })
            }

        }
    }

    resetStatus() {
        DataManager.instance.currentCar = null
        this.touchPos = null
        this.touchSlideDir = cc.v2(0, 0)
    }
}
