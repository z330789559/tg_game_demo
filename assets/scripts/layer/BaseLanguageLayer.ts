import { Languages } from "../Languages";
import DataManager from "../manager/DataManager";
import BaseLayer from "./Baselayer";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseLanguageLayer extends BaseLayer {

    allLabels: Array<any> = [];

    onLoad() {
        super.onLoad();
        this.allLabels = [];
        this.node.walk((node) => {
            if (node.getComponent(cc.Label)) {
                this.allLabels.push(node.getComponent(cc.Label))
            }
        }, null)
    }

    updateLanguage(): void {
        for (let i = 0; i < this.allLabels.length; i++) {
            let name = this.allLabels[i].node.name;
            if (Languages[name]) {
                this.allLabels[i].string = Languages[name][DataManager.instance.language]
            }
        }
    }

    start() {

    }
    // update (dt) {}
}
