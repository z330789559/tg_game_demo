/*
 * @Author: carolsail 
 * @Date: 2023-07-18 08:46:54 
 * @Last Modified by: carolsail
 * @Last Modified time: 2023-07-25 17:08:49
 */

import { ENUM_GAME_MODE, ENUM_GAME_STATUS } from '../Enum';
import Car from '../game/Car';
import { LanguageType } from '../Languages';

const STORAGE_KEY = 'CC_CAR_MOVE'

export const LEVEL_DATA = [
    {
        level: 1,
        width: 490, // 摆放场景宽
        height: 490, // 摆放场景高
        unit: 70, // 摆放最小单位
        cars: 4 // 设置数量则按预制体直接摆放
    },
    {
        level: 2,
        width: 550,
        height: 600,
        unit: 50,
        cars: -1
    },
    {
        level: 3,
        width: 600,
        height: 900,
        unit: 50,
        cars: -1
    }
]

export const CLEVEL_Data = [
    {
        level: 1,
        width: 490,
        height: 490,
        unit: 70,
        cars: 1,
        crash: 3
    },
    {
        level: 2,
        width: 490,
        height: 490,
        unit: 70,
        cars: 1,
        crash: 4
    },
    {
        level: 3,
        width: 490,
        height: 490,
        unit: 70,
        cars: 1,
        crash: 4
    },
    {
        level: 4,
        width: 490,
        height: 490,
        unit: 70,
        cars: 1,
        crash: 5
    },
    {
        level: 5,
        width: 550,
        height: 600,
        unit: 50,
        cars: -1,
        crash: 8
    },
    {
        level: 6,
        width: 490,
        height: 490,
        unit: 70,
        cars: 1,
        crash: 7
    },
    {
        level: 7,
        width: 550,
        height: 600,
        unit: 50,
        cars: -1,
        crash: 5
    },
    {
        level: 8,
        width: 490,
        height: 490,
        unit: 70,
        cars: 1,
        crash: 9
    },
    {
        level: 9,
        width: 490,
        height: 490,
        unit: 70,
        cars: 1,
        crash: 7
    },
    {
        level: 10,
        width: 600,
        height: 900,
        unit: 50,
        cars: -1,
        crash: -1
    }
]

export default class DataManager {

    private static _instance: any = null

    static getInstance<T>(): T {
        if (this._instance === null) {
            this._instance = new this()
        }

        return this._instance
    }

    static get instance() {
        return this.getInstance<DataManager>()
    }
    /**语言 */
    language: LanguageType = LanguageType.EN
    // 游戏模式
    mode: ENUM_GAME_MODE = ENUM_GAME_MODE.TIMER
    // 游戏状态
    status: ENUM_GAME_STATUS = ENUM_GAME_STATUS.UNRUNING
    // 加载进度
    loadingRate: number = 0
    // 声音开启
    _isMusicOn: boolean = true
    _isSoundOn: boolean = true
    // 更多游戏
    games: any[] = [
        { title: '消灭星星', icon: 'xiao2d', appid: 'wxefd5a4ddd8e31b44', url: 'https://store.cocos.com/app/detail/4183' },
        { title: '实况足球杯', icon: 'football', appid: 'wx0c16e9d7f9e87dac', url: 'https://store.cocos.com/app/detail/4221' },
        { title: '爬了个爬', icon: 'stairway', appid: 'wx025bcf3a316bfa27', url: 'https://store.cocos.com/app/detail/4314' },
        { title: '咩了个咩3D', icon: 'xiao3d', appid: 'wx5841e5a26082b380', url: 'https://store.cocos.com/app/detail/4148' },
        { title: '经典泡泡龙', icon: 'bubble', appid: 'wxcc2f90afdf28ae3b', url: 'https://store.cocos.com/app/detail/4370' },
    ]
    // 关卡
    level: number = 1
    levelMax: number = 3
    levelData: Array<any> = null;
    // 挑战关卡
    clevel: number = 1
    clevelMax: number = 1
    // 体力
    power: number = 5
    powerCollectByVideo: number = 1
    // 体力回复间隔(60秒)
    lastPowerRefreshTime: number = 0 // 每次刷新纪录点
    powerRefreshTime: number = 60 // 间隔刷新
    lastPowerUpdateTime: number = 0 // 后续离开游戏返回补充能量
    // 金币
    keys: number = 5
    keysCollectByVideo: number = 1
    // 当前选中car
    currentCar: Car = null
    // 屏幕震动
    isShaking: boolean = false
    // 场景中车辆数
    carNum: number = 0
    carExitNum: number = 0
    // 游戏游玩时间
    seconds: number = 0
    secondsRecord: number = 604800
    // 控制timer
    isTimerStart: boolean = false
    // 技能
    skillIndex: number = -1
    isSkilling: boolean = false
    isSkillRuning: boolean = false
    // 层级
    zIndex: number = 0
    // 撞击次数
    crashTotal: number = 0
    crashCurrent: number = 0

