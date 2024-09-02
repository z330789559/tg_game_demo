// Created by carolsail

export default class PoolManager{

    private static _instance: any = null

    static getInstance<T>(): T {
        if (this._instance === null) {
            this._instance = new this()
        }

        return this._instance
    }

    static get instance() {
        return this.getInstance<PoolManager>()
    }

    private _dictPool: any = {}
    private _dictPrefab: any = {}

    // 复制节点
    public copyNode(copynode: cc.Node, parent: cc.Node | null): cc.Node {
        let name = copynode.name;
        this._dictPrefab[name] = copynode;
        let node = null;
        if (this._dictPool.hasOwnProperty(name)) {
            let pool = this._dictPool[name];
            if (pool.size() > 0) {
                node = pool.get();
            } else {
                node = cc.instantiate(copynode);
            }
        } else {

            let pool = new cc.NodePool();
            this._dictPool[name] = pool;

            node = cc.instantiate(copynode);
        }
        if (parent) {
            node.parent = parent;
            node.active = true;
        }
        return node;
    }

    // 从池子取出节点
    public getNode(prefab: cc.Prefab | string, parent?: cc.Node, pos?: cc.Vec3): cc.Node {
        let tempPre: any;
        let name: any;
        if (typeof prefab === 'string') {
            tempPre = this._dictPrefab[prefab];
            name = prefab;
            if (!tempPre) {
                console.log("Pool invalid prefab name = ", name);
                return null;
            }
        }
        else {
            tempPre = prefab;
            name = prefab.data.name;
        }

        let node = null;
        if (this._dictPool.hasOwnProperty(name)) {
            //已有对应的对象池
            let pool = this._dictPool[name];
            if (pool.size() > 0) {
                node = pool.get();
            } else {
                node = cc.instantiate(tempPre);
            }
        } else {
            //没有对应对象池，创建他！
            let pool = new cc.NodePool();
            this._dictPool[name] = pool;

            node = cc.instantiate(tempPre);
        }

        if (parent) {
            node.parent = parent;
            node.active = true;
            if (pos) node.position = pos;
        }
        return node;
    }

    // 节点放进池子
    public putNode(node: cc.Node | null, isActive = false) {
        if (!node) {
            return;
        }

        //console.log("回收信息",node.name,node)
        let name = node.name;
        let pool = null;
        // node.active = isActive
        if (this._dictPool.hasOwnProperty(name)) {
            //已有对应的对象池
            pool = this._dictPool[name];
        } else {
            //没有对应对象池，创建他！
            pool = new cc.NodePool();
            this._dictPool[name] = pool;
        }

        pool.put(node);
    }

    // 根据名字清池
    public clearPool(name: string) {
        if (this._dictPool.hasOwnProperty(name)) {
            let pool = this._dictPool[name];
            pool.clear();
        }
    }

    // 添加预制体
    public setPrefab(name: string, prefab: cc.Prefab): void {
        this._dictPrefab[name] = prefab;
    }

    // 取预制体
    public getPrefab(name: string): cc.Prefab {
        return this._dictPrefab[name];
    }
}
