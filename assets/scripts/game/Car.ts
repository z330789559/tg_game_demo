/*
 * @Author: carolsail 
 * @Date: 2023-07-18 08:46:38 
 * @Last Modified by: carolsail
 * @Last Modified time: 2023-07-25 14:47:40
 */

import { ENUM_AUDIO_CLIP, ENUM_COLLIDER_TYPE, ENUM_GAME_MODE } from "../Enum";
import { StaticInstance } from "../StaticInstance";
import { getAngle, getDistance, random, toXY } from "../Utils";
import AudioManager from "../manager/AudioManager";
import DataManager, { LEVEL_DATA } from "../manager/DataManager";
import EffectManager from "../manager/EffectManager";
import ResourceManager from "../manager/ResourceManager";
import ToastManager from "../manager/ToastManager";

const { ccclass, property } = cc._decorator;

const CAR_RESOUCE_PREFIX = ['car_black_', 'car_blue_', 'car_green_', 'car_yellow_', 'car_red_']


// 目前同时只能一辆车在移动，后续改进
@ccclass
export default class Car extends cc.Component {

    @property({ type: cc.Enum({ up: 0, right: 1, down: 2, left: 3 }), tooltip: '朝向' })
    dir: number = 0
    speed: number = 1000
    speedExit: number = 600


    touchPos: cc.Vec2 = null
    touchSlideDis: number = 3
    touchSlideDir: cc.Vec2 = cc.v2(0, 0)

    isMoving: boolean = false
    isOpacity: boolean = false
    opacityCount: number = 0

