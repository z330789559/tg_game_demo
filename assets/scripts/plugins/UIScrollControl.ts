const { ccclass, property } = cc._decorator;

export enum ENUM_SCROLL_DIR { V, H }

@ccclass
export default class UIScrollControl extends cc.Component {
    private scrollView: cc.ScrollView = null
    private contentSize: cc.Size = null
    private scrollDirection: ENUM_SCROLL_DIR = ENUM_SCROLL_DIR.V
    private totalCount: number = 0
    private itemCount: number = 0
    private childrenList: cc.Node[] = []
    private itemDistance: number = 0
    private contentSizeStart: cc.Size = null
    private isStartFlag: boolean = false
    private theMaxID: number = 0
    private refreshCB: Function = null


    init(_tempNode: cc.Node, _totalCount: number, _size: cc.Size, _dir: ENUM_SCROLL_DIR, callBack: Function, scrollTo?: Function): void {
        if (callBack) this.refreshCB = callBack

        if (this.isStartFlag == false) {
            this.scrollView = this.node.getComponent(cc.ScrollView);
            if (this.scrollView == null || this.scrollView.content == null) return

            this.scrollView.content.parent.setAnchorPoint(cc.v2(0.5, 0.5))
            let _maskWidget: cc.Widget = this.scrollView.content.parent.getComponent(cc.Widget)

            if (_maskWidget == null) _maskWidget = this.scrollView.content.parent.addComponent(cc.Widget)

            _maskWidget.isAlignLeft = true
            _maskWidget.left = 0

            _maskWidget.isAlignRight = true
            _maskWidget.right = 0

            _maskWidget.isAlignTop = true
            _maskWidget.top = 0

            _maskWidget.isAlignBottom = true
            _maskWidget.bottom = 0

            this.contentSize = new cc.Size(this.scrollView.node.getContentSize())
            this.scrollView.content.setContentSize(this.contentSize)
            this.contentSizeStart = this.scrollView.content.getContentSize();
        }

        if (_tempNode == null) return

        this.scrollView.content.setContentSize(this.contentSizeStart)

        this.clear()

        this.totalCount = _totalCount
        this.scrollDirection = _dir as ENUM_SCROLL_DIR

        if (_dir == ENUM_SCROLL_DIR.V) {
            this.scrollView.content.setAnchorPoint(cc.v2(0.5, 1))

            this.scrollView.content.setContentSize(cc.size(this.contentSizeStart.width, this.totalCount * _size.height))

            this.scrollView.content.setPosition(cc.v2(0, -this.totalCount * _size.height / 2))

            let _tempCount: number = Math.floor(this.contentSizeStart.height / _size.height)

            this.itemCount = _tempCount + 2

            if (this.totalCount <= this.itemCount) this.itemCount = this.totalCount

            this.itemDistance = _size.height
        }
        else if (_dir == ENUM_SCROLL_DIR.H) {
            this.scrollView.content.setAnchorPoint(cc.v2(0, 0.5))
            this.scrollView.content.setContentSize(cc.size(this.totalCount * _size.width, this.contentSizeStart.height))

            this.scrollView.content.setPosition(cc.v2(this.totalCount * _size.width / 2, 0))
            let _tempCount: number = Math.floor(this.contentSizeStart.width / _size.width)

            this.itemCount = _tempCount + 2

            if (this.totalCount <= this.itemCount) {
                this.itemCount = this.totalCount
            }

            this.itemDistance = _size.width
        }

        if (this.scrollView.scrollEvents.length <= 0) {
            let eventHandler = new cc.Component.EventHandler();
            eventHandler.target = this.node;
            eventHandler.component = "UIScrollControl";
            eventHandler.handler = "OnScroll";
            this.scrollView.scrollEvents.push(eventHandler);
        }

        this.isStartFlag == true
        this.theMaxID = 0

        this.initShowAreaItems(_tempNode, scrollTo)
    }

    private clear() {
        this.scrollView.content.removeAllChildren()
        this.childrenList = []
    }

    /**初始化可见的item */
    private initShowAreaItems(_temp_node: cc.Node, scrollTo: Function) {
        for (let i = 0; i < this.itemCount; i++) {
            //cc.log(" i = " + i)
            let curPos: cc.Vec2 = cc.v2(0, 0)
            let node: cc.Node = cc.instantiate(_temp_node)
            this.scrollView.content.addChild(node)
            node.active = true
            node.opacity = 255

            if (this.scrollDirection == ENUM_SCROLL_DIR.V) {
                curPos.y = -this.itemDistance / 2 - this.itemDistance * i
            }
            else if (this.scrollDirection == ENUM_SCROLL_DIR.H) {
                curPos.x = this.itemDistance / 2 + this.itemDistance * i
            }

            node.name = `cell_${i}`
            node.setAnchorPoint(cc.v2(0.5, 0.5))
            node.setPosition(curPos)

            this.onRefresh(node, i, i)

            this.childrenList.push(node)
        }
        // this.scrollView.scrollToTop()
        scrollTo && scrollTo(this.scrollView)
    }

    /**滑动事件 */
    private OnScroll() {
        //获取滚动视图相对于左上角原点的当前滚动偏移
        let scrollOffset: cc.Vec2 = this.scrollView.getScrollOffset();
        let offset: number = 0;

        if (this.scrollDirection == ENUM_SCROLL_DIR.V) {
            offset = scrollOffset.y
        }
        else if (this.scrollDirection == ENUM_SCROLL_DIR.H) {
            //水平的offset是负数，为什么会有这么sb的设计，将它取反和垂直方向的统一一下
            offset = -scrollOffset.x
        }
        this.refreshLayout(offset)
    }

    /** 强行刷新布局 */
    private refreshLayout(_curOffset: number) {
        let offset: number = _curOffset

        //最大高度，超过该高度，不刷新
        let _max_rect_size: number = this.totalCount * this.itemDistance

        if (offset < 0 || offset + this.contentSize.height >= _max_rect_size) return

        let _index: number = 0 //从0开始
        let _min_index: number = Math.floor(offset / this.itemDistance);

        //miniIdx到theMaxID都会刷新
        for (let i = 0; i < this.itemCount; i++) {
            let node: cc.Node = this.childrenList[i];
            _index = _min_index + i;
            this.refreshItem(_index, i, node);
        }
        this.theMaxID = _min_index + this.itemCount
    }

    /**
     * 
     * @param _index UI该刷新的第几个元素
     * @param _node_index 
     * @param node 
     */
    refreshItem(_index: number, _node_index: number, node: cc.Node) {
        if (_index < 0 || _index >= this.totalCount) {
            // cc.log("索引越界, _index = " + _index + ", this.total_count = " + this.total_count)
            return;
        }

        if (node == null) {
            // cc.log("node == null");
            return;
        }

        let curPosition: cc.Vec2 = cc.Vec2.ZERO

        if (this.scrollDirection == ENUM_SCROLL_DIR.H) {
            curPosition.x = this.itemDistance / 2 + this.itemDistance * _index;
        }
        else if (this.scrollDirection == ENUM_SCROLL_DIR.V) {
            curPosition.y = - this.itemDistance / 2 - this.itemDistance * _index;
        }

        node.setPosition(curPosition)
        this.onRefresh(node, _index, _node_index);
    }

    /**
     * 
     * @param node 
     * @param _index 
     * @param nodeIndex 
     */
    private onRefresh(node: cc.Node, _index: number, nodeIndex: number) {
        //cc.log("--------------- _index = " + _index)
        if (this.refreshCB != null) {
            this.refreshCB(node, _index, nodeIndex)
        }
    }
}
