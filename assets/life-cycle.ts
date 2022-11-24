// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class LifeCycle extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.log(`${this.node.name} onLoad`);
  }

  start() {
    cc.log(`${this.node.name} start`);
  }

  onEnable() {
    cc.log(`${this.node.name} onEnable`);
  }

  onDisable() {
    cc.log(`${this.node.name} onDisable`);
  }

  onDestroy() {
    cc.log(`${this.node.name} onDestroy`);
  }

  lateUpdate() {
    cc.log(`${this.node.name} lateUpdate`);
  }

  update() {
    cc.log(`${this.node.name} update`);
  }
}