    isExiting: boolean = false

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
        if (DataManager.instance.isSkillRuning) return
        const location = e.getLocation()
        const touchPos = this.node.parent.convertToNodeSpaceAR(location)
        if (DataManager.instance.isSkilling) {
            const carComponent = this
            const carNode = this.node
            if (DataManager.instance.skillIndex == 0 && !this.isMoving) {
                const { unit } = LEVEL_DATA[DataManager.instance.level - 1]
                let size = carNode.width
                if (carComponent.dir == 0 || carComponent.dir == 2) size = carNode.height
                if (size <= unit * 2) {
                    ToastManager.instance.show('车辆已经是最短状态！！！', { gravity: 'TOP', bg_color: cc.color(226, 69, 109, 255) })
                } else {
                    AudioManager.instance.playSound(ENUM_AUDIO_CLIP.SKILL)
                    DataManager.instance.isSkillRuning = true
                    if (carComponent.dir == 0 || carComponent.dir == 2) {
                        cc.tween(carNode).to(0.3, { height: carNode.height - unit }).call(() => {
                            carComponent.setCollider()
                            DataManager.instance.isSkillRuning = false
                            DataManager.instance.isSkilling = false
                            StaticInstance.uiManager.setMainSkillTip()
                        }).start()
                    } else {
                        cc.tween(carNode).to(0.3, { width: carNode.width - unit }).call(() => {
                            carComponent.setCollider()
                            DataManager.instance.isSkillRuning = false
                            DataManager.instance.isSkilling = false
                            StaticInstance.uiManager.setMainSkillTip()
                        }).start()
                    }
                }
            } else if (DataManager.instance.skillIndex == 1 && !this.isMoving && !this.isOpacity && this.opacityCount == 0) {
                if (DataManager.instance.carNum - DataManager.instance.carExitNum == 1) {
                    ToastManager.instance.show('车辆已经剩下最后一辆了！！！', { gravity: 'TOP', bg_color: cc.color(226, 69, 109, 255) })
                    return
                }
                AudioManager.instance.playSound(ENUM_AUDIO_CLIP.SKILL)
                cc.tween(carNode).to(0.3, { opacity: 100 }).call(() => {
                    carComponent.isOpacity = true
                    DataManager.instance.isSkillRuning = false
                    DataManager.instance.isSkilling = false
                    StaticInstance.uiManager.setMainSkillTip()
                }).start()
            } else if (DataManager.instance.skillIndex == 2 && !this.isMoving) {
                AudioManager.instance.playSound(ENUM_AUDIO_CLIP.SKILL)
                cc.tween(carNode).to(0.3, { scale: 0.1 }).call(() => {
                    carNode.removeFromParent()
                    DataManager.instance.isSkillRuning = false
                    DataManager.instance.isSkilling = false
                    StaticInstance.uiManager.setMainSkillTip()
                    DataManager.instance.carExitNum += 1
                    if (DataManager.instance.carNum - DataManager.instance.carExitNum == 1) {
                        const carOne = StaticInstance.gameManager.board.children.find(node => node.name.indexOf('Car') >= 0)
                        if (carOne && carOne.getComponent(Car).isOpacity) {
                            carOne.getComponent(Car).isOpacity = false
                            carOne.getComponent(Car).opacityCount = 0
                            cc.tween(carOne).to(0.1, { opacity: 255 }).start()
                        }
                    }
                    StaticInstance.gameManager.onGameCheck()
                }).start()
            }
            return
        }
        if (this.isMoving || this.touchPos || this.isOpacity) return
        this.touchPos = touchPos
        if (DataManager.instance.mode == ENUM_GAME_MODE.TIMER) {
            if (!DataManager.instance.isTimerStart) StaticInstance.uiManager.setMainTimer()
        }
    }

    onTouchMove(e: cc.Event.EventTouch) {
        if (this.isMoving) return
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
        if (this.isMoving || !this.touchPos) return
        if ((this.touchSlideDir.x || this.touchSlideDir.y)) {
            if ((this.touchSlideDir.x && (this.dir == 1 || this.dir == 3)) || (this.touchSlideDir.y && (this.dir == 0 || this.dir == 2))) {
                this.isMoving = true
                const tip = this.node.getChildByName('tip')
                if (tip) tip.active = false
                DataManager.instance.zIndex += 1
                this.node.zIndex = DataManager.instance.zIndex
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
        if (other.tag == ENUM_COLLIDER_TYPE.EXIT) {
            this.isExiting = true
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
            // 离场动画
            if (act) {
                cc.tween(this.node).then(act).call(() => {
                    DataManager.instance.carExitNum += 1
                    if (DataManager.instance.carNum - DataManager.instance.carExitNum == 1) {
                        const carOne = StaticInstance.gameManager.board.children.find(node => node.name.indexOf('Car') >= 0)
                        if (carOne && carOne.getComponent(Car).isOpacity) {
                            carOne.getComponent(Car).isOpacity = false
                            carOne.getComponent(Car).opacityCount = 0
                            cc.tween(carOne).to(0.1, { opacity: 255 }).start()
                        }
                    }
                    StaticInstance.gameManager.onGameCheck()
                    this.node.removeFromParent()
                }).start()
            }
        } else if (other.tag == ENUM_COLLIDER_TYPE.BLOCK) {
            this.isMoving = false
            AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CRASH)
            if (!DataManager.instance.isShaking) {
                DataManager.instance.isShaking = true
                EffectManager.instance.shake(StaticInstance.gameManager.roads, 0.1, () => {
                    DataManager.instance.isShaking = false
                }, false)
            }
            // 撞击数
            if (DataManager.instance.mode == ENUM_GAME_MODE.LEVEL) {
                DataManager.instance.crashCurrent += 1
                StaticInstance.uiManager.setMainLevelCrash()
                StaticInstance.gameManager.onGameCheck()
            }
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
            if (DataManager.instance.mode == ENUM_GAME_MODE.TIMER) {
                // 碰撞累加时间
                EffectManager.instance.play('TimeTip', this.node)
                DataManager.instance.seconds += 5
                StaticInstance.uiManager.setMainTimerRendor()
            }
            this.resetStatus()
        } else if (other.tag == ENUM_COLLIDER_TYPE.CAR) {
            const selfComponent = self.node.getComponent(Car)
            const otherComponent = other.node.getComponent(Car)
            if (selfComponent.isExiting || otherComponent.isExiting) return
            if (selfComponent.isMoving && otherComponent.isMoving) {
                selfComponent.isMoving = false
                otherComponent.isMoving = false
                AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CRASH)
                if (!DataManager.instance.isShaking) {
                    DataManager.instance.isShaking = true
                    EffectManager.instance.shake(StaticInstance.gameManager.roads, 0.1, () => {
                        DataManager.instance.isShaking = false
                    }, false)
                }
                // 撞击数
                if (DataManager.instance.mode == ENUM_GAME_MODE.LEVEL) {
                    DataManager.instance.crashCurrent += 1
                    StaticInstance.uiManager.setMainLevelCrash()
                    StaticInstance.gameManager.onGameCheck()
                }
                // 碰撞框
                const otherAabb = other.world.aabb
                const otherPreAabb = other.world.preAabb.clone()
                const selfAabb = self.world.aabb
                const selfPreAabb = self.world.preAabb.clone()
                // 水平碰撞
                otherPreAabb.x = otherAabb.x
                selfPreAabb.x = selfAabb.x
                if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
                    let _self = null, _other = null
                    if (selfComponent.dir == 1 || selfComponent.dir == 3) {
                        _self = selfComponent
                        _other = otherComponent
                    } else {
                        _self = otherComponent
                        _other = selfComponent
                    }
                    const { x } = _self.touchSlideDir
                    let crashPos = cc.v2(0, 0)
                    _self.touchSlideDir.x = 0
                    _self.node.x = _other.node.x + ((_other.node.width + _self.node.width) / 2) * -x
                    crashPos = cc.v2(_self.node.width / 2 * x, 0)
                    EffectManager.instance.play('Bomb', _self.node, { pos: crashPos })
                    if (DataManager.instance.mode == ENUM_GAME_MODE.TIMER) {
                        // 碰撞累加时间
                        EffectManager.instance.play('TimeTip', _self.node)
                        DataManager.instance.seconds += 5
                        StaticInstance.uiManager.setMainTimerRendor()
                    }
                    selfComponent.resetStatus()
                    otherComponent.resetStatus()
                    return
                }
                // 垂直碰撞
                selfPreAabb.y = selfAabb.y
                otherPreAabb.y = otherAabb.y
                if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
                    let _self = null, _other = null
                    if (selfComponent.dir == 0 || selfComponent.dir == 2) {
                        _self = selfComponent
                        _other = otherComponent
                    } else {
                        _self = otherComponent
                        _other = selfComponent
                    }
                    const { y } = _self.touchSlideDir
                    let crashPos = cc.v2(0, 0)
                    _self.touchSlideDir.y = 0
                    _self.node.y = _other.node.y + ((_other.node.height + _self.node.height) / 2) * -y
                    crashPos = cc.v2(0, _self.node.height / 2 * y)
                    EffectManager.instance.play('Bomb', _self.node, { pos: crashPos })
                    if (DataManager.instance.mode == ENUM_GAME_MODE.TIMER) {
                        // 碰撞累加时间
                        EffectManager.instance.play('TimeTip', _self.node)
                        DataManager.instance.seconds += 5
                        StaticInstance.uiManager.setMainTimerRendor()
                    }
                    selfComponent.resetStatus()
                    otherComponent.resetStatus()
                }
            } else {
                if (this.isMoving) {
                    if (otherComponent.isOpacity) {
                        // 透明化
                        selfComponent.opacityCount += 1
                        otherComponent.opacityCount += 1
                    } else {
                        this.isMoving = false
                        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CRASH)
                        if (!DataManager.instance.isShaking) {
                            DataManager.instance.isShaking = true
                            EffectManager.instance.shake(StaticInstance.gameManager.roads, 0.1, () => {
                                DataManager.instance.isShaking = false
                            }, false)
                        }
                        // 撞击数
                        if (DataManager.instance.mode == ENUM_GAME_MODE.LEVEL) {
                            DataManager.instance.crashCurrent += 1
                            StaticInstance.uiManager.setMainLevelCrash()
                            StaticInstance.gameManager.onGameCheck()
                        }
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
                        if (DataManager.instance.mode == ENUM_GAME_MODE.TIMER) {
                            // 碰撞累加时间
                            EffectManager.instance.play('TimeTip', this.node)
                            DataManager.instance.seconds += 5
                            StaticInstance.uiManager.setMainTimerRendor()
                        }
                        this.resetStatus()
                    }
                }
            }
        }
        return
        // if (DataManager.instance.isShaking) return
        // if (this.touchSlideDir.x || this.touchSlideDir.y) {
        //     if (other.tag == ENUM_COLLIDER_TYPE.STOP) {
        //         AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CRASH)
        //         DataManager.instance.isShaking = true
        //         EffectManager.instance.shake(StaticInstance.gameManager.stage, 0.1, () => {
        //             DataManager.instance.isShaking = false
        //         }, false)

        //         const { x, y } = this.touchSlideDir
        //         let crashPos = cc.v2(0, 0)
        //         if (x) {
        //             // 水平碰撞
        //             this.touchSlideDir.x = 0
        //             this.node.x = other.node.x + ((other.node.width + self.node.width) / 2) * -x
        //             crashPos = cc.v2(this.node.width / 2 * x, 0)
        //         } else {
        //             // 垂直碰撞
        //             this.touchSlideDir.y = 0
        //             this.node.y = other.node.y + ((other.node.height + self.node.height) / 2) * -y
        //             crashPos = cc.v2(0, this.node.height / 2 * y)
        //         }
        //         EffectManager.instance.play('Bomb', this.node, { pos: crashPos })

        //         this.isMoving = false
        //         this.resetStatus()
        //     } else if (other.tag == ENUM_COLLIDER_TYPE.UNSTOP) {
        //         // console.log('成功出库')
        //         AudioManager.instance.playSound(ENUM_AUDIO_CLIP.Exit)
        //         const { x, y } = this.touchSlideDir
        //         const { width: swidth, height: sheight } = cc.winSize
        //         let act = null
        //         if (x) {
        //             let angle = -90
        //             if ((this.dir == 1 && x == 1) || (this.dir == 3 && x == -1)) angle = 90
        //             // 水平碰撞
        //             this.node.angle += angle
        //             this.touchSlideDir.x = 0
        //             this.node.x = other.node.x + ((other.node.width + self.node.height) / 2) * x + other.offset.x
        //             // 计算移动距离
        //             const p = toXY(this.node, StaticInstance.gameManager.stage)
        //             let dis = 0
        //             if (x > 0) {
        //                 dis = Math.abs(sheight / 2 - p.y) + this.node.height / 2
        //             } else {
        //                 dis = Math.abs(-sheight / 2 - p.y) + this.node.height / 2
        //             }
        //             const mtime = dis / this.speedExit
        //             act = cc.moveTo(mtime, this.node.x, this.node.y + dis * x)
        //         } else {
        //             // 垂直碰撞
        //             let angle = -90
        //             if ((this.dir == 2 && y == 1) || (this.dir == 0 && y == -1)) angle = 90
        //             this.node.angle += angle
        //             this.touchSlideDir.y = 0
        //             this.node.y = other.node.y + ((other.node.height + self.node.width) / 2) * y + other.offset.y
        //             // 计算移动距离
        //             const p = toXY(this.node, StaticInstance.gameManager.stage)
        //             let dis = 0
        //             if (y > 0) {
        //                 dis = Math.abs(swidth / 2 - p.x) + this.node.width / 2
        //             } else {
        //                 dis = Math.abs(-swidth / 2 - p.x) + this.node.width / 2
        //             }
        //             const mtime = dis / this.speedExit
        //             act = cc.moveTo(mtime, this.node.x + dis * y, this.node.y)
        //         }
        //         this.setParticle()
        //         this.isMoving = false
        //         // 离场动画
        //         if (act) {
        //             cc.tween(this.node).then(act).call(() => {
        //                 DataManager.instance.carExitNum += 1
        //                 StaticInstance.gameManager.onGameCheck()
        //                 this.node.removeFromParent()
        //             }).start()
        //         }

        //         this.scheduleOnce(() => {
        //             this.resetStatus()
        //         })
        //     }

        // }
    }

    onCollisionExit(other: any, self: any) {
        const selfComponent = self.node.getComponent(Car)
        const otherComponent = other.node.getComponent(Car)
        const otherNode = other.node
        if (otherComponent && otherComponent.isOpacity) {
            selfComponent.opacityCount -= 1
            otherComponent.opacityCount -= 1
            if (otherComponent.opacityCount <= 0) {
                otherComponent.isOpacity = false
                otherComponent.opacityCount = 0
                cc.tween(otherNode).to(0.1, { opacity: 255 }).start()
            }
        }
    }

    resetStatus() {
        this.touchPos = null
        this.touchSlideDir = cc.v2(0, 0)
    }
}