    get isMusicOn() {
        return this._isMusicOn
    }

    set isMusicOn(data: boolean) {
        this._isMusicOn = data
    }

    get isSoundOn() {
        return this._isSoundOn
    }

    set isSoundOn(data: boolean) {
        this._isSoundOn = data
    }

    reset() {
        this.status = ENUM_GAME_STATUS.UNRUNING
        this.currentCar = null
        this.carNum = 0
        this.carExitNum = 0
        this.skillIndex = -1
        this.isSkilling = false
        this.isSkillRuning = false
        this.zIndex = 0
        this.crashTotal = 0
        this.crashCurrent = 0
    }

    save() {
        cc.sys.localStorage.setItem(STORAGE_KEY, JSON.stringify({
            isSoundOn: this.isSoundOn,
            isMusicOn: this.isMusicOn,
            keys: this.keys,
            power: this.power,
            lastPowerRefreshTime: this.lastPowerRefreshTime,
            lastPowerUpdateTime: this.lastPowerUpdateTime,
            secondsRecord: this.secondsRecord,
            clevel: this.clevel,
            clevelMax: this.clevelMax,
            levelData: this.levelData,
        }))
    }

    restore() {
        const _data = cc.sys.localStorage.getItem(STORAGE_KEY) as any
        try {
            const data = JSON.parse(_data)
            this.isMusicOn = data?.isMusicOn === false ? false : true
            this.isSoundOn = data?.isSoundOn === false ? false : true
            this.keys = typeof data.keys == 'number' ? data.keys : 5
            this.power = typeof data.power == 'number' ? data.power : 5
            this.lastPowerRefreshTime = typeof data.lastPowerRefreshTime == 'number' ? data.lastPowerRefreshTime : 0
            this.lastPowerUpdateTime = typeof data.lastPowerUpdateTime == 'number' ? data.lastPowerUpdateTime : 0
            this.secondsRecord = typeof data.secondsRecord == 'number' ? data.secondsRecord : 604800
            this.clevel = typeof data.clevel == 'number' ? data.clevel : 1
            this.clevelMax = typeof data.clevelMax == 'number' ? data.clevelMax : 1
            if (data.levelData) {
                this.levelData = data.levelData;
            } else {
                this.levelData = [];
                for (let i = 0; i < LEVEL_DATA.length; i++) {
                    this.levelData.push({ level: i + 1, star: 0 })
                }
            }
        } catch {
            this.isMusicOn = true
            this.isSoundOn = true
            this.keys = 5
            this.power = 5
            this.lastPowerRefreshTime = 0
            this.lastPowerUpdateTime = 0
            this.secondsRecord = 604800
            this.clevel = 1
            this.clevelMax = 1
            this.levelData = [];
            for (let i = 0; i < LEVEL_DATA.length; i++) {
                this.levelData.push({ level: i + 1, star: 0 })
            }
        }
    }
}
