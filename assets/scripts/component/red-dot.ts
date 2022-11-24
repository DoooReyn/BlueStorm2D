/**
 * 红点组件
 */
import { CERedDotKeys, TRedDotKeys } from "../data/red-dot-data";
import { Singleton } from "../manager/singleton";
import { CERedDotStyle, TRedDotStyle } from "../types/red-dot-type";

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

  protected onEnable() {
    Singleton.event.on(this.redKey, this._onRedDotStatusChanged, this);
    this._onRedDotStatusChanged();
  }

  protected onDisable() {
    Singleton.event.off(this.redKey, this._onRedDotStatusChanged, this);
  }

  public get redKey() {
    return CERedDotKeys[this.red_key] as TRedDotKeys;
  }

  public get redStyle() {
    return CERedDotStyle[this.red_style] as TRedDotStyle;
  }

  private _onRedDotStatusChanged() {
    const method = this[`_refresh${this.redStyle}`].bind(this);
    method && method();
  }

  private _refreshPure() {
    this.labNum.node.active = false;
    this.container.active = Singleton.red.isEnabled(this.redKey);
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
