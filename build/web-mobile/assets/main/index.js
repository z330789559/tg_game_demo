window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AlljsonData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cc9c4h8p8lLhKv6WVEuAlw5", "AlljsonData");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.allJson = void 0;
    exports.allJson = [ {
      name: "suoduan",
      "zh-CN": "\u7f29\u77ed",
      "zh-TW": "\u7e2e\u77ed",
      en: "shorten",
      ru: "\u0421\u043e\u043a\u0440\u0430\u0449\u0435\u043d\u0438\u0435",
      ar: "\u062a\u0642\u0635\u064a\u0631",
      ja: "\u77ed\u7e2e"
    }, {
      name: "touming",
      "zh-CN": "\u900f\u660e",
      "zh-TW": "\u900f\u660e",
      en: "transparent",
      ru: "\u041f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u043e\u0441\u0442\u044c",
      ar: "\u0634\u0641\u0627\u0641\u064a\u0629",
      ja: "\u900f\u904e\u6027"
    }, {
      name: "yichu",
      "zh-CN": "\u79fb\u9664",
      "zh-TW": "\u79fb\u9664",
      en: "remove",
      ru: "\u0423\u0434\u0430\u043b\u0438\u0442\u044c",
      ar: "\u0625\u0632\u0627\u0644\u0629",
      ja: "\u9664\u53bb\u3058\u3087\u304d\u3087"
    }, {
      name: "zhuanqv",
      "zh-CN": "\u8d5a\u53d6",
      "zh-TW": "\u8cfa\u53d6",
      en: "earn",
      ru: "\u0417\u0430\u0440\u0430\u0431\u043e\u0442\u0430\u0442\u044c",
      ar: "\u0643\u0633\u0628",
      ja: "\u3082\u3046\u304b\u308b"
    }, {
      name: "renwu",
      "zh-CN": "\u4efb\u52a1",
      "zh-TW": "\u4efb\u52d9",
      en: "task",
      ru: "\u041c\u0430\u043d\u0434\u0430\u0442",
      ar: "\u0645\u0647\u0645\u0629",
      ja: "\u30bf\u30b9\u30af\uff03\u30bf\u30b9\u30af\uff03"
    }, {
      name: "shangdian",
      "zh-CN": "\u5546\u5e97",
      "zh-TW": "\u5546\u5e97",
      en: "store",
      ru: "\u041c\u0430\u0433\u0430\u0437\u0438\u043d\u044b",
      ar: "\u0645\u062e\u0632\u0646",
      ja: "\u5e97"
    }, {
      name: "yaoqing",
      "zh-CN": "\u9080\u8bf7",
      "zh-TW": "\u9080\u8acb",
      en: "invite",
      ru: "\u041f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435",
      ar: "\u062f\u0639\u0648\u0629",
      ja: "\u306b\u52e7\u3081\u308b"
    }, {
      name: "guankaxuanze",
      "zh-CN": "\u5173\u5361\u9009\u62e9",
      "zh-TW": "\u95dc\u5361\u9078\u64c7",
      en: "Stage Select",
      ru: "\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0443\u0440\u043e\u0432\u0435\u043d\u044c",
      ar: "\u0627\u062e\u062a\u064a\u0627\u0631 \u0645\u0633\u062a\u0648\u0649",
      ja: "\u30ec\u30d9\u30eb\u9078\u629e"
    }, {
      name: "putongmoshi",
      "zh-CN": "\u666e\u901a\u6a21\u5f0f",
      "zh-TW": "\u666e\u901a\u6a21\u5f0f",
      en: "Normal mode",
      ru: "\u041e\u0431\u044b\u0447\u043d\u0430\u044f \u043c\u043e\u0434\u0435\u043b\u044c",
      ar: "\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0639\u0627\u0645",
      ja: "\u901a\u5e38\u30e2\u30fc\u30c9"
    }, {
      name: "tiaozhanmoshi",
      "zh-CN": "\u6311\u6218\u6a21\u5f0f",
      "zh-TW": "\u6311\u6230\u6a21\u5f0f",
      en: "Challenge Mode",
      ru: "\u041c\u043e\u0434\u0435\u043b\u044c \u0432\u044b\u0437\u043e\u0432\u0430",
      ar: "\u0648\u0636\u0639 \u0627\u0644\u062a\u062d\u062f\u064a",
      ja: "\u30c1\u30e3\u30ec\u30f3\u30b8\u30e2\u30fc\u30c9"
    }, {
      name: "exitgame",
      "zh-CN": "\u9000\u51fa\u6e38\u620f",
      "zh-TW": "\u9000\u51fa\u904a\u6232",
      en: "Exit the game",
      ru: "\u0412\u044b\u0439\u0442\u0438 \u0438\u0437 \u0438\u0433\u0440\u044b",
      ar: "\u0627\u0644\u062e\u0631\u0648\u062c \u0645\u0646 \u0627\u0644\u0644\u0639\u0628\u0629",
      ja: "\u30b2\u30fc\u30e0\u3092\u7d42\u4e86\u3059\u308b"
    }, {
      name: "exit",
      "zh-CN": "\u9000\u51fa",
      "zh-TW": "\u9000\u51fa",
      en: "exit",
      ru: "\u0412\u044b\u0445\u043e\u0434",
      ar: "\u0633\u062d\u0628",
      ja: "\u7d42\u4e86"
    }, {
      name: "chongwan",
      "zh-CN": "\u91cd\u73a9",
      "zh-TW": "\u91cd\u73a9",
      en: "Play again",
      ru: "\u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u044c \u0438\u0433\u0440\u0443",
      ar: "\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0644\u0639\u0628",
      ja: "\u904a\u3073\u76f4\u3059"
    }, {
      name: "meirirenwu",
      "zh-CN": "\u6bcf\u65e5\u4efb\u52a1",
      "zh-TW": "\u6bcf\u65e5\u4efb\u52d9",
      en: "Daily tasks",
      ru: "\u0415\u0436\u0435\u0434\u043d\u0435\u0432\u043d\u044b\u0435 \u0437\u0430\u0434\u0430\u043d\u0438\u044f",
      ar: "\u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u064a\u0648\u0645\u064a\u0629",
      ja: "\u6bce\u65e5\u306e\u30bf\u30b9\u30af"
    }, {
      name: "mubiaorenwu",
      "zh-CN": "\u76ee\u6807\u4efb\u52a1",
      "zh-TW": "\u76ee\u6a19\u4efb\u52d9",
      en: "target task",
      ru: "\u0417\u0430\u0434\u0430\u0447\u0438",
      ar: "\u0627\u0644\u0647\u062f\u0641 \u0645\u0646 \u0627\u0644\u0645\u0647\u0645\u0629",
      ja: "\u30bf\u30fc\u30b2\u30c3\u30c8\u30bf\u30b9\u30af"
    }, {
      name: "libao",
      "zh-CN": "\u793c\u5305",
      "zh-TW": "\u79ae\u5305",
      en: "Gift Pack",
      ru: "\u0421\u0443\u043c\u043a\u0430",
      ar: "\u0647\u062f\u064a\u0629",
      ja: "\u30d7\u30ec\u30bc\u30f3\u30c8"
    }, {
      name: "yaoshi",
      "zh-CN": "\u94a5\u5319",
      "zh-TW": "\u9470\u5319",
      en: "key",
      ru: "\u041a\u043b\u044e\u0447.",
      ar: "\u0645\u0641\u062a\u0627\u062d .",
      ja: "\u304b\u304e\u672c"
    }, {
      name: "daibi",
      "zh-CN": "\u4ee3\u5e01",
      "zh-TW": "\u4ee3\u5e63",
      en: "Token",
      ru: "\u0422\u043e\u043a\u0435\u043d\u044b",
      ar: "\u0631\u0645\u0632 \u0627\u0644\u0639\u0645\u0644\u0629",
      ja: "\u30c8\u30fc\u30af\u30f3"
    }, {
      name: "pifu",
      "zh-CN": "\u76ae\u80a4",
      "zh-TW": "\u76ae\u819a",
      en: "skin",
      ru: "\u041a\u043e\u0436\u0430",
      ar: "\u0627\u0644\u062c\u0644\u062f .",
      ja: "\u30b9\u30ad\u30f3"
    }, {
      name: "huasuanlibao",
      "zh-CN": "\u5212\u7b97\u793c\u5305",
      "zh-TW": "\u5212\u7b97\u79ae\u5305",
      en: "Cost effective gift package",
      ru: "\u042d\u043a\u043e\u043d\u043e\u043c\u0438\u044f \u0441\u0443\u043c\u043e\u043a",
      ar: "\u0635\u0641\u0642\u0629",
      ja: "\u304a\u5f97\u306a\u30ae\u30d5\u30c8\u30d0\u30c3\u30b0"
    }, {
      name: "chaojilibao",
      "zh-CN": "\u8d85\u7ea7\u793c\u5305",
      "zh-TW": "\u8d85\u7d1a\u79ae\u5305",
      en: "Super Gift Pack",
      ru: "\u0421\u0443\u043f\u0435\u0440\u0441\u0443\u043c\u043a\u0430",
      ar: "\u0633\u0648\u0628\u0631 \u062d\u0642\u064a\u0628\u0629",
      ja: "\u30b9\u30fc\u30d1\u30fc\u30ae\u30d5\u30c8"
    }, {
      name: "pifulibao",
      "zh-CN": "\u76ae\u80a4\u793c\u5305",
      "zh-TW": "\u76ae\u819a\u79ae\u5305",
      en: "Skin Gift Pack",
      ru: "\u041a\u043e\u0436\u043d\u044b\u0435 \u0441\u0443\u043c\u043a\u0438",
      ar: "\u062d\u0642\u064a\u0628\u0629 \u062c\u0644\u062f\u064a\u0629",
      ja: "\u30b9\u30ad\u30f3\u30dd\u30fc\u30c1"
    }, {
      name: "jingqingqidai",
      "zh-CN": "\u656c\u8bf7\u671f\u5f85",
      "zh-TW": "\u656c\u8acb\u671f\u5f85",
      en: "Coming soon",
      ru: "\u0421 \u043d\u0435\u0442\u0435\u0440\u043f\u0435\u043d\u0438\u0435\u043c \u0436\u0434\u0443",
      ar: "\u064a\u0631\u062c\u0649 \u0646\u062a\u0637\u0644\u0639 \u0625\u0644\u0649",
      ja: "\u304a\u697d\u3057\u307f\u306b"
    }, {
      name: "chakanxinwen",
      "zh-CN": "\u67e5\u770b\u5b98\u65b9\u65b0\u95fb",
      "zh-TW": "\u67e5\u770b\u5b98\u65b9\u65b0\u805e",
      en: "View official news",
      ru: "\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u043e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0435 \u043d\u043e\u0432\u043e\u0441\u0442\u0438",
      ar: "\u0639\u0631\u0636 \u0627\u0644\u0623\u062e\u0628\u0627\u0631 \u0627\u0644\u0631\u0633\u0645\u064a\u0629",
      ja: "\u516c\u5f0f\u30cb\u30e5\u30fc\u30b9\u3092\u898b\u308b"
    }, {
      name: "jiarupindao",
      "zh-CN": "\u52a0\u5165\u5b98\u65b9\u9891\u9053",
      "zh-TW": "\u52a0\u5165\u5b98\u65b9\u983b\u9053",
      en: "Join the official channel",
      ru: "\u041f\u0440\u0438\u0441\u043e\u0435\u0434\u0438\u043d\u044f\u0439\u0442\u0435\u0441\u044c \u043a \u043e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u043c\u0443 \u043a\u0430\u043d\u0430\u043b\u0443",
      ar: "\u0627\u0644\u0627\u0646\u0636\u0645\u0627\u0645 \u0625\u0644\u0649 \u0627\u0644\u0642\u0646\u0627\u0629 \u0627\u0644\u0631\u0633\u0645\u064a\u0629",
      ja: "\u516c\u5f0f\u30c1\u30e3\u30f3\u30cd\u30eb\u306b\u53c2\u52a0\u3059\u308b"
    }, {
      name: "guanzhutuite",
      "zh-CN": "\u5173\u6ce8\u5b98\u65b9\u63a8\u7279",
      "zh-TW": "\u95dc\u6ce8\u5b98\u65b9\u63a8\u7279",
      en: "Follow the official Twitter account",
      ru: "\u0421\u043b\u0435\u0434\u0438\u0442\u0435 \u0437\u0430 \u043e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u043c \u0422\u0432\u0438\u0442\u0442\u0435\u0440\u043e\u043c",
      ar: "\u062a\u0648\u064a\u062a\u0631 \u0627\u0644\u0631\u0633\u0645\u064a",
      ja: "\u516c\u5f0f\u30c4\u30a4\u30c3\u30bf\u30fc\u3092\u30d5\u30a9\u30ed\u30fc"
    }, {
      name: "guankayouxi",
      "zh-CN": "\u89c2\u770bTON\u7684\u6e38\u620f",
      "zh-TW": "\u89c0\u770bTON\u7684\u904a\u6232",
      en: "Watch TON's games",
      ru: "\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0438\u0433\u0440\u0443 TON",
      ar: "\u0645\u0634\u0627\u0647\u062f\u0629 \u0644\u0639\u0628\u0629 \u062a\u0648\u0646",
      ja: "TON\u306e\u30b2\u30fc\u30e0\u3092\u898b\u308b"
    }, {
      name: "tongguan10",
      "zh-CN": "\u901a\u517310\u6b21\u6e38\u620f\u5173\u5361",
      "zh-TW": "\u901a\u95dc10\u6b21\u904a\u6232\u95dc\u5361",
      en: "Complete 10 game levels",
      ru: "\u0421\u043a\u0430\u0447\u0430\u0442\u044c \u0438\u0433\u0440\u0443 10 \u0440\u0430\u0437",
      ar: "\u0644\u0639\u0628\u0629 10 \u0645\u0633\u062a\u0648\u064a\u0627\u062a \u0627\u0644\u062a\u062e\u0644\u064a\u0635 \u0627\u0644\u062c\u0645\u0631\u0643\u064a",
      ja: "\u30b2\u30fc\u30e0\u30b9\u30c6\u30fc\u30b8\u309210\u56de\u30af\u30ea\u30a2\u3059\u308b"
    }, {
      name: "tongguan20",
      "zh-CN": "\u901a\u517320\u6b21\u6e38\u620f\u5173\u5361",
      "zh-TW": "\u901a\u95dc20\u6b21\u904a\u6232\u95dc\u5361",
      en: "Complete 20 game levels",
      ru: "\u041f\u0440\u043e\u0445\u043e\u0436\u0434\u0435\u043d\u0438\u0435 20 \u0438\u0433\u0440.",
      ar: "\u0625\u0632\u0627\u0644\u0629 20 \u0645\u0633\u062a\u0648\u064a\u0627\u062a \u0627\u0644\u0644\u0639\u0628\u0629",
      ja: "\u30b2\u30fc\u30e0\u30b9\u30c6\u30fc\u30b8\u309220\u56de\u30af\u30ea\u30a2\u3059\u308b"
    }, {
      name: "leijitili100",
      "zh-CN": "\u7d2f\u8ba1\u4f7f\u7528100\u4f53\u529b",
      "zh-TW": "\u7d2f\u8a08\u4f7f\u7528100\u9ad4\u529b",
      en: "Accumulated use of 100 stamina",
      ru: "\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 100 \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043a\u0438\u0445 \u0441\u0438\u043b.",
      ar: "\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u0642\u0648\u0629 \u0627\u0644\u0645\u062a\u0631\u0627\u0643\u0645\u0629 100",
      ja: "\u7d2f\u8a08100\u4f53\u529b\u4f7f\u7528"
    }, {
      name: "leijitili200",
      "zh-CN": "\u7d2f\u8ba1\u4f7f\u7528200\u4f53\u529b",
      "zh-TW": "\u7d2f\u8a08\u4f7f\u7528200\u9ad4\u529b",
      en: "Accumulated use of 200 stamina",
      ru: "\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 200 \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043a\u0438\u0445 \u0441\u0438\u043b.",
      ar: "\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u0642\u0648\u0629 \u0627\u0644\u0628\u062f\u0646\u064a\u0629 \u0627\u0644\u0645\u062a\u0631\u0627\u0643\u0645\u0629 200",
      ja: "\u7d2f\u8a08200\u4f53\u529b\u4f7f\u7528"
    }, {
      name: "leijiyichu20",
      "zh-CN": "\u7d2f\u8ba1\u4f7f\u752820\u6b21\u79fb\u9664\u9053\u5177",
      "zh-TW": "\u7d2f\u8a08\u4f7f\u752820\u6b21\u79fb\u9664\u9053\u5177",
      en: "Accumulated use of 20 times to remove props",
      ru: "\u0412\u0441\u0435\u0433\u043e \u0431\u044b\u043b\u043e \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u043e 20 \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u0439.",
      ar: "\u0627\u0633\u062a\u062e\u062f\u0627\u0645 20 \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u062f\u0639\u0627\u0626\u0645",
      ja: "\u524a\u9664\u30a2\u30a4\u30c6\u30e0\u3092\u7d2f\u8a0820\u56de\u4f7f\u7528"
    }, {
      name: "fenxiangtips",
      "zh-CN": "\u5206\u4eab\u9080\u8bf7\u670b\u53cb\u5171\u4eab\u94fe\u63a5\u5e76\u83b7\u5f97\u5956\u52b1",
      "zh-TW": "\u5206\u4eab\u9080\u8acb\u670b\u53cb\u5171\u7528\u9023\u7d50\u4e26\u7372\u5f97\u734e\u52f5",
      en: "Share Inviting Friends to Share Links and Get Rewards",
      ru: "\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f \u041f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435 \u0434\u0440\u0443\u0437\u0435\u0439 \u041f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f \u0441\u0441\u044b\u043b\u043a\u0430\u043c\u0438 \u0438 \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u043d\u0430\u0433\u0440\u0430\u0434\u0443",
      ar: "\u062f\u0639\u0648\u0629 \u0627\u0644\u0623\u0635\u062f\u0642\u0627\u0621 \u0644\u0644\u0645\u0634\u0627\u0631\u0643\u0629 \u0641\u064a \u0627\u0644\u0631\u0648\u0627\u0628\u0637 \u0648\u0627\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0645\u0643\u0627\u0641\u0622\u062a",
      ja: "\u53cb\u4eba\u3092\u62db\u5f85\u3057\u3066\u30ea\u30f3\u30af\u3092\u5171\u6709\u3057\u3001\u5968\u52b1\u91d1\u3092\u5f97\u308b"
    }, {
      name: "leijiyaoqing",
      "zh-CN": "\u7d2f\u8ba1\u9080\u8bf7",
      "zh-TW": "\u7d2f\u8a08\u9080\u8acb",
      en: "Accumulated invitations",
      ru: "\u0421\u043e\u0432\u043e\u043a\u0443\u043f\u043d\u044b\u0435 \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u044f",
      ar: "\u062f\u0639\u0648\u0629 \u062a\u0631\u0627\u0643\u0645\u064a\u0629",
      ja: "\u7d2f\u8a08\u62db\u5f85"
    }, {
      name: "shouyaozhemingdan",
      "zh-CN": "\u53d7\u9080\u8005\u540d\u5355",
      "zh-TW": "\u53d7\u9080\u8005\u540d\u55ae",
      en: "List of invitees",
      ru: "\u0421\u043f\u0438\u0441\u043e\u043a \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u043d\u044b\u0445",
      ar: "\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u062f\u0639\u0648\u064a\u0646",
      ja: "\u62db\u5f85\u8005\u30ea\u30b9\u30c8"
    }, {
      name: "chakanquanbu",
      "zh-CN": "\u67e5\u770b\u5168\u90e8",
      "zh-TW": "\u67e5\u770b\u5168\u90e8",
      en: "ALL",
      ru: "\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0432\u0441\u0435",
      ar: "\u0639\u0631\u0636 \u062c\u0645\u064a\u0639",
      ja: "\u3059\u3079\u3066\u8868\u793a"
    }, {
      name: "lijiyaoqing",
      "zh-CN": "\u7acb\u5373\u9080\u8bf7",
      "zh-TW": "\u7acb\u5373\u9080\u8acb",
      en: "Invite Now",
      ru: "\u041d\u0435\u043c\u0435\u0434\u043b\u0435\u043d\u043d\u043e\u0435 \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435",
      ar: "\u062f\u0639\u0648\u0629 \u0641\u0648\u0631\u064a\u0629",
      ja: "\u4eca\u3059\u3050\u62db\u5f85"
    }, {
      name: "kelingqv",
      "zh-CN": "\u53ef\u9886\u53d6",
      "zh-TW": "\u53ef\u9818\u53d6",
      en: "Can be claimed",
      ru: "\u041c\u043e\u0436\u043d\u043e \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c",
      ar: "\u0627\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649",
      ja: "\u53d7\u9818\u53ef\u80fd"
    }, {
      name: "yilingqv",
      "zh-CN": "\u5df2\u9886\u53d6",
      "zh-TW": "\u5df2\u9818\u53d6",
      en: "Received already",
      ru: "\u041f\u043e\u043b\u0443\u0447\u0435\u043d\u043e",
      ar: "\u062a\u0644\u0642\u0649",
      ja: "\u53d7\u9818\u6e08"
    }, {
      name: "zanwugengduo",
      "zh-CN": "\u6682\u65e0\u66f4\u591a",
      "zh-TW": "\u66ab\u7121\u66f4\u591a",
      en: "No more available at the moment",
      ru: "\u0411\u043e\u043b\u044c\u0448\u0435 \u043d\u0435\u0442",
      ar: "\u0644\u0627 \u0623\u0643\u062b\u0631",
      ja: "\u3053\u308c\u4ee5\u4e0a\u306f\u3042\u308a\u307e\u305b\u3093"
    }, {
      name: "yinyue",
      "zh-CN": "\u97f3\u4e50",
      "zh-TW": "\u97f3\u6a02",
      en: "music",
      ru: "\u041c\u0443\u0437\u044b\u043a\u0430",
      ar: "\u0645\u0648\u0633\u064a\u0642\u064a .",
      ja: "\u97f3\u697d"
    }, {
      name: "yinxiao",
      "zh-CN": "\u97f3\u6548",
      "zh-TW": "\u97f3\u6548",
      en: "sound effects",
      ru: "\u0417\u0432\u0443\u043a\u043e\u0432\u044b\u0435 \u044d\u0444\u0444\u0435\u043a\u0442\u044b",
      ar: "\u0627\u0644\u0645\u0624\u062b\u0631\u0627\u062a \u0627\u0644\u0635\u0648\u062a\u064a\u0629",
      ja: "\u30b5\u30a6\u30f3\u30c9\u30a8\u30d5\u30a7\u30af\u30c8"
    }, {
      name: "youxishezhi",
      "zh-CN": "\u6e38\u620f\u8bbe\u7f6e",
      "zh-TW": "\u904a\u6232\u8a2d\u5b9a",
      en: "GAME SETTINGS",
      ru: "\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0438\u0433\u0440\u044b",
      ar: "\u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0627\u0644\u0644\u0639\u0628\u0629",
      ja: "\u30b2\u30fc\u30e0\u8a2d\u5b9a"
    }, {
      name: "yuyanqiehuan",
      "zh-CN": "\u8bed\u8a00\u5207\u6362",
      "zh-TW": "\u8a9e\u8a00\u5207\u63db",
      en: "Language switching",
      ru: "\u041f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 \u044f\u0437\u044b\u043a\u0430",
      ar: "\u0644\u063a\u0629 \u0627\u0644\u062a\u0628\u062f\u064a\u0644",
      ja: "\u8a00\u8a9e\u5207\u308a\u66ff\u3048"
    }, {
      name: "zhongwenjianti",
      "zh-CN": "\u4e2d\u6587\u7b80\u4f53",
      "zh-TW": "\u4e2d\u6587\u7c21\u9ad4",
      en: "Simplified Chinese",
      ru: "\u041a\u0438\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u0443\u043f\u0440\u043e\u0449\u0435\u043d\u043d\u044b\u0439",
      ar: "\u0627\u0644\u0635\u064a\u0646\u064a\u0629 \u0627\u0644\u0645\u0628\u0633\u0637\u0629",
      ja: "\u4e2d\u56fd\u8a9e\u306e\u7c21\u4f53\u5b57"
    }, {
      name: "zhongwenfanti",
      "zh-CN": "\u4e2d\u6587\u7e41\u4f53",
      "zh-TW": "\u4e2d\u6587\u7e41\u9ad4",
      en: "chinese traditional",
      ru: "\u041a\u0438\u0442\u0430\u0439\u0441\u043a\u0438\u0439 \u0441\u0442\u0438\u043b\u044c",
      ar: "\u0627\u0644\u0635\u064a\u0646\u064a\u0629 \u0627\u0644\u062a\u0642\u0644\u064a\u062f\u064a\u0629",
      ja: "\u4e2d\u56fd\u8a9e\u7e41\u4f53\u5b57"
    }, {
      name: "yingyu",
      "zh-CN": "\u82f1\u8bed",
      "zh-TW": "\u82f1\u8a9e",
      en: "English",
      ru: "\u0410\u043d\u0433\u043b\u0438\u0439\u0441\u043a\u0438\u0439 \u044f\u0437\u044b\u043a",
      ar: "\u0625\u0646\u062c\u0644\u064a\u0632\u064a",
      ja: "\u82f1\u8a9e"
    }, {
      name: "fenxiang",
      "zh-CN": "\u5206\u4eab",
      "zh-TW": "\u5206\u4eab",
      en: "share",
      ru: "\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f",
      ar: "\u0634\u0627\u0631\u0643",
      ja: "\u5206\u304b\u3061\u5408\u3046"
    }, {
      name: "xiayiguan",
      "zh-CN": "\u4e0b\u4e00\u5173",
      "zh-TW": "\u4e0b\u4e00\u95dc",
      en: "Next level",
      ru: "\u0421\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0439 \u0443\u0440\u043e\u0432\u0435\u043d\u044c",
      ar: "\u0627\u0644\u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u062a\u0627\u0644\u064a",
      ja: "\u6b21\u306e\u95a2\u9580"
    }, {
      name: "zaiwanyici",
      "zh-CN": "\u518d\u73a9\u4e00\u6b21",
      "zh-TW": "\u518d\u73a9\u4e00\u6b21",
      en: "play again",
      ru: "\u0415\u0449\u0435 \u0440\u0430\u0437.",
      ar: "\u0627\u0644\u0644\u0639\u0628 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649",
      ja: "\u3082\u3046\u4e00\u5ea6\u904a\u3093\u3067"
    } ];
    cc._RF.pop();
  }, {} ],
  AudioManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ec837HPHdhNmbkWqoAlSNAg", "AudioManager");
    "use strict";
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enum_1 = require("./../Enum");
    var DataManager_1 = require("./DataManager");
    var ResourceManager_1 = require("./ResourceManager");
    var AudioManager = function() {
      function AudioManager() {
        this.audioSource = null;
      }
      AudioManager.getInstance = function() {
        if (null === this._instance) {
          this._instance = new this();
          this._instance.init();
        }
        return this._instance;
      };
      Object.defineProperty(AudioManager, "instance", {
        get: function() {
          return this.getInstance();
        },
        enumerable: false,
        configurable: true
      });
      AudioManager.prototype.init = function() {
        this.audioSource = new cc.AudioSource();
        this.audioSource.loop = true;
        this.audioSource.volume = .3;
      };
      AudioManager.prototype.playMusic = function() {
        return __awaiter(this, void 0, void 0, function() {
          var clip;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!DataManager_1.default.instance.isMusicOn) return [ 2 ];
              if (this.audioSource.clip) {
                this.audioSource.play();
                return [ 2 ];
              }
              return [ 4, ResourceManager_1.default.instance.getClip(Enum_1.ENUM_AUDIO_CLIP.BGM) ];

             case 1:
              clip = _a.sent();
              this.audioSource.clip = clip;
              this.audioSource.play();
              return [ 2 ];
            }
          });
        });
      };
      AudioManager.prototype.stopMusic = function() {
        this.audioSource.stop();
      };
      AudioManager.prototype.playSound = function(name, isLoop) {
        void 0 === isLoop && (isLoop = false);
        return __awaiter(this, void 0, void 0, function() {
          var clip;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!DataManager_1.default.instance.isSoundOn) return [ 2 ];
              return [ 4, ResourceManager_1.default.instance.getClip(name) ];

             case 1:
              clip = _a.sent();
              return [ 2, cc.audioEngine.playEffect(clip, isLoop) ];
            }
          });
        });
      };
      AudioManager.prototype.stopSound = function(audioId) {
        cc.audioEngine.stopEffect(audioId);
      };
      AudioManager._instance = null;
      return AudioManager;
    }();
    exports.default = AudioManager;
    cc._RF.pop();
  }, {
    "./../Enum": "Enum",
    "./DataManager": "DataManager",
    "./ResourceManager": "ResourceManager"
  } ],
  BaseItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "97fa6nmod5JdJS1o5fTz8Lc", "BaseItem");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enum_1 = require("../Enum");
    var Languages_1 = require("../Languages");
    var AudioManager_1 = require("../manager/AudioManager");
    var DataManager_1 = require("../manager/DataManager");
    var EventManager_1 = require("../manager/EventManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BaseItem = function(_super) {
      __extends(BaseItem, _super);
      function BaseItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.allNodeClickEvent = [];
        _this.allLabels = [];
        return _this;
      }
      BaseItem_1 = BaseItem;
      BaseItem.prototype.onLoad = function() {
        var _this = this;
        this.allNodeClickEvent = [];
        this.allLabels = [];
        this.node.walk(function(node) {
          node.getComponent(cc.Label) && _this.allLabels.push(node.getComponent(cc.Label));
        }, null);
      };
      BaseItem.prototype.start = function() {
        this.updateLanguage();
      };
      BaseItem.prototype.init = function() {};
      BaseItem.prototype.setData = function(data) {};
      BaseItem.prototype.onEnable = function() {
        EventManager_1.default.instance.on(EventManager_1.EventType.UPDATE_LANGUAGE, this.updateLanguage, this);
      };
      BaseItem.prototype.onDisable = function() {
        EventManager_1.default.instance.off(EventManager_1.EventType.UPDATE_LANGUAGE, this.updateLanguage, this);
      };
      BaseItem.prototype.updateLanguage = function() {
        for (var i = 0; i < this.allLabels.length; i++) {
          var name = this.allLabels[i].node.name;
          Languages_1.Languages[name] && (this.allLabels[i].string = Languages_1.Languages[name][DataManager_1.default.instance.language]);
        }
      };
      BaseItem.prototype.onTouch = function(node, cb, target) {
        if (!node.getComponent(cc.Button)) {
          node.addComponent(cc.Button);
          node.getComponent(cc.Button).transition = cc.Button.Transition.SCALE;
          node.getComponent(cc.Button).duration = .1;
          node.getComponent(cc.Button).zoomScale = .9;
        }
        var callback = function() {
          AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
          cb && cb.call(target);
        };
        node.on("click", callback, this);
        this.allNodeClickEvent.push({
          node: node,
          callback: callback,
          target: this
        });
      };
      BaseItem.prototype.onDestroy = function() {
        for (var i = 0; i < this.allNodeClickEvent.length; i++) {
          var item = this.allNodeClickEvent[i];
          item.node.off("click", item.callback, item.target);
        }
        this.allNodeClickEvent = [];
      };
      BaseItem.prototype.CreateListItem = function(content, itemNode, data, Base) {
        var child = content.children;
        for (var i = 0; i < data.length; i++) {
          if (!child[i]) {
            var item = cc.instantiate(itemNode);
            content.addChild(item);
          }
          child[i].active = true;
          if (!child[i].getComponent(Base)) {
            child[i].addComponent(Base);
            child[i].getComponent(Base).init();
          }
          child[i].getComponent(Base).setData(data[i]);
        }
        if (child.length > data.length) for (var i = data.length; i < child.length; i++) child[i].active = false;
      };
      var BaseItem_1;
      BaseItem = BaseItem_1 = __decorate([ ccclass ], BaseItem);
      return BaseItem;
    }(cc.Component);
    exports.default = BaseItem;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../Languages": "Languages",
    "../manager/AudioManager": "AudioManager",
    "../manager/DataManager": "DataManager",
    "../manager/EventManager": "EventManager"
  } ],
  BaseLanguageLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d4bf4FXm2tNe6WNZ/JRuqhM", "BaseLanguageLayer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Languages_1 = require("../Languages");
    var DataManager_1 = require("../manager/DataManager");
    var Baselayer_1 = require("./Baselayer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BaseLanguageLayer = function(_super) {
      __extends(BaseLanguageLayer, _super);
      function BaseLanguageLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.allLabels = [];
        return _this;
      }
      BaseLanguageLayer.prototype.onLoad = function() {
        var _this = this;
        _super.prototype.onLoad.call(this);
        this.allLabels = [];
        this.node.walk(function(node) {
          node.getComponent(cc.Label) && _this.allLabels.push(node.getComponent(cc.Label));
        }, null);
      };
      BaseLanguageLayer.prototype.updateLanguage = function() {
        for (var i = 0; i < this.allLabels.length; i++) {
          var name = this.allLabels[i].node.name;
          Languages_1.Languages[name] && (this.allLabels[i].string = Languages_1.Languages[name][DataManager_1.default.instance.language]);
        }
      };
      BaseLanguageLayer.prototype.start = function() {};
      BaseLanguageLayer = __decorate([ ccclass ], BaseLanguageLayer);
      return BaseLanguageLayer;
    }(Baselayer_1.default);
    exports.default = BaseLanguageLayer;
    cc._RF.pop();
  }, {
    "../Languages": "Languages",
    "../manager/DataManager": "DataManager",
    "./Baselayer": "Baselayer"
  } ],
  Baselayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "85f2bS+gIxJj5wlc4XZ3Qd4", "Baselayer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enum_1 = require("../Enum");
    var AudioManager_1 = require("../manager/AudioManager");
    var EventManager_1 = require("../manager/EventManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BaseLayer = function(_super) {
      __extends(BaseLayer, _super);
      function BaseLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.allNodeClickEvent = [];
        return _this;
      }
      BaseLayer.prototype.onLoad = function() {
        this.allNodeClickEvent = [];
      };
      BaseLayer.prototype.show = function() {
        this.node.active = true;
        EventManager_1.default.instance.on(EventManager_1.EventType.UPDATE_LANGUAGE, this.updateLanguage, this);
        this.updateLanguage();
      };
      BaseLayer.prototype.hide = function() {
        this.node.active = false;
        EventManager_1.default.instance.off(EventManager_1.EventType.UPDATE_LANGUAGE, this.updateLanguage, this);
      };
      BaseLayer.prototype.updateLanguage = function() {};
      BaseLayer.prototype.zoomIn = function(node, scale, speed) {
        void 0 === scale && (scale = 1.5);
        void 0 === speed && (speed = .3);
        node.setScale(scale);
        var act = cc.scaleTo(speed, 1);
        cc.tween(node).then(act).start();
      };
      BaseLayer.prototype.zoomOut = function(node, scale, speed) {
        void 0 === scale && (scale = .5);
        void 0 === speed && (speed = .3);
        node.setScale(scale);
        var act = cc.scaleTo(speed, 1);
        cc.tween(node).then(act).start();
      };
      BaseLayer.prototype.onTouch = function(node, cb, target) {
        if (!node.getComponent(cc.Button)) {
          node.addComponent(cc.Button);
          node.getComponent(cc.Button).transition = cc.Button.Transition.SCALE;
          node.getComponent(cc.Button).duration = .1;
          node.getComponent(cc.Button).zoomScale = .9;
        }
        var callback = function() {
          AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
          cb && cb.call(target);
        };
        node.on("click", callback, this);
        this.allNodeClickEvent.push({
          node: node,
          callback: callback,
          target: this
        });
      };
      BaseLayer.prototype.onDestroy = function() {
        for (var i = 0; i < this.allNodeClickEvent.length; i++) {
          var item = this.allNodeClickEvent[i];
          item.node.off("click", item.callback, item.target);
        }
        this.allNodeClickEvent = [];
      };
      BaseLayer.prototype.CreateListItem = function(content, itemNode, data, Base) {
        var child = content.children;
        for (var i = 0; i < data.length; i++) {
          if (!child[i]) {
            var item = cc.instantiate(itemNode);
            content.addChild(item);
          }
          child[i].active = true;
          if (!child[i].getComponent(Base)) {
            child[i].addComponent(Base);
            child[i].getComponent(Base).init();
          }
          child[i].getComponent(Base).setData(data[i]);
        }
        if (child.length > data.length) for (var i = data.length; i < child.length; i++) child[i].active = false;
      };
      BaseLayer = __decorate([ ccclass ], BaseLayer);
      return BaseLayer;
    }(cc.Component);
    exports.default = BaseLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../manager/AudioManager": "AudioManager",
    "../manager/EventManager": "EventManager"
  } ],
  Board: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "768e6WN1ylLepOdZcXsg5RV", "Board");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enum_1 = require("../Enum");
    var Utils_1 = require("../Utils");
    var DataManager_1 = require("../manager/DataManager");
    var PoolManager_1 = require("../manager/PoolManager");
    var Car_1 = require("./Car");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Board = function(_super) {
      __extends(Board, _super);
      function Board() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Board.prototype.init = function() {
        var data = null;
        if (DataManager_1.default.instance.mode == Enum_1.ENUM_GAME_MODE.TIMER) {
          data = DataManager_1.LEVEL_DATA[DataManager_1.default.instance.level - 1];
          if (data.cars > 0) {
            DataManager_1.default.instance.carNum = data.cars;
            return;
          }
        } else if (DataManager_1.default.instance.mode == Enum_1.ENUM_GAME_MODE.LEVEL) {
          data = DataManager_1.CLEVEL_Data[DataManager_1.default.instance.clevel - 1];
          var crash = Utils_1.random(2, 8);
          data.crash > 0 && (crash = data.crash);
          DataManager_1.default.instance.crashTotal = crash;
          if (data.cars > 0) {
            DataManager_1.default.instance.carNum = data.cars;
            return;
          }
        }
        this.node.removeAllChildren();
        var xn = data.width / data.unit;
        var yn = data.height / data.unit;
        var outForTest = 0;
        var carPool = new Map();
        for (var x = 0; x < xn; x++) {
          outForTest += 1;
          for (var y = 0; y < yn; y++) if (!carPool.has(x + "_" + y)) {
            var dir = Utils_1.random(0, 3);
            if (0 == dir || 2 == dir) {
              var hn = 0;
              if (y < yn - 1 && !carPool.has(x + "_" + (y + 1))) {
                hn = 2;
                y < yn - 2 && !carPool.has(x + "_" + (y + 2)) && (hn = Utils_1.random(2, 3));
              }
              if (hn) {
                DataManager_1.default.instance.carNum += 1;
                var carNode = PoolManager_1.default.instance.getNode("Car" + dir, this.node);
                var carComponent = carNode.getComponent(Car_1.default);
                carNode.width = data.unit;
                carNode.height = data.unit * hn;
                for (var n = 0; n < hn; n++) carPool.set(x + "_" + (y + n), true);
                carNode.setPosition(carNode.width * (.5 + x), y * data.unit + .5 * carNode.height);
                carComponent.setDir(dir);
                carComponent.setSprite(dir);
                carComponent.setCollider();
              }
            } else {
              var wn = 0;
              if (x < xn - 1 && !carPool.has(x + 1 + "_" + y)) {
                wn = 2;
                x < xn - 2 && !carPool.has(x + 2 + "_" + y) && (wn = Utils_1.random(2, 3));
              }
              if (wn) {
                DataManager_1.default.instance.carNum += 1;
                var carNode = PoolManager_1.default.instance.getNode("Car" + dir, this.node);
                var carComponent = carNode.getComponent(Car_1.default);
                carNode.width = data.unit * wn;
                carNode.height = data.unit;
                for (var n = 0; n < wn; n++) carPool.set(x + n + "_" + y, true);
                carNode.setPosition(x * data.unit + .5 * carNode.width, carNode.height * (.5 + y));
                carComponent.setDir(dir);
                carComponent.setSprite(dir);
                carComponent.setCollider();
              }
            }
          }
        }
        for (var x = 0; x < xn; x++) if (Utils_1.random(0, 1)) {
          var exitNode = PoolManager_1.default.instance.getNode("Exit", this.node);
          var exitCollider = exitNode.getComponent(cc.BoxCollider);
          exitNode.width = data.unit;
          exitNode.setPosition(x * data.unit + data.unit / 2, data.height + 5);
          exitCollider.size.width = data.unit;
          var blockNode = PoolManager_1.default.instance.getNode("Block2", this.node);
          var blockCollider = blockNode.getComponent(cc.BoxCollider);
          blockNode.width = data.unit;
          blockNode.setPosition(x * data.unit + data.unit / 2, -5);
          blockCollider.size.width = data.unit;
        } else {
          var exitNode = PoolManager_1.default.instance.getNode("Exit", this.node);
          var exitCollider = exitNode.getComponent(cc.BoxCollider);
          exitNode.width = data.unit;
          exitNode.setPosition(x * data.unit + data.unit / 2, -5);
          exitCollider.size.width = data.unit;
          var blockNode = PoolManager_1.default.instance.getNode("Block0", this.node);
          var blockCollider = blockNode.getComponent(cc.BoxCollider);
          blockNode.width = data.unit;
          blockNode.setPosition(x * data.unit + data.unit / 2, data.height + 5);
          blockCollider.size.width = data.unit;
        }
        for (var y = 0; y < yn; y++) if (Utils_1.random(0, 1)) {
          var exitNode = PoolManager_1.default.instance.getNode("Exit", this.node);
          var exitCollider = exitNode.getComponent(cc.BoxCollider);
          exitNode.height = data.unit;
          exitNode.setPosition(-5, y * data.unit + data.unit / 2);
          exitCollider.size.height = data.unit;
          var blockNode = PoolManager_1.default.instance.getNode("Block3", this.node);
          var blockCollider = blockNode.getComponent(cc.BoxCollider);
          blockNode.height = data.unit;
          blockNode.setPosition(data.width + 5, y * data.unit + data.unit / 2);
          blockCollider.size.height = data.unit;
        } else {
          var exitNode = PoolManager_1.default.instance.getNode("Exit", this.node);
          var exitCollider = exitNode.getComponent(cc.BoxCollider);
          exitNode.height = data.unit;
          exitNode.setPosition(data.width + 5, y * data.unit + data.unit / 2);
          exitCollider.size.height = data.unit;
          var blockNode = PoolManager_1.default.instance.getNode("Block1", this.node);
          var blockCollider = blockNode.getComponent(cc.BoxCollider);
          blockNode.height = data.unit;
          blockNode.setPosition(-5, y * data.unit + data.unit / 2);
          blockCollider.size.height = data.unit;
        }
      };
      Board = __decorate([ ccclass ], Board);
      return Board;
    }(cc.Component);
    exports.default = Board;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../Utils": "Utils",
    "../manager/DataManager": "DataManager",
    "../manager/PoolManager": "PoolManager",
    "./Car": "Car"
  } ],
  CarSingle: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b38bfwZHwhPfJl1FC+k/o2S", "CarSingle");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enum_1 = require("../Enum");
    var StaticInstance_1 = require("../StaticInstance");
    var Utils_1 = require("../Utils");
    var AudioManager_1 = require("../manager/AudioManager");
    var DataManager_1 = require("../manager/DataManager");
    var EffectManager_1 = require("../manager/EffectManager");
    var ResourceManager_1 = require("../manager/ResourceManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CAR_RESOUCE_PREFIX = [ "car_black_", "car_blue_", "car_green_", "car_yellow_", "car_red_" ];
    var Car = function(_super) {
      __extends(Car, _super);
      function Car() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.dir = 0;
        _this.speed = 1200;
        _this.speedExit = 600;
        _this.touchPos = null;
        _this.touchSlideDis = 5;
        _this.touchSlideDir = cc.v2(0, 0);
        _this.isMoving = false;
        return _this;
      }
      Car.prototype.onLoad = function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchOver, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchOver, this);
      };
      Car.prototype.setDir = function(dir) {
        this.dir = dir;
      };
      Car.prototype.setSprite = function(dir) {
        var name = "" + (CAR_RESOUCE_PREFIX[Utils_1.random(0, 4)] + dir);
        this.node.getChildByName("body").getComponent(cc.Sprite).spriteFrame = ResourceManager_1.default.instance.getSprite(name);
      };
      Car.prototype.setCollider = function() {
        var collider = this.node.getComponent(cc.BoxCollider);
        var size = new cc.Size(this.node.width - 10, this.node.height - 10);
        collider.size = size;
      };
      Car.prototype.setParticle = function() {
        var collect = this.node.getChildByName("collect");
        collect && collect.getComponent(cc.ParticleSystem).resetSystem();
      };
      Car.prototype.onTouchStart = function(e) {
        if (this.isMoving || DataManager_1.default.instance.currentCar) return;
        DataManager_1.default.instance.currentCar = this;
        var location = e.getLocation();
        var touchPos = this.node.parent.convertToNodeSpaceAR(location);
        this.touchPos = touchPos;
        DataManager_1.default.instance.isTimerStart || StaticInstance_1.StaticInstance.uiManager.setMainTimer();
      };
      Car.prototype.onTouchMove = function(e) {
        if (this.isMoving || DataManager_1.default.instance.currentCar != this) return;
        if (this.touchPos) {
          var location = e.getLocation();
          var touchPos = this.node.parent.convertToNodeSpaceAR(location);
          var dis = Utils_1.getDistance(this.touchPos, touchPos);
          if (dis >= this.touchSlideDis) {
            var angle = Math.abs(Utils_1.getAngle(this.touchPos, touchPos));
            if (angle > 45 && angle < 135) {
              this.touchSlideDir.x = 0;
              this.touchPos.y - touchPos.y > 0 ? this.touchSlideDir.y = -1 : this.touchSlideDir.y = 1;
            } else {
              this.touchSlideDir.y = 0;
              this.touchPos.x - touchPos.x < 0 ? this.touchSlideDir.x = 1 : this.touchSlideDir.x = -1;
            }
          }
        }
      };
      Car.prototype.onTouchOver = function() {
        if (this.isMoving || DataManager_1.default.instance.currentCar != this) return;
        if (this.touchSlideDir.x || this.touchSlideDir.y) if (this.touchSlideDir.x && (1 == this.dir || 3 == this.dir) || this.touchSlideDir.y && (0 == this.dir || 2 == this.dir)) this.isMoving = true; else {
          AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.BI);
          this.resetStatus();
        } else {
          AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.BIBI);
          this.resetStatus();
        }
      };
      Car.prototype.update = function(dt) {
        if (this.isMoving) {
          this.node.x += this.speed * this.touchSlideDir.x * dt;
          this.node.y += this.speed * this.touchSlideDir.y * dt;
        }
      };
      Car.prototype.onCollisionEnter = function(other, self) {
        var _this = this;
        if (DataManager_1.default.instance.isShaking) return;
        if (this.touchSlideDir.x || this.touchSlideDir.y) if (other.tag == Enum_1.ENUM_COLLIDER_TYPE.CAR || other.tag == Enum_1.ENUM_COLLIDER_TYPE.BLOCK) {
          AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CRASH);
          DataManager_1.default.instance.isShaking = true;
          EffectManager_1.default.instance.shake(StaticInstance_1.StaticInstance.gameManager.stage, .1, function() {
            DataManager_1.default.instance.isShaking = false;
          }, false);
          var _a = this.touchSlideDir, x = _a.x, y = _a.y;
          var crashPos = cc.v2(0, 0);
          if (x) {
            this.touchSlideDir.x = 0;
            this.node.x = other.node.x + (other.node.width + self.node.width) / 2 * -x;
            crashPos = cc.v2(this.node.width / 2 * x, 0);
          } else {
            this.touchSlideDir.y = 0;
            this.node.y = other.node.y + (other.node.height + self.node.height) / 2 * -y;
            crashPos = cc.v2(0, this.node.height / 2 * y);
          }
          EffectManager_1.default.instance.play("Bomb", this.node, {
            pos: crashPos
          });
          this.isMoving = false;
          this.resetStatus();
        } else if (other.tag == Enum_1.ENUM_COLLIDER_TYPE.EXIT) {
          AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.Exit);
          var _b = this.touchSlideDir, x = _b.x, y = _b.y;
          var _c = cc.winSize, swidth = _c.width, sheight = _c.height;
          var act = null;
          if (x) {
            var angle = -90;
            (1 == this.dir && 1 == x || 3 == this.dir && -1 == x) && (angle = 90);
            this.node.angle += angle;
            this.touchSlideDir.x = 0;
            this.node.x = other.node.x + (other.node.width + self.node.height) / 2 * x + other.offset.x;
            var p = Utils_1.toXY(this.node, StaticInstance_1.StaticInstance.gameManager.stage);
            var dis = 0;
            dis = x > 0 ? Math.abs(sheight / 2 - p.y) + this.node.height / 2 : Math.abs(-sheight / 2 - p.y) + this.node.height / 2;
            var mtime = dis / this.speedExit;
            act = cc.moveTo(mtime, this.node.x, this.node.y + dis * x);
          } else {
            var angle = -90;
            (2 == this.dir && 1 == y || 0 == this.dir && -1 == y) && (angle = 90);
            this.node.angle += angle;
            this.touchSlideDir.y = 0;
            this.node.y = other.node.y + (other.node.height + self.node.width) / 2 * y + other.offset.y;
            var p = Utils_1.toXY(this.node, StaticInstance_1.StaticInstance.gameManager.stage);
            var dis = 0;
            dis = y > 0 ? Math.abs(swidth / 2 - p.x) + this.node.width / 2 : Math.abs(-swidth / 2 - p.x) + this.node.width / 2;
            var mtime = dis / this.speedExit;
            act = cc.moveTo(mtime, this.node.x + dis * y, this.node.y);
          }
          this.setParticle();
          this.isMoving = false;
          act && cc.tween(this.node).then(act).call(function() {
            DataManager_1.default.instance.carExitNum += 1;
            StaticInstance_1.StaticInstance.gameManager.onGameCheck();
            _this.node.removeFromParent();
          }).start();
          this.scheduleOnce(function() {
            _this.resetStatus();
          });
        }
      };
      Car.prototype.resetStatus = function() {
        DataManager_1.default.instance.currentCar = null;
        this.touchPos = null;
        this.touchSlideDir = cc.v2(0, 0);
      };
      __decorate([ property({
        type: cc.Enum({
          up: 0,
          right: 1,
          down: 2,
          left: 3
        }),
        tooltip: "\u671d\u5411"
      }) ], Car.prototype, "dir", void 0);
      Car = __decorate([ ccclass ], Car);
      return Car;
    }(cc.Component);
    exports.default = Car;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../StaticInstance": "StaticInstance",
    "../Utils": "Utils",
    "../manager/AudioManager": "AudioManager",
    "../manager/DataManager": "DataManager",
    "../manager/EffectManager": "EffectManager",
    "../manager/ResourceManager": "ResourceManager"
  } ],
  Car: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "68b0cWziipJo5Sh2JsVWSwv", "Car");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enum_1 = require("../Enum");
    var StaticInstance_1 = require("../StaticInstance");
    var Utils_1 = require("../Utils");
    var AudioManager_1 = require("../manager/AudioManager");
    var DataManager_1 = require("../manager/DataManager");
    var EffectManager_1 = require("../manager/EffectManager");
    var ResourceManager_1 = require("../manager/ResourceManager");
    var ToastManager_1 = require("../manager/ToastManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CAR_RESOUCE_PREFIX = [ "car_black_", "car_blue_", "car_green_", "car_yellow_", "car_red_" ];
    var Car = function(_super) {
      __extends(Car, _super);
      function Car() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.dir = 0;
        _this.speed = 1e3;
        _this.speedExit = 600;
        _this.touchPos = null;
        _this.touchSlideDis = 3;
        _this.touchSlideDir = cc.v2(0, 0);
        _this.isMoving = false;
        _this.isOpacity = false;
        _this.opacityCount = 0;
        _this.isExiting = false;
        return _this;
      }
      Car_1 = Car;
      Car.prototype.onLoad = function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchOver, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchOver, this);
      };
      Car.prototype.setDir = function(dir) {
        this.dir = dir;
      };
      Car.prototype.setSprite = function(dir) {
        var name = "" + (CAR_RESOUCE_PREFIX[Utils_1.random(0, 4)] + dir);
        this.node.getChildByName("body").getComponent(cc.Sprite).spriteFrame = ResourceManager_1.default.instance.getSprite(name);
      };
      Car.prototype.setCollider = function() {
        var collider = this.node.getComponent(cc.BoxCollider);
        var size = new cc.Size(this.node.width - 10, this.node.height - 10);
        collider.size = size;
      };
      Car.prototype.setParticle = function() {
        var collect = this.node.getChildByName("collect");
        collect && collect.getComponent(cc.ParticleSystem).resetSystem();
      };
      Car.prototype.onTouchStart = function(e) {
        if (DataManager_1.default.instance.isSkillRuning) return;
        var location = e.getLocation();
        var touchPos = this.node.parent.convertToNodeSpaceAR(location);
        if (DataManager_1.default.instance.isSkilling) {
          var carComponent_1 = this;
          var carNode_1 = this.node;
          if (0 != DataManager_1.default.instance.skillIndex || this.isMoving) if (1 != DataManager_1.default.instance.skillIndex || this.isMoving || this.isOpacity || 0 != this.opacityCount) {
            if (2 == DataManager_1.default.instance.skillIndex && !this.isMoving) {
              AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.SKILL);
              cc.tween(carNode_1).to(.3, {
                scale: .1
              }).call(function() {
                carNode_1.removeFromParent();
                DataManager_1.default.instance.isSkillRuning = false;
                DataManager_1.default.instance.isSkilling = false;
                StaticInstance_1.StaticInstance.uiManager.setMainSkillTip();
                DataManager_1.default.instance.carExitNum += 1;
                if (DataManager_1.default.instance.carNum - DataManager_1.default.instance.carExitNum == 1) {
                  var carOne = StaticInstance_1.StaticInstance.gameManager.board.children.find(function(node) {
                    return node.name.indexOf("Car") >= 0;
                  });
                  if (carOne && carOne.getComponent(Car_1).isOpacity) {
                    carOne.getComponent(Car_1).isOpacity = false;
                    carOne.getComponent(Car_1).opacityCount = 0;
                    cc.tween(carOne).to(.1, {
                      opacity: 255
                    }).start();
                  }
                }
                StaticInstance_1.StaticInstance.gameManager.onGameCheck();
              }).start();
            }
          } else {
            if (DataManager_1.default.instance.carNum - DataManager_1.default.instance.carExitNum == 1) {
              ToastManager_1.default.instance.show("\u8f66\u8f86\u5df2\u7ecf\u5269\u4e0b\u6700\u540e\u4e00\u8f86\u4e86\uff01\uff01\uff01", {
                gravity: "TOP",
                bg_color: cc.color(226, 69, 109, 255)
              });
              return;
            }
            AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.SKILL);
            cc.tween(carNode_1).to(.3, {
              opacity: 100
            }).call(function() {
              carComponent_1.isOpacity = true;
              DataManager_1.default.instance.isSkillRuning = false;
              DataManager_1.default.instance.isSkilling = false;
              StaticInstance_1.StaticInstance.uiManager.setMainSkillTip();
            }).start();
          } else {
            var unit = DataManager_1.LEVEL_DATA[DataManager_1.default.instance.level - 1].unit;
            var size = carNode_1.width;
            0 != carComponent_1.dir && 2 != carComponent_1.dir || (size = carNode_1.height);
            if (size <= 2 * unit) ToastManager_1.default.instance.show("\u8f66\u8f86\u5df2\u7ecf\u662f\u6700\u77ed\u72b6\u6001\uff01\uff01\uff01", {
              gravity: "TOP",
              bg_color: cc.color(226, 69, 109, 255)
            }); else {
              AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.SKILL);
              DataManager_1.default.instance.isSkillRuning = true;
              0 == carComponent_1.dir || 2 == carComponent_1.dir ? cc.tween(carNode_1).to(.3, {
                height: carNode_1.height - unit
              }).call(function() {
                carComponent_1.setCollider();
                DataManager_1.default.instance.isSkillRuning = false;
                DataManager_1.default.instance.isSkilling = false;
                StaticInstance_1.StaticInstance.uiManager.setMainSkillTip();
              }).start() : cc.tween(carNode_1).to(.3, {
                width: carNode_1.width - unit
              }).call(function() {
                carComponent_1.setCollider();
                DataManager_1.default.instance.isSkillRuning = false;
                DataManager_1.default.instance.isSkilling = false;
                StaticInstance_1.StaticInstance.uiManager.setMainSkillTip();
              }).start();
            }
          }
          return;
        }
        if (this.isMoving || this.touchPos || this.isOpacity) return;
        this.touchPos = touchPos;
        DataManager_1.default.instance.mode == Enum_1.ENUM_GAME_MODE.TIMER && (DataManager_1.default.instance.isTimerStart || StaticInstance_1.StaticInstance.uiManager.setMainTimer());
      };
      Car.prototype.onTouchMove = function(e) {
        if (this.isMoving) return;
        if (this.touchPos) {
          var location = e.getLocation();
          var touchPos = this.node.parent.convertToNodeSpaceAR(location);
          var dis = Utils_1.getDistance(this.touchPos, touchPos);
          if (dis >= this.touchSlideDis) {
            var angle = Math.abs(Utils_1.getAngle(this.touchPos, touchPos));
            if (angle > 45 && angle < 135) {
              this.touchSlideDir.x = 0;
              this.touchPos.y - touchPos.y > 0 ? this.touchSlideDir.y = -1 : this.touchSlideDir.y = 1;
            } else {
              this.touchSlideDir.y = 0;
              this.touchPos.x - touchPos.x < 0 ? this.touchSlideDir.x = 1 : this.touchSlideDir.x = -1;
            }
          }
        }
      };
      Car.prototype.onTouchOver = function() {
        if (this.isMoving || !this.touchPos) return;
        if (this.touchSlideDir.x || this.touchSlideDir.y) if (this.touchSlideDir.x && (1 == this.dir || 3 == this.dir) || this.touchSlideDir.y && (0 == this.dir || 2 == this.dir)) {
          this.isMoving = true;
          var tip = this.node.getChildByName("tip");
          tip && (tip.active = false);
          DataManager_1.default.instance.zIndex += 1;
          this.node.zIndex = DataManager_1.default.instance.zIndex;
        } else {
          AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.BI);
          this.resetStatus();
        } else {
          AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.BIBI);
          this.resetStatus();
        }
      };
      Car.prototype.update = function(dt) {
        if (this.isMoving) {
          this.node.x += this.speed * this.touchSlideDir.x * dt;
          this.node.y += this.speed * this.touchSlideDir.y * dt;
        }
      };
      Car.prototype.onCollisionEnter = function(other, self) {
        var _this = this;
        if (other.tag == Enum_1.ENUM_COLLIDER_TYPE.EXIT) {
          this.isExiting = true;
          AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.Exit);
          var _a = this.touchSlideDir, x = _a.x, y = _a.y;
          var _b = cc.winSize, swidth = _b.width, sheight = _b.height;
          var act = null;
          if (x) {
            var angle = -90;
            (1 == this.dir && 1 == x || 3 == this.dir && -1 == x) && (angle = 90);
            this.node.angle += angle;
            this.touchSlideDir.x = 0;
            this.node.x = other.node.x + (other.node.width + self.node.height) / 2 * x + other.offset.x;
            var p = Utils_1.toXY(this.node, StaticInstance_1.StaticInstance.gameManager.stage);
            var dis = 0;
            dis = x > 0 ? Math.abs(sheight / 2 - p.y) + this.node.height / 2 : Math.abs(-sheight / 2 - p.y) + this.node.height / 2;
            var mtime = dis / this.speedExit;
            act = cc.moveTo(mtime, this.node.x, this.node.y + dis * x);
          } else {
            var angle = -90;
            (2 == this.dir && 1 == y || 0 == this.dir && -1 == y) && (angle = 90);
            this.node.angle += angle;
            this.touchSlideDir.y = 0;
            this.node.y = other.node.y + (other.node.height + self.node.width) / 2 * y + other.offset.y;
            var p = Utils_1.toXY(this.node, StaticInstance_1.StaticInstance.gameManager.stage);
            var dis = 0;
            dis = y > 0 ? Math.abs(swidth / 2 - p.x) + this.node.width / 2 : Math.abs(-swidth / 2 - p.x) + this.node.width / 2;
            var mtime = dis / this.speedExit;
            act = cc.moveTo(mtime, this.node.x + dis * y, this.node.y);
          }
          this.setParticle();
          act && cc.tween(this.node).then(act).call(function() {
            DataManager_1.default.instance.carExitNum += 1;
            if (DataManager_1.default.instance.carNum - DataManager_1.default.instance.carExitNum == 1) {
              var carOne = StaticInstance_1.StaticInstance.gameManager.board.children.find(function(node) {
                return node.name.indexOf("Car") >= 0;
              });
              if (carOne && carOne.getComponent(Car_1).isOpacity) {
                carOne.getComponent(Car_1).isOpacity = false;
                carOne.getComponent(Car_1).opacityCount = 0;
                cc.tween(carOne).to(.1, {
                  opacity: 255
                }).start();
              }
            }
            StaticInstance_1.StaticInstance.gameManager.onGameCheck();
            _this.node.removeFromParent();
          }).start();
        } else if (other.tag == Enum_1.ENUM_COLLIDER_TYPE.BLOCK) {
          this.isMoving = false;
          AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CRASH);
          if (!DataManager_1.default.instance.isShaking) {
            DataManager_1.default.instance.isShaking = true;
            EffectManager_1.default.instance.shake(StaticInstance_1.StaticInstance.gameManager.roads, .1, function() {
              DataManager_1.default.instance.isShaking = false;
            }, false);
          }
          if (DataManager_1.default.instance.mode == Enum_1.ENUM_GAME_MODE.LEVEL) {
            DataManager_1.default.instance.crashCurrent += 1;
            StaticInstance_1.StaticInstance.uiManager.setMainLevelCrash();
            StaticInstance_1.StaticInstance.gameManager.onGameCheck();
          }
          var _c = this.touchSlideDir, x = _c.x, y = _c.y;
          var crashPos = cc.v2(0, 0);
          if (x) {
            this.touchSlideDir.x = 0;
            this.node.x = other.node.x + (other.node.width + self.node.width) / 2 * -x;
            crashPos = cc.v2(this.node.width / 2 * x, 0);
          } else {
            this.touchSlideDir.y = 0;
            this.node.y = other.node.y + (other.node.height + self.node.height) / 2 * -y;
            crashPos = cc.v2(0, this.node.height / 2 * y);
          }
          EffectManager_1.default.instance.play("Bomb", this.node, {
            pos: crashPos
          });
          if (DataManager_1.default.instance.mode == Enum_1.ENUM_GAME_MODE.TIMER) {
            EffectManager_1.default.instance.play("TimeTip", this.node);
            DataManager_1.default.instance.seconds += 5;
            StaticInstance_1.StaticInstance.uiManager.setMainTimerRendor();
          }
          this.resetStatus();
        } else if (other.tag == Enum_1.ENUM_COLLIDER_TYPE.CAR) {
          var selfComponent = self.node.getComponent(Car_1);
          var otherComponent = other.node.getComponent(Car_1);
          if (selfComponent.isExiting || otherComponent.isExiting) return;
          if (selfComponent.isMoving && otherComponent.isMoving) {
            selfComponent.isMoving = false;
            otherComponent.isMoving = false;
            AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CRASH);
            if (!DataManager_1.default.instance.isShaking) {
              DataManager_1.default.instance.isShaking = true;
              EffectManager_1.default.instance.shake(StaticInstance_1.StaticInstance.gameManager.roads, .1, function() {
                DataManager_1.default.instance.isShaking = false;
              }, false);
            }
            if (DataManager_1.default.instance.mode == Enum_1.ENUM_GAME_MODE.LEVEL) {
              DataManager_1.default.instance.crashCurrent += 1;
              StaticInstance_1.StaticInstance.uiManager.setMainLevelCrash();
              StaticInstance_1.StaticInstance.gameManager.onGameCheck();
            }
            var otherAabb = other.world.aabb;
            var otherPreAabb = other.world.preAabb.clone();
            var selfAabb = self.world.aabb;
            var selfPreAabb = self.world.preAabb.clone();
            otherPreAabb.x = otherAabb.x;
            selfPreAabb.x = selfAabb.x;
            if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
              var _self = null, _other = null;
              if (1 == selfComponent.dir || 3 == selfComponent.dir) {
                _self = selfComponent;
                _other = otherComponent;
              } else {
                _self = otherComponent;
                _other = selfComponent;
              }
              var x = _self.touchSlideDir.x;
              var crashPos = cc.v2(0, 0);
              _self.touchSlideDir.x = 0;
              _self.node.x = _other.node.x + (_other.node.width + _self.node.width) / 2 * -x;
              crashPos = cc.v2(_self.node.width / 2 * x, 0);
              EffectManager_1.default.instance.play("Bomb", _self.node, {
                pos: crashPos
              });
              if (DataManager_1.default.instance.mode == Enum_1.ENUM_GAME_MODE.TIMER) {
                EffectManager_1.default.instance.play("TimeTip", _self.node);
                DataManager_1.default.instance.seconds += 5;
                StaticInstance_1.StaticInstance.uiManager.setMainTimerRendor();
              }
              selfComponent.resetStatus();
              otherComponent.resetStatus();
              return;
            }
            selfPreAabb.y = selfAabb.y;
            otherPreAabb.y = otherAabb.y;
            if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
              var _self = null, _other = null;
              if (0 == selfComponent.dir || 2 == selfComponent.dir) {
                _self = selfComponent;
                _other = otherComponent;
              } else {
                _self = otherComponent;
                _other = selfComponent;
              }
              var y = _self.touchSlideDir.y;
              var crashPos = cc.v2(0, 0);
              _self.touchSlideDir.y = 0;
              _self.node.y = _other.node.y + (_other.node.height + _self.node.height) / 2 * -y;
              crashPos = cc.v2(0, _self.node.height / 2 * y);
              EffectManager_1.default.instance.play("Bomb", _self.node, {
                pos: crashPos
              });
              if (DataManager_1.default.instance.mode == Enum_1.ENUM_GAME_MODE.TIMER) {
                EffectManager_1.default.instance.play("TimeTip", _self.node);
                DataManager_1.default.instance.seconds += 5;
                StaticInstance_1.StaticInstance.uiManager.setMainTimerRendor();
              }
              selfComponent.resetStatus();
              otherComponent.resetStatus();
            }
          } else if (this.isMoving) if (otherComponent.isOpacity) {
            selfComponent.opacityCount += 1;
            otherComponent.opacityCount += 1;
          } else {
            this.isMoving = false;
            AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CRASH);
            if (!DataManager_1.default.instance.isShaking) {
              DataManager_1.default.instance.isShaking = true;
              EffectManager_1.default.instance.shake(StaticInstance_1.StaticInstance.gameManager.roads, .1, function() {
                DataManager_1.default.instance.isShaking = false;
              }, false);
            }
            if (DataManager_1.default.instance.mode == Enum_1.ENUM_GAME_MODE.LEVEL) {
              DataManager_1.default.instance.crashCurrent += 1;
              StaticInstance_1.StaticInstance.uiManager.setMainLevelCrash();
              StaticInstance_1.StaticInstance.gameManager.onGameCheck();
            }
            var _d = this.touchSlideDir, x = _d.x, y = _d.y;
            var crashPos = cc.v2(0, 0);
            if (x) {
              this.touchSlideDir.x = 0;
              this.node.x = other.node.x + (other.node.width + self.node.width) / 2 * -x;
              crashPos = cc.v2(this.node.width / 2 * x, 0);
            } else {
              this.touchSlideDir.y = 0;
              this.node.y = other.node.y + (other.node.height + self.node.height) / 2 * -y;
              crashPos = cc.v2(0, this.node.height / 2 * y);
            }
            EffectManager_1.default.instance.play("Bomb", this.node, {
              pos: crashPos
            });
            if (DataManager_1.default.instance.mode == Enum_1.ENUM_GAME_MODE.TIMER) {
              EffectManager_1.default.instance.play("TimeTip", this.node);
              DataManager_1.default.instance.seconds += 5;
              StaticInstance_1.StaticInstance.uiManager.setMainTimerRendor();
            }
            this.resetStatus();
          }
        }
        return;
      };
      Car.prototype.onCollisionExit = function(other, self) {
        var selfComponent = self.node.getComponent(Car_1);
        var otherComponent = other.node.getComponent(Car_1);
        var otherNode = other.node;
        if (otherComponent && otherComponent.isOpacity) {
          selfComponent.opacityCount -= 1;
          otherComponent.opacityCount -= 1;
          if (otherComponent.opacityCount <= 0) {
            otherComponent.isOpacity = false;
            otherComponent.opacityCount = 0;
            cc.tween(otherNode).to(.1, {
              opacity: 255
            }).start();
          }
        }
      };
      Car.prototype.resetStatus = function() {
        this.touchPos = null;
        this.touchSlideDir = cc.v2(0, 0);
      };
      var Car_1;
      __decorate([ property({
        type: cc.Enum({
          up: 0,
          right: 1,
          down: 2,
          left: 3
        }),
        tooltip: "\u671d\u5411"
      }) ], Car.prototype, "dir", void 0);
      Car = Car_1 = __decorate([ ccclass ], Car);
      return Car;
    }(cc.Component);
    exports.default = Car;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../StaticInstance": "StaticInstance",
    "../Utils": "Utils",
    "../manager/AudioManager": "AudioManager",
    "../manager/DataManager": "DataManager",
    "../manager/EffectManager": "EffectManager",
    "../manager/ResourceManager": "ResourceManager",
    "../manager/ToastManager": "ToastManager"
  } ],
  Config: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b993eUTXXRAirf4vt3tdpwt", "Config");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.config = void 0;
    var protool = "https:";
    var host = "t.me/birds_li_bot?game=ggg";
    exports.config = {
      backendUrl: "http://18.136.79.134:3000",
      URL_YOU_ASSIGNED_TO_YOUR_APP: protool + "://" + host
    };
    cc._RF.pop();
  }, {} ],
  DataManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "730a3DszhpGB4lxakYD51PT", "DataManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CLEVEL_Data = exports.LEVEL_DATA = void 0;
    var Enum_1 = require("../Enum");
    var Languages_1 = require("../Languages");
    var STORAGE_KEY = "CC_CAR_MOVE";
    exports.LEVEL_DATA = [ {
      level: 1,
      width: 490,
      height: 490,
      unit: 70,
      cars: 4
    }, {
      level: 2,
      width: 550,
      height: 600,
      unit: 50,
      cars: -1
    }, {
      level: 3,
      width: 600,
      height: 900,
      unit: 50,
      cars: -1
    } ];
    exports.CLEVEL_Data = [ {
      level: 1,
      width: 490,
      height: 490,
      unit: 70,
      cars: 1,
      crash: 3
    }, {
      level: 2,
      width: 490,
      height: 490,
      unit: 70,
      cars: 1,
      crash: 4
    }, {
      level: 3,
      width: 490,
      height: 490,
      unit: 70,
      cars: 1,
      crash: 4
    }, {
      level: 4,
      width: 490,
      height: 490,
      unit: 70,
      cars: 1,
      crash: 5
    }, {
      level: 5,
      width: 550,
      height: 600,
      unit: 50,
      cars: -1,
      crash: 8
    }, {
      level: 6,
      width: 490,
      height: 490,
      unit: 70,
      cars: 1,
      crash: 7
    }, {
      level: 7,
      width: 550,
      height: 600,
      unit: 50,
      cars: -1,
      crash: 5
    }, {
      level: 8,
      width: 490,
      height: 490,
      unit: 70,
      cars: 1,
      crash: 9
    }, {
      level: 9,
      width: 490,
      height: 490,
      unit: 70,
      cars: 1,
      crash: 7
    }, {
      level: 10,
      width: 600,
      height: 900,
      unit: 50,
      cars: -1,
      crash: -1
    } ];
    var DataManager = function() {
      function DataManager() {
        this.language = Languages_1.LanguageType.EN;
        this.mode = Enum_1.ENUM_GAME_MODE.TIMER;
        this.status = Enum_1.ENUM_GAME_STATUS.UNRUNING;
        this.loadingRate = 0;
        this._isMusicOn = true;
        this._isSoundOn = true;
        this.games = [ {
          title: "\u6d88\u706d\u661f\u661f",
          icon: "xiao2d",
          appid: "wxefd5a4ddd8e31b44",
          url: "https://store.cocos.com/app/detail/4183"
        }, {
          title: "\u5b9e\u51b5\u8db3\u7403\u676f",
          icon: "football",
          appid: "wx0c16e9d7f9e87dac",
          url: "https://store.cocos.com/app/detail/4221"
        }, {
          title: "\u722c\u4e86\u4e2a\u722c",
          icon: "stairway",
          appid: "wx025bcf3a316bfa27",
          url: "https://store.cocos.com/app/detail/4314"
        }, {
          title: "\u54a9\u4e86\u4e2a\u54a93D",
          icon: "xiao3d",
          appid: "wx5841e5a26082b380",
          url: "https://store.cocos.com/app/detail/4148"
        }, {
          title: "\u7ecf\u5178\u6ce1\u6ce1\u9f99",
          icon: "bubble",
          appid: "wxcc2f90afdf28ae3b",
          url: "https://store.cocos.com/app/detail/4370"
        } ];
        this.level = 1;
        this.levelMax = 1;
        this.levelData = null;
        this.clevel = 1;
        this.clevelMax = 1;
        this.power = 5;
        this.powerCollectByVideo = 1;
        this.lastPowerRefreshTime = 0;
        this.powerRefreshTime = 60;
        this.lastPowerUpdateTime = 0;
        this.keys = 5;
        this.keysCollectByVideo = 1;
        this.currentCar = null;
        this.isShaking = false;
        this.carNum = 0;
        this.carExitNum = 0;
        this.seconds = 0;
        this.secondsRecord = 604800;
        this.isTimerStart = false;
        this.skillIndex = -1;
        this.isSkilling = false;
        this.isSkillRuning = false;
        this.zIndex = 0;
        this.crashTotal = 0;
        this.crashCurrent = 0;
      }
      DataManager.getInstance = function() {
        null === this._instance && (this._instance = new this());
        return this._instance;
      };
      Object.defineProperty(DataManager, "instance", {
        get: function() {
          return this.getInstance();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(DataManager.prototype, "isMusicOn", {
        get: function() {
          return this._isMusicOn;
        },
        set: function(data) {
          this._isMusicOn = data;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(DataManager.prototype, "isSoundOn", {
        get: function() {
          return this._isSoundOn;
        },
        set: function(data) {
          this._isSoundOn = data;
        },
        enumerable: false,
        configurable: true
      });
      DataManager.prototype.reset = function() {
        this.status = Enum_1.ENUM_GAME_STATUS.UNRUNING;
        this.currentCar = null;
        this.carNum = 0;
        this.carExitNum = 0;
        this.skillIndex = -1;
        this.isSkilling = false;
        this.isSkillRuning = false;
        this.zIndex = 0;
        this.crashTotal = 0;
        this.crashCurrent = 0;
      };
      DataManager.prototype.save = function() {
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
          levelData: this.levelData
        }));
      };
      DataManager.prototype.restore = function() {
        var _data = cc.sys.localStorage.getItem(STORAGE_KEY);
        try {
          var data = JSON.parse(_data);
          this.isMusicOn = false !== (null === data || void 0 === data ? void 0 : data.isMusicOn);
          this.isSoundOn = false !== (null === data || void 0 === data ? void 0 : data.isSoundOn);
          this.keys = "number" == typeof data.keys ? data.keys : 5;
          this.power = "number" == typeof data.power ? data.power : 5;
          this.lastPowerRefreshTime = "number" == typeof data.lastPowerRefreshTime ? data.lastPowerRefreshTime : 0;
          this.lastPowerUpdateTime = "number" == typeof data.lastPowerUpdateTime ? data.lastPowerUpdateTime : 0;
          this.secondsRecord = "number" == typeof data.secondsRecord ? data.secondsRecord : 604800;
          this.clevel = "number" == typeof data.clevel ? data.clevel : 1;
          this.clevelMax = "number" == typeof data.clevelMax ? data.clevelMax : 1;
          if (data.levelData) this.levelData = data.levelData; else {
            this.levelData = [];
            for (var i = 0; i < exports.LEVEL_DATA.length; i++) this.levelData.push({
              level: i + 1,
              star: 0
            });
          }
        } catch (_a) {
          this.isMusicOn = true;
          this.isSoundOn = true;
          this.keys = 5;
          this.power = 5;
          this.lastPowerRefreshTime = 0;
          this.lastPowerUpdateTime = 0;
          this.secondsRecord = 604800;
          this.clevel = 1;
          this.clevelMax = 1;
          this.levelData = [];
          for (var i = 0; i < exports.LEVEL_DATA.length; i++) this.levelData.push({
            level: i + 1,
            star: 0
          });
        }
      };
      DataManager._instance = null;
      return DataManager;
    }();
    exports.default = DataManager;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../Languages": "Languages"
  } ],
  EffectManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "def54s79C1DBq7aJq3x4CWS", "EffectManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PoolManager_1 = require("./PoolManager");
    var EffectManager = function() {
      function EffectManager() {}
      Object.defineProperty(EffectManager, "instance", {
        get: function() {
          null == this._instance && (this._instance = new EffectManager());
          return this._instance;
        },
        enumerable: false,
        configurable: true
      });
      EffectManager.prototype.play = function(effect, parent, options) {
        var effNode = PoolManager_1.default.instance.getNode("" + effect, parent);
        options && options.pos && effNode.setPosition(options.pos);
        if (effNode.getComponent(cc.Animation)) {
          var anim = effNode.getComponent(cc.Animation);
          anim.on("finished", function() {
            effNode.removeFromParent();
          });
          anim.play();
        } else effNode.getComponent(cc.ParticleSystem) && effNode.getComponent(cc.ParticleSystem).resetSystem();
      };
      EffectManager.prototype.shake = function(targetNode, duration, cb, once) {
        void 0 === once && (once = true);
        var onceNodeShake = function(targetNode, duration, cb, once) {
          var nodeStartPos = targetNode.getPosition();
          var onceDuration = .02;
          var maxNum = 10;
          var minNum = -10;
          cc.Tween.stopAllByTarget(targetNode);
          var randomX = [];
          var randomY = [];
          for (var i = 0; i < 8; i++) {
            var random1 = Math.round(Math.random() * (minNum - maxNum)) + maxNum;
            randomX.push(random1 + nodeStartPos.x);
            var random2 = Math.round(Math.random() * (minNum - maxNum)) + maxNum;
            randomY.push(random2 + nodeStartPos.y);
          }
          cc.tween(targetNode).sequence(cc.tween().to(onceDuration, {
            position: cc.v3(randomX[0], randomY[0], 0)
          }), cc.tween().to(onceDuration, {
            position: cc.v3(randomX[1], randomY[1], 0)
          }), cc.tween().to(onceDuration, {
            position: cc.v3(randomX[2], randomY[2], 0)
          }), cc.tween().to(onceDuration, {
            position: cc.v3(randomX[3], randomY[3], 0)
          }), cc.tween().to(onceDuration, {
            position: cc.v3(randomX[4], randomY[4], 0)
          }), cc.tween().to(onceDuration, {
            position: cc.v3(randomX[5], randomY[5], 0)
          }), cc.tween().to(onceDuration, {
            position: cc.v3(randomX[6], randomY[6], 0)
          }), cc.tween().to(onceDuration, {
            position: cc.v3(randomX[7], randomY[7], 0)
          })).repeatForever().start();
          return new Promise(function(resolve, reject) {
            setTimeout(function() {
              cc.Tween.stopAllByTarget(targetNode);
              targetNode.setPosition(nodeStartPos.x, nodeStartPos.y);
              once ? resolve() : cb && cb();
            }, 1e3 * duration);
          });
        };
        if (targetNode instanceof Array) if (once) {
          var tweens = [];
          for (var i = 0; i < targetNode.length; i++) {
            var tween = onceNodeShake(targetNode[i], duration, cb, once);
            tweens.push(tween);
          }
          Promise.all(tweens).then(function() {
            return cb && cb();
          });
        } else targetNode.forEach(function(node) {
          return onceNodeShake(node, duration, cb, once);
        }); else onceNodeShake(targetNode, duration, cb, once);
      };
      EffectManager._instance = null;
      return EffectManager;
    }();
    exports.default = EffectManager;
    cc._RF.pop();
  }, {
    "./PoolManager": "PoolManager"
  } ],
  Enum: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "50f2e0oDptJt4SjWGm8di2L", "Enum");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ENUM_RESOURCE_TYPE = exports.ENUM_GAME_EVENT = exports.ENUM_COLLIDER_TYPE = exports.ENUM_UI_TYPE = exports.ENUM_AUDIO_CLIP = exports.ENUM_GAME_STATUS = exports.ENUM_GAME_MODE = void 0;
    var ENUM_GAME_MODE;
    (function(ENUM_GAME_MODE) {
      ENUM_GAME_MODE["TIMER"] = "TIMER";
      ENUM_GAME_MODE["LEVEL"] = "LEVEL";
    })(ENUM_GAME_MODE = exports.ENUM_GAME_MODE || (exports.ENUM_GAME_MODE = {}));
    var ENUM_GAME_STATUS;
    (function(ENUM_GAME_STATUS) {
      ENUM_GAME_STATUS["UNRUNING"] = "UNRUNING";
      ENUM_GAME_STATUS["RUNING"] = "RUNING";
    })(ENUM_GAME_STATUS = exports.ENUM_GAME_STATUS || (exports.ENUM_GAME_STATUS = {}));
    var ENUM_AUDIO_CLIP;
    (function(ENUM_AUDIO_CLIP) {
      ENUM_AUDIO_CLIP["BGM"] = "bgm";
      ENUM_AUDIO_CLIP["CLICK"] = "click";
      ENUM_AUDIO_CLIP["Exit"] = "exit";
      ENUM_AUDIO_CLIP["CRASH"] = "crash";
      ENUM_AUDIO_CLIP["BIBI"] = "bibi";
      ENUM_AUDIO_CLIP["BI"] = "bi";
      ENUM_AUDIO_CLIP["READY"] = "ready";
      ENUM_AUDIO_CLIP["LOSE"] = "lose";
      ENUM_AUDIO_CLIP["WIN"] = "win";
      ENUM_AUDIO_CLIP["GET_COIN"] = "get_coin";
      ENUM_AUDIO_CLIP["GET_MONEY"] = "get_money";
      ENUM_AUDIO_CLIP["SKILL"] = "skill";
      ENUM_AUDIO_CLIP["PASS"] = "pass";
    })(ENUM_AUDIO_CLIP = exports.ENUM_AUDIO_CLIP || (exports.ENUM_AUDIO_CLIP = {}));
    var ENUM_UI_TYPE;
    (function(ENUM_UI_TYPE) {
      ENUM_UI_TYPE["MENU"] = "MenuLayer";
      ENUM_UI_TYPE["MAIN"] = "MainLayer";
      ENUM_UI_TYPE["EXIT"] = "ExitLayer";
      ENUM_UI_TYPE["OVER"] = "OverLayer";
      ENUM_UI_TYPE["MORE"] = "MoreLayer";
      ENUM_UI_TYPE["RANK"] = "RankLayer";
      ENUM_UI_TYPE["SKILL_SUBMIT"] = "SkillSubmitLayer";
      ENUM_UI_TYPE["MAIN_LEVEL"] = "MainLevelLayer";
      ENUM_UI_TYPE["TASK"] = "TaskLayer";
      ENUM_UI_TYPE["SHOP"] = "ShopLayer";
      ENUM_UI_TYPE["SHARE"] = "ShareLayer";
      ENUM_UI_TYPE["LEVEL_UI"] = "LevelUILayer";
      ENUM_UI_TYPE["LEVEL_SELECT"] = "LevelSelectLayer";
      ENUM_UI_TYPE["EXIT_LEVEL"] = "ExitLevelLayer";
      ENUM_UI_TYPE["SETTING"] = "SettingLayer";
      ENUM_UI_TYPE["LOSE"] = "LoseLayer";
      ENUM_UI_TYPE["WIN"] = "WinLayer";
    })(ENUM_UI_TYPE = exports.ENUM_UI_TYPE || (exports.ENUM_UI_TYPE = {}));
    var ENUM_COLLIDER_TYPE;
    (function(ENUM_COLLIDER_TYPE) {
      ENUM_COLLIDER_TYPE[ENUM_COLLIDER_TYPE["CAR"] = 0] = "CAR";
      ENUM_COLLIDER_TYPE[ENUM_COLLIDER_TYPE["BLOCK"] = 1] = "BLOCK";
      ENUM_COLLIDER_TYPE[ENUM_COLLIDER_TYPE["EXIT"] = 2] = "EXIT";
    })(ENUM_COLLIDER_TYPE = exports.ENUM_COLLIDER_TYPE || (exports.ENUM_COLLIDER_TYPE = {}));
    var ENUM_GAME_EVENT;
    (function(ENUM_GAME_EVENT) {})(ENUM_GAME_EVENT = exports.ENUM_GAME_EVENT || (exports.ENUM_GAME_EVENT = {}));
    exports.ENUM_RESOURCE_TYPE = [ {
      content: cc.AudioClip,
      path: "audio",
      type: "audio",
      ratio: .4
    }, {
      content: cc.Prefab,
      path: "prefab",
      type: "prefab",
      ratio: .3
    }, {
      content: cc.SpriteFrame,
      path: "sprite",
      type: "sprite",
      ratio: .3
    } ];
    cc._RF.pop();
  }, {} ],
  EventManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bcae8q0UKhLAL4D4SoN+gEr", "EventManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.EventType = void 0;
    var EventType;
    (function(EventType) {
      EventType["OPEN_LEVEL_BTN"] = "OPEN_LEVEL_BTN";
      EventType["UPDATE_LANGUAGE"] = "UPDATE_LANGUAGE";
      EventType["GOTO_LEVEL"] = "GOTO_LEVEL";
      EventType["CONNECT_COMPLETE"] = "CONNECT_COMPLETE";
    })(EventType = exports.EventType || (exports.EventType = {}));
    class EventManager {
      constructor() {
        this.eventMap = new Map();
        this.messageMap = new Map();
      }
      static getInstance() {
        null === this._instance && (this._instance = new this());
        return this._instance;
      }
      static get instance() {
        return this.getInstance();
      }
      on(name, event, context) {
        if (this.eventMap.has(name)) {
          const eventArr = this.eventMap.get(name);
          eventArr.push({
            event: event,
            context: context
          });
        } else this.eventMap.set(name, [ {
          event: event,
          context: context
        } ]);
        if (this.messageMap.has(name)) {
          const messages = this.messageMap.get(name);
          messages.forEach(params => {
            context ? event.apply(context, params) : event(params);
          });
          this.messageMap.delete(name);
        }
      }
      off(name, event, context) {
        if (this.eventMap.has(name)) {
          const eventArr = this.eventMap.get(name);
          const index = eventArr.findIndex(item => item.event === event && item.context === context);
          index > -1 && eventArr.splice(index, 1);
        }
      }
      emit(name, ...params) {
        if (this.eventMap.has(name)) {
          const eventArr = this.eventMap.get(name);
          eventArr.forEach(({event: event, context: context}) => {
            context ? event.apply(context, params) : event(params);
          });
        } else {
          const messages = this.messageMap.get(name);
          messages ? messages.push(params) : this.messageMap.set(name, [ params ]);
        }
      }
      clear() {
        this.eventMap.clear();
      }
    }
    exports.default = EventManager;
    EventManager._instance = null;
    cc._RF.pop();
  }, {} ],
  ExitLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "30bdbeLI7FCC6dF2SvgX/Hg", "ExitLayer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enum_1 = require("../Enum");
    var StaticInstance_1 = require("./../StaticInstance");
    var AudioManager_1 = require("../manager/AudioManager");
    var Baselayer_1 = require("./Baselayer");
    var SdkManager_1 = require("../manager/SdkManager");
    var DataManager_1 = require("../manager/DataManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ExitLayer = function(_super) {
      __extends(ExitLayer, _super);
      function ExitLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.panel = null;
        _this.btnSubmit = null;
        _this.btnClose = null;
        return _this;
      }
      ExitLayer.prototype.onLoad = function() {
        this.panel = cc.find("style/panel", this.node);
        this.btnSubmit = cc.find("btn_submit", this.panel);
        this.btnClose = cc.find("btn_close", this.panel);
        this.btnSubmit.on("click", this.onSubmitClick, this);
        this.btnClose.on("click", this.onCloseClick, this);
      };
      ExitLayer.prototype.onDestroy = function() {
        this.btnSubmit.off("click", this.onSubmitClick, this);
        this.btnClose.off("click", this.onCloseClick, this);
      };
      ExitLayer.prototype.onEnable = function() {
        this.zoomIn(this.panel);
        SdkManager_1.default.instance.toggleBannerAd(true);
      };
      ExitLayer.prototype.onDisable = function() {
        SdkManager_1.default.instance.toggleBannerAd(false);
      };
      ExitLayer.prototype.onCloseClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.EXIT, false);
      };
      ExitLayer.prototype.onSubmitClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        StaticInstance_1.StaticInstance.uiManager.setMainTimer(false);
        DataManager_1.default.instance.status = Enum_1.ENUM_GAME_STATUS.UNRUNING;
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.MAIN, false);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.EXIT, false);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.MENU);
      };
      ExitLayer = __decorate([ ccclass ], ExitLayer);
      return ExitLayer;
    }(Baselayer_1.default);
    exports.default = ExitLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../manager/AudioManager": "AudioManager",
    "../manager/DataManager": "DataManager",
    "../manager/SdkManager": "SdkManager",
    "./../StaticInstance": "StaticInstance",
    "./Baselayer": "Baselayer"
  } ],
  ExitLevelLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "37b38cVr71KJpCZXmwmfe7W", "ExitLevelLayer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enum_1 = require("../Enum");
    var StaticInstance_1 = require("./../StaticInstance");
    var AudioManager_1 = require("../manager/AudioManager");
    var SdkManager_1 = require("../manager/SdkManager");
    var DataManager_1 = require("../manager/DataManager");
    var BaseLanguageLayer_1 = require("./BaseLanguageLayer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ExitLevelLayer = function(_super) {
      __extends(ExitLevelLayer, _super);
      function ExitLevelLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.panel = null;
        _this.btnClose = null;
        _this.btnSubmit = null;
        _this.btnRestart = null;
        return _this;
      }
      ExitLevelLayer.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.panel = cc.find("style/panel", this.node);
        this.btnSubmit = cc.find("btn_submit", this.panel);
        this.btnRestart = cc.find("btn_restart", this.panel);
        this.btnClose = cc.find("btn_close", this.panel);
        this.btnSubmit.on("click", this.onSubmitClick, this);
        this.btnRestart.on("click", this.onRestartClick, this);
        this.btnClose.on("click", this.onCloseClick, this);
      };
      ExitLevelLayer.prototype.onDestroy = function() {
        this.btnSubmit.off("click", this.onSubmitClick, this);
        this.btnRestart.off("click", this.onRestartClick, this);
        this.btnClose.off("click", this.onCloseClick, this);
      };
      ExitLevelLayer.prototype.onEnable = function() {
        this.zoomIn(this.panel);
        SdkManager_1.default.instance.toggleBannerAd(true);
      };
      ExitLevelLayer.prototype.onDisable = function() {
        SdkManager_1.default.instance.toggleBannerAd(false);
      };
      ExitLevelLayer.prototype.onCloseClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.EXIT_LEVEL, false);
      };
      ExitLevelLayer.prototype.onSubmitClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        DataManager_1.default.instance.status = Enum_1.ENUM_GAME_STATUS.UNRUNING;
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.MAIN_LEVEL, false);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.EXIT_LEVEL, false);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.MENU);
      };
      ExitLevelLayer.prototype.onRestartClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        StaticInstance_1.StaticInstance.transitionsManager.play(Enum_1.ENUM_UI_TYPE.EXIT_LEVEL, null, function() {
          StaticInstance_1.StaticInstance.gameManager.onGameLevelStart();
        });
      };
      ExitLevelLayer = __decorate([ ccclass ], ExitLevelLayer);
      return ExitLevelLayer;
    }(BaseLanguageLayer_1.default);
    exports.default = ExitLevelLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../manager/AudioManager": "AudioManager",
    "../manager/DataManager": "DataManager",
    "../manager/SdkManager": "SdkManager",
    "./../StaticInstance": "StaticInstance",
    "./BaseLanguageLayer": "BaseLanguageLayer"
  } ],
  GameManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8d970VZoPFL/L9/Lg/KHxlp", "GameManager");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Enum_1 = require("../Enum");
    var StaticInstance_1 = require("../StaticInstance");
    var Board_1 = require("../game/Board");
    var AudioManager_1 = require("./AudioManager");
    var DataManager_1 = require("./DataManager");
    var PoolManager_1 = require("./PoolManager");
    var GameManager = function(_super) {
      __extends(GameManager, _super);
      function GameManager() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.stage = null;
        _this.roads = null;
        _this.board = null;
        return _this;
      }
      GameManager.prototype.onLoad = function() {
        StaticInstance_1.StaticInstance.setGameManager(this);
        this.stage = cc.find("Stage", this.node);
      };
      GameManager.prototype.onDestroy = function() {};
      GameManager.prototype.onGameStart = function() {
        DataManager_1.default.instance.reset();
        DataManager_1.default.instance.level = 1;
        DataManager_1.default.instance.seconds = 0;
        this.initGame();
      };
      GameManager.prototype.onGameLevelStart = function() {
        DataManager_1.default.instance.reset();
        this.initGame();
      };
      GameManager.prototype.onGameCheck = function() {
        if (StaticInstance_1.StaticInstance.uiManager.isActive(Enum_1.ENUM_UI_TYPE.MENU)) return;
        if (DataManager_1.default.instance.mode == Enum_1.ENUM_GAME_MODE.TIMER) {
          if (DataManager_1.default.instance.carNum <= DataManager_1.default.instance.carExitNum) {
            AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.WIN);
            if (DataManager_1.default.instance.level < DataManager_1.default.instance.levelMax) {
              DataManager_1.default.instance.reset();
              DataManager_1.default.instance.level += 1;
              this.initGame();
              StaticInstance_1.StaticInstance.uiManager.setMainTimer(false);
              StaticInstance_1.StaticInstance.uiManager.setMainLevelUpNotice();
            } else {
              DataManager_1.default.instance.status = Enum_1.ENUM_GAME_STATUS.UNRUNING;
              StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.OVER);
            }
          }
        } else if (DataManager_1.default.instance.mode == Enum_1.ENUM_GAME_MODE.LEVEL) if (DataManager_1.default.instance.crashTotal <= DataManager_1.default.instance.crashCurrent) {
          if (StaticInstance_1.StaticInstance.uiManager.isActive(Enum_1.ENUM_UI_TYPE.WIN)) return;
          DataManager_1.default.instance.status = Enum_1.ENUM_GAME_STATUS.UNRUNING;
          AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.LOSE);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LOSE);
        } else if (DataManager_1.default.instance.carNum <= DataManager_1.default.instance.carExitNum) {
          if (StaticInstance_1.StaticInstance.uiManager.isActive(Enum_1.ENUM_UI_TYPE.LOSE)) return;
          DataManager_1.default.instance.status = Enum_1.ENUM_GAME_STATUS.UNRUNING;
          AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.PASS);
          var clevel = DataManager_1.default.instance.clevel + 1;
          clevel = Math.min(clevel, DataManager_1.CLEVEL_Data.length);
          DataManager_1.default.instance.clevel = clevel;
          clevel > DataManager_1.default.instance.clevelMax && (DataManager_1.default.instance.clevelMax = clevel);
          DataManager_1.default.instance.save();
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.WIN);
        }
      };
      GameManager.prototype.initGame = function() {
        DataManager_1.default.instance.status = Enum_1.ENUM_GAME_STATUS.UNRUNING;
        this.stage.removeAllChildren();
        if (DataManager_1.default.instance.mode == Enum_1.ENUM_GAME_MODE.TIMER) {
          var level = PoolManager_1.default.instance.getNode("Level" + DataManager_1.default.instance.level, this.stage);
          this.roads = level.getChildByName("roads");
          this.board = level.getChildByName("board");
          var boardComponent = this.board.getComponent(Board_1.default);
          boardComponent.init();
          DataManager_1.default.instance.status = Enum_1.ENUM_GAME_STATUS.RUNING;
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SKILL_SUBMIT, false);
          StaticInstance_1.StaticInstance.uiManager.setMainSkillTip();
          if (1 == DataManager_1.default.instance.level) {
            StaticInstance_1.StaticInstance.uiManager.setMainTimerRendor();
            AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.READY);
          }
        } else if (DataManager_1.default.instance.mode == Enum_1.ENUM_GAME_MODE.LEVEL) {
          var level = PoolManager_1.default.instance.getNode("CLevel" + DataManager_1.default.instance.clevel, this.stage);
          this.roads = level.getChildByName("roads");
          this.board = level.getChildByName("board");
          var boardComponent = this.board.getComponent(Board_1.default);
          boardComponent.init();
          AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.READY);
          StaticInstance_1.StaticInstance.uiManager.setMainLevelCrash();
          StaticInstance_1.StaticInstance.uiManager.setMainLevelTip();
          DataManager_1.default.instance.status = Enum_1.ENUM_GAME_STATUS.RUNING;
        }
      };
      GameManager = __decorate([ ccclass ], GameManager);
      return GameManager;
    }(cc.Component);
    exports.default = GameManager;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../StaticInstance": "StaticInstance",
    "../game/Board": "Board",
    "./AudioManager": "AudioManager",
    "./DataManager": "DataManager",
    "./PoolManager": "PoolManager"
  } ],
  HeaderLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7ed4ftzh8RJUJJcUByLfjnb", "HeaderLayer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enum_1 = require("../Enum");
    var Utils_1 = require("../Utils");
    var AudioManager_1 = require("../manager/AudioManager");
    var DataManager_1 = require("../manager/DataManager");
    var SdkManager_1 = require("../manager/SdkManager");
    var ToastManager_1 = require("../manager/ToastManager");
    var BaseLanguageLayer_1 = require("./BaseLanguageLayer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HeaderLayer = function(_super) {
      __extends(HeaderLayer, _super);
      function HeaderLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.barPower = null;
        _this.barKey = null;
        _this.timerPower = null;
        return _this;
      }
      HeaderLayer.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.barPower = cc.find("bar/power", this.node);
        this.barKey = cc.find("bar/key", this.node);
        this.timerPower = cc.find("timer", this.barPower);
      };
      HeaderLayer.prototype.rendorPower = function() {
        var _this = this;
        if (!this.barPower) return;
        var num = this.barPower.getChildByName("nums");
        var btn = this.barPower.getChildByName("icon");
        num && (num.getComponent(cc.Label).string = "" + DataManager_1.default.instance.power);
        btn && !btn.hasEventListener("click") && btn.on("click", function() {
          _this.getRewardByVideo("power");
        });
      };
      HeaderLayer.prototype.rendorKeys = function() {
        var _this = this;
        if (!this.barKey) return;
        var num = this.barKey.getChildByName("nums");
        var btn = this.barKey.getChildByName("icon");
        num && (num.getComponent(cc.Label).string = "" + DataManager_1.default.instance.keys);
        btn && !btn.hasEventListener("click") && btn.on("click", function() {
          _this.getRewardByVideo("keys");
        });
      };
      HeaderLayer.prototype.getRewardByVideo = function(type) {
        var _this = this;
        void 0 === type && (type = "keys");
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        SdkManager_1.default.instance.showVideoAd(function(msg) {
          SdkManager_1.default.instance.getPlatform() || ToastManager_1.default.instance.show(msg, {
            gravity: "BOTTOM",
            bg_color: cc.color(102, 202, 28, 255)
          });
          if ("keys" == type) {
            AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.GET_MONEY);
            DataManager_1.default.instance.keys += DataManager_1.default.instance.keysCollectByVideo;
            DataManager_1.default.instance.save();
            _this.rendorKeys();
          } else {
            AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.GET_MONEY);
            DataManager_1.default.instance.power += DataManager_1.default.instance.powerCollectByVideo;
            DataManager_1.default.instance.save();
            _this.rendorPower();
          }
        }, function(msg) {
          ToastManager_1.default.instance.show(msg, {
            gravity: "BOTTOM",
            bg_color: cc.color(226, 69, 109, 255)
          });
        });
      };
      HeaderLayer.prototype.rendorPowerTimer = function() {
        var _this = this;
        if (!this.timerPower) return;
        this.unscheduleAllCallbacks();
        var isSchedule = true;
        DataManager_1.default.instance.power >= 5 && (isSchedule = false);
        DataManager_1.default.instance.lastPowerRefreshTime > 0 && (isSchedule = true);
        if (isSchedule) {
          var time_1 = DataManager_1.default.instance.powerRefreshTime - DataManager_1.default.instance.lastPowerRefreshTime;
          this.timerPower.getComponent(cc.Label).string = Utils_1.formatSeconds(time_1, "i:s");
          var callback_1 = function() {
            time_1 -= 1;
            if (time_1 <= 0) {
              DataManager_1.default.instance.power += 1;
              _this.rendorPower();
              if (DataManager_1.default.instance.power >= 5) {
                _this.unschedule(callback_1);
                _this.timerPower.getComponent(cc.Label).string = "";
                DataManager_1.default.instance.lastPowerRefreshTime = 0;
              } else {
                time_1 = DataManager_1.default.instance.powerRefreshTime;
                DataManager_1.default.instance.lastPowerRefreshTime = 0;
                _this.timerPower.getComponent(cc.Label).string = Utils_1.formatSeconds(time_1, "i:s");
              }
            } else {
              _this.timerPower.getComponent(cc.Label).string = Utils_1.formatSeconds(time_1, "i:s");
              DataManager_1.default.instance.lastPowerRefreshTime = DataManager_1.default.instance.powerRefreshTime - time_1;
            }
            DataManager_1.default.instance.lastPowerUpdateTime = new Date().getTime();
            DataManager_1.default.instance.save();
          };
          this.schedule(callback_1, 1);
        }
      };
      HeaderLayer = __decorate([ ccclass ], HeaderLayer);
      return HeaderLayer;
    }(BaseLanguageLayer_1.default);
    exports.default = HeaderLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../Utils": "Utils",
    "../manager/AudioManager": "AudioManager",
    "../manager/DataManager": "DataManager",
    "../manager/SdkManager": "SdkManager",
    "../manager/ToastManager": "ToastManager",
    "./BaseLanguageLayer": "BaseLanguageLayer"
  } ],
  Index: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bd1a12oV81Cu7bBxEAPpr3S", "Index");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const StaticInstance_1 = require("./StaticInstance");
    const Enum_1 = require("./Enum");
    const AudioManager_1 = require("./manager/AudioManager");
    const DataManager_1 = require("./manager/DataManager");
    const ResourceManager_1 = require("./manager/ResourceManager");
    const SdkManager_1 = require("./manager/SdkManager");
    const EventManager_1 = require("./manager/EventManager");
    const Config_1 = require("./Config");
    const telegram_web_1 = require("./cocos-telegram-miniapps/telegram-web");
    const telegram_ui_1 = require("./cocos-telegram-miniapps/telegram-ui");
    const webton_1 = require("./cocos-telegram-miniapps/webton");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Index = class Index extends cc.Component {
      constructor() {
        super(...arguments);
        this.collisionManagerDebug = false;
        this._bTonInit = false;
      }
      onLoad() {
        this.node.getChildByName("UI").opacity = 255;
        cc.view.setResizeCallback(() => this.responsive());
        this.responsive();
        telegram_web_1.TelegramWebApp.Instance.init().then(res => {
          console.log("telegram web app init : ", res.success);
        }).catch(err => {
          console.error(err);
        });
        this.loadWallet().then(res => {
          if (!res) {
            console.error("load wallet failed!");
            return;
          }
          this._initTonUI();
        }).catch(err => {
          console.error(err);
        });
        webton_1.WebTon.Instance.init().then(res => {
          console.log("web ton init : ", res.success);
        });
        DataManager_1.default.instance.loadingRate = 0;
        const colManager = cc.director.getCollisionManager();
        colManager.enabled = true;
        this.collisionManagerDebug && (colManager.enabledDebugDraw = true);
      }
      _initTonUI() {
        return __awaiter(this, void 0, void 0, function*() {
          telegram_ui_1.TonConnectUi.Instance.init("https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json", this._config.tonAddress, "en").then(res => {
            console.log("ton connect ui init : ", res.success);
            telegram_ui_1.TonConnectUi.Instance.subscribeWallet(() => {
              console.log("wallet change");
              EventManager_1.default.instance.emit(EventManager_1.EventType.CONNECT_COMPLETE, res.success);
            });
          });
        });
      }
      isConnected() {
        if (!telegram_ui_1.TonConnectUi.Instance) {
          console.error("ton ui not inited!");
          return false;
        }
        return telegram_ui_1.TonConnectUi.Instance.isConnected();
      }
      openModal() {
        return __awaiter(this, void 0, void 0, function*() {
          if (!telegram_ui_1.TonConnectUi.Instance) return;
          console.log("open modal", this.isConnected());
          telegram_ui_1.TonConnectUi.Instance.isConnected() ? telegram_ui_1.TonConnectUi.Instance.disconnect() : telegram_ui_1.TonConnectUi.Instance.openModal();
        });
      }
      loadWallet() {
        return __awaiter(this, void 0, void 0, function*() {
          try {
            const value = yield fetch(`${Config_1.config.backendUrl}/config`, {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "ngrok-skip-browser-warning": "1"
              },
              method: "GET"
            }).then(response => response.json());
            const addressConfig = {
              tonAddress: value.tokenRecipient,
              jettonAddress: value.jettonMaster
            };
            this._config = addressConfig;
            return true;
          } catch (e) {
            console.error("request config failed!", e);
            return false;
          }
        });
      }
      onBuyWithTon(amount) {
        const tonTransferReq = {
          amount: telegram_ui_1.TonConnectUi.Instance.toNano(amount)
        };
        telegram_ui_1.TonConnectUi.Instance.sendTransaction(tonTransferReq);
      }
      onShare() {
        let userId = "";
        const userData = telegram_web_1.TelegramWebApp.Instance.getTelegramUser();
        console.log("userData : ", userData);
        userData && (userId = userData.id + "");
        telegram_web_1.TelegramWebApp.Instance.share(`${Config_1.config.URL_YOU_ASSIGNED_TO_YOUR_APP}&user=${userId}`, "Invite you to play a very interesting game");
      }
      onBuyWithStars(params) {
        fetch(`${Config_1.config.backendUrl}/create-stars-invoice`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "ngrok-skip-browser-warning": "1"
          },
          method: "POST",
          body: JSON.stringify({
            tg_data: window.Telegram.WebApp.initData,
            title: params.title,
            payload: params.payload,
            amount: params.amount,
            product: params.product
          })
        }).then(response => response.json()).then(value => {
          console.log("starts invoice : ", value);
          value.ok ? telegram_web_1.TelegramWebApp.Instance.openInvoice(value.invoiceLink, result => {
            console.log("buy stars : ", result);
          }).catch(error => {
            console.error("open invoice error : ", error);
          }) : console.error("request config failed!");
        });
      }
      start() {
        return __awaiter(this, void 0, void 0, function*() {
          for (const index in Enum_1.ENUM_RESOURCE_TYPE) {
            const resource = Enum_1.ENUM_RESOURCE_TYPE[index];
            yield ResourceManager_1.default.instance.loadRes(resource);
          }
          DataManager_1.default.instance.restore();
          StaticInstance_1.StaticInstance.uiManager.init();
          AudioManager_1.default.instance.playMusic();
          SdkManager_1.default.instance.initAudioEndListener();
          SdkManager_1.default.instance.passiveShare();
          SdkManager_1.default.instance.getRank();
          SdkManager_1.default.instance.initBannerAd();
          SdkManager_1.default.instance.initInterstitialAd();
          SdkManager_1.default.instance.initVideoAd();
          SdkManager_1.default.instance.initCustomRowAd();
          SdkManager_1.default.instance.initCustomColAd();
          this.onPowerIncrease();
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LEVEL_UI, true);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LEVEL_SELECT, true);
        });
      }
      responsive() {
        const designSize = cc.view.getDesignResolutionSize();
        const viewSize = cc.view.getFrameSize();
        const setFitWidth = () => {
          cc.Canvas.instance.fitHeight = false;
          cc.Canvas.instance.fitWidth = true;
        };
        const setFitHeight = () => {
          cc.Canvas.instance.fitHeight = true;
          cc.Canvas.instance.fitWidth = false;
        };
        const setFitBoth = () => {
          cc.Canvas.instance.fitHeight = true;
          cc.Canvas.instance.fitWidth = true;
        };
        const designRatio = designSize.width / designSize.height;
        const viewRatio = viewSize.width / viewSize.height;
        designRatio < 1 ? viewRatio < 1 ? viewRatio > designRatio ? setFitBoth() : setFitWidth() : setFitBoth() : viewRatio > 1 ? viewRatio < designRatio ? setFitBoth() : setFitHeight() : setFitBoth();
      }
      onPowerIncrease() {
        if (DataManager_1.default.instance.power < 5) {
          const now = new Date().getTime();
          const seconds = Math.floor((now - DataManager_1.default.instance.lastPowerUpdateTime) / 1e3);
          const powers = Math.floor(seconds / DataManager_1.default.instance.powerRefreshTime);
          if (DataManager_1.default.instance.power + powers >= 5) {
            DataManager_1.default.instance.power = 5;
            DataManager_1.default.instance.lastPowerRefreshTime = 0;
          } else DataManager_1.default.instance.power += powers;
          DataManager_1.default.instance.save();
        }
      }
    };
    __decorate([ property ], Index.prototype, "collisionManagerDebug", void 0);
    Index = __decorate([ ccclass ], Index);
    exports.default = Index;
    cc._RF.pop();
  }, {
    "./Config": "Config",
    "./Enum": "Enum",
    "./StaticInstance": "StaticInstance",
    "./cocos-telegram-miniapps/telegram-ui": "telegram-ui",
    "./cocos-telegram-miniapps/telegram-web": "telegram-web",
    "./cocos-telegram-miniapps/webton": "webton",
    "./manager/AudioManager": "AudioManager",
    "./manager/DataManager": "DataManager",
    "./manager/EventManager": "EventManager",
    "./manager/ResourceManager": "ResourceManager",
    "./manager/SdkManager": "SdkManager"
  } ],
  Languages: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "80441iPnaxNEIJc+SJheeZb", "Languages");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Languages = exports.LanguageType = void 0;
    var LanguageType;
    (function(LanguageType) {
      LanguageType["CH_J"] = "zh-CN";
      LanguageType["CH_F"] = "zh-TW";
      LanguageType["EN"] = "en";
      LanguageType["RU"] = "ru";
      LanguageType["AR"] = "ar";
      LanguageType["JA"] = "ja";
    })(LanguageType = exports.LanguageType || (exports.LanguageType = {}));
    exports.Languages = {
      RU: {
        name: "RU",
        "zh-CN": "\u0420\u0443\u0441\u0441\u043a\u0438\u0439 \u044f\u0437\u044b\u043a",
        "zh-TW": "\u0420\u0443\u0441\u0441\u043a\u0438\u0439 \u044f\u0437\u044b\u043a",
        en: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439 \u044f\u0437\u044b\u043a",
        ru: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439 \u044f\u0437\u044b\u043a",
        ar: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439 \u044f\u0437\u044b\u043a",
        ja: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439 \u044f\u0437\u044b\u043a"
      },
      AR: {
        name: "AR",
        "zh-CN": "\u0628\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
        "zh-TW": "\u0628\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
        en: "\u0628\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
        ru: "\u0628\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
        ar: "\u0628\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
        ja: "\u0628\u0627\u0644\u0639\u0631\u0628\u064a\u0629"
      },
      JA: {
        name: "JA",
        "zh-CN": "\u65e5\u672c\u8a9e",
        "zh-TW": "\u65e5\u672c\u8a9e",
        en: "\u65e5\u672c\u8a9e",
        ru: "\u65e5\u672c\u8a9e",
        ar: "\u65e5\u672c\u8a9e",
        ja: "\u65e5\u672c\u8a9e"
      },
      suoduan: {
        name: "suoduan",
        "zh-CN": "\u7f29\u77ed",
        "zh-TW": "\u7e2e\u77ed",
        en: "shorten",
        ru: "\u0421\u043e\u043a\u0440\u0430\u0449\u0435\u043d\u0438\u0435",
        ar: "\u062a\u0642\u0635\u064a\u0631",
        ja: "\u77ed\u7e2e"
      },
      touming: {
        name: "touming",
        "zh-CN": "\u900f\u660e",
        "zh-TW": "\u900f\u660e",
        en: "transparent",
        ru: "\u041f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u043e\u0441\u0442\u044c",
        ar: "\u0634\u0641\u0627\u0641\u064a\u0629",
        ja: "\u900f\u904e\u6027"
      },
      yichu: {
        name: "yichu",
        "zh-CN": "\u79fb\u9664",
        "zh-TW": "\u79fb\u9664",
        en: "remove",
        ru: "\u0423\u0434\u0430\u043b\u0438\u0442\u044c",
        ar: "\u0625\u0632\u0627\u0644\u0629",
        ja: "\u9664\u53bb\u3058\u3087\u304d\u3087"
      },
      zhuanqv: {
        name: "zhuanqv",
        "zh-CN": "\u8d5a\u53d6",
        "zh-TW": "\u8cfa\u53d6",
        en: "earn",
        ru: "\u0417\u0430\u0440\u0430\u0431\u043e\u0442\u0430\u0442\u044c",
        ar: "\u0643\u0633\u0628",
        ja: "\u3082\u3046\u304b\u308b"
      },
      renwu: {
        name: "renwu",
        "zh-CN": "\u4efb\u52a1",
        "zh-TW": "\u4efb\u52d9",
        en: "task",
        ru: "\u041c\u0430\u043d\u0434\u0430\u0442",
        ar: "\u0645\u0647\u0645\u0629",
        ja: "\u30bf\u30b9\u30af\uff03\u30bf\u30b9\u30af\uff03"
      },
      shangdian: {
        name: "shangdian",
        "zh-CN": "\u5546\u5e97",
        "zh-TW": "\u5546\u5e97",
        en: "store",
        ru: "\u041c\u0430\u0433\u0430\u0437\u0438\u043d\u044b",
        ar: "\u0645\u062e\u0632\u0646",
        ja: "\u5e97"
      },
      yaoqing: {
        name: "yaoqing",
        "zh-CN": "\u9080\u8bf7",
        "zh-TW": "\u9080\u8acb",
        en: "invite",
        ru: "\u041f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435",
        ar: "\u062f\u0639\u0648\u0629",
        ja: "\u306b\u52e7\u3081\u308b"
      },
      guankaxuanze: {
        name: "guankaxuanze",
        "zh-CN": "\u5173\u5361\u9009\u62e9",
        "zh-TW": "\u95dc\u5361\u9078\u64c7",
        en: "Stage Select",
        ru: "\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0443\u0440\u043e\u0432\u0435\u043d\u044c",
        ar: "\u0627\u062e\u062a\u064a\u0627\u0631 \u0645\u0633\u062a\u0648\u0649",
        ja: "\u30ec\u30d9\u30eb\u9078\u629e"
      },
      putongmoshi: {
        name: "putongmoshi",
        "zh-CN": "\u666e\u901a\u6a21\u5f0f",
        "zh-TW": "\u666e\u901a\u6a21\u5f0f",
        en: "Normal mode",
        ru: "\u041e\u0431\u044b\u0447\u043d\u0430\u044f \u043c\u043e\u0434\u0435\u043b\u044c",
        ar: "\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0639\u0627\u0645",
        ja: "\u901a\u5e38\u30e2\u30fc\u30c9"
      },
      tiaozhanmoshi: {
        name: "tiaozhanmoshi",
        "zh-CN": "\u6311\u6218\u6a21\u5f0f",
        "zh-TW": "\u6311\u6230\u6a21\u5f0f",
        en: "Challenge Mode",
        ru: "\u041c\u043e\u0434\u0435\u043b\u044c \u0432\u044b\u0437\u043e\u0432\u0430",
        ar: "\u0648\u0636\u0639 \u0627\u0644\u062a\u062d\u062f\u064a",
        ja: "\u30c1\u30e3\u30ec\u30f3\u30b8\u30e2\u30fc\u30c9"
      },
      exitgame: {
        name: "exitgame",
        "zh-CN": "\u9000\u51fa\u6e38\u620f",
        "zh-TW": "\u9000\u51fa\u904a\u6232",
        en: "Exit the game",
        ru: "\u0412\u044b\u0439\u0442\u0438 \u0438\u0437 \u0438\u0433\u0440\u044b",
        ar: "\u0627\u0644\u062e\u0631\u0648\u062c \u0645\u0646 \u0627\u0644\u0644\u0639\u0628\u0629",
        ja: "\u30b2\u30fc\u30e0\u3092\u7d42\u4e86\u3059\u308b"
      },
      exit: {
        name: "exit",
        "zh-CN": "\u9000\u51fa",
        "zh-TW": "\u9000\u51fa",
        en: "exit",
        ru: "\u0412\u044b\u0445\u043e\u0434",
        ar: "\u0633\u062d\u0628",
        ja: "\u7d42\u4e86"
      },
      chongwan: {
        name: "chongwan",
        "zh-CN": "\u91cd\u73a9",
        "zh-TW": "\u91cd\u73a9",
        en: "Play again",
        ru: "\u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u044c \u0438\u0433\u0440\u0443",
        ar: "\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0644\u0639\u0628",
        ja: "\u904a\u3073\u76f4\u3059"
      },
      meirirenwu: {
        name: "meirirenwu",
        "zh-CN": "\u6bcf\u65e5\u4efb\u52a1",
        "zh-TW": "\u6bcf\u65e5\u4efb\u52d9",
        en: "Daily tasks",
        ru: "\u0415\u0436\u0435\u0434\u043d\u0435\u0432\u043d\u044b\u0435 \u0437\u0430\u0434\u0430\u043d\u0438\u044f",
        ar: "\u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u064a\u0648\u0645\u064a\u0629",
        ja: "\u6bce\u65e5\u306e\u30bf\u30b9\u30af"
      },
      mubiaorenwu: {
        name: "mubiaorenwu",
        "zh-CN": "\u76ee\u6807\u4efb\u52a1",
        "zh-TW": "\u76ee\u6a19\u4efb\u52d9",
        en: "target task",
        ru: "\u0417\u0430\u0434\u0430\u0447\u0438",
        ar: "\u0627\u0644\u0647\u062f\u0641 \u0645\u0646 \u0627\u0644\u0645\u0647\u0645\u0629",
        ja: "\u30bf\u30fc\u30b2\u30c3\u30c8\u30bf\u30b9\u30af"
      },
      libao: {
        name: "libao",
        "zh-CN": "\u793c\u5305",
        "zh-TW": "\u79ae\u5305",
        en: "Gift Pack",
        ru: "\u0421\u0443\u043c\u043a\u0430",
        ar: "\u0647\u062f\u064a\u0629",
        ja: "\u30d7\u30ec\u30bc\u30f3\u30c8"
      },
      yaoshi: {
        name: "yaoshi",
        "zh-CN": "\u94a5\u5319",
        "zh-TW": "\u9470\u5319",
        en: "key",
        ru: "\u041a\u043b\u044e\u0447.",
        ar: "\u0645\u0641\u062a\u0627\u062d .",
        ja: "\u304b\u304e\u672c"
      },
      daibi: {
        name: "daibi",
        "zh-CN": "\u4ee3\u5e01",
        "zh-TW": "\u4ee3\u5e63",
        en: "Token",
        ru: "\u0422\u043e\u043a\u0435\u043d\u044b",
        ar: "\u0631\u0645\u0632 \u0627\u0644\u0639\u0645\u0644\u0629",
        ja: "\u30c8\u30fc\u30af\u30f3"
      },
      pifu: {
        name: "pifu",
        "zh-CN": "\u76ae\u80a4",
        "zh-TW": "\u76ae\u819a",
        en: "skin",
        ru: "\u041a\u043e\u0436\u0430",
        ar: "\u0627\u0644\u062c\u0644\u062f .",
        ja: "\u30b9\u30ad\u30f3"
      },
      huasuanlibao: {
        name: "huasuanlibao",
        "zh-CN": "\u5212\u7b97\u793c\u5305",
        "zh-TW": "\u5212\u7b97\u79ae\u5305",
        en: "Cost effective gift package",
        ru: "\u042d\u043a\u043e\u043d\u043e\u043c\u0438\u044f \u0441\u0443\u043c\u043e\u043a",
        ar: "\u0635\u0641\u0642\u0629",
        ja: "\u304a\u5f97\u306a\u30ae\u30d5\u30c8\u30d0\u30c3\u30b0"
      },
      chaojilibao: {
        name: "chaojilibao",
        "zh-CN": "\u8d85\u7ea7\u793c\u5305",
        "zh-TW": "\u8d85\u7d1a\u79ae\u5305",
        en: "Super Gift Pack",
        ru: "\u0421\u0443\u043f\u0435\u0440\u0441\u0443\u043c\u043a\u0430",
        ar: "\u0633\u0648\u0628\u0631 \u062d\u0642\u064a\u0628\u0629",
        ja: "\u30b9\u30fc\u30d1\u30fc\u30ae\u30d5\u30c8"
      },
      pifulibao: {
        name: "pifulibao",
        "zh-CN": "\u76ae\u80a4\u793c\u5305",
        "zh-TW": "\u76ae\u819a\u79ae\u5305",
        en: "Skin Gift Pack",
        ru: "\u041a\u043e\u0436\u043d\u044b\u0435 \u0441\u0443\u043c\u043a\u0438",
        ar: "\u062d\u0642\u064a\u0628\u0629 \u062c\u0644\u062f\u064a\u0629",
        ja: "\u30b9\u30ad\u30f3\u30dd\u30fc\u30c1"
      },
      jingqingqidai: {
        name: "jingqingqidai",
        "zh-CN": "\u656c\u8bf7\u671f\u5f85",
        "zh-TW": "\u656c\u8acb\u671f\u5f85",
        en: "Coming soon",
        ru: "\u0421 \u043d\u0435\u0442\u0435\u0440\u043f\u0435\u043d\u0438\u0435\u043c \u0436\u0434\u0443",
        ar: "\u064a\u0631\u062c\u0649 \u0646\u062a\u0637\u0644\u0639 \u0625\u0644\u0649",
        ja: "\u304a\u697d\u3057\u307f\u306b"
      },
      chakanxinwen: {
        name: "chakanxinwen",
        "zh-CN": "\u67e5\u770b\u5b98\u65b9\u65b0\u95fb",
        "zh-TW": "\u67e5\u770b\u5b98\u65b9\u65b0\u805e",
        en: "View official news",
        ru: "\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u043e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0435 \u043d\u043e\u0432\u043e\u0441\u0442\u0438",
        ar: "\u0639\u0631\u0636 \u0627\u0644\u0623\u062e\u0628\u0627\u0631 \u0627\u0644\u0631\u0633\u0645\u064a\u0629",
        ja: "\u516c\u5f0f\u30cb\u30e5\u30fc\u30b9\u3092\u898b\u308b"
      },
      jiarupindao: {
        name: "jiarupindao",
        "zh-CN": "\u52a0\u5165\u5b98\u65b9\u9891\u9053",
        "zh-TW": "\u52a0\u5165\u5b98\u65b9\u983b\u9053",
        en: "Join the official channel",
        ru: "\u041f\u0440\u0438\u0441\u043e\u0435\u0434\u0438\u043d\u044f\u0439\u0442\u0435\u0441\u044c \u043a \u043e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u043c\u0443 \u043a\u0430\u043d\u0430\u043b\u0443",
        ar: "\u0627\u0644\u0627\u0646\u0636\u0645\u0627\u0645 \u0625\u0644\u0649 \u0627\u0644\u0642\u0646\u0627\u0629 \u0627\u0644\u0631\u0633\u0645\u064a\u0629",
        ja: "\u516c\u5f0f\u30c1\u30e3\u30f3\u30cd\u30eb\u306b\u53c2\u52a0\u3059\u308b"
      },
      guanzhutuite: {
        name: "guanzhutuite",
        "zh-CN": "\u5173\u6ce8\u5b98\u65b9\u63a8\u7279",
        "zh-TW": "\u95dc\u6ce8\u5b98\u65b9\u63a8\u7279",
        en: "Follow the official Twitter account",
        ru: "\u0421\u043b\u0435\u0434\u0438\u0442\u0435 \u0437\u0430 \u043e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u043c \u0422\u0432\u0438\u0442\u0442\u0435\u0440\u043e\u043c",
        ar: "\u062a\u0648\u064a\u062a\u0631 \u0627\u0644\u0631\u0633\u0645\u064a",
        ja: "\u516c\u5f0f\u30c4\u30a4\u30c3\u30bf\u30fc\u3092\u30d5\u30a9\u30ed\u30fc"
      },
      guankayouxi: {
        name: "guankayouxi",
        "zh-CN": "\u89c2\u770bTON\u7684\u6e38\u620f",
        "zh-TW": "\u89c0\u770bTON\u7684\u904a\u6232",
        en: "Watch TON's games",
        ru: "\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0438\u0433\u0440\u0443 TON",
        ar: "\u0645\u0634\u0627\u0647\u062f\u0629 \u0644\u0639\u0628\u0629 \u062a\u0648\u0646",
        ja: "TON\u306e\u30b2\u30fc\u30e0\u3092\u898b\u308b"
      },
      tongguan10: {
        name: "tongguan10",
        "zh-CN": "\u901a\u517310\u6b21\u6e38\u620f\u5173\u5361",
        "zh-TW": "\u901a\u95dc10\u6b21\u904a\u6232\u95dc\u5361",
        en: "Complete 10 game levels",
        ru: "\u0421\u043a\u0430\u0447\u0430\u0442\u044c \u0438\u0433\u0440\u0443 10 \u0440\u0430\u0437",
        ar: "\u0644\u0639\u0628\u0629 10 \u0645\u0633\u062a\u0648\u064a\u0627\u062a \u0627\u0644\u062a\u062e\u0644\u064a\u0635 \u0627\u0644\u062c\u0645\u0631\u0643\u064a",
        ja: "\u30b2\u30fc\u30e0\u30b9\u30c6\u30fc\u30b8\u309210\u56de\u30af\u30ea\u30a2\u3059\u308b"
      },
      tongguan20: {
        name: "tongguan20",
        "zh-CN": "\u901a\u517320\u6b21\u6e38\u620f\u5173\u5361",
        "zh-TW": "\u901a\u95dc20\u6b21\u904a\u6232\u95dc\u5361",
        en: "Complete 20 game levels",
        ru: "\u041f\u0440\u043e\u0445\u043e\u0436\u0434\u0435\u043d\u0438\u0435 20 \u0438\u0433\u0440.",
        ar: "\u0625\u0632\u0627\u0644\u0629 20 \u0645\u0633\u062a\u0648\u064a\u0627\u062a \u0627\u0644\u0644\u0639\u0628\u0629",
        ja: "\u30b2\u30fc\u30e0\u30b9\u30c6\u30fc\u30b8\u309220\u56de\u30af\u30ea\u30a2\u3059\u308b"
      },
      leijitili100: {
        name: "leijitili100",
        "zh-CN": "\u7d2f\u8ba1\u4f7f\u7528100\u4f53\u529b",
        "zh-TW": "\u7d2f\u8a08\u4f7f\u7528100\u9ad4\u529b",
        en: "Accumulated use of 100 stamina",
        ru: "\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 100 \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043a\u0438\u0445 \u0441\u0438\u043b.",
        ar: "\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u0642\u0648\u0629 \u0627\u0644\u0645\u062a\u0631\u0627\u0643\u0645\u0629 100",
        ja: "\u7d2f\u8a08100\u4f53\u529b\u4f7f\u7528"
      },
      leijitili200: {
        name: "leijitili200",
        "zh-CN": "\u7d2f\u8ba1\u4f7f\u7528200\u4f53\u529b",
        "zh-TW": "\u7d2f\u8a08\u4f7f\u7528200\u9ad4\u529b",
        en: "Accumulated use of 200 stamina",
        ru: "\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 200 \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043a\u0438\u0445 \u0441\u0438\u043b.",
        ar: "\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u0642\u0648\u0629 \u0627\u0644\u0628\u062f\u0646\u064a\u0629 \u0627\u0644\u0645\u062a\u0631\u0627\u0643\u0645\u0629 200",
        ja: "\u7d2f\u8a08200\u4f53\u529b\u4f7f\u7528"
      },
      leijiyichu20: {
        name: "leijiyichu20",
        "zh-CN": "\u7d2f\u8ba1\u4f7f\u752820\u6b21\u79fb\u9664\u9053\u5177",
        "zh-TW": "\u7d2f\u8a08\u4f7f\u752820\u6b21\u79fb\u9664\u9053\u5177",
        en: "Accumulated use of 20 times to remove props",
        ru: "\u0412\u0441\u0435\u0433\u043e \u0431\u044b\u043b\u043e \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u043e 20 \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u0439.",
        ar: "\u0627\u0633\u062a\u062e\u062f\u0627\u0645 20 \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u062f\u0639\u0627\u0626\u0645",
        ja: "\u524a\u9664\u30a2\u30a4\u30c6\u30e0\u3092\u7d2f\u8a0820\u56de\u4f7f\u7528"
      },
      fenxiangtips: {
        name: "fenxiangtips",
        "zh-CN": "\u5206\u4eab\u9080\u8bf7\u670b\u53cb\u5171\u4eab\u94fe\u63a5\u5e76\u83b7\u5f97\u5956\u52b1",
        "zh-TW": "\u5206\u4eab\u9080\u8acb\u670b\u53cb\u5171\u7528\u9023\u7d50\u4e26\u7372\u5f97\u734e\u52f5",
        en: "Share Inviting Friends to Share Links and Get Rewards",
        ru: "\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f \u041f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435 \u0434\u0440\u0443\u0437\u0435\u0439 \u041f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f \u0441\u0441\u044b\u043b\u043a\u0430\u043c\u0438 \u0438 \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u043d\u0430\u0433\u0440\u0430\u0434\u0443",
        ar: "\u062f\u0639\u0648\u0629 \u0627\u0644\u0623\u0635\u062f\u0642\u0627\u0621 \u0644\u0644\u0645\u0634\u0627\u0631\u0643\u0629 \u0641\u064a \u0627\u0644\u0631\u0648\u0627\u0628\u0637 \u0648\u0627\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0645\u0643\u0627\u0641\u0622\u062a",
        ja: "\u53cb\u4eba\u3092\u62db\u5f85\u3057\u3066\u30ea\u30f3\u30af\u3092\u5171\u6709\u3057\u3001\u5968\u52b1\u91d1\u3092\u5f97\u308b"
      },
      leijiyaoqing: {
        name: "leijiyaoqing",
        "zh-CN": "\u7d2f\u8ba1\u9080\u8bf7",
        "zh-TW": "\u7d2f\u8a08\u9080\u8acb",
        en: "Accumulated invitations",
        ru: "\u0421\u043e\u0432\u043e\u043a\u0443\u043f\u043d\u044b\u0435 \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u044f",
        ar: "\u062f\u0639\u0648\u0629 \u062a\u0631\u0627\u0643\u0645\u064a\u0629",
        ja: "\u7d2f\u8a08\u62db\u5f85"
      },
      shouyaozhemingdan: {
        name: "shouyaozhemingdan",
        "zh-CN": "\u53d7\u9080\u8005\u540d\u5355",
        "zh-TW": "\u53d7\u9080\u8005\u540d\u55ae",
        en: "List of invitees",
        ru: "\u0421\u043f\u0438\u0441\u043e\u043a \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u043d\u044b\u0445",
        ar: "\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u062f\u0639\u0648\u064a\u0646",
        ja: "\u62db\u5f85\u8005\u30ea\u30b9\u30c8"
      },
      chakanquanbu: {
        name: "chakanquanbu",
        "zh-CN": "\u67e5\u770b\u5168\u90e8",
        "zh-TW": "\u67e5\u770b\u5168\u90e8",
        en: "ALL",
        ru: "\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0432\u0441\u0435",
        ar: "\u0639\u0631\u0636 \u062c\u0645\u064a\u0639",
        ja: "\u3059\u3079\u3066\u8868\u793a"
      },
      lijiyaoqing: {
        name: "lijiyaoqing",
        "zh-CN": "\u7acb\u5373\u9080\u8bf7",
        "zh-TW": "\u7acb\u5373\u9080\u8acb",
        en: "Invite Now",
        ru: "\u041d\u0435\u043c\u0435\u0434\u043b\u0435\u043d\u043d\u043e\u0435 \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435",
        ar: "\u062f\u0639\u0648\u0629 \u0641\u0648\u0631\u064a\u0629",
        ja: "\u4eca\u3059\u3050\u62db\u5f85"
      },
      kelingqv: {
        name: "kelingqv",
        "zh-CN": "\u53ef\u9886\u53d6",
        "zh-TW": "\u53ef\u9818\u53d6",
        en: "Can be claimed",
        ru: "\u041c\u043e\u0436\u043d\u043e \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c",
        ar: "\u0627\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649",
        ja: "\u53d7\u9818\u53ef\u80fd"
      },
      yilingqv: {
        name: "yilingqv",
        "zh-CN": "\u5df2\u9886\u53d6",
        "zh-TW": "\u5df2\u9818\u53d6",
        en: "Received already",
        ru: "\u041f\u043e\u043b\u0443\u0447\u0435\u043d\u043e",
        ar: "\u062a\u0644\u0642\u0649",
        ja: "\u53d7\u9818\u6e08"
      },
      zanwugengduo: {
        name: "zanwugengduo",
        "zh-CN": "\u6682\u65e0\u66f4\u591a",
        "zh-TW": "\u66ab\u7121\u66f4\u591a",
        en: "No more available at the moment",
        ru: "\u0411\u043e\u043b\u044c\u0448\u0435 \u043d\u0435\u0442",
        ar: "\u0644\u0627 \u0623\u0643\u062b\u0631",
        ja: "\u3053\u308c\u4ee5\u4e0a\u306f\u3042\u308a\u307e\u305b\u3093"
      },
      yinyue: {
        name: "yinyue",
        "zh-CN": "\u97f3\u4e50",
        "zh-TW": "\u97f3\u6a02",
        en: "music",
        ru: "\u041c\u0443\u0437\u044b\u043a\u0430",
        ar: "\u0645\u0648\u0633\u064a\u0642\u064a .",
        ja: "\u97f3\u697d"
      },
      yinxiao: {
        name: "yinxiao",
        "zh-CN": "\u97f3\u6548",
        "zh-TW": "\u97f3\u6548",
        en: "sound effects",
        ru: "\u0417\u0432\u0443\u043a\u043e\u0432\u044b\u0435 \u044d\u0444\u0444\u0435\u043a\u0442\u044b",
        ar: "\u0627\u0644\u0645\u0624\u062b\u0631\u0627\u062a \u0627\u0644\u0635\u0648\u062a\u064a\u0629",
        ja: "\u30b5\u30a6\u30f3\u30c9\u30a8\u30d5\u30a7\u30af\u30c8"
      },
      youxishezhi: {
        name: "youxishezhi",
        "zh-CN": "\u6e38\u620f\u8bbe\u7f6e",
        "zh-TW": "\u904a\u6232\u8a2d\u5b9a",
        en: "GAME SETTINGS",
        ru: "\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0438\u0433\u0440\u044b",
        ar: "\u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0627\u0644\u0644\u0639\u0628\u0629",
        ja: "\u30b2\u30fc\u30e0\u8a2d\u5b9a"
      },
      yuyanqiehuan: {
        name: "yuyanqiehuan",
        "zh-CN": "\u8bed\u8a00\u5207\u6362",
        "zh-TW": "\u8a9e\u8a00\u5207\u63db",
        en: "Language switching",
        ru: "\u041f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 \u044f\u0437\u044b\u043a\u0430",
        ar: "\u0644\u063a\u0629 \u0627\u0644\u062a\u0628\u062f\u064a\u0644",
        ja: "\u8a00\u8a9e\u5207\u308a\u66ff\u3048"
      },
      CH_J: {
        name: "CH_J",
        "zh-CN": "\u4e2d\u6587\u7b80\u4f53",
        "zh-TW": "\u4e2d\u6587\u7b80\u4f53",
        en: "\u4e2d\u6587\u7b80\u4f53",
        ru: "\u4e2d\u6587\u7b80\u4f53",
        ar: "\u4e2d\u6587\u7b80\u4f53",
        ja: "\u4e2d\u6587\u7b80\u4f53"
      },
      CH_F: {
        name: "CH_F",
        "zh-CN": "\u4e2d\u6587\u7e41\u9ad4",
        "zh-TW": "\u4e2d\u6587\u7e41\u9ad4",
        en: "\u4e2d\u6587\u7e41\u9ad4",
        ru: "\u4e2d\u6587\u7e41\u9ad4",
        ar: "\u4e2d\u6587\u7e41\u9ad4",
        ja: "\u4e2d\u6587\u7e41\u9ad4"
      },
      EN: {
        name: "EN",
        "zh-CN": "English",
        "zh-TW": "English",
        en: "English",
        ru: "English",
        ar: "English",
        ja: "English"
      },
      fenxiang: {
        name: "fenxiang",
        "zh-CN": "\u5206\u4eab",
        "zh-TW": "\u5206\u4eab",
        en: "share",
        ru: "\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f",
        ar: "\u0634\u0627\u0631\u0643",
        ja: "\u5206\u304b\u3061\u5408\u3046"
      },
      xiayiguan: {
        name: "xiayiguan",
        "zh-CN": "\u4e0b\u4e00\u5173",
        "zh-TW": "\u4e0b\u4e00\u95dc",
        en: "Next level",
        ru: "\u0421\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0439 \u0443\u0440\u043e\u0432\u0435\u043d\u044c",
        ar: "\u0627\u0644\u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u062a\u0627\u0644\u064a",
        ja: "\u6b21\u306e\u95a2\u9580"
      },
      zaiwanyici: {
        name: "zaiwanyici",
        "zh-CN": "\u518d\u73a9\u4e00\u6b21",
        "zh-TW": "\u518d\u73a9\u4e00\u6b21",
        en: "play again",
        ru: "\u0415\u0449\u0435 \u0440\u0430\u0437.",
        ar: "\u0627\u0644\u0644\u0639\u0628 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649",
        ja: "\u3082\u3046\u4e00\u5ea6\u904a\u3093\u3067"
      }
    };
    cc._RF.pop();
  }, {} ],
  LevelSelectLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fa02b6rIdJMH5zBCjf/VXZc", "LevelSelectLayer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enum_1 = require("../Enum");
    var DataManager_1 = require("../manager/DataManager");
    var EventManager_1 = require("../manager/EventManager");
    var PoolManager_1 = require("../manager/PoolManager");
    var SdkManager_1 = require("../manager/SdkManager");
    var SpriteManager_1 = require("../manager/SpriteManager");
    var ToastManager_1 = require("../manager/ToastManager");
    var StaticInstance_1 = require("../StaticInstance");
    var BaseItem_1 = require("./BaseItem");
    var BaseLanguageLayer_1 = require("./BaseLanguageLayer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PanelType;
    (function(PanelType) {
      PanelType[PanelType["Putong"] = 1] = "Putong";
      PanelType[PanelType["Tiaozhan"] = 2] = "Tiaozhan";
    })(PanelType || (PanelType = {}));
    var LevelItemPuTong = function(_super) {
      __extends(LevelItemPuTong, _super);
      function LevelItemPuTong() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.levelLabel = null;
        _this.sprite = null;
        _this.nowData = null;
        _this.unLock = null;
        return _this;
      }
      LevelItemPuTong.prototype.init = function() {
        this.levelLabel = this.node.getChildByName("label").getComponent(cc.Label);
        this.unLock = this.node.getChildByName("unlock");
        this.sprite = this.node.getComponent(cc.Sprite);
        this.onTouch(this.node, this.onTouchClick, this);
      };
      LevelItemPuTong.prototype.setData = function(data) {
        this.nowData = data;
        this.levelLabel.string = data.level;
        if (this.nowData.level < DataManager_1.default.instance.clevelMax) {
          this.sprite.spriteFrame = SpriteManager_1.default.custemIcon[1];
          this.unLock.active = false;
        } else if (this.nowData.level == DataManager_1.default.instance.clevelMax) {
          this.sprite.spriteFrame = SpriteManager_1.default.custemIcon[0];
          this.unLock.active = false;
        } else {
          this.sprite.spriteFrame = SpriteManager_1.default.custemIcon[0];
          this.unLock.active = true;
        }
      };
      LevelItemPuTong.prototype.onTouchClick = function() {
        if (this.nowData.level > DataManager_1.default.instance.clevelMax) {
          ToastManager_1.default.instance.show("\u5173\u5361\u672a\u89e3\u9501\uff0c\u8bf7\u7ee7\u7eed\u52aa\u529b", {
            gravity: "TOP",
            bg_color: cc.color(226, 69, 109, 255)
          });
          return;
        }
        EventManager_1.default.instance.emit(EventManager_1.EventType.GOTO_LEVEL, PanelType.Putong, this.nowData.level);
      };
      return LevelItemPuTong;
    }(BaseItem_1.default);
    var LevelItemTiaoZhan = function(_super) {
      __extends(LevelItemTiaoZhan, _super);
      function LevelItemTiaoZhan() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.levelLabel = null;
        _this.sprite = null;
        _this.nowData = null;
        _this.unLock = null;
        return _this;
      }
      LevelItemTiaoZhan.prototype.init = function() {
        this.levelLabel = this.node.getChildByName("label").getComponent(cc.Label);
        this.unLock = this.node.getChildByName("unlock");
        this.sprite = this.node.getComponent(cc.Sprite);
        this.onTouch(this.node, this.onTouchClick, this);
      };
      LevelItemTiaoZhan.prototype.setData = function(data) {
        this.nowData = data;
        this.levelLabel.string = data.level;
        if (this.nowData.level < DataManager_1.default.instance.levelMax) {
          this.sprite.spriteFrame = SpriteManager_1.default.custemTZIcon[this.nowData.star + 1];
          this.unLock.active = false;
        } else if (this.nowData.level == DataManager_1.default.instance.levelMax) {
          this.sprite.spriteFrame = SpriteManager_1.default.custemTZIcon[1];
          this.unLock.active = false;
        } else {
          this.sprite.spriteFrame = SpriteManager_1.default.custemTZIcon[0];
          this.unLock.active = true;
        }
      };
      LevelItemTiaoZhan.prototype.onTouchClick = function() {
        if (this.nowData.level > DataManager_1.default.instance.levelMax) {
          ToastManager_1.default.instance.show("\u5173\u5361\u672a\u89e3\u9501\uff0c\u8bf7\u7ee7\u7eed\u52aa\u529b", {
            gravity: "TOP",
            bg_color: cc.color(226, 69, 109, 255)
          });
          return;
        }
        EventManager_1.default.instance.emit(EventManager_1.EventType.GOTO_LEVEL, PanelType.Tiaozhan, this.nowData.level);
      };
      return LevelItemTiaoZhan;
    }(BaseItem_1.default);
    var LevelSelectLayer = function(_super) {
      __extends(LevelSelectLayer, _super);
      function LevelSelectLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.panel = null;
        _this.btnClose = null;
        _this.levelItemPuTong = null;
        _this.levelItemTiaoZhan = null;
        _this.content = null;
        _this.btnPuTong = null;
        _this.btnTiaoZhan = null;
        _this.labelPuTong = null;
        _this.labelTiaoZhan = null;
        _this.panelType = null;
        _this.mode = null;
        return _this;
      }
      LevelSelectLayer.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.panel = cc.find("style/panel", this.node);
        this.btnClose = cc.find("close", this.panel);
        this.levelItemPuTong = cc.find("levelItemPuTong", this.node);
        this.levelItemTiaoZhan = cc.find("levelItemTiaoZhan", this.node);
        this.mode = cc.find("moshi", this.panel).getComponent(cc.Sprite);
        this.btnPuTong = cc.find("moshi/btnputong", this.panel);
        this.btnTiaoZhan = cc.find("moshi/btntiaozhan", this.panel);
        this.labelPuTong = cc.find("moshi/label1", this.panel);
        this.labelTiaoZhan = cc.find("moshi/label2", this.panel);
        this.content = cc.find("content", this.panel);
        this.onTouch(this.btnClose, this.onCloseClick, this);
        this.onTouch(this.btnPuTong, this.onPuTongClick, this);
        this.onTouch(this.btnTiaoZhan, this.onTiaoZhanClick, this);
        EventManager_1.default.instance.on(EventManager_1.EventType.GOTO_LEVEL, this.gotoLevel, this);
      };
      LevelSelectLayer.prototype.show = function() {
        _super.prototype.show.call(this);
        this.initPanel();
      };
      LevelSelectLayer.prototype.initPanel = function() {
        null == this.panelType && (this.panelType = PanelType.Putong);
        if (this.panelType == PanelType.Putong) {
          this.labelPuTong.active = true;
          this.labelTiaoZhan.active = false;
          this.mode.spriteFrame = SpriteManager_1.default.ModelSprite[0];
          this.removeItem();
          this.CreateListItem(this.content, this.levelItemPuTong, DataManager_1.CLEVEL_Data, LevelItemPuTong);
        } else {
          this.labelPuTong.active = false;
          this.labelTiaoZhan.active = true;
          this.mode.spriteFrame = SpriteManager_1.default.ModelSprite[1];
          this.removeItem();
          this.CreateListItem(this.content, this.levelItemTiaoZhan, DataManager_1.default.instance.levelData, LevelItemTiaoZhan);
        }
      };
      LevelSelectLayer.prototype.onCloseClick = function() {
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LEVEL_SELECT, false);
      };
      LevelSelectLayer.prototype.onPuTongClick = function() {
        if (this.panelType == PanelType.Putong) return;
        this.panelType = PanelType.Putong;
        this.initPanel();
      };
      LevelSelectLayer.prototype.onTiaoZhanClick = function() {
        if (this.panelType == PanelType.Tiaozhan) return;
        this.panelType = PanelType.Tiaozhan;
        this.initPanel();
      };
      LevelSelectLayer.prototype.gotoLevel = function(type, level) {
        if (DataManager_1.default.instance.power <= 0) {
          ToastManager_1.default.instance.show("\u80fd\u91cf\u5df2\u7528\u5b8c, \u8bf7\u5148\u8865\u5145\u80fd\u91cf", {
            gravity: "TOP",
            bg_color: cc.color(226, 69, 109, 255)
          });
          return;
        }
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LEVEL_SELECT, false);
        var layer = Enum_1.ENUM_UI_TYPE.MAIN_LEVEL;
        if (type == PanelType.Putong) DataManager_1.default.instance.mode = Enum_1.ENUM_GAME_MODE.LEVEL; else {
          layer = Enum_1.ENUM_UI_TYPE.MAIN;
          DataManager_1.default.instance.mode = Enum_1.ENUM_GAME_MODE.TIMER;
        }
        DataManager_1.default.instance.power -= 1;
        DataManager_1.default.instance.save();
        console.log(layer, "-------------------");
        StaticInstance_1.StaticInstance.transitionsManager.play(null, layer, function() {
          StaticInstance_1.StaticInstance.gameManager.onGameStart();
        });
      };
      LevelSelectLayer.prototype.onEnable = function() {
        this.zoomIn(this.panel);
        SdkManager_1.default.instance.toggleBannerAd(true);
      };
      LevelSelectLayer.prototype.onDisable = function() {
        SdkManager_1.default.instance.toggleBannerAd(false);
      };
      LevelSelectLayer.prototype.removeItem = function() {
        var child = this.content.children;
        for (var i = child.length - 1; i >= 0; i--) PoolManager_1.default.instance.putNode(child[i]);
      };
      LevelSelectLayer.prototype.start = function() {};
      LevelSelectLayer = __decorate([ ccclass ], LevelSelectLayer);
      return LevelSelectLayer;
    }(BaseLanguageLayer_1.default);
    exports.default = LevelSelectLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../StaticInstance": "StaticInstance",
    "../manager/DataManager": "DataManager",
    "../manager/EventManager": "EventManager",
    "../manager/PoolManager": "PoolManager",
    "../manager/SdkManager": "SdkManager",
    "../manager/SpriteManager": "SpriteManager",
    "../manager/ToastManager": "ToastManager",
    "./BaseItem": "BaseItem",
    "./BaseLanguageLayer": "BaseLanguageLayer"
  } ],
  LevelUILayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6b791704GdHqKidw/mJK4Vi", "LevelUILayer");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Enum_1 = require("../Enum");
    const EventManager_1 = require("../manager/EventManager");
    const SpriteManager_1 = require("../manager/SpriteManager");
    const StaticInstance_1 = require("../StaticInstance");
    const BaseLanguageLayer_1 = require("./BaseLanguageLayer");
    const telegram_ui_1 = require("../cocos-telegram-miniapps/telegram-ui");
    const webton_1 = require("../cocos-telegram-miniapps/webton");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LevelUILayer = class LevelUILayer extends BaseLanguageLayer_1.default {
      constructor() {
        super(...arguments);
        this.btnPause = null;
        this.btnLevel = null;
        this.btnSkills = null;
        this.btnSuoduan = null;
        this.btnTouming = null;
        this.btnYichu = null;
        this.btnDown = null;
        this.btnZhuanQv = null;
        this.btnRenwu = null;
        this.btnShop = null;
        this.btnShare = null;
        this.btnWallet = null;
        this.btnSend = null;
        this.connectLabel = null;
      }
      onLoad() {
        super.onLoad();
        this.btnPause = cc.find("btn_pause", this.node);
        this.btnLevel = cc.find("btn_level", this.node);
        this.btnSkills = cc.find("skills", this.node);
        this.btnSuoduan = cc.find("btn_shuffle", this.btnSkills);
        this.btnTouming = cc.find("btn_opacity", this.btnSkills);
        this.btnYichu = cc.find("btn_delete", this.btnSkills);
        this.btnDown = cc.find("btndown", this.node);
        this.btnZhuanQv = cc.find("btnzhuanqv", this.btnDown);
        this.btnRenwu = cc.find("btnrenwu", this.btnDown);
        this.btnShop = cc.find("btnshop", this.btnDown);
        this.btnShare = cc.find("btnshare", this.btnDown);
        this.btnWallet = cc.find("btn_wallet", this.node);
        this.btnSend = cc.find("btn_send", this.node);
        this.connectLabel = cc.find("btn_wallet/connect", this.node);
        this.onTouch(this.btnPause, this.onPauseClick, this);
        this.onTouch(this.btnLevel, this.onLevelClick, this);
        this.onTouch(this.btnSuoduan, this.onSuoDuanClick, this);
        this.onTouch(this.btnTouming, this.onTouMingClick, this);
        this.onTouch(this.btnYichu, this.onYiChuClick, this);
        this.onTouch(this.btnRenwu, this.onRenWuClick, this);
        this.onTouch(this.btnShop, this.onShopClick, this);
        this.onTouch(this.btnShare, this.onShareClick, this);
        this.onTouch(this.btnZhuanQv, this.onZhuanQvClick, this);
        this.onTouch(this.btnWallet, this.openWallet, this);
        this.onTouch(this.btnSend, this.sendTon, this);
        EventManager_1.default.instance.on(EventManager_1.EventType.OPEN_LEVEL_BTN, this.openLevelBtn, this);
        EventManager_1.default.instance.on(EventManager_1.EventType.CONNECT_COMPLETE, this.subscribe, this);
      }
      sendTon() {
        return __awaiter(this, void 0, void 0, function*() {
          yield telegram_ui_1.TonConnectUi.Instance.sendTransaction({
            amount: "100000",
            payload: yield webton_1.WebTon.Instance.createMessagePayload("hello"),
            callBack: result => {
              console.log("sendTon", result);
            }
          });
        });
      }
      subscribe(success) {
        console.log("subscribe success");
        this.updateConnect();
      }
      setWalletUi(address) {
        return __awaiter(this, void 0, void 0, function*() {
          console.log("setWalletUi", address);
          if (this.connectLabel) {
            const label = this.connectLabel.getComponent(cc.Label);
            if (label) if ("Connect" == address) label.string = address; else {
              const longAddress = yield webton_1.WebTon.Instance.parseAddress(address);
              label.string = longAddress.length > 10 ? longAddress.substr(0, 10) + "..." : longAddress;
            }
          }
        });
      }
      openWallet() {
        return __awaiter(this, void 0, void 0, function*() {
          yield telegram_ui_1.TonConnectUi.Instance.openModal();
        });
      }
      start() {
        this.btnSkills.active = false;
      }
      openLevelBtn() {
        this.btnSkills.active = true;
      }
      updateConnect() {
        console.log("updateConnect");
        debugger;
        if (telegram_ui_1.TonConnectUi.Instance.isConnected()) {
          const address = telegram_ui_1.TonConnectUi.Instance.account().address;
          const add = telegram_ui_1.TonConnectUi.Instance.parseRaw(address);
          this.setWalletUi(add);
        } else this.setWalletUi("Connect");
      }
      onPauseClick() {
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SETTING);
      }
      onLevelClick() {
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LEVEL_SELECT);
      }
      onSuoDuanClick() {}
      onTouMingClick() {}
      onYiChuClick() {}
      onZhuanQvClick() {}
      onRenWuClick() {
        if (StaticInstance_1.StaticInstance.uiManager.isActive(Enum_1.ENUM_UI_TYPE.TASK)) StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.TASK, false); else {
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.TASK, true);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SHOP, false);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SHARE, false);
        }
        this.updateBtnState();
      }
      onShopClick() {
        if (StaticInstance_1.StaticInstance.uiManager.isActive(Enum_1.ENUM_UI_TYPE.SHOP)) StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SHOP, false); else {
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SHOP, true);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.TASK, false);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SHARE, false);
        }
        this.updateBtnState();
      }
      onShareClick() {
        if (StaticInstance_1.StaticInstance.uiManager.isActive(Enum_1.ENUM_UI_TYPE.SHARE)) StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SHARE, false); else {
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SHARE, true);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SHOP, false);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.TASK, false);
        }
        this.updateBtnState();
      }
      updateBtnState() {
        let index = StaticInstance_1.StaticInstance.uiManager.isActive(Enum_1.ENUM_UI_TYPE.TASK) ? 1 : 0;
        this.btnRenwu.getComponent(cc.Sprite).spriteFrame = SpriteManager_1.default.taskIcon[index];
        index = StaticInstance_1.StaticInstance.uiManager.isActive(Enum_1.ENUM_UI_TYPE.SHOP) ? 1 : 0;
        this.btnShop.getComponent(cc.Sprite).spriteFrame = SpriteManager_1.default.shopIcon[index];
        index = StaticInstance_1.StaticInstance.uiManager.isActive(Enum_1.ENUM_UI_TYPE.SHARE) ? 1 : 0;
        this.btnShare.getComponent(cc.Sprite).spriteFrame = SpriteManager_1.default.shareIcon[index];
      }
    };
    LevelUILayer = __decorate([ ccclass ], LevelUILayer);
    exports.default = LevelUILayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../StaticInstance": "StaticInstance",
    "../cocos-telegram-miniapps/telegram-ui": "telegram-ui",
    "../cocos-telegram-miniapps/webton": "webton",
    "../manager/EventManager": "EventManager",
    "../manager/SpriteManager": "SpriteManager",
    "./BaseLanguageLayer": "BaseLanguageLayer"
  } ],
  LoadingLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0d076ynxVpJ6Ys/SGfhiZtJ", "LoadingLayer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DataManager_1 = require("../manager/DataManager");
    var Baselayer_1 = require("./Baselayer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LoadingLayer = function(_super) {
      __extends(LoadingLayer, _super);
      function LoadingLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.loadfill = null;
        return _this;
      }
      LoadingLayer.prototype.onEnable = function() {};
      LoadingLayer.prototype.onDisable = function() {};
      LoadingLayer.prototype.update = function(dt) {
        if (this.loadfill && this.node.active) {
          this.loadfill.fillRange = DataManager_1.default.instance.loadingRate;
          DataManager_1.default.instance.loadingRate >= 1 && this.hide();
        }
      };
      __decorate([ property(cc.Sprite) ], LoadingLayer.prototype, "loadfill", void 0);
      LoadingLayer = __decorate([ ccclass ], LoadingLayer);
      return LoadingLayer;
    }(Baselayer_1.default);
    exports.default = LoadingLayer;
    cc._RF.pop();
  }, {
    "../manager/DataManager": "DataManager",
    "./Baselayer": "Baselayer"
  } ],
  LoseLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "02b65l930JI+6jWBupIGRWE", "LoseLayer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enum_1 = require("../Enum");
    var StaticInstance_1 = require("./../StaticInstance");
    var AudioManager_1 = require("../manager/AudioManager");
    var SdkManager_1 = require("../manager/SdkManager");
    var ToastManager_1 = require("../manager/ToastManager");
    var DataManager_1 = require("../manager/DataManager");
    var HeaderLayer_1 = require("./HeaderLayer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LoseLayer = function(_super) {
      __extends(LoseLayer, _super);
      function LoseLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.panel = null;
        _this.btnRestart = null;
        _this.btnNext = null;
        _this.btnClose = null;
        return _this;
      }
      LoseLayer.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.panel = cc.find("style/panel", this.node);
        this.btnRestart = cc.find("buttons/btn_restart", this.panel);
        this.btnNext = cc.find("buttons/btn_next", this.panel);
        this.btnRestart.on("click", this.onRestartClick, this);
        this.btnNext.on("click", this.onNextClick, this);
        this.btnClose = cc.find("btn_close", this.panel);
        this.btnClose.on("click", this.onCloseClick, this);
      };
      LoseLayer.prototype.onDestroy = function() {
        this.btnRestart.off("click", this.onRestartClick, this);
        this.btnNext.off("click", this.onNextClick, this);
        this.btnClose.off("click", this.onCloseClick, this);
      };
      LoseLayer.prototype.onEnable = function() {
        this.zoomIn(this.panel);
        SdkManager_1.default.instance.toggleBannerAd(true);
        StaticInstance_1.StaticInstance.uiManager.setMainTimer(false);
        this.rendorKeys();
        this.rendorPower();
        this.rendorPowerTimer();
      };
      LoseLayer.prototype.onDisable = function() {
        SdkManager_1.default.instance.toggleBannerAd(false);
      };
      LoseLayer.prototype.onRestartClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        if (DataManager_1.default.instance.power <= 0) {
          ToastManager_1.default.instance.show("\u80fd\u91cf\u5df2\u7528\u5b8c, \u8bf7\u5148\u8865\u5145\u80fd\u91cf", {
            gravity: "TOP",
            bg_color: cc.color(226, 69, 109, 255)
          });
          return;
        }
        DataManager_1.default.instance.power -= 1;
        DataManager_1.default.instance.save();
        StaticInstance_1.StaticInstance.transitionsManager.play(Enum_1.ENUM_UI_TYPE.LOSE, null, function() {
          StaticInstance_1.StaticInstance.gameManager.onGameLevelStart();
        });
      };
      LoseLayer.prototype.onNextClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        SdkManager_1.default.instance.showVideoAd(function(msg) {
          SdkManager_1.default.instance.getPlatform() || ToastManager_1.default.instance.show(msg, {
            gravity: "BOTTOM",
            bg_color: cc.color(102, 202, 28, 255)
          });
          var clevel = DataManager_1.default.instance.clevel + 1;
          clevel = Math.min(clevel, DataManager_1.CLEVEL_Data.length);
          DataManager_1.default.instance.clevel = clevel;
          clevel > DataManager_1.default.instance.clevelMax && (DataManager_1.default.instance.clevelMax = clevel);
          DataManager_1.default.instance.save();
          StaticInstance_1.StaticInstance.transitionsManager.play(Enum_1.ENUM_UI_TYPE.LOSE, null, function() {
            StaticInstance_1.StaticInstance.gameManager.onGameLevelStart();
          });
        }, function(msg) {
          ToastManager_1.default.instance.show(msg, {
            gravity: "BOTTOM",
            bg_color: cc.color(226, 69, 109, 255)
          });
        });
      };
      LoseLayer.prototype.onCloseClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.MAIN_LEVEL, false);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LOSE, false);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.MENU);
      };
      LoseLayer = __decorate([ ccclass ], LoseLayer);
      return LoseLayer;
    }(HeaderLayer_1.default);
    exports.default = LoseLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../manager/AudioManager": "AudioManager",
    "../manager/DataManager": "DataManager",
    "../manager/SdkManager": "SdkManager",
    "../manager/ToastManager": "ToastManager",
    "./../StaticInstance": "StaticInstance",
    "./HeaderLayer": "HeaderLayer"
  } ],
  MainLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "995d75Ra29EXY7A+cLQ/Mrd", "MainLayer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enum_1 = require("../Enum");
    var AudioManager_1 = require("../manager/AudioManager");
    var DataManager_1 = require("../manager/DataManager");
    var EventManager_1 = require("../manager/EventManager");
    var StaticInstance_1 = require("../StaticInstance");
    var Utils_1 = require("../Utils");
    var Baselayer_1 = require("./Baselayer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MainLayer = function(_super) {
      __extends(MainLayer, _super);
      function MainLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.levelUpNode = null;
        _this.timerNum = null;
        return _this;
      }
      MainLayer.prototype.show = function() {
        _super.prototype.show.call(this);
        EventManager_1.default.instance.emit(EventManager_1.EventType.OPEN_LEVEL_BTN);
      };
      MainLayer.prototype.onLoad = function() {
        var _this = this;
        this.levelUpNode = cc.find("level_up", this.node);
        this.timerNum = cc.find("bar_seconds/nums", this.node);
        this.skills = cc.find("skills", this.node);
        this.skills.children.forEach(function(node, index) {
          node.on("click", function() {
            return _this.onSkillClick(index);
          }, _this);
        });
        this.skillTip = cc.find("skill_tip", this.node);
      };
      MainLayer.prototype.onDestroy = function() {};
      MainLayer.prototype.onEnable = function() {};
      MainLayer.prototype.onDisable = function() {};
      MainLayer.prototype.onPauseClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.EXIT);
      };
      MainLayer.prototype.setLevelUpNotice = function() {
        this.levelUpNode.stopAllActions();
        this.levelUpNode.x = 600;
        var act1 = cc.moveTo(.5, 0, this.levelUpNode.y);
        var act2 = cc.delayTime(1);
        var act3 = cc.moveTo(.5, -600, this.levelUpNode.y);
        var act = cc.sequence(act1, act2, act3);
        cc.tween(this.levelUpNode).then(act).start();
      };
      MainLayer.prototype.setTimerRendor = function() {
        var label = this.timerNum.getComponent(cc.Label);
        label.string = Utils_1.formatSeconds("" + DataManager_1.default.instance.seconds, "h:i:s");
      };
      MainLayer.prototype.onTimerStart = function() {
        var label = this.timerNum.getComponent(cc.Label);
        this.unscheduleAllCallbacks();
        this.schedule(function() {
          DataManager_1.default.instance.seconds++;
          label.string = Utils_1.formatSeconds("" + DataManager_1.default.instance.seconds, "h:i:s");
        }, 1);
      };
      MainLayer.prototype.onTimerStop = function() {
        this.unscheduleAllCallbacks();
      };
      MainLayer.prototype.onSkillClick = function(index) {
        if (DataManager_1.default.instance.isSkilling) return;
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        DataManager_1.default.instance.skillIndex = index;
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SKILL_SUBMIT);
        StaticInstance_1.StaticInstance.uiManager.setMainTimer(false);
      };
      MainLayer.prototype.setSkillTip = function() {
        var _this = this;
        this.skillTip.active = DataManager_1.default.instance.isSkilling;
        if (DataManager_1.default.instance.isSkilling) {
          var tips = cc.find("content/tips", this.skillTip);
          tips.children.forEach(function(tip, index) {
            tip.active = DataManager_1.default.instance.skillIndex == index;
          });
          var btnClose = cc.find("content/btn_close", this.skillTip);
          btnClose.hasEventListener("click") || btnClose.on("click", function() {
            AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
            _this.skillTip.active = false;
            DataManager_1.default.instance.skillIndex = -1;
            DataManager_1.default.instance.isSkilling = false;
          }, this);
        }
      };
      MainLayer = __decorate([ ccclass ], MainLayer);
      return MainLayer;
    }(Baselayer_1.default);
    exports.default = MainLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../StaticInstance": "StaticInstance",
    "../Utils": "Utils",
    "../manager/AudioManager": "AudioManager",
    "../manager/DataManager": "DataManager",
    "../manager/EventManager": "EventManager",
    "./Baselayer": "Baselayer"
  } ],
  MainLevelLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "daf6cU2QC9IrIw7ec56vD8J", "MainLevelLayer");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Enum_1 = require("../Enum");
    const AudioManager_1 = require("../manager/AudioManager");
    const DataManager_1 = require("../manager/DataManager");
    const EventManager_1 = require("../manager/EventManager");
    const SdkManager_1 = require("../manager/SdkManager");
    const ToastManager_1 = require("../manager/ToastManager");
    const StaticInstance_1 = require("../StaticInstance");
    const Baselayer_1 = require("./Baselayer");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MainLevelLayer = class MainLevelLayer extends Baselayer_1.default {
      constructor() {
        super(...arguments);
        this.crashNum = null;
        this.tip = null;
      }
      show() {
        super.show();
        EventManager_1.default.instance.emit(EventManager_1.EventType.OPEN_LEVEL_BTN);
      }
      onLoad() {
        this.crashNum = cc.find("bar_crash/nums", this.node);
        this.tip = cc.find("bar_crash/tip", this.node);
      }
      onDestroy() {}
      onEnable() {}
      onDisable() {}
      setCrashRendor() {
        let nums = DataManager_1.default.instance.crashTotal - DataManager_1.default.instance.crashCurrent;
        nums = Math.max(0, nums);
        this.crashNum.getComponent(cc.Label).string = `${nums}`;
      }
      setLevelTip() {
        let tip = "\u8bf7\u5c06\u7ea2\u8272\u5c0f\u8f66\u632a\u51fa\u8f66\u5e93";
        DataManager_1.default.instance.carNum > 1 && (tip = "\u8bf7\u5c06\u6240\u6709\u8f66\u8f86\u632a\u51fa\u8f66\u5e93");
        this.tip.getComponent(cc.Label).string = `${tip}`;
      }
      onPauseClick() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.EXIT_LEVEL);
      }
      onPassClick() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        SdkManager_1.default.instance.showVideoAd(msg => {
          SdkManager_1.default.instance.getPlatform() || ToastManager_1.default.instance.show(msg, {
            gravity: "BOTTOM",
            bg_color: cc.color(102, 202, 28, 255)
          });
          if (DataManager_1.default.instance.status == Enum_1.ENUM_GAME_STATUS.RUNING) {
            DataManager_1.default.instance.status = Enum_1.ENUM_GAME_STATUS.UNRUNING;
            let clevel = DataManager_1.default.instance.clevel + 1;
            clevel = Math.min(clevel, DataManager_1.CLEVEL_Data.length);
            DataManager_1.default.instance.clevel = clevel;
            clevel > DataManager_1.default.instance.clevelMax && (DataManager_1.default.instance.clevelMax = clevel);
            DataManager_1.default.instance.save();
            StaticInstance_1.StaticInstance.transitionsManager.play(null, null, () => {
              StaticInstance_1.StaticInstance.gameManager.onGameLevelStart();
            });
          }
        }, msg => {
          ToastManager_1.default.instance.show(msg, {
            gravity: "BOTTOM",
            bg_color: cc.color(226, 69, 109, 255)
          });
        });
      }
    };
    MainLevelLayer = __decorate([ ccclass ], MainLevelLayer);
    exports.default = MainLevelLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../StaticInstance": "StaticInstance",
    "../manager/AudioManager": "AudioManager",
    "../manager/DataManager": "DataManager",
    "../manager/EventManager": "EventManager",
    "../manager/SdkManager": "SdkManager",
    "../manager/ToastManager": "ToastManager",
    "./Baselayer": "Baselayer"
  } ],
  MenuLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "94d9eW2z5xN9KXMq6SiqvtZ", "MenuLayer");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Enum_1 = require("../Enum");
    const StaticInstance_1 = require("./../StaticInstance");
    const AudioManager_1 = require("../manager/AudioManager");
    const SdkManager_1 = require("../manager/SdkManager");
    const ToastManager_1 = require("../manager/ToastManager");
    const HeaderLayer_1 = require("./HeaderLayer");
    const DataManager_1 = require("../manager/DataManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MenuLayer = class MenuLayer extends HeaderLayer_1.default {
      constructor() {
        super(...arguments);
        this.btnStartTimer = null;
        this.btnStartLevel = null;
        this.btnSetting = null;
        this.btnGames = null;
        this.btnShare = null;
        this.btnRank = null;
      }
      onLoad() {
        super.onLoad();
        this.btnStartTimer = cc.find("buttons/btn_start_timer", this.node);
        this.btnStartLevel = cc.find("buttons/btn_start_level", this.node);
        this.btnSetting = cc.find("right/btn_setting", this.node);
        this.btnShare = cc.find("right/btn_share", this.node);
        this.btnGames = cc.find("btn_more", this.node);
        this.btnStartTimer.on("click", this.onStartTimerClick, this);
        this.btnStartLevel.on("click", this.onStartLevelClick, this);
        this.btnSetting.on("click", this.onSettingClick, this);
        this.btnGames.on("click", this.onGamesClick, this);
        this.btnShare.on("click", this.onShareClick, this);
        this.btnRank = cc.find("buttons/btn_rank", this.node);
        this.btnRank.on("click", this.onRankClick, this);
      }
      onDestroy() {
        this.btnStartTimer.off("click", this.onStartTimerClick, this);
        this.btnStartLevel.off("click", this.onStartLevelClick, this);
        this.btnSetting.off("click", this.onSettingClick, this);
        this.btnGames.off("click", this.onGamesClick, this);
        this.btnShare.off("click", this.onShareClick, this);
        this.btnRank.off("click", this.onRankClick, this);
      }
      onEnable() {
        this.rendorKeys();
        this.rendorPower();
        this.rendorPowerTimer();
      }
      onDisable() {}
      onStartTimerClick() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        if (DataManager_1.default.instance.power <= 0) {
          ToastManager_1.default.instance.show("\u80fd\u91cf\u5df2\u7528\u5b8c, \u8bf7\u5148\u8865\u5145\u80fd\u91cf", {
            gravity: "TOP",
            bg_color: cc.color(226, 69, 109, 255)
          });
          return;
        }
        DataManager_1.default.instance.mode = Enum_1.ENUM_GAME_MODE.TIMER;
        DataManager_1.default.instance.power -= 1;
        DataManager_1.default.instance.save();
        StaticInstance_1.StaticInstance.transitionsManager.play(Enum_1.ENUM_UI_TYPE.MENU, Enum_1.ENUM_UI_TYPE.MAIN, () => {
          StaticInstance_1.StaticInstance.gameManager.onGameStart();
        });
      }
      onStartLevelClick() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        if (DataManager_1.default.instance.power <= 0) {
          ToastManager_1.default.instance.show("\u80fd\u91cf\u5df2\u7528\u5b8c, \u8bf7\u5148\u8865\u5145\u80fd\u91cf", {
            gravity: "TOP",
            bg_color: cc.color(226, 69, 109, 255)
          });
          return;
        }
        DataManager_1.default.instance.mode = Enum_1.ENUM_GAME_MODE.LEVEL;
        DataManager_1.default.instance.power -= 1;
        DataManager_1.default.instance.save();
        StaticInstance_1.StaticInstance.transitionsManager.play(Enum_1.ENUM_UI_TYPE.MENU, Enum_1.ENUM_UI_TYPE.MAIN_LEVEL, () => {
          StaticInstance_1.StaticInstance.gameManager.onGameLevelStart();
        });
      }
      onSettingClick() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.MENU, false);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SETTING);
      }
      onGamesClick() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.MENU, false);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.MORE);
      }
      onShareClick() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        SdkManager_1.default.instance.getPlatform() ? SdkManager_1.default.instance.activeShare() : ToastManager_1.default.instance.show("\u4ec5\u652f\u6301\u5c0f\u6e38\u620f\u5e73\u53f0", {
          gravity: "TOP",
          bg_color: cc.color(226, 69, 109, 255)
        });
      }
      onRankClick() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.MENU, false);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.RANK);
      }
    };
    MenuLayer = __decorate([ ccclass ], MenuLayer);
    exports.default = MenuLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../manager/AudioManager": "AudioManager",
    "../manager/DataManager": "DataManager",
    "../manager/SdkManager": "SdkManager",
    "../manager/ToastManager": "ToastManager",
    "./../StaticInstance": "StaticInstance",
    "./HeaderLayer": "HeaderLayer"
  } ],
  MoreLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9152a3E4wFB0JCSs+5/fMuT", "MoreLayer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enum_1 = require("../Enum");
    var StaticInstance_1 = require("./../StaticInstance");
    var AudioManager_1 = require("../manager/AudioManager");
    var Baselayer_1 = require("./Baselayer");
    var DataManager_1 = require("../manager/DataManager");
    var PoolManager_1 = require("../manager/PoolManager");
    var UIScrollControl_1 = require("../plugins/UIScrollControl");
    var ResourceManager_1 = require("../manager/ResourceManager");
    var SdkManager_1 = require("../manager/SdkManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MoreLayer = function(_super) {
      __extends(MoreLayer, _super);
      function MoreLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.panel = null;
        _this.btnClose = null;
        _this.scrollNode = null;
        _this.scrollItem = null;
        return _this;
      }
      MoreLayer.prototype.onLoad = function() {
        this.panel = cc.find("style/panel", this.node);
        this.btnClose = cc.find("btn_close", this.panel);
        this.scrollNode = cc.find("scroll", this.panel);
        this.scrollItem = PoolManager_1.default.instance.getNode("MoreItem");
        this.btnClose.on("click", this.onCloseClick, this);
      };
      MoreLayer.prototype.onDestroy = function() {
        this.btnClose.off("click", this.onCloseClick, this);
      };
      MoreLayer.prototype.onEnable = function() {
        this.zoomIn(this.panel);
        this.rendor();
        SdkManager_1.default.instance.toggleCustomRowAd(true);
      };
      MoreLayer.prototype.onDisable = function() {
        SdkManager_1.default.instance.toggleCustomRowAd(false);
      };
      MoreLayer.prototype.rendor = function() {
        var _this = this;
        var games = DataManager_1.default.instance.games;
        var isScrollToTop = false;
        this.scrollNode.getComponent(UIScrollControl_1.default).init(this.scrollItem, games.length, cc.size(500, 110), 0, function(node, index) {
          if (!isScrollToTop) {
            isScrollToTop = true;
            _this.scrollNode.getComponent(cc.ScrollView).scrollToTop();
          }
          var game = games[index];
          node.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = ResourceManager_1.default.instance.getSprite("" + game.icon);
          node.getChildByName("title").getComponent(cc.Label).string = "" + game.title;
          if (node.hasEventListener("click")) {
            node.off("click");
            node.on("click", function() {
              _this.onItemClick(game);
            }, _this);
          } else node.on("click", function() {
            _this.onItemClick(game);
          }, _this);
        }, function(scroll) {
          scroll.scrollToTop();
        });
      };
      MoreLayer.prototype.onItemClick = function(item) {
        var url = "";
        if ("undefined" == typeof window["wx"]) url = item.url; else {
          AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
          url = item.appid;
        }
        url && SdkManager_1.default.instance.turnToApp(url);
      };
      MoreLayer.prototype.onCloseClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.MORE, false);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.MENU);
      };
      MoreLayer = __decorate([ ccclass ], MoreLayer);
      return MoreLayer;
    }(Baselayer_1.default);
    exports.default = MoreLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../manager/AudioManager": "AudioManager",
    "../manager/DataManager": "DataManager",
    "../manager/PoolManager": "PoolManager",
    "../manager/ResourceManager": "ResourceManager",
    "../manager/SdkManager": "SdkManager",
    "../plugins/UIScrollControl": "UIScrollControl",
    "./../StaticInstance": "StaticInstance",
    "./Baselayer": "Baselayer"
  } ],
  OverLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b601bhCGWNK+ZoaczgoGYv3", "OverLayer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enum_1 = require("../Enum");
    var StaticInstance_1 = require("./../StaticInstance");
    var AudioManager_1 = require("../manager/AudioManager");
    var SdkManager_1 = require("../manager/SdkManager");
    var ToastManager_1 = require("../manager/ToastManager");
    var DataManager_1 = require("../manager/DataManager");
    var Utils_1 = require("../Utils");
    var HeaderLayer_1 = require("./HeaderLayer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var OverLayer = function(_super) {
      __extends(OverLayer, _super);
      function OverLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.panel = null;
        _this.btnRestart = null;
        _this.btnShare = null;
        _this.scoreNode = null;
        _this.noticeNode = null;
        _this.particles = null;
        _this.btnClose = null;
        return _this;
      }
      OverLayer.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.panel = cc.find("style/panel", this.node);
        this.btnRestart = cc.find("buttons/btn_restart", this.panel);
        this.btnShare = cc.find("buttons/btn_share", this.panel);
        this.btnRestart.on("click", this.onRestartClick, this);
        this.btnShare.on("click", this.onShareClick, this);
        this.scoreNode = cc.find("score", this.panel);
        this.noticeNode = cc.find("notice", this.panel);
        this.particles = cc.find("particles", this.panel);
        this.btnClose = cc.find("btn_close", this.panel);
        this.btnClose.on("click", this.onCloseClick, this);
      };
      OverLayer.prototype.onDestroy = function() {
        this.btnRestart.off("click", this.onRestartClick, this);
        this.btnShare.off("click", this.onShareClick, this);
        this.btnClose.off("click", this.onCloseClick, this);
      };
      OverLayer.prototype.onEnable = function() {
        this.zoomIn(this.panel);
        SdkManager_1.default.instance.toggleBannerAd(true);
        StaticInstance_1.StaticInstance.uiManager.setMainTimer(false);
        this.rendorKeys();
        this.rendorPower();
        this.rendorPowerTimer();
        this.rendorScore();
      };
      OverLayer.prototype.onDisable = function() {
        SdkManager_1.default.instance.toggleBannerAd(false);
      };
      OverLayer.prototype.rendorScore = function() {
        this.scoreNode.getComponent(cc.Label).string = "" + Utils_1.formatSeconds(DataManager_1.default.instance.seconds, "h:i:s");
        if (DataManager_1.default.instance.seconds < DataManager_1.default.instance.secondsRecord) {
          DataManager_1.default.instance.secondsRecord = DataManager_1.default.instance.seconds;
          DataManager_1.default.instance.save();
          SdkManager_1.default.instance.setRank(DataManager_1.default.instance.secondsRecord);
          this.noticeNode.active = true;
          this.particles.children.forEach(function(node) {
            node.getComponent(cc.ParticleSystem).resetSystem();
          });
        } else this.noticeNode.active = false;
      };
      OverLayer.prototype.onRestartClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        StaticInstance_1.StaticInstance.transitionsManager.play(Enum_1.ENUM_UI_TYPE.OVER, null, function() {
          StaticInstance_1.StaticInstance.gameManager.onGameStart();
        });
      };
      OverLayer.prototype.onShareClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        SdkManager_1.default.instance.getPlatform() ? SdkManager_1.default.instance.activeShare() : ToastManager_1.default.instance.show("\u4ec5\u652f\u6301\u5c0f\u6e38\u620f\u5e73\u53f0", {
          gravity: "TOP",
          bg_color: cc.color(226, 69, 109, 255)
        });
      };
      OverLayer.prototype.onCloseClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.MAIN, false);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.OVER, false);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.MENU);
      };
      OverLayer = __decorate([ ccclass ], OverLayer);
      return OverLayer;
    }(HeaderLayer_1.default);
    exports.default = OverLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../Utils": "Utils",
    "../manager/AudioManager": "AudioManager",
    "../manager/DataManager": "DataManager",
    "../manager/SdkManager": "SdkManager",
    "../manager/ToastManager": "ToastManager",
    "./../StaticInstance": "StaticInstance",
    "./HeaderLayer": "HeaderLayer"
  } ],
  PoolManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a46f4A6CpBE04BZI8Amk1vE", "PoolManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PoolManager = function() {
      function PoolManager() {
        this._dictPool = {};
        this._dictPrefab = {};
      }
      PoolManager.getInstance = function() {
        null === this._instance && (this._instance = new this());
        return this._instance;
      };
      Object.defineProperty(PoolManager, "instance", {
        get: function() {
          return this.getInstance();
        },
        enumerable: false,
        configurable: true
      });
      PoolManager.prototype.copyNode = function(copynode, parent) {
        var name = copynode.name;
        this._dictPrefab[name] = copynode;
        var node = null;
        if (this._dictPool.hasOwnProperty(name)) {
          var pool = this._dictPool[name];
          node = pool.size() > 0 ? pool.get() : cc.instantiate(copynode);
        } else {
          var pool = new cc.NodePool();
          this._dictPool[name] = pool;
          node = cc.instantiate(copynode);
        }
        if (parent) {
          node.parent = parent;
          node.active = true;
        }
        return node;
      };
      PoolManager.prototype.getNode = function(prefab, parent, pos) {
        var tempPre;
        var name;
        if ("string" === typeof prefab) {
          tempPre = this._dictPrefab[prefab];
          name = prefab;
          if (!tempPre) {
            console.log("Pool invalid prefab name = ", name);
            return null;
          }
        } else {
          tempPre = prefab;
          name = prefab.data.name;
        }
        var node = null;
        if (this._dictPool.hasOwnProperty(name)) {
          var pool = this._dictPool[name];
          node = pool.size() > 0 ? pool.get() : cc.instantiate(tempPre);
        } else {
          var pool = new cc.NodePool();
          this._dictPool[name] = pool;
          node = cc.instantiate(tempPre);
        }
        if (parent) {
          node.parent = parent;
          node.active = true;
          pos && (node.position = pos);
        }
        return node;
      };
      PoolManager.prototype.putNode = function(node, isActive) {
        void 0 === isActive && (isActive = false);
        if (!node) return;
        var name = node.name;
        var pool = null;
        if (this._dictPool.hasOwnProperty(name)) pool = this._dictPool[name]; else {
          pool = new cc.NodePool();
          this._dictPool[name] = pool;
        }
        pool.put(node);
      };
      PoolManager.prototype.clearPool = function(name) {
        if (this._dictPool.hasOwnProperty(name)) {
          var pool = this._dictPool[name];
          pool.clear();
        }
      };
      PoolManager.prototype.setPrefab = function(name, prefab) {
        this._dictPrefab[name] = prefab;
      };
      PoolManager.prototype.getPrefab = function(name) {
        return this._dictPrefab[name];
      };
      PoolManager._instance = null;
      return PoolManager;
    }();
    exports.default = PoolManager;
    cc._RF.pop();
  }, {} ],
  RankLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "108f1JDJNpC3oswOrUOz57p", "RankLayer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enum_1 = require("../Enum");
    var Baselayer_1 = require("./Baselayer");
    var AudioManager_1 = require("../manager/AudioManager");
    var SdkManager_1 = require("../manager/SdkManager");
    var StaticInstance_1 = require("./../StaticInstance");
    var ToastManager_1 = require("../manager/ToastManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var RankLayer = function(_super) {
      __extends(RankLayer, _super);
      function RankLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.panel = null;
        _this.btnClose = null;
        _this.btnShare = null;
        return _this;
      }
      RankLayer.prototype.onLoad = function() {
        this.panel = cc.find("style/panel", this.node);
        this.btnClose = cc.find("btn_close", this.panel);
        this.btnShare = cc.find("btn_share", this.panel);
        this.btnClose.on("click", this.onCloseClick, this);
        this.btnShare.on("click", this.onShareClick, this);
      };
      RankLayer.prototype.onDestroy = function() {
        this.btnClose.off("click", this.onCloseClick, this);
        this.btnShare.off("click", this.onShareClick, this);
      };
      RankLayer.prototype.onEnable = function() {
        this.zoomIn(this.panel);
        SdkManager_1.default.instance.getRank();
        SdkManager_1.default.instance.showInterstitialAd();
      };
      RankLayer.prototype.onDisable = function() {};
      RankLayer.prototype.onCloseClick = function(e) {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.RANK, false);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.MENU);
      };
      RankLayer.prototype.onShareClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        SdkManager_1.default.instance.getPlatform() ? SdkManager_1.default.instance.activeShare() : ToastManager_1.default.instance.show("\u4ec5\u652f\u6301\u5c0f\u6e38\u620f\u5e73\u53f0", {
          gravity: "TOP",
          bg_color: cc.color(226, 69, 109, 255)
        });
      };
      RankLayer = __decorate([ ccclass ], RankLayer);
      return RankLayer;
    }(Baselayer_1.default);
    exports.default = RankLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../manager/AudioManager": "AudioManager",
    "../manager/SdkManager": "SdkManager",
    "../manager/ToastManager": "ToastManager",
    "./../StaticInstance": "StaticInstance",
    "./Baselayer": "Baselayer"
  } ],
  ResourceManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ab2a6CEvxhMQ77c3CMn4zMe", "ResourceManager");
    "use strict";
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DataManager_1 = require("./DataManager");
    var PoolManager_1 = require("./PoolManager");
    var ResourceManager = function() {
      function ResourceManager() {
        this.clipMap = {};
        this.spriteMap = {};
        this.jsonMap = {};
      }
      ResourceManager.getInstance = function() {
        null === this._instance && (this._instance = new this());
        return this._instance;
      };
      Object.defineProperty(ResourceManager, "instance", {
        get: function() {
          return this.getInstance();
        },
        enumerable: false,
        configurable: true
      });
      ResourceManager.prototype.loadRes = function(resource, ratio) {
        void 0 === ratio && (ratio = 0);
        return __awaiter(this, void 0, void 0, function() {
          var _this = this;
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(resolve, reject) {
              var rate = DataManager_1.default.instance.loadingRate;
              cc.resources.loadDir(resource.path, resource.content, function(finished, total) {
                if (resource.ratio > 0) {
                  var loadingRate = Math.floor(100 * (rate + resource.ratio * finished / total)) / 100;
                  DataManager_1.default.instance.loadingRate = Math.max(loadingRate, DataManager_1.default.instance.loadingRate);
                }
              }, function(err, assets) {
                err && reject && reject();
                var asset;
                if ("audio" == resource.type) for (var i = 0; i < assets.length; i++) {
                  asset = assets[i];
                  _this.clipMap[asset.name] || (_this.clipMap[asset.name] = asset);
                }
                if ("prefab" == resource.type) for (var i = 0; i < assets.length; i++) {
                  asset = assets[i];
                  PoolManager_1.default.instance.setPrefab(asset.data.name, asset);
                }
                if ("sprite" == resource.type) for (var i = 0; i < assets.length; i++) {
                  asset = assets[i];
                  _this.spriteMap[asset.name] || (_this.spriteMap[asset.name] = asset);
                }
                if ("json" == resource.type) for (var i = 0; i < assets.length; i++) {
                  asset = assets[i];
                  _this.jsonMap[asset.name] || (_this.jsonMap[asset.name] = asset.json);
                }
                resolve && resolve();
              });
            }) ];
          });
        });
      };
      ResourceManager.prototype.getClip = function(name) {
        return this.clipMap[name];
      };
      ResourceManager.prototype.getSprite = function(name) {
        return this.spriteMap[name];
      };
      ResourceManager.prototype.getJson = function(name) {
        return this.jsonMap[name];
      };
      ResourceManager._instance = null;
      return ResourceManager;
    }();
    exports.default = ResourceManager;
    cc._RF.pop();
  }, {
    "./DataManager": "DataManager",
    "./PoolManager": "PoolManager"
  } ],
  SdkManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "63001T9hINHxKQXF9QDpdaI", "SdkManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AudioManager_1 = require("./AudioManager");
    var SdkManager = function() {
      function SdkManager() {
        this.shareTitle = "\u597d\u73a9\u4e0a\u5934\u7684\u6e38\u620f\uff0c\u4f60\u6562\u63a5\u53d7\u6311\u6218\u5417\uff1f";
        this.shareImg = "https://download.cocos.com/CocosStore/icon/c37196c9605d453798e9592204329c75/c37196c9605d453798e9592204329c75.png";
        this.videoId = "";
        this.videoAd = null;
        this.interstitialId = "";
        this.interstitialAd = null;
        this.bannerId = "";
        this.bannerAd = null;
        this.customRowId = "";
        this.customRowAd = null;
        this.customColId = "";
        this.customColAd = null;
      }
      Object.defineProperty(SdkManager, "instance", {
        get: function() {
          null == this._instance && (this._instance = new SdkManager());
          return this._instance;
        },
        enumerable: false,
        configurable: true
      });
      SdkManager.prototype.getPlatform = function() {
        var platform = null;
        cc.sys.platform == cc.sys.WECHAT_GAME ? platform = window["wx"] : cc.sys.platform == cc.sys.BYTEDANCE_GAME && (platform = window["tt"]);
        return platform;
      };
      SdkManager.prototype.activeShare = function(options) {
        void 0 === options && (options = {
          title: "",
          imageUrl: "",
          query: ""
        });
        var platform = this.getPlatform();
        if (!platform) {
          console.log("\u3010\u4e3b\u52a8\u5206\u4eab\u3011\u4ec5\u652f\u6301\u5c0f\u6e38\u620f\u5e73\u53f0!");
          return;
        }
        options.title = options.title || this.shareTitle;
        options.imageUrl = options.imageUrl || this.shareImg;
        platform.shareAppMessage(options);
      };
      SdkManager.prototype.passiveShare = function(options) {
        void 0 === options && (options = {
          title: "",
          imageUrl: "",
          query: ""
        });
        var platform = this.getPlatform();
        if (!platform) {
          console.log("\u3010\u88ab\u52a8\u5206\u4eab\u3011\u4ec5\u652f\u6301\u5c0f\u6e38\u620f\u5e73\u53f0!");
          return;
        }
        platform.showShareMenu({
          success: function(res) {},
          fail: function(res) {}
        });
        options.title = options.title || this.shareTitle;
        options.imageUrl = options.imageUrl || this.shareImg;
        platform.onShareAppMessage(function() {
          return options;
        });
      };
      SdkManager.prototype.getShareQuery = function(key) {
        var platform = this.getPlatform();
        if (!platform) {
          console.log("\u3010\u5206\u4eab\u53c2\u6570\u83b7\u53d6\u3011\u4ec5\u652f\u6301\u5c0f\u6e38\u620f\u5e73\u53f0!");
          return;
        }
        var options = platform.getLaunchOptionsSync();
        var query = options.query;
        var data = null;
        query && query[key] && (data = query[key]);
        return data;
      };
      SdkManager.prototype.turnToApp = function(appId) {
        if ("" == appId) return;
        var platform = this.getPlatform();
        if (!platform) {
          this.turnToBrowser(appId);
          return;
        }
        platform.navigateToMiniProgram({
          appId: appId
        });
      };
      SdkManager.prototype.turnToBrowser = function(url) {
        window.open(url);
      };
      SdkManager.prototype.initAudioEndListener = function() {
        if ("undefined" === typeof window["wx"]) {
          console.log("\u3010\u97f3\u9891\u4e2d\u65ad\u76d1\u542c\u3011\u4ec5\u652f\u6301\u5fae\u4fe1\u5e73\u53f0!");
          return;
        }
        window["wx"].onAudioInterruptionEnd(function() {
          console.log("\u97f3\u9891\u4e2d\u65ad\uff0c\u6062\u590d\u64ad\u653e");
          AudioManager_1.default.instance.playMusic();
        });
      };
      SdkManager.prototype.initBannerAd = function() {
        var _this = this;
        var platform = this.getPlatform();
        if (!platform) {
          console.log("\u3010\u6d41\u91cf\u4e3b\u6a2a\u5e45\u521d\u59cb\u5316\u3011\u4ec5\u652f\u6301\u5c0f\u6e38\u620f\u5e73\u53f0!");
          return;
        }
        if ("" == this.bannerId) {
          console.log("\u3010\u6d41\u91cf\u4e3b\u3011\u8bf7\u914d\u7f6e\u6a2a\u5e45\u5e7f\u544aID");
          return;
        }
        var winSize = platform.getSystemInfoSync();
        if (null == this.bannerAd) {
          this.bannerAd = platform.createBannerAd({
            adUnitId: this.bannerId,
            adIntervals: 10,
            style: {
              height: winSize.windowHeight - 80,
              left: 0,
              top: 500,
              width: winSize.windowWidth
            }
          });
          this.bannerAd.onResize(function(res) {
            _this.bannerAd.style.top = winSize.windowHeight - _this.bannerAd.style.realHeight;
            _this.bannerAd.style.left = winSize.windowWidth / 2 - _this.bannerAd.style.realWidth / 2;
          });
          this.bannerAd.onError(function(err) {
            console.error("\u3010\u6d41\u91cf\u4e3b\u6a2a\u5e45\u3011\u521d\u59cb\u5316\u6709\u8bef");
          });
        }
      };
      SdkManager.prototype.toggleBannerAd = function(isShow) {
        var platform = this.getPlatform();
        if (!platform) {
          console.log("\u3010\u6d41\u91cf\u4e3b\u6a2a\u5e45:" + isShow + "\u3011\u4ec5\u652f\u6301\u5c0f\u6e38\u620f\u5e73\u53f0!");
          return;
        }
        this.bannerAd && (isShow ? this.bannerAd.show() : this.bannerAd.hide());
      };
      SdkManager.prototype.initInterstitialAd = function() {
        var platform = this.getPlatform();
        if (!platform) {
          console.log("\u3010\u6d41\u91cf\u4e3b\u63d2\u5c4f\u521d\u59cb\u5316\u3011\u4ec5\u652f\u6301\u5c0f\u6e38\u620f\u5e73\u53f0!");
          return;
        }
        if ("" == this.interstitialId) {
          console.log("\u3010\u6d41\u91cf\u4e3b\u3011\u8bf7\u914d\u7f6e\u63d2\u5c4f\u5e7f\u544aID");
          return;
        }
        if (null == this.interstitialAd) {
          this.interstitialAd = platform.createInterstitialAd({
            adUnitId: this.interstitialId
          });
          this.interstitialAd.onError(function(err) {
            console.error("\u3010\u6d41\u91cf\u4e3b\u63d2\u5c4f\u3011\u521d\u59cb\u5316\u6709\u8bef");
          });
        }
      };
      SdkManager.prototype.showInterstitialAd = function() {
        var platform = this.getPlatform();
        if (!platform) {
          console.log("\u3010\u6d41\u91cf\u4e3b\u63d2\u5c4f\u3011\u4ec5\u652f\u6301\u5c0f\u6e38\u620f\u5e73\u53f0!");
          return;
        }
        this.interstitialAd && this.interstitialAd.show().catch(function(err) {
          console.error("\u3010\u6d41\u91cf\u4e3b\u63d2\u5c4f\u3011\u52a0\u8f7d\u5931\u8d25");
        });
      };
      SdkManager.prototype.initVideoAd = function() {
        var platform = this.getPlatform();
        if (!platform) {
          console.log("\u3010\u6d41\u91cf\u4e3b\u6fc0\u52b1\u521d\u59cb\u5316\u3011\u4ec5\u652f\u6301\u5c0f\u6e38\u620f\u5e73\u53f0!");
          return;
        }
        if ("" == this.videoId) {
          console.log("\u3010\u6d41\u91cf\u4e3b\u3011\u8bf7\u914d\u7f6e\u6fc0\u52b1\u89c6\u9891\u5e7f\u544aID");
          return;
        }
        if (null == this.videoAd) {
          this.videoAd = platform.createRewardedVideoAd({
            adUnitId: this.videoId
          });
          this.videoAd.onError(function(err) {
            console.error("\u3010\u6d41\u91cf\u4e3b\u6fc0\u52b1\u3011\u521d\u59cb\u5316\u6709\u8bef");
          });
        }
      };
      SdkManager.prototype.showVideoAd = function(success, fail) {
        var _this = this;
        var platform = this.getPlatform();
        if (!platform) return success && success("\u6a21\u62df\u6210\u529f\uff0c\u6fc0\u52b1\u5956\u52b1\u5df2\u53d1\u653e");
        if (!this.videoAd) return fail && fail("\u8be5\u529f\u80fd\u5c1a\u672a\u5f00\u653e");
        this.videoAd.offClose();
        this.videoAd.onClose(function(res) {
          _this.videoAd.offClose();
          return res && res.isEnded || void 0 === res ? success && success("\u6fc0\u52b1\u5956\u52b1\u5df2\u53d1\u653e") : fail && fail("\u89c6\u9891\u64ad\u653e\u4e2d\u65ad");
        });
        this.videoAd.show().catch(function() {
          _this.videoAd.load().then(function() {
            return _this.videoAd.show();
          }).catch(function(err) {
            console.log("\u5e7f\u544a\u5c55\u793a\u5931\u8d25");
          });
        });
      };
      SdkManager.prototype.initCustomRowAd = function() {
        var platform = this.getPlatform();
        if (!platform) {
          console.log("\u3010\u6a2a\u5411\u683c\u5b50\u521d\u59cb\u5316\u3011\u4ec5\u652f\u6301\u5c0f\u6e38\u620f\u5e73\u53f0!");
          return;
        }
        if ("" == this.customRowId) {
          console.log("\u3010\u6d41\u91cf\u4e3b\u3011\u8bf7\u914d\u7f6e\u6a2a\u5411\u683c\u5b50\u5e7f\u544aID");
          return;
        }
        var winSize = platform.getSystemInfoSync();
        if (null == this.customRowAd) {
          this.customRowAd = platform.createCustomAd({
            adUnitId: this.customRowId,
            style: {
              width: 320,
              left: (winSize.screenWidth - 320) / 2,
              top: winSize.screenHeight - 50,
              fixed: 0
            }
          });
          this.customRowAd.onError(function(err) {
            console.error("\u3010\u6d41\u91cf\u4e3b\u6a2a\u5411\u683c\u5b50\u3011\u521d\u59cb\u5316\u6709\u8bef");
          });
        }
      };
      SdkManager.prototype.toggleCustomRowAd = function(isShow) {
        void 0 === isShow && (isShow = true);
        var platform = this.getPlatform();
        if (!platform) {
          console.log("\u3010\u6d41\u91cf\u4e3b\u6a2a\u5411\u683c\u5b50:" + isShow + "\u3011\u4ec5\u652f\u6301\u5c0f\u6e38\u620f\u5e73\u53f0!");
          return;
        }
        this.customRowAd && (isShow ? this.customRowAd.show() : this.customRowAd.hide());
      };
      SdkManager.prototype.initCustomColAd = function() {
        var platform = this.getPlatform();
        if (!platform) {
          console.log("\u3010\u7eb5\u5411\u683c\u5b50\u521d\u59cb\u5316\u3011\u4ec5\u652f\u6301\u5c0f\u6e38\u620f\u5e73\u53f0!");
          return;
        }
        if ("" == this.customColId) {
          console.log("\u3010\u6d41\u91cf\u4e3b\u3011\u8bf7\u914d\u7f6e\u7eb5\u5411\u683c\u5b50\u5e7f\u544aID");
          return;
        }
        var winSize = platform.getSystemInfoSync();
        if (null == this.customColAd) {
          this.customColAd = platform.createCustomAd({
            adUnitId: this.customColId,
            style: {
              width: 150,
              left: winSize.screenWidth - 75,
              top: (winSize.screenHeight - 380) / 2,
              fixed: 0
            }
          });
          this.customColAd.onError(function(err) {
            console.error("\u3010\u6d41\u91cf\u4e3b\u7eb5\u5411\u683c\u5b50\u3011\u521d\u59cb\u5316\u6709\u8bef");
          });
        }
      };
      SdkManager.prototype.toggleCustomColAd = function(isShow) {
        void 0 === isShow && (isShow = true);
        var platform = this.getPlatform();
        if (!platform) {
          console.log("\u3010\u6d41\u91cf\u4e3b\u7eb5\u5411\u683c\u5b50:" + isShow + "\u3011\u4ec5\u652f\u6301\u5c0f\u6e38\u620f\u5e73\u53f0!");
          return;
        }
        this.customColAd && (isShow ? this.customColAd.show() : this.customColAd.hide());
      };
      SdkManager.prototype.getRank = function() {
        if ("undefined" === typeof window["wx"]) {
          console.log("\u3010\u83b7\u53d6\u6392\u540d\u3011\u4ec5\u652f\u6301\u5fae\u4fe1\u5e73\u53f0!");
          return;
        }
        window["wx"].postMessage({
          event: "getRank"
        });
      };
      SdkManager.prototype.setRank = function(data) {
        if ("undefined" === typeof window["wx"]) {
          console.log("\u3010\u8bbe\u7f6e\u6392\u540d\u3011\u4ec5\u652f\u6301\u5fae\u4fe1\u5e73\u53f0!", data);
          return;
        }
        window["wx"].postMessage({
          event: "setRank",
          data: data
        });
      };
      SdkManager._instance = null;
      return SdkManager;
    }();
    exports.default = SdkManager;
    cc._RF.pop();
  }, {
    "./AudioManager": "AudioManager"
  } ],
  SettingLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1a0aacxZX5NJqNTuBy0vbq5", "SettingLayer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enum_1 = require("../Enum");
    var StaticInstance_1 = require("./../StaticInstance");
    var AudioManager_1 = require("../manager/AudioManager");
    var DataManager_1 = require("../manager/DataManager");
    var SdkManager_1 = require("../manager/SdkManager");
    var BaseLanguageLayer_1 = require("./BaseLanguageLayer");
    var SpriteManager_1 = require("../manager/SpriteManager");
    var Languages_1 = require("../Languages");
    var BaseItem_1 = require("./BaseItem");
    var EventManager_1 = require("../manager/EventManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var YuYanItem = function(_super) {
      __extends(YuYanItem, _super);
      function YuYanItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.nowData = null;
        return _this;
      }
      YuYanItem.prototype.init = function() {
        this.label = this.node.getChildByName("label").getComponent(cc.Label);
        this.onTouch(this.node, this.onTouchNode, this);
      };
      YuYanItem.prototype.setData = function(data) {
        this.nowData = data;
        this.label.string = Languages_1.Languages[this.nowData][DataManager_1.default.instance.language];
      };
      YuYanItem.prototype.onTouchNode = function() {
        DataManager_1.default.instance.language = Languages_1.LanguageType[this.nowData];
        EventManager_1.default.instance.emit(EventManager_1.EventType.UPDATE_LANGUAGE);
      };
      return YuYanItem;
    }(BaseItem_1.default);
    var SettingLayer = function(_super) {
      __extends(SettingLayer, _super);
      function SettingLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.panel = null;
        _this.btnMusic = null;
        _this.btnSound = null;
        _this.btnClose = null;
        _this.btnLanguage = null;
        _this.content = null;
        _this.nowLanguage = null;
        _this.yuyanItem = null;
        return _this;
      }
      SettingLayer.prototype.show = function() {
        _super.prototype.show.call(this);
        this.CreateListItem(this.content, this.yuyanItem, Object.keys(Languages_1.LanguageType), YuYanItem);
      };
      SettingLayer.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.panel = cc.find("style/panel", this.node);
        this.btnMusic = cc.find("buttons/btn_music", this.panel);
        this.btnSound = cc.find("buttons/btn_sound", this.panel);
        this.btnClose = cc.find("btn_close", this.panel);
        this.btnLanguage = cc.find("btnyuyan", this.panel);
        this.content = cc.find("content", this.btnLanguage);
        this.yuyanItem = cc.find("yuyanItem", this.node);
        this.nowLanguage = cc.find("nowyuyan", this.btnLanguage).getComponent(cc.Label);
        this.btnMusic.on("click", this.onMusicClick, this);
        this.btnSound.on("click", this.onSoundClick, this);
        this.btnClose.on("click", this.onCloseClick, this);
        this.onTouch(this.btnLanguage, this.onLanguageClick, this);
      };
      SettingLayer.prototype.onDestroy = function() {
        _super.prototype.onDestroy.call(this);
        this.btnMusic.off("click", this.onMusicClick, this);
        this.btnSound.off("click", this.onSoundClick, this);
        this.btnClose.off("click", this.onCloseClick, this);
      };
      SettingLayer.prototype.onEnable = function() {
        this.zoomIn(this.panel);
        this.rendorMusic();
        this.rendorSound();
        this.content.active = false;
        this.updateNowLanguageLabel();
        SdkManager_1.default.instance.showInterstitialAd();
      };
      SettingLayer.prototype.updateNowLanguageLabel = function() {};
      SettingLayer.prototype.onDisable = function() {};
      SettingLayer.prototype.onCloseClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SETTING, false);
      };
      SettingLayer.prototype.onLanguageClick = function() {
        this.content.active ? this.content.active = false : this.content.active = true;
      };
      SettingLayer.prototype.onSoundClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        DataManager_1.default.instance.isSoundOn = !DataManager_1.default.instance.isSoundOn;
        DataManager_1.default.instance.save();
        this.rendorSound();
      };
      SettingLayer.prototype.onMusicClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        DataManager_1.default.instance.isMusicOn = !DataManager_1.default.instance.isMusicOn;
        DataManager_1.default.instance.save();
        DataManager_1.default.instance.isMusicOn ? AudioManager_1.default.instance.playMusic() : AudioManager_1.default.instance.stopMusic();
        this.rendorMusic();
      };
      SettingLayer.prototype.rendorMusic = function() {
        var index = DataManager_1.default.instance.isMusicOn ? 1 : 0;
        this.btnMusic.getComponent(cc.Sprite).spriteFrame = SpriteManager_1.default.settingBtn[index];
      };
      SettingLayer.prototype.rendorSound = function() {
        var index = DataManager_1.default.instance.isSoundOn ? 1 : 0;
        this.btnSound.getComponent(cc.Sprite).spriteFrame = SpriteManager_1.default.settingBtn[index];
      };
      SettingLayer = __decorate([ ccclass ], SettingLayer);
      return SettingLayer;
    }(BaseLanguageLayer_1.default);
    exports.default = SettingLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../Languages": "Languages",
    "../manager/AudioManager": "AudioManager",
    "../manager/DataManager": "DataManager",
    "../manager/EventManager": "EventManager",
    "../manager/SdkManager": "SdkManager",
    "../manager/SpriteManager": "SpriteManager",
    "./../StaticInstance": "StaticInstance",
    "./BaseItem": "BaseItem",
    "./BaseLanguageLayer": "BaseLanguageLayer"
  } ],
  ShareLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8fb3aej0pxDhr60pqe0C2Pq", "ShareLayer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseLanguageLayer_1 = require("./BaseLanguageLayer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ShareLayer = function(_super) {
      __extends(ShareLayer, _super);
      function ShareLayer() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ShareLayer = __decorate([ ccclass ], ShareLayer);
      return ShareLayer;
    }(BaseLanguageLayer_1.default);
    exports.default = ShareLayer;
    cc._RF.pop();
  }, {
    "./BaseLanguageLayer": "BaseLanguageLayer"
  } ],
  ShopLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6b845r7cBVDKbEcqAjQD/ed", "ShopLayer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseLanguageLayer_1 = require("./BaseLanguageLayer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ShopLayer = function(_super) {
      __extends(ShopLayer, _super);
      function ShopLayer() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ShopLayer = __decorate([ ccclass ], ShopLayer);
      return ShopLayer;
    }(BaseLanguageLayer_1.default);
    exports.default = ShopLayer;
    cc._RF.pop();
  }, {
    "./BaseLanguageLayer": "BaseLanguageLayer"
  } ],
  SkillSubmitLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6b418F4XphICoiUh3ydxQ2P", "SkillSubmitLayer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enum_1 = require("../Enum");
    var StaticInstance_1 = require("./../StaticInstance");
    var AudioManager_1 = require("../manager/AudioManager");
    var SdkManager_1 = require("../manager/SdkManager");
    var DataManager_1 = require("../manager/DataManager");
    var HeaderLayer_1 = require("./HeaderLayer");
    var ToastManager_1 = require("../manager/ToastManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SkillSubmitLayer = function(_super) {
      __extends(SkillSubmitLayer, _super);
      function SkillSubmitLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.style = null;
        _this.btnSubmit = null;
        _this.btnClose = null;
        return _this;
      }
      SkillSubmitLayer.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.style = cc.find("style", this.node);
      };
      SkillSubmitLayer.prototype.onDestroy = function() {};
      SkillSubmitLayer.prototype.onEnable = function() {
        SdkManager_1.default.instance.showInterstitialAd();
        this.rendorPower();
        this.rendorPowerTimer();
        this.rendorKeys();
        this.rendorPanel();
      };
      SkillSubmitLayer.prototype.onDisable = function() {};
      SkillSubmitLayer.prototype.rendorPanel = function() {
        var panel = null;
        this.style.children.forEach(function(node, index) {
          index == DataManager_1.default.instance.skillIndex && (panel = node);
          node.active = index == DataManager_1.default.instance.skillIndex;
        });
        this.zoomIn(panel);
        var btnClose = panel.getChildByName("btn_close");
        var btnSubmit = panel.getChildByName("btn_submit");
        btnClose.hasEventListener("click") || btnClose.on("click", this.onCloseClick, this);
        var keys = 0;
        DataManager_1.default.instance.skillIndex > 1 && (keys = 1);
        btnSubmit.getChildByName("icon_key").active = !(DataManager_1.default.instance.keys <= keys);
        btnSubmit.getChildByName("icon_video").active = DataManager_1.default.instance.keys <= keys;
        btnSubmit.hasEventListener("click") || btnSubmit.on("click", this.onSubmitClick, this);
      };
      SkillSubmitLayer.prototype.onCloseClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        StaticInstance_1.StaticInstance.uiManager.setMainTimer();
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SKILL_SUBMIT, false);
      };
      SkillSubmitLayer.prototype.onSubmitClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        var keys = 0;
        DataManager_1.default.instance.skillIndex > 1 && (keys = 1);
        if (DataManager_1.default.instance.keys <= keys) SdkManager_1.default.instance.showVideoAd(function(msg) {
          SdkManager_1.default.instance.getPlatform() || ToastManager_1.default.instance.show(msg, {
            gravity: "TOP",
            bg_color: cc.color(102, 202, 28, 255)
          });
          DataManager_1.default.instance.isSkilling = true;
          StaticInstance_1.StaticInstance.uiManager.setMainSkillTip();
          StaticInstance_1.StaticInstance.uiManager.setMainTimer(true);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SKILL_SUBMIT, false);
        }, function(msg) {
          ToastManager_1.default.instance.show(msg, {
            gravity: "TOP",
            bg_color: cc.color(226, 69, 109, 255)
          });
        }); else {
          DataManager_1.default.instance.keys -= keys + 1;
          DataManager_1.default.instance.isSkilling = true;
          StaticInstance_1.StaticInstance.uiManager.setMainSkillTip();
          StaticInstance_1.StaticInstance.uiManager.setMainTimer(true);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SKILL_SUBMIT, false);
        }
      };
      SkillSubmitLayer = __decorate([ ccclass ], SkillSubmitLayer);
      return SkillSubmitLayer;
    }(HeaderLayer_1.default);
    exports.default = SkillSubmitLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../manager/AudioManager": "AudioManager",
    "../manager/DataManager": "DataManager",
    "../manager/SdkManager": "SdkManager",
    "../manager/ToastManager": "ToastManager",
    "./../StaticInstance": "StaticInstance",
    "./HeaderLayer": "HeaderLayer"
  } ],
  SpriteManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "826femr6oROUaBxp5MqX4YO", "SpriteManager");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SpriteManager = function(_super) {
      __extends(SpriteManager, _super);
      function SpriteManager() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.modelSpriteFrame = [];
        _this.taskIconSprite = [];
        _this.shopIconSprite = [];
        _this.shareIconSprite = [];
        _this.custemPuSprite = [];
        _this.custemTZSprite = [];
        _this.settingBtnSprite = [];
        return _this;
      }
      SpriteManager_1 = SpriteManager;
      SpriteManager.prototype.onLoad = function() {
        SpriteManager_1.ModelSprite = this.modelSpriteFrame;
        SpriteManager_1.taskIcon = this.taskIconSprite;
        SpriteManager_1.shopIcon = this.shopIconSprite;
        SpriteManager_1.shareIcon = this.shareIconSprite;
        SpriteManager_1.custemIcon = this.custemPuSprite;
        SpriteManager_1.custemTZIcon = this.custemTZSprite;
        SpriteManager_1.settingBtn = this.settingBtnSprite;
      };
      SpriteManager.prototype.start = function() {};
      var SpriteManager_1;
      SpriteManager.ModelSprite = [];
      SpriteManager.taskIcon = [];
      SpriteManager.shopIcon = [];
      SpriteManager.shareIcon = [];
      SpriteManager.custemIcon = [];
      SpriteManager.custemTZIcon = [];
      SpriteManager.settingBtn = [];
      __decorate([ property(cc.SpriteFrame) ], SpriteManager.prototype, "modelSpriteFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], SpriteManager.prototype, "taskIconSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], SpriteManager.prototype, "shopIconSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], SpriteManager.prototype, "shareIconSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], SpriteManager.prototype, "custemPuSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], SpriteManager.prototype, "custemTZSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], SpriteManager.prototype, "settingBtnSprite", void 0);
      SpriteManager = SpriteManager_1 = __decorate([ ccclass ], SpriteManager);
      return SpriteManager;
    }(cc.Component);
    exports.default = SpriteManager;
    cc._RF.pop();
  }, {} ],
  StaticInstance: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "93f9fIyowFCpoTxHvXyssyM", "StaticInstance");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.StaticInstance = void 0;
    var StaticInstance = function() {
      function StaticInstance() {}
      StaticInstance.setUIManager = function(context) {
        StaticInstance.uiManager = context;
      };
      StaticInstance.setGameManager = function(context) {
        StaticInstance.gameManager = context;
      };
      StaticInstance.setTransitionManager = function(context) {
        StaticInstance.transitionsManager = context;
      };
      StaticInstance.uiManager = void 0;
      StaticInstance.gameManager = void 0;
      StaticInstance.transitionsManager = void 0;
      return StaticInstance;
    }();
    exports.StaticInstance = StaticInstance;
    cc._RF.pop();
  }, {} ],
  TaskLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "75163iDN8VFSIf/EV7f+UiQ", "TaskLayer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseLanguageLayer_1 = require("./BaseLanguageLayer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TaskLayer = function(_super) {
      __extends(TaskLayer, _super);
      function TaskLayer() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      TaskLayer = __decorate([ ccclass ], TaskLayer);
      return TaskLayer;
    }(BaseLanguageLayer_1.default);
    exports.default = TaskLayer;
    cc._RF.pop();
  }, {
    "./BaseLanguageLayer": "BaseLanguageLayer"
  } ],
  ToastManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "65526wGEY1OtL0HXs6ylAE2", "ToastManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ToastManager = function() {
      function ToastManager() {}
      ToastManager.getInstance = function() {
        null === this._instance && (this._instance = new this());
        return this._instance;
      };
      Object.defineProperty(ToastManager, "instance", {
        get: function() {
          return this.getInstance();
        },
        enumerable: false,
        configurable: true
      });
      ToastManager.prototype.show = function(text, _a) {
        void 0 === text && (text = "");
        var _b = void 0 === _a ? {} : _a, _c = _b.gravity, gravity = void 0 === _c ? "CENTER" : _c, _d = _b.duration, duration = void 0 === _d ? 1 : _d, _e = _b.bg_color, bg_color = void 0 === _e ? cc.color(102, 102, 102, 200) : _e;
        var canvas = cc.director.getScene().getComponentInChildren(cc.Canvas);
        var width = canvas.node.width;
        var height = canvas.node.height;
        var bgNode = new cc.Node();
        bgNode.group = "ui";
        var textNode = new cc.Node();
        var textLabel = textNode.addComponent(cc.Label);
        textLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        textLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        textLabel.fontSize = 30;
        textLabel.string = text;
        if (text.length * textLabel.fontSize > 3 * width / 5) {
          textNode.width = 3 * width / 5;
          textLabel.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
        } else textNode.width = text.length * textLabel.fontSize;
        var lineCount = 1 + ~~(text.length * textLabel.fontSize / (3 * width / 5));
        textNode.height = textLabel.fontSize * lineCount;
        var ctx = bgNode.addComponent(cc.Graphics);
        ctx.arc(-textNode.width / 2, 0, textNode.height / 2 + 20, .5 * Math.PI, 1.5 * Math.PI, true);
        ctx.lineTo(textNode.width / 2, -(textNode.height / 2 + 20));
        ctx.arc(textNode.width / 2, 0, textNode.height / 2 + 20, 1.5 * Math.PI, .5 * Math.PI, true);
        ctx.lineTo(-textNode.width / 2, textNode.height / 2 + 20);
        ctx.fillColor = bg_color;
        ctx.fill();
        bgNode.addChild(textNode);
        if ("CENTER" === gravity) {
          bgNode.y = 0;
          bgNode.x = 0;
        } else "TOP" === gravity ? bgNode.y = bgNode.y + height / 5 * 2 : "BOTTOM" === gravity && (bgNode.y = bgNode.y - height / 5 * 2);
        canvas.node.addChild(bgNode);
        var finished = cc.callFunc(function() {
          bgNode.destroy();
        });
        var action = cc.sequence(cc.moveBy(duration, cc.v2(0, 0)), cc.fadeOut(.3), finished);
        cc.tween(bgNode).then(action).start();
      };
      ToastManager._instance = null;
      return ToastManager;
    }();
    exports.default = ToastManager;
    cc._RF.pop();
  }, {} ],
  UIManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d8b44067ShG7IzfSj2CqGMD", "UIManager");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enum_1 = require("./../Enum");
    var StaticInstance_1 = require("./../StaticInstance");
    var PoolManager_1 = require("./PoolManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var UIManager = function(_super) {
      __extends(UIManager, _super);
      function UIManager() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.uiMap = new Map();
        return _this;
      }
      UIManager.prototype.onLoad = function() {
        StaticInstance_1.StaticInstance.setUIManager(this);
      };
      UIManager.prototype.init = function() {
        for (var type in Enum_1.ENUM_UI_TYPE) {
          var node = PoolManager_1.default.instance.getNode(Enum_1.ENUM_UI_TYPE[type], this.node);
          if (node && !this.uiMap.has(Enum_1.ENUM_UI_TYPE[type])) {
            node.active = false;
            node.addComponent(Enum_1.ENUM_UI_TYPE[type]);
            this.uiMap.set(Enum_1.ENUM_UI_TYPE[type], node.getComponent(Enum_1.ENUM_UI_TYPE[type]));
          }
        }
      };
      UIManager.prototype.toggle = function(key, status, callback) {
        void 0 === status && (status = true);
        if (this.uiMap.has(key)) {
          var layer = this.uiMap.get(key);
          status ? layer.show() : layer.hide();
          callback && callback();
        }
      };
      UIManager.prototype.isActive = function(key) {
        if (this.uiMap.has(key)) return this.uiMap.get(key).node.active;
        return false;
      };
      UIManager.prototype.getActiveTypes = function() {
        var _this = this;
        var types = [];
        this.uiMap.forEach(function(layer, type) {
          _this.isActive(type) && types.push(type);
        });
        return types;
      };
      UIManager.prototype.setMainLevelUpNotice = function() {
        var layer = this.uiMap.get(Enum_1.ENUM_UI_TYPE.MAIN);
        null === layer || void 0 === layer ? void 0 : layer.setLevelUpNotice();
      };
      UIManager.prototype.setMainTimer = function(status) {
        void 0 === status && (status = true);
        var layer = this.uiMap.get(Enum_1.ENUM_UI_TYPE.MAIN);
        status ? null === layer || void 0 === layer ? void 0 : layer.onTimerStart() : null === layer || void 0 === layer ? void 0 : layer.onTimerStop();
      };
      UIManager.prototype.setMainTimerRendor = function() {
        var layer = this.uiMap.get(Enum_1.ENUM_UI_TYPE.MAIN);
        null === layer || void 0 === layer ? void 0 : layer.setTimerRendor();
      };
      UIManager.prototype.setMainSkillTip = function() {
        var layer = this.uiMap.get(Enum_1.ENUM_UI_TYPE.MAIN);
        null === layer || void 0 === layer ? void 0 : layer.setSkillTip();
      };
      UIManager.prototype.setMainLevelCrash = function() {
        var layer = this.uiMap.get(Enum_1.ENUM_UI_TYPE.MAIN_LEVEL);
        null === layer || void 0 === layer ? void 0 : layer.setCrashRendor();
      };
      UIManager.prototype.setMainLevelTip = function() {
        var layer = this.uiMap.get(Enum_1.ENUM_UI_TYPE.MAIN_LEVEL);
        null === layer || void 0 === layer ? void 0 : layer.setLevelTip();
      };
      UIManager = __decorate([ ccclass ], UIManager);
      return UIManager;
    }(cc.Component);
    exports.default = UIManager;
    cc._RF.pop();
  }, {
    "./../Enum": "Enum",
    "./../StaticInstance": "StaticInstance",
    "./PoolManager": "PoolManager"
  } ],
  UIScrollControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e6235MOwRpI+bzS2hVblkfN", "UIScrollControl");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ENUM_SCROLL_DIR = void 0;
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ENUM_SCROLL_DIR;
    (function(ENUM_SCROLL_DIR) {
      ENUM_SCROLL_DIR[ENUM_SCROLL_DIR["V"] = 0] = "V";
      ENUM_SCROLL_DIR[ENUM_SCROLL_DIR["H"] = 1] = "H";
    })(ENUM_SCROLL_DIR = exports.ENUM_SCROLL_DIR || (exports.ENUM_SCROLL_DIR = {}));
    var UIScrollControl = function(_super) {
      __extends(UIScrollControl, _super);
      function UIScrollControl() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.scrollView = null;
        _this.contentSize = null;
        _this.scrollDirection = ENUM_SCROLL_DIR.V;
        _this.totalCount = 0;
        _this.itemCount = 0;
        _this.childrenList = [];
        _this.itemDistance = 0;
        _this.contentSizeStart = null;
        _this.isStartFlag = false;
        _this.theMaxID = 0;
        _this.refreshCB = null;
        return _this;
      }
      UIScrollControl.prototype.init = function(_tempNode, _totalCount, _size, _dir, callBack, scrollTo) {
        callBack && (this.refreshCB = callBack);
        if (false == this.isStartFlag) {
          this.scrollView = this.node.getComponent(cc.ScrollView);
          if (null == this.scrollView || null == this.scrollView.content) return;
          this.scrollView.content.parent.setAnchorPoint(cc.v2(.5, .5));
          var _maskWidget = this.scrollView.content.parent.getComponent(cc.Widget);
          null == _maskWidget && (_maskWidget = this.scrollView.content.parent.addComponent(cc.Widget));
          _maskWidget.isAlignLeft = true;
          _maskWidget.left = 0;
          _maskWidget.isAlignRight = true;
          _maskWidget.right = 0;
          _maskWidget.isAlignTop = true;
          _maskWidget.top = 0;
          _maskWidget.isAlignBottom = true;
          _maskWidget.bottom = 0;
          this.contentSize = new cc.Size(this.scrollView.node.getContentSize());
          this.scrollView.content.setContentSize(this.contentSize);
          this.contentSizeStart = this.scrollView.content.getContentSize();
        }
        if (null == _tempNode) return;
        this.scrollView.content.setContentSize(this.contentSizeStart);
        this.clear();
        this.totalCount = _totalCount;
        this.scrollDirection = _dir;
        if (_dir == ENUM_SCROLL_DIR.V) {
          this.scrollView.content.setAnchorPoint(cc.v2(.5, 1));
          this.scrollView.content.setContentSize(cc.size(this.contentSizeStart.width, this.totalCount * _size.height));
          this.scrollView.content.setPosition(cc.v2(0, -this.totalCount * _size.height / 2));
          var _tempCount = Math.floor(this.contentSizeStart.height / _size.height);
          this.itemCount = _tempCount + 2;
          this.totalCount <= this.itemCount && (this.itemCount = this.totalCount);
          this.itemDistance = _size.height;
        } else if (_dir == ENUM_SCROLL_DIR.H) {
          this.scrollView.content.setAnchorPoint(cc.v2(0, .5));
          this.scrollView.content.setContentSize(cc.size(this.totalCount * _size.width, this.contentSizeStart.height));
          this.scrollView.content.setPosition(cc.v2(this.totalCount * _size.width / 2, 0));
          var _tempCount = Math.floor(this.contentSizeStart.width / _size.width);
          this.itemCount = _tempCount + 2;
          this.totalCount <= this.itemCount && (this.itemCount = this.totalCount);
          this.itemDistance = _size.width;
        }
        if (this.scrollView.scrollEvents.length <= 0) {
          var eventHandler = new cc.Component.EventHandler();
          eventHandler.target = this.node;
          eventHandler.component = "UIScrollControl";
          eventHandler.handler = "OnScroll";
          this.scrollView.scrollEvents.push(eventHandler);
        }
        true == this.isStartFlag;
        this.theMaxID = 0;
        this.initShowAreaItems(_tempNode, scrollTo);
      };
      UIScrollControl.prototype.clear = function() {
        this.scrollView.content.removeAllChildren();
        this.childrenList = [];
      };
      UIScrollControl.prototype.initShowAreaItems = function(_temp_node, scrollTo) {
        for (var i = 0; i < this.itemCount; i++) {
          var curPos = cc.v2(0, 0);
          var node = cc.instantiate(_temp_node);
          this.scrollView.content.addChild(node);
          node.active = true;
          node.opacity = 255;
          this.scrollDirection == ENUM_SCROLL_DIR.V ? curPos.y = -this.itemDistance / 2 - this.itemDistance * i : this.scrollDirection == ENUM_SCROLL_DIR.H && (curPos.x = this.itemDistance / 2 + this.itemDistance * i);
          node.name = "cell_" + i;
          node.setAnchorPoint(cc.v2(.5, .5));
          node.setPosition(curPos);
          this.onRefresh(node, i, i);
          this.childrenList.push(node);
        }
        scrollTo && scrollTo(this.scrollView);
      };
      UIScrollControl.prototype.OnScroll = function() {
        var scrollOffset = this.scrollView.getScrollOffset();
        var offset = 0;
        this.scrollDirection == ENUM_SCROLL_DIR.V ? offset = scrollOffset.y : this.scrollDirection == ENUM_SCROLL_DIR.H && (offset = -scrollOffset.x);
        this.refreshLayout(offset);
      };
      UIScrollControl.prototype.refreshLayout = function(_curOffset) {
        var offset = _curOffset;
        var _max_rect_size = this.totalCount * this.itemDistance;
        if (offset < 0 || offset + this.contentSize.height >= _max_rect_size) return;
        var _index = 0;
        var _min_index = Math.floor(offset / this.itemDistance);
        for (var i = 0; i < this.itemCount; i++) {
          var node = this.childrenList[i];
          _index = _min_index + i;
          this.refreshItem(_index, i, node);
        }
        this.theMaxID = _min_index + this.itemCount;
      };
      UIScrollControl.prototype.refreshItem = function(_index, _node_index, node) {
        if (_index < 0 || _index >= this.totalCount) return;
        if (null == node) return;
        var curPosition = cc.Vec2.ZERO;
        this.scrollDirection == ENUM_SCROLL_DIR.H ? curPosition.x = this.itemDistance / 2 + this.itemDistance * _index : this.scrollDirection == ENUM_SCROLL_DIR.V && (curPosition.y = -this.itemDistance / 2 - this.itemDistance * _index);
        node.setPosition(curPosition);
        this.onRefresh(node, _index, _node_index);
      };
      UIScrollControl.prototype.onRefresh = function(node, _index, nodeIndex) {
        null != this.refreshCB && this.refreshCB(node, _index, nodeIndex);
      };
      UIScrollControl = __decorate([ ccclass ], UIScrollControl);
      return UIScrollControl;
    }(cc.Component);
    exports.default = UIScrollControl;
    cc._RF.pop();
  }, {} ],
  UITransitionControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9cf23gaAJRJjq5LNOVK5EiX", "UITransitionControl");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var StaticInstance_1 = require("../StaticInstance");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var UITransitionControl = function(_super) {
      __extends(UITransitionControl, _super);
      function UITransitionControl() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.transitionTime = .3;
        _this.mask = null;
        _this.img = null;
        _this.scale = 0;
        return _this;
      }
      UITransitionControl.prototype.onLoad = function() {
        StaticInstance_1.StaticInstance.setTransitionManager(this);
        var winSize = cc.winSize;
        this.mask = this.node.getComponent(cc.Mask);
        this.img = this.node.getChildByName("img");
        this.img.width = winSize.width;
        this.img.height = winSize.height;
        var size = Math.max(winSize.width, winSize.height);
        this.scale = size / this.node.width;
        this.node.scale = this.scale;
      };
      UITransitionControl.prototype.play = function(from, to, changed, finished) {
        var _this = this;
        void 0 === from && (from = null);
        void 0 === to && (to = null);
        this.img.opacity = 255;
        var act1 = cc.scaleTo(this.transitionTime, 1);
        var act2 = cc.callFunc(function() {
          from && StaticInstance_1.StaticInstance.uiManager.toggle(from, false);
          to && StaticInstance_1.StaticInstance.uiManager.toggle(to);
          changed && changed();
        });
        var act3 = cc.scaleTo(this.transitionTime, this.scale);
        var act4 = cc.callFunc(function() {
          _this.img.opacity = 0;
          finished && finished();
        });
        var act = cc.sequence(act1, act2, act3, act4);
        cc.tween(this.node).then(act).start();
      };
      UITransitionControl.prototype.onStart = function(from, to, callback) {
        var _this = this;
        void 0 === from && (from = null);
        void 0 === to && (to = null);
        this.img.opacity = 255;
        var act1 = cc.scaleTo(this.transitionTime, 1);
        var act2 = cc.callFunc(function() {
          _this.mask.enabled = false;
          from && StaticInstance_1.StaticInstance.uiManager.toggle(from, false);
          to && StaticInstance_1.StaticInstance.uiManager.toggle(to);
          callback && callback();
        });
        var act = cc.sequence(act1, act2);
        cc.tween(this.node).then(act).start();
      };
      UITransitionControl.prototype.onEnd = function() {
        var _this = this;
        this.scheduleOnce(function() {
          _this.mask.enabled = true;
          var act1 = cc.scaleTo(_this.transitionTime, _this.scale);
          var act2 = cc.callFunc(function() {
            _this.img.opacity = 0;
          });
          var act = cc.sequence(act1, act2);
          cc.tween(_this.node).then(act).start();
        });
      };
      __decorate([ property ], UITransitionControl.prototype, "transitionTime", void 0);
      UITransitionControl = __decorate([ ccclass ], UITransitionControl);
      return UITransitionControl;
    }(cc.Component);
    exports.default = UITransitionControl;
    cc._RF.pop();
  }, {
    "../StaticInstance": "StaticInstance"
  } ],
  Utils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1ccc3Pa3fdGUJUnDiya6JDg", "Utils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.toXY = exports.getXYFromPos = exports.getAngle = exports.getDistance = exports.formatSeconds = exports.sort = exports.shuffle = exports.random = void 0;
    function random(lower, upper) {
      return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    }
    exports.random = random;
    function shuffle(arr) {
      var length = arr.length, randomIndex, temp;
      while (length) {
        randomIndex = Math.floor(Math.random() * length--);
        temp = arr[randomIndex];
        arr[randomIndex] = arr[length];
        arr[length] = temp;
      }
      return arr;
    }
    exports.shuffle = shuffle;
    function sort(arr, key, flag) {
      void 0 === flag && (flag = true);
      if (arr instanceof Array) return arr.sort(function(a, b) {
        return a[key] > b[key] ? flag ? 1 : -1 : a[key] < b[key] ? flag ? -1 : 1 : 0;
      });
    }
    exports.sort = sort;
    function formatSeconds(seconds, dateFormat) {
      void 0 === dateFormat && (dateFormat = "h:i:s");
      seconds = Number(seconds);
      var obj = {};
      obj.h = Number.parseInt(String(seconds / 3600));
      obj.i = Number.parseInt(String((seconds - 3600 * obj.h) / 60));
      obj.s = Number.parseInt(String(seconds - 3600 * obj.h - 60 * obj.i));
      obj.h < 10 && (obj.h = "0" + obj.h);
      obj.i < 10 && (obj.i = "0" + obj.i);
      obj.s < 10 && (obj.s = "0" + obj.s);
      var rs = dateFormat.replace("h", obj.h).replace("i", obj.i).replace("s", obj.s);
      return rs;
    }
    exports.formatSeconds = formatSeconds;
    function getDistance(start, end) {
      var pos = cc.v2(start.x - end.x, start.y - end.y);
      var dis = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
      return dis;
    }
    exports.getDistance = getDistance;
    function getAngle(start, end) {
      var dx = end.x - start.x;
      var dy = end.y - start.y;
      var dir = cc.v2(dx, dy);
      var angle = dir.signAngle(cc.v2(1, 0));
      var degree = angle / Math.PI * 180;
      return -degree;
    }
    exports.getAngle = getAngle;
    function getXYFromPos(px, py, width, height) {
      var x = 0, y = 0;
      x = Math.floor(px / width);
      y = Math.floor(py / height);
      return {
        x: x,
        y: y
      };
    }
    exports.getXYFromPos = getXYFromPos;
    function toXY(node1, node2) {
      var wpos = node1.convertToWorldSpaceAR(cc.v2(0, 0));
      var pos = node2.convertToNodeSpaceAR(wpos);
      return pos;
    }
    exports.toXY = toXY;
    cc._RF.pop();
  }, {} ],
  WinLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5f67aat/5ZDsJnn0mQ3kKKH", "WinLayer");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Enum_1 = require("../Enum");
    var StaticInstance_1 = require("./../StaticInstance");
    var AudioManager_1 = require("../manager/AudioManager");
    var SdkManager_1 = require("../manager/SdkManager");
    var ToastManager_1 = require("../manager/ToastManager");
    var DataManager_1 = require("../manager/DataManager");
    var HeaderLayer_1 = require("./HeaderLayer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LoseLayer = function(_super) {
      __extends(LoseLayer, _super);
      function LoseLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.panel = null;
        _this.btnNext = null;
        _this.btnShare = null;
        _this.btnClose = null;
        return _this;
      }
      LoseLayer.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.panel = cc.find("style/panel", this.node);
        this.btnNext = cc.find("buttons/btn_next", this.panel);
        this.btnShare = cc.find("buttons/btn_share", this.panel);
        this.btnNext.on("click", this.onNextClick, this);
        this.btnShare.on("click", this.onShareClick, this);
        this.btnClose = cc.find("btn_close", this.panel);
        this.btnClose.on("click", this.onCloseClick, this);
      };
      LoseLayer.prototype.onDestroy = function() {
        this.btnNext.off("click", this.onNextClick, this);
        this.btnShare.off("click", this.onShareClick, this);
        this.btnClose.off("click", this.onCloseClick, this);
      };
      LoseLayer.prototype.onEnable = function() {
        this.zoomIn(this.panel);
        SdkManager_1.default.instance.toggleBannerAd(true);
        StaticInstance_1.StaticInstance.uiManager.setMainTimer(false);
        this.rendorKeys();
        this.rendorPower();
        this.rendorPowerTimer();
      };
      LoseLayer.prototype.onDisable = function() {
        SdkManager_1.default.instance.toggleBannerAd(false);
      };
      LoseLayer.prototype.onNextClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        if (DataManager_1.default.instance.power <= 0) {
          ToastManager_1.default.instance.show("\u80fd\u91cf\u5df2\u7528\u5b8c, \u8bf7\u5148\u8865\u5145\u80fd\u91cf", {
            gravity: "TOP",
            bg_color: cc.color(226, 69, 109, 255)
          });
          return;
        }
        DataManager_1.default.instance.power -= 1;
        DataManager_1.default.instance.save();
        StaticInstance_1.StaticInstance.transitionsManager.play(Enum_1.ENUM_UI_TYPE.WIN, null, function() {
          StaticInstance_1.StaticInstance.gameManager.onGameLevelStart();
        });
      };
      LoseLayer.prototype.onShareClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        SdkManager_1.default.instance.getPlatform() ? SdkManager_1.default.instance.activeShare() : ToastManager_1.default.instance.show("\u4ec5\u652f\u6301\u5c0f\u6e38\u620f\u5e73\u53f0", {
          gravity: "TOP",
          bg_color: cc.color(226, 69, 109, 255)
        });
      };
      LoseLayer.prototype.onCloseClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.MAIN_LEVEL, false);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.WIN, false);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.MENU);
      };
      LoseLayer = __decorate([ ccclass ], LoseLayer);
      return LoseLayer;
    }(HeaderLayer_1.default);
    exports.default = LoseLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../manager/AudioManager": "AudioManager",
    "../manager/DataManager": "DataManager",
    "../manager/SdkManager": "SdkManager",
    "../manager/ToastManager": "ToastManager",
    "./../StaticInstance": "StaticInstance",
    "./HeaderLayer": "HeaderLayer"
  } ],
  "telegram-ui": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "faab4sQzyxNBLTFJeQgwIl/", "telegram-ui");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var TonConnectUi_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TonConnectUi = void 0;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let TonConnectUi = TonConnectUi_1 = class TonConnectUi {
      constructor() {
        this._tgConnect = null;
      }
      static get Instance() {
        TonConnectUi_1._instance || (TonConnectUi_1._instance = new TonConnectUi_1());
        return TonConnectUi_1._instance;
      }
      toNano(ton) {
        return (1e9 * parseFloat(ton)).toString();
      }
      isConnected() {
        if (!this._tgConnect) {
          console.error("ton ui not inited!");
          return false;
        }
        return this._tgConnect.connected;
      }
      disconnect() {
        if (!this._tgConnect) {
          console.error("ton ui not inited!");
          return;
        }
        this._tgConnect.disconnect();
      }
      account() {
        if (!this._tgConnect) {
          console.error("ton ui not inited!");
          return null;
        }
        return this._tgConnect.account;
      }
      parseRaw(raw) {
        return raw;
      }
      init(manifestUrl, tonWallet, language) {
        return __awaiter(this, void 0, void 0, function*() {
          this.tonWallet = tonWallet;
          this._tgConnect = yield new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://unpkg.com/@tonconnect/ui@2.0.9/dist/tonconnect-ui.min.js";
            script.async = true;
            script.onload = () => {
              const intervalId = setInterval(() => {
                if (window.TON_CONNECT_UI) {
                  console.log("loading telegram web app sdk success!");
                  const tonConnect = new window["TON_CONNECT_UI"].TonConnectUI({
                    manifestUrl: manifestUrl
                  });
                  tonConnect.uiOptions = {
                    language: language || "en"
                  };
                  resolve(tonConnect);
                  clearInterval(intervalId);
                }
              }, 100);
            };
            script.onerror = () => reject(new Error("Unable to load TelegramWebApp SDK, please check logs."));
            document.head.appendChild(script);
          });
          return this._tgConnect ? Promise.resolve({
            success: true
          }) : Promise.resolve({
            success: false
          });
        });
      }
      subscribeWallet(updateConnect) {
        console.log("subscribe wallet");
        updateConnect();
        if (this._tgConnect) {
          const unsubscribeModal = this._tgConnect.onStatusChange(state => {
            console.log("model state changed! : ", state);
            updateConnect();
          });
          const unsubscribeConnectUI = this._tgConnect.onStatusChange(info => {
            console.log("wallet info status changed : ", info);
            updateConnect();
          });
        }
      }
      openModal() {
        return __awaiter(this, void 0, void 0, function*() {
          if (!this._tgConnect) return;
          console.log("open modal", yield this._tgConnect.getWallets());
          this._tgConnect.connected ? this._tgConnect.disconnect() : this._tgConnect.openModal();
        });
      }
      createPayload() {
        return "";
      }
      sendTransaction(args) {
        return __awaiter(this, void 0, void 0, function*() {
          if (!this._tgConnect || false == this._tgConnect.connected) {
            console.error("ton connect not connected");
            throw new Error("ton connect not connected");
          }
          const transaction = {
            validUntil: Math.floor(Date.now() / 1e3) + 120,
            messages: [ {
              address: this.tonWallet,
              amount: args.amount,
              payload: args.payload
            } ]
          };
          try {
            const result = yield this._tgConnect.sendTransaction(transaction);
            args.callBack && args.callBack({
              success: true,
              result: result
            });
          } catch (e) {
            console.error(e);
            args.callBack && args.callBack({
              success: false,
              result: e.message
            });
          }
        });
      }
    };
    TonConnectUi = TonConnectUi_1 = __decorate([ ccclass("TonConnectUi") ], TonConnectUi);
    exports.TonConnectUi = TonConnectUi;
    cc._RF.pop();
  }, {} ],
  "telegram-web": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1a0fabbmatEBI6VaLmV9WrS", "telegram-web");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = this && this.__generator || function(thisArg, body) {
      var _ = {
        label: 0,
        sent: function() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      }, f, y, t, g;
      return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([ n, v ]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
          0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          (y = 0, t) && (op = [ 2 & op[0], t.value ]);
          switch (op[0]) {
           case 0:
           case 1:
            t = op;
            break;

           case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

           case 5:
            _.label++;
            y = op[1];
            op = [ 0 ];
            continue;

           case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;

           default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
              _ = 0;
              continue;
            }
            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (6 === op[0] && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            t[2] && _.ops.pop();
            _.trys.pop();
            continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [ 6, e ];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TelegramWebApp = void 0;
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var tgLoadPromise = new Promise(function(resolve, reject) {
      var script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-web-app.js";
      script.async = true;
      script.onload = function() {
        var intervalId = setInterval(function() {
          if (window.Telegram && window.Telegram.WebApp) {
            console.log("loading telegram web app sdk success!");
            resolve(window.Telegram.WebApp);
            clearInterval(intervalId);
          }
        }, 100);
      };
      script.onerror = function() {
        return reject(new Error("Unable to load TelegramWebApp SDK, please check logs."));
      };
      document.head.appendChild(script);
    });
    var TelegramWebApp = function() {
      function TelegramWebApp() {
        this._tgWebAppJS = null;
      }
      TelegramWebApp_1 = TelegramWebApp;
      Object.defineProperty(TelegramWebApp, "Instance", {
        get: function() {
          TelegramWebApp_1._instance || (TelegramWebApp_1._instance = new TelegramWebApp_1());
          return TelegramWebApp_1._instance;
        },
        enumerable: false,
        configurable: true
      });
      TelegramWebApp.prototype.init = function() {
        return __awaiter(this, void 0, Promise, function() {
          var _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              _a = this;
              return [ 4, new Promise(function(resolve, reject) {
                var script = document.createElement("script");
                script.src = "https://telegram.org/js/telegram-web-app.js";
                script.async = true;
                script.onload = function() {
                  var intervalId = setInterval(function() {
                    if (window.Telegram && window.Telegram.WebApp) {
                      console.log("loading telegram web app sdk success!");
                      resolve(window.Telegram.WebApp);
                      clearInterval(intervalId);
                    }
                  }, 100);
                };
                script.onerror = function() {
                  return reject(new Error("Unable to load TelegramWebApp SDK, please check logs."));
                };
                document.head.appendChild(script);
              }) ];

             case 1:
              _a._tgWebAppJS = _b.sent();
              return this._tgWebAppJS ? [ 2, Promise.resolve({
                success: true
              }) ] : [ 2, Promise.resolve({
                success: false
              }) ];
            }
          });
        });
      };
      TelegramWebApp.prototype.openTelegramLink = function(url) {
        if (!this._tgWebAppJS) {
          console.error("telegram web app is not inited!");
          return;
        }
        console.log(url);
        this._tgWebAppJS.openTelegramLink(url);
      };
      TelegramWebApp.prototype.share = function(url, text) {
        var shareUrl = "https://t.me/share/url?url=" + url + "&" + new URLSearchParams({
          text: text || ""
        }).toString();
        this.openTelegramLink(shareUrl);
      };
      TelegramWebApp.prototype.getTelegramWebApp = function() {
        return this._tgWebAppJS;
      };
      TelegramWebApp.prototype.getTelegramWebAppInitData = function() {
        if (!this._tgWebAppJS) {
          console.error("telegram web app is not inited!");
          return null;
        }
        return this._tgWebAppJS.initDataUnsafe;
      };
      TelegramWebApp.prototype.getTelegramUser = function() {
        if (!this._tgWebAppJS) {
          console.error("telegram web app is not inited!");
          return null;
        }
        return this._tgWebAppJS.initDataUnsafe.user;
      };
      TelegramWebApp.prototype.getTelegramInitData = function() {
        if (!this._tgWebAppJS) {
          console.error("telegram web app is not inited!");
          return null;
        }
        return this._tgWebAppJS.initData;
      };
      TelegramWebApp.prototype.openInvoice = function(url, callback) {
        if (!this._tgWebAppJS) {
          console.error("telegram web app is not inited!");
          return null;
        }
        this._tgWebAppJS.openInvoice(url, callback);
      };
      TelegramWebApp.prototype.alert = function(message) {
        this._tgWebAppJS.showAlert(message);
      };
      var TelegramWebApp_1;
      TelegramWebApp = TelegramWebApp_1 = __decorate([ ccclass("TelegramWebApp") ], TelegramWebApp);
      return TelegramWebApp;
    }();
    exports.TelegramWebApp = TelegramWebApp;
    cc._RF.pop();
  }, {} ],
  webton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2b641ltZDNA56xKsORAOAZh", "webton");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var WebTon_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WebTon = void 0;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let WebTon = WebTon_1 = class WebTon {
      constructor() {
        this._webTon = null;
      }
      static get Instance() {
        WebTon_1._instance || (WebTon_1._instance = new WebTon_1());
        return WebTon_1._instance;
      }
      init() {
        return __awaiter(this, void 0, void 0, function*() {
          this._webTon = yield new Promise((resolve, reject) => {
            const intervalId = setInterval(() => {
              if (window.TonWeb) {
                console.log("loading ton sdk success!");
                resolve(new window.TonWeb());
                clearInterval(intervalId);
              }
            }, 100);
          });
          return this._webTon ? Promise.resolve({
            success: true
          }) : Promise.resolve({
            success: false
          });
        });
      }
      parseAddress(hexAddress) {
        return __awaiter(this, void 0, void 0, function*() {
          const Address = this._webTon.utils.Address;
          const address = new Address(hexAddress);
          const userFriendlyAddress = address.toString(true, false, true);
          return userFriendlyAddress;
        });
      }
      createMessagePayload(message) {
        return __awaiter(this, void 0, void 0, function*() {
          const cell = new this._webTon.boc.Cell();
          cell.bits.writeUint(0, 32);
          cell.bits.writeString(message);
          const cellBytes = yield cell.toBoc(false);
          const payload = this._webTon.utils.bytesToBase64(cellBytes);
          return payload;
        });
      }
    };
    WebTon = WebTon_1 = __decorate([ ccclass ], WebTon);
    exports.WebTon = WebTon;
    cc._RF.pop();
  }, {} ]
}, {}, [ "AlljsonData", "Config", "Enum", "Index", "Languages", "StaticInstance", "Utils", "telegram-ui", "telegram-web", "webton", "Board", "Car", "CarSingle", "BaseItem", "BaseLanguageLayer", "Baselayer", "ExitLayer", "ExitLevelLayer", "HeaderLayer", "LevelSelectLayer", "LevelUILayer", "LoadingLayer", "LoseLayer", "MainLayer", "MainLevelLayer", "MenuLayer", "MoreLayer", "OverLayer", "RankLayer", "SettingLayer", "ShareLayer", "ShopLayer", "SkillSubmitLayer", "TaskLayer", "WinLayer", "AudioManager", "DataManager", "EffectManager", "EventManager", "GameManager", "PoolManager", "ResourceManager", "SdkManager", "SpriteManager", "ToastManager", "UIManager", "UIScrollControl", "UITransitionControl" ]);
//# sourceMappingURL=index.js.map
