/*
 * @Author: carolsail 
 * @Date: 2023-07-18 08:46:46 
 * @Last Modified by: carolsail
 * @Last Modified time: 2023-07-25 16:14:36
 */

const { ccclass, property } = cc._decorator;

import { ENUM_AUDIO_CLIP, ENUM_GAME_MODE, ENUM_GAME_STATUS, ENUM_UI_TYPE } from "../Enum";
import { StaticInstance } from "../StaticInstance";
import Board from "../game/Board";
import AudioManager from "./AudioManager";
import DataManager, { CLEVEL_Data } from "./DataManager";
import PoolManager from "./PoolManager";

@ccclass
export default class GameManager extends cc.Component {

    stage: cc.Node = null
    roads: cc.Node = null
    board: cc.Node = null

    onLoad() {
        StaticInstance.setGameManager(this)
        this.stage = cc.find('Stage', this.node)
    }

    onDestroy() { }

    // 开始游戏
    onGameStart() {
        DataManager.instance.reset()
        DataManager.instance.level = 1
        DataManager.instance.seconds = 0
        this.initGame()
    }

    onGameLevelStart() {
        DataManager.instance.reset()
        this.initGame()
    }

    onGameCheck() {
        if (StaticInstance.uiManager.isActive(ENUM_UI_TYPE.MENU)) return
        if (DataManager.instance.mode == ENUM_GAME_MODE.TIMER) {
            if (DataManager.instance.carNum <= DataManager.instance.carExitNum) {
                AudioManager.instance.playSound(ENUM_AUDIO_CLIP.WIN)
                if (DataManager.instance.level < DataManager.instance.levelMax) {
                    DataManager.instance.reset()
                    DataManager.instance.level += 1
                    this.initGame()
                    StaticInstance.uiManager.setMainTimer(false)
                    // 提示难度加大
                    StaticInstance.uiManager.setMainLevelUpNotice()
                } else {
                    // 完成所有关卡进入结算
                    DataManager.instance.status = ENUM_GAME_STATUS.UNRUNING
                    StaticInstance.uiManager.toggle(ENUM_UI_TYPE.OVER)
                }
            }
        } else if (DataManager.instance.mode == ENUM_GAME_MODE.LEVEL) {
            if (DataManager.instance.crashTotal <= DataManager.instance.crashCurrent) {
                if (StaticInstance.uiManager.isActive(ENUM_UI_TYPE.WIN)) return
                DataManager.instance.status = ENUM_GAME_STATUS.UNRUNING
                AudioManager.instance.playSound(ENUM_AUDIO_CLIP.LOSE)
                StaticInstance.uiManager.toggle(ENUM_UI_TYPE.LOSE)
            } else {
                if (DataManager.instance.carNum <= DataManager.instance.carExitNum) {
                    if (StaticInstance.uiManager.isActive(ENUM_UI_TYPE.LOSE)) return
                    DataManager.instance.status = ENUM_GAME_STATUS.UNRUNING
                    AudioManager.instance.playSound(ENUM_AUDIO_CLIP.PASS)
                    let clevel = DataManager.instance.clevel + 1
                    clevel = Math.min(clevel, CLEVEL_Data.length)
                    DataManager.instance.clevel = clevel
                    if (clevel > DataManager.instance.clevelMax) DataManager.instance.clevelMax = clevel
                    DataManager.instance.save()
                    StaticInstance.uiManager.toggle(ENUM_UI_TYPE.WIN)
                }
            }
        }
    }

    // 初始化游戏
    initGame() {
        DataManager.instance.status = ENUM_GAME_STATUS.UNRUNING
        this.stage.removeAllChildren()
        if (DataManager.instance.mode == ENUM_GAME_MODE.TIMER) {
            const level = PoolManager.instance.getNode(`Level${DataManager.instance.level}`, this.stage)
            this.roads = level.getChildByName('roads')
            this.board = level.getChildByName('board')
            const boardComponent: Board = this.board.getComponent(Board)
            boardComponent.init()
            DataManager.instance.status = ENUM_GAME_STATUS.RUNING
            StaticInstance.uiManager.toggle(ENUM_UI_TYPE.SKILL_SUBMIT, false)
            StaticInstance.uiManager.setMainSkillTip()
            if (DataManager.instance.level == 1) {
                StaticInstance.uiManager.setMainTimerRendor()
                AudioManager.instance.playSound(ENUM_AUDIO_CLIP.READY)
            }
        } else if (DataManager.instance.mode == ENUM_GAME_MODE.LEVEL) {
            const level = PoolManager.instance.getNode(`CLevel${DataManager.instance.clevel}`, this.stage)
            this.roads = level.getChildByName('roads')
            this.board = level.getChildByName('board')
            const boardComponent: Board = this.board.getComponent(Board)
            boardComponent.init()
            AudioManager.instance.playSound(ENUM_AUDIO_CLIP.READY)
            StaticInstance.uiManager.setMainLevelCrash()
            StaticInstance.uiManager.setMainLevelTip()
            DataManager.instance.status = ENUM_GAME_STATUS.RUNING
        }
    }
}
