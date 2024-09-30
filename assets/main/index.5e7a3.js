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
  1: [ function(require, module, exports) {}, {} ],
  2: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var BlockCipher = C_lib.BlockCipher;
        var C_algo = C.algo;
        var SBOX = [];
        var INV_SBOX = [];
        var SUB_MIX_0 = [];
        var SUB_MIX_1 = [];
        var SUB_MIX_2 = [];
        var SUB_MIX_3 = [];
        var INV_SUB_MIX_0 = [];
        var INV_SUB_MIX_1 = [];
        var INV_SUB_MIX_2 = [];
        var INV_SUB_MIX_3 = [];
        (function() {
          var d = [];
          for (var i = 0; i < 256; i++) d[i] = i < 128 ? i << 1 : i << 1 ^ 283;
          var x = 0;
          var xi = 0;
          for (var i = 0; i < 256; i++) {
            var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
            sx = sx >>> 8 ^ 255 & sx ^ 99;
            SBOX[x] = sx;
            INV_SBOX[sx] = x;
            var x2 = d[x];
            var x4 = d[x2];
            var x8 = d[x4];
            var t = 257 * d[sx] ^ 16843008 * sx;
            SUB_MIX_0[x] = t << 24 | t >>> 8;
            SUB_MIX_1[x] = t << 16 | t >>> 16;
            SUB_MIX_2[x] = t << 8 | t >>> 24;
            SUB_MIX_3[x] = t;
            var t = 16843009 * x8 ^ 65537 * x4 ^ 257 * x2 ^ 16843008 * x;
            INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
            INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
            INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
            INV_SUB_MIX_3[sx] = t;
            if (x) {
              x = x2 ^ d[d[d[x8 ^ x2]]];
              xi ^= d[d[xi]];
            } else x = xi = 1;
          }
        })();
        var RCON = [ 0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54 ];
        var AES = C_algo.AES = BlockCipher.extend({
          _doReset: function() {
            var t;
            if (this._nRounds && this._keyPriorReset === this._key) return;
            var key = this._keyPriorReset = this._key;
            var keyWords = key.words;
            var keySize = key.sigBytes / 4;
            var nRounds = this._nRounds = keySize + 6;
            var ksRows = 4 * (nRounds + 1);
            var keySchedule = this._keySchedule = [];
            for (var ksRow = 0; ksRow < ksRows; ksRow++) if (ksRow < keySize) keySchedule[ksRow] = keyWords[ksRow]; else {
              t = keySchedule[ksRow - 1];
              if (ksRow % keySize) keySize > 6 && ksRow % keySize == 4 && (t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[255 & t]); else {
                t = t << 8 | t >>> 24;
                t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[255 & t];
                t ^= RCON[ksRow / keySize | 0] << 24;
              }
              keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
            }
            var invKeySchedule = this._invKeySchedule = [];
            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
              var ksRow = ksRows - invKsRow;
              if (invKsRow % 4) var t = keySchedule[ksRow]; else var t = keySchedule[ksRow - 4];
              invKeySchedule[invKsRow] = invKsRow < 4 || ksRow <= 4 ? t : INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 255]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 255]] ^ INV_SUB_MIX_3[SBOX[255 & t]];
            }
          },
          encryptBlock: function(M, offset) {
            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
          },
          decryptBlock: function(M, offset) {
            var t = M[offset + 1];
            M[offset + 1] = M[offset + 3];
            M[offset + 3] = t;
            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
            var t = M[offset + 1];
            M[offset + 1] = M[offset + 3];
            M[offset + 3] = t;
          },
          _doCryptBlock: function(M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
            var nRounds = this._nRounds;
            var s0 = M[offset] ^ keySchedule[0];
            var s1 = M[offset + 1] ^ keySchedule[1];
            var s2 = M[offset + 2] ^ keySchedule[2];
            var s3 = M[offset + 3] ^ keySchedule[3];
            var ksRow = 4;
            for (var round = 1; round < nRounds; round++) {
              var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[s1 >>> 16 & 255] ^ SUB_MIX_2[s2 >>> 8 & 255] ^ SUB_MIX_3[255 & s3] ^ keySchedule[ksRow++];
              var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[s2 >>> 16 & 255] ^ SUB_MIX_2[s3 >>> 8 & 255] ^ SUB_MIX_3[255 & s0] ^ keySchedule[ksRow++];
              var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[s3 >>> 16 & 255] ^ SUB_MIX_2[s0 >>> 8 & 255] ^ SUB_MIX_3[255 & s1] ^ keySchedule[ksRow++];
              var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[s0 >>> 16 & 255] ^ SUB_MIX_2[s1 >>> 8 & 255] ^ SUB_MIX_3[255 & s2] ^ keySchedule[ksRow++];
              s0 = t0;
              s1 = t1;
              s2 = t2;
              s3 = t3;
            }
            var t0 = (SBOX[s0 >>> 24] << 24 | SBOX[s1 >>> 16 & 255] << 16 | SBOX[s2 >>> 8 & 255] << 8 | SBOX[255 & s3]) ^ keySchedule[ksRow++];
            var t1 = (SBOX[s1 >>> 24] << 24 | SBOX[s2 >>> 16 & 255] << 16 | SBOX[s3 >>> 8 & 255] << 8 | SBOX[255 & s0]) ^ keySchedule[ksRow++];
            var t2 = (SBOX[s2 >>> 24] << 24 | SBOX[s3 >>> 16 & 255] << 16 | SBOX[s0 >>> 8 & 255] << 8 | SBOX[255 & s1]) ^ keySchedule[ksRow++];
            var t3 = (SBOX[s3 >>> 24] << 24 | SBOX[s0 >>> 16 & 255] << 16 | SBOX[s1 >>> 8 & 255] << 8 | SBOX[255 & s2]) ^ keySchedule[ksRow++];
            M[offset] = t0;
            M[offset + 1] = t1;
            M[offset + 2] = t2;
            M[offset + 3] = t3;
          },
          keySize: 8
        });
        C.AES = BlockCipher._createHelper(AES);
      })();
      return CryptoJS.AES;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5,
    "./enc-base64": 6,
    "./evpkdf": 9,
    "./md5": 14
  } ],
  3: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var BlockCipher = C_lib.BlockCipher;
        var C_algo = C.algo;
        const N = 16;
        const ORIG_P = [ 608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731 ];
        const ORIG_S = [ [ 3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670, 3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374, 1667834072, 1901547113, 2757295779, 4103290238, 227898511, 1921955416, 1904987480, 2182433518, 2069144605, 3260701109, 2620446009, 720527379, 3318853667, 677414384, 3393288472, 3101374703, 2390351024, 1614419982, 1822297739, 2954791486, 3608508353, 3174124327, 2024746970, 1432378464, 3864339955, 2857741204, 1464375394, 1676153920, 1439316330, 715854006, 3033291828, 289532110, 2706671279, 2087905683, 3018724369, 1668267050, 732546397, 1947742710, 3462151702, 2609353502, 2950085171, 1814351708, 2050118529, 680887927, 999245976, 1800124847, 3300911131, 1713906067, 1641548236, 4213287313, 1216130144, 1575780402, 4018429277, 3917837745, 3693486850, 3949271944, 596196993, 3549867205, 258830323, 2213823033, 772490370, 2760122372, 1774776394, 2652871518, 566650946, 4142492826, 1728879713, 2882767088, 1783734482, 3629395816, 2517608232, 2874225571, 1861159788, 326777828, 3124490320, 2130389656, 2716951837, 967770486, 1724537150, 2185432712, 2364442137, 1164943284, 2105845187, 998989502, 3765401048, 2244026483, 1075463327, 1455516326, 1322494562, 910128902, 469688178, 1117454909, 936433444, 3490320968, 3675253459, 1240580251, 122909385, 2157517691, 634681816, 4142456567, 3825094682, 3061402683, 2540495037, 79693498, 3249098678, 1084186820, 1583128258, 426386531, 1761308591, 1047286709, 322548459, 995290223, 1845252383, 2603652396, 3431023940, 2942221577, 3202600964, 3727903485, 1712269319, 422464435, 3234572375, 1170764815, 3523960633, 3117677531, 1434042557, 442511882, 3600875718, 1076654713, 1738483198, 4213154764, 2393238008, 3677496056, 1014306527, 4251020053, 793779912, 2902807211, 842905082, 4246964064, 1395751752, 1040244610, 2656851899, 3396308128, 445077038, 3742853595, 3577915638, 679411651, 2892444358, 2354009459, 1767581616, 3150600392, 3791627101, 3102740896, 284835224, 4246832056, 1258075500, 768725851, 2589189241, 3069724005, 3532540348, 1274779536, 3789419226, 2764799539, 1660621633, 3471099624, 4011903706, 913787905, 3497959166, 737222580, 2514213453, 2928710040, 3937242737, 1804850592, 3499020752, 2949064160, 2386320175, 2390070455, 2415321851, 4061277028, 2290661394, 2416832540, 1336762016, 1754252060, 3520065937, 3014181293, 791618072, 3188594551, 3933548030, 2332172193, 3852520463, 3043980520, 413987798, 3465142937, 3030929376, 4245938359, 2093235073, 3534596313, 375366246, 2157278981, 2479649556, 555357303, 3870105701, 2008414854, 3344188149, 4221384143, 3956125452, 2067696032, 3594591187, 2921233993, 2428461, 544322398, 577241275, 1471733935, 610547355, 4027169054, 1432588573, 1507829418, 2025931657, 3646575487, 545086370, 48609733, 2200306550, 1653985193, 298326376, 1316178497, 3007786442, 2064951626, 458293330, 2589141269, 3591329599, 3164325604, 727753846, 2179363840, 146436021, 1461446943, 4069977195, 705550613, 3059967265, 3887724982, 4281599278, 3313849956, 1404054877, 2845806497, 146425753, 1854211946 ], [ 1266315497, 3048417604, 3681880366, 3289982499, 290971e4, 1235738493, 2632868024, 2414719590, 3970600049, 1771706367, 1449415276, 3266420449, 422970021, 1963543593, 2690192192, 3826793022, 1062508698, 1531092325, 1804592342, 2583117782, 2714934279, 4024971509, 1294809318, 4028980673, 1289560198, 2221992742, 1669523910, 35572830, 157838143, 1052438473, 1016535060, 1802137761, 1753167236, 1386275462, 3080475397, 2857371447, 1040679964, 2145300060, 2390574316, 1461121720, 2956646967, 4031777805, 4028374788, 33600511, 2920084762, 1018524850, 629373528, 3691585981, 3515945977, 2091462646, 2486323059, 586499841, 988145025, 935516892, 3367335476, 2599673255, 2839830854, 265290510, 3972581182, 2759138881, 3795373465, 1005194799, 847297441, 406762289, 1314163512, 1332590856, 1866599683, 4127851711, 750260880, 613907577, 1450815602, 3165620655, 3734664991, 3650291728, 3012275730, 3704569646, 1427272223, 778793252, 1343938022, 2676280711, 2052605720, 1946737175, 3164576444, 3914038668, 3967478842, 3682934266, 1661551462, 3294938066, 4011595847, 840292616, 3712170807, 616741398, 312560963, 711312465, 1351876610, 322626781, 1910503582, 271666773, 2175563734, 1594956187, 70604529, 3617834859, 1007753275, 1495573769, 4069517037, 2549218298, 2663038764, 504708206, 2263041392, 3941167025, 2249088522, 1514023603, 1998579484, 1312622330, 694541497, 2582060303, 2151582166, 1382467621, 776784248, 2618340202, 3323268794, 2497899128, 2784771155, 503983604, 4076293799, 907881277, 423175695, 432175456, 1378068232, 4145222326, 3954048622, 3938656102, 3820766613, 2793130115, 2977904593, 26017576, 3274890735, 3194772133, 1700274565, 1756076034, 4006520079, 3677328699, 720338349, 1533947780, 354530856, 688349552, 3973924725, 1637815568, 332179504, 3949051286, 53804574, 2852348879, 3044236432, 1282449977, 3583942155, 3416972820, 4006381244, 1617046695, 2628476075, 3002303598, 1686838959, 431878346, 2686675385, 1700445008, 1080580658, 1009431731, 832498133, 3223435511, 2605976345, 2271191193, 2516031870, 1648197032, 4164389018, 2548247927, 300782431, 375919233, 238389289, 3353747414, 2531188641, 2019080857, 1475708069, 455242339, 2609103871, 448939670, 3451063019, 1395535956, 2413381860, 1841049896, 1491858159, 885456874, 4264095073, 4001119347, 1565136089, 3898914787, 1108368660, 540939232, 1173283510, 2745871338, 3681308437, 4207628240, 3343053890, 4016749493, 1699691293, 1103962373, 3625875870, 2256883143, 3830138730, 1031889488, 3479347698, 1535977030, 4236805024, 3251091107, 2132092099, 1774941330, 1199868427, 1452454533, 157007616, 2904115357, 342012276, 595725824, 1480756522, 206960106, 497939518, 591360097, 863170706, 2375253569, 3596610801, 1814182875, 2094937945, 3421402208, 1082520231, 3463918190, 2785509508, 435703966, 3908032597, 1641649973, 2842273706, 3305899714, 1510255612, 2148256476, 2655287854, 3276092548, 4258621189, 236887753, 3681803219, 274041037, 1734335097, 3815195456, 3317970021, 1899903192, 1026095262, 4050517792, 356393447, 2410691914, 3873677099, 3682840055 ], [ 3913112168, 2491498743, 4132185628, 2489919796, 1091903735, 1979897079, 3170134830, 3567386728, 3557303409, 857797738, 1136121015, 1342202287, 507115054, 2535736646, 337727348, 3213592640, 1301675037, 2528481711, 1895095763, 1721773893, 3216771564, 62756741, 2142006736, 835421444, 2531993523, 1442658625, 3659876326, 2882144922, 676362277, 1392781812, 170690266, 3921047035, 1759253602, 3611846912, 1745797284, 664899054, 1329594018, 3901205900, 3045908486, 2062866102, 2865634940, 3543621612, 3464012697, 1080764994, 553557557, 3656615353, 3996768171, 991055499, 499776247, 1265440854, 648242737, 3940784050, 980351604, 3713745714, 1749149687, 3396870395, 4211799374, 3640570775, 1161844396, 3125318951, 1431517754, 545492359, 4268468663, 3499529547, 1437099964, 2702547544, 3433638243, 2581715763, 2787789398, 1060185593, 1593081372, 2418618748, 4260947970, 69676912, 2159744348, 86519011, 2512459080, 3838209314, 1220612927, 3339683548, 133810670, 1090789135, 1078426020, 1569222167, 845107691, 3583754449, 4072456591, 1091646820, 628848692, 1613405280, 3757631651, 526609435, 236106946, 48312990, 2942717905, 3402727701, 1797494240, 859738849, 992217954, 4005476642, 2243076622, 3870952857, 3732016268, 765654824, 3490871365, 2511836413, 1685915746, 3888969200, 1414112111, 2273134842, 3281911079, 4080962846, 172450625, 2569994100, 980381355, 4109958455, 2819808352, 2716589560, 2568741196, 3681446669, 3329971472, 1835478071, 660984891, 3704678404, 4045999559, 3422617507, 3040415634, 1762651403, 1719377915, 3470491036, 2693910283, 3642056355, 3138596744, 1364962596, 2073328063, 1983633131, 926494387, 3423689081, 2150032023, 4096667949, 1749200295, 3328846651, 309677260, 2016342300, 1779581495, 3079819751, 111262694, 1274766160, 443224088, 298511866, 1025883608, 3806446537, 1145181785, 168956806, 3641502830, 3584813610, 1689216846, 3666258015, 3200248200, 1692713982, 2646376535, 4042768518, 1618508792, 1610833997, 3523052358, 4130873264, 2001055236, 3610705100, 2202168115, 4028541809, 2961195399, 1006657119, 2006996926, 3186142756, 1430667929, 3210227297, 1314452623, 4074634658, 4101304120, 2273951170, 1399257539, 3367210612, 3027628629, 1190975929, 2062231137, 2333990788, 2221543033, 2438960610, 1181637006, 548689776, 2362791313, 3372408396, 3104550113, 3145860560, 296247880, 1970579870, 3078560182, 3769228297, 1714227617, 3291629107, 3898220290, 166772364, 1251581989, 493813264, 448347421, 195405023, 2709975567, 677966185, 3703036547, 1463355134, 2715995803, 1338867538, 1343315457, 2802222074, 2684532164, 233230375, 2599980071, 2000651841, 3277868038, 1638401717, 4028070440, 3237316320, 6314154, 819756386, 300326615, 590932579, 1405279636, 3267499572, 3150704214, 2428286686, 3959192993, 3461946742, 1862657033, 1266418056, 963775037, 2089974820, 2263052895, 1917689273, 448879540, 3550394620, 3981727096, 150775221, 3627908307, 1303187396, 508620638, 2975983352, 2726630617, 1817252668, 1876281319, 1457606340, 908771278, 3720792119, 3617206836, 2455994898, 1729034894, 1080033504 ], [ 976866871, 3556439503, 2881648439, 1522871579, 1555064734, 1336096578, 3548522304, 2579274686, 3574697629, 3205460757, 3593280638, 3338716283, 3079412587, 564236357, 2993598910, 1781952180, 1464380207, 3163844217, 3332601554, 1699332808, 1393555694, 1183702653, 3581086237, 1288719814, 691649499, 2847557200, 2895455976, 3193889540, 2717570544, 1781354906, 1676643554, 2592534050, 3230253752, 1126444790, 2770207658, 2633158820, 2210423226, 2615765581, 2414155088, 3127139286, 673620729, 2805611233, 1269405062, 4015350505, 3341807571, 4149409754, 1057255273, 2012875353, 2162469141, 2276492801, 2601117357, 993977747, 3918593370, 2654263191, 753973209, 36408145, 2530585658, 25011837, 3520020182, 2088578344, 530523599, 2918365339, 1524020338, 1518925132, 3760827505, 3759777254, 1202760957, 3985898139, 3906192525, 674977740, 4174734889, 2031300136, 2019492241, 3983892565, 4153806404, 3822280332, 352677332, 2297720250, 60907813, 90501309, 3286998549, 1016092578, 2535922412, 2839152426, 457141659, 509813237, 4120667899, 652014361, 1966332200, 2975202805, 55981186, 2327461051, 676427537, 3255491064, 2882294119, 3433927263, 1307055953, 942726286, 933058658, 2468411793, 3933900994, 4215176142, 1361170020, 2001714738, 2830558078, 3274259782, 1222529897, 1679025792, 2729314320, 3714953764, 1770335741, 151462246, 3013232138, 1682292957, 1483529935, 471910574, 1539241949, 458788160, 3436315007, 1807016891, 3718408830, 978976581, 1043663428, 3165965781, 1927990952, 4200891579, 2372276910, 3208408903, 3533431907, 1412390302, 2931980059, 4132332400, 1947078029, 3881505623, 4168226417, 2941484381, 1077988104, 1320477388, 886195818, 18198404, 3786409e3, 2509781533, 112762804, 3463356488, 1866414978, 891333506, 18488651, 661792760, 1628790961, 3885187036, 3141171499, 876946877, 2693282273, 1372485963, 791857591, 2686433993, 3759982718, 3167212022, 3472953795, 2716379847, 445679433, 3561995674, 3504004811, 3574258232, 54117162, 3331405415, 2381918588, 3769707343, 4154350007, 1140177722, 4074052095, 668550556, 3214352940, 367459370, 261225585, 2610173221, 4209349473, 3468074219, 3265815641, 314222801, 3066103646, 3808782860, 282218597, 3406013506, 3773591054, 379116347, 1285071038, 846784868, 2669647154, 3771962079, 3550491691, 2305946142, 453669953, 1268987020, 3317592352, 3279303384, 3744833421, 2610507566, 3859509063, 266596637, 3847019092, 517658769, 3462560207, 3443424879, 370717030, 4247526661, 2224018117, 4143653529, 4112773975, 2788324899, 2477274417, 1456262402, 2901442914, 1517677493, 1846949527, 2295493580, 3734397586, 2176403920, 1280348187, 1908823572, 3871786941, 846861322, 1172426758, 3287448474, 3383383037, 1655181056, 3139813346, 901632758, 1897031941, 2986607138, 3066810236, 3447102507, 1393639104, 373351379, 950779232, 625454576, 3124240540, 4148612726, 2007998917, 544563296, 2244738638, 2330496472, 2058025392, 1291430526, 424198748, 50039436, 29584100, 3605783033, 2429876329, 2791104160, 1057563949, 3255363231, 3075367218, 3463963227, 1469046755, 985887462 ] ];
        var BLOWFISH_CTX = {
          pbox: [],
          sbox: []
        };
        function F(ctx, x) {
          let a = x >> 24 & 255;
          let b = x >> 16 & 255;
          let c = x >> 8 & 255;
          let d = 255 & x;
          let y = ctx.sbox[0][a] + ctx.sbox[1][b];
          y ^= ctx.sbox[2][c];
          y += ctx.sbox[3][d];
          return y;
        }
        function BlowFish_Encrypt(ctx, left, right) {
          let Xl = left;
          let Xr = right;
          let temp;
          for (let i = 0; i < N; ++i) {
            Xl ^= ctx.pbox[i];
            Xr = F(ctx, Xl) ^ Xr;
            temp = Xl;
            Xl = Xr;
            Xr = temp;
          }
          temp = Xl;
          Xl = Xr;
          Xr = temp;
          Xr ^= ctx.pbox[N];
          Xl ^= ctx.pbox[N + 1];
          return {
            left: Xl,
            right: Xr
          };
        }
        function BlowFish_Decrypt(ctx, left, right) {
          let Xl = left;
          let Xr = right;
          let temp;
          for (let i = N + 1; i > 1; --i) {
            Xl ^= ctx.pbox[i];
            Xr = F(ctx, Xl) ^ Xr;
            temp = Xl;
            Xl = Xr;
            Xr = temp;
          }
          temp = Xl;
          Xl = Xr;
          Xr = temp;
          Xr ^= ctx.pbox[1];
          Xl ^= ctx.pbox[0];
          return {
            left: Xl,
            right: Xr
          };
        }
        function BlowFishInit(ctx, key, keysize) {
          for (let Row = 0; Row < 4; Row++) {
            ctx.sbox[Row] = [];
            for (let Col = 0; Col < 256; Col++) ctx.sbox[Row][Col] = ORIG_S[Row][Col];
          }
          let keyIndex = 0;
          for (let index = 0; index < N + 2; index++) {
            ctx.pbox[index] = ORIG_P[index] ^ key[keyIndex];
            keyIndex++;
            keyIndex >= keysize && (keyIndex = 0);
          }
          let Data1 = 0;
          let Data2 = 0;
          let res = 0;
          for (let i = 0; i < N + 2; i += 2) {
            res = BlowFish_Encrypt(ctx, Data1, Data2);
            Data1 = res.left;
            Data2 = res.right;
            ctx.pbox[i] = Data1;
            ctx.pbox[i + 1] = Data2;
          }
          for (let i = 0; i < 4; i++) for (let j = 0; j < 256; j += 2) {
            res = BlowFish_Encrypt(ctx, Data1, Data2);
            Data1 = res.left;
            Data2 = res.right;
            ctx.sbox[i][j] = Data1;
            ctx.sbox[i][j + 1] = Data2;
          }
          return true;
        }
        var Blowfish = C_algo.Blowfish = BlockCipher.extend({
          _doReset: function() {
            if (this._keyPriorReset === this._key) return;
            var key = this._keyPriorReset = this._key;
            var keyWords = key.words;
            var keySize = key.sigBytes / 4;
            BlowFishInit(BLOWFISH_CTX, keyWords, keySize);
          },
          encryptBlock: function(M, offset) {
            var res = BlowFish_Encrypt(BLOWFISH_CTX, M[offset], M[offset + 1]);
            M[offset] = res.left;
            M[offset + 1] = res.right;
          },
          decryptBlock: function(M, offset) {
            var res = BlowFish_Decrypt(BLOWFISH_CTX, M[offset], M[offset + 1]);
            M[offset] = res.left;
            M[offset + 1] = res.right;
          },
          blockSize: 2,
          keySize: 4,
          ivSize: 2
        });
        C.Blowfish = BlockCipher._createHelper(Blowfish);
      })();
      return CryptoJS.Blowfish;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5,
    "./enc-base64": 6,
    "./evpkdf": 9,
    "./md5": 14
  } ],
  4: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./evpkdf")) : "function" === typeof define && define.amd ? define([ "./core", "./evpkdf" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      CryptoJS.lib.Cipher || function(undefined) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
        var C_enc = C.enc;
        var Utf8 = C_enc.Utf8;
        var Base64 = C_enc.Base64;
        var C_algo = C.algo;
        var EvpKDF = C_algo.EvpKDF;
        var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
          cfg: Base.extend(),
          createEncryptor: function(key, cfg) {
            return this.create(this._ENC_XFORM_MODE, key, cfg);
          },
          createDecryptor: function(key, cfg) {
            return this.create(this._DEC_XFORM_MODE, key, cfg);
          },
          init: function(xformMode, key, cfg) {
            this.cfg = this.cfg.extend(cfg);
            this._xformMode = xformMode;
            this._key = key;
            this.reset();
          },
          reset: function() {
            BufferedBlockAlgorithm.reset.call(this);
            this._doReset();
          },
          process: function(dataUpdate) {
            this._append(dataUpdate);
            return this._process();
          },
          finalize: function(dataUpdate) {
            dataUpdate && this._append(dataUpdate);
            var finalProcessedData = this._doFinalize();
            return finalProcessedData;
          },
          keySize: 4,
          ivSize: 4,
          _ENC_XFORM_MODE: 1,
          _DEC_XFORM_MODE: 2,
          _createHelper: function() {
            function selectCipherStrategy(key) {
              return "string" == typeof key ? PasswordBasedCipher : SerializableCipher;
            }
            return function(cipher) {
              return {
                encrypt: function(message, key, cfg) {
                  return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                },
                decrypt: function(ciphertext, key, cfg) {
                  return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                }
              };
            };
          }()
        });
        var StreamCipher = C_lib.StreamCipher = Cipher.extend({
          _doFinalize: function() {
            var finalProcessedBlocks = this._process(true);
            return finalProcessedBlocks;
          },
          blockSize: 1
        });
        var C_mode = C.mode = {};
        var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
          createEncryptor: function(cipher, iv) {
            return this.Encryptor.create(cipher, iv);
          },
          createDecryptor: function(cipher, iv) {
            return this.Decryptor.create(cipher, iv);
          },
          init: function(cipher, iv) {
            this._cipher = cipher;
            this._iv = iv;
          }
        });
        var CBC = C_mode.CBC = function() {
          var CBC = BlockCipherMode.extend();
          CBC.Encryptor = CBC.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              xorBlock.call(this, words, offset, blockSize);
              cipher.encryptBlock(words, offset);
              this._prevBlock = words.slice(offset, offset + blockSize);
            }
          });
          CBC.Decryptor = CBC.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var thisBlock = words.slice(offset, offset + blockSize);
              cipher.decryptBlock(words, offset);
              xorBlock.call(this, words, offset, blockSize);
              this._prevBlock = thisBlock;
            }
          });
          function xorBlock(words, offset, blockSize) {
            var block;
            var iv = this._iv;
            if (iv) {
              block = iv;
              this._iv = undefined;
            } else block = this._prevBlock;
            for (var i = 0; i < blockSize; i++) words[offset + i] ^= block[i];
          }
          return CBC;
        }();
        var C_pad = C.pad = {};
        var Pkcs7 = C_pad.Pkcs7 = {
          pad: function(data, blockSize) {
            var blockSizeBytes = 4 * blockSize;
            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
            var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;
            var paddingWords = [];
            for (var i = 0; i < nPaddingBytes; i += 4) paddingWords.push(paddingWord);
            var padding = WordArray.create(paddingWords, nPaddingBytes);
            data.concat(padding);
          },
          unpad: function(data) {
            var nPaddingBytes = 255 & data.words[data.sigBytes - 1 >>> 2];
            data.sigBytes -= nPaddingBytes;
          }
        };
        var BlockCipher = C_lib.BlockCipher = Cipher.extend({
          cfg: Cipher.cfg.extend({
            mode: CBC,
            padding: Pkcs7
          }),
          reset: function() {
            var modeCreator;
            Cipher.reset.call(this);
            var cfg = this.cfg;
            var iv = cfg.iv;
            var mode = cfg.mode;
            if (this._xformMode == this._ENC_XFORM_MODE) modeCreator = mode.createEncryptor; else {
              modeCreator = mode.createDecryptor;
              this._minBufferSize = 1;
            }
            if (this._mode && this._mode.__creator == modeCreator) this._mode.init(this, iv && iv.words); else {
              this._mode = modeCreator.call(mode, this, iv && iv.words);
              this._mode.__creator = modeCreator;
            }
          },
          _doProcessBlock: function(words, offset) {
            this._mode.processBlock(words, offset);
          },
          _doFinalize: function() {
            var finalProcessedBlocks;
            var padding = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
              padding.pad(this._data, this.blockSize);
              finalProcessedBlocks = this._process(true);
            } else {
              finalProcessedBlocks = this._process(true);
              padding.unpad(finalProcessedBlocks);
            }
            return finalProcessedBlocks;
          },
          blockSize: 4
        });
        var CipherParams = C_lib.CipherParams = Base.extend({
          init: function(cipherParams) {
            this.mixIn(cipherParams);
          },
          toString: function(formatter) {
            return (formatter || this.formatter).stringify(this);
          }
        });
        var C_format = C.format = {};
        var OpenSSLFormatter = C_format.OpenSSL = {
          stringify: function(cipherParams) {
            var wordArray;
            var ciphertext = cipherParams.ciphertext;
            var salt = cipherParams.salt;
            wordArray = salt ? WordArray.create([ 1398893684, 1701076831 ]).concat(salt).concat(ciphertext) : ciphertext;
            return wordArray.toString(Base64);
          },
          parse: function(openSSLStr) {
            var salt;
            var ciphertext = Base64.parse(openSSLStr);
            var ciphertextWords = ciphertext.words;
            if (1398893684 == ciphertextWords[0] && 1701076831 == ciphertextWords[1]) {
              salt = WordArray.create(ciphertextWords.slice(2, 4));
              ciphertextWords.splice(0, 4);
              ciphertext.sigBytes -= 16;
            }
            return CipherParams.create({
              ciphertext: ciphertext,
              salt: salt
            });
          }
        };
        var SerializableCipher = C_lib.SerializableCipher = Base.extend({
          cfg: Base.extend({
            format: OpenSSLFormatter
          }),
          encrypt: function(cipher, message, key, cfg) {
            cfg = this.cfg.extend(cfg);
            var encryptor = cipher.createEncryptor(key, cfg);
            var ciphertext = encryptor.finalize(message);
            var cipherCfg = encryptor.cfg;
            return CipherParams.create({
              ciphertext: ciphertext,
              key: key,
              iv: cipherCfg.iv,
              algorithm: cipher,
              mode: cipherCfg.mode,
              padding: cipherCfg.padding,
              blockSize: cipher.blockSize,
              formatter: cfg.format
            });
          },
          decrypt: function(cipher, ciphertext, key, cfg) {
            cfg = this.cfg.extend(cfg);
            ciphertext = this._parse(ciphertext, cfg.format);
            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
            return plaintext;
          },
          _parse: function(ciphertext, format) {
            return "string" == typeof ciphertext ? format.parse(ciphertext, this) : ciphertext;
          }
        });
        var C_kdf = C.kdf = {};
        var OpenSSLKdf = C_kdf.OpenSSL = {
          execute: function(password, keySize, ivSize, salt, hasher) {
            salt || (salt = WordArray.random(8));
            if (hasher) var key = EvpKDF.create({
              keySize: keySize + ivSize,
              hasher: hasher
            }).compute(password, salt); else var key = EvpKDF.create({
              keySize: keySize + ivSize
            }).compute(password, salt);
            var iv = WordArray.create(key.words.slice(keySize), 4 * ivSize);
            key.sigBytes = 4 * keySize;
            return CipherParams.create({
              key: key,
              iv: iv,
              salt: salt
            });
          }
        };
        var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
          cfg: SerializableCipher.cfg.extend({
            kdf: OpenSSLKdf
          }),
          encrypt: function(cipher, message, password, cfg) {
            cfg = this.cfg.extend(cfg);
            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, cfg.salt, cfg.hasher);
            cfg.iv = derivedParams.iv;
            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
            ciphertext.mixIn(derivedParams);
            return ciphertext;
          },
          decrypt: function(cipher, ciphertext, password, cfg) {
            cfg = this.cfg.extend(cfg);
            ciphertext = this._parse(ciphertext, cfg.format);
            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt, cfg.hasher);
            cfg.iv = derivedParams.iv;
            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
            return plaintext;
          }
        });
      }();
    });
  }, {
    "./core": 5,
    "./evpkdf": 9
  } ],
  5: [ function(require, module, exports) {
    (function(global) {
      (function(root, factory) {
        "object" === typeof exports ? module.exports = exports = factory() : "function" === typeof define && define.amd ? define([], factory) : root.CryptoJS = factory();
      })(this, function() {
        var CryptoJS = CryptoJS || function(Math, undefined) {
          var crypto;
          "undefined" !== typeof window && window.crypto && (crypto = window.crypto);
          "undefined" !== typeof self && self.crypto && (crypto = self.crypto);
          "undefined" !== typeof globalThis && globalThis.crypto && (crypto = globalThis.crypto);
          !crypto && "undefined" !== typeof window && window.msCrypto && (crypto = window.msCrypto);
          !crypto && "undefined" !== typeof global && global.crypto && (crypto = global.crypto);
          if (!crypto && "function" === typeof require) try {
            crypto = require("crypto");
          } catch (err) {}
          var cryptoSecureRandomInt = function() {
            if (crypto) {
              if ("function" === typeof crypto.getRandomValues) try {
                return crypto.getRandomValues(new Uint32Array(1))[0];
              } catch (err) {}
              if ("function" === typeof crypto.randomBytes) try {
                return crypto.randomBytes(4).readInt32LE();
              } catch (err) {}
            }
            throw new Error("Native crypto module could not be used to get secure random number.");
          };
          var create = Object.create || function() {
            function F() {}
            return function(obj) {
              var subtype;
              F.prototype = obj;
              subtype = new F();
              F.prototype = null;
              return subtype;
            };
          }();
          var C = {};
          var C_lib = C.lib = {};
          var Base = C_lib.Base = function() {
            return {
              extend: function(overrides) {
                var subtype = create(this);
                overrides && subtype.mixIn(overrides);
                subtype.hasOwnProperty("init") && this.init !== subtype.init || (subtype.init = function() {
                  subtype.$super.init.apply(this, arguments);
                });
                subtype.init.prototype = subtype;
                subtype.$super = this;
                return subtype;
              },
              create: function() {
                var instance = this.extend();
                instance.init.apply(instance, arguments);
                return instance;
              },
              init: function() {},
              mixIn: function(properties) {
                for (var propertyName in properties) properties.hasOwnProperty(propertyName) && (this[propertyName] = properties[propertyName]);
                properties.hasOwnProperty("toString") && (this.toString = properties.toString);
              },
              clone: function() {
                return this.init.prototype.extend(this);
              }
            };
          }();
          var WordArray = C_lib.WordArray = Base.extend({
            init: function(words, sigBytes) {
              words = this.words = words || [];
              this.sigBytes = sigBytes != undefined ? sigBytes : 4 * words.length;
            },
            toString: function(encoder) {
              return (encoder || Hex).stringify(this);
            },
            concat: function(wordArray) {
              var thisWords = this.words;
              var thatWords = wordArray.words;
              var thisSigBytes = this.sigBytes;
              var thatSigBytes = wordArray.sigBytes;
              this.clamp();
              if (thisSigBytes % 4) for (var i = 0; i < thatSigBytes; i++) {
                var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
              } else for (var j = 0; j < thatSigBytes; j += 4) thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
              this.sigBytes += thatSigBytes;
              return this;
            },
            clamp: function() {
              var words = this.words;
              var sigBytes = this.sigBytes;
              words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
              words.length = Math.ceil(sigBytes / 4);
            },
            clone: function() {
              var clone = Base.clone.call(this);
              clone.words = this.words.slice(0);
              return clone;
            },
            random: function(nBytes) {
              var words = [];
              for (var i = 0; i < nBytes; i += 4) words.push(cryptoSecureRandomInt());
              return new WordArray.init(words, nBytes);
            }
          });
          var C_enc = C.enc = {};
          var Hex = C_enc.Hex = {
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var hexChars = [];
              for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                hexChars.push((bite >>> 4).toString(16));
                hexChars.push((15 & bite).toString(16));
              }
              return hexChars.join("");
            },
            parse: function(hexStr) {
              var hexStrLength = hexStr.length;
              var words = [];
              for (var i = 0; i < hexStrLength; i += 2) words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
              return new WordArray.init(words, hexStrLength / 2);
            }
          };
          var Latin1 = C_enc.Latin1 = {
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var latin1Chars = [];
              for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                latin1Chars.push(String.fromCharCode(bite));
              }
              return latin1Chars.join("");
            },
            parse: function(latin1Str) {
              var latin1StrLength = latin1Str.length;
              var words = [];
              for (var i = 0; i < latin1StrLength; i++) words[i >>> 2] |= (255 & latin1Str.charCodeAt(i)) << 24 - i % 4 * 8;
              return new WordArray.init(words, latin1StrLength);
            }
          };
          var Utf8 = C_enc.Utf8 = {
            stringify: function(wordArray) {
              try {
                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
              } catch (e) {
                throw new Error("Malformed UTF-8 data");
              }
            },
            parse: function(utf8Str) {
              return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
            }
          };
          var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
            reset: function() {
              this._data = new WordArray.init();
              this._nDataBytes = 0;
            },
            _append: function(data) {
              "string" == typeof data && (data = Utf8.parse(data));
              this._data.concat(data);
              this._nDataBytes += data.sigBytes;
            },
            _process: function(doFlush) {
              var processedWords;
              var data = this._data;
              var dataWords = data.words;
              var dataSigBytes = data.sigBytes;
              var blockSize = this.blockSize;
              var blockSizeBytes = 4 * blockSize;
              var nBlocksReady = dataSigBytes / blockSizeBytes;
              nBlocksReady = doFlush ? Math.ceil(nBlocksReady) : Math.max((0 | nBlocksReady) - this._minBufferSize, 0);
              var nWordsReady = nBlocksReady * blockSize;
              var nBytesReady = Math.min(4 * nWordsReady, dataSigBytes);
              if (nWordsReady) {
                for (var offset = 0; offset < nWordsReady; offset += blockSize) this._doProcessBlock(dataWords, offset);
                processedWords = dataWords.splice(0, nWordsReady);
                data.sigBytes -= nBytesReady;
              }
              return new WordArray.init(processedWords, nBytesReady);
            },
            clone: function() {
              var clone = Base.clone.call(this);
              clone._data = this._data.clone();
              return clone;
            },
            _minBufferSize: 0
          });
          var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
            cfg: Base.extend(),
            init: function(cfg) {
              this.cfg = this.cfg.extend(cfg);
              this.reset();
            },
            reset: function() {
              BufferedBlockAlgorithm.reset.call(this);
              this._doReset();
            },
            update: function(messageUpdate) {
              this._append(messageUpdate);
              this._process();
              return this;
            },
            finalize: function(messageUpdate) {
              messageUpdate && this._append(messageUpdate);
              var hash = this._doFinalize();
              return hash;
            },
            blockSize: 16,
            _createHelper: function(hasher) {
              return function(message, cfg) {
                return new hasher.init(cfg).finalize(message);
              };
            },
            _createHmacHelper: function(hasher) {
              return function(message, key) {
                return new C_algo.HMAC.init(hasher, key).finalize(message);
              };
            }
          });
          var C_algo = C.algo = {};
          return C;
        }(Math);
        return CryptoJS;
      });
    }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {});
  }, {
    crypto: 1
  } ],
  6: [ function(require, module, exports) {
    (function(root, factory) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core")) : "function" === typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;
        var Base64 = C_enc.Base64 = {
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var map = this._map;
            wordArray.clamp();
            var base64Chars = [];
            for (var i = 0; i < sigBytes; i += 3) {
              var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
              var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
              var triplet = byte1 << 16 | byte2 << 8 | byte3;
              for (var j = 0; j < 4 && i + .75 * j < sigBytes; j++) base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) while (base64Chars.length % 4) base64Chars.push(paddingChar);
            return base64Chars.join("");
          },
          parse: function(base64Str) {
            var base64StrLength = base64Str.length;
            var map = this._map;
            var reverseMap = this._reverseMap;
            if (!reverseMap) {
              reverseMap = this._reverseMap = [];
              for (var j = 0; j < map.length; j++) reverseMap[map.charCodeAt(j)] = j;
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) {
              var paddingIndex = base64Str.indexOf(paddingChar);
              -1 !== paddingIndex && (base64StrLength = paddingIndex);
            }
            return parseLoop(base64Str, base64StrLength, reverseMap);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
        function parseLoop(base64Str, base64StrLength, reverseMap) {
          var words = [];
          var nBytes = 0;
          for (var i = 0; i < base64StrLength; i++) if (i % 4) {
            var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
            var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
            var bitsCombined = bits1 | bits2;
            words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
            nBytes++;
          }
          return WordArray.create(words, nBytes);
        }
      })();
      return CryptoJS.enc.Base64;
    });
  }, {
    "./core": 5
  } ],
  7: [ function(require, module, exports) {
    (function(root, factory) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core")) : "function" === typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;
        var Base64url = C_enc.Base64url = {
          stringify: function(wordArray, urlSafe) {
            void 0 === urlSafe && (urlSafe = true);
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var map = urlSafe ? this._safe_map : this._map;
            wordArray.clamp();
            var base64Chars = [];
            for (var i = 0; i < sigBytes; i += 3) {
              var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
              var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
              var triplet = byte1 << 16 | byte2 << 8 | byte3;
              for (var j = 0; j < 4 && i + .75 * j < sigBytes; j++) base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) while (base64Chars.length % 4) base64Chars.push(paddingChar);
            return base64Chars.join("");
          },
          parse: function(base64Str, urlSafe) {
            void 0 === urlSafe && (urlSafe = true);
            var base64StrLength = base64Str.length;
            var map = urlSafe ? this._safe_map : this._map;
            var reverseMap = this._reverseMap;
            if (!reverseMap) {
              reverseMap = this._reverseMap = [];
              for (var j = 0; j < map.length; j++) reverseMap[map.charCodeAt(j)] = j;
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) {
              var paddingIndex = base64Str.indexOf(paddingChar);
              -1 !== paddingIndex && (base64StrLength = paddingIndex);
            }
            return parseLoop(base64Str, base64StrLength, reverseMap);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
        };
        function parseLoop(base64Str, base64StrLength, reverseMap) {
          var words = [];
          var nBytes = 0;
          for (var i = 0; i < base64StrLength; i++) if (i % 4) {
            var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
            var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
            var bitsCombined = bits1 | bits2;
            words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
            nBytes++;
          }
          return WordArray.create(words, nBytes);
        }
      })();
      return CryptoJS.enc.Base64url;
    });
  }, {
    "./core": 5
  } ],
  8: [ function(require, module, exports) {
    (function(root, factory) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core")) : "function" === typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;
        var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var utf16Chars = [];
            for (var i = 0; i < sigBytes; i += 2) {
              var codePoint = words[i >>> 2] >>> 16 - i % 4 * 8 & 65535;
              utf16Chars.push(String.fromCharCode(codePoint));
            }
            return utf16Chars.join("");
          },
          parse: function(utf16Str) {
            var utf16StrLength = utf16Str.length;
            var words = [];
            for (var i = 0; i < utf16StrLength; i++) words[i >>> 1] |= utf16Str.charCodeAt(i) << 16 - i % 2 * 16;
            return WordArray.create(words, 2 * utf16StrLength);
          }
        };
        C_enc.Utf16LE = {
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var utf16Chars = [];
            for (var i = 0; i < sigBytes; i += 2) {
              var codePoint = swapEndian(words[i >>> 2] >>> 16 - i % 4 * 8 & 65535);
              utf16Chars.push(String.fromCharCode(codePoint));
            }
            return utf16Chars.join("");
          },
          parse: function(utf16Str) {
            var utf16StrLength = utf16Str.length;
            var words = [];
            for (var i = 0; i < utf16StrLength; i++) words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << 16 - i % 2 * 16);
            return WordArray.create(words, 2 * utf16StrLength);
          }
        };
        function swapEndian(word) {
          return word << 8 & 4278255360 | word >>> 8 & 16711935;
        }
      })();
      return CryptoJS.enc.Utf16;
    });
  }, {
    "./core": 5
  } ],
  9: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./sha1"), require("./hmac")) : "function" === typeof define && define.amd ? define([ "./core", "./sha1", "./hmac" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var MD5 = C_algo.MD5;
        var EvpKDF = C_algo.EvpKDF = Base.extend({
          cfg: Base.extend({
            keySize: 4,
            hasher: MD5,
            iterations: 1
          }),
          init: function(cfg) {
            this.cfg = this.cfg.extend(cfg);
          },
          compute: function(password, salt) {
            var block;
            var cfg = this.cfg;
            var hasher = cfg.hasher.create();
            var derivedKey = WordArray.create();
            var derivedKeyWords = derivedKey.words;
            var keySize = cfg.keySize;
            var iterations = cfg.iterations;
            while (derivedKeyWords.length < keySize) {
              block && hasher.update(block);
              block = hasher.update(password).finalize(salt);
              hasher.reset();
              for (var i = 1; i < iterations; i++) {
                block = hasher.finalize(block);
                hasher.reset();
              }
              derivedKey.concat(block);
            }
            derivedKey.sigBytes = 4 * keySize;
            return derivedKey;
          }
        });
        C.EvpKDF = function(password, salt, cfg) {
          return EvpKDF.create(cfg).compute(password, salt);
        };
      })();
      return CryptoJS.EvpKDF;
    });
  }, {
    "./core": 5,
    "./hmac": 11,
    "./sha1": 30
  } ],
  10: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function(undefined) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var CipherParams = C_lib.CipherParams;
        var C_enc = C.enc;
        var Hex = C_enc.Hex;
        var C_format = C.format;
        var HexFormatter = C_format.Hex = {
          stringify: function(cipherParams) {
            return cipherParams.ciphertext.toString(Hex);
          },
          parse: function(input) {
            var ciphertext = Hex.parse(input);
            return CipherParams.create({
              ciphertext: ciphertext
            });
          }
        };
      })();
      return CryptoJS.format.Hex;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5
  } ],
  11: [ function(require, module, exports) {
    (function(root, factory) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core")) : "function" === typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var C_enc = C.enc;
        var Utf8 = C_enc.Utf8;
        var C_algo = C.algo;
        var HMAC = C_algo.HMAC = Base.extend({
          init: function(hasher, key) {
            hasher = this._hasher = new hasher.init();
            "string" == typeof key && (key = Utf8.parse(key));
            var hasherBlockSize = hasher.blockSize;
            var hasherBlockSizeBytes = 4 * hasherBlockSize;
            key.sigBytes > hasherBlockSizeBytes && (key = hasher.finalize(key));
            key.clamp();
            var oKey = this._oKey = key.clone();
            var iKey = this._iKey = key.clone();
            var oKeyWords = oKey.words;
            var iKeyWords = iKey.words;
            for (var i = 0; i < hasherBlockSize; i++) {
              oKeyWords[i] ^= 1549556828;
              iKeyWords[i] ^= 909522486;
            }
            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
            this.reset();
          },
          reset: function() {
            var hasher = this._hasher;
            hasher.reset();
            hasher.update(this._iKey);
          },
          update: function(messageUpdate) {
            this._hasher.update(messageUpdate);
            return this;
          },
          finalize: function(messageUpdate) {
            var hasher = this._hasher;
            var innerHash = hasher.finalize(messageUpdate);
            hasher.reset();
            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
            return hmac;
          }
        });
      })();
    });
  }, {
    "./core": 5
  } ],
  12: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./x64-core"), require("./lib-typedarrays"), require("./enc-utf16"), require("./enc-base64"), require("./enc-base64url"), require("./md5"), require("./sha1"), require("./sha256"), require("./sha224"), require("./sha512"), require("./sha384"), require("./sha3"), require("./ripemd160"), require("./hmac"), require("./pbkdf2"), require("./evpkdf"), require("./cipher-core"), require("./mode-cfb"), require("./mode-ctr"), require("./mode-ctr-gladman"), require("./mode-ofb"), require("./mode-ecb"), require("./pad-ansix923"), require("./pad-iso10126"), require("./pad-iso97971"), require("./pad-zeropadding"), require("./pad-nopadding"), require("./format-hex"), require("./aes"), require("./tripledes"), require("./rc4"), require("./rabbit"), require("./rabbit-legacy"), require("./blowfish")) : "function" === typeof define && define.amd ? define([ "./core", "./x64-core", "./lib-typedarrays", "./enc-utf16", "./enc-base64", "./enc-base64url", "./md5", "./sha1", "./sha256", "./sha224", "./sha512", "./sha384", "./sha3", "./ripemd160", "./hmac", "./pbkdf2", "./evpkdf", "./cipher-core", "./mode-cfb", "./mode-ctr", "./mode-ctr-gladman", "./mode-ofb", "./mode-ecb", "./pad-ansix923", "./pad-iso10126", "./pad-iso97971", "./pad-zeropadding", "./pad-nopadding", "./format-hex", "./aes", "./tripledes", "./rc4", "./rabbit", "./rabbit-legacy", "./blowfish" ], factory) : root.CryptoJS = factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      return CryptoJS;
    });
  }, {
    "./aes": 2,
    "./blowfish": 3,
    "./cipher-core": 4,
    "./core": 5,
    "./enc-base64": 6,
    "./enc-base64url": 7,
    "./enc-utf16": 8,
    "./evpkdf": 9,
    "./format-hex": 10,
    "./hmac": 11,
    "./lib-typedarrays": 13,
    "./md5": 14,
    "./mode-cfb": 15,
    "./mode-ctr": 17,
    "./mode-ctr-gladman": 16,
    "./mode-ecb": 18,
    "./mode-ofb": 19,
    "./pad-ansix923": 20,
    "./pad-iso10126": 21,
    "./pad-iso97971": 22,
    "./pad-nopadding": 23,
    "./pad-zeropadding": 24,
    "./pbkdf2": 25,
    "./rabbit": 27,
    "./rabbit-legacy": 26,
    "./rc4": 28,
    "./ripemd160": 29,
    "./sha1": 30,
    "./sha224": 31,
    "./sha256": 32,
    "./sha3": 33,
    "./sha384": 34,
    "./sha512": 35,
    "./tripledes": 36,
    "./x64-core": 37
  } ],
  13: [ function(require, module, exports) {
    (function(root, factory) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core")) : "function" === typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        if ("function" != typeof ArrayBuffer) return;
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var superInit = WordArray.init;
        var subInit = WordArray.init = function(typedArray) {
          typedArray instanceof ArrayBuffer && (typedArray = new Uint8Array(typedArray));
          (typedArray instanceof Int8Array || "undefined" !== typeof Uint8ClampedArray && typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) && (typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength));
          if (typedArray instanceof Uint8Array) {
            var typedArrayByteLength = typedArray.byteLength;
            var words = [];
            for (var i = 0; i < typedArrayByteLength; i++) words[i >>> 2] |= typedArray[i] << 24 - i % 4 * 8;
            superInit.call(this, words, typedArrayByteLength);
          } else superInit.apply(this, arguments);
        };
        subInit.prototype = WordArray;
      })();
      return CryptoJS.lib.WordArray;
    });
  }, {
    "./core": 5
  } ],
  14: [ function(require, module, exports) {
    (function(root, factory) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core")) : "function" === typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function(Math) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var T = [];
        (function() {
          for (var i = 0; i < 64; i++) T[i] = 4294967296 * Math.abs(Math.sin(i + 1)) | 0;
        })();
        var MD5 = C_algo.MD5 = Hasher.extend({
          _doReset: function() {
            this._hash = new WordArray.init([ 1732584193, 4023233417, 2562383102, 271733878 ]);
          },
          _doProcessBlock: function(M, offset) {
            for (var i = 0; i < 16; i++) {
              var offset_i = offset + i;
              var M_offset_i = M[offset_i];
              M[offset_i] = 16711935 & (M_offset_i << 8 | M_offset_i >>> 24) | 4278255360 & (M_offset_i << 24 | M_offset_i >>> 8);
            }
            var H = this._hash.words;
            var M_offset_0 = M[offset + 0];
            var M_offset_1 = M[offset + 1];
            var M_offset_2 = M[offset + 2];
            var M_offset_3 = M[offset + 3];
            var M_offset_4 = M[offset + 4];
            var M_offset_5 = M[offset + 5];
            var M_offset_6 = M[offset + 6];
            var M_offset_7 = M[offset + 7];
            var M_offset_8 = M[offset + 8];
            var M_offset_9 = M[offset + 9];
            var M_offset_10 = M[offset + 10];
            var M_offset_11 = M[offset + 11];
            var M_offset_12 = M[offset + 12];
            var M_offset_13 = M[offset + 13];
            var M_offset_14 = M[offset + 14];
            var M_offset_15 = M[offset + 15];
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            a = FF(a, b, c, d, M_offset_0, 7, T[0]);
            d = FF(d, a, b, c, M_offset_1, 12, T[1]);
            c = FF(c, d, a, b, M_offset_2, 17, T[2]);
            b = FF(b, c, d, a, M_offset_3, 22, T[3]);
            a = FF(a, b, c, d, M_offset_4, 7, T[4]);
            d = FF(d, a, b, c, M_offset_5, 12, T[5]);
            c = FF(c, d, a, b, M_offset_6, 17, T[6]);
            b = FF(b, c, d, a, M_offset_7, 22, T[7]);
            a = FF(a, b, c, d, M_offset_8, 7, T[8]);
            d = FF(d, a, b, c, M_offset_9, 12, T[9]);
            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
            a = FF(a, b, c, d, M_offset_12, 7, T[12]);
            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
            b = FF(b, c, d, a, M_offset_15, 22, T[15]);
            a = GG(a, b, c, d, M_offset_1, 5, T[16]);
            d = GG(d, a, b, c, M_offset_6, 9, T[17]);
            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
            b = GG(b, c, d, a, M_offset_0, 20, T[19]);
            a = GG(a, b, c, d, M_offset_5, 5, T[20]);
            d = GG(d, a, b, c, M_offset_10, 9, T[21]);
            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
            b = GG(b, c, d, a, M_offset_4, 20, T[23]);
            a = GG(a, b, c, d, M_offset_9, 5, T[24]);
            d = GG(d, a, b, c, M_offset_14, 9, T[25]);
            c = GG(c, d, a, b, M_offset_3, 14, T[26]);
            b = GG(b, c, d, a, M_offset_8, 20, T[27]);
            a = GG(a, b, c, d, M_offset_13, 5, T[28]);
            d = GG(d, a, b, c, M_offset_2, 9, T[29]);
            c = GG(c, d, a, b, M_offset_7, 14, T[30]);
            b = GG(b, c, d, a, M_offset_12, 20, T[31]);
            a = HH(a, b, c, d, M_offset_5, 4, T[32]);
            d = HH(d, a, b, c, M_offset_8, 11, T[33]);
            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
            a = HH(a, b, c, d, M_offset_1, 4, T[36]);
            d = HH(d, a, b, c, M_offset_4, 11, T[37]);
            c = HH(c, d, a, b, M_offset_7, 16, T[38]);
            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
            a = HH(a, b, c, d, M_offset_13, 4, T[40]);
            d = HH(d, a, b, c, M_offset_0, 11, T[41]);
            c = HH(c, d, a, b, M_offset_3, 16, T[42]);
            b = HH(b, c, d, a, M_offset_6, 23, T[43]);
            a = HH(a, b, c, d, M_offset_9, 4, T[44]);
            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
            b = HH(b, c, d, a, M_offset_2, 23, T[47]);
            a = II(a, b, c, d, M_offset_0, 6, T[48]);
            d = II(d, a, b, c, M_offset_7, 10, T[49]);
            c = II(c, d, a, b, M_offset_14, 15, T[50]);
            b = II(b, c, d, a, M_offset_5, 21, T[51]);
            a = II(a, b, c, d, M_offset_12, 6, T[52]);
            d = II(d, a, b, c, M_offset_3, 10, T[53]);
            c = II(c, d, a, b, M_offset_10, 15, T[54]);
            b = II(b, c, d, a, M_offset_1, 21, T[55]);
            a = II(a, b, c, d, M_offset_8, 6, T[56]);
            d = II(d, a, b, c, M_offset_15, 10, T[57]);
            c = II(c, d, a, b, M_offset_6, 15, T[58]);
            b = II(b, c, d, a, M_offset_13, 21, T[59]);
            a = II(a, b, c, d, M_offset_4, 6, T[60]);
            d = II(d, a, b, c, M_offset_11, 10, T[61]);
            c = II(c, d, a, b, M_offset_2, 15, T[62]);
            b = II(b, c, d, a, M_offset_9, 21, T[63]);
            H[0] = H[0] + a | 0;
            H[1] = H[1] + b | 0;
            H[2] = H[2] + c | 0;
            H[3] = H[3] + d | 0;
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = 8 * this._nDataBytes;
            var nBitsLeft = 8 * data.sigBytes;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            var nBitsTotalH = Math.floor(nBitsTotal / 4294967296);
            var nBitsTotalL = nBitsTotal;
            dataWords[15 + (nBitsLeft + 64 >>> 9 << 4)] = 16711935 & (nBitsTotalH << 8 | nBitsTotalH >>> 24) | 4278255360 & (nBitsTotalH << 24 | nBitsTotalH >>> 8);
            dataWords[14 + (nBitsLeft + 64 >>> 9 << 4)] = 16711935 & (nBitsTotalL << 8 | nBitsTotalL >>> 24) | 4278255360 & (nBitsTotalL << 24 | nBitsTotalL >>> 8);
            data.sigBytes = 4 * (dataWords.length + 1);
            this._process();
            var hash = this._hash;
            var H = hash.words;
            for (var i = 0; i < 4; i++) {
              var H_i = H[i];
              H[i] = 16711935 & (H_i << 8 | H_i >>> 24) | 4278255360 & (H_i << 24 | H_i >>> 8);
            }
            return hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        function FF(a, b, c, d, x, s, t) {
          var n = a + (b & c | ~b & d) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        function GG(a, b, c, d, x, s, t) {
          var n = a + (b & d | c & ~d) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        function HH(a, b, c, d, x, s, t) {
          var n = a + (b ^ c ^ d) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        function II(a, b, c, d, x, s, t) {
          var n = a + (c ^ (b | ~d)) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        C.MD5 = Hasher._createHelper(MD5);
        C.HmacMD5 = Hasher._createHmacHelper(MD5);
      })(Math);
      return CryptoJS.MD5;
    });
  }, {
    "./core": 5
  } ],
  15: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      CryptoJS.mode.CFB = function() {
        var CFB = CryptoJS.lib.BlockCipherMode.extend();
        CFB.Encryptor = CFB.extend({
          processBlock: function(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
            this._prevBlock = words.slice(offset, offset + blockSize);
          }
        });
        CFB.Decryptor = CFB.extend({
          processBlock: function(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var thisBlock = words.slice(offset, offset + blockSize);
            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
            this._prevBlock = thisBlock;
          }
        });
        function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
          var keystream;
          var iv = this._iv;
          if (iv) {
            keystream = iv.slice(0);
            this._iv = void 0;
          } else keystream = this._prevBlock;
          cipher.encryptBlock(keystream, 0);
          for (var i = 0; i < blockSize; i++) words[offset + i] ^= keystream[i];
        }
        return CFB;
      }();
      return CryptoJS.mode.CFB;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5
  } ],
  16: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      CryptoJS.mode.CTRGladman = function() {
        var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();
        function incWord(word) {
          if (255 === (word >> 24 & 255)) {
            var b1 = word >> 16 & 255;
            var b2 = word >> 8 & 255;
            var b3 = 255 & word;
            if (255 === b1) {
              b1 = 0;
              if (255 === b2) {
                b2 = 0;
                255 === b3 ? b3 = 0 : ++b3;
              } else ++b2;
            } else ++b1;
            word = 0;
            word += b1 << 16;
            word += b2 << 8;
            word += b3;
          } else word += 1 << 24;
          return word;
        }
        function incCounter(counter) {
          0 === (counter[0] = incWord(counter[0])) && (counter[1] = incWord(counter[1]));
          return counter;
        }
        var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
          processBlock: function(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var counter = this._counter;
            if (iv) {
              counter = this._counter = iv.slice(0);
              this._iv = void 0;
            }
            incCounter(counter);
            var keystream = counter.slice(0);
            cipher.encryptBlock(keystream, 0);
            for (var i = 0; i < blockSize; i++) words[offset + i] ^= keystream[i];
          }
        });
        CTRGladman.Decryptor = Encryptor;
        return CTRGladman;
      }();
      return CryptoJS.mode.CTRGladman;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5
  } ],
  17: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      CryptoJS.mode.CTR = function() {
        var CTR = CryptoJS.lib.BlockCipherMode.extend();
        var Encryptor = CTR.Encryptor = CTR.extend({
          processBlock: function(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var counter = this._counter;
            if (iv) {
              counter = this._counter = iv.slice(0);
              this._iv = void 0;
            }
            var keystream = counter.slice(0);
            cipher.encryptBlock(keystream, 0);
            counter[blockSize - 1] = counter[blockSize - 1] + 1 | 0;
            for (var i = 0; i < blockSize; i++) words[offset + i] ^= keystream[i];
          }
        });
        CTR.Decryptor = Encryptor;
        return CTR;
      }();
      return CryptoJS.mode.CTR;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5
  } ],
  18: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      CryptoJS.mode.ECB = function() {
        var ECB = CryptoJS.lib.BlockCipherMode.extend();
        ECB.Encryptor = ECB.extend({
          processBlock: function(words, offset) {
            this._cipher.encryptBlock(words, offset);
          }
        });
        ECB.Decryptor = ECB.extend({
          processBlock: function(words, offset) {
            this._cipher.decryptBlock(words, offset);
          }
        });
        return ECB;
      }();
      return CryptoJS.mode.ECB;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5
  } ],
  19: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      CryptoJS.mode.OFB = function() {
        var OFB = CryptoJS.lib.BlockCipherMode.extend();
        var Encryptor = OFB.Encryptor = OFB.extend({
          processBlock: function(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var keystream = this._keystream;
            if (iv) {
              keystream = this._keystream = iv.slice(0);
              this._iv = void 0;
            }
            cipher.encryptBlock(keystream, 0);
            for (var i = 0; i < blockSize; i++) words[offset + i] ^= keystream[i];
          }
        });
        OFB.Decryptor = Encryptor;
        return OFB;
      }();
      return CryptoJS.mode.OFB;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5
  } ],
  20: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      CryptoJS.pad.AnsiX923 = {
        pad: function(data, blockSize) {
          var dataSigBytes = data.sigBytes;
          var blockSizeBytes = 4 * blockSize;
          var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;
          var lastBytePos = dataSigBytes + nPaddingBytes - 1;
          data.clamp();
          data.words[lastBytePos >>> 2] |= nPaddingBytes << 24 - lastBytePos % 4 * 8;
          data.sigBytes += nPaddingBytes;
        },
        unpad: function(data) {
          var nPaddingBytes = 255 & data.words[data.sigBytes - 1 >>> 2];
          data.sigBytes -= nPaddingBytes;
        }
      };
      return CryptoJS.pad.Ansix923;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5
  } ],
  21: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      CryptoJS.pad.Iso10126 = {
        pad: function(data, blockSize) {
          var blockSizeBytes = 4 * blockSize;
          var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
          data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).concat(CryptoJS.lib.WordArray.create([ nPaddingBytes << 24 ], 1));
        },
        unpad: function(data) {
          var nPaddingBytes = 255 & data.words[data.sigBytes - 1 >>> 2];
          data.sigBytes -= nPaddingBytes;
        }
      };
      return CryptoJS.pad.Iso10126;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5
  } ],
  22: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      CryptoJS.pad.Iso97971 = {
        pad: function(data, blockSize) {
          data.concat(CryptoJS.lib.WordArray.create([ 2147483648 ], 1));
          CryptoJS.pad.ZeroPadding.pad(data, blockSize);
        },
        unpad: function(data) {
          CryptoJS.pad.ZeroPadding.unpad(data);
          data.sigBytes--;
        }
      };
      return CryptoJS.pad.Iso97971;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5
  } ],
  23: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      CryptoJS.pad.NoPadding = {
        pad: function() {},
        unpad: function() {}
      };
      return CryptoJS.pad.NoPadding;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5
  } ],
  24: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      CryptoJS.pad.ZeroPadding = {
        pad: function(data, blockSize) {
          var blockSizeBytes = 4 * blockSize;
          data.clamp();
          data.sigBytes += blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
        },
        unpad: function(data) {
          var dataWords = data.words;
          var i = data.sigBytes - 1;
          for (var i = data.sigBytes - 1; i >= 0; i--) if (dataWords[i >>> 2] >>> 24 - i % 4 * 8 & 255) {
            data.sigBytes = i + 1;
            break;
          }
        }
      };
      return CryptoJS.pad.ZeroPadding;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5
  } ],
  25: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./sha256"), require("./hmac")) : "function" === typeof define && define.amd ? define([ "./core", "./sha256", "./hmac" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var SHA256 = C_algo.SHA256;
        var HMAC = C_algo.HMAC;
        var PBKDF2 = C_algo.PBKDF2 = Base.extend({
          cfg: Base.extend({
            keySize: 4,
            hasher: SHA256,
            iterations: 25e4
          }),
          init: function(cfg) {
            this.cfg = this.cfg.extend(cfg);
          },
          compute: function(password, salt) {
            var cfg = this.cfg;
            var hmac = HMAC.create(cfg.hasher, password);
            var derivedKey = WordArray.create();
            var blockIndex = WordArray.create([ 1 ]);
            var derivedKeyWords = derivedKey.words;
            var blockIndexWords = blockIndex.words;
            var keySize = cfg.keySize;
            var iterations = cfg.iterations;
            while (derivedKeyWords.length < keySize) {
              var block = hmac.update(salt).finalize(blockIndex);
              hmac.reset();
              var blockWords = block.words;
              var blockWordsLength = blockWords.length;
              var intermediate = block;
              for (var i = 1; i < iterations; i++) {
                intermediate = hmac.finalize(intermediate);
                hmac.reset();
                var intermediateWords = intermediate.words;
                for (var j = 0; j < blockWordsLength; j++) blockWords[j] ^= intermediateWords[j];
              }
              derivedKey.concat(block);
              blockIndexWords[0]++;
            }
            derivedKey.sigBytes = 4 * keySize;
            return derivedKey;
          }
        });
        C.PBKDF2 = function(password, salt, cfg) {
          return PBKDF2.create(cfg).compute(password, salt);
        };
      })();
      return CryptoJS.PBKDF2;
    });
  }, {
    "./core": 5,
    "./hmac": 11,
    "./sha256": 32
  } ],
  26: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var S = [];
        var C_ = [];
        var G = [];
        var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
          _doReset: function() {
            var K = this._key.words;
            var iv = this.cfg.iv;
            var X = this._X = [ K[0], K[3] << 16 | K[2] >>> 16, K[1], K[0] << 16 | K[3] >>> 16, K[2], K[1] << 16 | K[0] >>> 16, K[3], K[2] << 16 | K[1] >>> 16 ];
            var C = this._C = [ K[2] << 16 | K[2] >>> 16, 4294901760 & K[0] | 65535 & K[1], K[3] << 16 | K[3] >>> 16, 4294901760 & K[1] | 65535 & K[2], K[0] << 16 | K[0] >>> 16, 4294901760 & K[2] | 65535 & K[3], K[1] << 16 | K[1] >>> 16, 4294901760 & K[3] | 65535 & K[0] ];
            this._b = 0;
            for (var i = 0; i < 4; i++) nextState.call(this);
            for (var i = 0; i < 8; i++) C[i] ^= X[i + 4 & 7];
            if (iv) {
              var IV = iv.words;
              var IV_0 = IV[0];
              var IV_1 = IV[1];
              var i0 = 16711935 & (IV_0 << 8 | IV_0 >>> 24) | 4278255360 & (IV_0 << 24 | IV_0 >>> 8);
              var i2 = 16711935 & (IV_1 << 8 | IV_1 >>> 24) | 4278255360 & (IV_1 << 24 | IV_1 >>> 8);
              var i1 = i0 >>> 16 | 4294901760 & i2;
              var i3 = i2 << 16 | 65535 & i0;
              C[0] ^= i0;
              C[1] ^= i1;
              C[2] ^= i2;
              C[3] ^= i3;
              C[4] ^= i0;
              C[5] ^= i1;
              C[6] ^= i2;
              C[7] ^= i3;
              for (var i = 0; i < 4; i++) nextState.call(this);
            }
          },
          _doProcessBlock: function(M, offset) {
            var X = this._X;
            nextState.call(this);
            S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
            S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
            S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
            S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
            for (var i = 0; i < 4; i++) {
              S[i] = 16711935 & (S[i] << 8 | S[i] >>> 24) | 4278255360 & (S[i] << 24 | S[i] >>> 8);
              M[offset + i] ^= S[i];
            }
          },
          blockSize: 4,
          ivSize: 2
        });
        function nextState() {
          var X = this._X;
          var C = this._C;
          for (var i = 0; i < 8; i++) C_[i] = C[i];
          C[0] = C[0] + 1295307597 + this._b | 0;
          C[1] = C[1] + 3545052371 + (C[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
          C[2] = C[2] + 886263092 + (C[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
          C[3] = C[3] + 1295307597 + (C[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
          C[4] = C[4] + 3545052371 + (C[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
          C[5] = C[5] + 886263092 + (C[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
          C[6] = C[6] + 1295307597 + (C[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
          C[7] = C[7] + 3545052371 + (C[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
          this._b = C[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
          for (var i = 0; i < 8; i++) {
            var gx = X[i] + C[i];
            var ga = 65535 & gx;
            var gb = gx >>> 16;
            var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
            var gl = ((4294901760 & gx) * gx | 0) + ((65535 & gx) * gx | 0);
            G[i] = gh ^ gl;
          }
          X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
          X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
          X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
          X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
          X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
          X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
          X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
          X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
        }
        C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
      })();
      return CryptoJS.RabbitLegacy;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5,
    "./enc-base64": 6,
    "./evpkdf": 9,
    "./md5": 14
  } ],
  27: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var S = [];
        var C_ = [];
        var G = [];
        var Rabbit = C_algo.Rabbit = StreamCipher.extend({
          _doReset: function() {
            var K = this._key.words;
            var iv = this.cfg.iv;
            for (var i = 0; i < 4; i++) K[i] = 16711935 & (K[i] << 8 | K[i] >>> 24) | 4278255360 & (K[i] << 24 | K[i] >>> 8);
            var X = this._X = [ K[0], K[3] << 16 | K[2] >>> 16, K[1], K[0] << 16 | K[3] >>> 16, K[2], K[1] << 16 | K[0] >>> 16, K[3], K[2] << 16 | K[1] >>> 16 ];
            var C = this._C = [ K[2] << 16 | K[2] >>> 16, 4294901760 & K[0] | 65535 & K[1], K[3] << 16 | K[3] >>> 16, 4294901760 & K[1] | 65535 & K[2], K[0] << 16 | K[0] >>> 16, 4294901760 & K[2] | 65535 & K[3], K[1] << 16 | K[1] >>> 16, 4294901760 & K[3] | 65535 & K[0] ];
            this._b = 0;
            for (var i = 0; i < 4; i++) nextState.call(this);
            for (var i = 0; i < 8; i++) C[i] ^= X[i + 4 & 7];
            if (iv) {
              var IV = iv.words;
              var IV_0 = IV[0];
              var IV_1 = IV[1];
              var i0 = 16711935 & (IV_0 << 8 | IV_0 >>> 24) | 4278255360 & (IV_0 << 24 | IV_0 >>> 8);
              var i2 = 16711935 & (IV_1 << 8 | IV_1 >>> 24) | 4278255360 & (IV_1 << 24 | IV_1 >>> 8);
              var i1 = i0 >>> 16 | 4294901760 & i2;
              var i3 = i2 << 16 | 65535 & i0;
              C[0] ^= i0;
              C[1] ^= i1;
              C[2] ^= i2;
              C[3] ^= i3;
              C[4] ^= i0;
              C[5] ^= i1;
              C[6] ^= i2;
              C[7] ^= i3;
              for (var i = 0; i < 4; i++) nextState.call(this);
            }
          },
          _doProcessBlock: function(M, offset) {
            var X = this._X;
            nextState.call(this);
            S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
            S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
            S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
            S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
            for (var i = 0; i < 4; i++) {
              S[i] = 16711935 & (S[i] << 8 | S[i] >>> 24) | 4278255360 & (S[i] << 24 | S[i] >>> 8);
              M[offset + i] ^= S[i];
            }
          },
          blockSize: 4,
          ivSize: 2
        });
        function nextState() {
          var X = this._X;
          var C = this._C;
          for (var i = 0; i < 8; i++) C_[i] = C[i];
          C[0] = C[0] + 1295307597 + this._b | 0;
          C[1] = C[1] + 3545052371 + (C[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
          C[2] = C[2] + 886263092 + (C[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
          C[3] = C[3] + 1295307597 + (C[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
          C[4] = C[4] + 3545052371 + (C[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
          C[5] = C[5] + 886263092 + (C[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
          C[6] = C[6] + 1295307597 + (C[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
          C[7] = C[7] + 3545052371 + (C[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
          this._b = C[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
          for (var i = 0; i < 8; i++) {
            var gx = X[i] + C[i];
            var ga = 65535 & gx;
            var gb = gx >>> 16;
            var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
            var gl = ((4294901760 & gx) * gx | 0) + ((65535 & gx) * gx | 0);
            G[i] = gh ^ gl;
          }
          X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
          X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
          X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
          X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
          X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
          X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
          X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
          X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
        }
        C.Rabbit = StreamCipher._createHelper(Rabbit);
      })();
      return CryptoJS.Rabbit;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5,
    "./enc-base64": 6,
    "./evpkdf": 9,
    "./md5": 14
  } ],
  28: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var RC4 = C_algo.RC4 = StreamCipher.extend({
          _doReset: function() {
            var key = this._key;
            var keyWords = key.words;
            var keySigBytes = key.sigBytes;
            var S = this._S = [];
            for (var i = 0; i < 256; i++) S[i] = i;
            for (var i = 0, j = 0; i < 256; i++) {
              var keyByteIndex = i % keySigBytes;
              var keyByte = keyWords[keyByteIndex >>> 2] >>> 24 - keyByteIndex % 4 * 8 & 255;
              j = (j + S[i] + keyByte) % 256;
              var t = S[i];
              S[i] = S[j];
              S[j] = t;
            }
            this._i = this._j = 0;
          },
          _doProcessBlock: function(M, offset) {
            M[offset] ^= generateKeystreamWord.call(this);
          },
          keySize: 8,
          ivSize: 0
        });
        function generateKeystreamWord() {
          var S = this._S;
          var i = this._i;
          var j = this._j;
          var keystreamWord = 0;
          for (var n = 0; n < 4; n++) {
            i = (i + 1) % 256;
            j = (j + S[i]) % 256;
            var t = S[i];
            S[i] = S[j];
            S[j] = t;
            keystreamWord |= S[(S[i] + S[j]) % 256] << 24 - 8 * n;
          }
          this._i = i;
          this._j = j;
          return keystreamWord;
        }
        C.RC4 = StreamCipher._createHelper(RC4);
        var RC4Drop = C_algo.RC4Drop = RC4.extend({
          cfg: RC4.cfg.extend({
            drop: 192
          }),
          _doReset: function() {
            RC4._doReset.call(this);
            for (var i = this.cfg.drop; i > 0; i--) generateKeystreamWord.call(this);
          }
        });
        C.RC4Drop = StreamCipher._createHelper(RC4Drop);
      })();
      return CryptoJS.RC4;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5,
    "./enc-base64": 6,
    "./evpkdf": 9,
    "./md5": 14
  } ],
  29: [ function(require, module, exports) {
    (function(root, factory) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core")) : "function" === typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function(Math) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var _zl = WordArray.create([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13 ]);
        var _zr = WordArray.create([ 5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11 ]);
        var _sl = WordArray.create([ 11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6 ]);
        var _sr = WordArray.create([ 8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11 ]);
        var _hl = WordArray.create([ 0, 1518500249, 1859775393, 2400959708, 2840853838 ]);
        var _hr = WordArray.create([ 1352829926, 1548603684, 1836072691, 2053994217, 0 ]);
        var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
          _doReset: function() {
            this._hash = WordArray.create([ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ]);
          },
          _doProcessBlock: function(M, offset) {
            for (var i = 0; i < 16; i++) {
              var offset_i = offset + i;
              var M_offset_i = M[offset_i];
              M[offset_i] = 16711935 & (M_offset_i << 8 | M_offset_i >>> 24) | 4278255360 & (M_offset_i << 24 | M_offset_i >>> 8);
            }
            var H = this._hash.words;
            var hl = _hl.words;
            var hr = _hr.words;
            var zl = _zl.words;
            var zr = _zr.words;
            var sl = _sl.words;
            var sr = _sr.words;
            var al, bl, cl, dl, el;
            var ar, br, cr, dr, er;
            ar = al = H[0];
            br = bl = H[1];
            cr = cl = H[2];
            dr = dl = H[3];
            er = el = H[4];
            var t;
            for (var i = 0; i < 80; i += 1) {
              t = al + M[offset + zl[i]] | 0;
              t += i < 16 ? f1(bl, cl, dl) + hl[0] : i < 32 ? f2(bl, cl, dl) + hl[1] : i < 48 ? f3(bl, cl, dl) + hl[2] : i < 64 ? f4(bl, cl, dl) + hl[3] : f5(bl, cl, dl) + hl[4];
              t |= 0;
              t = rotl(t, sl[i]);
              t = t + el | 0;
              al = el;
              el = dl;
              dl = rotl(cl, 10);
              cl = bl;
              bl = t;
              t = ar + M[offset + zr[i]] | 0;
              t += i < 16 ? f5(br, cr, dr) + hr[0] : i < 32 ? f4(br, cr, dr) + hr[1] : i < 48 ? f3(br, cr, dr) + hr[2] : i < 64 ? f2(br, cr, dr) + hr[3] : f1(br, cr, dr) + hr[4];
              t |= 0;
              t = rotl(t, sr[i]);
              t = t + er | 0;
              ar = er;
              er = dr;
              dr = rotl(cr, 10);
              cr = br;
              br = t;
            }
            t = H[1] + cl + dr | 0;
            H[1] = H[2] + dl + er | 0;
            H[2] = H[3] + el + ar | 0;
            H[3] = H[4] + al + br | 0;
            H[4] = H[0] + bl + cr | 0;
            H[0] = t;
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = 8 * this._nDataBytes;
            var nBitsLeft = 8 * data.sigBytes;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[14 + (nBitsLeft + 64 >>> 9 << 4)] = 16711935 & (nBitsTotal << 8 | nBitsTotal >>> 24) | 4278255360 & (nBitsTotal << 24 | nBitsTotal >>> 8);
            data.sigBytes = 4 * (dataWords.length + 1);
            this._process();
            var hash = this._hash;
            var H = hash.words;
            for (var i = 0; i < 5; i++) {
              var H_i = H[i];
              H[i] = 16711935 & (H_i << 8 | H_i >>> 24) | 4278255360 & (H_i << 24 | H_i >>> 8);
            }
            return hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        function f1(x, y, z) {
          return x ^ y ^ z;
        }
        function f2(x, y, z) {
          return x & y | ~x & z;
        }
        function f3(x, y, z) {
          return (x | ~y) ^ z;
        }
        function f4(x, y, z) {
          return x & z | y & ~z;
        }
        function f5(x, y, z) {
          return x ^ (y | ~z);
        }
        function rotl(x, n) {
          return x << n | x >>> 32 - n;
        }
        C.RIPEMD160 = Hasher._createHelper(RIPEMD160);
        C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
      })(Math);
      return CryptoJS.RIPEMD160;
    });
  }, {
    "./core": 5
  } ],
  30: [ function(require, module, exports) {
    (function(root, factory) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core")) : "function" === typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var W = [];
        var SHA1 = C_algo.SHA1 = Hasher.extend({
          _doReset: function() {
            this._hash = new WordArray.init([ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ]);
          },
          _doProcessBlock: function(M, offset) {
            var H = this._hash.words;
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            var e = H[4];
            for (var i = 0; i < 80; i++) {
              if (i < 16) W[i] = 0 | M[offset + i]; else {
                var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                W[i] = n << 1 | n >>> 31;
              }
              var t = (a << 5 | a >>> 27) + e + W[i];
              t += i < 20 ? 1518500249 + (b & c | ~b & d) : i < 40 ? 1859775393 + (b ^ c ^ d) : i < 60 ? (b & c | b & d | c & d) - 1894007588 : (b ^ c ^ d) - 899497514;
              e = d;
              d = c;
              c = b << 30 | b >>> 2;
              b = a;
              a = t;
            }
            H[0] = H[0] + a | 0;
            H[1] = H[1] + b | 0;
            H[2] = H[2] + c | 0;
            H[3] = H[3] + d | 0;
            H[4] = H[4] + e | 0;
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = 8 * this._nDataBytes;
            var nBitsLeft = 8 * data.sigBytes;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[14 + (nBitsLeft + 64 >>> 9 << 4)] = Math.floor(nBitsTotal / 4294967296);
            dataWords[15 + (nBitsLeft + 64 >>> 9 << 4)] = nBitsTotal;
            data.sigBytes = 4 * dataWords.length;
            this._process();
            return this._hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        C.SHA1 = Hasher._createHelper(SHA1);
        C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
      })();
      return CryptoJS.SHA1;
    });
  }, {
    "./core": 5
  } ],
  31: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./sha256")) : "function" === typeof define && define.amd ? define([ "./core", "./sha256" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var SHA256 = C_algo.SHA256;
        var SHA224 = C_algo.SHA224 = SHA256.extend({
          _doReset: function() {
            this._hash = new WordArray.init([ 3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428 ]);
          },
          _doFinalize: function() {
            var hash = SHA256._doFinalize.call(this);
            hash.sigBytes -= 4;
            return hash;
          }
        });
        C.SHA224 = SHA256._createHelper(SHA224);
        C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
      })();
      return CryptoJS.SHA224;
    });
  }, {
    "./core": 5,
    "./sha256": 32
  } ],
  32: [ function(require, module, exports) {
    (function(root, factory) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core")) : "function" === typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function(Math) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var H = [];
        var K = [];
        (function() {
          function isPrime(n) {
            var sqrtN = Math.sqrt(n);
            for (var factor = 2; factor <= sqrtN; factor++) if (!(n % factor)) return false;
            return true;
          }
          function getFractionalBits(n) {
            return 4294967296 * (n - (0 | n)) | 0;
          }
          var n = 2;
          var nPrime = 0;
          while (nPrime < 64) {
            if (isPrime(n)) {
              nPrime < 8 && (H[nPrime] = getFractionalBits(Math.pow(n, .5)));
              K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));
              nPrime++;
            }
            n++;
          }
        })();
        var W = [];
        var SHA256 = C_algo.SHA256 = Hasher.extend({
          _doReset: function() {
            this._hash = new WordArray.init(H.slice(0));
          },
          _doProcessBlock: function(M, offset) {
            var H = this._hash.words;
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            var e = H[4];
            var f = H[5];
            var g = H[6];
            var h = H[7];
            for (var i = 0; i < 64; i++) {
              if (i < 16) W[i] = 0 | M[offset + i]; else {
                var gamma0x = W[i - 15];
                var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
                var gamma1x = W[i - 2];
                var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
              }
              var ch = e & f ^ ~e & g;
              var maj = a & b ^ a & c ^ b & c;
              var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
              var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
              var t1 = h + sigma1 + ch + K[i] + W[i];
              var t2 = sigma0 + maj;
              h = g;
              g = f;
              f = e;
              e = d + t1 | 0;
              d = c;
              c = b;
              b = a;
              a = t1 + t2 | 0;
            }
            H[0] = H[0] + a | 0;
            H[1] = H[1] + b | 0;
            H[2] = H[2] + c | 0;
            H[3] = H[3] + d | 0;
            H[4] = H[4] + e | 0;
            H[5] = H[5] + f | 0;
            H[6] = H[6] + g | 0;
            H[7] = H[7] + h | 0;
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = 8 * this._nDataBytes;
            var nBitsLeft = 8 * data.sigBytes;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[14 + (nBitsLeft + 64 >>> 9 << 4)] = Math.floor(nBitsTotal / 4294967296);
            dataWords[15 + (nBitsLeft + 64 >>> 9 << 4)] = nBitsTotal;
            data.sigBytes = 4 * dataWords.length;
            this._process();
            return this._hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        C.SHA256 = Hasher._createHelper(SHA256);
        C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
      })(Math);
      return CryptoJS.SHA256;
    });
  }, {
    "./core": 5
  } ],
  33: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./x64-core")) : "function" === typeof define && define.amd ? define([ "./core", "./x64-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function(Math) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_x64 = C.x64;
        var X64Word = C_x64.Word;
        var C_algo = C.algo;
        var RHO_OFFSETS = [];
        var PI_INDEXES = [];
        var ROUND_CONSTANTS = [];
        (function() {
          var x = 1, y = 0;
          for (var t = 0; t < 24; t++) {
            RHO_OFFSETS[x + 5 * y] = (t + 1) * (t + 2) / 2 % 64;
            var newX = y % 5;
            var newY = (2 * x + 3 * y) % 5;
            x = newX;
            y = newY;
          }
          for (var x = 0; x < 5; x++) for (var y = 0; y < 5; y++) PI_INDEXES[x + 5 * y] = y + (2 * x + 3 * y) % 5 * 5;
          var LFSR = 1;
          for (var i = 0; i < 24; i++) {
            var roundConstantMsw = 0;
            var roundConstantLsw = 0;
            for (var j = 0; j < 7; j++) {
              if (1 & LFSR) {
                var bitPosition = (1 << j) - 1;
                bitPosition < 32 ? roundConstantLsw ^= 1 << bitPosition : roundConstantMsw ^= 1 << bitPosition - 32;
              }
              128 & LFSR ? LFSR = LFSR << 1 ^ 113 : LFSR <<= 1;
            }
            ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
          }
        })();
        var T = [];
        (function() {
          for (var i = 0; i < 25; i++) T[i] = X64Word.create();
        })();
        var SHA3 = C_algo.SHA3 = Hasher.extend({
          cfg: Hasher.cfg.extend({
            outputLength: 512
          }),
          _doReset: function() {
            var state = this._state = [];
            for (var i = 0; i < 25; i++) state[i] = new X64Word.init();
            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
          },
          _doProcessBlock: function(M, offset) {
            var state = this._state;
            var nBlockSizeLanes = this.blockSize / 2;
            for (var i = 0; i < nBlockSizeLanes; i++) {
              var M2i = M[offset + 2 * i];
              var M2i1 = M[offset + 2 * i + 1];
              M2i = 16711935 & (M2i << 8 | M2i >>> 24) | 4278255360 & (M2i << 24 | M2i >>> 8);
              M2i1 = 16711935 & (M2i1 << 8 | M2i1 >>> 24) | 4278255360 & (M2i1 << 24 | M2i1 >>> 8);
              var lane = state[i];
              lane.high ^= M2i1;
              lane.low ^= M2i;
            }
            for (var round = 0; round < 24; round++) {
              for (var x = 0; x < 5; x++) {
                var tMsw = 0, tLsw = 0;
                for (var y = 0; y < 5; y++) {
                  var lane = state[x + 5 * y];
                  tMsw ^= lane.high;
                  tLsw ^= lane.low;
                }
                var Tx = T[x];
                Tx.high = tMsw;
                Tx.low = tLsw;
              }
              for (var x = 0; x < 5; x++) {
                var Tx4 = T[(x + 4) % 5];
                var Tx1 = T[(x + 1) % 5];
                var Tx1Msw = Tx1.high;
                var Tx1Lsw = Tx1.low;
                var tMsw = Tx4.high ^ (Tx1Msw << 1 | Tx1Lsw >>> 31);
                var tLsw = Tx4.low ^ (Tx1Lsw << 1 | Tx1Msw >>> 31);
                for (var y = 0; y < 5; y++) {
                  var lane = state[x + 5 * y];
                  lane.high ^= tMsw;
                  lane.low ^= tLsw;
                }
              }
              for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
                var tMsw;
                var tLsw;
                var lane = state[laneIndex];
                var laneMsw = lane.high;
                var laneLsw = lane.low;
                var rhoOffset = RHO_OFFSETS[laneIndex];
                if (rhoOffset < 32) {
                  tMsw = laneMsw << rhoOffset | laneLsw >>> 32 - rhoOffset;
                  tLsw = laneLsw << rhoOffset | laneMsw >>> 32 - rhoOffset;
                } else {
                  tMsw = laneLsw << rhoOffset - 32 | laneMsw >>> 64 - rhoOffset;
                  tLsw = laneMsw << rhoOffset - 32 | laneLsw >>> 64 - rhoOffset;
                }
                var TPiLane = T[PI_INDEXES[laneIndex]];
                TPiLane.high = tMsw;
                TPiLane.low = tLsw;
              }
              var T0 = T[0];
              var state0 = state[0];
              T0.high = state0.high;
              T0.low = state0.low;
              for (var x = 0; x < 5; x++) for (var y = 0; y < 5; y++) {
                var laneIndex = x + 5 * y;
                var lane = state[laneIndex];
                var TLane = T[laneIndex];
                var Tx1Lane = T[(x + 1) % 5 + 5 * y];
                var Tx2Lane = T[(x + 2) % 5 + 5 * y];
                lane.high = TLane.high ^ ~Tx1Lane.high & Tx2Lane.high;
                lane.low = TLane.low ^ ~Tx1Lane.low & Tx2Lane.low;
              }
              var lane = state[0];
              var roundConstant = ROUND_CONSTANTS[round];
              lane.high ^= roundConstant.high;
              lane.low ^= roundConstant.low;
            }
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = 8 * this._nDataBytes;
            var nBitsLeft = 8 * data.sigBytes;
            var blockSizeBits = 32 * this.blockSize;
            dataWords[nBitsLeft >>> 5] |= 1 << 24 - nBitsLeft % 32;
            dataWords[(Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits >>> 5) - 1] |= 128;
            data.sigBytes = 4 * dataWords.length;
            this._process();
            var state = this._state;
            var outputLengthBytes = this.cfg.outputLength / 8;
            var outputLengthLanes = outputLengthBytes / 8;
            var hashWords = [];
            for (var i = 0; i < outputLengthLanes; i++) {
              var lane = state[i];
              var laneMsw = lane.high;
              var laneLsw = lane.low;
              laneMsw = 16711935 & (laneMsw << 8 | laneMsw >>> 24) | 4278255360 & (laneMsw << 24 | laneMsw >>> 8);
              laneLsw = 16711935 & (laneLsw << 8 | laneLsw >>> 24) | 4278255360 & (laneLsw << 24 | laneLsw >>> 8);
              hashWords.push(laneLsw);
              hashWords.push(laneMsw);
            }
            return new WordArray.init(hashWords, outputLengthBytes);
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            var state = clone._state = this._state.slice(0);
            for (var i = 0; i < 25; i++) state[i] = state[i].clone();
            return clone;
          }
        });
        C.SHA3 = Hasher._createHelper(SHA3);
        C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
      })(Math);
      return CryptoJS.SHA3;
    });
  }, {
    "./core": 5,
    "./x64-core": 37
  } ],
  34: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./x64-core"), require("./sha512")) : "function" === typeof define && define.amd ? define([ "./core", "./x64-core", "./sha512" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_x64 = C.x64;
        var X64Word = C_x64.Word;
        var X64WordArray = C_x64.WordArray;
        var C_algo = C.algo;
        var SHA512 = C_algo.SHA512;
        var SHA384 = C_algo.SHA384 = SHA512.extend({
          _doReset: function() {
            this._hash = new X64WordArray.init([ new X64Word.init(3418070365, 3238371032), new X64Word.init(1654270250, 914150663), new X64Word.init(2438529370, 812702999), new X64Word.init(355462360, 4144912697), new X64Word.init(1731405415, 4290775857), new X64Word.init(2394180231, 1750603025), new X64Word.init(3675008525, 1694076839), new X64Word.init(1203062813, 3204075428) ]);
          },
          _doFinalize: function() {
            var hash = SHA512._doFinalize.call(this);
            hash.sigBytes -= 16;
            return hash;
          }
        });
        C.SHA384 = SHA512._createHelper(SHA384);
        C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
      })();
      return CryptoJS.SHA384;
    });
  }, {
    "./core": 5,
    "./sha512": 35,
    "./x64-core": 37
  } ],
  35: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./x64-core")) : "function" === typeof define && define.amd ? define([ "./core", "./x64-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Hasher = C_lib.Hasher;
        var C_x64 = C.x64;
        var X64Word = C_x64.Word;
        var X64WordArray = C_x64.WordArray;
        var C_algo = C.algo;
        function X64Word_create() {
          return X64Word.create.apply(X64Word, arguments);
        }
        var K = [ X64Word_create(1116352408, 3609767458), X64Word_create(1899447441, 602891725), X64Word_create(3049323471, 3964484399), X64Word_create(3921009573, 2173295548), X64Word_create(961987163, 4081628472), X64Word_create(1508970993, 3053834265), X64Word_create(2453635748, 2937671579), X64Word_create(2870763221, 3664609560), X64Word_create(3624381080, 2734883394), X64Word_create(310598401, 1164996542), X64Word_create(607225278, 1323610764), X64Word_create(1426881987, 3590304994), X64Word_create(1925078388, 4068182383), X64Word_create(2162078206, 991336113), X64Word_create(2614888103, 633803317), X64Word_create(3248222580, 3479774868), X64Word_create(3835390401, 2666613458), X64Word_create(4022224774, 944711139), X64Word_create(264347078, 2341262773), X64Word_create(604807628, 2007800933), X64Word_create(770255983, 1495990901), X64Word_create(1249150122, 1856431235), X64Word_create(1555081692, 3175218132), X64Word_create(1996064986, 2198950837), X64Word_create(2554220882, 3999719339), X64Word_create(2821834349, 766784016), X64Word_create(2952996808, 2566594879), X64Word_create(3210313671, 3203337956), X64Word_create(3336571891, 1034457026), X64Word_create(3584528711, 2466948901), X64Word_create(113926993, 3758326383), X64Word_create(338241895, 168717936), X64Word_create(666307205, 1188179964), X64Word_create(773529912, 1546045734), X64Word_create(1294757372, 1522805485), X64Word_create(1396182291, 2643833823), X64Word_create(1695183700, 2343527390), X64Word_create(1986661051, 1014477480), X64Word_create(2177026350, 1206759142), X64Word_create(2456956037, 344077627), X64Word_create(2730485921, 1290863460), X64Word_create(2820302411, 3158454273), X64Word_create(3259730800, 3505952657), X64Word_create(3345764771, 106217008), X64Word_create(3516065817, 3606008344), X64Word_create(3600352804, 1432725776), X64Word_create(4094571909, 1467031594), X64Word_create(275423344, 851169720), X64Word_create(430227734, 3100823752), X64Word_create(506948616, 1363258195), X64Word_create(659060556, 3750685593), X64Word_create(883997877, 3785050280), X64Word_create(958139571, 3318307427), X64Word_create(1322822218, 3812723403), X64Word_create(1537002063, 2003034995), X64Word_create(1747873779, 3602036899), X64Word_create(1955562222, 1575990012), X64Word_create(2024104815, 1125592928), X64Word_create(2227730452, 2716904306), X64Word_create(2361852424, 442776044), X64Word_create(2428436474, 593698344), X64Word_create(2756734187, 3733110249), X64Word_create(3204031479, 2999351573), X64Word_create(3329325298, 3815920427), X64Word_create(3391569614, 3928383900), X64Word_create(3515267271, 566280711), X64Word_create(3940187606, 3454069534), X64Word_create(4118630271, 4000239992), X64Word_create(116418474, 1914138554), X64Word_create(174292421, 2731055270), X64Word_create(289380356, 3203993006), X64Word_create(460393269, 320620315), X64Word_create(685471733, 587496836), X64Word_create(852142971, 1086792851), X64Word_create(1017036298, 365543100), X64Word_create(1126000580, 2618297676), X64Word_create(1288033470, 3409855158), X64Word_create(1501505948, 4234509866), X64Word_create(1607167915, 987167468), X64Word_create(1816402316, 1246189591) ];
        var W = [];
        (function() {
          for (var i = 0; i < 80; i++) W[i] = X64Word_create();
        })();
        var SHA512 = C_algo.SHA512 = Hasher.extend({
          _doReset: function() {
            this._hash = new X64WordArray.init([ new X64Word.init(1779033703, 4089235720), new X64Word.init(3144134277, 2227873595), new X64Word.init(1013904242, 4271175723), new X64Word.init(2773480762, 1595750129), new X64Word.init(1359893119, 2917565137), new X64Word.init(2600822924, 725511199), new X64Word.init(528734635, 4215389547), new X64Word.init(1541459225, 327033209) ]);
          },
          _doProcessBlock: function(M, offset) {
            var H = this._hash.words;
            var H0 = H[0];
            var H1 = H[1];
            var H2 = H[2];
            var H3 = H[3];
            var H4 = H[4];
            var H5 = H[5];
            var H6 = H[6];
            var H7 = H[7];
            var H0h = H0.high;
            var H0l = H0.low;
            var H1h = H1.high;
            var H1l = H1.low;
            var H2h = H2.high;
            var H2l = H2.low;
            var H3h = H3.high;
            var H3l = H3.low;
            var H4h = H4.high;
            var H4l = H4.low;
            var H5h = H5.high;
            var H5l = H5.low;
            var H6h = H6.high;
            var H6l = H6.low;
            var H7h = H7.high;
            var H7l = H7.low;
            var ah = H0h;
            var al = H0l;
            var bh = H1h;
            var bl = H1l;
            var ch = H2h;
            var cl = H2l;
            var dh = H3h;
            var dl = H3l;
            var eh = H4h;
            var el = H4l;
            var fh = H5h;
            var fl = H5l;
            var gh = H6h;
            var gl = H6l;
            var hh = H7h;
            var hl = H7l;
            for (var i = 0; i < 80; i++) {
              var Wil;
              var Wih;
              var Wi = W[i];
              if (i < 16) {
                Wih = Wi.high = 0 | M[offset + 2 * i];
                Wil = Wi.low = 0 | M[offset + 2 * i + 1];
              } else {
                var gamma0x = W[i - 15];
                var gamma0xh = gamma0x.high;
                var gamma0xl = gamma0x.low;
                var gamma0h = (gamma0xh >>> 1 | gamma0xl << 31) ^ (gamma0xh >>> 8 | gamma0xl << 24) ^ gamma0xh >>> 7;
                var gamma0l = (gamma0xl >>> 1 | gamma0xh << 31) ^ (gamma0xl >>> 8 | gamma0xh << 24) ^ (gamma0xl >>> 7 | gamma0xh << 25);
                var gamma1x = W[i - 2];
                var gamma1xh = gamma1x.high;
                var gamma1xl = gamma1x.low;
                var gamma1h = (gamma1xh >>> 19 | gamma1xl << 13) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6;
                var gamma1l = (gamma1xl >>> 19 | gamma1xh << 13) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xl >>> 6 | gamma1xh << 26);
                var Wi7 = W[i - 7];
                var Wi7h = Wi7.high;
                var Wi7l = Wi7.low;
                var Wi16 = W[i - 16];
                var Wi16h = Wi16.high;
                var Wi16l = Wi16.low;
                Wil = gamma0l + Wi7l;
                Wih = gamma0h + Wi7h + (Wil >>> 0 < gamma0l >>> 0 ? 1 : 0);
                Wil += gamma1l;
                Wih = Wih + gamma1h + (Wil >>> 0 < gamma1l >>> 0 ? 1 : 0);
                Wil += Wi16l;
                Wih = Wih + Wi16h + (Wil >>> 0 < Wi16l >>> 0 ? 1 : 0);
                Wi.high = Wih;
                Wi.low = Wil;
              }
              var chh = eh & fh ^ ~eh & gh;
              var chl = el & fl ^ ~el & gl;
              var majh = ah & bh ^ ah & ch ^ bh & ch;
              var majl = al & bl ^ al & cl ^ bl & cl;
              var sigma0h = (ah >>> 28 | al << 4) ^ (ah << 30 | al >>> 2) ^ (ah << 25 | al >>> 7);
              var sigma0l = (al >>> 28 | ah << 4) ^ (al << 30 | ah >>> 2) ^ (al << 25 | ah >>> 7);
              var sigma1h = (eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9);
              var sigma1l = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9);
              var Ki = K[i];
              var Kih = Ki.high;
              var Kil = Ki.low;
              var t1l = hl + sigma1l;
              var t1h = hh + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
              var t1l = t1l + chl;
              var t1h = t1h + chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
              var t1l = t1l + Kil;
              var t1h = t1h + Kih + (t1l >>> 0 < Kil >>> 0 ? 1 : 0);
              var t1l = t1l + Wil;
              var t1h = t1h + Wih + (t1l >>> 0 < Wil >>> 0 ? 1 : 0);
              var t2l = sigma0l + majl;
              var t2h = sigma0h + majh + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0);
              hh = gh;
              hl = gl;
              gh = fh;
              gl = fl;
              fh = eh;
              fl = el;
              el = dl + t1l | 0;
              eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
              dh = ch;
              dl = cl;
              ch = bh;
              cl = bl;
              bh = ah;
              bl = al;
              al = t1l + t2l | 0;
              ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
            }
            H0l = H0.low = H0l + al;
            H0.high = H0h + ah + (H0l >>> 0 < al >>> 0 ? 1 : 0);
            H1l = H1.low = H1l + bl;
            H1.high = H1h + bh + (H1l >>> 0 < bl >>> 0 ? 1 : 0);
            H2l = H2.low = H2l + cl;
            H2.high = H2h + ch + (H2l >>> 0 < cl >>> 0 ? 1 : 0);
            H3l = H3.low = H3l + dl;
            H3.high = H3h + dh + (H3l >>> 0 < dl >>> 0 ? 1 : 0);
            H4l = H4.low = H4l + el;
            H4.high = H4h + eh + (H4l >>> 0 < el >>> 0 ? 1 : 0);
            H5l = H5.low = H5l + fl;
            H5.high = H5h + fh + (H5l >>> 0 < fl >>> 0 ? 1 : 0);
            H6l = H6.low = H6l + gl;
            H6.high = H6h + gh + (H6l >>> 0 < gl >>> 0 ? 1 : 0);
            H7l = H7.low = H7l + hl;
            H7.high = H7h + hh + (H7l >>> 0 < hl >>> 0 ? 1 : 0);
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = 8 * this._nDataBytes;
            var nBitsLeft = 8 * data.sigBytes;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[30 + (nBitsLeft + 128 >>> 10 << 5)] = Math.floor(nBitsTotal / 4294967296);
            dataWords[31 + (nBitsLeft + 128 >>> 10 << 5)] = nBitsTotal;
            data.sigBytes = 4 * dataWords.length;
            this._process();
            var hash = this._hash.toX32();
            return hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          },
          blockSize: 32
        });
        C.SHA512 = Hasher._createHelper(SHA512);
        C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
      })();
      return CryptoJS.SHA512;
    });
  }, {
    "./core": 5,
    "./x64-core": 37
  } ],
  36: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var BlockCipher = C_lib.BlockCipher;
        var C_algo = C.algo;
        var PC1 = [ 57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4 ];
        var PC2 = [ 14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32 ];
        var BIT_SHIFTS = [ 1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28 ];
        var SBOX_P = [ {
          0: 8421888,
          268435456: 32768,
          536870912: 8421378,
          805306368: 2,
          1073741824: 512,
          1342177280: 8421890,
          1610612736: 8389122,
          1879048192: 8388608,
          2147483648: 514,
          2415919104: 8389120,
          2684354560: 33280,
          2952790016: 8421376,
          3221225472: 32770,
          3489660928: 8388610,
          3758096384: 0,
          4026531840: 33282,
          134217728: 0,
          402653184: 8421890,
          671088640: 33282,
          939524096: 32768,
          1207959552: 8421888,
          1476395008: 512,
          1744830464: 8421378,
          2013265920: 2,
          2281701376: 8389120,
          2550136832: 33280,
          2818572288: 8421376,
          3087007744: 8389122,
          3355443200: 8388610,
          3623878656: 32770,
          3892314112: 514,
          4160749568: 8388608,
          1: 32768,
          268435457: 2,
          536870913: 8421888,
          805306369: 8388608,
          1073741825: 8421378,
          1342177281: 33280,
          1610612737: 512,
          1879048193: 8389122,
          2147483649: 8421890,
          2415919105: 8421376,
          2684354561: 8388610,
          2952790017: 33282,
          3221225473: 514,
          3489660929: 8389120,
          3758096385: 32770,
          4026531841: 0,
          134217729: 8421890,
          402653185: 8421376,
          671088641: 8388608,
          939524097: 512,
          1207959553: 32768,
          1476395009: 8388610,
          1744830465: 2,
          2013265921: 33282,
          2281701377: 32770,
          2550136833: 8389122,
          2818572289: 514,
          3087007745: 8421888,
          3355443201: 8389120,
          3623878657: 0,
          3892314113: 33280,
          4160749569: 8421378
        }, {
          0: 1074282512,
          16777216: 16384,
          33554432: 524288,
          50331648: 1074266128,
          67108864: 1073741840,
          83886080: 1074282496,
          100663296: 1073758208,
          117440512: 16,
          134217728: 540672,
          150994944: 1073758224,
          167772160: 1073741824,
          184549376: 540688,
          201326592: 524304,
          218103808: 0,
          234881024: 16400,
          251658240: 1074266112,
          8388608: 1073758208,
          25165824: 540688,
          41943040: 16,
          58720256: 1073758224,
          75497472: 1074282512,
          92274688: 1073741824,
          109051904: 524288,
          125829120: 1074266128,
          142606336: 524304,
          159383552: 0,
          176160768: 16384,
          192937984: 1074266112,
          209715200: 1073741840,
          226492416: 540672,
          243269632: 1074282496,
          260046848: 16400,
          268435456: 0,
          285212672: 1074266128,
          301989888: 1073758224,
          318767104: 1074282496,
          335544320: 1074266112,
          352321536: 16,
          369098752: 540688,
          385875968: 16384,
          402653184: 16400,
          419430400: 524288,
          436207616: 524304,
          452984832: 1073741840,
          469762048: 540672,
          486539264: 1073758208,
          503316480: 1073741824,
          520093696: 1074282512,
          276824064: 540688,
          293601280: 524288,
          310378496: 1074266112,
          327155712: 16384,
          343932928: 1073758208,
          360710144: 1074282512,
          377487360: 16,
          394264576: 1073741824,
          411041792: 1074282496,
          427819008: 1073741840,
          444596224: 1073758224,
          461373440: 524304,
          478150656: 0,
          494927872: 16400,
          511705088: 1074266128,
          528482304: 540672
        }, {
          0: 260,
          1048576: 0,
          2097152: 67109120,
          3145728: 65796,
          4194304: 65540,
          5242880: 67108868,
          6291456: 67174660,
          7340032: 67174400,
          8388608: 67108864,
          9437184: 67174656,
          10485760: 65792,
          11534336: 67174404,
          12582912: 67109124,
          13631488: 65536,
          14680064: 4,
          15728640: 256,
          524288: 67174656,
          1572864: 67174404,
          2621440: 0,
          3670016: 67109120,
          4718592: 67108868,
          5767168: 65536,
          6815744: 65540,
          7864320: 260,
          8912896: 4,
          9961472: 256,
          11010048: 67174400,
          12058624: 65796,
          13107200: 65792,
          14155776: 67109124,
          15204352: 67174660,
          16252928: 67108864,
          16777216: 67174656,
          17825792: 65540,
          18874368: 65536,
          19922944: 67109120,
          20971520: 256,
          22020096: 67174660,
          23068672: 67108868,
          24117248: 0,
          25165824: 67109124,
          26214400: 67108864,
          27262976: 4,
          28311552: 65792,
          29360128: 67174400,
          30408704: 260,
          31457280: 65796,
          32505856: 67174404,
          17301504: 67108864,
          18350080: 260,
          19398656: 67174656,
          20447232: 0,
          21495808: 65540,
          22544384: 67109120,
          23592960: 256,
          24641536: 67174404,
          25690112: 65536,
          26738688: 67174660,
          27787264: 65796,
          28835840: 67108868,
          29884416: 67109124,
          30932992: 67174400,
          31981568: 4,
          33030144: 65792
        }, {
          0: 2151682048,
          65536: 2147487808,
          131072: 4198464,
          196608: 2151677952,
          262144: 0,
          327680: 4198400,
          393216: 2147483712,
          458752: 4194368,
          524288: 2147483648,
          589824: 4194304,
          655360: 64,
          720896: 2147487744,
          786432: 2151678016,
          851968: 4160,
          917504: 4096,
          983040: 2151682112,
          32768: 2147487808,
          98304: 64,
          163840: 2151678016,
          229376: 2147487744,
          294912: 4198400,
          360448: 2151682112,
          425984: 0,
          491520: 2151677952,
          557056: 4096,
          622592: 2151682048,
          688128: 4194304,
          753664: 4160,
          819200: 2147483648,
          884736: 4194368,
          950272: 4198464,
          1015808: 2147483712,
          1048576: 4194368,
          1114112: 4198400,
          1179648: 2147483712,
          1245184: 0,
          1310720: 4160,
          1376256: 2151678016,
          1441792: 2151682048,
          1507328: 2147487808,
          1572864: 2151682112,
          1638400: 2147483648,
          1703936: 2151677952,
          1769472: 4198464,
          1835008: 2147487744,
          1900544: 4194304,
          1966080: 64,
          2031616: 4096,
          1081344: 2151677952,
          1146880: 2151682112,
          1212416: 0,
          1277952: 4198400,
          1343488: 4194368,
          1409024: 2147483648,
          1474560: 2147487808,
          1540096: 64,
          1605632: 2147483712,
          1671168: 4096,
          1736704: 2147487744,
          1802240: 2151678016,
          1867776: 4160,
          1933312: 2151682048,
          1998848: 4194304,
          2064384: 4198464
        }, {
          0: 128,
          4096: 17039360,
          8192: 262144,
          12288: 536870912,
          16384: 537133184,
          20480: 16777344,
          24576: 553648256,
          28672: 262272,
          32768: 16777216,
          36864: 537133056,
          40960: 536871040,
          45056: 553910400,
          49152: 553910272,
          53248: 0,
          57344: 17039488,
          61440: 553648128,
          2048: 17039488,
          6144: 553648256,
          10240: 128,
          14336: 17039360,
          18432: 262144,
          22528: 537133184,
          26624: 553910272,
          30720: 536870912,
          34816: 537133056,
          38912: 0,
          43008: 553910400,
          47104: 16777344,
          51200: 536871040,
          55296: 553648128,
          59392: 16777216,
          63488: 262272,
          65536: 262144,
          69632: 128,
          73728: 536870912,
          77824: 553648256,
          81920: 16777344,
          86016: 553910272,
          90112: 537133184,
          94208: 16777216,
          98304: 553910400,
          102400: 553648128,
          106496: 17039360,
          110592: 537133056,
          114688: 262272,
          118784: 536871040,
          122880: 0,
          126976: 17039488,
          67584: 553648256,
          71680: 16777216,
          75776: 17039360,
          79872: 537133184,
          83968: 536870912,
          88064: 17039488,
          92160: 128,
          96256: 553910272,
          100352: 262272,
          104448: 553910400,
          108544: 0,
          112640: 553648128,
          116736: 16777344,
          120832: 262144,
          124928: 537133056,
          129024: 536871040
        }, {
          0: 268435464,
          256: 8192,
          512: 270532608,
          768: 270540808,
          1024: 268443648,
          1280: 2097152,
          1536: 2097160,
          1792: 268435456,
          2048: 0,
          2304: 268443656,
          2560: 2105344,
          2816: 8,
          3072: 270532616,
          3328: 2105352,
          3584: 8200,
          3840: 270540800,
          128: 270532608,
          384: 270540808,
          640: 8,
          896: 2097152,
          1152: 2105352,
          1408: 268435464,
          1664: 268443648,
          1920: 8200,
          2176: 2097160,
          2432: 8192,
          2688: 268443656,
          2944: 270532616,
          3200: 0,
          3456: 270540800,
          3712: 2105344,
          3968: 268435456,
          4096: 268443648,
          4352: 270532616,
          4608: 270540808,
          4864: 8200,
          5120: 2097152,
          5376: 268435456,
          5632: 268435464,
          5888: 2105344,
          6144: 2105352,
          6400: 0,
          6656: 8,
          6912: 270532608,
          7168: 8192,
          7424: 268443656,
          7680: 270540800,
          7936: 2097160,
          4224: 8,
          4480: 2105344,
          4736: 2097152,
          4992: 268435464,
          5248: 268443648,
          5504: 8200,
          5760: 270540808,
          6016: 270532608,
          6272: 270540800,
          6528: 270532616,
          6784: 8192,
          7040: 2105352,
          7296: 2097160,
          7552: 0,
          7808: 268435456,
          8064: 268443656
        }, {
          0: 1048576,
          16: 33555457,
          32: 1024,
          48: 1049601,
          64: 34604033,
          80: 0,
          96: 1,
          112: 34603009,
          128: 33555456,
          144: 1048577,
          160: 33554433,
          176: 34604032,
          192: 34603008,
          208: 1025,
          224: 1049600,
          240: 33554432,
          8: 34603009,
          24: 0,
          40: 33555457,
          56: 34604032,
          72: 1048576,
          88: 33554433,
          104: 33554432,
          120: 1025,
          136: 1049601,
          152: 33555456,
          168: 34603008,
          184: 1048577,
          200: 1024,
          216: 34604033,
          232: 1,
          248: 1049600,
          256: 33554432,
          272: 1048576,
          288: 33555457,
          304: 34603009,
          320: 1048577,
          336: 33555456,
          352: 34604032,
          368: 1049601,
          384: 1025,
          400: 34604033,
          416: 1049600,
          432: 1,
          448: 0,
          464: 34603008,
          480: 33554433,
          496: 1024,
          264: 1049600,
          280: 33555457,
          296: 34603009,
          312: 1,
          328: 33554432,
          344: 1048576,
          360: 1025,
          376: 34604032,
          392: 33554433,
          408: 34603008,
          424: 0,
          440: 34604033,
          456: 1049601,
          472: 1024,
          488: 33555456,
          504: 1048577
        }, {
          0: 134219808,
          1: 131072,
          2: 134217728,
          3: 32,
          4: 131104,
          5: 134350880,
          6: 134350848,
          7: 2048,
          8: 134348800,
          9: 134219776,
          10: 133120,
          11: 134348832,
          12: 2080,
          13: 0,
          14: 134217760,
          15: 133152,
          2147483648: 2048,
          2147483649: 134350880,
          2147483650: 134219808,
          2147483651: 134217728,
          2147483652: 134348800,
          2147483653: 133120,
          2147483654: 133152,
          2147483655: 32,
          2147483656: 134217760,
          2147483657: 2080,
          2147483658: 131104,
          2147483659: 134350848,
          2147483660: 0,
          2147483661: 134348832,
          2147483662: 134219776,
          2147483663: 131072,
          16: 133152,
          17: 134350848,
          18: 32,
          19: 2048,
          20: 134219776,
          21: 134217760,
          22: 134348832,
          23: 131072,
          24: 0,
          25: 131104,
          26: 134348800,
          27: 134219808,
          28: 134350880,
          29: 133120,
          30: 2080,
          31: 134217728,
          2147483664: 131072,
          2147483665: 2048,
          2147483666: 134348832,
          2147483667: 133152,
          2147483668: 32,
          2147483669: 134348800,
          2147483670: 134217728,
          2147483671: 134219808,
          2147483672: 134350880,
          2147483673: 134217760,
          2147483674: 134219776,
          2147483675: 0,
          2147483676: 133120,
          2147483677: 2080,
          2147483678: 131104,
          2147483679: 134350848
        } ];
        var SBOX_MASK = [ 4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679 ];
        var DES = C_algo.DES = BlockCipher.extend({
          _doReset: function() {
            var key = this._key;
            var keyWords = key.words;
            var keyBits = [];
            for (var i = 0; i < 56; i++) {
              var keyBitPos = PC1[i] - 1;
              keyBits[i] = keyWords[keyBitPos >>> 5] >>> 31 - keyBitPos % 32 & 1;
            }
            var subKeys = this._subKeys = [];
            for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
              var subKey = subKeys[nSubKey] = [];
              var bitShift = BIT_SHIFTS[nSubKey];
              for (var i = 0; i < 24; i++) {
                subKey[i / 6 | 0] |= keyBits[(PC2[i] - 1 + bitShift) % 28] << 31 - i % 6;
                subKey[4 + (i / 6 | 0)] |= keyBits[28 + (PC2[i + 24] - 1 + bitShift) % 28] << 31 - i % 6;
              }
              subKey[0] = subKey[0] << 1 | subKey[0] >>> 31;
              for (var i = 1; i < 7; i++) subKey[i] = subKey[i] >>> 4 * (i - 1) + 3;
              subKey[7] = subKey[7] << 5 | subKey[7] >>> 27;
            }
            var invSubKeys = this._invSubKeys = [];
            for (var i = 0; i < 16; i++) invSubKeys[i] = subKeys[15 - i];
          },
          encryptBlock: function(M, offset) {
            this._doCryptBlock(M, offset, this._subKeys);
          },
          decryptBlock: function(M, offset) {
            this._doCryptBlock(M, offset, this._invSubKeys);
          },
          _doCryptBlock: function(M, offset, subKeys) {
            this._lBlock = M[offset];
            this._rBlock = M[offset + 1];
            exchangeLR.call(this, 4, 252645135);
            exchangeLR.call(this, 16, 65535);
            exchangeRL.call(this, 2, 858993459);
            exchangeRL.call(this, 8, 16711935);
            exchangeLR.call(this, 1, 1431655765);
            for (var round = 0; round < 16; round++) {
              var subKey = subKeys[round];
              var lBlock = this._lBlock;
              var rBlock = this._rBlock;
              var f = 0;
              for (var i = 0; i < 8; i++) f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
              this._lBlock = rBlock;
              this._rBlock = lBlock ^ f;
            }
            var t = this._lBlock;
            this._lBlock = this._rBlock;
            this._rBlock = t;
            exchangeLR.call(this, 1, 1431655765);
            exchangeRL.call(this, 8, 16711935);
            exchangeRL.call(this, 2, 858993459);
            exchangeLR.call(this, 16, 65535);
            exchangeLR.call(this, 4, 252645135);
            M[offset] = this._lBlock;
            M[offset + 1] = this._rBlock;
          },
          keySize: 2,
          ivSize: 2,
          blockSize: 2
        });
        function exchangeLR(offset, mask) {
          var t = (this._lBlock >>> offset ^ this._rBlock) & mask;
          this._rBlock ^= t;
          this._lBlock ^= t << offset;
        }
        function exchangeRL(offset, mask) {
          var t = (this._rBlock >>> offset ^ this._lBlock) & mask;
          this._lBlock ^= t;
          this._rBlock ^= t << offset;
        }
        C.DES = BlockCipher._createHelper(DES);
        var TripleDES = C_algo.TripleDES = BlockCipher.extend({
          _doReset: function() {
            var key = this._key;
            var keyWords = key.words;
            if (2 !== keyWords.length && 4 !== keyWords.length && keyWords.length < 6) throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
            var key1 = keyWords.slice(0, 2);
            var key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
            var key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);
            this._des1 = DES.createEncryptor(WordArray.create(key1));
            this._des2 = DES.createEncryptor(WordArray.create(key2));
            this._des3 = DES.createEncryptor(WordArray.create(key3));
          },
          encryptBlock: function(M, offset) {
            this._des1.encryptBlock(M, offset);
            this._des2.decryptBlock(M, offset);
            this._des3.encryptBlock(M, offset);
          },
          decryptBlock: function(M, offset) {
            this._des3.decryptBlock(M, offset);
            this._des2.encryptBlock(M, offset);
            this._des1.decryptBlock(M, offset);
          },
          keySize: 6,
          ivSize: 2,
          blockSize: 2
        });
        C.TripleDES = BlockCipher._createHelper(TripleDES);
      })();
      return CryptoJS.TripleDES;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5,
    "./enc-base64": 6,
    "./evpkdf": 9,
    "./md5": 14
  } ],
  37: [ function(require, module, exports) {
    (function(root, factory) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core")) : "function" === typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function(undefined) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var X32WordArray = C_lib.WordArray;
        var C_x64 = C.x64 = {};
        var X64Word = C_x64.Word = Base.extend({
          init: function(high, low) {
            this.high = high;
            this.low = low;
          }
        });
        var X64WordArray = C_x64.WordArray = Base.extend({
          init: function(words, sigBytes) {
            words = this.words = words || [];
            this.sigBytes = sigBytes != undefined ? sigBytes : 8 * words.length;
          },
          toX32: function() {
            var x64Words = this.words;
            var x64WordsLength = x64Words.length;
            var x32Words = [];
            for (var i = 0; i < x64WordsLength; i++) {
              var x64Word = x64Words[i];
              x32Words.push(x64Word.high);
              x32Words.push(x64Word.low);
            }
            return X32WordArray.create(x32Words, this.sigBytes);
          },
          clone: function() {
            var clone = Base.clone.call(this);
            var words = clone.words = this.words.slice(0);
            var wordsLength = words.length;
            for (var i = 0; i < wordsLength; i++) words[i] = words[i].clone();
            return clone;
          }
        });
      })();
      return CryptoJS;
    });
  }, {
    "./core": 5
  } ],
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
        _this.goods = null;
        _this.price = "0.001";
        _this.goods_id = 1;
        _this.allNodeClickEvent = {};
        _this.allLabels = [];
        _this.allTrendsLabels = [];
        return _this;
      }
      BaseItem_1 = BaseItem;
      BaseItem.prototype.onLoad = function() {
        var _this = this;
        this.allNodeClickEvent = [];
        this.allLabels = [];
        this.allTrendsLabels = [];
        this.node.walk(function(node) {
          node.getComponent(cc.Label) && _this.allLabels.push(node.getComponent(cc.Label));
        }, null);
      };
      BaseItem.prototype.start = function() {
        this.updateLanguage();
      };
      BaseItem.prototype.init = function() {};
      BaseItem.prototype.setData = function(data) {
        this.goods_id = data.id;
        this.price = data.amount;
      };
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
        for (var i = 0; i < this.allTrendsLabels.length; i++) this.allTrendsLabels[i]["languageKey"] && Languages_1.Languages[this.allTrendsLabels[i]["languageKey"]] && (this.allTrendsLabels[i].getComponent(cc.Label).string = Languages_1.Languages[this.allTrendsLabels[i]["languageKey"]][DataManager_1.default.instance.language]);
      };
      BaseItem.prototype.addTrendsLabel = function(node) {
        this.allTrendsLabels.push(node);
      };
      BaseItem.prototype.onTouch = function(node, cb, target, scale) {
        var _this = this;
        void 0 === scale && (scale = .9);
        if (this.allNodeClickEvent[node.uuid]) {
          console.log("\u91cd\u590d\u6ce8\u518c\u4e8b\u4ef6---------------------------");
          return;
        }
        if (!node.getComponent(cc.Button)) {
          node.addComponent(cc.Button);
          node.getComponent(cc.Button).transition = cc.Button.Transition.SCALE;
          node.getComponent(cc.Button).duration = .1;
          node.getComponent(cc.Button).zoomScale = scale;
        }
        node.getComponent(cc.Button).interactable = true;
        node.getComponent(cc.Button).enableAutoGrayEffect = false;
        node["isClick"] || node.attr({
          isClick: 1
        });
        var callback = function(t) {
          if (2 == node["isClick"]) return;
          AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
          cb && cb.call(target);
          node["isClick"] = 2;
          _this.scheduleOnce(function() {
            node["isClick"] = 1;
          }, .3);
        };
        node.on("click", callback, this);
        this.allNodeClickEvent[node.uuid] = {
          node: node,
          callback: callback,
          target: this
        };
      };
      BaseItem.prototype.onDestroy = function() {
        for (var key in this.allNodeClickEvent) {
          var item = this.allNodeClickEvent[key];
          item.node.off("click", item.callback, item.target);
        }
        this.allNodeClickEvent = {};
      };
      BaseItem.prototype.offTouch = function(node) {
        if (!node) return;
        if (this.allNodeClickEvent[node.uuid]) {
          var touchHandler = this.allNodeClickEvent[node.uuid].callback;
          var target = this.allNodeClickEvent[node.uuid].target;
          node.off("click", touchHandler, target);
          delete this.allNodeClickEvent[node.uuid];
          if (node.getComponent(cc.Button)) {
            node.getComponent(cc.Button).interactable = false;
            node.getComponent(cc.Button).enableAutoGrayEffect = true;
          }
        }
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
    var PoolManager_1 = require("../manager/PoolManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BaseLayer = function(_super) {
      __extends(BaseLayer, _super);
      function BaseLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.allNodeClickEvent = {};
        return _this;
      }
      BaseLayer.prototype.onLoad = function() {
        this.allNodeClickEvent = {};
      };
      BaseLayer.prototype.show = function(data) {
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
        void 0 === speed && (speed = .2);
        node.setScale(scale);
        var act = cc.scaleTo(speed, 1);
        cc.tween(node).then(act).start();
        console.log("zoomIn");
      };
      BaseLayer.prototype.zoomOut = function(node, scale, speed) {
        void 0 === scale && (scale = .5);
        void 0 === speed && (speed = .2);
        node.setScale(scale);
        var act = cc.scaleTo(speed, 1);
        cc.tween(node).then(act).start();
      };
      BaseLayer.prototype.onTouch = function(node, cb, target, scale) {
        var _this = this;
        void 0 === scale && (scale = .9);
        if (this.allNodeClickEvent[node.uuid]) return;
        if (!node.getComponent(cc.Button)) {
          node.addComponent(cc.Button);
          node.getComponent(cc.Button).transition = cc.Button.Transition.SCALE;
          node.getComponent(cc.Button).duration = .1;
          node.getComponent(cc.Button).zoomScale = scale;
        }
        node["isClick"] || node.attr({
          isClick: 1
        });
        var callback = function(t) {
          if (2 == node["isClick"]) return;
          AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
          cb && cb.call(target);
          node["isClick"] = 2;
          _this.scheduleOnce(function() {
            node["isClick"] = 1;
          }, .3);
        };
        node.on("click", callback, this);
        this.allNodeClickEvent[node.uuid] = {
          node: node,
          callback: callback,
          target: this
        };
      };
      BaseLayer.prototype.onDestroy = function() {
        for (var key in this.allNodeClickEvent) {
          var item = this.allNodeClickEvent[key];
          item.node.off("click", item.callback, item.target);
        }
        this.allNodeClickEvent = {};
      };
      BaseLayer.prototype.CreateListItem = function(content, itemNode, data, Base) {
        var child = content.children;
        for (var i = 0; i < data.length; i++) {
          child[i] || PoolManager_1.default.instance.getNode(itemNode, content);
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
    "../manager/EventManager": "EventManager",
    "../manager/PoolManager": "PoolManager"
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
          (DataManager_1.default.instance.level > 1 || 1 == DataManager_1.default.instance.nowRoundConfig.is_special) && (DataManager_1.LEVEL_DATA[DataManager_1.default.instance.nowRoundConfig.round - 1] = {
            level: DataManager_1.default.instance.nowRoundConfig.round,
            width: Number(DataManager_1.default.instance.nowRoundConfig.width),
            height: Number(DataManager_1.default.instance.nowRoundConfig.height),
            unit: DataManager_1.default.instance.nowRoundConfig.unit,
            cars: -1
          });
          data = DataManager_1.LEVEL_DATA[DataManager_1.default.instance.nowRoundConfig.round - 1];
          if (data.cars > 0) {
            DataManager_1.default.instance.carNum = data.cars;
            return;
          }
        } else if (DataManager_1.default.instance.mode == Enum_1.ENUM_GAME_MODE.LEVEL) {
          DataManager_1.CLEVEL_Data[DataManager_1.default.instance.nowRoundConfig.round - 1] = {
            level: DataManager_1.default.instance.nowRoundConfig.round,
            width: DataManager_1.default.instance.nowRoundConfig.width,
            height: DataManager_1.default.instance.nowRoundConfig.height,
            unit: DataManager_1.default.instance.nowRoundConfig.unit,
            cars: -1,
            crash: 1e6
          };
          data = DataManager_1.CLEVEL_Data[DataManager_1.default.instance.nowRoundConfig.round - 1];
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
        var wid = cc.winSize.width;
        var height = cc.winSize.height - 582;
        if (height >= 900) this.node.setScale(1, 1, 1); else {
          var scale = height / 900;
          this.node.setScale(scale, scale, scale);
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
  BuyCom: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ab27cV/XLdH5aawhqHnQ7L+", "BuyCom");
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
    var EventName_1 = require("../data/EventName");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BuyCom = function(_super) {
      __extends(BuyCom, _super);
      function BuyCom() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.goods = null;
        _this.price = "";
        return _this;
      }
      BuyCom.prototype.onLoad = function() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
      };
      BuyCom.prototype.onDestroy = function() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onClick, this);
      };
      BuyCom.prototype.start = function() {};
      BuyCom.prototype.onClick = function() {
        cc.game.emit(EventName_1.GameEvent.BUY_GOODS, this.goods, this.price);
      };
      BuyCom = __decorate([ ccclass ], BuyCom);
      return BuyCom;
    }(cc.Component);
    exports.default = BuyCom;
    cc._RF.pop();
  }, {
    "../data/EventName": "EventName"
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
    var Languages_1 = require("../Languages");
    var StaticInstance_1 = require("../StaticInstance");
    var Utils_1 = require("../Utils");
    var EventName_1 = require("../data/EventName");
    var GlobalVar_1 = require("../data/GlobalVar");
    var AudioManager_1 = require("../manager/AudioManager");
    var DataManager_1 = require("../manager/DataManager");
    var EffectManager_1 = require("../manager/EffectManager");
    var EventManager_1 = require("../manager/EventManager");
    var ResourceManager_1 = require("../manager/ResourceManager");
    var ToastManager_1 = require("../manager/ToastManager");
    var HttpCom_1 = require("../net/HttpCom");
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
      Car.prototype.httpUseItem = function(cb) {
        var type = EventName_1.GamePropType.cut;
        1 == DataManager_1.default.instance.skillIndex && (type = EventName_1.GamePropType.hide);
        2 == DataManager_1.default.instance.skillIndex && (type = EventName_1.GamePropType.remove);
        HttpCom_1.HttpCom.useItem(type, function(res) {
          console.log(res, "\u9053\u5177\u4f7f\u7528\u6210\u529f");
          DataManager_1.default.instance.keys = res.data.key;
          EventManager_1.default.instance.emit(EventManager_1.EventType.UPDATE_KEY_LABEL);
          cb && cb();
        });
      };
      Car.prototype.onTouchStart = function(e) {
        if (DataManager_1.default.instance.isSkillRuning) return;
        var location = e.getLocation();
        var touchPos = this.node.parent.convertToNodeSpaceAR(location);
        if (DataManager_1.default.instance.isSkilling) {
          var carComponent_1 = this;
          var carNode_1 = this.node;
          if (0 != DataManager_1.default.instance.skillIndex || this.isMoving) if (1 != DataManager_1.default.instance.skillIndex || this.isMoving || this.isOpacity || 0 != this.opacityCount) 2 != DataManager_1.default.instance.skillIndex || this.isMoving || this.httpUseItem(function() {
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
          }); else {
            if (DataManager_1.default.instance.carNum - DataManager_1.default.instance.carExitNum == 1) {
              ToastManager_1.default.instance.show(Languages_1.Languages["toast3"][DataManager_1.default.instance.language], {
                gravity: "TOP",
                bg_color: cc.color(226, 69, 109, 255)
              });
              return;
            }
            this.httpUseItem(function() {
              AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.SKILL);
              cc.tween(carNode_1).to(.3, {
                opacity: 100
              }).call(function() {
                carComponent_1.isOpacity = true;
                DataManager_1.default.instance.isSkillRuning = false;
                DataManager_1.default.instance.isSkilling = false;
                StaticInstance_1.StaticInstance.uiManager.setMainSkillTip();
              }).start();
            });
          } else {
            var unit_1 = DataManager_1.LEVEL_DATA[DataManager_1.default.instance.level - 1].unit;
            var size = carNode_1.width;
            0 != carComponent_1.dir && 2 != carComponent_1.dir || (size = carNode_1.height);
            size <= 2 * unit_1 ? ToastManager_1.default.instance.show(Languages_1.Languages["toast2"][DataManager_1.default.instance.language], {
              gravity: "TOP",
              bg_color: cc.color(226, 69, 109, 255)
            }) : this.httpUseItem(function() {
              AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.SKILL);
              DataManager_1.default.instance.isSkillRuning = true;
              0 == carComponent_1.dir || 2 == carComponent_1.dir ? cc.tween(carNode_1).to(.3, {
                height: carNode_1.height - unit_1
              }).call(function() {
                carComponent_1.setCollider();
                DataManager_1.default.instance.isSkillRuning = false;
                DataManager_1.default.instance.isSkilling = false;
                StaticInstance_1.StaticInstance.uiManager.setMainSkillTip();
              }).start() : cc.tween(carNode_1).to(.3, {
                width: carNode_1.width - unit_1
              }).call(function() {
                carComponent_1.setCollider();
                DataManager_1.default.instance.isSkillRuning = false;
                DataManager_1.default.instance.isSkilling = false;
                StaticInstance_1.StaticInstance.uiManager.setMainSkillTip();
              }).start();
            });
          }
          return;
        }
        if (this.isMoving || this.touchPos || this.isOpacity) return;
        this.touchPos = touchPos;
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
          if (!DataManager_1.default.instance.isWssComplete) {
            console.log("wss\u64cd\u4f5c\u8fd8\u672a\u6210\u529fCar");
            return;
          }
          DataManager_1.default.instance.isWssComplete = false;
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
          EffectManager_1.default.instance.play1("CoinTip", this.node);
          GlobalVar_1.GlobalVar.wss.move_car();
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
          DataManager_1.default.instance.isWssComplete = true;
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
          if (1 == DataManager_1.default.instance.nowRoundConfig.is_special) {
            EffectManager_1.default.instance.play("TimeTip", this.node);
            DataManager_1.default.instance.seconds -= 5;
            StaticInstance_1.StaticInstance.uiManager.setMainTimerRendor();
          }
          this.resetStatus();
        } else if (other.tag == Enum_1.ENUM_COLLIDER_TYPE.CAR) {
          if (1 == DataManager_1.default.instance.nowRoundConfig.is_special) {
            if (this.isMoving) {
              DataManager_1.default.instance.isWssComplete = false;
              GlobalVar_1.GlobalVar.wss.crash_car();
            }
          } else DataManager_1.default.instance.isWssComplete = true;
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
              if (1 == DataManager_1.default.instance.nowRoundConfig.is_special) {
                EffectManager_1.default.instance.play("TimeTip", this.node);
                DataManager_1.default.instance.seconds -= 5;
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
              if (1 == DataManager_1.default.instance.nowRoundConfig.is_special) {
                EffectManager_1.default.instance.play("TimeTip", this.node);
                DataManager_1.default.instance.seconds -= 5;
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
            if (1 == DataManager_1.default.instance.nowRoundConfig.is_special) {
              EffectManager_1.default.instance.play("TimeTip", this.node);
              DataManager_1.default.instance.seconds -= 5;
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
    "../Languages": "Languages",
    "../StaticInstance": "StaticInstance",
    "../Utils": "Utils",
    "../data/EventName": "EventName",
    "../data/GlobalVar": "GlobalVar",
    "../manager/AudioManager": "AudioManager",
    "../manager/DataManager": "DataManager",
    "../manager/EffectManager": "EffectManager",
    "../manager/EventManager": "EventManager",
    "../manager/ResourceManager": "ResourceManager",
    "../manager/ToastManager": "ToastManager",
    "../net/HttpCom": "HttpCom"
  } ],
  Config: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "98619u1IW5CS41s4Ej/kpn1", "Config");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Config = exports.config = void 0;
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var protool = "https:";
    var host = "t.me/birds_li_bot?game=ggg";
    exports.config = {
      backendUrl: "http://18.136.79.134:3000",
      URL_YOU_ASSIGNED_TO_YOUR_APP: protool + "://" + host
    };
    var Config = function() {
      function Config() {}
      Config_1 = Config;
      var Config_1;
      Config.version = "V1.0.48";
      Config.appName = "htbtest2";
      Config.wss = "wss://mc-api.inatest.xyz/ws";
      Config.httpHost = "https://mc-api.inatest.xyz/api";
      Config.tgLogin = Config_1.httpHost + "/tg/tgLogin";
      Config.checkin = Config_1.httpHost + "/game/checkin";
      Config.setting = Config_1.httpHost + "/game/setting";
      Config.map = Config_1.httpHost + "/round/map";
      Config.start = Config_1.httpHost + "/round/start";
      Config.end = Config_1.httpHost + "/round/end";
      Config.goodsList = Config_1.httpHost + "/store/goodsList";
      Config.buy = Config_1.httpHost + "/store/buy";
      Config.taskList = Config_1.httpHost + "/task/list";
      Config.taskReceiveReward = Config_1.httpHost + "/task/receiveReward";
      Config.getPayWay = Config_1.httpHost + "/store/getPayWay";
      Config.dailySign = Config_1.httpHost + "/task/dailySign";
      Config.useItem = Config_1.httpHost + "/round/useItem";
      Config.invite = Config_1.httpHost + "/task/invite";
      Config.checkChannelJoin = Config_1.httpHost + "/task/checkChannelJoin";
      Config.taskProcess = Config_1.httpHost + "/task/process";
      Config = Config_1 = __decorate([ ccclass("Config") ], Config);
      return Config;
    }();
    exports.Config = Config;
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
      unit: 10,
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
        this.selectType = null;
        this._isMusicOn = true;
        this._isSoundOn = true;
        this.isWssComplete = true;
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
        this.nowRoundConfig = null;
        this.level = 1;
        this.levelMax = 1;
        this.levelData = null;
        this.clevel = 1;
        this.clevelMax = 1;
        this.power = 50;
        this.maxPower = 50;
        this.maxKey = 5;
        this.powerCollectByVideo = 1;
        this.lastPowerRefreshTime = 0;
        this.powerRefreshTime = 60;
        this.lastPowerUpdateTime = 0;
        this.coin = 0;
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
          isMusicOn: this.isMusicOn
        }));
      };
      DataManager.prototype.restore = function() {
        var _data = cc.sys.localStorage.getItem(STORAGE_KEY);
        try {
          var data = JSON.parse(_data);
          this.isMusicOn = false !== (null === data || void 0 === data ? void 0 : data.isMusicOn);
          this.isSoundOn = false !== (null === data || void 0 === data ? void 0 : data.isSoundOn);
        } catch (_a) {
          this.isMusicOn = true;
          this.isSoundOn = true;
        }
      };
      DataManager.prototype.formatBytes = function(bytes) {
        var K = 1e3;
        var M = 1e3 * K;
        var G = 1e3 * M;
        var T = 1e3 * G;
        var P = 1e3 * T;
        var E = 1e3 * P;
        var Z = 1e3 * E;
        var Y = 1e3 * Z;
        if (bytes < K) return "" + bytes;
        if (bytes < M) {
          var kilobytes = (bytes / K).toFixed(2);
          return kilobytes + " K";
        }
        if (bytes < G) {
          var megabytes = (bytes / M).toFixed(2);
          return megabytes + " M";
        }
        if (bytes < T) {
          var gigabytes = (bytes / G).toFixed(2);
          return gigabytes + " G";
        }
        if (bytes < P) {
          var terabytes = (bytes / T).toFixed(2);
          return terabytes + " T";
        }
        if (bytes < E) {
          var petabytes = (bytes / P).toFixed(2);
          return petabytes + " P";
        }
        if (bytes < Z) {
          var exabytes = (bytes / E).toFixed(2);
          return exabytes + " E";
        }
        if (bytes < Y) {
          var zettabytes = (bytes / Z).toFixed(2);
          return zettabytes + " Z";
        }
        var yottabytes = (bytes / Y).toFixed(2);
        return yottabytes + " Y";
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
    var StaticInstance_1 = require("../StaticInstance");
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
      EffectManager.prototype.play1 = function(effect, parent, options) {
        var effNode = PoolManager_1.default.instance.getNode("" + effect, StaticInstance_1.StaticInstance.uiManager.node);
        var pos = cc.v2(0, 0);
        pos.set(cc.v2(parent.x, parent.y));
        pos.set(parent.parent.convertToWorldSpace(pos));
        pos.set(StaticInstance_1.StaticInstance.uiManager.node.convertToNodeSpaceAR(pos));
        effNode.setPosition(pos);
        cc.Tween.stopAllByTarget(effNode);
        effNode.opacity = 255;
        cc.tween().target(effNode).parallel(cc.tween().by(1, {
          y: 60
        }), cc.tween().to(1, {
          opacity: 0
        })).call(function() {
          effNode.removeFromParent();
        }).start();
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
    "../StaticInstance": "StaticInstance",
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
      ENUM_UI_TYPE["LEVEL_UI1"] = "LevelUILayer1";
      ENUM_UI_TYPE["TASK"] = "TaskLayer";
      ENUM_UI_TYPE["SHOP"] = "ShopLayer";
      ENUM_UI_TYPE["SHARE"] = "ShareLayer";
      ENUM_UI_TYPE["LEVEL_UI"] = "LevelUILayer";
      ENUM_UI_TYPE["LEVEL_SELECT"] = "LevelSelectLayer";
      ENUM_UI_TYPE["EXIT_LEVEL"] = "ExitLevelLayer";
      ENUM_UI_TYPE["SETTING"] = "SettingLayer";
      ENUM_UI_TYPE["LOSE"] = "LoseLayer";
      ENUM_UI_TYPE["WIN"] = "WinLayer";
      ENUM_UI_TYPE["WINPT"] = "WinPTLayer";
      ENUM_UI_TYPE["WINTZ"] = "WinTZLayer";
      ENUM_UI_TYPE["TOAST"] = "ToastLayer";
      ENUM_UI_TYPE["TOAST1"] = "ToastLayer1";
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
      EventType["CLOSE_LEVEL_BTN"] = "CLOSE_LEVEL_BTN";
      EventType["UPDATE_LANGUAGE"] = "UPDATE_LANGUAGE";
      EventType["GOTO_LEVEL"] = "GOTO_LEVEL";
      EventType["UPDATE_POWER_LABEL"] = "UPDATE_POWER_LABEL";
      EventType["UPDATE_KEY_LABEL"] = "UPDATE_KEY_LABEL";
      EventType["UPDATE_COIN_LABEL"] = "UPDATE_COIN_LABEL";
      EventType["UPDATE_TASK_PANEL"] = "UPDATE_TASK_PANEL";
      EventType["UPDATE_SHAHE_PANEL"] = "UPDATE_SHAHE_PANEL";
      EventType["UPDATE_LEVEL_EVENT"] = "UPDATE_LEVEL_EVENT";
      EventType["INIT_GAME"] = "INIT_GAME";
      EventType["CONNECT_COMPLETE"] = "CONNECT_COMPLETE";
    })(EventType = exports.EventType || (exports.EventType = {}));
    var EventManager = function() {
      function EventManager() {
        this.eventMap = new Map();
      }
      EventManager.getInstance = function() {
        null === this._instance && (this._instance = new this());
        return this._instance;
      };
      Object.defineProperty(EventManager, "instance", {
        get: function() {
          return this.getInstance();
        },
        enumerable: false,
        configurable: true
      });
      EventManager.prototype.on = function(name, event, context) {
        if (this.eventMap.has(name)) {
          var eventArr = this.eventMap.get(name);
          eventArr.push({
            event: event,
            context: context
          });
        } else this.eventMap.set(name, [ {
          event: event,
          context: context
        } ]);
      };
      EventManager.prototype.off = function(name, event, context) {
        if (this.eventMap.has(name)) {
          var eventArr = this.eventMap.get(name);
          var index = eventArr.findIndex(function(item) {
            return item.event === event && item.context === context;
          });
          index > -1 && eventArr.splice(index, 1);
        }
      };
      EventManager.prototype.emit = function(name) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) params[_i - 1] = arguments[_i];
        if (this.eventMap.has(name)) {
          var eventArr = this.eventMap.get(name);
          eventArr.forEach(function(_a) {
            var event = _a.event, context = _a.context;
            context ? event.apply(context, params) : event(params);
          });
        }
      };
      EventManager.prototype.clear = function() {
        this.eventMap.clear();
      };
      EventManager._instance = null;
      return EventManager;
    }();
    exports.default = EventManager;
    cc._RF.pop();
  }, {} ],
  EventName: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "71735fPXPlMBawk9I0sDYaU", "EventName");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PropUpType = exports.GameEvent = exports.C2SEvent = exports.S2C_WssEvent = exports.WssEvent = exports.GamePropType = exports.PayType = exports.BattleEvent = void 0;
    var BattleEvent;
    (function(BattleEvent) {
      BattleEvent["HIT_BOSS"] = "HIT_BOSS";
    })(BattleEvent = exports.BattleEvent || (exports.BattleEvent = {}));
    var PayType;
    (function(PayType) {
      PayType["ton"] = "ton";
      PayType["star"] = "star";
      PayType["usdt"] = "usdt";
    })(PayType = exports.PayType || (exports.PayType = {}));
    var GamePropType;
    (function(GamePropType) {
      GamePropType["cut"] = "cut";
      GamePropType["hide"] = "hide";
      GamePropType["remove"] = "remove";
    })(GamePropType = exports.GamePropType || (exports.GamePropType = {}));
    var WssEvent;
    (function(WssEvent) {})(WssEvent = exports.WssEvent || (exports.WssEvent = {}));
    var S2C_WssEvent;
    (function(S2C_WssEvent) {
      S2C_WssEvent["ON_MOVE_CAR"] = "ON_MOVE_CAR";
      S2C_WssEvent["ON_CRASH_CAR"] = "ON_CRASH_CAR";
      S2C_WssEvent["ON_SET_CAR_NUM"] = "ON_SET_CAR_NUM";
      S2C_WssEvent["ON_CAR_REWARD"] = "ON_CAR_REWARD";
      S2C_WssEvent["PLAYER_LOGIN_ON_OTHER_DEVICE"] = "PLAYER_LOGIN_ON_OTHER_DEVICE";
      S2C_WssEvent["ON_WSS_ERROR"] = "ON_WSS_ERROR";
      S2C_WssEvent["ON_WSS_CLOSE"] = "ON_WSS_CLOSE";
      S2C_WssEvent["ON_WSS_OPEN"] = "ON_WSS_OPEN";
      S2C_WssEvent["DAILY_SIGN_PAY_RESPON_SUCCESS"] = "DAILY_SIGN_PAY_RESPON_SUCCESS";
      S2C_WssEvent["ERROR_MSG"] = "ERROR_MSG";
    })(S2C_WssEvent = exports.S2C_WssEvent || (exports.S2C_WssEvent = {}));
    var C2SEvent;
    (function(C2SEvent) {
      C2SEvent["ON_PLAYER_CLICK"] = "ON_PLAYER_CLICK";
    })(C2SEvent = exports.C2SEvent || (exports.C2SEvent = {}));
    var GameEvent;
    (function(GameEvent) {
      GameEvent["USER_INFO_UPDATE"] = "USER_INFO_UPDATE";
      GameEvent["SHOW_REWARD_PROPUP"] = "SHOW_REWARD_PROPUP";
      GameEvent["FIRE_CTRL"] = "FIRE_CTRL";
      GameEvent["ON_SIGNDATA_UPDATE"] = "ON_SIGNDATA_UPDATE";
      GameEvent["ON_USER_SIGNDATA_UPDATE"] = "ON_USER_SIGNDATA_UPDATE";
      GameEvent["ON_USER_SIGN_RESPONE"] = "ON_USER_SIGN_RESPONE";
      GameEvent["ON_CHECK_IS_SIGNED"] = "ON_CHECK_IS_SIGNED";
      GameEvent["SHOW_TOAST"] = "SHOW_TOAST";
      GameEvent["BUY_GOODS"] = "BUY_GOODS";
      GameEvent["SHOW_PAYWAY_PAGE"] = "SHOW_PAYWAY_PAGE";
      GameEvent["TON_DAILY_SIGN"] = "TON_DAILY_SIGN";
      GameEvent["OPEN_INVITE_URL"] = "OPEN_INVITE_URL";
      GameEvent["CHECK_NEW_PLAYER"] = "CHECK_NEW_PLAYER";
      GameEvent["ON_LEVEL_DATA_UPDATE"] = "ON_LEVEL_DATA_UPDATE";
      GameEvent["SHOW_LOADING"] = "SHOW_LOADING";
      GameEvent["ENABLE_WS_CHECK"] = "ENABLE_WS_CHECK";
    })(GameEvent = exports.GameEvent || (exports.GameEvent = {}));
    var PropUpType;
    (function(PropUpType) {
      PropUpType["BossReward"] = "BossReward";
      PropUpType["CDKReward"] = "CDKReward";
      PropUpType["AirDropReward"] = "AirDropReward";
      PropUpType["TaskReward"] = "TaskReward";
      PropUpType["SignReward"] = "SignReward";
    })(PropUpType = exports.PropUpType || (exports.PropUpType = {}));
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
        this.initGame();
      };
      GameManager.prototype.onGameLevelStart = function() {
        DataManager_1.default.instance.reset();
        this.initGame();
      };
      GameManager.prototype.onGameCheck = function() {
        if (StaticInstance_1.StaticInstance.uiManager.isActive(Enum_1.ENUM_UI_TYPE.MENU)) return;
        if (1 == DataManager_1.default.instance.nowRoundConfig.is_special) {
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
              StaticInstance_1.StaticInstance.uiManager.setMainTimer(false);
              StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.WINTZ);
            }
          }
        } else if (0 == DataManager_1.default.instance.nowRoundConfig.is_special && DataManager_1.default.instance.carNum <= DataManager_1.default.instance.carExitNum) {
          if (StaticInstance_1.StaticInstance.uiManager.isActive(Enum_1.ENUM_UI_TYPE.LOSE)) return;
          DataManager_1.default.instance.status = Enum_1.ENUM_GAME_STATUS.UNRUNING;
          AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.PASS);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.WINPT);
        }
      };
      GameManager.prototype.initGame = function() {
        DataManager_1.default.instance.status = Enum_1.ENUM_GAME_STATUS.UNRUNING;
        this.stage.removeAllChildren();
        if (DataManager_1.default.instance.mode == Enum_1.ENUM_GAME_MODE.TIMER) {
          var level = null;
          level = 1 == DataManager_1.default.instance.level && 0 == DataManager_1.default.instance.nowRoundConfig.is_special ? PoolManager_1.default.instance.getNode("Level1", this.stage) : PoolManager_1.default.instance.getNode("Level3", this.stage);
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
          var level = PoolManager_1.default.instance.getNode("Level3", this.stage);
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
      GameManager.prototype.removealllevel = function() {
        this.stage.removeAllChildren();
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
  GlobalVar: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "51560U3LvtLg5kvMljAvxIc", "GlobalVar");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GlobalVar = void 0;
    var GlobalVar = function() {
      function GlobalVar() {}
      GlobalVar.tgInitData = "";
      GlobalVar.token = null;
      GlobalVar.userInfo = null;
      GlobalVar.wss = null;
      GlobalVar.isWssReady = false;
      GlobalVar.postPing = 0;
      GlobalVar.maxLevel = 0;
      GlobalVar.isFirst = true;
      GlobalVar.currentBuyGoodsId = null;
      return GlobalVar;
    }();
    exports.GlobalVar = GlobalVar;
    cc._RF.pop();
  }, {} ],
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
  HttpCom: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "42fd5X7ic5HiqKK2/tO++bH", "HttpCom");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.HttpCom = void 0;
    var telegram_web_1 = require("../cocos-telegram-miniapps/telegram-web");
    var Config_1 = require("../data/Config");
    var EventName_1 = require("../data/EventName");
    var GlobalVar_1 = require("../data/GlobalVar");
    var CryptoJS = require("crypto-js");
    var ToastManager_1 = require("../manager/ToastManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HttpCom = function() {
      function HttpCom() {}
      HttpCom_1 = HttpCom;
      HttpCom.formatParams = function(params) {
        Object.keys(params).map(function(key) {
          switch (params[key]) {
           case void 0:
           case null:
            params[key] = "";
          }
        });
        return params;
      };
      HttpCom.generateSignature = function(params) {
        var secretKey = "KriSL1SOeinZ1RNCixjtPw==";
        var sortParams = Object.keys(params).sort();
        var sortParamsString = sortParams.map(function(key) {
          return key + "=" + params[key];
        }).join("&");
        return CryptoJS.HmacSHA256(sortParamsString, secretKey).toString();
      };
      HttpCom.login = function(inviteCode, cb) {
        console.log(CryptoJS, "CryptoJS");
        var rawData = "query_id=AAGM98MpAwAAAIz3wymrKwwD&user=%7B%22id%22%3A7143159692%2C%22first_name%22%3A%22gugu%22%2C%22last_name%22%3A%22guoer%22%2C%22username%22%3A%22guguwoshiguoer%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1727191103&hash=216ff6f6da7e53d0888fd246c29ba3fc7d6843f1cfd444479f1f04ef022e33c4";
        if (telegram_web_1.TelegramWebApp.Instance.isTGAvailable()) {
          rawData = telegram_web_1.TelegramWebApp.Instance.getTelegramWebAppInitData();
          if ("" == rawData) {
            var localRawData = cc.sys.localStorage.getItem("tgRawDataDev");
            rawData = localRawData || "query_id=AAGM98MpAwAAAIz3wymrKwwD&user=%7B%22id%22%3A7143159692%2C%22first_name%22%3A%22gugu%22%2C%22last_name%22%3A%22guoer%22%2C%22username%22%3A%22guguwoshiguoer%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1727191103&hash=216ff6f6da7e53d0888fd246c29ba3fc7d6843f1cfd444479f1f04ef022e33c4";
          }
        }
        var sendData = {
          tgRawData: rawData
        };
        inviteCode && (sendData["invite_id"] = inviteCode);
        HttpCom_1.post(Config_1.Config.httpHost + "/auth/login", sendData, function(resp) {
          console.log(resp, "\u767b\u5f55\u8fd4\u56de");
          GlobalVar_1.GlobalVar.token = resp.data.accessToken;
          HttpCom_1.checkin(cb);
        });
      };
      HttpCom.get = function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (4 === xhr.readyState && xhr.status >= 200 && xhr.status < 300) try {
            var response = JSON.parse(xhr.responseText);
            callback(response);
            console.info("code:", response.code, "msg:", response.msg);
          } catch (e) {
            console.error("Failed to parse response JSON:", e);
          }
          500 == xhr.status;
        };
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Authorization", "Bearer " + GlobalVar_1.GlobalVar.token);
        xhr.send();
      };
      HttpCom.post = function(url, data, callback) {
        var _this = this;
        cc.game.emit(EventName_1.GameEvent.SHOW_LOADING, true);
        var xhr = new XMLHttpRequest();
        xhr.timeout = 1e4;
        GlobalVar_1.GlobalVar.postPing = new Date().getTime();
        xhr.ontimeout = function() {
          _this.post(url, data, callback);
        };
        xhr.onreadystatechange = function() {
          if (4 === xhr.readyState && xhr.status >= 200 && xhr.status < 300) try {
            cc.game.emit(EventName_1.GameEvent.SHOW_LOADING, false);
            console.log(xhr.responseText, "responseText");
            var response = JSON.parse(xhr.responseText);
            if (0 == response.code) {
              if (response.header && response.header.Authorization) {
                console.log("token\u8fc7\u671f\uff0c\u4ece\u540e\u7aef\u8fd4\u56de\u4e2d\u91cd\u65b0\u83b7\u53d6token");
                GlobalVar_1.GlobalVar.token = response.header["Authorization"].replace(/^Bearer\s+/, "");
              }
              callback(response);
            } else 9e3 == response.code && ToastManager_1.default.instance.show(response.message, {
              gravity: "CENTER",
              duration: 5,
              bg_color: cc.color(226, 69, 109, 255)
            });
            console.info("code:", response.code, "msg:", response.msg);
          } catch (e) {
            console.error("Failed to parse response JSON:", e);
          }
        };
        console.log(url, "\u8bf7\u6c42\u5730\u5740");
        this.serialize_id++;
        data["serialize_id"] = this.serialize_id;
        var sign = this.generateSignature(data);
        data["sign"] = sign;
        console.log(data);
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.setRequestHeader("Authorization", "Bearer " + GlobalVar_1.GlobalVar.token);
        var str = JSON.stringify(data);
        console.log(str, "postData");
        xhr.send(str);
      };
      HttpCom.checkin = function(cb) {
        HttpCom_1.post(Config_1.Config.checkin, {}, function(resp) {
          GlobalVar_1.GlobalVar.userInfo = resp.data;
          cb && cb();
          console.log(GlobalVar_1.GlobalVar.userInfo, "\u7528\u6237\u4fe1\u606f");
        });
      };
      HttpCom.setting = function(lang) {
        var data = {
          type: "language",
          value: lang
        };
        HttpCom_1.post(Config_1.Config.setting, data, function(resp) {
          console.log(resp, "\u8bbe\u7f6e\u8bed\u8a00");
        });
      };
      HttpCom.map = function(cb) {
        HttpCom_1.post(Config_1.Config.map, {}, function(resp) {
          if (0 == resp.code) {
            cb && cb(resp);
            console.log(resp, "\u5173\u5361\u5217\u8868:\u6210\u529f");
            GlobalVar_1.GlobalVar.maxLevel = resp.data.round_map.length;
            cc.game.emit(EventName_1.GameEvent.ON_LEVEL_DATA_UPDATE, resp);
          } else console.log(resp, "\u5173\u5361\u5217\u8868:\u5931\u8d25");
        });
      };
      HttpCom.start = function(round, special, cb) {
        var data = {
          round: round,
          special: special
        };
        HttpCom_1.post(Config_1.Config.start, data, function(resp) {
          cb && cb(resp);
          console.log(resp, "\u5f00\u59cb\u5173\u5361\u8fd4\u56de\u7684\u5173\u5361\u4fe1\u606f");
          GlobalVar_1.GlobalVar.isWssReady = true;
        });
      };
      HttpCom.end = function(cb) {
        HttpCom_1.post(Config_1.Config.end, {}, function(resp) {
          if (0 == resp.code) {
            console.log(resp, "\u7ed3\u675f\u5173\u5361:\u6210\u529f");
            cb && cb(resp);
            HttpCom_1.map(function() {});
          } else console.log(resp, "\u7ed3\u675f\u5173\u5361:\u5931\u8d25");
        });
      };
      HttpCom.goodsList = function(type, cb) {
        var data = {
          tab: type
        };
        HttpCom_1.post(Config_1.Config.goodsList, data, function(resp) {
          if (0 == resp.code) {
            console.log(resp, "\u5546\u54c1\u4fe1\u606f:\u6210\u529f");
            cb && cb(resp);
          } else console.log(resp, "\u5546\u54c1\u4fe1\u606f:\u5931\u8d25");
        });
      };
      HttpCom.buy = function(good_id, payType, cb) {
        var data = {
          goods_id: good_id,
          payment_method: payType
        };
        HttpCom_1.post(Config_1.Config.buy, data, function(resp) {
          if (0 == resp.code) {
            console.log(resp, "\u8d2d\u4e70\u5546\u54c1:\u6210\u529f");
            cb && cb(resp);
          } else console.log(resp, "\u8d2d\u4e70\u5546\u54c1:\u5931\u8d25");
        });
      };
      HttpCom.taskList = function(type, cb) {
        var data = {
          type: type
        };
        HttpCom_1.post(Config_1.Config.taskList, data, function(resp) {
          if (0 == resp.code) {
            console.log(resp, "\u4efb\u52a1\u5217\u8868:\u6210\u529f");
            cb && cb(resp);
          } else console.log(resp, "\u4efb\u52a1\u5217\u8868:\u5931\u8d25");
        });
      };
      HttpCom.taskReceiveReward = function(task_id, cb) {
        var data = {
          task_id: task_id
        };
        HttpCom_1.post(Config_1.Config.taskReceiveReward, data, function(resp) {
          if (0 == resp.code) {
            console.log(resp, "\u9886\u53d6\u4efb\u52a1\u5956\u52b1:\u6210\u529f");
            cb && cb(resp);
          } else console.log(resp, "\u9886\u53d6\u4efb\u52a1\u5956\u52b1:\u5931\u8d25");
        });
      };
      HttpCom.getPayWay = function(goods_id, cb) {
        var data = {
          goods_id: goods_id
        };
        HttpCom_1.post(Config_1.Config.getPayWay, data, function(resp) {
          if (0 == resp.code) {
            console.log(resp, "\u83b7\u53d6\u652f\u4ed8\u65b9\u5f0f:\u6210\u529f");
            cb && cb(resp);
          } else console.log(resp, "\u83b7\u53d6\u652f\u4ed8\u65b9\u5f0f:\u5931\u8d25");
        });
      };
      HttpCom.dailySign = function(task_id, cb) {
        var data = {
          task_id: task_id
        };
        HttpCom_1.post(Config_1.Config.dailySign, data, function(resp) {
          if (0 == resp.code) {
            console.log(resp, "\u83b7\u53d6\u6bcf\u65e5\u94b1\u5305\u7b7e\u5230:\u6210\u529f");
            cb && cb(resp);
          } else console.log(resp, "\u83b7\u53d6\u6bcf\u65e5\u94b1\u5305\u7b7e\u5230:\u5931\u8d25");
        });
      };
      HttpCom.useItem = function(usage, cb) {
        var data = {
          usage: usage
        };
        HttpCom_1.post(Config_1.Config.useItem, data, function(resp) {
          if (0 == resp.code) {
            console.log(resp, "\u4f7f\u7528\u6e38\u620f\u9053\u5177:\u6210\u529f");
            cb && cb(resp);
          } else console.log(resp, "\u4f7f\u7528\u6e38\u620f\u9053\u5177:\u5931\u8d25");
        });
      };
      HttpCom.invite = function(cb) {
        HttpCom_1.post(Config_1.Config.invite, {}, function(resp) {
          if (0 == resp.code) {
            console.log(resp, "\u83b7\u53d6\u9080\u8bf7\u5217\u8868:\u6210\u529f");
            cb && cb(resp);
          } else console.log(resp, "\u83b7\u53d6\u9080\u8bf7\u5217\u8868:\u5931\u8d25");
        });
      };
      HttpCom.checkChannelJoin = function(cb) {
        HttpCom_1.post(Config_1.Config.checkChannelJoin, {}, function(resp) {
          if (0 == resp.code) {
            console.log(resp, "tg\u9891\u9053\u52a0\u5165\u4efb\u52a1 \u68c0\u6d4b:\u6210\u529f");
            cb && cb(resp);
          } else console.log(resp, "tg\u9891\u9053\u52a0\u5165\u4efb\u52a1 \u68c0\u6d4b:\u5931\u8d25");
        });
      };
      HttpCom.taskProcess = function(taskId, cb) {
        HttpCom_1.post(Config_1.Config.taskProcess, {
          task_id: taskId
        }, function(resp) {
          if (0 == resp.code) {
            console.log(resp, "\u70b9\u51fb\u5373\u5b8c\u6210\u7684\u4efb\u52a1:\u6210\u529f");
            cb && cb(resp);
          } else console.log(resp, "\u70b9\u51fb\u5373\u5b8c\u6210\u7684\u4efb\u52a1:\u5931\u8d25");
        });
      };
      var HttpCom_1;
      HttpCom.serialize_id = 0;
      HttpCom = HttpCom_1 = __decorate([ ccclass("HttpCom") ], HttpCom);
      return HttpCom;
    }();
    exports.HttpCom = HttpCom;
    cc._RF.pop();
  }, {
    "../cocos-telegram-miniapps/telegram-web": "telegram-web",
    "../data/Config": "Config",
    "../data/EventName": "EventName",
    "../data/GlobalVar": "GlobalVar",
    "../manager/ToastManager": "ToastManager",
    "crypto-js": 12
  } ],
  Index: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bd1a12oV81Cu7bBxEAPpr3S", "Index");
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
    exports.PanelType = void 0;
    var StaticInstance_1 = require("./StaticInstance");
    var Enum_1 = require("./Enum");
    var AudioManager_1 = require("./manager/AudioManager");
    var DataManager_1 = require("./manager/DataManager");
    var ResourceManager_1 = require("./manager/ResourceManager");
    var SdkManager_1 = require("./manager/SdkManager");
    var HttpCom_1 = require("./net/HttpCom");
    var GlobalVar_1 = require("./data/GlobalVar");
    var WssCom_1 = require("./net/WssCom");
    var telegram_web_1 = require("./cocos-telegram-miniapps/telegram-web");
    var EventName_1 = require("./data/EventName");
    var telegram_ui_1 = require("./cocos-telegram-miniapps/telegram-ui");
    var Config_1 = require("./data/Config");
    var EventManager_1 = require("./manager/EventManager");
    var webton_1 = require("./cocos-telegram-miniapps/webton");
    var ToastManager_1 = require("./manager/ToastManager");
    var Languages_1 = require("./Languages");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PanelType;
    (function(PanelType) {
      PanelType[PanelType["Putong"] = 1] = "Putong";
      PanelType[PanelType["Tiaozhan"] = 2] = "Tiaozhan";
    })(PanelType = exports.PanelType || (exports.PanelType = {}));
    var Index = function(_super) {
      __extends(Index, _super);
      function Index() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.collisionManagerDebug = false;
        _this.versionLab = null;
        _this.loadingPage = null;
        _this.loadingPageTween = null;
        _this.isGoToLevel = false;
        return _this;
      }
      Index.prototype.onLoad = function() {
        var _this = this;
        console.log("built:", Config_1.Config.version);
        var url = window.location.href;
        console.log(url, "\u7f51\u9875\u5730\u5740");
        this.node.getChildByName("UI").opacity = 255;
        cc.view.setResizeCallback(function() {
          return _this.responsive();
        });
        this.responsive();
        DataManager_1.default.instance.loadingRate = 0;
        var colManager = cc.director.getCollisionManager();
        colManager.enabled = true;
        this.collisionManagerDebug && (colManager.enabledDebugDraw = true);
        cc.game.on(EventName_1.GameEvent.BUY_GOODS, this.BUY_GOODS, this);
        cc.game.on(EventName_1.GameEvent.TON_DAILY_SIGN, this.TON_DAILY_SIGN, this);
        cc.game.on(EventName_1.S2C_WssEvent.ON_WSS_CLOSE, this.ON_WSS_CLOSE, this);
        cc.game.on(EventName_1.S2C_WssEvent.ON_WSS_OPEN, this.ON_WSS_OPEN, this);
        cc.game.on(EventName_1.GameEvent.OPEN_INVITE_URL, this.OPEN_INVITE_URL, this);
        cc.game.on(EventName_1.S2C_WssEvent.PLAYER_LOGIN_ON_OTHER_DEVICE, this.PLAYER_LOGIN_ON_OTHER_DEVICE, this);
        this.versionLab.string = Config_1.Config.version;
        EventManager_1.default.instance.on(EventManager_1.EventType.GOTO_LEVEL, this.gotoLevel, this);
        cc.game.on(EventName_1.S2C_WssEvent.ON_SET_CAR_NUM, this.onSetCarNum, this);
        cc.game.on(EventName_1.S2C_WssEvent.ON_MOVE_CAR, this.onMoveCar, this);
        cc.game.on(EventName_1.S2C_WssEvent.ON_CRASH_CAR, this.onCrashCar, this);
        cc.game.on(EventName_1.GameEvent.CHECK_NEW_PLAYER, this.CHECK_NEW_PLAYER, this);
        cc.game.on(EventName_1.GameEvent.SHOW_LOADING, this.SHOW_LOADING, this);
        cc.game.on(EventName_1.GameEvent.ENABLE_WS_CHECK, this.ENABLE_WS_CHECK, this);
        EventManager_1.default.instance.on(EventManager_1.EventType.INIT_GAME, this.initGame, this);
      };
      Index.prototype.onDestroy = function() {
        cc.game.off(EventName_1.GameEvent.BUY_GOODS, this.BUY_GOODS, this);
        cc.game.off(EventName_1.GameEvent.TON_DAILY_SIGN, this.TON_DAILY_SIGN, this);
        cc.game.off(EventName_1.S2C_WssEvent.ON_WSS_CLOSE, this.ON_WSS_CLOSE, this);
        cc.game.off(EventName_1.GameEvent.OPEN_INVITE_URL, this.OPEN_INVITE_URL, this);
        cc.game.off(EventName_1.GameEvent.CHECK_NEW_PLAYER, this.CHECK_NEW_PLAYER, this);
        cc.game.off(EventName_1.GameEvent.SHOW_LOADING, this.SHOW_LOADING, this);
        cc.game.off(EventName_1.GameEvent.ENABLE_WS_CHECK, this.ENABLE_WS_CHECK, this);
      };
      Index.prototype.SHOW_LOADING = function(isShow) {
        this.loadingPageTween && this.loadingPageTween.stop();
        this.loadingPage.active = true;
        if (isShow) {
          this.loadingPage.opacity = 0;
          this.loadingPageTween = cc.tween(this.loadingPage).delay(.8).call(function() {}).to(.2, {
            opacity: 255
          }).start();
        } else this.loadingPage.active = false;
      };
      Index.prototype.PLAYER_LOGIN_ON_OTHER_DEVICE = function() {
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.TOAST1, true, null, "logsinonotherdevices");
      };
      Index.prototype.OPEN_INVITE_URL = function() {
        var test = "AXIDFAF";
        if (window["Telegram"] && window["Telegram"].WebApp) {
          var link = "https://t.me/Htbtset2bot/" + Config_1.Config.appName + "?startapp=" + GlobalVar_1.GlobalVar.userInfo.id.toString();
          var shareLink = "https://t.me/share/url?url=" + link;
          window["Telegram"].WebApp.openTelegramLink(shareLink);
        }
      };
      Index.prototype.ON_WSS_CLOSE = function() {};
      Index.prototype.ENABLE_WS_CHECK = function() {
        this.schedule(this.checkWS, 5, cc.macro.REPEAT_FOREVER, 1);
      };
      Index.prototype.checkWS = function() {
        if (GlobalVar_1.GlobalVar.wss.socket.readyState !== WebSocket.OPEN) {
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.TOAST1, true, null, "tips2");
          GlobalVar_1.GlobalVar.wss = new WssCom_1.WssCom();
          GlobalVar_1.GlobalVar.wss.initWs();
        }
      };
      Index.prototype.ON_WSS_OPEN = function() {
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.TOAST1, false, null, "tips2");
      };
      Index.prototype.TON_DAILY_SIGN = function() {
        var _this = this;
        HttpCom_1.HttpCom.dailySign(17, function(resp) {
          return __awaiter(_this, void 0, void 0, function() {
            var pl, trans;
            var _a;
            return __generator(this, function(_b) {
              switch (_b.label) {
               case 0:
                telegram_ui_1.TonConnectUi.Instance.setWallet(resp.data.ton_address);
                console.log(resp.data, "\u94b1\u5305\u7b7e\u5230\u8fd4\u56de\u7684");
                pl = JSON.stringify({
                  order_no: resp.data.order_no,
                  sign: HttpCom_1.HttpCom.generateSignature({
                    order_no: resp.data.order_no
                  })
                });
                if (!telegram_ui_1.TonConnectUi.Instance.isTonConnected()) return [ 3, 2 ];
                _a = {
                  amount: resp.data.amount
                };
                return [ 4, webton_1.WebTon.Instance.createMessagePayload(pl) ];

               case 1:
                trans = (_a.payload = _b.sent(), _a.callBack = function(result) {
                  console.log(result);
                }, _a);
                telegram_ui_1.TonConnectUi.Instance.sendTransaction(trans);
                return [ 3, 3 ];

               case 2:
                telegram_ui_1.TonConnectUi.Instance.openModal();
                _b.label = 3;

               case 3:
                return [ 2 ];
              }
            });
          });
        });
      };
      Index.prototype.BUY_GOODS = function(goods_id, payType, price, address) {
        address && telegram_ui_1.TonConnectUi.Instance.setWallet(address);
        HttpCom_1.HttpCom.buy(goods_id, payType, function(resp) {
          switch (payType) {
           case EventName_1.PayType.ton:
            if (telegram_ui_1.TonConnectUi.Instance.isTonConnected()) {
              var trans = {
                amount: price,
                payload: "hi",
                callBack: function(result) {
                  console.log(result);
                }
              };
              telegram_ui_1.TonConnectUi.Instance.sendTransaction(trans);
            } else telegram_ui_1.TonConnectUi.Instance.openModal();
            break;

           case EventName_1.PayType.usdt:
            break;

           case EventName_1.PayType.star:
            telegram_web_1.TelegramWebApp.Instance.openTelegramLink(resp.data.pay_link);
          }
        });
      };
      Index.prototype.safeParse = function(start_param) {
        try {
          var str = atob(start_param);
          return JSON.parse(str);
        } catch (error) {
          return {};
        }
      };
      Index.prototype.start = function() {
        return __awaiter(this, void 0, void 0, function() {
          var _a, _b, _i, index, resource;
          var _this = this;
          return __generator(this, function(_c) {
            switch (_c.label) {
             case 0:
              _a = [];
              for (_b in Enum_1.ENUM_RESOURCE_TYPE) _a.push(_b);
              _i = 0;
              _c.label = 1;

             case 1:
              if (!(_i < _a.length)) return [ 3, 4 ];
              index = _a[_i];
              resource = Enum_1.ENUM_RESOURCE_TYPE[index];
              return [ 4, ResourceManager_1.default.instance.loadRes(resource) ];

             case 2:
              _c.sent();
              _c.label = 3;

             case 3:
              _i++;
              return [ 3, 1 ];

             case 4:
              DataManager_1.default.instance.restore();
              StaticInstance_1.StaticInstance.uiManager.init();
              AudioManager_1.default.instance.playMusic();
              SdkManager_1.default.instance.initAudioEndListener();
              SdkManager_1.default.instance.passiveShare();
              SdkManager_1.default.instance.getRank();
              telegram_web_1.TelegramWebApp.Instance.init().then(function(res) {
                console.log("telegram web app init : ", res.success);
                telegram_web_1.TelegramWebApp.Instance.enableClosingConfirmation();
                GlobalVar_1.GlobalVar.tgInitData = telegram_web_1.TelegramWebApp.Instance.getTelegramWebAppInitData();
                webton_1.WebTon.Instance.init();
                _this.loadWallet().then(function(res) {
                  if (!res) {
                    console.error("load wallet failed!");
                    return;
                  }
                  _this._initTonUI();
                }).catch(function(err) {
                  console.error(err);
                });
                var initDataUnsafe = telegram_web_1.TelegramWebApp.Instance.getTelegramWebAppInitDataUnSafe();
                console.log("initDataUnsafe:", initDataUnsafe);
                console.log(initDataUnsafe.start_param, "\u9080\u8bf7\u7801");
                telegram_web_1.TelegramWebApp.Instance.expand();
                HttpCom_1.HttpCom.login(initDataUnsafe.start_param, function() {
                  GlobalVar_1.GlobalVar.wss = new WssCom_1.WssCom();
                  GlobalVar_1.GlobalVar.wss.initWs();
                  _this.initData();
                  if (GlobalVar_1.GlobalVar.userInfo.round >= 1) {
                    StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LEVEL_UI, true);
                    StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LEVEL_UI1, true);
                    StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LEVEL_SELECT, true);
                  } else _this.isGoToLevel = true;
                });
              }).catch(function(err) {
                console.error(err);
              });
              return [ 2 ];
            }
          });
        });
      };
      Index.prototype._initTonUI = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            telegram_ui_1.TonConnectUi.Instance.init("https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json", this._config.tonAddress, "en").then(function(res) {
              console.log("ton connect ui init : ", res.success);
              telegram_ui_1.TonConnectUi.Instance.subscribeWallet(function() {
                console.log("wallet change");
                EventManager_1.default.instance.emit(EventManager_1.EventType.CONNECT_COMPLETE, res.success);
              });
            });
            return [ 2 ];
          });
        });
      };
      Index.prototype.loadWallet = function() {
        return __awaiter(this, void 0, Promise, function() {
          var addressConfig;
          return __generator(this, function(_a) {
            true;
            console.log("CC_BUILD", true);
            try {
              addressConfig = {
                tonAddress: "EQBVa6SwOkmSV7qHdy-iYW3mq3Br3gOoylJAAOeP0o91BS8K",
                jettonAddress: "EQD_GZls9HhMJGp26xDmSHBNTk7BXBQ5dUAe7Us20hr_-zuo"
              };
              this._config = addressConfig;
              return [ 2, true ];
            } catch (e) {
              console.error("request config failed!", e);
              return [ 2, false ];
            }
            return [ 2 ];
          });
        });
      };
      Index.prototype.initData = function() {
        DataManager_1.default.instance.coin = GlobalVar_1.GlobalVar.userInfo.coin;
        DataManager_1.default.instance.maxKey = Number(GlobalVar_1.GlobalVar.userInfo.init_player_key);
        DataManager_1.default.instance.keys = GlobalVar_1.GlobalVar.userInfo.key;
        var lang = GlobalVar_1.GlobalVar.userInfo.lang;
        DataManager_1.default.instance.language = lang;
        DataManager_1.default.instance.powerRefreshTime = Number(GlobalVar_1.GlobalVar.userInfo.hp_recover_cd);
      };
      Index.prototype.responsive = function() {
        var designSize = cc.view.getDesignResolutionSize();
        var viewSize = cc.view.getFrameSize();
        var setFitWidth = function() {
          cc.Canvas.instance.fitHeight = false;
          cc.Canvas.instance.fitWidth = true;
        };
        var setFitHeight = function() {
          cc.Canvas.instance.fitHeight = true;
          cc.Canvas.instance.fitWidth = false;
        };
        var setFitBoth = function() {
          cc.Canvas.instance.fitHeight = true;
          cc.Canvas.instance.fitWidth = true;
        };
        var designRatio = designSize.width / designSize.height;
        var viewRatio = viewSize.width / viewSize.height;
        designRatio < 1 ? viewRatio < 1 ? viewRatio > designRatio ? setFitBoth() : setFitWidth() : setFitBoth() : viewRatio > 1 ? viewRatio < designRatio ? setFitBoth() : setFitHeight() : setFitBoth();
      };
      Index.prototype.initGame = function() {
        if (GlobalVar_1.GlobalVar.userInfo.round >= 1) {
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LEVEL_UI, true);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LEVEL_UI1, true);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LEVEL_SELECT, true);
        } else {
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LEVEL_UI, true);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LEVEL_UI1, true);
        }
      };
      Index.prototype.CHECK_NEW_PLAYER = function() {
        var _this = this;
        if (GlobalVar_1.GlobalVar.userInfo.round >= 1) ; else {
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LEVEL_UI, true);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LEVEL_UI1, true);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LEVEL_SELECT, false);
          HttpCom_1.HttpCom.map(function() {
            _this.gotoLevel(PanelType.Putong, 1);
          });
        }
      };
      Index.prototype.gotoLevel = function(type, level) {
        if (!GlobalVar_1.GlobalVar.isWssReady) {
          console.log("wss\u672a\u8fde\u63a5\u6210\u529f");
          return;
        }
        if (Number(GlobalVar_1.GlobalVar.userInfo.hp.value) < 5) {
          ToastManager_1.default.instance.show(Languages_1.Languages["toast1"][DataManager_1.default.instance.language], {
            gravity: "TOP",
            bg_color: cc.color(226, 69, 109, 255)
          });
          return;
        }
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LEVEL_SELECT, false);
        var special = 0;
        type == PanelType.Tiaozhan && (special = 1);
        HttpCom_1.HttpCom.start(level, special, function(res) {
          var data = res.data;
          DataManager_1.default.instance.level = level;
          GlobalVar_1.GlobalVar.userInfo.hp.value = String(data.hp.value);
          GlobalVar_1.GlobalVar.userInfo.hp.last_cd_time = data.hp.last_cd_time;
          DataManager_1.default.instance.nowRoundConfig = data.round_config;
          DataManager_1.default.instance.seconds = data.round_config.time_limit;
          EventManager_1.default.instance.emit(EventManager_1.EventType.UPDATE_POWER_LABEL);
          DataManager_1.default.instance.mode = Enum_1.ENUM_GAME_MODE.TIMER;
          StaticInstance_1.StaticInstance.transitionsManager.play(null, Enum_1.ENUM_UI_TYPE.MAIN, function() {
            StaticInstance_1.StaticInstance.gameManager.onGameStart();
            DataManager_1.default.instance.isWssComplete = false;
            GlobalVar_1.GlobalVar.wss.set_car_nums(DataManager_1.default.instance.carNum);
            1 == DataManager_1.default.instance.nowRoundConfig.is_special && (DataManager_1.default.instance.isTimerStart || StaticInstance_1.StaticInstance.uiManager.setMainTimer());
          });
        });
      };
      Index.prototype.onSetCarNum = function(data) {
        DataManager_1.default.instance.isWssComplete = true;
        console.log(data, "-----------\u8bbe\u7f6e\u5361\u8f66\u6570\u91cf\u6210\u529f");
      };
      Index.prototype.onMoveCar = function(data) {
        DataManager_1.default.instance.isWssComplete = true;
        console.log(data, "-----------\u79fb\u52a8\u8f66\u8f86\u6210\u529f");
      };
      Index.prototype.onCrashCar = function(data) {
        DataManager_1.default.instance.isWssComplete = true;
        console.log(data, "-----------\u78b0\u649e\u8f66\u8f86\u6210\u529f");
      };
      Index.prototype.update = function(dt) {};
      __decorate([ property ], Index.prototype, "collisionManagerDebug", void 0);
      __decorate([ property(cc.Label) ], Index.prototype, "versionLab", void 0);
      __decorate([ property(cc.Node) ], Index.prototype, "loadingPage", void 0);
      Index = __decorate([ ccclass ], Index);
      return Index;
    }(cc.Component);
    exports.default = Index;
    cc._RF.pop();
  }, {
    "./Enum": "Enum",
    "./Languages": "Languages",
    "./StaticInstance": "StaticInstance",
    "./cocos-telegram-miniapps/telegram-ui": "telegram-ui",
    "./cocos-telegram-miniapps/telegram-web": "telegram-web",
    "./cocos-telegram-miniapps/webton": "webton",
    "./data/Config": "Config",
    "./data/EventName": "EventName",
    "./data/GlobalVar": "GlobalVar",
    "./manager/AudioManager": "AudioManager",
    "./manager/DataManager": "DataManager",
    "./manager/EventManager": "EventManager",
    "./manager/ResourceManager": "ResourceManager",
    "./manager/SdkManager": "SdkManager",
    "./manager/ToastManager": "ToastManager",
    "./net/HttpCom": "HttpCom",
    "./net/WssCom": "WssCom"
  } ],
  InterfaceCom: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9dfdfJF9n1MeL4LVQ5bnypm", "InterfaceCom");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TaskModule = void 0;
    var TaskModule;
    (function(TaskModule) {
      TaskModule["open_bot"] = "open_bot";
      TaskModule["tw_content_like"] = "tw_content_like";
      TaskModule["hp_use_daily"] = "hp_use_daily";
      TaskModule["move_car_daily"] = "move_car_daily";
      TaskModule["game_click"] = "game_click";
      TaskModule["daily_sign"] = "daily_sign";
      TaskModule["round_finish"] = "round_finish";
      TaskModule["round_rate_star"] = "round_rate_star";
      TaskModule["hp_use"] = "hp_use";
      TaskModule["goods_buy"] = "goods_buy";
      TaskModule["tg_rss"] = "tg_rss";
      TaskModule["tw_follow"] = "tw_follow";
      TaskModule["connect_wallet"] = "connect_wallet";
    })(TaskModule = exports.TaskModule || (exports.TaskModule = {}));
    cc._RF.pop();
  }, {} ],
  Languages: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "80441iPnaxNEIJc+SJheeZb", "Languages");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Languages = exports.LanguageKey = exports.LanguageType = void 0;
    var LanguageType;
    (function(LanguageType) {
      LanguageType["CH_J"] = "zh-hans";
      LanguageType["CH_F"] = "zh-hant";
      LanguageType["EN"] = "en";
      LanguageType["RU"] = "ru";
      LanguageType["AR"] = "ar";
      LanguageType["JA"] = "ja";
    })(LanguageType = exports.LanguageType || (exports.LanguageType = {}));
    exports.LanguageKey = {
      "zh-hans": "CH_J",
      "zh-hant": "CH_F",
      en: "EN",
      ru: "RU",
      ar: "AR",
      ja: "JA"
    };
    exports.Languages = {
      suoduan: {
        name: "suoduan",
        "zh-hans": "\u7f29\u77ed",
        "zh-hant": "\u7e2e\u77ed",
        en: "Shorten",
        ru: "\u0421\u043e\u043a\u0440\u0430\u0449\u0435\u043d\u0438\u0435",
        ar: "\u062a\u0642\u0635\u064a\u0631",
        ja: "\u77ed\u7e2e"
      },
      touming: {
        name: "touming",
        "zh-hans": "\u900f\u660e",
        "zh-hant": "\u900f\u660e",
        en: "Transparent",
        ru: "\u041f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u043e\u0441\u0442\u044c",
        ar: "\u0634\u0641\u0627\u0641\u064a\u0629",
        ja: "\u900f\u904e\u6027"
      },
      yichu: {
        name: "yichu",
        "zh-hans": "\u79fb\u9664",
        "zh-hant": "\u79fb\u9664",
        en: "Remove",
        ru: "\u0423\u0434\u0430\u043b\u0438\u0442\u044c",
        ar: "\u0625\u0632\u0627\u0644\u0629",
        ja: "\u9664\u53bb\u3058\u3087\u304d\u3087"
      },
      zhuanqv: {
        name: "zhuanqv",
        "zh-hans": "\u8d5a\u53d6",
        "zh-hant": "\u8cfa\u53d6",
        en: "Earn",
        ru: "\u0417\u0430\u0440\u0430\u0431\u043e\u0442\u0430\u0442\u044c",
        ar: "\u0643\u0633\u0628",
        ja: "\u3082\u3046\u304b\u308b"
      },
      renwu: {
        name: "renwu",
        "zh-hans": "\u4efb\u52a1",
        "zh-hant": "\u4efb\u52d9",
        en: "Task",
        ru: "\u041c\u0430\u043d\u0434\u0430\u0442",
        ar: "\u0645\u0647\u0645\u0629",
        ja: "\u30bf\u30b9\u30af\uff03\u30bf\u30b9\u30af\uff03"
      },
      shangdian: {
        name: "shangdian",
        "zh-hans": "\u5546\u5e97",
        "zh-hant": "\u5546\u5e97",
        en: "Store",
        ru: "\u041c\u0430\u0433\u0430\u0437\u0438\u043d\u044b",
        ar: "\u0645\u062e\u0632\u0646",
        ja: "\u5e97"
      },
      yaoqing: {
        name: "yaoqing",
        "zh-hans": "\u9080\u8bf7",
        "zh-hant": "\u9080\u8acb",
        en: "Invite",
        ru: "\u041f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435",
        ar: "\u062f\u0639\u0648\u0629",
        ja: "\u306b\u52e7\u3081\u308b"
      },
      guankaxuanze: {
        name: "guankaxuanze",
        "zh-hans": "\u5173\u5361\u9009\u62e9",
        "zh-hant": "\u95dc\u5361\u9078\u64c7",
        en: "Stage Select",
        ru: "\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0443\u0440\u043e\u0432\u0435\u043d\u044c",
        ar: "\u0627\u062e\u062a\u064a\u0627\u0631 \u0645\u0633\u062a\u0648\u0649",
        ja: "\u30ec\u30d9\u30eb\u9078\u629e"
      },
      putongmoshi: {
        name: "putongmoshi",
        "zh-hans": "\u666e\u901a\u6a21\u5f0f",
        "zh-hant": "\u666e\u901a\u6a21\u5f0f",
        en: "Normal mode",
        ru: "\u041e\u0431\u044b\u0447\u043d\u0430\u044f \u043c\u043e\u0434\u0435\u043b\u044c",
        ar: "\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0639\u0627\u0645",
        ja: "\u901a\u5e38\u30e2\u30fc\u30c9"
      },
      tiaozhanmoshi: {
        name: "tiaozhanmoshi",
        "zh-hans": "\u6311\u6218\u6a21\u5f0f",
        "zh-hant": "\u6311\u6230\u6a21\u5f0f",
        en: "Challenge Mode",
        ru: "\u041c\u043e\u0434\u0435\u043b\u044c \u0432\u044b\u0437\u043e\u0432\u0430",
        ar: "\u0648\u0636\u0639 \u0627\u0644\u062a\u062d\u062f\u064a",
        ja: "\u30c1\u30e3\u30ec\u30f3\u30b8\u30e2\u30fc\u30c9"
      },
      exitgame: {
        name: "exitgame",
        "zh-hans": "\u9000\u51fa\u6e38\u620f",
        "zh-hant": "\u9000\u51fa\u904a\u6232",
        en: "Exit the game",
        ru: "\u0412\u044b\u0439\u0442\u0438 \u0438\u0437 \u0438\u0433\u0440\u044b",
        ar: "\u0627\u0644\u062e\u0631\u0648\u062c \u0645\u0646 \u0627\u0644\u0644\u0639\u0628\u0629",
        ja: "\u30b2\u30fc\u30e0\u3092\u7d42\u4e86\u3059\u308b"
      },
      exit: {
        name: "exit",
        "zh-hans": "\u9000\u51fa",
        "zh-hant": "\u9000\u51fa",
        en: "Exit",
        ru: "\u0412\u044b\u0445\u043e\u0434",
        ar: "\u0633\u062d\u0628",
        ja: "\u7d42\u4e86"
      },
      chongwan: {
        name: "chongwan",
        "zh-hans": "\u91cd\u73a9",
        "zh-hant": "\u91cd\u73a9",
        en: "Play again",
        ru: "\u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u044c \u0438\u0433\u0440\u0443",
        ar: "\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0644\u0639\u0628",
        ja: "\u904a\u3073\u76f4\u3059"
      },
      meirirenwu: {
        name: "meirirenwu",
        "zh-hans": "\u6bcf\u65e5\u4efb\u52a1",
        "zh-hant": "\u6bcf\u65e5\u4efb\u52d9",
        en: "Daily tasks",
        ru: "\u0437\u0430\u0434\u0430\u043d\u0438\u044f",
        ar: "\u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u064a\u0648\u0645\u064a\u0629",
        ja: "\u30bf\u30b9\u30af"
      },
      mubiaorenwu: {
        name: "mubiaorenwu",
        "zh-hans": "\u76ee\u6807\u4efb\u52a1",
        "zh-hant": "\u76ee\u6a19\u4efb\u52d9",
        en: "Target task",
        ru: "\u0417\u0430\u0434\u0430\u0447\u0438",
        ar: "\u0645\u0646 \u0627\u0644\u0645\u0647\u0645\u0629",
        ja: "\u30bf\u30fc\u30b2\u30c3"
      },
      libao: {
        name: "libao",
        "zh-hans": "\u793c\u5305",
        "zh-hant": "\u79ae\u5305",
        en: "Gift Pack",
        ru: "\u0421\u0443\u043c\u043a\u0430",
        ar: "\u0647\u062f\u064a\u0629",
        ja: "\u30d7\u30ec\u30bc\u30f3\u30c8"
      },
      yaoshi: {
        name: "yaoshi",
        "zh-hans": "\u94a5\u5319",
        "zh-hant": "\u9470\u5319",
        en: "Key",
        ru: "\u041a\u043b\u044e\u0447.",
        ar: "\u0645\u0641\u062a\u0627\u062d .",
        ja: "\u304b\u304e\u672c"
      },
      daibi: {
        name: "daibi",
        "zh-hans": "\u4ee3\u5e01",
        "zh-hant": "\u4ee3\u5e63",
        en: "Token",
        ru: "\u0422\u043e\u043a\u0435\u043d\u044b",
        ar: "\u0631\u0645\u0632 \u0627\u0644\u0639\u0645\u0644\u0629",
        ja: "\u30c8\u30fc\u30af\u30f3"
      },
      pifu: {
        name: "pifu",
        "zh-hans": "\u76ae\u80a4",
        "zh-hant": "\u76ae\u819a",
        en: "Skin",
        ru: "\u041a\u043e\u0436\u0430",
        ar: "\u0627\u0644\u062c\u0644\u062f .",
        ja: "\u30b9\u30ad\u30f3"
      },
      huasuanlibao: {
        name: "huasuanlibao",
        "zh-hans": "\u5212\u7b97\u793c\u5305",
        "zh-hant": "\u5212\u7b97\u79ae\u5305",
        en: "Cost effective gift package",
        ru: "\u042d\u043a\u043e\u043d\u043e\u043c\u0438\u044f \u0441\u0443\u043c\u043e\u043a",
        ar: "\u0635\u0641\u0642\u0629",
        ja: "\u304a\u5f97\u306a\u30ae\u30d5\u30c8\u30d0\u30c3\u30b0"
      },
      chaojilibao: {
        name: "chaojilibao",
        "zh-hans": "\u8d85\u7ea7\u793c\u5305",
        "zh-hant": "\u8d85\u7d1a\u79ae\u5305",
        en: "Super Gift Pack",
        ru: "\u0421\u0443\u043f\u0435\u0440\u0441\u0443\u043c\u043a\u0430",
        ar: "\u0633\u0648\u0628\u0631 \u062d\u0642\u064a\u0628\u0629",
        ja: "\u30b9\u30fc\u30d1\u30fc\u30ae\u30d5\u30c8"
      },
      pifulibao: {
        name: "pifulibao",
        "zh-hans": "\u76ae\u80a4\u793c\u5305",
        "zh-hant": "\u76ae\u819a\u79ae\u5305",
        en: "Skin Gift Pack",
        ru: "\u041a\u043e\u0436\u043d\u044b\u0435 \u0441\u0443\u043c\u043a\u0438",
        ar: "\u062d\u0642\u064a\u0628\u0629 \u062c\u0644\u062f\u064a\u0629",
        ja: "\u30b9\u30ad\u30f3\u30dd\u30fc\u30c1"
      },
      jingqingqidai: {
        name: "jingqingqidai",
        "zh-hans": "\u656c\u8bf7\u671f\u5f85",
        "zh-hant": "\u656c\u8acb\u671f\u5f85",
        en: "Coming soon",
        ru: "\u0421 \u043d\u0435\u0442\u0435\u0440\u043f\u0435\u043d\u0438\u0435\u043c \u0436\u0434\u0443",
        ar: "\u064a\u0631\u062c\u0649 \u0646\u062a\u0637\u0644\u0639 \u0625\u0644\u0649",
        ja: "\u304a\u697d\u3057\u307f\u306b"
      },
      chakanxinwen: {
        name: "chakanxinwen",
        "zh-hans": "\u67e5\u770b\u5b98\u65b9\u65b0\u95fb",
        "zh-hant": "\u67e5\u770b\u5b98\u65b9\u65b0\u805e",
        en: "View official news",
        ru: "\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u043e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0435 \u043d\u043e\u0432\u043e\u0441\u0442\u0438",
        ar: "\u0639\u0631\u0636 \u0627\u0644\u0623\u062e\u0628\u0627\u0631 \u0627\u0644\u0631\u0633\u0645\u064a\u0629",
        ja: "\u516c\u5f0f\u30cb\u30e5\u30fc\u30b9\u3092\u898b\u308b"
      },
      jiarupindao: {
        name: "jiarupindao",
        "zh-hans": "\u52a0\u5165\u5b98\u65b9\u9891\u9053",
        "zh-hant": "\u52a0\u5165\u5b98\u65b9\u983b\u9053",
        en: "Join the official channel",
        ru: "\u043e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u043c\u0443 \u043a\u0430\u043d\u0430\u043b\u0443",
        ar: "\u0627\u0644\u0627\u0646\u0636\u0645\u0627\u0645 \u0625\u0644\u0649 \u0627\u0644\u0642\u0646\u0627\u0629 \u0627\u0644\u0631\u0633\u0645\u064a\u0629",
        ja: "\u516c\u5f0f\u30c1\u30e3\u30f3\u30cd\u30eb\u306b\u53c2\u52a0\u3059\u308b"
      },
      guanzhutuite: {
        name: "guanzhutuite",
        "zh-hans": "\u5173\u6ce8\u5b98\u65b9\u63a8\u7279",
        "zh-hant": "\u95dc\u6ce8\u5b98\u65b9\u63a8\u7279",
        en: "Follow the official Twitter account",
        ru: "\u0421\u043b\u0435\u0434\u0438\u0442\u0435 \u0437\u0430 \u043e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u043c \u0422\u0432\u0438\u0442\u0442\u0435\u0440\u043e\u043c",
        ar: "\u062a\u0648\u064a\u062a\u0631 \u0627\u0644\u0631\u0633\u0645\u064a",
        ja: "\u516c\u5f0f\u30c4\u30a4\u30c3\u30bf\u30fc\u3092\u30d5\u30a9\u30ed\u30fc"
      },
      guankayouxi: {
        name: "guankayouxi",
        "zh-hans": "\u89c2\u770bTON\u7684\u6e38\u620f",
        "zh-hant": "\u89c0\u770bTON\u7684\u904a\u6232",
        en: "Watch TON's games",
        ru: "\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0438\u0433\u0440\u0443 TON",
        ar: "\u0645\u0634\u0627\u0647\u062f\u0629 \u0644\u0639\u0628\u0629 \u062a\u0648\u0646",
        ja: "TON\u306e\u30b2\u30fc\u30e0\u3092\u898b\u308b"
      },
      tongguan10: {
        name: "tongguan10",
        "zh-hans": "\u901a\u517310\u6b21\u6e38\u620f\u5173\u5361",
        "zh-hant": "\u901a\u95dc10\u6b21\u904a\u6232\u95dc\u5361",
        en: "Complete 10 game levels",
        ru: "\u0421\u043a\u0430\u0447\u0430\u0442\u044c \u0438\u0433\u0440\u0443 10 \u0440\u0430\u0437",
        ar: "\u0644\u0639\u0628\u0629 10 \u0645\u0633\u062a\u0648\u064a\u0627\u062a \u0627\u0644\u062a\u062e\u0644\u064a\u0635 \u0627\u0644\u062c\u0645\u0631\u0643\u064a",
        ja: "\u30b2\u30fc\u30e0\u30b9\u30c6\u30fc\u30b8\u309210\u56de\u30af\u30ea\u30a2\u3059\u308b"
      },
      tongguan20: {
        name: "tongguan20",
        "zh-hans": "\u901a\u517320\u6b21\u6e38\u620f\u5173\u5361",
        "zh-hant": "\u901a\u95dc20\u6b21\u904a\u6232\u95dc\u5361",
        en: "Complete 20 game levels",
        ru: "\u041f\u0440\u043e\u0445\u043e\u0436\u0434\u0435\u043d\u0438\u0435 20 \u0438\u0433\u0440.",
        ar: "\u0625\u0632\u0627\u0644\u0629 20 \u0645\u0633\u062a\u0648\u064a\u0627\u062a \u0627\u0644\u0644\u0639\u0628\u0629",
        ja: "\u30b2\u30fc\u30e0\u30b9\u30c6\u30fc\u30b8\u309220\u56de\u30af\u30ea\u30a2\u3059\u308b"
      },
      leijitili100: {
        name: "leijitili100",
        "zh-hans": "\u7d2f\u8ba1\u4f7f\u7528100\u4f53\u529b",
        "zh-hant": "\u7d2f\u8a08\u4f7f\u7528100\u9ad4\u529b",
        en: "Accumulated use of 100 stamina",
        ru: "\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 100 \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043a\u0438\u0445 \u0441\u0438\u043b.",
        ar: "\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u0642\u0648\u0629 \u0627\u0644\u0645\u062a\u0631\u0627\u0643\u0645\u0629 100",
        ja: "\u7d2f\u8a08100\u4f53\u529b\u4f7f\u7528"
      },
      leijitili200: {
        name: "leijitili200",
        "zh-hans": "\u7d2f\u8ba1\u4f7f\u7528200\u4f53\u529b",
        "zh-hant": "\u7d2f\u8a08\u4f7f\u7528200\u9ad4\u529b",
        en: "Accumulated use of 200 stamina",
        ru: "\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 200 \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043a\u0438\u0445 \u0441\u0438\u043b.",
        ar: "\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u0642\u0648\u0629 \u0627\u0644\u0628\u062f\u0646\u064a\u0629 \u0627\u0644\u0645\u062a\u0631\u0627\u0643\u0645\u0629 200",
        ja: "\u7d2f\u8a08200\u4f53\u529b\u4f7f\u7528"
      },
      leijiyichu20: {
        name: "leijiyichu20",
        "zh-hans": "\u7d2f\u8ba1\u4f7f\u752820\u6b21\u79fb\u9664\u9053\u5177",
        "zh-hant": "\u7d2f\u8a08\u4f7f\u752820\u6b21\u79fb\u9664\u9053\u5177",
        en: "use 20 times to remove props",
        ru: "\u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u043e 20 \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u0439.",
        ar: "\u0627\u0633\u062a\u062e\u062f\u0627\u0645 20 \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u062f\u0639\u0627\u0626\u0645",
        ja: "\u524a\u9664\u30a2\u30a4\u30c6\u30e0\u3092\u7d2f\u8a0820\u56de\u4f7f\u7528"
      },
      fenxiangtips: {
        name: "fenxiangtips",
        "zh-hans": "\u5206\u4eab\u9080\u8bf7\u670b\u53cb\u5171\u4eab\u94fe\u63a5\u5e76\u83b7\u5f97\u5956\u52b1",
        "zh-hant": "\u5206\u4eab\u9080\u8acb\u670b\u53cb\u5171\u7528\u9023\u7d50\u4e26\u7372\u5f97\u734e\u52f5",
        en: "Share Inviting Friends and Get Rewards",
        ru: "\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f \u0438 \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u043d\u0430\u0433\u0440\u0430\u0434\u0443",
        ar: "\u062d\u0635\u0629 \u0648\u0627\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0645\u0643\u0627\u0641\u0623\u0629",
        ja: "\u5171\u6709\u3057\u3066\u5831\u916c\u3092\u5f97\u308b"
      },
      leijiyaoqing: {
        name: "leijiyaoqing",
        "zh-hans": "\u7d2f\u8ba1\u9080\u8bf7",
        "zh-hant": "\u7d2f\u8a08\u9080\u8acb",
        en: "Accumulated invitations",
        ru: "\u0421\u043e\u0432\u043e\u043a\u0443\u043f\u043d\u044b\u0435 \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u044f",
        ar: "\u062f\u0639\u0648\u0629 \u062a\u0631\u0627\u0643\u0645\u064a\u0629",
        ja: "\u7d2f\u8a08\u62db\u5f85"
      },
      shouyaozhemingdan: {
        name: "shouyaozhemingdan",
        "zh-hans": "\u53d7\u9080\u8005\u540d\u5355",
        "zh-hant": "\u53d7\u9080\u8005\u540d\u55ae",
        en: "List",
        ru: "\u0421\u043f\u0438\u0441\u043e\u043a",
        ar: "\u0627\u0644\u0645\u062f\u0639\u0648\u064a\u0646",
        ja: "\u30ea\u30b9\u30c8"
      },
      chakanquanbu: {
        name: "chakanquanbu",
        "zh-hans": "\u67e5\u770b\u5168\u90e8",
        "zh-hant": "\u67e5\u770b\u5168\u90e8",
        en: "ALL",
        ru: "\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0432\u0441\u0435",
        ar: "\u0639\u0631\u0636 \u062c\u0645\u064a\u0639",
        ja: "\u3059\u3079\u3066\u8868\u793a"
      },
      lijiyaoqing: {
        name: "lijiyaoqing",
        "zh-hans": "\u7acb\u5373\u9080\u8bf7",
        "zh-hant": "\u7acb\u5373\u9080\u8acb",
        en: "Invite Now",
        ru: "\u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435",
        ar: "\u062f\u0639\u0648\u0629 \u0641\u0648\u0631\u064a\u0629",
        ja: "\u3050\u62db\u5f85"
      },
      kelingqv: {
        name: "kelingqv",
        "zh-hans": "\u53ef\u9886\u53d6",
        "zh-hant": "\u53ef\u9818\u53d6",
        en: "Claim",
        ru: "\u041c\u043e\u0436\u043d\u043e \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c",
        ar: "\u0627\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649",
        ja: "\u53d7\u9818\u53ef"
      },
      yilingqv: {
        name: "yilingqv",
        "zh-hans": "\u5df2\u9886\u53d6",
        "zh-hant": "\u5df2\u9818\u53d6",
        en: "Claimed",
        ru: "\u041f\u043e\u043b\u0443\u0447\u0435\u043d\u043e",
        ar: "\u062a\u0644\u0642\u0649",
        ja: "\u53d7\u9818\u6e08"
      },
      zanwugengduo: {
        name: "zanwugengduo",
        "zh-hans": "\u6682\u65e0\u66f4\u591a",
        "zh-hant": "\u66ab\u7121\u66f4\u591a",
        en: "No more",
        ru: "\u0411\u043e\u043b\u044c\u0448\u0435 \u043d\u0435\u0442",
        ar: "\u0644\u0627 \u0623\u0643\u062b\u0631",
        ja: "\u305b\u3093"
      },
      yinyue: {
        name: "yinyue",
        "zh-hans": "\u97f3\u4e50",
        "zh-hant": "\u97f3\u6a02",
        en: "Music",
        ru: "\u041c\u0443\u0437\u044b\u043a\u0430",
        ar: "\u0645\u0648\u0633\u064a\u0642\u064a .",
        ja: "\u97f3\u697d"
      },
      yinxiao: {
        name: "yinxiao",
        "zh-hans": "\u97f3\u6548",
        "zh-hant": "\u97f3\u6548",
        en: "Effects",
        ru: "\u0444\u0444\u0435\u043a\u0442\u044b",
        ar: "\u0627\u0644\u0645\u0624\u062b\u0631",
        ja: "\u30a7\u30af\u30c8"
      },
      youxishezhi: {
        name: "youxishezhi",
        "zh-hans": "\u6e38\u620f\u8bbe\u7f6e",
        "zh-hant": "\u904a\u6232\u8a2d\u5b9a",
        en: "GAME SETTINGS",
        ru: "\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0438\u0433\u0440\u044b",
        ar: "\u0625\u0639\u062f\u0627\u062f\u0627\u062a \u0627\u0644\u0644\u0639\u0628\u0629",
        ja: "\u8a2d\u5b9a"
      },
      yuyanqiehuan: {
        name: "yuyanqiehuan",
        "zh-hans": "\u8bed\u8a00\u5207\u6362",
        "zh-hant": "\u8a9e\u8a00\u5207\u63db",
        en: "Switching",
        ru: "\u044f\u0437\u044b\u043a\u0430",
        ar: "\u0644\u063a\u0629 \u0627\u0644\u062a\u0628\u062f\u064a\u0644",
        ja: "\u8a00\u8a9e\u5207\u308a"
      },
      CH_J: {
        name: "CH_J",
        "zh-hans": "\u4e2d\u6587\u7b80\u4f53",
        "zh-hant": "\u4e2d\u6587\u7b80\u4f53",
        en: "\u4e2d\u6587\u7b80\u4f53",
        ru: "\u4e2d\u6587\u7b80\u4f53",
        ar: "\u4e2d\u6587\u7b80\u4f53",
        ja: "\u4e2d\u6587\u7b80\u4f53"
      },
      CH_F: {
        name: "CH_F",
        "zh-hans": "\u4e2d\u6587\u7e41\u4f53",
        "zh-hant": "\u4e2d\u6587\u7e41\u4f53",
        en: "\u4e2d\u6587\u7e41\u4f53",
        ru: "\u4e2d\u6587\u7e41\u4f53",
        ar: "\u4e2d\u6587\u7e41\u4f53",
        ja: "\u4e2d\u6587\u7e41\u4f53"
      },
      EN: {
        name: "EN",
        "zh-hans": "\u82f1\u8bed",
        "zh-hant": "English",
        en: "English",
        ru: "English",
        ar: "English",
        ja: "English"
      },
      fenxiang: {
        name: "fenxiang",
        "zh-hans": "\u5206\u4eab",
        "zh-hant": "\u5206\u4eab",
        en: "Share",
        ru: "\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f",
        ar: "\u0634\u0627\u0631\u0643",
        ja: "\u5206\u304b\u3061"
      },
      xiayiguan: {
        name: "xiayiguan",
        "zh-hans": "\u4e0b\u4e00\u5173",
        "zh-hant": "\u4e0b\u4e00\u95dc",
        en: "Next level",
        ru: "\u0421\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0439 \u0443\u0440\u043e\u0432\u0435\u043d\u044c",
        ar: "\u0627\u0644\u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u062a\u0627\u0644\u064a",
        ja: "\u6b21\u306e\u95a2\u9580"
      },
      zaiwanyici: {
        name: "zaiwanyici",
        "zh-hans": "\u518d\u73a9\u4e00\u6b21",
        "zh-hant": "\u518d\u73a9\u4e00\u6b21",
        en: "Play again",
        ru: "\u0415\u0449\u0435 \u0440\u0430\u0437.",
        ar: "\u0627\u0644\u0644\u0639\u0628 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649",
        ja: "\u3082\u3046\u4e00\u5ea6\u904a\u3093\u3067"
      },
      RU: {
        name: "RU",
        "zh-hans": "\u0420\u0443\u0441\u0441\u043a\u0438\u0439 \u044f\u0437\u044b\u043a",
        "zh-hant": "\u0420\u0443\u0441\u0441\u043a\u0438\u0439 \u044f\u0437\u044b\u043a",
        en: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439 \u044f\u0437\u044b\u043a",
        ru: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439 \u044f\u0437\u044b\u043a",
        ar: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439 \u044f\u0437\u044b\u043a",
        ja: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439 \u044f\u0437\u044b\u043a"
      },
      AR: {
        name: "AR",
        "zh-hans": "\u0628\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
        "zh-hant": "\u0628\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
        en: "\u0628\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
        ru: "\u0628\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
        ar: "\u0628\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
        ja: "\u0628\u0627\u0644\u0639\u0631\u0628\u064a\u0629"
      },
      JA: {
        name: "JA",
        "zh-hans": "\u65e5\u672c\u8a9e",
        "zh-hant": "\u65e5\u672c\u8a9e",
        en: "\u65e5\u672c\u8a9e",
        ru: "\u65e5\u672c\u8a9e",
        ar: "\u65e5\u672c\u8a9e",
        ja: "\u65e5\u672c\u8a9e"
      },
      chongzhichenggong: {
        name: "chongzhichenggong",
        "zh-hans": "\u5145\u503c\u6210\u529f",
        "zh-hant": "\u5145\u503c\u6210\u529f",
        en: "Recharge successful",
        ru: "\u0423\u0441\u043f\u0435\u0448\u043d\u043e\u0435 \u043f\u043e\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435",
        ar: "\u0634\u062d\u0646 \u0646\u0627\u062c\u062d\u0629",
        ja: "\u30c1\u30e3\u30fc\u30b8\u6210\u529f"
      },
      weiwancheng: {
        name: "weiwancheng",
        "zh-hans": "\u672a\u5b8c\u6210",
        "zh-hant": "\u672a\u5b8c\u6210",
        en: "Incomplete",
        ru: "\u041d\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u043e",
        ar: "\u063a\u064a\u0631 \u0645\u0643\u062a\u0645\u0644",
        ja: "\u672a\u5b8c\u4e86"
      },
      weijiesuo: {
        name: "weijiesuo",
        "zh-hans": "\u672a\u89e3\u9501",
        "zh-hant": "\u672a\u89e3\u9396",
        en: "Not unlocked",
        ru: "\u041d\u0435 \u0440\u0430\u0437\u0431\u043b\u043e\u043a\u0438\u0440\u043e\u0432\u0430\u043d\u043e",
        ar: "\u063a\u064a\u0631 \u0645\u0642\u0641\u0644\u0629",
        ja: "\u30ed\u30c3\u30af\u89e3\u9664\u3055\u308c\u3066\u3044\u307e\u305b\u3093"
      },
      round_finish: {
        name: "round_finish",
        "zh-hans": "\u901a\u8fc7\u7b2c{number}\u5173",
        "zh-hant": "\u901a\u904e\u7b2c{number}\u95dc",
        en: "Pass the {number} level",
        ru: "\u041f\u0440\u043e\u0445\u043e\u0436\u0434\u0435\u043d\u0438\u0435 {number}",
        ar: "\u0645\u0646 \u062e\u0644\u0627\u0644 \u0627\u0644\u0645\u0627\u062f\u0629 {number}",
        ja: "{number}\u306e\u30aa\u30d5\u3092\u901a\u904e\u3059\u308b"
      },
      round_rate_star: {
        name: "round_rate_star",
        "zh-hans": "\u7d2f\u8ba1\u83b7\u5f97{number}\u661f",
        "zh-hant": "\u7d2f\u8a08\u7372\u5f97{number}\u661f",
        en: "Accumulated {number} stars",
        ru: "\u0421\u043e\u0432\u043e\u043a\u0443\u043f\u043d\u043e\u0435 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u0435 \u0437\u0432\u0435\u0437\u0434\u044b {number}",
        ar: "\u0627\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0646\u062c\u0648\u0645 {number}",
        ja: "\u661f\u3092\u7d2f\u8a08\u53d6\u5f97{number}"
      },
      hp_use: {
        name: "hp_use",
        "zh-hans": "\u7d2f\u8ba1\u6d88\u8017{number}\u4f53\u529b",
        "zh-hant": "\u7d2f\u8a08\u6d88\u8017{number}\u9ad4\u529b",
        en: "Accumulated consumption of {number} stamina",
        ru: "\u0421\u043e\u0432\u043e\u043a\u0443\u043f\u043d\u044b\u0435 \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u043d\u0430\u0433\u0440\u0443\u0437\u043a\u0438 {number}",
        ar: "\u0627\u0633\u062a\u0647\u0644\u0627\u0643 \u0627\u0644\u0637\u0627\u0642\u0629 \u0627\u0644\u0645\u062a\u0631\u0627\u0643\u0645\u0629 {number}",
        ja: "\u7d2f\u7a4d\u6d88\u8cbb{number}\u4f53\u529b"
      },
      goods_buy: {
        name: "goods_buy",
        "zh-hans": "\u5b8c\u6210\u9996\u6b21\u8d2d\u4e70",
        "zh-hant": "\u5b8c\u6210\u9996\u6b21\u8cfc\u8cb7",
        en: "Complete the first purchase",
        ru: "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u0438\u0435 \u043f\u0435\u0440\u0432\u043e\u0439 \u043f\u043e\u043a\u0443\u043f\u043a\u0438",
        ar: "\u0627\u0644\u0627\u0646\u062a\u0647\u0627\u0621 \u0645\u0646 \u0627\u0644\u0634\u0631\u0627\u0621 \u0627\u0644\u0623\u0648\u0644",
        ja: "\u521d\u56de\u8cfc\u5165\u5b8c\u4e86"
      },
      tg_rss: {
        name: "tg_rss",
        "zh-hans": "TG\u9891\u9053\u8ba2\u9605",
        "zh-hant": "TG\u983b\u9053\u8a02\u95b1",
        en: "TG channel subscription",
        ru: "\u041f\u043e\u0434\u043f\u0438\u0441\u043a\u0430 \u043d\u0430 TG - \u043a\u0430\u043d\u0430\u043b",
        ar: "TG \u0642\u0646\u0627\u0629 \u0627\u0644\u0627\u0634\u062a\u0631\u0627\u0643",
        ja: "TG\u30c1\u30e3\u30cd\u30eb\u8cfc\u8aad"
      },
      tw_follow: {
        name: "tw_follow",
        "zh-hans": "TW\u5173\u6ce8",
        "zh-hant": "TW\u95dc\u6ce8",
        en: "TW Follow",
        ru: "TW \u0412\u043d\u0438\u043c\u0430\u043d\u0438\u0435",
        ar: "\u0637\u0648\u0645\u0627\u0633 \u0641\u064a\u0628\u0633 \u0627\u0644\u0642\u0644\u0642",
        ja: "TW\u30a6\u30a9\u30c3\u30c1"
      },
      open_bot: {
        name: "open_bot",
        "zh-hans": "\u6253\u5f00bot",
        "zh-hant": "\u6253\u958bbot",
        en: "Open bot",
        ru: "\u041e\u0442\u043a\u0440\u043e\u0439\u0442\u0435 \u0431\u043e\u0442.",
        ar: "\u0641\u062a\u062d \u0628\u0648\u062a",
        ja: "bot\u3092\u958b\u304f"
      },
      tw_content_like: {
        name: "tw_content_like",
        "zh-hans": "\u63a8\u6587\u70b9\u8d5e\uff0c\u8f6c\u53d1",
        "zh-hant": "\u63a8\u6587\u9ede\u8d0a\uff0c\u8f49\u767c",
        en: "Like and forward tweets",
        ru: "\u0422\u0432\u0438\u0442\u0442\u0435\u0440 \u0445\u0432\u0430\u043b\u0438\u0442, \u043f\u0435\u0440\u0435\u0441\u044b\u043b\u0430\u0435\u0442",
        ar: "\u062a\u0648\u064a\u062a\u0631 \u062f\u0648\u062a \u062a\u0634\u0627\u0646 \u060c \u0625\u0644\u0649 \u0627\u0644\u0623\u0645\u0627\u0645",
        ja: "\u30c4\u30a4\u30c3\u30bf\u30fc\u3067\u3044\u3044\u306d\u3001\u8ee2\u9001"
      },
      hp_use_daily: {
        name: "hp_use_daily",
        "zh-hans": "\u6d88\u8017{number}\u4f53\u529b",
        "zh-hant": "\u6d88\u8017{number}\u9ad4\u529b",
        en: "Consume {number} stamina",
        ru: "\u041f\u043e\u0442\u0440\u0435\u0431\u043b\u0435\u043d\u0438\u0435 \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043a\u043e\u0439 \u0441\u0438\u043b\u044b {number}",
        ar: "\u0627\u0633\u062a\u0647\u0644\u0627\u0643 \u0627\u0644\u0637\u0627\u0642\u0629 {number}",
        ja: "\u4f53\u529b\u3092\u6d88\u8017\u3059\u308b"
      },
      move_car_daily: {
        name: "move_car_daily",
        "zh-hans": "\u632a\u8d70{number}\u8f86\u8f66",
        "zh-hant": "\u632a\u8d70{number}\u8f1b\u8eca",
        en: "Move {number} cars away",
        ru: "\u041f\u0435\u0440\u0435\u043d\u043e\u0441 {number} \u0430\u0432\u0442\u043e\u0442\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442\u043d\u044b\u0445 \u0441\u0440\u0435\u0434\u0441\u0442\u0432",
        ar: "\u062a\u062d\u0631\u0643 \u0627\u0644\u0633\u064a\u0627\u0631\u0629",
        ja: "\u8eca\u3092\u79fb\u52d5\u3057\u3066"
      },
      game_click: {
        name: "game_click",
        "zh-hans": "\u4ed3\u9f20\u6e38\u620f\u8df3\u8f6c",
        "zh-hant": "\u5009\u9f20\u904a\u6232\u8df3\u8f49",
        en: "Hamster Game Jump",
        ru: "\u0421\u043a\u0430\u0447\u0430\u0442\u044c \u0438\u0433\u0440\u0443 \u0425\u043e\u043c\u044f\u043a",
        ar: "\u0644\u0639\u0628\u0629 \u0627\u0644\u0642\u0641\u0632 \u0627\u0644\u0647\u0627\u0645\u0633\u062a\u0631",
        ja: "\u30cf\u30e0\u30b9\u30bf\u30fc\u30b2\u30fc\u30e0\u30b8\u30e3\u30f3\u30d7"
      },
      daily_sign: {
        name: "daily_sign",
        "zh-hans": "\u4e03\u65e5\u7b7e\u5230",
        "zh-hant": "\u4e03\u65e5\u7c3d\u5230",
        en: "Seven day check-in",
        ru: "7 \u0434\u0435\u043d\u044c \u041f\u043e\u0434\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f",
        ar: "\u0633\u0628\u0639\u0629 \u0623\u064a\u0627\u0645",
        ja: "7\u65e5\u306b\u5230\u7740\u3059\u308b"
      },
      yaoqingrenshu: {
        name: "yaoqingrenshu",
        "zh-hans": "{number}\u4eba",
        "zh-hant": "{number}\u4eba",
        en: "{number} People",
        ru: "{number} \u0427\u0435\u043b\u043e\u0432\u0435\u043a",
        ar: "{number}\u0631\u062c\u0644 ",
        ja: "{number}\u4eba"
      },
      toast1: {
        name: "toast1",
        "zh-hans": "\u80fd\u91cf\u5df2\u7528\u5b8c,\xa0\u8bf7\u5148\u8865\u5145\u80fd\u91cf",
        "zh-hant": "\u80fd\u91cf\u5df2\u7528\u5b8c\uff0c\u8acb\u5148\u88dc\u5145\u80fd\u91cf",
        en: "The energy has been used up, please replenish it first",
        ru: "\u042d\u043d\u0435\u0440\u0433\u0438\u044f \u0438\u0441\u0447\u0435\u0440\u043f\u0430\u043d\u0430, \u0441\u043d\u0430\u0447\u0430\u043b\u0430 \u0434\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u044d\u043d\u0435\u0440\u0433\u0438\u044e.",
        ar: "\u0627\u0644\u0637\u0627\u0642\u0629 \u0642\u062f \u0646\u0641\u062f \u060c \u064a\u0631\u062c\u0649 \u062a\u062c\u062f\u064a\u062f \u0627\u0644\u0637\u0627\u0642\u0629",
        ja: "\u30a8\u30cd\u30eb\u30ae\u30fc\u304c\u5207\u308c\u307e\u3057\u305f\u306e\u3067\u3001\u307e\u305a\u30a8\u30cd\u30eb\u30ae\u30fc\u3092\u88dc\u5145\u3057\u3066\u304f\u3060\u3055\u3044"
      },
      toast2: {
        name: "toast2",
        "zh-hans": "\u8f66\u8f86\u5df2\u7ecf\u662f\u6700\u77ed\u72b6\u6001\uff01\uff01\uff01",
        "zh-hant": "\u8eca\u8f1b\u5df2\u7d93\u662f\u6700\u77ed\u72c0\u614b\uff01\uff01\uff01",
        en: "The vehicle is already in its shortest state!!!",
        ru: "\u0410\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044c \u043d\u0430\u0445\u043e\u0434\u0438\u0442\u0441\u044f \u0432 \u0441\u0430\u043c\u043e\u043c \u043a\u043e\u0440\u043e\u0442\u043a\u043e\u043c \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0438!!",
        ar: "\u0627\u0644\u0633\u064a\u0627\u0631\u0629 \u0647\u064a \u0628\u0627\u0644\u0641\u0639\u0644 \u0641\u064a \u062d\u0627\u0644\u0629 \u0627\u0644\u062d\u062f \u0627\u0644\u0623\u062f\u0646\u0649 !",
        ja: "\u8eca\u4e21\u306f\u3059\u3067\u306b\u6700\u77ed\u72b6\u614b!!!"
      },
      toast3: {
        name: "toast3",
        "zh-hans": "\u8f66\u8f86\u5df2\u7ecf\u5269\u4e0b\u6700\u540e\u4e00\u8f86\u4e86\uff01\uff01\uff01",
        "zh-hant": "\u8eca\u8f1b\u5df2\u7d93\u5269\u4e0b\u6700\u5f8c\u4e00\u8f1b\u4e86\uff01\uff01\uff01",
        en: "The last vehicle is left!!!",
        ru: "\u0410\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044c \u043e\u0441\u0442\u0430\u043b\u0441\u044f \u043f\u043e\u0441\u043b\u0435\u0434\u043d\u0438\u043c!",
        ar: "\u0622\u062e\u0631 \u0633\u064a\u0627\u0631\u0629 \u0627\u0644\u064a\u0633\u0627\u0631 !",
        ja: "\u8eca\u4e21\u306f\u3082\u3046\u6700\u5f8c\u306e1\u53f0\u304c\u6b8b\u3063\u3066\u3044\u307e\u3059!!!"
      },
      toast4: {
        name: "toast4",
        "zh-hans": "\u9891\u7e41\u64cd\u4f5c\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01",
        "zh-hant": "\u983b\u7e41\u64cd\u4f5c\uff0c\u8acb\u7a0d\u5f8c\u91cd\u8a66\uff01",
        en: "Frequent operation, please try again later!",
        ru: "\u0427\u0430\u0441\u0442\u044b\u0435 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438, \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u043e\u0437\u0436\u0435!",
        ar: "\u0639\u0645\u0644\u064a\u0629 \u0645\u062a\u0643\u0631\u0631\u0629 \u060c \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649 \u0641\u064a \u0648\u0642\u062a \u0644\u0627\u062d\u0642 !",
        ja: "\u983b\u7e41\u306b\u64cd\u4f5c\u3057\u307e\u3059\u306e\u3067\u3001\u5f8c\u3067\u518d\u8a66\u884c\u3057\u3066\u304f\u3060\u3055\u3044\uff01"
      },
      toast5: {
        name: "toast5",
        "zh-hans": "\u94a5\u5319\u4e0d\u591f",
        "zh-hant": "\u9470\u5319\u4e0d\u591f",
        en: "The keys are not enough",
        ru: "\u041a\u043b\u044e\u0447\u0435\u0439 \u043d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e.",
        ar: "\u0645\u0641\u062a\u0627\u062d \u0644\u0627 \u064a\u0643\u0641\u064a",
        ja: "\u9375\u304c\u8db3\u308a\u306a\u3044"
      },
      toast6: {
        name: "toast6",
        "zh-hans": "\u670d\u52a1\u5668\u8fde\u63a5\u5df2\u65ad\u5f00\uff0c\u6b63\u5728\u91cd\u8fde...",
        "zh-hant": "\u670d\u52d9\u5668\u9023\u63a5\u5df2\u65b7\u958b\uff0c\u6b63\u5728\u91cd\u9023\u2026",
        en: "The server connection has been disconnected, reconnecting",
        ru: "\u041f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 \u043a \u0441\u0435\u0440\u0432\u0435\u0440\u0443 \u043e\u0442\u043a\u043b\u044e\u0447\u0435\u043d\u043e, \u043e\u043d\u043e \u043f\u0435\u0440\u0435\u0437\u0430\u043a\u043b\u044e\u0447\u0430\u0435\u0442\u0441\u044f...",
        ar: "\u0627\u0644\u062e\u0627\u062f\u0645 \u0647\u0648 \u0642\u0637\u0639 \u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0648 \u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0627\u062a\u0635\u0627\u0644 .",
        ja: "\u30b5\u30fc\u30d0\u63a5\u7d9a\u304c\u5207\u65ad\u3055\u308c\u3001\u518d\u63a5\u7d9a\u4e2d..."
      },
      toast7: {
        name: "toast7",
        "zh-hans": "\u8d2d\u4e70\u6210\u529f",
        "zh-hant": "\u8cfc\u8cb7\u6210\u529f",
        en: "Purchase successful",
        ru: "\u041f\u043e\u043a\u0443\u043f\u043a\u0430 \u0443\u0441\u043f\u0435\u0448\u043d\u043e",
        ar: "\u0634\u0631\u0627\u0621 \u0646\u0627\u062c\u062d\u0629",
        ja: "\u8cfc\u5165\u306b\u6210\u529f\u3057\u307e\u3057\u305f"
      },
      toast8: {
        name: "toast8",
        "zh-hans": "\u670d\u52a1\u5668\u8fde\u63a5\u6210\u529f",
        "zh-hant": "\u670d\u52d9\u5668\u9023\u63a5\u6210\u529f",
        en: "Server connection successful",
        ru: "\u0421\u0435\u0440\u0432\u0435\u0440 \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d",
        ar: "\u0627\u062a\u0635\u0627\u0644 \u0627\u0644\u0645\u0644\u0642\u0645 \u0628\u0646\u062c\u0627\u062d",
        ja: "\u30b5\u30fc\u30d0\u63a5\u7d9a\u306b\u6210\u529f\u3057\u307e\u3057\u305f"
      },
      levelnum: {
        name: "levelnum",
        "zh-hans": "\u7b2c{number}\u5173",
        "zh-hant": "\u7b2c{number}\u95dc",
        en: "Level {number}",
        ru: "\u0417\u0430\u043a\u0440\u044b\u0442\u0438\u0435 {number}",
        ar: "\u0627\u0644\u0645\u0627\u062f\u0629 { number}",
        ja: "\u7b2c{number}\u30aa\u30d5"
      },
      tehui: {
        name: "tehui",
        "zh-hans": "\u7279\u60e0",
        "zh-hant": "\u7279\u60e0",
        en: "Deal",
        ru: "\u041b\u044c\u0433\u043e\u0442\u044b",
        ar: "\u062a\u0641\u0636\u0644",
        ja: "\u7279\u6075"
      },
      daoju: {
        name: "daoju",
        "zh-hans": "\u9053\u5177",
        "zh-hant": "\u9053\u5177",
        en: "Prop",
        ru: "\u0420\u0435\u043a\u0432\u0438\u0437\u0438\u0442\u044b",
        ar: "\u0633\u0646\u062f",
        ja: "\u9053\u5177"
      },
      suoduantip: {
        name: "suoduantip",
        "zh-hans": "\u7f29\u77ed\uff1a\u8bf7\u9009\u62e9\u4f60\u60f3\u7f29\u77ed\u7684\u8f66\u8f86",
        "zh-hant": "\u7e2e\u77ed\uff1a\u8acb\u9078\u64c7\u4f60\u60f3\u7e2e\u77ed\u7684\u8eca\u8f1b",
        en: "Shorten: Please select the vehicle you want to shorten",
        ru: "\u0421\u043e\u043a\u0440\u0430\u0449\u0435\u043d\u0438\u0435: \u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044c, \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0432\u044b \u0445\u043e\u0442\u0438\u0442\u0435 \u0441\u043e\u043a\u0440\u0430\u0442\u0438\u0442\u044c",
        ar: "\u0627\u0644\u0627\u062e\u062a\u0635\u0627\u0631 : \u0627\u0644\u0631\u062c\u0627\u0621 \u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u0633\u064a\u0627\u0631\u0629 \u0627\u0644\u062a\u064a \u062a\u0631\u064a\u062f \u0627\u062e\u062a\u0635\u0627\u0631\u0647\u0627",
        ja: "\u77ed\u7e2e\uff1a\u77ed\u7e2e\u3057\u305f\u3044\u8eca\u4e21\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044"
      },
      toumingtip: {
        name: "toumingtip",
        "zh-hans": "\u900f\u660e\uff1a\u8bf7\u9009\u62e9\u4f60\u60f3\u900f\u660e\u7684\u8f66\u8f86",
        "zh-hant": "\u900f\u660e\uff1a\u8acb\u9078\u64c7\u4f60\u60f3\u900f\u660e\u7684\u8eca\u8f1b",
        en: "Transparent: Please select the vehicle you want to be transparent with",
        ru: "\u041f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u043e\u0441\u0442\u044c: \u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044c, \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0432\u044b \u0445\u043e\u0442\u0438\u0442\u0435 \u0441\u0434\u0435\u043b\u0430\u0442\u044c \u043f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u044b\u043c",
        ar: "\u0627\u0644\u0634\u0641\u0627\u0641\u064a\u0629 : \u0627\u0644\u0631\u062c\u0627\u0621 \u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u0633\u064a\u0627\u0631\u0629 \u0627\u0644\u062a\u064a \u062a\u0631\u064a\u062f \u0627\u0644\u0634\u0641\u0627\u0641\u064a\u0629",
        ja: "\u900f\u660e\uff1a\u900f\u660e\u306b\u3057\u305f\u3044\u8eca\u4e21\u3092\u9078\u3093\u3067\u304f\u3060\u3055\u3044"
      },
      yichutip: {
        name: "yichutip",
        "zh-hans": "\u79fb\u9664\uff1a\u8bf7\u9009\u62e9\u4f60\u60f3\u79fb\u9664\u7684\u8f66\u8f86",
        "zh-hant": "\u79fb\u9664\uff1a\u8acb\u9078\u64c7\u4f60\u60f3\u79fb\u9664\u7684\u8eca\u8f1b",
        en: "Remove: Please select the vehicle you want to remove",
        ru: "\u0423\u0434\u0430\u043b\u0435\u043d\u0438\u0435: \u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044c, \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0432\u044b \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c",
        ar: "\u0625\u0632\u0627\u0644\u0629 : \u0627\u0644\u0631\u062c\u0627\u0621 \u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u0633\u064a\u0627\u0631\u0629 \u0627\u0644\u062a\u064a \u062a\u0631\u064a\u062f \u0625\u0632\u0627\u0644\u062a\u0647\u0627",
        ja: "\u9664\u53bb\uff1a\u9664\u53bb\u3057\u305f\u3044\u8eca\u4e21\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044"
      },
      logsinonotherdevices: {
        name: "logsinonotherdevices",
        "zh-hans": "\u7528\u6237\u5728\u5176\u4ed6\u8bbe\u5907\u4e0a\u767b\u5f55",
        "zh-hant": "\u7528\u6236\u5728\u5176\u4ed6\u8a2d\u5099\u4e0a\u767b\u5165",
        en: "User logs in on other devices",
        ru: "\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u044e\u0442\u0441\u044f \u043d\u0430 \u0434\u0440\u0443\u0433\u0438\u0445 \u0443\u0441\u0442\u0440\u043e\u0439\u0441\u0442\u0432\u0430\u0445",
        ar: "\u062a\u0633\u062c\u064a\u0644 \u062f\u062e\u0648\u0644 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645 \u0639\u0644\u0649 \u062c\u0647\u0627\u0632 \u0622\u062e\u0631",
        ja: "\u30e6\u30fc\u30b6\u30fc\u304c\u4ed6\u306e\u30c7\u30d0\u30a4\u30b9\u306b\u30ed\u30b0\u30a4\u30f3\u3059\u308b"
      }
    };
    cc._RF.pop();
  }, {} ],
  LevelNodeItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2ad060+FzdNZJATAjb0g3bu", "LevelNodeItem");
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
    var GlobalVar_1 = require("../data/GlobalVar");
    var Index_1 = require("../Index");
    var Languages_1 = require("../Languages");
    var DataManager_1 = require("../manager/DataManager");
    var EventManager_1 = require("../manager/EventManager");
    var PoolManager_1 = require("../manager/PoolManager");
    var ScrollViewItemBase_1 = require("../manager/ScrollViewItemBase");
    var SpriteManager_1 = require("../manager/SpriteManager");
    var ToastManager_1 = require("../manager/ToastManager");
    var BaseItem_1 = require("./BaseItem");
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
        this.unLock = this.node.getChildByName("weijiesuo");
        this.sprite = this.node.getComponent(cc.Sprite);
        this.onTouch(this.node, this.onTouchClick, this);
      };
      LevelItemPuTong.prototype.setData = function(data) {
        this.nowData = data;
        this.levelLabel.string = data.round;
        if (this.nowData.round <= GlobalVar_1.GlobalVar.userInfo.round) {
          this.sprite.spriteFrame = SpriteManager_1.default.custemIcon[1];
          this.unLock.active = false;
        } else if (this.nowData.round == GlobalVar_1.GlobalVar.userInfo.round + 1) {
          this.sprite.spriteFrame = SpriteManager_1.default.custemIcon[0];
          this.unLock.active = false;
        } else {
          this.sprite.spriteFrame = SpriteManager_1.default.custemIcon[0];
          this.unLock.active = true;
        }
      };
      LevelItemPuTong.prototype.onTouchClick = function() {
        console.log(this.nowData);
        if (this.nowData.round > GlobalVar_1.GlobalVar.userInfo.round + 1) {
          ToastManager_1.default.instance.show(Languages_1.Languages["tips1"][DataManager_1.default.instance.language], {
            gravity: "TOP",
            bg_color: cc.color(226, 69, 109, 255)
          });
          return;
        }
        EventManager_1.default.instance.emit(EventManager_1.EventType.GOTO_LEVEL, Index_1.PanelType.Putong, this.nowData.round);
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
        this.unLock = this.node.getChildByName("weijiesuo");
        this.sprite = this.node.getComponent(cc.Sprite);
        this.onTouch(this.node, this.onTouchClick, this);
      };
      LevelItemTiaoZhan.prototype.setData = function(data) {
        this.nowData = data;
        this.levelLabel.string = data.round;
        if (this.nowData.round <= GlobalVar_1.GlobalVar.userInfo.special_round) {
          this.sprite.spriteFrame = SpriteManager_1.default.custemTZIcon[this.nowData.rate + 1];
          this.unLock.active = false;
        } else if (this.nowData.round == GlobalVar_1.GlobalVar.userInfo.special_round + 1) {
          this.sprite.spriteFrame = SpriteManager_1.default.custemTZIcon[1];
          this.unLock.active = false;
        } else {
          this.sprite.spriteFrame = SpriteManager_1.default.custemTZIcon[0];
          this.unLock.active = true;
        }
      };
      LevelItemTiaoZhan.prototype.onTouchClick = function() {
        console.log(this.nowData);
        if (this.nowData.round > GlobalVar_1.GlobalVar.userInfo.special_round + 1) {
          ToastManager_1.default.instance.show(Languages_1.Languages["tips1"][DataManager_1.default.instance.language], {
            gravity: "TOP",
            bg_color: cc.color(226, 69, 109, 255)
          });
          return;
        }
        EventManager_1.default.instance.emit(EventManager_1.EventType.GOTO_LEVEL, Index_1.PanelType.Tiaozhan, this.nowData.round);
      };
      return LevelItemTiaoZhan;
    }(BaseItem_1.default);
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LevelNodeItem = function(_super) {
      __extends(LevelNodeItem, _super);
      function LevelNodeItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.levelItemPuTong = null;
        _this.levelItemTiaoZhan = null;
        _this.nowType = null;
        _this.content = null;
        return _this;
      }
      LevelNodeItem.prototype.init = function(index) {
        this.levelItemPuTong = cc.find("levelItemPuTong", this.node);
        this.levelItemTiaoZhan = cc.find("levelItemTiaoZhan", this.node);
        this.content = cc.find("content", this.node);
      };
      LevelNodeItem.prototype.updateItem = function(tmplId, data) {
        _super.prototype.updateItem.call(this, tmplId, data);
        this.nowType != DataManager_1.default.instance.selectType && this.removeItem();
        this.nowType = DataManager_1.default.instance.selectType;
        DataManager_1.default.instance.selectType == Index_1.PanelType.Putong ? this.CreateListItem(this.content, this.levelItemPuTong, data, LevelItemPuTong) : this.CreateListItem(this.content, this.levelItemTiaoZhan, data, LevelItemTiaoZhan);
      };
      LevelNodeItem.prototype.removeItem = function() {
        var child = this.content.children;
        for (var i = child.length - 1; i >= 0; i--) PoolManager_1.default.instance.putNode(child[i]);
      };
      LevelNodeItem = __decorate([ ccclass ], LevelNodeItem);
      return LevelNodeItem;
    }(ScrollViewItemBase_1.default);
    exports.default = LevelNodeItem;
    cc._RF.pop();
  }, {
    "../Index": "Index",
    "../Languages": "Languages",
    "../data/GlobalVar": "GlobalVar",
    "../manager/DataManager": "DataManager",
    "../manager/EventManager": "EventManager",
    "../manager/PoolManager": "PoolManager",
    "../manager/ScrollViewItemBase": "ScrollViewItemBase",
    "../manager/SpriteManager": "SpriteManager",
    "../manager/ToastManager": "ToastManager",
    "./BaseItem": "BaseItem"
  } ],
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
    var EventName_1 = require("../data/EventName");
    var GlobalVar_1 = require("../data/GlobalVar");
    var Enum_1 = require("../Enum");
    var Index_1 = require("../Index");
    var DataManager_1 = require("../manager/DataManager");
    var EventManager_1 = require("../manager/EventManager");
    var LoopScrollView_1 = require("../manager/LoopScrollView");
    var PoolManager_1 = require("../manager/PoolManager");
    var SdkManager_1 = require("../manager/SdkManager");
    var SpriteManager_1 = require("../manager/SpriteManager");
    var HttpCom_1 = require("../net/HttpCom");
    var StaticInstance_1 = require("../StaticInstance");
    var BaseLanguageLayer_1 = require("./BaseLanguageLayer");
    var LevelNodeItem_1 = require("./LevelNodeItem");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LevelSelectLayer = function(_super) {
      __extends(LevelSelectLayer, _super);
      function LevelSelectLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.panel = null;
        _this.btnClose = null;
        _this.levelNodeItem = null;
        _this.content = null;
        _this.btnPuTong = null;
        _this.btnTiaoZhan = null;
        _this.labelPuTong = null;
        _this.labelTiaoZhan = null;
        _this.panelType = null;
        _this.mode = null;
        _this.data = null;
        _this.scorllView = null;
        return _this;
      }
      LevelSelectLayer.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.panel = cc.find("style/panel", this.node);
        this.btnClose = cc.find("close", this.panel);
        this.levelNodeItem = cc.find("levelNodeItem", this.node);
        this.mode = cc.find("moshi", this.panel).getComponent(cc.Sprite);
        this.btnPuTong = cc.find("moshi/btnputong", this.panel);
        this.btnTiaoZhan = cc.find("moshi/btntiaozhan", this.panel);
        this.labelPuTong = cc.find("moshi/label1", this.panel);
        this.labelTiaoZhan = cc.find("moshi/label2", this.panel);
        this.content = cc.find("ScrollView/view/content", this.panel);
        this.scorllView = cc.find("ScrollView", this.panel).getComponent(cc.ScrollView);
        this.scorllView.addComponent(LoopScrollView_1.default);
        this.scorllView.getComponent(LoopScrollView_1.default).init(this.levelNodeItem, "levelNodeItem", this.scorllView, 1, 0, LevelNodeItem_1.default);
        this.onTouch(this.btnClose, this.onCloseClick, this);
        this.onTouch(this.btnPuTong, this.onPuTongClick, this);
        this.onTouch(this.btnTiaoZhan, this.onTiaoZhanClick, this);
        EventManager_1.default.instance.on(EventManager_1.EventType.UPDATE_LEVEL_EVENT, this.updateLevelEvent, this);
        cc.game.on(EventName_1.GameEvent.ON_LEVEL_DATA_UPDATE, this.ON_LEVEL_DATA_UPDATE, this);
      };
      LevelSelectLayer.prototype.start = function() {
        HttpCom_1.HttpCom.map(function() {});
      };
      LevelSelectLayer.prototype.ON_LEVEL_DATA_UPDATE = function(res) {
        if (res.data) {
          this.data = res.data;
          DataManager_1.default.instance.levelData = res.data.round_map;
          GlobalVar_1.GlobalVar.userInfo.round = res.data.round;
          GlobalVar_1.GlobalVar.userInfo.special_round = res.data.special_round;
          this.initPanel();
        }
      };
      LevelSelectLayer.prototype.updateLevelEvent = function() {
        var _this = this;
        HttpCom_1.HttpCom.map(function(res) {
          console.log(res);
          if (res.data) {
            _this.data = res.data;
            DataManager_1.default.instance.levelData = res.data.round_map;
            GlobalVar_1.GlobalVar.userInfo.round = res.data.round;
            GlobalVar_1.GlobalVar.userInfo.special_round = res.data.special_round;
          }
        });
      };
      LevelSelectLayer.prototype.show = function() {
        _super.prototype.show.call(this);
      };
      LevelSelectLayer.prototype.initPanel = function() {
        if (null == this.panelType) {
          this.panelType = Index_1.PanelType.Putong;
          DataManager_1.default.instance.selectType = Index_1.PanelType.Putong;
        }
        if (this.panelType == Index_1.PanelType.Putong) {
          this.mode.spriteFrame = SpriteManager_1.default.ModelSprite[0];
          var arr = this.convertTo2DArray(DataManager_1.default.instance.levelData);
          this.scorllView.getComponent(LoopScrollView_1.default).setData(arr);
          var num = Math.floor(GlobalVar_1.GlobalVar.userInfo.round / 4);
          var pro = 1 - num / arr.length;
          this.scorllView.scrollTo(cc.v2(0, pro), .5);
          console.log(pro, "\u767e\u5206\u6bd4");
        } else {
          this.mode.spriteFrame = SpriteManager_1.default.ModelSprite[1];
          var arr = this.convertTo2DArray(DataManager_1.default.instance.levelData);
          this.scorllView.getComponent(LoopScrollView_1.default).setData(arr);
          var num = Math.floor(GlobalVar_1.GlobalVar.userInfo.special_round / 4);
          var pro = 1 - num / arr.length;
          this.scorllView.scrollTo(cc.v2(0, pro), .5);
          console.log(pro, "\u767e\u5206\u6bd4");
        }
      };
      LevelSelectLayer.prototype.onCloseClick = function() {
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LEVEL_SELECT, false);
      };
      LevelSelectLayer.prototype.onPuTongClick = function() {
        if (this.panelType == Index_1.PanelType.Putong) return;
        this.scorllView.stopAutoScroll();
        this.scorllView.scrollToTop();
        this.labelPuTong.active = true;
        this.labelTiaoZhan.active = false;
        this.panelType = Index_1.PanelType.Putong;
        DataManager_1.default.instance.selectType = Index_1.PanelType.Putong;
        this.initPanel();
      };
      LevelSelectLayer.prototype.onTiaoZhanClick = function() {
        if (this.panelType == Index_1.PanelType.Tiaozhan) return;
        this.scorllView.stopAutoScroll();
        this.scorllView.scrollToTop();
        this.labelPuTong.active = false;
        this.labelTiaoZhan.active = true;
        this.panelType = Index_1.PanelType.Tiaozhan;
        DataManager_1.default.instance.selectType = Index_1.PanelType.Tiaozhan;
        this.initPanel();
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
      LevelSelectLayer.prototype.convertTo2DArray = function(inputArray) {
        var result = [];
        for (var i = 0; i < inputArray.length; i += 4) {
          var chunk = inputArray.slice(i, i + 4);
          result.push(chunk);
        }
        return result;
      };
      LevelSelectLayer = __decorate([ ccclass ], LevelSelectLayer);
      return LevelSelectLayer;
    }(BaseLanguageLayer_1.default);
    exports.default = LevelSelectLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../Index": "Index",
    "../StaticInstance": "StaticInstance",
    "../data/EventName": "EventName",
    "../data/GlobalVar": "GlobalVar",
    "../manager/DataManager": "DataManager",
    "../manager/EventManager": "EventManager",
    "../manager/LoopScrollView": "LoopScrollView",
    "../manager/PoolManager": "PoolManager",
    "../manager/SdkManager": "SdkManager",
    "../manager/SpriteManager": "SpriteManager",
    "../net/HttpCom": "HttpCom",
    "./BaseLanguageLayer": "BaseLanguageLayer",
    "./LevelNodeItem": "LevelNodeItem"
  } ],
  LevelUILayer1: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "01147yfhQ5MXrvwCbuiUCJ8", "LevelUILayer1");
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
    var DataManager_1 = require("../manager/DataManager");
    var EventManager_1 = require("../manager/EventManager");
    var ToastManager_1 = require("../manager/ToastManager");
    var StaticInstance_1 = require("../StaticInstance");
    var BaseLanguageLayer_1 = require("./BaseLanguageLayer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LevelUILayer1 = function(_super) {
      __extends(LevelUILayer1, _super);
      function LevelUILayer1() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.btnPause = null;
        _this.btnLevel = null;
        _this.btnSkills = null;
        _this.btnSuoduan = null;
        _this.btnTouming = null;
        _this.btnYichu = null;
        return _this;
      }
      LevelUILayer1.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.btnPause = cc.find("btn_pause", this.node);
        this.btnLevel = cc.find("btn_level", this.node);
        this.btnSkills = cc.find("skills", this.node);
        this.btnSuoduan = cc.find("btn_shuffle", this.btnSkills);
        this.btnTouming = cc.find("btn_opacity", this.btnSkills);
        this.btnYichu = cc.find("btn_delete", this.btnSkills);
        this.onTouch(this.btnPause, this.onPauseClick, this);
        this.onTouch(this.btnLevel, this.onLevelClick, this);
        this.onTouch(this.btnSuoduan, this.onSuoDuanClick, this);
        this.onTouch(this.btnTouming, this.onTouMingClick, this);
        this.onTouch(this.btnYichu, this.onYiChuClick, this);
        EventManager_1.default.instance.on(EventManager_1.EventType.OPEN_LEVEL_BTN, this.openLevelBtn, this);
        EventManager_1.default.instance.on(EventManager_1.EventType.CLOSE_LEVEL_BTN, this.closeLevelBtn, this);
      };
      LevelUILayer1.prototype.show = function() {
        _super.prototype.show.call(this);
      };
      LevelUILayer1.prototype.start = function() {
        this.btnSkills.active = false;
      };
      LevelUILayer1.prototype.openLevelBtn = function() {
        this.btnSkills.active = true;
      };
      LevelUILayer1.prototype.closeLevelBtn = function() {
        this.btnSkills.active = false;
      };
      LevelUILayer1.prototype.onPauseClick = function() {
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SETTING);
      };
      LevelUILayer1.prototype.onLevelClick = function() {
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LEVEL_SELECT);
      };
      LevelUILayer1.prototype.onSuoDuanClick = function() {
        if (DataManager_1.default.instance.isSkilling) return;
        DataManager_1.default.instance.skillIndex = 0;
        this.openSkilling();
      };
      LevelUILayer1.prototype.onTouMingClick = function() {
        if (DataManager_1.default.instance.isSkilling) return;
        DataManager_1.default.instance.skillIndex = 1;
        this.openSkilling();
      };
      LevelUILayer1.prototype.onYiChuClick = function() {
        if (DataManager_1.default.instance.isSkilling) return;
        DataManager_1.default.instance.skillIndex = 2;
        this.openSkilling();
      };
      LevelUILayer1.prototype.openSkilling = function() {
        var keys = 1;
        DataManager_1.default.instance.skillIndex > 1 && (keys = 2);
        if (DataManager_1.default.instance.keys < keys) {
          console.log("\u94a5\u5319\u4e0d\u591f");
          ToastManager_1.default.instance.show(Languages_1.Languages["toast5"][DataManager_1.default.instance.language], {
            gravity: "TOP",
            bg_color: cc.color(226, 69, 109, 255)
          });
        } else {
          console.log(DataManager_1.default.instance.skillIndex, keys, "-------------------");
          DataManager_1.default.instance.isSkilling = true;
          StaticInstance_1.StaticInstance.uiManager.setMainSkillTip();
          StaticInstance_1.StaticInstance.uiManager.setMainTimer(true);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SKILL_SUBMIT, false);
        }
      };
      LevelUILayer1 = __decorate([ ccclass ], LevelUILayer1);
      return LevelUILayer1;
    }(BaseLanguageLayer_1.default);
    exports.default = LevelUILayer1;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../Languages": "Languages",
    "../StaticInstance": "StaticInstance",
    "../manager/DataManager": "DataManager",
    "../manager/EventManager": "EventManager",
    "../manager/ToastManager": "ToastManager",
    "./BaseLanguageLayer": "BaseLanguageLayer"
  } ],
  LevelUILayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6b791704GdHqKidw/mJK4Vi", "LevelUILayer");
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
    var EventName_1 = require("../data/EventName");
    var GlobalVar_1 = require("../data/GlobalVar");
    var Enum_1 = require("../Enum");
    var DataManager_1 = require("../manager/DataManager");
    var EventManager_1 = require("../manager/EventManager");
    var SpriteManager_1 = require("../manager/SpriteManager");
    var StaticInstance_1 = require("../StaticInstance");
    var Utils_1 = require("../Utils");
    var BaseLanguageLayer_1 = require("./BaseLanguageLayer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LevelUILayer = function(_super) {
      __extends(LevelUILayer, _super);
      function LevelUILayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.btnDown = null;
        _this.btnZhuanQv = null;
        _this.btnRenwu = null;
        _this.btnShop = null;
        _this.btnShare = null;
        _this.btnUp = null;
        _this.btnPower = null;
        _this.btnKey = null;
        _this.btnToken = null;
        _this.powerLabel = null;
        _this.keyLabel = null;
        _this.coinLabel = null;
        _this.timerLabel = null;
        _this.isschedule = false;
        return _this;
      }
      LevelUILayer.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.btnDown = cc.find("btndown", this.node);
        this.btnZhuanQv = cc.find("btnzhuanqv", this.btnDown);
        this.btnRenwu = cc.find("btnrenwu", this.btnDown);
        this.btnShop = cc.find("btnshop", this.btnDown);
        this.btnShare = cc.find("btnshare", this.btnDown);
        this.btnUp = cc.find("btnup", this.node);
        this.btnPower = cc.find("tili", this.btnUp);
        this.btnKey = cc.find("yaoshi", this.btnUp);
        this.btnToken = cc.find("daibi", this.btnUp);
        this.powerLabel = cc.find("tililabel", this.btnUp).getComponent(cc.Label);
        this.keyLabel = cc.find("yaoshilabel", this.btnUp).getComponent(cc.Label);
        this.coinLabel = cc.find("daibilabel", this.btnUp).getComponent(cc.Label);
        this.timerLabel = cc.find("timer", this.btnUp).getComponent(cc.Label);
        this.onTouch(this.btnRenwu, this.onRenWuClick, this);
        this.onTouch(this.btnShop, this.onShopClick, this);
        this.onTouch(this.btnShare, this.onShareClick, this);
        this.onTouch(this.btnZhuanQv, this.onZhuanQvClick, this);
        this.onTouch(this.btnPower, this.onPowerClick, this);
        this.onTouch(this.btnKey, this.onKeyClick, this);
        this.onTouch(this.btnToken, this.onTokenClick, this);
        EventManager_1.default.instance.on(EventManager_1.EventType.UPDATE_POWER_LABEL, this.updatePowerLabel, this);
        EventManager_1.default.instance.on(EventManager_1.EventType.UPDATE_KEY_LABEL, this.updateKeyLabel, this);
        EventManager_1.default.instance.on(EventManager_1.EventType.UPDATE_COIN_LABEL, this.updateCoinLabel, this);
        cc.game.on(EventName_1.S2C_WssEvent.ON_CAR_REWARD, this.onGetReward, this);
      };
      LevelUILayer.prototype.show = function() {
        _super.prototype.show.call(this);
        this.updatePowerLabel();
        this.updateKeyLabel();
        this.updateCoinLabel();
        var time = Date.now();
        console.log(time, "\u5f53\u524d\u65f6\u95f4");
      };
      LevelUILayer.prototype.onGetReward = function(data) {
        var rewards = data.data;
        console.log(rewards);
        DataManager_1.default.instance.coin = rewards["coin"];
        this.updateCoinLabel();
      };
      LevelUILayer.prototype.updateTimer = function() {
        DataManager_1.default.instance.lastPowerRefreshTime -= 1;
        this.timerLabel.string = Utils_1.formatSeconds(DataManager_1.default.instance.lastPowerRefreshTime, "i:s");
        if (DataManager_1.default.instance.lastPowerRefreshTime <= 0) {
          GlobalVar_1.GlobalVar.userInfo.hp.value = String(Number(GlobalVar_1.GlobalVar.userInfo.hp.value) + 1);
          DataManager_1.default.instance.lastPowerRefreshTime = Number(GlobalVar_1.GlobalVar.userInfo.hp_recover_cd);
          this.powerLabel.string = GlobalVar_1.GlobalVar.userInfo.hp.value;
          if (Number(GlobalVar_1.GlobalVar.userInfo.hp.value) >= Number(GlobalVar_1.GlobalVar.userInfo.max_hp)) {
            GlobalVar_1.GlobalVar.userInfo.hp.value = GlobalVar_1.GlobalVar.userInfo.max_hp;
            this.timerLabel.node.active = false;
            this.unschedule(this.updateTimer);
            this.isschedule = false;
          }
        }
        DataManager_1.default.instance.lastPowerUpdateTime = new Date().getTime();
        DataManager_1.default.instance.save();
      };
      LevelUILayer.prototype.updatePowerLabel = function() {
        this.powerLabel.string = GlobalVar_1.GlobalVar.userInfo.hp.value;
        if (Number(GlobalVar_1.GlobalVar.userInfo.hp.value) >= Number(GlobalVar_1.GlobalVar.userInfo.max_hp)) {
          this.timerLabel.node.active = false;
          this.unschedule(this.updateTimer);
          this.isschedule = false;
        } else {
          this.timerLabel.node.active = true;
          if (this.isschedule) return;
          var nowTime = Date.now();
          DataManager_1.default.instance.lastPowerRefreshTime = Number(GlobalVar_1.GlobalVar.userInfo.hp_recover_cd) - (Math.floor(nowTime / 1e3) - GlobalVar_1.GlobalVar.userInfo.hp.last_cd_time);
          this.schedule(this.updateTimer, 1);
          this.isschedule = true;
        }
      };
      LevelUILayer.prototype.updateKeyLabel = function() {
        this.keyLabel.string = "" + DataManager_1.default.instance.keys;
      };
      LevelUILayer.prototype.updateCoinLabel = function() {
        this.coinLabel.string = DataManager_1.default.instance.formatBytes(DataManager_1.default.instance.coin);
      };
      LevelUILayer.prototype.start = function() {};
      LevelUILayer.prototype.onZhuanQvClick = function() {
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LEVEL_SELECT, true);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.TASK, false);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SHOP, false);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SHARE, false);
      };
      LevelUILayer.prototype.onPowerClick = function() {
        if (StaticInstance_1.StaticInstance.uiManager.isActive(Enum_1.ENUM_UI_TYPE.SHOP)) return;
        this.onShopClick();
      };
      LevelUILayer.prototype.onKeyClick = function() {
        if (StaticInstance_1.StaticInstance.uiManager.isActive(Enum_1.ENUM_UI_TYPE.SHOP)) return;
        this.onShopClick();
      };
      LevelUILayer.prototype.onTokenClick = function() {
        if (StaticInstance_1.StaticInstance.uiManager.isActive(Enum_1.ENUM_UI_TYPE.TASK)) return;
        this.onRenWuClick();
      };
      LevelUILayer.prototype.onRenWuClick = function() {
        if (StaticInstance_1.StaticInstance.uiManager.isActive(Enum_1.ENUM_UI_TYPE.TASK)) StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.TASK, false); else {
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.TASK, true);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SHOP, false);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SHARE, false);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LEVEL_SELECT, false);
        }
        this.updateBtnState();
      };
      LevelUILayer.prototype.onShopClick = function() {
        if (StaticInstance_1.StaticInstance.uiManager.isActive(Enum_1.ENUM_UI_TYPE.SHOP)) StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SHOP, false); else {
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SHOP, true);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.TASK, false);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SHARE, false);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LEVEL_SELECT, false);
        }
        this.updateBtnState();
      };
      LevelUILayer.prototype.onShareClick = function() {
        if (StaticInstance_1.StaticInstance.uiManager.isActive(Enum_1.ENUM_UI_TYPE.SHARE)) StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SHARE, false); else {
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SHARE, true);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SHOP, false);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.TASK, false);
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LEVEL_SELECT, false);
        }
        this.updateBtnState();
      };
      LevelUILayer.prototype.updateBtnState = function() {
        var index = StaticInstance_1.StaticInstance.uiManager.isActive(Enum_1.ENUM_UI_TYPE.TASK) ? 1 : 0;
        this.btnRenwu.getComponent(cc.Sprite).spriteFrame = SpriteManager_1.default.taskIcon[index];
        index = StaticInstance_1.StaticInstance.uiManager.isActive(Enum_1.ENUM_UI_TYPE.SHOP) ? 1 : 0;
        this.btnShop.getComponent(cc.Sprite).spriteFrame = SpriteManager_1.default.shopIcon[index];
        index = StaticInstance_1.StaticInstance.uiManager.isActive(Enum_1.ENUM_UI_TYPE.SHARE) ? 1 : 0;
        this.btnShare.getComponent(cc.Sprite).spriteFrame = SpriteManager_1.default.shareIcon[index];
      };
      LevelUILayer = __decorate([ ccclass ], LevelUILayer);
      return LevelUILayer;
    }(BaseLanguageLayer_1.default);
    exports.default = LevelUILayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../StaticInstance": "StaticInstance",
    "../Utils": "Utils",
    "../data/EventName": "EventName",
    "../data/GlobalVar": "GlobalVar",
    "../manager/DataManager": "DataManager",
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
    var BaseLanguageLayer_1 = require("./BaseLanguageLayer");
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
    }(BaseLanguageLayer_1.default);
    exports.default = LoadingLayer;
    cc._RF.pop();
  }, {
    "../manager/DataManager": "DataManager",
    "./BaseLanguageLayer": "BaseLanguageLayer"
  } ],
  LoopScrollView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3034aLDXw5BV6+ejl1/z08k", "LoopScrollView");
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
    var PoolManager_1 = require("./PoolManager");
    var ScrollViewItemBase_1 = require("./ScrollViewItemBase");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LoopScrollView = function(_super) {
      __extends(LoopScrollView, _super);
      function LoopScrollView() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._scrollView = null;
        _this._spawnCount = 0;
        _this._totalCount = 0;
        _this._spacing = 0;
        _this._nodeItem = null;
        _this._bufferZone = 0;
        _this._lastContentPosY = 0;
        _this._nodeContentPosYOriginal = 0;
        _this._nodeContent = null;
        _this._nodeItems = [];
        _this._childNums = 1;
        _this._poolName = null;
        _this._getItemChildActiveNums = function(item) {
          var childNodeActiveNums = 0;
          var itemScrip = item.getComponent(ScrollViewItemBase_1.default);
          for (var i = 0; i < itemScrip.mChildNode.length; i++) {
            var childNode = itemScrip.mChildNode[i];
            if (null == childNode) {
              console.error("\u9700\u8981\u5728\u5355\u9879onLoad\u8d4b\u503c\u5b50\u7269\u4f53");
              return;
            }
            true == childNode.active && (childNodeActiveNums += 1);
          }
          return childNodeActiveNums;
        };
        _this._data = null;
        return _this;
      }
      LoopScrollView.prototype.init = function(nodeItem, poolname, scrollView, _childNums, _spacing, base) {
        void 0 === _childNums && (_childNums = 1);
        void 0 === _spacing && (_spacing = 10);
        this._scrollView = scrollView;
        this._childNums = _childNums;
        this._spacing = _spacing;
        nodeItem.getComponent(base) || nodeItem.addComponent(base);
        this._poolName = nodeItem.name;
        var item = PoolManager_1.default.instance.copyNode(nodeItem, null);
        PoolManager_1.default.instance.putNode(item);
        this._spawnCount = Math.ceil(this._scrollView.node.height / nodeItem.height) + 1;
        this._initContent();
        this._lastContentPosY = 0;
        this._bufferZone = this._spawnCount * (this._nodeItem.height + this._spacing) / 2;
        this._scrollView.node.on("scrolling", this._onScrolling, this);
        console.log("loop scroll view init", this._nodeContent, this._scrollView);
      };
      LoopScrollView.prototype._onScrolling = function() {
        var _nodeItems = this._nodeItems;
        var isDown = this._scrollView.content.y < this._lastContentPosY;
        var offset = (this._nodeItem.height + this._spacing) * _nodeItems.length;
        var newY = 0;
        for (var i = 0; i < _nodeItems.length; ++i) {
          var itemNode = _nodeItems[i];
          var viewPos = this._getPositionInView(itemNode);
          if (isDown) {
            newY = itemNode.y + offset;
            if (viewPos.y < -this._bufferZone && newY < 0) {
              itemNode.setPosition(itemNode.x, newY, 0);
              var item = itemNode.getComponent(ScrollViewItemBase_1.default);
              var itemId = item.itemID - _nodeItems.length;
              this._updateItem(itemId, item);
            }
          } else {
            newY = itemNode.y - offset;
            if (viewPos.y > this._bufferZone && newY > -this._nodeContent.height) {
              itemNode.setPosition(itemNode.x, newY, 0);
              var item = itemNode.getComponent(ScrollViewItemBase_1.default);
              var itemId = item.itemID + _nodeItems.length;
              this._updateItem(itemId, item);
            }
          }
        }
        this._lastContentPosY = this._scrollView.content.y;
      };
      LoopScrollView.prototype._initContent = function() {
        if (null == this._nodeContent) {
          this._nodeContent = this._scrollView.content;
          this._nodeContentPosYOriginal = this._nodeContent.y;
          this._nodeItem = PoolManager_1.default.instance.getNode(this._poolName);
          var scriptName = this._nodeItem.getComponent(ScrollViewItemBase_1.default);
          this._childNums = scriptName.mChildNums;
          PoolManager_1.default.instance.putNode(this._nodeItem);
        }
        this.recoveryChildren(this._nodeItems, this._poolName);
        this._nodeItems = [];
        var layoutNums = Math.ceil(this._totalCount / this._childNums);
        this._nodeContent.height = layoutNums * (this._nodeItem.height + this._spacing) + this._spacing;
        for (var i = 0; i < this._spawnCount; ++i) {
          var item = PoolManager_1.default.instance.getNode(this._poolName);
          this._nodeContent.addChild(item);
          item.getComponent(ScrollViewItemBase_1.default).init();
          item.setPosition(0, -item.height * (.5 + i) - this._spacing * (i + 1));
          var scriptName = item.getComponent(ScrollViewItemBase_1.default);
          item.active = false;
          this._nodeItems.push(item);
        }
      };
      LoopScrollView.prototype._getPositionInView = function(item) {
        return cc.v3(item.parent.x + item.x, item.parent.y + item.y, 0);
      };
      LoopScrollView.prototype._addItem = function(addNums) {
        var newTotalCount = Math.max(0, this._totalCount + addNums);
        var oldLayoutNums = Math.ceil(this._totalCount / this._childNums);
        var newLayoutNums = Math.ceil(newTotalCount / this._childNums);
        var addNums_Show = Math.min(newLayoutNums, this._spawnCount);
        if (oldLayoutNums < this._spawnCount) for (var i = oldLayoutNums; i < addNums_Show; i++) {
          var item = this._nodeItems[i];
          item.active = true;
          var itemScrip = item.getComponent(ScrollViewItemBase_1.default);
          this._updateItem(i, itemScrip);
        }
        if (this._childNums > 1) if (newLayoutNums <= this._spawnCount) {
          var item = this._nodeItems[newLayoutNums - 1];
          item.active = true;
          var itemScrip = item.getComponent(ScrollViewItemBase_1.default);
          var itemId = newLayoutNums - 1;
          this._updateItem(itemId, itemScrip);
        } else {
          var layoutIndex = newLayoutNums % this._childNums - 1;
          layoutIndex = layoutIndex < 0 ? this._spawnCount - 1 : layoutIndex;
          var item = this._nodeItems[layoutIndex];
          var maxYItem = this._getItemAtBottom();
          if (maxYItem == item) {
            var childNodeActiveNums = this._getItemChildActiveNums(item);
            if (childNodeActiveNums >= this._childNums) return;
            var itemScrip = item.getComponent(ScrollViewItemBase_1.default);
            var itemId = newLayoutNums - 1;
            this._updateItem(itemId, itemScrip);
          }
        }
        this._nodeContent.height = newLayoutNums * (this._nodeItem.height + this._spacing) + this._spacing;
        this._totalCount = newTotalCount;
      };
      LoopScrollView.prototype._removeItem = function(removeNums) {
        if (0 == this._totalCount) return;
        var oldLayoutNums = Math.ceil(this._totalCount / this._childNums);
        var newTotalCount = Math.max(0, this._totalCount - removeNums);
        var newLayoutNums = Math.ceil(newTotalCount / this._childNums);
        if (newLayoutNums < this._spawnCount) for (var i = newLayoutNums; i < this._spawnCount; i++) {
          var item = this._nodeItems[i];
          item.active = false;
        }
        if (this._childNums > 1) {
          var layoutIndex = oldLayoutNums % this._childNums - 1;
          layoutIndex = layoutIndex < 0 ? this._spawnCount - 1 : layoutIndex;
          var item = this._nodeItems[layoutIndex];
          var maxYItem = this._getItemAtBottom();
          if (maxYItem == item || false == maxYItem.active) if (newLayoutNums < oldLayoutNums) item.active = false; else {
            var itemScrip = item.getComponent(ScrollViewItemBase_1.default);
            var itemId = oldLayoutNums - 1;
            this._updateItem(itemId, itemScrip);
          }
        }
        this._nodeContent.height = newLayoutNums * (this._nodeItem.height + this._spacing) + this._spacing;
        this._totalCount = newTotalCount;
        this._moveBottomItemToTop();
        this._refreshItemDB();
      };
      LoopScrollView.prototype._moveBottomItemToTop = function() {
        var offset = (this._nodeItem.height + this._spacing) * this._nodeItems.length;
        var length = this._nodeItems.length;
        var item = this._getItemAtBottom();
        if (item.y + offset < 0 && (this._getItemChildActiveNums(item) <= 0 || false == item.active)) {
          var itemComp = item.getComponent(ScrollViewItemBase_1.default);
          if (this._childNums <= 1 && itemComp.itemID < this._totalCount) return;
          var itemId = itemComp.itemID - length;
          this._updateItem(itemId, itemComp);
          item.setPosition(item.x, item.y + offset, 0);
        }
      };
      LoopScrollView.prototype._getItemAtBottom = function() {
        var item = this._nodeItems[0];
        for (var i = 1; i < this._nodeItems.length; ++i) item.y > this._nodeItems[i].y && (item = this._nodeItems[i]);
        return item;
      };
      LoopScrollView.prototype._refreshItemDB = function() {
        var _this = this;
        this._nodeItems.forEach(function(item) {
          if (item.active) {
            var itemScrip = item.getComponent(ScrollViewItemBase_1.default);
            _this._updateItem(itemScrip.itemID, itemScrip);
          }
        });
      };
      LoopScrollView.prototype._updateItem = function(id, scrollViewItemBase) {
        if (null === this._data || !this._data.hasOwnProperty(id)) {
          scrollViewItemBase.node.active = false;
          return;
        }
        scrollViewItemBase.updateItem(id, this._data[id]);
      };
      LoopScrollView.prototype.setData = function(data) {
        this._scrollView.stopAutoScroll();
        this._removeItem(this._totalCount);
        this._initContent();
        this._data = data;
        var newTotalCount = data.length;
        this._addItem(newTotalCount);
        if (newTotalCount <= 0) for (var i = 0; i < this._nodeContent.children.length; i++) this._nodeContent.children[i].active = false;
      };
      LoopScrollView.prototype.updatedata = function(data) {
        var _this = this;
        this._data = data;
        this._nodeItems.forEach(function(item) {
          if (item.active) {
            var itemScrip = item.getComponent(ScrollViewItemBase_1.default);
            _this._updateItem(itemScrip.itemID, itemScrip);
          }
        });
      };
      LoopScrollView.prototype.recoveryChildren = function(children, poolName) {
        if (children.length <= 0) return;
        var nodeList = [];
        for (var i = 0; i < children.length; i++) nodeList.push(children[i]);
        for (var i = 0; i < nodeList.length; i++) PoolManager_1.default.instance.putNode(nodeList[i]);
      };
      LoopScrollView = __decorate([ ccclass ], LoopScrollView);
      return LoopScrollView;
    }(cc.Component);
    exports.default = LoopScrollView;
    cc._RF.pop();
  }, {
    "./PoolManager": "PoolManager",
    "./ScrollViewItemBase": "ScrollViewItemBase"
  } ],
  LoseLayer1: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "02b65l930JI+6jWBupIGRWE", "LoseLayer1");
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
    var Languages_1 = require("../Languages");
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
          ToastManager_1.default.instance.show(Languages_1.Languages["toast1"][DataManager_1.default.instance.language], {
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
    "../Languages": "Languages",
    "../manager/AudioManager": "AudioManager",
    "../manager/DataManager": "DataManager",
    "../manager/SdkManager": "SdkManager",
    "../manager/ToastManager": "ToastManager",
    "./../StaticInstance": "StaticInstance",
    "./HeaderLayer": "HeaderLayer"
  } ],
  LoseLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9955c/B74xAOpAqRVWkUlIt", "LoseLayer");
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
    var SdkManager_1 = require("../manager/SdkManager");
    var ToastManager_1 = require("../manager/ToastManager");
    var DataManager_1 = require("../manager/DataManager");
    var BaseLanguageLayer_1 = require("./BaseLanguageLayer");
    var EventManager_1 = require("../manager/EventManager");
    var GlobalVar_1 = require("../data/GlobalVar");
    var HttpCom_1 = require("../net/HttpCom");
    var Languages_1 = require("../Languages");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LoseLayer = function(_super) {
      __extends(LoseLayer, _super);
      function LoseLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.panel = null;
        _this.btnClose = null;
        _this.btnRestart = null;
        return _this;
      }
      LoseLayer.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.panel = cc.find("style/panel", this.node);
        this.btnClose = cc.find("bgshade", this.node);
        this.btnRestart = cc.find("btn_restart", this.panel);
        this.onTouch(this.btnClose, this.onCloseClick, this, 1);
        this.onTouch(this.btnRestart, this.onRestartClick, this);
      };
      LoseLayer.prototype.onEnable = function() {
        this.zoomIn(this.panel);
        SdkManager_1.default.instance.toggleBannerAd(true);
      };
      LoseLayer.prototype.onDisable = function() {
        SdkManager_1.default.instance.toggleBannerAd(false);
      };
      LoseLayer.prototype.onRestartClick = function() {
        var _this = this;
        if (Number(GlobalVar_1.GlobalVar.userInfo.hp.value) < 5) {
          ToastManager_1.default.instance.show(Languages_1.Languages["toast1"][DataManager_1.default.instance.language], {
            gravity: "TOP",
            bg_color: cc.color(226, 69, 109, 255)
          });
          return;
        }
        var level = DataManager_1.default.instance.level;
        HttpCom_1.HttpCom.start(level, 1, function(res) {
          _this.onClose();
          var data = res.data;
          DataManager_1.default.instance.level = level;
          GlobalVar_1.GlobalVar.userInfo.hp.value = String(data.hp.value);
          GlobalVar_1.GlobalVar.userInfo.hp.last_cd_time = data.hp.last_cd_time;
          DataManager_1.default.instance.nowRoundConfig = data.round_config;
          DataManager_1.default.instance.seconds = data.round_config.time_limit;
          EventManager_1.default.instance.emit(EventManager_1.EventType.UPDATE_POWER_LABEL);
          DataManager_1.default.instance.mode = Enum_1.ENUM_GAME_MODE.TIMER;
          StaticInstance_1.StaticInstance.transitionsManager.play(Enum_1.ENUM_UI_TYPE.LOSE, null, function() {
            StaticInstance_1.StaticInstance.gameManager.onGameLevelStart();
            DataManager_1.default.instance.isWssComplete = false;
            GlobalVar_1.GlobalVar.wss.set_car_nums(DataManager_1.default.instance.carNum);
            1 == DataManager_1.default.instance.nowRoundConfig.is_special && (DataManager_1.default.instance.isTimerStart || StaticInstance_1.StaticInstance.uiManager.setMainTimer());
          });
        });
      };
      LoseLayer.prototype.onClose = function() {
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LOSE, false);
      };
      LoseLayer.prototype.onCloseClick = function() {
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.MAIN_LEVEL, false);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.MAIN, false);
        EventManager_1.default.instance.emit(EventManager_1.EventType.CLOSE_LEVEL_BTN);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LOSE, false);
        StaticInstance_1.StaticInstance.gameManager.removealllevel();
      };
      LoseLayer = __decorate([ ccclass ], LoseLayer);
      return LoseLayer;
    }(BaseLanguageLayer_1.default);
    exports.default = LoseLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../Languages": "Languages",
    "../data/GlobalVar": "GlobalVar",
    "../manager/DataManager": "DataManager",
    "../manager/EventManager": "EventManager",
    "../manager/SdkManager": "SdkManager",
    "../manager/ToastManager": "ToastManager",
    "../net/HttpCom": "HttpCom",
    "./../StaticInstance": "StaticInstance",
    "./BaseLanguageLayer": "BaseLanguageLayer"
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
        _this.barSeconds = null;
        _this.timerNum = null;
        _this.levelNum = null;
        _this.levelNumLabel = null;
        return _this;
      }
      MainLayer.prototype.show = function() {
        _super.prototype.show.call(this);
        EventManager_1.default.instance.emit(EventManager_1.EventType.OPEN_LEVEL_BTN);
        if (1 == DataManager_1.default.instance.nowRoundConfig.is_special) {
          this.barSeconds.active = true;
          this.levelNum.x = -151;
        } else {
          this.levelNum.x = 0;
          this.barSeconds.active = false;
        }
        this.levelNum.active = true;
        this.levelNumLabel.string = "\u7b2c" + DataManager_1.default.instance.level + "\u5173";
      };
      MainLayer.prototype.onLoad = function() {
        var _this = this;
        this.levelUpNode = cc.find("level_up", this.node);
        this.barSeconds = cc.find("bar_seconds", this.node);
        this.timerNum = cc.find("nums", this.barSeconds);
        this.skills = cc.find("skills", this.node);
        this.levelNum = cc.find("levelnum", this.node);
        this.levelNumLabel = cc.find("nums", this.levelNum).getComponent(cc.Label);
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
        if (0 == DataManager_1.default.instance.nowRoundConfig.is_special) return;
        var label = this.timerNum.getComponent(cc.Label);
        DataManager_1.default.instance.seconds = DataManager_1.default.instance.seconds < 0 ? 0 : DataManager_1.default.instance.seconds;
        label.string = Utils_1.formatSeconds("" + DataManager_1.default.instance.seconds, "h:i:s");
        if (DataManager_1.default.instance.seconds <= 0) {
          this.onTimerStop();
          StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LOSE);
        }
      };
      MainLayer.prototype.onTimerStart = function() {
        var _this = this;
        var label = this.timerNum.getComponent(cc.Label);
        this.unscheduleAllCallbacks();
        this.schedule(function() {
          DataManager_1.default.instance.seconds--;
          DataManager_1.default.instance.seconds = DataManager_1.default.instance.seconds < 0 ? 0 : DataManager_1.default.instance.seconds;
          label.string = Utils_1.formatSeconds("" + DataManager_1.default.instance.seconds, "h:i:s");
          if (DataManager_1.default.instance.seconds <= 0) {
            _this.onTimerStop();
            StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.LOSE);
          }
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
    var SdkManager_1 = require("../manager/SdkManager");
    var ToastManager_1 = require("../manager/ToastManager");
    var StaticInstance_1 = require("../StaticInstance");
    var Baselayer_1 = require("./Baselayer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MainLevelLayer = function(_super) {
      __extends(MainLevelLayer, _super);
      function MainLevelLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.crashNum = null;
        _this.tip = null;
        return _this;
      }
      MainLevelLayer.prototype.show = function() {
        _super.prototype.show.call(this);
        EventManager_1.default.instance.emit(EventManager_1.EventType.OPEN_LEVEL_BTN);
      };
      MainLevelLayer.prototype.onLoad = function() {
        this.crashNum = cc.find("bar_crash/nums", this.node);
        this.tip = cc.find("bar_crash/tip", this.node);
      };
      MainLevelLayer.prototype.onDestroy = function() {};
      MainLevelLayer.prototype.onEnable = function() {};
      MainLevelLayer.prototype.onDisable = function() {};
      MainLevelLayer.prototype.setCrashRendor = function() {
        var nums = DataManager_1.default.instance.crashTotal - DataManager_1.default.instance.crashCurrent;
        nums = Math.max(0, nums);
        this.crashNum.getComponent(cc.Label).string = "" + nums;
      };
      MainLevelLayer.prototype.setLevelTip = function() {
        var tip = "\u8bf7\u5c06\u7ea2\u8272\u5c0f\u8f66\u632a\u51fa\u8f66\u5e93";
        DataManager_1.default.instance.carNum > 1 && (tip = "\u8bf7\u5c06\u6240\u6709\u8f66\u8f86\u632a\u51fa\u8f66\u5e93");
        this.tip.getComponent(cc.Label).string = "" + tip;
      };
      MainLevelLayer.prototype.onPauseClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.EXIT_LEVEL);
      };
      MainLevelLayer.prototype.onPassClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        SdkManager_1.default.instance.showVideoAd(function(msg) {
          SdkManager_1.default.instance.getPlatform() || ToastManager_1.default.instance.show(msg, {
            gravity: "BOTTOM",
            bg_color: cc.color(102, 202, 28, 255)
          });
          if (DataManager_1.default.instance.status == Enum_1.ENUM_GAME_STATUS.RUNING) {
            DataManager_1.default.instance.status = Enum_1.ENUM_GAME_STATUS.UNRUNING;
            var clevel = DataManager_1.default.instance.clevel + 1;
            clevel = Math.min(clevel, DataManager_1.CLEVEL_Data.length);
            DataManager_1.default.instance.clevel = clevel;
            clevel > DataManager_1.default.instance.clevelMax && (DataManager_1.default.instance.clevelMax = clevel);
            DataManager_1.default.instance.save();
            StaticInstance_1.StaticInstance.transitionsManager.play(null, null, function() {
              StaticInstance_1.StaticInstance.gameManager.onGameLevelStart();
            });
          }
        }, function(msg) {
          ToastManager_1.default.instance.show(msg, {
            gravity: "BOTTOM",
            bg_color: cc.color(226, 69, 109, 255)
          });
        });
      };
      MainLevelLayer = __decorate([ ccclass ], MainLevelLayer);
      return MainLevelLayer;
    }(Baselayer_1.default);
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
    var HeaderLayer_1 = require("./HeaderLayer");
    var DataManager_1 = require("../manager/DataManager");
    var Languages_1 = require("../Languages");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MenuLayer = function(_super) {
      __extends(MenuLayer, _super);
      function MenuLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.btnStartTimer = null;
        _this.btnStartLevel = null;
        _this.btnSetting = null;
        _this.btnGames = null;
        _this.btnShare = null;
        _this.btnRank = null;
        return _this;
      }
      MenuLayer.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
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
      };
      MenuLayer.prototype.onDestroy = function() {
        this.btnStartTimer.off("click", this.onStartTimerClick, this);
        this.btnStartLevel.off("click", this.onStartLevelClick, this);
        this.btnSetting.off("click", this.onSettingClick, this);
        this.btnGames.off("click", this.onGamesClick, this);
        this.btnShare.off("click", this.onShareClick, this);
        this.btnRank.off("click", this.onRankClick, this);
      };
      MenuLayer.prototype.onEnable = function() {
        this.rendorKeys();
        this.rendorPower();
        this.rendorPowerTimer();
      };
      MenuLayer.prototype.onDisable = function() {};
      MenuLayer.prototype.onStartTimerClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        if (DataManager_1.default.instance.power <= 0) {
          ToastManager_1.default.instance.show(Languages_1.Languages["toast1"][DataManager_1.default.instance.language], {
            gravity: "TOP",
            bg_color: cc.color(226, 69, 109, 255)
          });
          return;
        }
        DataManager_1.default.instance.mode = Enum_1.ENUM_GAME_MODE.TIMER;
        DataManager_1.default.instance.power -= 1;
        DataManager_1.default.instance.save();
        StaticInstance_1.StaticInstance.transitionsManager.play(Enum_1.ENUM_UI_TYPE.MENU, Enum_1.ENUM_UI_TYPE.MAIN, function() {
          StaticInstance_1.StaticInstance.gameManager.onGameStart();
        });
      };
      MenuLayer.prototype.onStartLevelClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        if (DataManager_1.default.instance.power <= 0) {
          ToastManager_1.default.instance.show(Languages_1.Languages["toast1"][DataManager_1.default.instance.language], {
            gravity: "TOP",
            bg_color: cc.color(226, 69, 109, 255)
          });
          return;
        }
        DataManager_1.default.instance.mode = Enum_1.ENUM_GAME_MODE.LEVEL;
        DataManager_1.default.instance.power -= 1;
        DataManager_1.default.instance.save();
        StaticInstance_1.StaticInstance.transitionsManager.play(Enum_1.ENUM_UI_TYPE.MENU, Enum_1.ENUM_UI_TYPE.MAIN_LEVEL, function() {
          StaticInstance_1.StaticInstance.gameManager.onGameLevelStart();
        });
      };
      MenuLayer.prototype.onSettingClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.MENU, false);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SETTING);
      };
      MenuLayer.prototype.onGamesClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.MENU, false);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.MORE);
      };
      MenuLayer.prototype.onShareClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        SdkManager_1.default.instance.getPlatform() ? SdkManager_1.default.instance.activeShare() : ToastManager_1.default.instance.show("\u4ec5\u652f\u6301\u5c0f\u6e38\u620f\u5e73\u53f0", {
          gravity: "TOP",
          bg_color: cc.color(226, 69, 109, 255)
        });
      };
      MenuLayer.prototype.onRankClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.MENU, false);
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.RANK);
      };
      MenuLayer = __decorate([ ccclass ], MenuLayer);
      return MenuLayer;
    }(HeaderLayer_1.default);
    exports.default = MenuLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../Languages": "Languages",
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
  PayWayItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c55a6MZhwZOSaQJLqUpBjb5", "PayWayItem");
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
    var EventName_1 = require("../data/EventName");
    var GlobalVar_1 = require("../data/GlobalVar");
    var Enum_1 = require("../Enum");
    var AudioManager_1 = require("../manager/AudioManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PayWayItem = function(_super) {
      __extends(PayWayItem, _super);
      function PayWayItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.payTpye = EventName_1.PayType.star;
        _this.price = 0;
        return _this;
      }
      PayWayItem.prototype.onLoad = function() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
      };
      PayWayItem.prototype.onDestroy = function() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onClick, this);
      };
      PayWayItem.prototype.init = function(payTpye, price) {
        this.payTpye = payTpye;
        price && (this.price = price);
      };
      PayWayItem.prototype.onClick = function() {
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        null !== GlobalVar_1.GlobalVar.currentBuyGoodsId && cc.game.emit(EventName_1.GameEvent.BUY_GOODS, GlobalVar_1.GlobalVar.currentBuyGoodsId, this.payTpye);
      };
      PayWayItem.prototype.start = function() {};
      PayWayItem = __decorate([ ccclass ], PayWayItem);
      return PayWayItem;
    }(cc.Component);
    exports.default = PayWayItem;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../data/EventName": "EventName",
    "../data/GlobalVar": "GlobalVar",
    "../manager/AudioManager": "AudioManager"
  } ],
  PayWay: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ad194ZDbyNCCIM5vgBfUG4V", "PayWay");
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
    var EventName_1 = require("../data/EventName");
    var PayWayItem_1 = require("./PayWayItem");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PayWay = function(_super) {
      __extends(PayWay, _super);
      function PayWay() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.tonNode = null;
        _this.usdtNode = null;
        _this.starNode = null;
        _this.goodAmountLab = null;
        return _this;
      }
      PayWay.prototype.onLoad = function() {};
      PayWay.prototype.start = function() {};
      PayWay.prototype.onClick = function() {};
      PayWay.prototype.init = function(paymentData) {
        var _this = this;
        var pay = paymentData.data;
        var payMethod = pay.pay_ways;
        this.goodAmountLab.string = "=$" + pay.goods_amount;
        this.tonNode.active = false;
        this.usdtNode.active = false;
        this.starNode.active = false;
        payMethod.forEach(function(e, i) {
          switch (e.payment_method) {
           case EventName_1.PayType.ton:
            _this.tonNode.active = true;
            _this.initPayWay(_this.tonNode, e, EventName_1.PayType.ton);
            _this.tonNode.getComponent(PayWayItem_1.default).init(EventName_1.PayType.ton, e.amount);
            break;

           case EventName_1.PayType.usdt:
            _this.usdtNode.active = true;
            _this.initPayWay(_this.usdtNode, e, EventName_1.PayType.usdt);
            _this.tonNode.getComponent(PayWayItem_1.default).init(EventName_1.PayType.usdt, e.amount);
            break;

           case EventName_1.PayType.star:
            _this.starNode.active = true;
            _this.initPayWay(_this.starNode, e, EventName_1.PayType.star);
            _this.tonNode.getComponent(PayWayItem_1.default).init(EventName_1.PayType.star, e.amount);
          }
        });
      };
      PayWay.prototype.initPayWay = function(node, payWay, wayName) {
        var offNode = cc.find("off", node);
        var layoutNode = cc.find("layout", node);
        if (0 == payWay.discount) {
          offNode.active = false;
          layoutNode.children[0].active = false;
          layoutNode.children[0].getComponent(cc.Label).string = payWay.amount.toString();
          layoutNode.children[1].getComponent(cc.Label).string = payWay.amount.toString() + wayName;
        } else {
          offNode.active = true;
          offNode.children[0].getComponent(cc.Label).string = (100 * payWay.discount).toString() + wayName;
          layoutNode.children[0].active = true;
          layoutNode.children[0].getComponent(cc.Label).string = payWay.amount.toString();
          layoutNode.children[1].getComponent(cc.Label).string = (payWay.amount * payWay.discount).toString() + wayName;
        }
      };
      PayWay.prototype.onCloseBtnClick = function() {
        this.node.active = false;
      };
      __decorate([ property(cc.Node) ], PayWay.prototype, "tonNode", void 0);
      __decorate([ property(cc.Node) ], PayWay.prototype, "usdtNode", void 0);
      __decorate([ property(cc.Node) ], PayWay.prototype, "starNode", void 0);
      __decorate([ property(cc.Label) ], PayWay.prototype, "goodAmountLab", void 0);
      PayWay = __decorate([ ccclass ], PayWay);
      return PayWay;
    }(cc.Component);
    exports.default = PayWay;
    cc._RF.pop();
  }, {
    "../data/EventName": "EventName",
    "./PayWayItem": "PayWayItem"
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
        var _a;
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
          name = (null === (_a = prefab.data) || void 0 === _a ? void 0 : _a.name) || prefab.name;
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
        console.log("level", name);
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
  ScrollViewItemBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eb9e5sZHIVCDYbPwA8hN2e6", "ScrollViewItemBase");
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
    var BaseItem_1 = require("../layer/BaseItem");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ScrollViewItemBase = function(_super) {
      __extends(ScrollViewItemBase, _super);
      function ScrollViewItemBase() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mChildNode = [];
        _this.itemID = -1;
        _this.mChildNums = 1;
        return _this;
      }
      ScrollViewItemBase.prototype.onLoad = function() {
        this.SetChildNode();
      };
      ScrollViewItemBase.prototype.init = function(index) {};
      ScrollViewItemBase.prototype.SetChildNode = function() {};
      ScrollViewItemBase.prototype.updateItem = function(tmplId, data) {
        this.itemID = tmplId;
        this.node.active = true;
      };
      ScrollViewItemBase = __decorate([ ccclass ], ScrollViewItemBase);
      return ScrollViewItemBase;
    }(BaseItem_1.default);
    exports.default = ScrollViewItemBase;
    cc._RF.pop();
  }, {
    "../layer/BaseItem": "BaseItem"
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
      SdkManager.prototype.toggleBannerAd = function(isShow) {};
      SdkManager.prototype.initInterstitialAd = function() {};
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
    var telegram_ui_1 = require("../cocos-telegram-miniapps/telegram-ui");
    var Config_1 = require("../data/Config");
    var GlobalVar_1 = require("../data/GlobalVar");
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
        _this.testTon = null;
        _this.versionLab = null;
        _this.idLab = null;
        return _this;
      }
      SettingLayer.prototype.show = function() {
        _super.prototype.show.call(this);
        this.CreateListItem(this.content, this.yuyanItem, Object.keys(Languages_1.LanguageType), YuYanItem);
        this.idLab.string = "ID:" + GlobalVar_1.GlobalVar.userInfo.id;
      };
      SettingLayer.prototype.testTonBtn = function() {
        telegram_ui_1.TonConnectUi.Instance.openModal();
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
        this.idLab = cc.find("style/panel/id", this.node).getComponent(cc.Label);
        this.versionLab = cc.find("style/panel/version", this.node).getComponent(cc.Label);
        this.versionLab.string = Config_1.Config.version;
        this.onTouch(this.btnLanguage, this.onLanguageClick, this);
        this.testTon = this.node.getChildByName("testTon");
        this.testTon.on(cc.Node.EventType.TOUCH_END, this.testTonBtn, this);
        EventManager_1.default.instance.on(EventManager_1.EventType.UPDATE_LANGUAGE, this.updateNowLanguageLabel, this);
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
      SettingLayer.prototype.updateNowLanguageLabel = function() {
        this.content.active = false;
        this.nowLanguage.string = Languages_1.Languages[Languages_1.LanguageKey[DataManager_1.default.instance.language]][DataManager_1.default.instance.language];
      };
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
    "../cocos-telegram-miniapps/telegram-ui": "telegram-ui",
    "../data/Config": "Config",
    "../data/GlobalVar": "GlobalVar",
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
    var Config_1 = require("../data/Config");
    var EventName_1 = require("../data/EventName");
    var GlobalVar_1 = require("../data/GlobalVar");
    var Enum_1 = require("../Enum");
    var Languages_1 = require("../Languages");
    var DataManager_1 = require("../manager/DataManager");
    var EventManager_1 = require("../manager/EventManager");
    var SpriteManager_1 = require("../manager/SpriteManager");
    var HttpCom_1 = require("../net/HttpCom");
    var StaticInstance_1 = require("../StaticInstance");
    var BaseItem_1 = require("./BaseItem");
    var BaseLanguageLayer_1 = require("./BaseLanguageLayer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PanelType;
    (function(PanelType) {
      PanelType[PanelType["HomePage"] = 1] = "HomePage";
      PanelType[PanelType["ViewPage"] = 2] = "ViewPage";
    })(PanelType || (PanelType = {}));
    var rewardConfig = [ {
      status: 1,
      key: 3,
      coin: 3,
      people: 4
    }, {
      status: 1,
      key: 20,
      coin: 20,
      people: 8
    }, {
      status: 1,
      key: 40,
      coin: 40,
      people: 16
    }, {
      status: 1,
      key: 60,
      coin: 60,
      people: 20
    } ];
    var inviteeConfig = [ "1523678", "1523678", "1523678", "1523678", "1523678", "1523678" ];
    var InviteeItem = function(_super) {
      __extends(InviteeItem, _super);
      function InviteeItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.idLabel = null;
        return _this;
      }
      InviteeItem.prototype.init = function() {
        this.idLabel = this.node.getChildByName("id").getComponent(cc.Label);
      };
      InviteeItem.prototype.setData = function(data) {
        this.idLabel.string = "ID:" + data;
      };
      return InviteeItem;
    }(BaseItem_1.default);
    var ShareRewardItem = function(_super) {
      __extends(ShareRewardItem, _super);
      function ShareRewardItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.diSprite = null;
        _this.keyNum = null;
        _this.coinNum = null;
        _this.keLingDi = null;
        _this.btnLabel = null;
        _this.nowData = null;
        return _this;
      }
      ShareRewardItem.prototype.init = function() {
        this.diSprite = this.node.getComponent(cc.Sprite);
        this.keyNum = this.node.getChildByName("keyslabel").getComponent(cc.Label);
        this.coinNum = this.node.getChildByName("coinlabel").getComponent(cc.Label);
        this.keLingDi = this.node.getChildByName("kelingqvdi");
        this.btnLabel = this.node.getChildByName("statuslabel").getComponent(cc.Label);
      };
      ShareRewardItem.prototype.setData = function(data) {
        console.log(data, "-----------------");
        this.nowData = data;
        this.keyNum.string = data.rewards.key;
        this.coinNum.string = data.rewards.coin;
        this.offTouch(this.node);
        if (data.can_receive) {
          this.keLingDi.active = true;
          this.btnLabel.string = Languages_1.Languages["kelingqv"][DataManager_1.default.instance.language];
          this.diSprite.spriteFrame = SpriteManager_1.default.shareRewardDi[0];
          this.onTouch(this.node, this.onTouchNode, this);
        } else if (data.is_receive) {
          this.keLingDi.active = false;
          this.btnLabel.string = Languages_1.Languages["yilingqv"][DataManager_1.default.instance.language];
          this.diSprite.spriteFrame = SpriteManager_1.default.shareRewardDi[0];
        } else {
          var str = Languages_1.Languages["yaoqingrenshu"][DataManager_1.default.instance.language];
          str = str.replace("{number}", data.target_num.toString());
          this.btnLabel.string = str;
          this.keLingDi.active = false;
          this.diSprite.spriteFrame = SpriteManager_1.default.shareRewardDi[1];
        }
      };
      ShareRewardItem.prototype.onTouchNode = function() {
        this.nowData.can_receive ? HttpCom_1.HttpCom.taskReceiveReward(this.nowData.task_id, function(res) {
          console.log(res, "\u9886\u53d6\u4efb\u52a1");
          DataManager_1.default.instance.coin = res.data.coin;
          DataManager_1.default.instance.keys = res.data.key;
          EventManager_1.default.instance.emit(EventManager_1.EventType.UPDATE_SHAHE_PANEL);
          EventManager_1.default.instance.emit(EventManager_1.EventType.UPDATE_KEY_LABEL);
          EventManager_1.default.instance.emit(EventManager_1.EventType.UPDATE_COIN_LABEL);
        }) : this.nowData.is_receive;
      };
      return ShareRewardItem;
    }(BaseItem_1.default);
    var ShareLayer = function(_super) {
      __extends(ShareLayer, _super);
      function ShareLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.panel1 = null;
        _this.panel2 = null;
        _this.numLabel = null;
        _this.rewardsContent = null;
        _this.btnLianJie = null;
        _this.btnShare = null;
        _this.content = null;
        _this.inviteeItem = null;
        _this.zanwugengduo = null;
        _this.shareRewardItem = null;
        _this.btnFanHui = null;
        _this.btnCheck = null;
        _this.content1 = null;
        _this.panelType = null;
        _this.closeBtn = null;
        return _this;
      }
      ShareLayer.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.panel1 = cc.find("style/panel/panel1", this.node);
        this.panel2 = cc.find("style/panel/panel2", this.node);
        this.rewardsContent = cc.find("rewards", this.panel1);
        this.btnShare = cc.find("btnShare", this.panel1);
        this.btnLianJie = cc.find("btnLianjie", this.panel1);
        this.content = cc.find("view/mask/content", this.panel1);
        this.numLabel = cc.find("leijidi/numlabel", this.panel1).getComponent(cc.Label);
        this.inviteeItem = this.node.getChildByName("inviteeItem");
        this.zanwugengduo = this.node.getChildByName("zanwugengduo");
        this.shareRewardItem = this.node.getChildByName("shareRewardItem");
        this.btnFanHui = this.panel2.getChildByName("fanhui");
        this.btnCheck = this.panel1.getChildByName("chakanquanbu");
        this.content1 = cc.find("view/mask/content", this.panel2);
        this.closeBtn = cc.find("style/panel/btn_close", this.node);
        this.onTouch(this.btnShare, this.onTouchShare, this);
        this.onTouch(this.btnLianJie, this.onTouchLianJie, this);
        this.onTouch(this.btnFanHui, this.onTouchFanHui, this);
        this.onTouch(this.btnCheck, this.onTouchCheck, this);
        this.onTouch(this.closeBtn, this.onCloseBtnClick, this);
        EventManager_1.default.instance.on(EventManager_1.EventType.UPDATE_SHAHE_PANEL, this.initPanel, this);
      };
      ShareLayer.prototype.onCloseBtnClick = function() {
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SHARE, false);
      };
      ShareLayer.prototype.show = function() {
        _super.prototype.show.call(this);
        this.initPanel();
      };
      ShareLayer.prototype.initPanel = function() {
        var _this = this;
        HttpCom_1.HttpCom.invite(function(res) {
          var str = Languages_1.Languages["yaoqingrenshu"][DataManager_1.default.instance.language];
          str = str.replace("{number}", res.data.invited_player_ids.length.toString());
          _this.numLabel.string = str;
          null == _this.panelType && (_this.panelType = PanelType.HomePage);
          if (_this.panelType == PanelType.HomePage) {
            _this.panel1.active = true;
            _this.panel2.active = false;
            _this.CreateListItem(_this.rewardsContent, _this.shareRewardItem, res.data.invite_task, ShareRewardItem);
            _this.CreateListItem(_this.content, _this.inviteeItem, res.data.invited_player_ids, InviteeItem);
          } else {
            _this.panel1.active = false;
            _this.panel2.active = true;
            _this.CreateListItem(_this.content1, _this.inviteeItem, inviteeConfig, InviteeItem);
          }
        });
      };
      ShareLayer.prototype.onTouchShare = function() {
        console.log("\u70b9\u51fb\u5206\u4eab\u6309\u94ae");
        cc.game.emit(EventName_1.GameEvent.OPEN_INVITE_URL);
      };
      ShareLayer.prototype.onTouchLianJie = function() {
        if (window["Telegram"] && window["Telegram"].WebApp) {
          var link_1 = "https://t.me/Htbtset2bot/" + Config_1.Config.appName + "?startapp=" + GlobalVar_1.GlobalVar.userInfo.id.toString();
          navigator.clipboard.writeText(link_1).then(function() {
            console.log("\u590d\u5236\u6210\u529f", link_1);
          }).catch(function() {
            console.log("\u590d\u5236\u5931\u8d25");
          });
        }
      };
      ShareLayer.prototype.onTouchFanHui = function() {
        this.panelType = PanelType.HomePage;
        this.initPanel();
      };
      ShareLayer.prototype.onTouchCheck = function() {
        this.panelType = PanelType.ViewPage;
        this.initPanel();
      };
      ShareLayer = __decorate([ ccclass ], ShareLayer);
      return ShareLayer;
    }(BaseLanguageLayer_1.default);
    exports.default = ShareLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../Languages": "Languages",
    "../StaticInstance": "StaticInstance",
    "../data/Config": "Config",
    "../data/EventName": "EventName",
    "../data/GlobalVar": "GlobalVar",
    "../manager/DataManager": "DataManager",
    "../manager/EventManager": "EventManager",
    "../manager/SpriteManager": "SpriteManager",
    "../net/HttpCom": "HttpCom",
    "./BaseItem": "BaseItem",
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
    var EventName_1 = require("../data/EventName");
    var GlobalVar_1 = require("../data/GlobalVar");
    var Enum_1 = require("../Enum");
    var Languages_1 = require("../Languages");
    var DataManager_1 = require("../manager/DataManager");
    var PoolManager_1 = require("../manager/PoolManager");
    var SpriteManager_1 = require("../manager/SpriteManager");
    var HttpCom_1 = require("../net/HttpCom");
    var PayWay_1 = require("../pay/PayWay");
    var StaticInstance_1 = require("../StaticInstance");
    var BaseItem_1 = require("./BaseItem");
    var BaseLanguageLayer_1 = require("./BaseLanguageLayer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LiBaoConfig = {
      1: {
        name: "huasuanlibao"
      }
    };
    var RewardConfig = {
      coin: 0,
      hp: 1,
      key: 2
    };
    var KeyConfig = [ {
      keys: 10,
      price: 10,
      spriteId: 1
    }, {
      keys: 20,
      price: 20,
      spriteId: 1
    }, {
      keys: 40,
      price: 40,
      spriteId: 1
    }, {
      keys: 50,
      price: 50,
      spriteId: 1
    }, {
      keys: 100,
      price: 99,
      spriteId: 1
    }, {
      keys: 200,
      price: 189,
      spriteId: 1
    } ];
    var PowerConfig = [ {
      power: 10,
      price: 10,
      spriteId: 0
    }, {
      power: 20,
      price: 20,
      spriteId: 0
    }, {
      power: 40,
      price: 40,
      spriteId: 0
    }, {
      power: 50,
      price: 50,
      spriteId: 0
    }, {
      power: 100,
      price: 99,
      spriteId: 0
    }, {
      power: 200,
      price: 189,
      spriteId: 0
    } ];
    var PanelType;
    (function(PanelType) {
      PanelType[PanelType["LiBao"] = 1] = "LiBao";
      PanelType[PanelType["DaoJu"] = 2] = "DaoJu";
      PanelType[PanelType["Skin"] = 3] = "Skin";
    })(PanelType || (PanelType = {}));
    var LiBaoItem = function(_super) {
      __extends(LiBaoItem, _super);
      function LiBaoItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.nameLabel = null;
        _this.priceLabel = null;
        _this.btnBuy = null;
        _this.xianGou = null;
        _this.hot = null;
        _this.content = null;
        _this.rewardItem = null;
        _this.nowData = null;
        return _this;
      }
      LiBaoItem.prototype.init = function() {
        this.nameLabel = this.node.getChildByName("namelabel").getComponent(cc.Label);
        this.btnBuy = this.node.getChildByName("btnBuy");
        this.priceLabel = this.btnBuy.getChildByName("pricelabel").getComponent(cc.Label);
        this.xianGou = this.node.getChildByName("xiangou");
        this.hot = this.node.getChildByName("hot");
        this.content = this.node.getChildByName("content");
        this.rewardItem = cc.find("rewardItem", this.node);
        this.onTouch(this.btnBuy, this.onTouchBuy, this);
      };
      LiBaoItem.prototype.setData = function(data) {
        console.log(data, "\u5546\u54c1\u4fe1\u606f");
        this.nameLabel.string = Languages_1.Languages[LiBaoConfig[data.goods_id].name][DataManager_1.default.instance.language];
        this.priceLabel.string = "$ " + data.amount;
        data.is_hot ? this.hot.active = true : this.hot.active = false;
        var arr = [];
        for (var key in data.items) arr.push({
          key: key,
          value: data.items[key]
        });
        this.CreateListItem(this.content, this.rewardItem, arr, RewardItem);
        1 == data.limit_type ? this.xianGou.active = true : this.xianGou.active = false;
        this.nowData = data;
      };
      LiBaoItem.prototype.onTouchBuy = function() {
        console.log(this.nowData, "\u5f53\u524d\u5546\u54c1\u6570\u636e");
        cc.game.emit(EventName_1.GameEvent.SHOW_PAYWAY_PAGE, this.nowData.goods_id);
      };
      return LiBaoItem;
    }(BaseItem_1.default);
    var KeyItem = function(_super) {
      __extends(KeyItem, _super);
      function KeyItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.icon = null;
        _this.numLabel = null;
        _this.btnBuy = null;
        _this.priceLabel = null;
        return _this;
      }
      KeyItem.prototype.init = function() {
        this.icon = this.node.getChildByName("icon").getComponent(cc.Sprite);
        this.numLabel = this.node.getChildByName("num").getComponent(cc.Label);
        this.btnBuy = this.node.getChildByName("btnBuy");
        this.priceLabel = this.btnBuy.getChildByName("pricelabel").getComponent(cc.Label);
        this.onTouch(this.btnBuy, this.onTouchBuy, this);
      };
      KeyItem.prototype.setData = function(data) {
        this.icon.spriteFrame = SpriteManager_1.default.shopRewardIcon[data.spriteId];
        this.numLabel.string = "X" + data.keys;
        this.priceLabel.string = "$ " + data.price;
      };
      KeyItem.prototype.onTouchBuy = function() {
        cc.game.emit(EventName_1.GameEvent.SHOW_PAYWAY_PAGE, 1);
      };
      return KeyItem;
    }(BaseItem_1.default);
    var RewardItem = function(_super) {
      __extends(RewardItem, _super);
      function RewardItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.icon = null;
        _this.numLabel = null;
        return _this;
      }
      RewardItem.prototype.init = function() {
        this.icon = this.node.getChildByName("icon").getComponent(cc.Sprite);
        this.numLabel = this.node.getChildByName("num").getComponent(cc.Label);
      };
      RewardItem.prototype.setData = function(data) {
        this.icon.spriteFrame = SpriteManager_1.default.shopRewardIcon[RewardConfig[data.key]];
        this.numLabel.string = "x" + data.value;
      };
      return RewardItem;
    }(BaseItem_1.default);
    var DaoJuItem = function(_super) {
      __extends(DaoJuItem, _super);
      function DaoJuItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.rewardList = null;
        _this.btnBuy = null;
        _this.rewardItem = null;
        _this.nowData = null;
        return _this;
      }
      DaoJuItem.prototype.init = function() {
        this.btnBuy = this.node.getChildByName("btnBuy");
        this.priceLabel = this.btnBuy.getChildByName("pricelabel").getComponent(cc.Label);
        this.rewardList = this.node.getChildByName("rewardList");
        this.rewardItem = cc.find("rewardItem", this.node);
        this.onTouch(this.btnBuy, this.onTouchBuy, this);
      };
      DaoJuItem.prototype.setData = function(data) {
        this.nowData = data;
        console.log(data, "-----------");
        this.priceLabel.string = "$ " + data.amount;
        var arr = [];
        for (var key in data.items) arr.push({
          key: key,
          value: data.items[key]
        });
        this.CreateListItem(this.rewardList, this.rewardItem, arr, RewardItem);
      };
      DaoJuItem.prototype.onTouchBuy = function() {
        console.log(this.nowData, "\u5f53\u524d\u5546\u54c1\u6570\u636e");
        cc.game.emit(EventName_1.GameEvent.SHOW_PAYWAY_PAGE, this.nowData.goods_id);
      };
      return DaoJuItem;
    }(BaseItem_1.default);
    var ShopLayer = function(_super) {
      __extends(ShopLayer, _super);
      function ShopLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.panel = null;
        _this.btnLayout = null;
        _this.btnLiBao = null;
        _this.btnDaoJu = null;
        _this.btnSkin = null;
        _this.libaoItem = null;
        _this.daojuItem = null;
        _this.content = null;
        _this.comingSoon = null;
        _this.star = null;
        _this.panelType = null;
        _this.payWayPage = null;
        _this.closeBtn = null;
        return _this;
      }
      ShopLayer.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.panel = cc.find("style/panel", this.node);
        this.btnLayout = cc.find("bg1/btnlayout", this.panel);
        this.btnLiBao = cc.find("btnlibao", this.btnLayout);
        this.btnDaoJu = cc.find("btndaoju", this.btnLayout);
        this.btnSkin = cc.find("btnpifu", this.btnLayout);
        this.libaoItem = cc.find("libaoItem", this.node);
        this.daojuItem = cc.find("daojuItem", this.node);
        this.content = cc.find("view/mask/content", this.panel);
        this.comingSoon = cc.find("style/panel/jingqingqidai", this.node);
        this.star = cc.find("style/panel/xingqiu", this.node);
        this.payWayPage = cc.find("payWay", this.node);
        this.closeBtn = cc.find("style/panel/btn_close", this.node);
        this.onTouch(this.btnLiBao, this.onTouchLiBao, this);
        this.onTouch(this.btnDaoJu, this.onTouchDaoJu, this);
        this.onTouch(this.btnSkin, this.onTouchSkin, this);
        this.onTouch(this.closeBtn, this.onCloseBtnClick, this);
        this.payWayPage.active = false;
        cc.game.on(EventName_1.GameEvent.SHOW_PAYWAY_PAGE, this.SHOW_PAYWAY_PAGE, this);
      };
      ShopLayer.prototype.onCloseBtnClick = function() {
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.SHOP, false);
      };
      ShopLayer.prototype.SHOW_PAYWAY_PAGE = function(goodsId) {
        var _this = this;
        GlobalVar_1.GlobalVar.currentBuyGoodsId = goodsId;
        HttpCom_1.HttpCom.getPayWay(goodsId, function(payWays) {
          var payWay = _this.payWayPage.getComponent(PayWay_1.default);
          payWay.init(payWays);
          _this.payWayPage.active = true;
        });
      };
      ShopLayer.prototype.show = function() {
        _super.prototype.show.call(this);
        this.payWayPage.active = false;
        this.initPanel();
      };
      ShopLayer.prototype.initPanel = function() {
        var _this = this;
        null == this.panelType && (this.panelType = PanelType.LiBao);
        this.removeItem();
        this.comingSoon.active = false;
        this.star.active = false;
        if (this.panelType == PanelType.LiBao) HttpCom_1.HttpCom.goodsList("package", function(res) {
          var arr = _this.createListContent("package", res.data);
          _this.CreateListItem(_this.content, _this.libaoItem, arr, LiBaoItem);
        }); else if (this.panelType == PanelType.DaoJu) HttpCom_1.HttpCom.goodsList("item", function(res) {
          var arr = _this.createListContent("item", res.data);
          _this.CreateListItem(_this.content, _this.daojuItem, arr, DaoJuItem);
        }); else if (this.panelType == PanelType.Skin) {
          HttpCom_1.HttpCom.goodsList("skin");
          this.comingSoon.active = true;
          this.star.active = true;
        }
        this.updateBtn();
      };
      ShopLayer.prototype.createListContent = function(name, res) {
        var arr = [];
        for (var i = 0; i < res.length; i++) res[i].tab == name && arr.push(res[i]);
        return arr;
      };
      ShopLayer.prototype.updateBtn = function() {
        this.btnLiBao.getComponent(cc.Sprite).spriteFrame = this.panelType == PanelType.LiBao ? SpriteManager_1.default.shopBtnIcon[0] : SpriteManager_1.default.shopBtnIcon[1];
        this.btnDaoJu.getComponent(cc.Sprite).spriteFrame = this.panelType == PanelType.DaoJu ? SpriteManager_1.default.shopBtnIcon[0] : SpriteManager_1.default.shopBtnIcon[1];
        this.btnSkin.getComponent(cc.Sprite).spriteFrame = this.panelType == PanelType.Skin ? SpriteManager_1.default.shopBtnIcon[0] : SpriteManager_1.default.shopBtnIcon[1];
      };
      ShopLayer.prototype.onTouchLiBao = function() {
        if (this.panelType == PanelType.LiBao) return;
        this.panelType = PanelType.LiBao;
        this.initPanel();
      };
      ShopLayer.prototype.onTouchDaoJu = function() {
        if (this.panelType == PanelType.DaoJu) return;
        this.panelType = PanelType.DaoJu;
        this.initPanel();
      };
      ShopLayer.prototype.onTouchSkin = function() {
        if (this.panelType == PanelType.Skin) return;
        this.panelType = PanelType.Skin;
        this.initPanel();
      };
      ShopLayer.prototype.removeItem = function() {
        var child = this.content.children;
        for (var i = child.length - 1; i >= 0; i--) PoolManager_1.default.instance.putNode(child[i]);
      };
      ShopLayer = __decorate([ ccclass ], ShopLayer);
      return ShopLayer;
    }(BaseLanguageLayer_1.default);
    exports.default = ShopLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../Languages": "Languages",
    "../StaticInstance": "StaticInstance",
    "../data/EventName": "EventName",
    "../data/GlobalVar": "GlobalVar",
    "../manager/DataManager": "DataManager",
    "../manager/PoolManager": "PoolManager",
    "../manager/SpriteManager": "SpriteManager",
    "../net/HttpCom": "HttpCom",
    "../pay/PayWay": "PayWay",
    "./BaseItem": "BaseItem",
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
    var Languages_1 = require("../Languages");
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
        if (DataManager_1.default.instance.isSkilling) return;
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        var keys = 1;
        DataManager_1.default.instance.skillIndex > 1 && (keys = 2);
        if (DataManager_1.default.instance.keys < keys) {
          console.log("\u94a5\u5319\u4e0d\u591f");
          ToastManager_1.default.instance.show(Languages_1.Languages["toast5"][DataManager_1.default.instance.language], {
            gravity: "TOP",
            bg_color: cc.color(226, 69, 109, 255)
          });
        } else {
          console.log(DataManager_1.default.instance.skillIndex, keys, "-------------------");
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
    "../Languages": "Languages",
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
        _this.taskSelectSprite = [];
        _this.taskItemIconSprite = [];
        _this.taskRewardIconSprite = [];
        _this.shopBtnSprite = [];
        _this.shopRewardSprite = [];
        _this.shareRewardDiSprite = [];
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
        SpriteManager_1.taskSelectIcon = this.taskSelectSprite;
        SpriteManager_1.taskItemIcon = this.taskItemIconSprite;
        SpriteManager_1.taskRewardIcon = this.taskRewardIconSprite;
        SpriteManager_1.shopBtnIcon = this.shopBtnSprite;
        SpriteManager_1.shopRewardIcon = this.shopRewardSprite;
        SpriteManager_1.shareRewardDi = this.shareRewardDiSprite;
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
      SpriteManager.taskSelectIcon = [];
      SpriteManager.taskItemIcon = [];
      SpriteManager.taskRewardIcon = [];
      SpriteManager.shopBtnIcon = [];
      SpriteManager.shopRewardIcon = [];
      SpriteManager.shareRewardDi = [];
      __decorate([ property(cc.SpriteFrame) ], SpriteManager.prototype, "modelSpriteFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], SpriteManager.prototype, "taskIconSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], SpriteManager.prototype, "shopIconSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], SpriteManager.prototype, "shareIconSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], SpriteManager.prototype, "custemPuSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], SpriteManager.prototype, "custemTZSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], SpriteManager.prototype, "settingBtnSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], SpriteManager.prototype, "taskSelectSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], SpriteManager.prototype, "taskItemIconSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], SpriteManager.prototype, "taskRewardIconSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], SpriteManager.prototype, "shopBtnSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], SpriteManager.prototype, "shopRewardSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], SpriteManager.prototype, "shareRewardDiSprite", void 0);
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
    var telegram_ui_1 = require("../cocos-telegram-miniapps/telegram-ui");
    var telegram_web_1 = require("../cocos-telegram-miniapps/telegram-web");
    var EventName_1 = require("../data/EventName");
    var GlobalVar_1 = require("../data/GlobalVar");
    var InterfaceCom_1 = require("../data/InterfaceCom");
    var Enum_1 = require("../Enum");
    var Languages_1 = require("../Languages");
    var AudioManager_1 = require("../manager/AudioManager");
    var DataManager_1 = require("../manager/DataManager");
    var EventManager_1 = require("../manager/EventManager");
    var SpriteManager_1 = require("../manager/SpriteManager");
    var HttpCom_1 = require("../net/HttpCom");
    var StaticInstance_1 = require("../StaticInstance");
    var BaseItem_1 = require("./BaseItem");
    var BaseLanguageLayer_1 = require("./BaseLanguageLayer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PanelType;
    (function(PanelType) {
      PanelType[PanelType["Daily"] = 1] = "Daily";
      PanelType[PanelType["Target"] = 2] = "Target";
    })(PanelType || (PanelType = {}));
    var RewardConfig = {
      coin: 0,
      key: 1,
      hp: 2
    };
    var TaskConfig = {
      round_finish: {
        desc: "round_finish",
        icon: 4
      },
      round_rate_star: {
        desc: "round_rate_star",
        icon: 4
      },
      hp_use: {
        desc: "hp_use",
        icon: 4
      },
      goods_buy: {
        desc: "goods_buy",
        icon: 4
      },
      tg_rss: {
        desc: "tg_rss",
        icon: 4
      },
      tw_follow: {
        desc: "tw_follow",
        icon: 4
      },
      connect_wallet: {
        desc: "jiarupindao",
        icon: 4
      },
      open_bot: {
        desc: "open_bot",
        icon: 0
      },
      tw_content_like: {
        desc: "tw_content_like",
        icon: 1
      },
      hp_use_daily: {
        desc: "hp_use_daily",
        icon: 2
      },
      move_car_daily: {
        desc: "move_car_daily",
        icon: 3
      },
      game_click: {
        desc: "game_click",
        icon: 3
      },
      daily_sign: {
        desc: "daily_sign",
        icon: 3
      }
    };
    var TaskRewardItem = function(_super) {
      __extends(TaskRewardItem, _super);
      function TaskRewardItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.icon = null;
        _this.numLabel = null;
        return _this;
      }
      TaskRewardItem.prototype.init = function() {
        this.icon = this.node.getChildByName("icon").getComponent(cc.Sprite);
        this.numLabel = this.node.getChildByName("numlabel").getComponent(cc.Label);
      };
      TaskRewardItem.prototype.setData = function(data) {
        this.icon.spriteFrame = SpriteManager_1.default.taskRewardIcon[RewardConfig[data.key]];
        this.numLabel.string = "x" + data.num;
      };
      return TaskRewardItem;
    }(BaseItem_1.default);
    var TaskItem = function(_super) {
      __extends(TaskItem, _super);
      function TaskItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.icon = null;
        _this.describeLabel = null;
        _this.btnGo = null;
        _this.progressLabel = null;
        _this.content = null;
        _this.taskRewardItem = null;
        _this.nowData = null;
        _this.isClick = false;
        return _this;
      }
      TaskItem.prototype.init = function() {
        this.icon = this.node.getChildByName("icon").getComponent(cc.Sprite);
        this.describeLabel = this.node.getChildByName("label").getComponent(cc.Label);
        this.btnGo = this.node.getChildByName("btnGo");
        this.content = this.node.getChildByName("rewardList");
        this.progressLabel = this.node.getChildByName("progress").getComponent(cc.Label);
        this.taskRewardItem = cc.find("taskRewardItem", this.node);
        this.addTrendsLabel(this.describeLabel.node);
      };
      TaskItem.prototype.onTouchGo = function() {
        var _this = this;
        if (!this.isClick) return;
        AudioManager_1.default.instance.playSound(Enum_1.ENUM_AUDIO_CLIP.CLICK);
        console.log(this.nowData.task_id, "\u4efb\u52a1id");
        if (1 == this.nowData.can_receive) {
          this.isClick = false;
          HttpCom_1.HttpCom.taskReceiveReward(this.nowData.task_id, function(res) {
            console.log(res, "\u9886\u53d6\u4efb\u52a1");
            DataManager_1.default.instance.coin = res.data.coin;
            DataManager_1.default.instance.keys = res.data.key;
            GlobalVar_1.GlobalVar.userInfo.hp = res.data.hp;
            EventManager_1.default.instance.emit(EventManager_1.EventType.UPDATE_TASK_PANEL);
            EventManager_1.default.instance.emit(EventManager_1.EventType.UPDATE_POWER_LABEL);
            EventManager_1.default.instance.emit(EventManager_1.EventType.UPDATE_KEY_LABEL);
            EventManager_1.default.instance.emit(EventManager_1.EventType.UPDATE_COIN_LABEL);
            _this.isClick = true;
            _this.offTouch(_this.btnGo);
          });
        } else if (this.nowData.is_receive) ; else switch (this.nowData.module) {
         case InterfaceCom_1.TaskModule.connect_wallet:
          console.log("\u8fde\u63a5\u94b1\u5305\u4efb\u52a1");
          telegram_ui_1.TonConnectUi.Instance.isTonConnected() ? HttpCom_1.HttpCom.taskProcess(this.nowData.task_id, function() {
            EventManager_1.default.instance.emit(EventManager_1.EventType.UPDATE_TASK_PANEL);
          }) : telegram_ui_1.TonConnectUi.Instance.openModal();
          break;

         case InterfaceCom_1.TaskModule.daily_sign:
          console.log("\u6bcf\u65e5\u94b1\u5305\u7b7e\u5230\u4efb\u52a1");
          cc.game.emit(EventName_1.GameEvent.TON_DAILY_SIGN);
          break;

         case InterfaceCom_1.TaskModule.game_click:
         case InterfaceCom_1.TaskModule.open_bot:
         case InterfaceCom_1.TaskModule.tw_content_like:
         case InterfaceCom_1.TaskModule.tg_rss:
         case InterfaceCom_1.TaskModule.tw_follow:
          console.log("\u8fde\u63a5\u94b1\u5305\u4efb\u52a1");
          if (this.nowData.extra && "jump" == this.nowData.extra.action) {
            telegram_web_1.TelegramWebApp.Instance.openTelegramLink(this.nowData.extra.url);
            HttpCom_1.HttpCom.taskProcess(this.nowData.task_id, function() {
              EventManager_1.default.instance.emit(EventManager_1.EventType.UPDATE_TASK_PANEL);
            });
          }
          break;

         case InterfaceCom_1.TaskModule.goods_buy:
          console.log("\u8d2d\u4e70\u5546\u54c1\u4efb\u52a1");
          StaticInstance_1.StaticInstance.transitionsManager.panelJumpTo(Enum_1.ENUM_UI_TYPE.TASK, Enum_1.ENUM_UI_TYPE.SHOP);
          break;

         case InterfaceCom_1.TaskModule.hp_use:
         case InterfaceCom_1.TaskModule.move_car_daily:
         case InterfaceCom_1.TaskModule.hp_use_daily:
         case InterfaceCom_1.TaskModule.round_finish:
         case InterfaceCom_1.TaskModule.round_rate_star:
          console.log("\u8df3\u8f6c\u5173\u5361\u4efb\u52a1");
          StaticInstance_1.StaticInstance.transitionsManager.panelJumpTo(Enum_1.ENUM_UI_TYPE.TASK, Enum_1.ENUM_UI_TYPE.LEVEL_SELECT);
        }
      };
      TaskItem.prototype.setData = function(data) {
        this.nowData = data;
        this.onTouch(this.btnGo, this.onTouchGo, this);
        this.isClick = true;
        this.icon.spriteFrame = SpriteManager_1.default.taskItemIcon[TaskConfig[data.module].icon];
        var str = Languages_1.Languages[TaskConfig[data.module].desc][DataManager_1.default.instance.language];
        if ("round_finish" == data.module) {
          var num = 10 * data.target_num;
          str = str.replace("{number}", num.toString());
          this.describeLabel.string = str;
        } else if ("round_rate_star" == data.module) {
          str = str.replace("{number}", data.target_num.toString());
          this.describeLabel.string = str;
        } else if ("hp_use" == data.module) {
          str = str.replace("{number}", data.target_num.toString());
          this.describeLabel.string = str;
        } else if ("hp_use_daily" == data.module) {
          str = str.replace("{number}", data.target_num.toString());
          this.describeLabel.string = str;
        } else if ("move_car_daily" == data.module) {
          str = str.replace("{number}", data.target_num.toString());
          this.describeLabel.string = str;
        } else this.describeLabel.string = Languages_1.Languages[TaskConfig[data.module].desc][DataManager_1.default.instance.language];
        var arr = [];
        for (var key in data.rewards) arr.push({
          key: key,
          num: data.rewards[key]
        });
        this.CreateListItem(this.content, this.taskRewardItem, arr, TaskRewardItem);
        this.progressLabel.string = data.task_process + "/" + data.target_num;
        if (data.is_receive) {
          this.btnGo.getChildByName("label").getComponent(cc.Label).string = Languages_1.Languages["yilingqv"][DataManager_1.default.instance.language];
          this.offTouch(this.btnGo);
        } else data.can_receive ? this.btnGo.getChildByName("label").getComponent(cc.Label).string = Languages_1.Languages["kelingqv"][DataManager_1.default.instance.language] : this.btnGo.getChildByName("label").getComponent(cc.Label).string = "Go";
      };
      return TaskItem;
    }(BaseItem_1.default);
    var TaskLayer = function(_super) {
      __extends(TaskLayer, _super);
      function TaskLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.panel = null;
        _this.taskItem = null;
        _this.content = null;
        _this.btnDaily = null;
        _this.btnTarget = null;
        _this.panelType = null;
        _this.mode = null;
        _this.closeBtn = null;
        return _this;
      }
      TaskLayer.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.panel = cc.find("style/panel", this.node);
        this.taskItem = cc.find("taskItem", this.node);
        this.content = cc.find("view/content", this.panel);
        this.mode = cc.find("btn", this.panel).getComponent(cc.Sprite);
        this.btnDaily = cc.find("btnmeiri", this.mode.node);
        this.btnTarget = cc.find("btnmubiao", this.mode.node);
        this.closeBtn = cc.find("style/panel/btn_close", this.node);
        this.onTouch(this.btnDaily, this.onTouchDaily, this);
        this.onTouch(this.btnTarget, this.onTouchTarget, this);
        this.onTouch(this.closeBtn, this.onCloseBtnClick, this);
        EventManager_1.default.instance.on(EventManager_1.EventType.UPDATE_TASK_PANEL, this.updatePanel, this);
      };
      TaskLayer.prototype.onCloseBtnClick = function() {
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.TASK, false);
      };
      TaskLayer.prototype.show = function() {
        _super.prototype.show.call(this);
        this.initPanel();
      };
      TaskLayer.prototype.initPanel = function() {
        var _this = this;
        null == this.panelType && (this.panelType = PanelType.Daily);
        this.panelType == PanelType.Daily ? HttpCom_1.HttpCom.taskList("daily", function(res) {
          _this.mode.spriteFrame = SpriteManager_1.default.taskSelectIcon[0];
          _this.CreateListItem(_this.content, _this.taskItem, res.data, TaskItem);
        }) : HttpCom_1.HttpCom.taskList("resident", function(res) {
          _this.mode.spriteFrame = SpriteManager_1.default.taskSelectIcon[1];
          _this.CreateListItem(_this.content, _this.taskItem, res.data, TaskItem);
        });
      };
      TaskLayer.prototype.updatePanel = function() {
        this.initPanel();
      };
      TaskLayer.prototype.onTouchDaily = function() {
        if (this.panelType == PanelType.Daily) return;
        this.panelType = PanelType.Daily;
        this.initPanel();
      };
      TaskLayer.prototype.onTouchTarget = function() {
        if (this.panelType == PanelType.Target) return;
        this.panelType = PanelType.Target;
        this.initPanel();
      };
      TaskLayer = __decorate([ ccclass ], TaskLayer);
      return TaskLayer;
    }(BaseLanguageLayer_1.default);
    exports.default = TaskLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../Languages": "Languages",
    "../StaticInstance": "StaticInstance",
    "../cocos-telegram-miniapps/telegram-ui": "telegram-ui",
    "../cocos-telegram-miniapps/telegram-web": "telegram-web",
    "../data/EventName": "EventName",
    "../data/GlobalVar": "GlobalVar",
    "../data/InterfaceCom": "InterfaceCom",
    "../manager/AudioManager": "AudioManager",
    "../manager/DataManager": "DataManager",
    "../manager/EventManager": "EventManager",
    "../manager/SpriteManager": "SpriteManager",
    "../net/HttpCom": "HttpCom",
    "./BaseItem": "BaseItem",
    "./BaseLanguageLayer": "BaseLanguageLayer"
  } ],
  TestNet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1c8aahSjEdNkJSXSkjI1I/x", "TestNet");
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
    var EventName_1 = require("../data/EventName");
    var GlobalVar_1 = require("../data/GlobalVar");
    var HttpCom_1 = require("./HttpCom");
    var WssCom_1 = require("./WssCom");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TestNet = function(_super) {
      __extends(TestNet, _super);
      function TestNet() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      TestNet.prototype.start = function() {};
      TestNet.prototype.login = function() {
        HttpCom_1.HttpCom.login(null, function() {});
      };
      TestNet.prototype.checkin = function() {
        HttpCom_1.HttpCom.checkin(function() {});
      };
      TestNet.prototype.setting = function() {
        HttpCom_1.HttpCom.setting("en");
      };
      TestNet.prototype.map = function() {
        HttpCom_1.HttpCom.map(function() {});
      };
      TestNet.prototype.startLevelPT = function() {
        HttpCom_1.HttpCom.start(1, 0);
      };
      TestNet.prototype.startLevelTZ = function() {
        HttpCom_1.HttpCom.start(1, 1);
      };
      TestNet.prototype.end = function() {
        HttpCom_1.HttpCom.end();
      };
      TestNet.prototype.goodList = function() {
        HttpCom_1.HttpCom.goodsList("item");
      };
      TestNet.prototype.goodList1 = function() {
        HttpCom_1.HttpCom.goodsList("package");
      };
      TestNet.prototype.buy = function() {
        HttpCom_1.HttpCom.buy(1, EventName_1.PayType.ton);
      };
      TestNet.prototype.taskList = function() {
        HttpCom_1.HttpCom.taskList("daily");
      };
      TestNet.prototype.taskList1 = function() {
        HttpCom_1.HttpCom.taskList("resident");
      };
      TestNet.prototype.taskReceiveReward = function() {
        HttpCom_1.HttpCom.taskReceiveReward(1);
      };
      TestNet.prototype.checkChannelJoin = function() {
        HttpCom_1.HttpCom.checkChannelJoin();
      };
      TestNet.prototype.wssOpen = function() {
        GlobalVar_1.GlobalVar.wss = new WssCom_1.WssCom();
        GlobalVar_1.GlobalVar.wss.initWs();
      };
      TestNet.prototype.wss_set_car_nums = function() {
        GlobalVar_1.GlobalVar.wss.set_car_nums(30);
      };
      TestNet.prototype.wss_crash_car = function() {
        GlobalVar_1.GlobalVar.wss.crash_car();
      };
      TestNet.prototype.wss_move_car = function() {
        GlobalVar_1.GlobalVar.wss.move_car();
      };
      TestNet = __decorate([ ccclass ], TestNet);
      return TestNet;
    }(cc.Component);
    exports.default = TestNet;
    cc._RF.pop();
  }, {
    "../data/EventName": "EventName",
    "../data/GlobalVar": "GlobalVar",
    "./HttpCom": "HttpCom",
    "./WssCom": "WssCom"
  } ],
  ToastLayer1: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9902eUf0hlF+YYfaHB/zZM9", "ToastLayer1");
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
    var DataManager_1 = require("../manager/DataManager");
    var StaticInstance_1 = require("../StaticInstance");
    var BaseLanguageLayer_1 = require("./BaseLanguageLayer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ToastLayer1 = function(_super) {
      __extends(ToastLayer1, _super);
      function ToastLayer1() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.panel = null;
        _this.tipsLabel = null;
        return _this;
      }
      ToastLayer1.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.panel = cc.find("style/panel", this.node);
        this.tipsLabel = cc.find("tip", this.panel).getComponent(cc.Label);
      };
      ToastLayer1.prototype.show = function(data) {
        _super.prototype.show.call(this);
        data && Languages_1.Languages[data] && (this.tipsLabel.string = Languages_1.Languages[data][DataManager_1.default.instance.language]);
      };
      ToastLayer1.prototype.onEnable = function() {
        this.zoomIn(this.panel);
      };
      ToastLayer1.prototype.onClose = function() {
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.TOAST1, false);
      };
      ToastLayer1 = __decorate([ ccclass ], ToastLayer1);
      return ToastLayer1;
    }(BaseLanguageLayer_1.default);
    exports.default = ToastLayer1;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../Languages": "Languages",
    "../StaticInstance": "StaticInstance",
    "../manager/DataManager": "DataManager",
    "./BaseLanguageLayer": "BaseLanguageLayer"
  } ],
  ToastLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cb766+98ahJ9LnjHRbQ6VyQ", "ToastLayer");
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
    var DataManager_1 = require("../manager/DataManager");
    var StaticInstance_1 = require("../StaticInstance");
    var BaseLanguageLayer_1 = require("./BaseLanguageLayer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ToastLayer = function(_super) {
      __extends(ToastLayer, _super);
      function ToastLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.panel = null;
        _this.btnClose = null;
        _this.btnQueDing = null;
        _this.tipsLabel = null;
        return _this;
      }
      ToastLayer.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.panel = cc.find("style/panel", this.node);
        this.btnClose = cc.find("btn_close", this.panel);
        this.btnQueDing = cc.find("btn_submit", this.panel);
        this.tipsLabel = cc.find("tip", this.panel).getComponent(cc.Label);
        this.onTouch(this.btnClose, this.onClose, this);
        this.onTouch(this.btnQueDing, this.onClose, this);
      };
      ToastLayer.prototype.show = function(data) {
        _super.prototype.show.call(this);
        data && Languages_1.Languages[data] && (this.tipsLabel.string = Languages_1.Languages[data][DataManager_1.default.instance.language]);
      };
      ToastLayer.prototype.onEnable = function() {
        this.zoomIn(this.panel);
      };
      ToastLayer.prototype.onClose = function() {
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.TOAST, false);
      };
      ToastLayer = __decorate([ ccclass ], ToastLayer);
      return ToastLayer;
    }(BaseLanguageLayer_1.default);
    exports.default = ToastLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../Languages": "Languages",
    "../StaticInstance": "StaticInstance",
    "../manager/DataManager": "DataManager",
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
    var DataManager_1 = require("./DataManager");
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
      UIManager.prototype.toggle = function(key, status, callback, data) {
        void 0 === status && (status = true);
        if (this.uiMap.has(key)) {
          var layer = this.uiMap.get(key);
          status ? layer.show(data) : layer.hide();
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
        status ? 1 == DataManager_1.default.instance.nowRoundConfig.is_special && (null === layer || void 0 === layer ? void 0 : layer.onTimerStart()) : null === layer || void 0 === layer ? void 0 : layer.onTimerStop();
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
    "./DataManager": "DataManager",
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
      UITransitionControl.prototype.panelJumpTo = function(from, to) {
        void 0 === from && (from = null);
        void 0 === to && (to = null);
        from && StaticInstance_1.StaticInstance.uiManager.toggle(from, false);
        to && StaticInstance_1.StaticInstance.uiManager.toggle(to);
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
    var EventName_1 = require("../data/EventName");
    var Languages_1 = require("../Languages");
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
          ToastManager_1.default.instance.show(Languages_1.Languages["toast1"][DataManager_1.default.instance.language], {
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
        console.log("\u70b9\u51fb\u5206\u4eab\u6309\u94ae");
        cc.game.emit(EventName_1.GameEvent.OPEN_INVITE_URL);
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
    "../Languages": "Languages",
    "../data/EventName": "EventName",
    "../manager/AudioManager": "AudioManager",
    "../manager/DataManager": "DataManager",
    "../manager/SdkManager": "SdkManager",
    "../manager/ToastManager": "ToastManager",
    "./../StaticInstance": "StaticInstance",
    "./HeaderLayer": "HeaderLayer"
  } ],
  WinPTLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "42216kHifhM/YryNV6LNQl7", "WinPTLayer");
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
    var EventName_1 = require("../data/EventName");
    var GlobalVar_1 = require("../data/GlobalVar");
    var Enum_1 = require("../Enum");
    var Languages_1 = require("../Languages");
    var DataManager_1 = require("../manager/DataManager");
    var EventManager_1 = require("../manager/EventManager");
    var ToastManager_1 = require("../manager/ToastManager");
    var HttpCom_1 = require("../net/HttpCom");
    var StaticInstance_1 = require("../StaticInstance");
    var BaseLanguageLayer_1 = require("./BaseLanguageLayer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WinPTLayer = function(_super) {
      __extends(WinPTLayer, _super);
      function WinPTLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.buttons = null;
        _this.btnShare = null;
        _this.btnNext = null;
        _this.cionLabel = null;
        _this.btnClose = null;
        return _this;
      }
      WinPTLayer.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.buttons = cc.find("style/panel/buttons", this.node);
        this.btnShare = cc.find("btn_share", this.buttons);
        this.btnNext = cc.find("btn_next", this.buttons);
        this.btnClose = cc.find("bgshade", this.node);
        this.cionLabel = cc.find("style/panel/cionLabel", this.node).getComponent(cc.Label);
        this.onTouch(this.btnShare, this.onShare, this);
        this.onTouch(this.btnNext, this.onNext, this);
        this.onTouch(this.btnClose, this.onClose, this, 1);
      };
      WinPTLayer.prototype.show = function() {
        _super.prototype.show.call(this);
        this.node.active = false;
        this.initPanel();
        console.log(DataManager_1.default.instance.level, "\u5f53\u524d\u5173\u5361");
        console.log(GlobalVar_1.GlobalVar.maxLevel, "\u6700\u5927\u5173\u5361");
        DataManager_1.default.instance.level >= GlobalVar_1.GlobalVar.maxLevel ? this.btnNext.active = false : this.btnNext.active = true;
      };
      WinPTLayer.prototype.onShare = function() {
        console.log("\u70b9\u51fb\u5206\u4eab\u6309\u94ae");
        cc.game.emit(EventName_1.GameEvent.OPEN_INVITE_URL);
      };
      WinPTLayer.prototype.onClose = function() {
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.WINPT, false);
        EventManager_1.default.instance.emit(EventManager_1.EventType.CLOSE_LEVEL_BTN);
        StaticInstance_1.StaticInstance.gameManager.removealllevel();
      };
      WinPTLayer.prototype.onNext = function() {
        if (!GlobalVar_1.GlobalVar.isWssReady) {
          console.log("wss\u672a\u8fde\u63a5\u6210\u529f");
          return;
        }
        if (Number(GlobalVar_1.GlobalVar.userInfo.hp.value) < 5) {
          ToastManager_1.default.instance.show(Languages_1.Languages["toast1"][DataManager_1.default.instance.language], {
            gravity: "TOP",
            bg_color: cc.color(226, 69, 109, 255)
          });
          return;
        }
        var level = DataManager_1.default.instance.level + 1;
        HttpCom_1.HttpCom.start(level, 0, function(res) {
          var data = res.data;
          DataManager_1.default.instance.level = level;
          GlobalVar_1.GlobalVar.userInfo.hp.value = String(data.hp.value);
          GlobalVar_1.GlobalVar.userInfo.hp.last_cd_time = data.hp.last_cd_time;
          DataManager_1.default.instance.nowRoundConfig = data.round_config;
          DataManager_1.default.instance.seconds = data.round_config.time_limit;
          EventManager_1.default.instance.emit(EventManager_1.EventType.UPDATE_POWER_LABEL);
          DataManager_1.default.instance.mode = Enum_1.ENUM_GAME_MODE.TIMER;
          StaticInstance_1.StaticInstance.transitionsManager.play(Enum_1.ENUM_UI_TYPE.WINPT, null, function() {
            StaticInstance_1.StaticInstance.gameManager.onGameLevelStart();
            DataManager_1.default.instance.isWssComplete = false;
            GlobalVar_1.GlobalVar.wss.set_car_nums(DataManager_1.default.instance.carNum);
          });
        });
      };
      WinPTLayer.prototype.initPanel = function() {
        var _this = this;
        HttpCom_1.HttpCom.end(function(res) {
          _this.node.active = true;
          var data = res.data;
          _this.cionLabel.string = "+" + DataManager_1.default.instance.formatBytes(data.rewards.coin);
          DataManager_1.default.instance.coin = data.coin;
          GlobalVar_1.GlobalVar.userInfo.hp.value = data.hp.value;
          GlobalVar_1.GlobalVar.userInfo.hp.last_cd_time = data.hp.last_cd_time;
          GlobalVar_1.GlobalVar.userInfo.key = data.key;
          EventManager_1.default.instance.emit(EventManager_1.EventType.UPDATE_COIN_LABEL);
        });
      };
      WinPTLayer = __decorate([ ccclass ], WinPTLayer);
      return WinPTLayer;
    }(BaseLanguageLayer_1.default);
    exports.default = WinPTLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../Languages": "Languages",
    "../StaticInstance": "StaticInstance",
    "../data/EventName": "EventName",
    "../data/GlobalVar": "GlobalVar",
    "../manager/DataManager": "DataManager",
    "../manager/EventManager": "EventManager",
    "../manager/ToastManager": "ToastManager",
    "../net/HttpCom": "HttpCom",
    "./BaseLanguageLayer": "BaseLanguageLayer"
  } ],
  WinTZLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cd070+NZL5GQpvKfAF77L5x", "WinTZLayer");
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
    var EventName_1 = require("../data/EventName");
    var GlobalVar_1 = require("../data/GlobalVar");
    var Enum_1 = require("../Enum");
    var Languages_1 = require("../Languages");
    var DataManager_1 = require("../manager/DataManager");
    var EventManager_1 = require("../manager/EventManager");
    var ToastManager_1 = require("../manager/ToastManager");
    var HttpCom_1 = require("../net/HttpCom");
    var StaticInstance_1 = require("../StaticInstance");
    var BaseLanguageLayer_1 = require("./BaseLanguageLayer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WinTZLayer = function(_super) {
      __extends(WinTZLayer, _super);
      function WinTZLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.btnShare = null;
        _this.btnNext = null;
        _this.cionLabel = null;
        _this.rateNode = null;
        _this.count = 0;
        _this.btnClose = null;
        return _this;
      }
      WinTZLayer.prototype.onLoad = function() {
        _super.prototype.onLoad.call(this);
        this.btnShare = cc.find("style/panel/buttons/btn_share", this.node);
        this.btnNext = cc.find("style/panel/buttons/btn_next", this.node);
        this.btnClose = cc.find("bgshade", this.node);
        this.cionLabel = cc.find("style/panel/daibinum", this.node).getComponent(cc.Label);
        this.rateNode = cc.find("style/panel/stars", this.node);
        this.onTouch(this.btnShare, this.onTouchShare, this);
        this.onTouch(this.btnNext, this.onTouchNext, this);
        this.onTouch(this.btnClose, this.onTouchClose, this, 1);
      };
      WinTZLayer.prototype.show = function() {
        var _this = this;
        this.count++;
        console.log(this.count, "\u8c03\u7528\u6b21\u6570");
        _super.prototype.show.call(this);
        this.node.active = false;
        DataManager_1.default.instance.level >= GlobalVar_1.GlobalVar.maxLevel ? this.btnNext.active = false : this.btnNext.active = true;
        HttpCom_1.HttpCom.end(function(res) {
          console.log(res);
          _this.node.active = true;
          _this.cionLabel.string = DataManager_1.default.instance.formatBytes(res.data.rewards.coin);
          _this.updateRate(res.data.rate);
          DataManager_1.default.instance.coin = res.data.coin;
          GlobalVar_1.GlobalVar.userInfo.hp.value = res.data.hp.value;
          GlobalVar_1.GlobalVar.userInfo.hp.last_cd_time = res.data.hp.last_cd_time;
          GlobalVar_1.GlobalVar.userInfo.key = res.data.key;
          EventManager_1.default.instance.emit(EventManager_1.EventType.UPDATE_COIN_LABEL);
        });
      };
      WinTZLayer.prototype.updateRate = function(rate) {
        this.rateNode.children.forEach(function(e, i) {
          e.children[0].active = false;
        });
        for (var i = 0; i < rate; i++) this.rateNode.children[i].children[0].active = true;
      };
      WinTZLayer.prototype.onClose = function() {
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.WINTZ, false);
      };
      WinTZLayer.prototype.onTouchShare = function() {
        console.log("\u70b9\u51fb\u5206\u4eab\u6309\u94ae");
        cc.game.emit(EventName_1.GameEvent.OPEN_INVITE_URL);
      };
      WinTZLayer.prototype.onTouchNext = function() {
        var _this = this;
        if (Number(GlobalVar_1.GlobalVar.userInfo.hp.value) < 5) {
          ToastManager_1.default.instance.show(Languages_1.Languages["toast1"][DataManager_1.default.instance.language], {
            gravity: "TOP",
            bg_color: cc.color(226, 69, 109, 255)
          });
          return;
        }
        var level = DataManager_1.default.instance.level + 1;
        HttpCom_1.HttpCom.start(level, 1, function(res) {
          _this.onClose();
          var data = res.data;
          DataManager_1.default.instance.level = level;
          GlobalVar_1.GlobalVar.userInfo.hp.value = String(data.hp.value);
          GlobalVar_1.GlobalVar.userInfo.hp.last_cd_time = data.hp.last_cd_time;
          DataManager_1.default.instance.nowRoundConfig = data.round_config;
          DataManager_1.default.instance.seconds = data.round_config.time_limit;
          EventManager_1.default.instance.emit(EventManager_1.EventType.UPDATE_POWER_LABEL);
          DataManager_1.default.instance.mode = Enum_1.ENUM_GAME_MODE.TIMER;
          StaticInstance_1.StaticInstance.transitionsManager.play(Enum_1.ENUM_UI_TYPE.WINTZ, null, function() {
            StaticInstance_1.StaticInstance.gameManager.onGameLevelStart();
            DataManager_1.default.instance.isWssComplete = false;
            GlobalVar_1.GlobalVar.wss.set_car_nums(DataManager_1.default.instance.carNum);
            1 == DataManager_1.default.instance.nowRoundConfig.is_special && (DataManager_1.default.instance.isTimerStart || StaticInstance_1.StaticInstance.uiManager.setMainTimer());
          });
        });
      };
      WinTZLayer.prototype.onTouchClose = function() {
        StaticInstance_1.StaticInstance.uiManager.toggle(Enum_1.ENUM_UI_TYPE.WINTZ, false);
        EventManager_1.default.instance.emit(EventManager_1.EventType.CLOSE_LEVEL_BTN);
        StaticInstance_1.StaticInstance.gameManager.removealllevel();
      };
      WinTZLayer = __decorate([ ccclass ], WinTZLayer);
      return WinTZLayer;
    }(BaseLanguageLayer_1.default);
    exports.default = WinTZLayer;
    cc._RF.pop();
  }, {
    "../Enum": "Enum",
    "../Languages": "Languages",
    "../StaticInstance": "StaticInstance",
    "../data/EventName": "EventName",
    "../data/GlobalVar": "GlobalVar",
    "../manager/DataManager": "DataManager",
    "../manager/EventManager": "EventManager",
    "../manager/ToastManager": "ToastManager",
    "../net/HttpCom": "HttpCom",
    "./BaseLanguageLayer": "BaseLanguageLayer"
  } ],
  WssCom: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a15b9AWvxJCcbuA5573daKp", "WssCom");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WssCom = void 0;
    var GlobalVar_1 = require("../data/GlobalVar");
    var Config_1 = require("../data/Config");
    var EventName_1 = require("../data/EventName");
    var HttpCom_1 = require("./HttpCom");
    var ToastManager_1 = require("../manager/ToastManager");
    var DataManager_1 = require("../manager/DataManager");
    var EventManager_1 = require("../manager/EventManager");
    var Languages_1 = require("../Languages");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WssCom = function() {
      function WssCom() {
        this.socket = null;
        this.intervalId = null;
      }
      WssCom.prototype.start = function() {};
      WssCom.prototype.initWs = function() {
        var _this = this;
        var token = encodeURIComponent(GlobalVar_1.GlobalVar.token);
        console.log(GlobalVar_1.GlobalVar.token, "GlobalVar.token");
        console.log(token, "token");
        var sign = HttpCom_1.HttpCom.generateSignature({
          token: GlobalVar_1.GlobalVar.token
        });
        console.log(sign, "sign");
        var wssUrl = Config_1.Config.wss + "?token=" + token + "&sign=" + sign;
        console.log(wssUrl, "wssUrl");
        this.socket = new WebSocket(wssUrl);
        this.socket.onclose = function() {
          console.log("ws\u5173\u95ed");
          GlobalVar_1.GlobalVar.isWssReady = false;
          clearInterval(_this.intervalId);
          ToastManager_1.default.instance.show(Languages_1.Languages["toast6"][DataManager_1.default.instance.language], {
            gravity: "TOP",
            bg_color: cc.color(226, 69, 109, 255)
          });
          cc.game.emit(EventName_1.S2C_WssEvent.ON_WSS_CLOSE);
          console.log("ping\u5b9a\u65f6\u5668\u5df2\u505c\u6b62");
        };
        this.socket.onerror = function(ev) {
          console.log("ws\u9519\u8bef");
          console.log(ev);
          cc.game.emit(EventName_1.S2C_WssEvent.ON_WSS_ERROR);
          GlobalVar_1.GlobalVar.isWssReady = false;
        };
        this.socket.onmessage = function(event) {
          if ("PONG" === event.data) return;
          console.log("Received message:", event.data);
          var obj = JSON.parse(event.data);
          switch (obj.code) {
           case 2e3:
           case 2003:
           case 2004:
           case 2005:
            cc.game.emit(EventName_1.S2C_WssEvent.ERROR_MSG, obj);
            break;

           case 2010:
            console.log("\u8f66\u8f86\u79fb\u52a8\u5931\u8d25");
            break;

           case 2011:
            console.log("\u8f66\u8f86\u78b0\u649e\u5931\u8d25");
            break;

           case 2006:
            console.log("\u8bbe\u7f6e\u8f66\u8f86\u6570\u6210\u529f");
            cc.game.emit(EventName_1.S2C_WssEvent.ON_SET_CAR_NUM, obj);
            break;

           case 2007:
            console.log("\u8f66\u8f86\u79fb\u52a8\u6210\u529f");
            cc.game.emit(EventName_1.S2C_WssEvent.ON_MOVE_CAR, obj);
            break;

           case 2008:
            console.log("\u8f66\u8f86\u78b0\u649e\u6210\u529f");
            cc.game.emit(EventName_1.S2C_WssEvent.ON_CRASH_CAR, obj);
            break;

           case 2009:
            console.log("\u79fb\u52a8\u8f66\u8f86\u5956\u52b1");
            cc.game.emit(EventName_1.S2C_WssEvent.ON_CAR_REWARD, obj);
            break;

           case 2001:
            console.log("\u73a9\u5bb6\u5728\u5176\u4ed6\u8bbe\u5907\u767b\u5f55");
            cc.game.emit(EventName_1.S2C_WssEvent.PLAYER_LOGIN_ON_OTHER_DEVICE, obj);
            break;

           case 2013:
            console.log("\u6bcf\u65e5\u7b7e\u5230\u652f\u4ed8\u6210\u529f\u8fd4\u56de");
            cc.game.emit(EventName_1.S2C_WssEvent.DAILY_SIGN_PAY_RESPON_SUCCESS, obj);
            EventManager_1.default.instance.emit(EventManager_1.EventType.UPDATE_TASK_PANEL);
            break;

           case 2014:
            console.log(obj, "\u8d2d\u4e70\u5546\u54c1\u652f\u4ed8\u6210\u529f\u8fd4\u56de");
            ToastManager_1.default.instance.show(Languages_1.Languages["toast7"][DataManager_1.default.instance.language], {
              gravity: "TOP",
              bg_color: cc.color(226, 69, 109, 255)
            });
            DataManager_1.default.instance.coin = obj.data.coin;
            DataManager_1.default.instance.keys = obj.data.key;
            GlobalVar_1.GlobalVar.userInfo.hp.value = obj.data.hp.value;
            EventManager_1.default.instance.emit(EventManager_1.EventType.UPDATE_POWER_LABEL);
            EventManager_1.default.instance.emit(EventManager_1.EventType.UPDATE_KEY_LABEL);
            EventManager_1.default.instance.emit(EventManager_1.EventType.UPDATE_COIN_LABEL);
          }
        };
        this.socket.onopen = function() {
          console.log("ws\u6253\u5f00,\u5f00\u59cb\u53d1\u9001\u5fc3\u8df3");
          ToastManager_1.default.instance.show(Languages_1.Languages["toast8"][DataManager_1.default.instance.language], {
            gravity: "TOP",
            bg_color: cc.color(226, 69, 109, 255)
          });
          GlobalVar_1.GlobalVar.isWssReady = true;
          cc.game.emit(EventName_1.GameEvent.ENABLE_WS_CHECK, true);
          cc.game.emit(EventName_1.S2C_WssEvent.ON_WSS_OPEN);
          DataManager_1.default.instance.isWssComplete = true;
          if (GlobalVar_1.GlobalVar.isFirst) {
            cc.game.emit(EventName_1.GameEvent.CHECK_NEW_PLAYER);
            GlobalVar_1.GlobalVar.isFirst = false;
          }
          _this.intervalId = setInterval(function() {
            _this.socket.send("PING");
          }, 3e3);
        };
      };
      WssCom.prototype.generateRandomString = function(length) {
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var result = "";
        for (var i = 0; i < length; i++) result += charset.charAt(Math.floor(Math.random() * charset.length));
        return result;
      };
      WssCom.prototype.sendMessage = function(data, cb) {
        var sign = HttpCom_1.HttpCom.generateSignature(data);
        data["sign"] = sign;
        var sendJson = JSON.stringify(data);
        this.socket.send(sendJson);
        console.log("Binary message sent:", sendJson);
      };
      WssCom.prototype.set_car_nums = function(carCount, cb) {
        var data = {
          act: "set_car_nums",
          car_nums: carCount,
          player_id: GlobalVar_1.GlobalVar.userInfo.id
        };
        this.sendMessage(data, cb);
      };
      WssCom.prototype.move_car = function(cb) {
        var data = {
          act: "move_car",
          player_id: GlobalVar_1.GlobalVar.userInfo.id
        };
        this.sendMessage(data, cb);
      };
      WssCom.prototype.crash_car = function(cb) {
        var data = {
          act: "crash_car",
          player_id: GlobalVar_1.GlobalVar.userInfo.id
        };
        this.sendMessage(data, cb);
      };
      WssCom = __decorate([ ccclass("WssCom") ], WssCom);
      return WssCom;
    }();
    exports.WssCom = WssCom;
    cc._RF.pop();
  }, {
    "../Languages": "Languages",
    "../data/Config": "Config",
    "../data/EventName": "EventName",
    "../data/GlobalVar": "GlobalVar",
    "../manager/DataManager": "DataManager",
    "../manager/EventManager": "EventManager",
    "../manager/ToastManager": "ToastManager",
    "./HttpCom": "HttpCom"
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
    exports.TonConnectUi = void 0;
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TonConnectUi = function() {
      function TonConnectUi() {
        this._tgConnect = null;
      }
      TonConnectUi_1 = TonConnectUi;
      Object.defineProperty(TonConnectUi, "Instance", {
        get: function() {
          TonConnectUi_1._instance || (TonConnectUi_1._instance = new TonConnectUi_1());
          return TonConnectUi_1._instance;
        },
        enumerable: false,
        configurable: true
      });
      TonConnectUi.prototype.setWallet = function(walletAdd) {
        this.tonWallet = walletAdd;
      };
      TonConnectUi.prototype.toNano = function(ton) {
        return (1e9 * parseFloat(ton)).toString();
      };
      TonConnectUi.prototype.isConnected = function() {
        if (!this._tgConnect) {
          console.error("ton ui not inited!");
          return false;
        }
        return this._tgConnect.connected;
      };
      TonConnectUi.prototype.disconnect = function() {
        if (!this._tgConnect) {
          console.error("ton ui not inited!");
          return;
        }
        this._tgConnect.disconnect();
      };
      TonConnectUi.prototype.account = function() {
        if (!this._tgConnect) {
          console.error("ton ui not inited!");
          return null;
        }
        return this._tgConnect.account;
      };
      TonConnectUi.prototype.parseRaw = function(raw) {
        return raw;
      };
      TonConnectUi.prototype.init = function(manifestUrl, tonWallet, language) {
        return __awaiter(this, void 0, Promise, function() {
          var _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              this.tonWallet = tonWallet;
              _a = this;
              return [ 4, new Promise(function(resolve, reject) {
                var intervalId = setInterval(function() {
                  if (window.TON_CONNECT_UI) {
                    console.log("loading telegram web app sdk success!");
                    var tonConnect = new window["TON_CONNECT_UI"].TonConnectUI({
                      manifestUrl: manifestUrl
                    });
                    tonConnect.uiOptions = {
                      language: language || "en"
                    };
                    resolve(tonConnect);
                    clearInterval(intervalId);
                  }
                }, 100);
              }) ];

             case 1:
              _a._tgConnect = _b.sent();
              return this._tgConnect ? [ 2, Promise.resolve({
                success: true
              }) ] : [ 2, Promise.resolve({
                success: false
              }) ];
            }
          });
        });
      };
      TonConnectUi.prototype.subscribeWallet = function(updateConnect) {
        console.log("subscribe wallet");
        updateConnect();
        if (this._tgConnect) {
          var unsubscribeModal = this._tgConnect.onStatusChange(function(state) {
            console.log("model state changed! : ", state);
            updateConnect();
          });
          var unsubscribeConnectUI = this._tgConnect.onStatusChange(function(info) {
            console.log("wallet info status changed : ", info);
            updateConnect();
          });
        }
      };
      TonConnectUi.prototype.isTonConnected = function() {
        return this._tgConnect.connected;
      };
      TonConnectUi.prototype.openModal = function() {
        return __awaiter(this, void 0, void 0, function() {
          var _a, _b, _c;
          return __generator(this, function(_d) {
            switch (_d.label) {
             case 0:
              if (!this._tgConnect) return [ 2 ];
              _b = (_a = console).log;
              _c = [ "open modal" ];
              return [ 4, this._tgConnect.getWallets() ];

             case 1:
              _b.apply(_a, _c.concat([ _d.sent() ]));
              this._tgConnect.connected ? this._tgConnect.disconnect() : this._tgConnect.openModal();
              return [ 2 ];
            }
          });
        });
      };
      TonConnectUi.prototype.createPayload = function() {
        return "";
      };
      TonConnectUi.prototype.sendTransaction = function(args) {
        return __awaiter(this, void 0, void 0, function() {
          var transaction, result, e_1;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!this._tgConnect || false == this._tgConnect.connected) {
                console.error("ton connect not connected");
                throw new Error("ton connect not connected");
              }
              transaction = {
                validUntil: Math.floor(Date.now() / 1e3) + 120,
                messages: [ {
                  address: this.tonWallet,
                  amount: this.toNano(args.amount),
                  payload: args.payload
                } ]
              };
              console.log(transaction, "ton\u652f\u4ed8\u7684\u53c2\u6570");
              _a.label = 1;

             case 1:
              _a.trys.push([ 1, 3, , 4 ]);
              return [ 4, this._tgConnect.sendTransaction(transaction) ];

             case 2:
              result = _a.sent();
              args.callBack && args.callBack({
                success: true,
                result: result
              });
              return [ 3, 4 ];

             case 3:
              e_1 = _a.sent();
              console.error(e_1);
              args.callBack && args.callBack({
                success: false,
                result: e_1.message
              });
              return [ 3, 4 ];

             case 4:
              return [ 2 ];
            }
          });
        });
      };
      var TonConnectUi_1;
      TonConnectUi = TonConnectUi_1 = __decorate([ ccclass("TonConnectUi") ], TonConnectUi);
      return TonConnectUi;
    }();
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
      TelegramWebApp.prototype.expand = function() {
        try {
          console.log("\u6269\u5c55\u5230\u6700\u5927\u663e\u793a", this._tgWebAppJS.isExpanded());
          if (this._tgWebAppJS.isExpanded()) ; else {
            console.log("\u6269\u5c55\u5230\u6700\u5927\u663e\u793a");
            this._tgWebAppJS.expand();
          }
        } catch (e) {
          console.log(e);
        }
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
      TelegramWebApp.prototype.getTelegramWebAppInitDataUnSafe = function() {
        if (!this._tgWebAppJS) {
          console.error("telegram web app is not inited!");
          return null;
        }
        return this._tgWebAppJS.initDataUnsafe;
      };
      TelegramWebApp.prototype.getTelegramWebAppInitData = function() {
        if (!this._tgWebAppJS) {
          console.error("telegram web app is not inited!");
          return null;
        }
        return this._tgWebAppJS.initData;
      };
      TelegramWebApp.prototype.enableClosingConfirmation = function() {
        console.log("\u542f\u7528\u5c0f\u7a0b\u5e8f\u5173\u95ed\u63d0\u793a");
        this._tgWebAppJS.enableClosingConfirmation();
      };
      TelegramWebApp.prototype.isTGAvailable = function() {
        return this._tgWebAppJS;
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
    exports.WebTon = void 0;
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WebTon = function() {
      function WebTon() {
        this._webTon = null;
      }
      WebTon_1 = WebTon;
      Object.defineProperty(WebTon, "Instance", {
        get: function() {
          WebTon_1._instance || (WebTon_1._instance = new WebTon_1());
          return WebTon_1._instance;
        },
        enumerable: false,
        configurable: true
      });
      WebTon.prototype.init = function() {
        return __awaiter(this, void 0, Promise, function() {
          var _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              _a = this;
              return [ 4, new Promise(function(resolve, reject) {
                var intervalId = setInterval(function() {
                  if (window.TonWeb) {
                    console.log("loading ton sdk success!");
                    resolve(new window.TonWeb());
                    clearInterval(intervalId);
                  } else console.log("loading ton sdk fail!");
                }, 100);
              }) ];

             case 1:
              _a._webTon = _b.sent();
              return this._webTon ? [ 2, Promise.resolve({
                success: true
              }) ] : [ 2, Promise.resolve({
                success: false
              }) ];
            }
          });
        });
      };
      WebTon.prototype.parseAddress = function(hexAddress) {
        return __awaiter(this, void 0, void 0, function() {
          var Address, address, userFriendlyAddress;
          return __generator(this, function(_a) {
            Address = this._webTon.utils.Address;
            address = new Address(hexAddress);
            userFriendlyAddress = address.toString(true, false, true);
            return [ 2, userFriendlyAddress ];
          });
        });
      };
      WebTon.prototype.createMessagePayload = function(message) {
        return __awaiter(this, void 0, void 0, function() {
          var cell, cellBytes, payload;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              cell = new this._webTon.boc.Cell();
              cell.bits.writeUint(0, 32);
              cell.bits.writeString(message);
              return [ 4, cell.toBoc(false) ];

             case 1:
              cellBytes = _a.sent();
              payload = this._webTon.utils.bytesToBase64(cellBytes);
              return [ 2, payload ];
            }
          });
        });
      };
      var WebTon_1;
      WebTon = WebTon_1 = __decorate([ ccclass ], WebTon);
      return WebTon;
    }();
    exports.WebTon = WebTon;
    cc._RF.pop();
  }, {} ]
}, {}, [ "AlljsonData", "Enum", "Index", "Languages", "StaticInstance", "Utils", "telegram-ui", "telegram-web", "webton", "Config", "EventName", "GlobalVar", "InterfaceCom", "Board", "Car", "CarSingle", "BaseItem", "BaseLanguageLayer", "Baselayer", "ExitLayer", "ExitLevelLayer", "HeaderLayer", "LevelNodeItem", "LevelSelectLayer", "LevelUILayer", "LevelUILayer1", "LoadingLayer", "LoseLayer", "LoseLayer1", "MainLayer", "MainLevelLayer", "MenuLayer", "MoreLayer", "OverLayer", "RankLayer", "SettingLayer", "ShareLayer", "ShopLayer", "SkillSubmitLayer", "TaskLayer", "ToastLayer", "ToastLayer1", "WinLayer", "WinPTLayer", "WinTZLayer", "AudioManager", "DataManager", "EffectManager", "EventManager", "GameManager", "LoopScrollView", "PoolManager", "ResourceManager", "ScrollViewItemBase", "SdkManager", "SpriteManager", "ToastManager", "UIManager", "HttpCom", "TestNet", "WssCom", "BuyCom", "PayWay", "PayWayItem", "UIScrollControl", "UITransitionControl" ]);