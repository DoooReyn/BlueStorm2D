import { RedDotDataForTest, RedDotStruct } from "../data/red-dot-data";
import { Singleton } from "../manager/singleton";
import FlowView from "./flow-view";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {
  @property(cc.Node)
  NewNode: cc.Node = null;

  @property(cc.Label)
  drawcall: cc.Label = null;

  @property
  text: string = "hello";

  _clickTimes: number = 0;
  _limitTimes: number = 5;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.dynamicAtlasManager.maxFrameSize = 512;
    cc.dynamicAtlasManager.enabled = true;
    cc.log(this.node.getComponent(GameScene));
  }

  onEnable() {
    cc.log("[红点] 开始构建");
    Singleton.red.build(RedDotDataForTest, RedDotStruct);
  }

  onBtnClicked(_event: cc.Event.EventTouch, name: string) {
    let view = cc.find("Canvas/ScrollView").getComponent(FlowView);
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
      case "FlowViewState":
        view.node.active = !view.node.active;
        break;
      case "FlowView10":
        view.append(10);
        break;
      case "FlowView100":
        view.append(100);
        break;
      case "FlowView1000":
        view.append(1000);
        break;
      default:
        break;
    }
  }

  update() {
    this.drawcall.string = `DC: ${cc.renderer.drawCalls} (${cc.dynamicAtlasManager.atlasCount})`;
  }
}
