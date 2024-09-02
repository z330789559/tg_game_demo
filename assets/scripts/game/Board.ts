/*
 * @Author: carolsail 
 * @Date: 2023-07-20 09:13:31 
 * @Last Modified by: carolsail
 * @Last Modified time: 2023-07-25 16:24:53
 */

import { ENUM_GAME_MODE } from "../Enum";
import { random } from "../Utils";
import DataManager, { CLEVEL_Data, LEVEL_DATA } from "../manager/DataManager";
import PoolManager from "../manager/PoolManager";
import Car from "./Car";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Board extends cc.Component {

    init() {
        let data = null
        if (DataManager.instance.mode == ENUM_GAME_MODE.TIMER) {
            data = LEVEL_DATA[DataManager.instance.level - 1]
            if (data.cars > 0) {
                DataManager.instance.carNum = data.cars
                return
            }
        } else if (DataManager.instance.mode == ENUM_GAME_MODE.LEVEL) {
            data = CLEVEL_Data[DataManager.instance.clevel - 1]
            let crash = random(2, 8)
            if (data.crash > 0) {
                crash = data.crash
            }
            DataManager.instance.crashTotal = crash
            if (data.cars > 0) {
                DataManager.instance.carNum = data.cars
                return
            }
        }
        this.node.removeAllChildren()
        const xn = data.width / data.unit
        const yn = data.height / data.unit
        // 设置汽车
        let outForTest = 0
        const carPool = new Map<string, boolean>()
        for (let x = 0; x < xn; x++) {
            outForTest += 1
            for (let y = 0; y < yn; y++) {
                if (!carPool.has(`${x}_${y}`)) {
                    const dir = random(0, 3)
                    // const dir = 1
                    if (dir == 0 || dir == 2) {
                        // 垂直
                        let hn = 0
                        if (y < yn - 1 && !carPool.has(`${x}_${y + 1}`)) {
                            hn = 2
                            if (y < yn - 2 && !carPool.has(`${x}_${y + 2}`)) hn = random(2, 3)
                        }
                        if (hn) {
                            DataManager.instance.carNum += 1
                            const carNode = PoolManager.instance.getNode(`Car${dir}`, this.node)
                            const carComponent = carNode.getComponent(Car)
                            carNode.width = data.unit
                            carNode.height = data.unit * hn
                            for (let n = 0; n < hn; n++) {
                                carPool.set(`${x}_${y + n}`, true)
                            }
                            carNode.setPosition(carNode.width * (0.5 + x), y * data.unit + carNode.height * 0.5)
                            carComponent.setDir(dir)
                            carComponent.setSprite(dir)
                            carComponent.setCollider()
                        } else {
                            // console.log(`${x}_${y}摆不下，只能水平方向`)
                            // let wn = 0
                            // if (x < xn - 1 && !carPool.has(`${x + 1}_${y}`)) {
                            //     wn = 2
                            //     if (x < xn - 2 && !carPool.has(`${x + 2}_${y}`)) wn = random(2, 3)
                            // }
                            // if (wn) {
                            //     const carNode = PoolManager.instance.getNode(`Car${dir}`, this.node)
                            //     carNode.width = data.unit * wn
                            //     carNode.height = data.unit
                            //     for (let n = 0; n < wn; n++) {
                            //         carPool.set(`${x + n}_${y}`, true)
                            //     }
                            //     carNode.setPosition(x * data.unit + carNode.width * 0.5, carNode.height * (0.5 + y))
                            //     const carComponent = carNode.getComponent(Car)
                            //     carComponent.setDir(dir)
                            // }
                        }
                    } else {
                        // 水平
                        let wn = 0
                        if (x < xn - 1 && !carPool.has(`${x + 1}_${y}`)) {
                            wn = 2
                            if (x < xn - 2 && !carPool.has(`${x + 2}_${y}`)) wn = random(2, 3)
                        }
                        if (wn) {
                            DataManager.instance.carNum += 1
                            const carNode = PoolManager.instance.getNode(`Car${dir}`, this.node)
                            const carComponent = carNode.getComponent(Car)
                            carNode.width = data.unit * wn
                            carNode.height = data.unit
                            for (let n = 0; n < wn; n++) {
                                carPool.set(`${x + n}_${y}`, true)
                            }
                            carNode.setPosition(x * data.unit + carNode.width * 0.5, carNode.height * (0.5 + y))
                            carComponent.setDir(dir)
                            carComponent.setSprite(dir)
                            carComponent.setCollider()
                        } else {
                            // console.log(`${x}_${y}摆不下，只能垂直方向`)
                            // let hn = 0
                            // if (y < yn - 1 && !carPool.has(`${x}_${y + 1}`)) {
                            //     hn = 2
                            //     if (y < yn - 2 && !carPool.has(`${x}_${y + 2}`)) hn = random(2, 3)
                            // }
                            // if (hn) {
                            //     const carNode = PoolManager.instance.getNode(`Car${dir}`, this.node)
                            //     carNode.width = data.unit
                            //     carNode.height = data.unit * hn
                            //     for (let n = 0; n < hn; n++) {
                            //         carPool.set(`${x}_${y + n}`, true)
                            //     }
                            //     carNode.setPosition(carNode.width * (0.5 + x), y * data.unit + carNode.height * 0.5)
                            //     const carComponent = carNode.getComponent(Car)
                            //     carComponent.setDir(dir)
                            // }
                        }
                    }
                } else {
                    // console.log(`${x}_${y}已摆放，无需摆放`)
                }
                // if (outForTest >= 1) break
            }
            // if (outForTest >= 1) break
        }
        // 设置障碍和出口
        for (let x = 0; x < xn; x++) {
            if (random(0, 1)) {
                // 上出口
                const exitNode = PoolManager.instance.getNode('Exit', this.node)
                const exitCollider = exitNode.getComponent(cc.BoxCollider)
                exitNode.width = data.unit
                exitNode.setPosition(x * data.unit + data.unit / 2, data.height + 5)
                exitCollider.size.width = data.unit
                // 下障碍
                const blockNode = PoolManager.instance.getNode('Block2', this.node)
                const blockCollider = blockNode.getComponent(cc.BoxCollider)
                blockNode.width = data.unit
                blockNode.setPosition(x * data.unit + data.unit / 2, -5)
                blockCollider.size.width = data.unit
            } else {
                // 下出口
                const exitNode = PoolManager.instance.getNode('Exit', this.node)
                const exitCollider = exitNode.getComponent(cc.BoxCollider)
                exitNode.width = data.unit
                exitNode.setPosition(x * data.unit + data.unit / 2, -5)
                exitCollider.size.width = data.unit
                // 上障碍
                const blockNode = PoolManager.instance.getNode('Block0', this.node)
                const blockCollider = blockNode.getComponent(cc.BoxCollider)
                blockNode.width = data.unit
                blockNode.setPosition(x * data.unit + data.unit / 2, data.height + 5)
                blockCollider.size.width = data.unit
            }
        }
        for (let y = 0; y < yn; y++) {
            if (random(0, 1)) {
                // 左出口
                const exitNode = PoolManager.instance.getNode('Exit', this.node)
                const exitCollider = exitNode.getComponent(cc.BoxCollider)
                exitNode.height = data.unit
                exitNode.setPosition(-5, y * data.unit + data.unit / 2)
                exitCollider.size.height = data.unit
                // 右障碍
                const blockNode = PoolManager.instance.getNode('Block3', this.node)
                const blockCollider = blockNode.getComponent(cc.BoxCollider)
                blockNode.height = data.unit
                blockNode.setPosition(data.width + 5, y * data.unit + data.unit / 2)
                blockCollider.size.height = data.unit
            } else {
                // 右出口
                const exitNode = PoolManager.instance.getNode('Exit', this.node)
                const exitCollider = exitNode.getComponent(cc.BoxCollider)
                exitNode.height = data.unit
                exitNode.setPosition(data.width + 5, y * data.unit + data.unit / 2)
                exitCollider.size.height = data.unit
                // 左障碍
                const blockNode = PoolManager.instance.getNode('Block1', this.node)
                const blockCollider = blockNode.getComponent(cc.BoxCollider)
                blockNode.height = data.unit
                blockNode.setPosition(-5, y * data.unit + data.unit / 2)
                blockCollider.size.height = data.unit
            }
        }
    }
}
