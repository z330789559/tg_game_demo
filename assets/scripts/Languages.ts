
export enum LanguageType {
    CH_J = "CH_J",//中文简体
    CH_F = "CH_F",//中文繁体
    EN = "EN",//英文
}

export const Languages = {
    /**LevelUILayer */
    suoduan: { CH_J: "缩短", CH_F: "缩短", EN: "suoduan" },
    touming: { CH_J: "透明", CH_F: "透明", EN: "touming" },
    yichu: { CH_J: "移除", CH_F: "移除", EN: "yichu" },
    zhuanqv: { CH_J: "赚取", CH_F: "赚取", EN: "zhuanqv" },
    renwu: { CH_J: "任务", CH_F: "任务", EN: "renwu" },
    shangdian: { CH_J: "商店", CH_F: "商店", EN: "shangdian" },
    yaoqing: { CH_J: "邀请", CH_F: "邀请", EN: "yaoqing" },
    /**LevelSelectLayer */
    guankaxuanze: { CH_J: "关卡选择", CH_F: "关卡选择", EN: "guankaxuanze" },
    putongmoshi: { CH_J: "普通模式", CH_F: "普通模式", EN: "putongmoshi" },
    tiaozhanmoshi: { CH_J: "挑战模式", CH_F: "挑战模式", EN: "tiaozhanmoshi" },
    /**ExitLevelLayer*/
    exitgame: { CH_J: "退出游戏", CH_F: "退出游戏", EN: "exitgame" },
    exit: { CH_J: "退出", CH_F: "退出", EN: "exit" },
    chongwan: { CH_J: "重玩", CH_F: "重玩", EN: "chongwan" },
    /**TaskLayer */
    meirirenwu: { CH_J: "每日任务", CH_F: "每日任务", EN: "meirirenwu" },
    mubiaorenwu: { CH_J: "目标任务", CH_F: "目标任务", EN: "mubiaorenwu" },
    /**ShopLayer */
    libao: { CH_J: "礼包", CH_F: "礼包", EN: "libao" },
    yaoshi: { CH_J: "钥匙", CH_F: "钥匙", EN: "yaoshi" },
    daibi: { CH_J: "代币", CH_F: "代币", EN: "daibi" },
    pifu: { CH_J: "皮肤", CH_F: "皮肤", EN: "pifu" },
    huasuanlibao: { CH_J: "划算礼包", CH_F: "划算礼包", EN: "huasuanlibao" },
    chaojilibao: { CH_J: "超级礼包", CH_F: "超级礼包", EN: "chaojilibao" },
    pifulibao: { CH_J: "皮肤礼包", CH_F: "皮肤礼包", EN: "pifulibao" },
    jingqingqidai: { CH_J: "敬请期待", CH_F: "敬请期待", EN: "jingqingqidai" },
    /**TaskLayer */
    chakanxinwen: { CH_J: "查看官方新闻", CH_F: "查看官方新闻", EN: "chakanxinwen" },
    jiarupindao: { CH_J: "加入官方频道", CH_F: "加入官方频道", EN: "jiarupindao" },
    guanzhutuite: { CH_J: "关注官方推特", CH_F: "关注官方推特", EN: "guanzhutuite" },
    guankayouxi: { CH_J: "观看TON的游戏", CH_F: "观看TON的游戏", EN: "guankayouxi" },
    tongguan10: { CH_J: "通关10次游戏关卡", CH_F: "通关10次游戏关卡", EN: "tongguan10" },
    tongguan20: { CH_J: "通关20次游戏关卡", CH_F: "通关20次游戏关卡", EN: "tongguan20" },
    leijitili100: { CH_J: "累计使用100体力", CH_F: "累计使用100体力", EN: "leijitili100" },
    leijitili200: { CH_J: "累计使用200体力", CH_F: "累计使用200体力", EN: "leijitili200" },
    leijiyichu20: { CH_J: "累计使用20次移除道具", CH_F: "累计使用20次移除道具", EN: "leijiyichu20" },
    /**ShareLayer */
    fenxiangtips: { CH_J: "分享邀请朋友共享链接并获得奖励", CH_F: "分享邀请朋友共享链接并获得奖励", EN: "fenxiangtips" },
    leijiyaoqing: { CH_J: "累计邀请", CH_F: "累计邀请", EN: "leijiyaoqing" },
    shouyaozhemingdan: { CH_J: "受邀者名单", CH_F: "受邀者名单", EN: "shouyaozhemingdan" },
    chakanquanbu: { CH_J: "查看全部", CH_F: "查看全部", EN: "chakanquanbu" },
    lijiyaoqing: { CH_J: "立即邀请", CH_F: "立即邀请", EN: "lijiyaoqing" },
    kelingqv: { CH_J: "可领取", CH_F: "可领取", EN: "kelingqv" },
    yilingqv: { CH_J: "已领取", CH_F: "已领取", EN: "yilingqv" },
    zanwugengduo: { CH_J: "暂无更多", CH_F: "暂无更多", EN: "zanwugengduo" },
    /**SettingLayer */
    yinyue: { CH_J: "音乐", CH_F: "音乐", EN: "yinyue" },
    yinxiao: { CH_J: "音效", CH_F: "音效", EN: "yinxiao" },
    youxishezhi: { CH_J: "游戏设置", CH_F: "游戏设置", EN: "youxishezhi" },
    yuyanqiehuan: { CH_J: "语言切换", CH_F: "语言切换", EN: "yuyanqiehuan" },
    zhongwenjianti: { CH_J: "中文简体", CH_F: "中文简体", EN: "zhongwenjianti" },
    zhongwenfanti: { CH_J: "中文繁体", CH_F: "中文繁体", EN: "zhongwenfanti" },
    yingyu: { CH_J: "英语", CH_F: "英语", EN: "yingyu" },
    /**WinLayer */
    fenxiang: { CH_J: "分享", CH_F: "分享", EN: "fenxiang" },
    xiayiguan: { CH_J: "下一关", CH_F: "下一关", EN: "xiayiguan" },
    zaiwanyici: { CH_J: "再玩一次", CH_F: "再玩一次", EN: "zaiwanyici" },

}