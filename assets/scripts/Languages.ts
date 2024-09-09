
export enum LanguageType {
    CH_J = "zh-CN",//中文简体
    CH_F = "zh-TW",//中文繁体
    EN = "en",//英文
    RU = "ru",
    AR = "ar",
    JA = "ja",//日
}

// export const Languages = {
//     /**LevelUILayer */
// suoduan: { CH_J: "缩短", CH_F: "缩短", EN: "suoduan" },
// touming: { CH_J: "透明", CH_F: "透明", EN: "touming" },
// yichu: { CH_J: "移除", CH_F: "移除", EN: "yichu" },
// zhuanqv: { CH_J: "赚取", CH_F: "赚取", EN: "zhuanqv" },
// renwu: { CH_J: "任务", CH_F: "任务", EN: "renwu" },
// shangdian: { CH_J: "商店", CH_F: "商店", EN: "shangdian" },
// yaoqing: { CH_J: "邀请", CH_F: "邀请", EN: "yaoqing" },
// /**LevelSelectLayer */
// guankaxuanze: { CH_J: "关卡选择", CH_F: "关卡选择", EN: "guankaxuanze" },
// putongmoshi: { CH_J: "普通模式", CH_F: "普通模式", EN: "putongmoshi" },
// tiaozhanmoshi: { CH_J: "挑战模式", CH_F: "挑战模式", EN: "tiaozhanmoshi" },
// /**ExitLevelLayer*/
// exitgame: { CH_J: "退出游戏", CH_F: "退出游戏", EN: "exitgame" },
// exit: { CH_J: "退出", CH_F: "退出", EN: "exit" },
// chongwan: { CH_J: "重玩", CH_F: "重玩", EN: "chongwan" },
// /**TaskLayer */
// meirirenwu: { CH_J: "每日任务", CH_F: "每日任务", EN: "meirirenwu" },
// mubiaorenwu: { CH_J: "目标任务", CH_F: "目标任务", EN: "mubiaorenwu" },
// /**ShopLayer */
// libao: { CH_J: "礼包", CH_F: "礼包", EN: "libao" },
// yaoshi: { CH_J: "钥匙", CH_F: "钥匙", EN: "yaoshi" },
// daibi: { CH_J: "代币", CH_F: "代币", EN: "daibi" },
// pifu: { CH_J: "皮肤", CH_F: "皮肤", EN: "pifu" },
// huasuanlibao: { CH_J: "划算礼包", CH_F: "划算礼包", EN: "huasuanlibao" },
// chaojilibao: { CH_J: "超级礼包", CH_F: "超级礼包", EN: "chaojilibao" },
// pifulibao: { CH_J: "皮肤礼包", CH_F: "皮肤礼包", EN: "pifulibao" },
// jingqingqidai: { CH_J: "敬请期待", CH_F: "敬请期待", EN: "jingqingqidai" },
// /**TaskLayer */
// chakanxinwen: { CH_J: "查看官方新闻", CH_F: "查看官方新闻", EN: "chakanxinwen" },
// jiarupindao: { CH_J: "加入官方频道", CH_F: "加入官方频道", EN: "jiarupindao" },
// guanzhutuite: { CH_J: "关注官方推特", CH_F: "关注官方推特", EN: "guanzhutuite" },
// guankayouxi: { CH_J: "观看TON的游戏", CH_F: "观看TON的游戏", EN: "guankayouxi" },
// tongguan10: { CH_J: "通关10次游戏关卡", CH_F: "通关10次游戏关卡", EN: "tongguan10" },
// tongguan20: { CH_J: "通关20次游戏关卡", CH_F: "通关20次游戏关卡", EN: "tongguan20" },
// leijitili100: { CH_J: "累计使用100体力", CH_F: "累计使用100体力", EN: "leijitili100" },
// leijitili200: { CH_J: "累计使用200体力", CH_F: "累计使用200体力", EN: "leijitili200" },
// leijiyichu20: { CH_J: "累计使用20次移除道具", CH_F: "累计使用20次移除道具", EN: "leijiyichu20" },
// /**ShareLayer */
// fenxiangtips: { CH_J: "分享邀请朋友共享链接并获得奖励", CH_F: "分享邀请朋友共享链接并获得奖励", EN: "fenxiangtips" },
// leijiyaoqing: { CH_J: "累计邀请", CH_F: "累计邀请", EN: "leijiyaoqing" },
// shouyaozhemingdan: { CH_J: "受邀者名单", CH_F: "受邀者名单", EN: "shouyaozhemingdan" },
// chakanquanbu: { CH_J: "查看全部", CH_F: "查看全部", EN: "chakanquanbu" },
// lijiyaoqing: { CH_J: "立即邀请", CH_F: "立即邀请", EN: "lijiyaoqing" },
// kelingqv: { CH_J: "可领取", CH_F: "可领取", EN: "kelingqv" },
// yilingqv: { CH_J: "已领取", CH_F: "已领取", EN: "yilingqv" },
// zanwugengduo: { CH_J: "暂无更多", CH_F: "暂无更多", EN: "zanwugengduo" },
// /**SettingLayer */
// yinyue: { CH_J: "音乐", CH_F: "音乐", EN: "yinyue" },
// yinxiao: { CH_J: "音效", CH_F: "音效", EN: "yinxiao" },
// youxishezhi: { CH_J: "游戏设置", CH_F: "游戏设置", EN: "youxishezhi" },
// yuyanqiehuan: { CH_J: "语言切换", CH_F: "语言切换", EN: "yuyanqiehuan" },
// zhongwenjianti: { CH_J: "中文简体", CH_F: "中文简体", EN: "zhongwenjianti" },
// zhongwenfanti: { CH_J: "中文繁体", CH_F: "中文繁体", EN: "zhongwenfanti" },
// yingyu: { CH_J: "英语", CH_F: "英语", EN: "yingyu" },
// /**WinLayer */
// fenxiang: { CH_J: "分享", CH_F: "分享", EN: "fenxiang" },
// xiayiguan: { CH_J: "下一关", CH_F: "下一关", EN: "xiayiguan" },
// zaiwanyici: { CH_J: "再玩一次", CH_F: "再玩一次", EN: "zaiwanyici" },

