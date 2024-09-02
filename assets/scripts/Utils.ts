// Created by carolsail

// 随机整数
export function random(lower: number, upper: number): number {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

// 数组打乱
export function shuffle(arr: any[]) {
    let length: number = arr.length,
        randomIndex: number,
        temp: any;
    while (length) {
        randomIndex = Math.floor(Math.random() * (length--));
        temp = arr[randomIndex];
        arr[randomIndex] = arr[length];
        arr[length] = temp
    }
    return arr
}

// 数组对象排序
export function sort(arr: any[] | unknown, key: any, flag: boolean = true) {
    if (arr instanceof Array) {
        return arr.sort((a, b) => {
            if (a[key] > b[key]) {
                return flag ? 1 : -1
            } else if (a[key] < b[key]) {
                return flag ? -1 : 1
            } else {
                return 0
            }
        })
    }
}

// 秒数转换
export function formatSeconds(seconds: number | string, dateFormat = 'h:i:s'): string {
    seconds = Number(seconds)
    let obj: any = {}
    obj.h = Number.parseInt(String(seconds / 3600));
    obj.i = Number.parseInt(String((seconds - obj.h * 3600) / 60));
    obj.s = Number.parseInt(String(seconds - obj.h * 3600 - obj.i * 60));
    if (obj.h < 10) obj.h = '0' + obj.h;
    if (obj.i < 10) obj.i = '0' + obj.i;
    if (obj.s < 10) obj.s = '0' + obj.s;
    // 3.解析
    var rs = dateFormat.replace('h', obj.h).replace('i', obj.i).replace('s', obj.s);
    return rs;
}

// 两点距离
export function getDistance(start: cc.Vec2, end: cc.Vec2) {
    const pos = cc.v2(start.x - end.x, start.y - end.y);
    const dis = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
    return dis;
}

// 两点角度
export function getAngle(start: cc.Vec2, end: cc.Vec2) {
    //计算出朝向
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const dir = cc.v2(dx, dy);
    //根据朝向计算出夹角弧度
    const angle = dir.signAngle(cc.v2(1, 0));
    //将弧度转换为欧拉角
    const degree = angle / Math.PI * 180;
    return -degree
}

// 位置转棋盘xy
export function getXYFromPos(px: number, py: number, width: number, height: number) {
    let x = 0, y = 0
    x = Math.floor(px / width)
    y = Math.floor(py / height)
    return { x, y }
}

// 把节点1转节点2坐标
export function toXY(node1: cc.Node, node2: cc.Node) {
    const wpos = node1.convertToWorldSpaceAR(cc.v2(0, 0))
    const pos = node2.convertToNodeSpaceAR(wpos)
    return pos
}