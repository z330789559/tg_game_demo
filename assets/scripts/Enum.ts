/*
 * @Author: carolsail 
 * @Date: 2023-07-25 11:43:51 
 * @Last Modified by: carolsail
 * @Last Modified time: 2023-07-25 15:09:37
 */

// 模式
export enum ENUM_GAME_MODE {
    TIMER = 'TIMER',
    LEVEL = 'LEVEL'
}

// 状态
export enum ENUM_GAME_STATUS {
    UNRUNING = 'UNRUNING',
    RUNING = 'RUNING'
}

// 音效
export enum ENUM_AUDIO_CLIP {
    BGM = 'bgm',
    CLICK = 'click',
    Exit = 'exit',
    CRASH = 'crash',
    BIBI = 'bibi',
    BI = 'bi',
    READY = 'ready',
    LOSE = 'lose',
    WIN = 'win',
    GET_COIN = 'get_coin',
    GET_MONEY = 'get_money',
    SKILL = 'skill',
    PASS = 'pass'
}

// ui层
export enum ENUM_UI_TYPE {
    MENU = 'MenuLayer',
    MAIN = 'MainLayer',
    EXIT = 'ExitLayer',
    OVER = 'OverLayer',
    MORE = 'MoreLayer',
    RANK = 'RankLayer',
    SKILL_SUBMIT = 'SkillSubmitLayer',
    MAIN_LEVEL = 'MainLevelLayer',
    TASK = "TaskLayer",//任务页面
    SHOP = "ShopLayer",//商店页面
    SHARE = "ShareLayer",//邀请页面
    LEVEL_UI = "LevelUILayer",//通用关卡ui
    LEVEL_SELECT = "LevelSelectLayer",//选择关卡页面
    EXIT_LEVEL = 'ExitLevelLayer',
    SETTING = 'SettingLayer',
    LOSE = 'LoseLayer',
    WIN = 'WinLayer'
}

// 碰撞体
export enum ENUM_COLLIDER_TYPE {
    CAR = 0,
    BLOCK = 1,
    EXIT = 2
}

// 事件
export enum ENUM_GAME_EVENT { }

// 资源
export const ENUM_RESOURCE_TYPE = ([
    { content: cc.AudioClip, path: 'audio', type: 'audio', ratio: 0.4 },
    { content: cc.Prefab, path: 'prefab', type: 'prefab', ratio: 0.3 },
    { content: cc.SpriteFrame, path: 'sprite', type: 'sprite', ratio: 0.3 },
    // {content: cc.JsonAsset, path: 'json', type: 'json', ratio: 0.1},
])