// }
export const Languages = {
    "RU": {
        "name": "RU",
        "zh-CN": "Русский язык",
        "zh-TW": "Русский язык",
        "en": "Русский язык",
        "ru": "Русский язык",
        "ar": "Русский язык",
        "ja": "Русский язык"
    },
    "AR": {
        "name": "AR",
        "zh-CN": "بالعربية",
        "zh-TW": "بالعربية",
        "en": "بالعربية",
        "ru": "بالعربية",
        "ar": "بالعربية",
        "ja": "بالعربية"
    },
    "JA": {
        "name": "JA",
        "zh-CN": "日本語",
        "zh-TW": "日本語",
        "en": "日本語",
        "ru": "日本語",
        "ar": "日本語",
        "ja": "日本語"
    },
    "suoduan": {
        "name": "suoduan", "zh-CN": "缩短", "zh-TW": "縮短", "en": "shorten", "ru": "Сокращение", "ar": "تقصير", "ja": "短縮"
    }, "touming": { "name": "touming", "zh-CN": "透明", "zh-TW": "透明", "en": "transparent", "ru": "Прозрачность", "ar": "شفافية", "ja": "透過性" }, "yichu": { "name": "yichu", "zh-CN": "移除", "zh-TW": "移除", "en": "remove", "ru": "Удалить", "ar": "إزالة", "ja": "除去じょきょ" }, "zhuanqv": { "name": "zhuanqv", "zh-CN": "赚取", "zh-TW": "賺取", "en": "earn", "ru": "Заработать", "ar": "كسب", "ja": "もうかる" }, "renwu": { "name": "renwu", "zh-CN": "任务", "zh-TW": "任務", "en": "task", "ru": "Мандат", "ar": "مهمة", "ja": "タスク＃タスク＃" }, "shangdian": { "name": "shangdian", "zh-CN": "商店", "zh-TW": "商店", "en": "store", "ru": "Магазины", "ar": "مخزن", "ja": "店" }, "yaoqing": { "name": "yaoqing", "zh-CN": "邀请", "zh-TW": "邀請", "en": "invite", "ru": "Приглашение", "ar": "دعوة", "ja": "に勧める" }, "guankaxuanze": { "name": "guankaxuanze", "zh-CN": "关卡选择", "zh-TW": "關卡選擇", "en": "Stage Select", "ru": "Выбрать уровень", "ar": "اختيار مستوى", "ja": "レベル選択" }, "putongmoshi": { "name": "putongmoshi", "zh-CN": "普通模式", "zh-TW": "普通模式", "en": "Normal mode", "ru": "Обычная модель", "ar": "الوضع العام", "ja": "通常モード" }, "tiaozhanmoshi": { "name": "tiaozhanmoshi", "zh-CN": "挑战模式", "zh-TW": "挑戰模式", "en": "Challenge Mode", "ru": "Модель вызова", "ar": "وضع التحدي", "ja": "チャレンジモード" }, "exitgame": { "name": "exitgame", "zh-CN": "退出游戏", "zh-TW": "退出遊戲", "en": "Exit the game", "ru": "Выйти из игры", "ar": "الخروج من اللعبة", "ja": "ゲームを終了する" }, "exit": { "name": "exit", "zh-CN": "退出", "zh-TW": "退出", "en": "exit", "ru": "Выход", "ar": "سحب", "ja": "終了" }, "chongwan": { "name": "chongwan", "zh-CN": "重玩", "zh-TW": "重玩", "en": "Play again", "ru": "Повторить игру", "ar": "إعادة اللعب", "ja": "遊び直す" }, "meirirenwu": { "name": "meirirenwu", "zh-CN": "每日任务", "zh-TW": "每日任務", "en": "Daily tasks", "ru": "Ежедневные задания", "ar": "المهام اليومية", "ja": "毎日のタスク" }, "mubiaorenwu": { "name": "mubiaorenwu", "zh-CN": "目标任务", "zh-TW": "目標任務", "en": "target task", "ru": "Задачи", "ar": "الهدف من المهمة", "ja": "ターゲットタスク" }, "libao": { "name": "libao", "zh-CN": "礼包", "zh-TW": "禮包", "en": "Gift Pack", "ru": "Сумка", "ar": "هدية", "ja": "プレゼント" }, "yaoshi": { "name": "yaoshi", "zh-CN": "钥匙", "zh-TW": "鑰匙", "en": "key", "ru": "Ключ.", "ar": "مفتاح .", "ja": "かぎ本" }, "daibi": { "name": "daibi", "zh-CN": "代币", "zh-TW": "代幣", "en": "Token", "ru": "Токены", "ar": "رمز العملة", "ja": "トークン" }, "pifu": { "name": "pifu", "zh-CN": "皮肤", "zh-TW": "皮膚", "en": "skin", "ru": "Кожа", "ar": "الجلد .", "ja": "スキン" }, "huasuanlibao": { "name": "huasuanlibao", "zh-CN": "划算礼包", "zh-TW": "划算禮包", "en": "Cost effective gift package", "ru": "Экономия сумок", "ar": "صفقة", "ja": "お得なギフトバッグ" }, "chaojilibao": { "name": "chaojilibao", "zh-CN": "超级礼包", "zh-TW": "超級禮包", "en": "Super Gift Pack", "ru": "Суперсумка", "ar": "سوبر حقيبة", "ja": "スーパーギフト" }, "pifulibao": { "name": "pifulibao", "zh-CN": "皮肤礼包", "zh-TW": "皮膚禮包", "en": "Skin Gift Pack", "ru": "Кожные сумки", "ar": "حقيبة جلدية", "ja": "スキンポーチ" }, "jingqingqidai": { "name": "jingqingqidai", "zh-CN": "敬请期待", "zh-TW": "敬請期待", "en": "Coming soon", "ru": "С нетерпением жду", "ar": "يرجى نتطلع إلى", "ja": "お楽しみに" }, "chakanxinwen": { "name": "chakanxinwen", "zh-CN": "查看官方新闻", "zh-TW": "查看官方新聞", "en": "View official news", "ru": "Смотреть официальные новости", "ar": "عرض الأخبار الرسمية", "ja": "公式ニュースを見る" }, "jiarupindao": { "name": "jiarupindao", "zh-CN": "加入官方频道", "zh-TW": "加入官方頻道", "en": "Join the official channel", "ru": "Присоединяйтесь к официальному каналу", "ar": "الانضمام إلى القناة الرسمية", "ja": "公式チャンネルに参加する" }, "guanzhutuite": { "name": "guanzhutuite", "zh-CN": "关注官方推特", "zh-TW": "關注官方推特", "en": "Follow the official Twitter account", "ru": "Следите за официальным Твиттером", "ar": "تويتر الرسمي", "ja": "公式ツイッターをフォロー" }, "guankayouxi": { "name": "guankayouxi", "zh-CN": "观看TON的游戏", "zh-TW": "觀看TON的遊戲", "en": "Watch TON's games", "ru": "Смотреть игру TON", "ar": "مشاهدة لعبة تون", "ja": "TONのゲームを見る" }, "tongguan10": { "name": "tongguan10", "zh-CN": "通关10次游戏关卡", "zh-TW": "通關10次遊戲關卡", "en": "Complete 10 game levels", "ru": "Скачать игру 10 раз", "ar": "لعبة 10 مستويات التخليص الجمركي", "ja": "ゲームステージを10回クリアする" }, "tongguan20": { "name": "tongguan20", "zh-CN": "通关20次游戏关卡", "zh-TW": "通關20次遊戲關卡", "en": "Complete 20 game levels", "ru": "Прохождение 20 игр.", "ar": "إزالة 20 مستويات اللعبة", "ja": "ゲームステージを20回クリアする" }, "leijitili100": { "name": "leijitili100", "zh-CN": "累计使用100体力", "zh-TW": "累計使用100體力", "en": "Accumulated use of 100 stamina", "ru": "Используйте 100 физических сил.", "ar": "استخدام القوة المتراكمة 100", "ja": "累計100体力使用" }, "leijitili200": { "name": "leijitili200", "zh-CN": "累计使用200体力", "zh-TW": "累計使用200體力", "en": "Accumulated use of 200 stamina", "ru": "Используйте 200 физических сил.", "ar": "استخدام القوة البدنية المتراكمة 200", "ja": "累計200体力使用" }, "leijiyichu20": { "name": "leijiyichu20", "zh-CN": "累计使用20次移除道具", "zh-TW": "累計使用20次移除道具", "en": "Accumulated use of 20 times to remove props", "ru": "Всего было использовано 20 удалений.", "ar": "استخدام 20 إزالة الدعائم", "ja": "削除アイテムを累計20回使用" }, "fenxiangtips": { "name": "fenxiangtips", "zh-CN": "分享邀请朋友共享链接并获得奖励", "zh-TW": "分享邀請朋友共用連結並獲得獎勵", "en": "Share Inviting Friends to Share Links and Get Rewards", "ru": "Поделиться Приглашение друзей Поделиться ссылками и получить награду", "ar": "دعوة الأصدقاء للمشاركة في الروابط والحصول على مكافآت", "ja": "友人を招待してリンクを共有し、奨励金を得る" }, "leijiyaoqing": { "name": "leijiyaoqing", "zh-CN": "累计邀请", "zh-TW": "累計邀請", "en": "Accumulated invitations", "ru": "Совокупные приглашения", "ar": "دعوة تراكمية", "ja": "累計招待" }, "shouyaozhemingdan": { "name": "shouyaozhemingdan", "zh-CN": "受邀者名单", "zh-TW": "受邀者名單", "en": "List of invitees", "ru": "Список приглашенных", "ar": "قائمة المدعوين", "ja": "招待者リスト" }, "chakanquanbu": { "name": "chakanquanbu", "zh-CN": "查看全部", "zh-TW": "查看全部", "en": "ALL", "ru": "Смотреть все", "ar": "عرض جميع", "ja": "すべて表示" }, "lijiyaoqing": { "name": "lijiyaoqing", "zh-CN": "立即邀请", "zh-TW": "立即邀請", "en": "Invite Now", "ru": "Немедленное приглашение", "ar": "دعوة فورية", "ja": "今すぐ招待" }, "kelingqv": { "name": "kelingqv", "zh-CN": "可领取", "zh-TW": "可領取", "en": "Can be claimed", "ru": "Можно получить", "ar": "الحصول على", "ja": "受領可能" }, "yilingqv": { "name": "yilingqv", "zh-CN": "已领取", "zh-TW": "已領取", "en": "Received already", "ru": "Получено", "ar": "تلقى", "ja": "受領済" }, "zanwugengduo": { "name": "zanwugengduo", "zh-CN": "暂无更多", "zh-TW": "暫無更多", "en": "No more available at the moment", "ru": "Больше нет", "ar": "لا أكثر", "ja": "これ以上はありません" }, "yinyue": { "name": "yinyue", "zh-CN": "音乐", "zh-TW": "音樂", "en": "music", "ru": "Музыка", "ar": "موسيقي .", "ja": "音楽" }, "yinxiao": { "name": "yinxiao", "zh-CN": "音效", "zh-TW": "音效", "en": "sound effects", "ru": "Звуковые эффекты", "ar": "المؤثرات الصوتية", "ja": "サウンドエフェクト" }, "youxishezhi": { "name": "youxishezhi", "zh-CN": "游戏设置", "zh-TW": "遊戲設定", "en": "GAME SETTINGS", "ru": "Настройки игры", "ar": "إعدادات اللعبة", "ja": "ゲーム設定" }, "yuyanqiehuan": { "name": "yuyanqiehuan", "zh-CN": "语言切换", "zh-TW": "語言切換", "en": "Language switching", "ru": "Переключение языка", "ar": "لغة التبديل", "ja": "言語切り替え" },
    "CH_J": {
        "name": "CH_J",
        "zh-CN": "中文简体",
        "zh-TW": "中文简体",
        "en": "中文简体",
        "ru": "中文简体",
        "ar": "中文简体",
        "ja": "中文简体"
    },
    "CH_F": {
        "name": "CH_F",
        "zh-CN": "中文繁體",
        "zh-TW": "中文繁體",
        "en": "中文繁體",
        "ru": "中文繁體",
        "ar": "中文繁體",
        "ja": "中文繁體"
    },
    "EN": {
        "name": "EN",
        "zh-CN": "English",
        "zh-TW": "English",
        "en": "English",
        "ru": "English",
        "ar": "English",
        "ja": "English"
    },
    "fenxiang": {
        "name": "fenxiang", "zh-CN": "分享", "zh-TW": "分享", "en": "share", "ru": "Поделиться", "ar": "شارك", "ja": "分かち合う"
    }, "xiayiguan": { "name": "xiayiguan", "zh-CN": "下一关", "zh-TW": "下一關", "en": "Next level", "ru": "Следующий уровень", "ar": "المستوى التالي", "ja": "次の関門" }, "zaiwanyici": { "name": "zaiwanyici", "zh-CN": "再玩一次", "zh-TW": "再玩一次", "en": "play again", "ru": "Еще раз.", "ar": "اللعب مرة أخرى", "ja": "もう一度遊んで" }
}