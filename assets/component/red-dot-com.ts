import { CERedDotKeys, TRedDotKeys } from "../data/red-dot-data";
import { Singleton } from "../manager/singleton";
import { CERedDotStyle, TRedDotStyle } from "../types/red-dot";

const { ccclass, property } = cc._decorator;

@ccclass
export class RedDotComponent extends cc.Component {
  @property({ type: CERedDotKeys })
  red_key = CERedDotKeys.Root;

  @property({ type: CERedDotStyle })
  red_style = CERedDotStyle.Pure;

  @property(cc.Node)
  container: cc.Node = null;

  @property(cc.Label)
  labNum: cc.Label = null;

  onEnable() {
    Singleton.event.on(this.redKey, this._onRedDotStatusChanged, this);
    this._onRedDotStatusChanged();
  }

  onDisable() {
    Singleton.event.targetOff(this);
  }

  get redKey() {
    return CERedDotKeys[this.red_key] as TRedDotKeys;
  }

  get redStyle() {
    return CERedDotStyle[this.red_style] as TRedDotStyle;
  }

  private _onRedDotStatusChanged() {
    cc.log(
      `> [红点] 状态变化: ${this.redKey}`,
      Singleton.red.count(this.redKey)
    );
    const method = this[`_refresh${this.redStyle}`].bind(this);
    method && method();
  }

  private _refreshPure() {
    this.labNum.node.active = false;
    this.container.active = Singleton.red.enabled(this.redKey);
  }

  private _refreshWithNumber() {
    const node = Singleton.red.find(this.redKey);
    const num = node.count;
    this.labNum.node.active = this.container.active = num > 0;
    this.labNum.string = `${num > 99 ? "99+" : num}`;
  }

  // override this method to apply custom style
  private _refreshCustom() {}
}
