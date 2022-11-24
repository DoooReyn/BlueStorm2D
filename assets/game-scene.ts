// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { RedDotDataForTest, RedDotStruct } from "./data/red-dot-data";
import { Singleton } from "./manager/singleton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Node)
  NewNode: cc.Node = null;

  @property
  text: string = "hello";

  _clickTimes: number = 0;
  _limitTimes: number = 5;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.log(this.node.getComponent(NewClass));
  }

  onEnable() {
    cc.log("[红点] 开始构建");
    Singleton.red.build(RedDotDataForTest, RedDotStruct);
  }

  onBtnClicked(event: cc.Event.EventTouch, name: string) {
    cc.log(event, name);
    switch (name) {
      case "Status":
        this.NewNode.active = !this.NewNode.active;
        break;
      case "Increase":
        Singleton.red.find("Root.Mail.System").increase();
        break;
      case "Decrease":
        Singleton.red.find("Root.Mail.System").decrease();
        break;
      default:
        break;
    }
  }
}
