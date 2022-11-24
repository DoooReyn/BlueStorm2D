const { ccclass } = cc._decorator;

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

  update() {
    cc.log(`${this.node.name} update`);
  }

  lateUpdate() {
    cc.log(`${this.node.name} lateUpdate`);
  }
}
