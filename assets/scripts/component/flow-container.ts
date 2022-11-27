import FlowItem from "./flow-item";
import FlowView from "./flow-view";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FlowContainer extends cc.Component {
  @property(cc.Node)
  bg: cc.Node = null;

  private _visible: boolean = false;
  private _view: FlowView = null;
  private _data: any = null;
  private _item: cc.Node = null;
  private _index: number = -1;

  public get visible() {
    return this._visible;
  }

  // LIFE-CYCLE CALLBACKS:

  protected onEnable(): void {
    this.node.on("reload", this._onScrolling, this);
  }

  protected onDisable(): void {
    this.node.off("reload", this._onScrolling, this);
  }

  public init(view: FlowView, index: number) {
    this._view = view;
    this._index = index;
    this._data = view.getItemData(index);
  }

  public deinit() {
    this._onExitView();
  }

  reuse() {
    cc.log(`容器重用: ${this._index}`);
  }

  unuse() {
    cc.log(`容器回收: ${this._index}`);
  }

  private _onScrolling() {
    if (this.node.getBoundingBoxToWorld().intersects(this._view.box)) {
      this._onEnterView();
    } else {
      this._onExitView();
    }
  }

  private _onEnterView() {
    if (!this._visible && !this._item) {
      //   cc.log("进入视图: ", this._index);
      this._visible = true;
      this._item = this._view.getItem();
      this.node.addChild(this._item);
    }
    this._item.getComponent(FlowItem).onEnterView(this._index, this._data);
  }

  private _onExitView() {
    if (this._visible && this._item) {
      //   cc.log("退出视图: ", this._index);
      this._item.getComponent(FlowItem).onExitView();
      this._view.putItem(this._item);
      this._visible = false;
      this._item = null;
    }
  }
}
