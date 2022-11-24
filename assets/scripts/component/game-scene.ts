import { RedDotDataForTest, RedDotStruct } from "./data/red-dot-data";
import { Singleton } from "./manager/singleton";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {
  @property(cc.Node)
  NewNode: cc.Node = null;

  @property
  text: string = "hello";

  _clickTimes: number = 0;
  _limitTimes: number = 5;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.log(this.node.getComponent(GameScene));
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
