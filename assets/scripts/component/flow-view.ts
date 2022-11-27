import FlowContainer from "./flow-container";
import FlowItem from "./flow-item";

const { ccclass, property } = cc._decorator;
const PIECE = 0.0167;
const LETTER = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randomRangeInt(min: number, max: number) {
  min = min | 0;
  max = max | 0;
  return (min + Math.random() * (max - min)) | 0;
}

function randomRangeIntInclusive(min: number, max: number) {
  min = min | 0;
  max = max | 0;
  return (min + Math.random() * (max - min + 1)) | 0;
}

function randomChoices(choices: any[] | string, count: number) {
  const max = choices.length - 1;
  const min = 0;
  let picks = [];
  for (let i = 0; i < count; i++) {
    picks.push(choices[randomRangeIntInclusive(min, max)]);
  }
  return picks;
}

@ccclass
export default class FlowView extends cc.Component {
  @property(cc.ScrollView)
  view: cc.ScrollView = null;

  @property(cc.Prefab)
  pb_item: cc.Prefab = null;

  @property(cc.Prefab)
  container: cc.Prefab = null;

  @property(cc.Integer)
  fills: number = 0;

  @property({ type: cc.Rect, readonly: true, visible: false })
  public get box(): cc.Rect {
    const view = this.view.node;
    const point = cc.v2(
      view.x - view.anchorX * view.width,
      view.y - view.anchorY * view.height
    );
    let lbp = view.parent.convertToWorldSpaceAR(point);
    return cc.rect(lbp.x, lbp.y, view.width, view.height);
  }

  private _pool_group: cc.NodePool = new cc.NodePool("flow-container");
  private _pool_item: cc.NodePool = new cc.NodePool("flow-item");
  private _data: any[] = [];
  private _progress: number = -1;
  private _total: number = -1;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    // 计算首次展出所需数量
    const view = this.view.content.parent;
    const layout = this.view.content.getComponent(cc.Layout);
    const h_dir = layout.horizontalDirection;
    const v_dir = layout.verticalDirection;
    const v_size = view.getContentSize();
    const p_size = this.pb_item.data.getContentSize();
    if (h_dir) {
      this.fills = ((v_size.width / p_size.width + 0.5) | 0) + 2;
      cc.log(`水平,视宽${v_size.width},可承载数量:${this.fills}`);
    } else if (v_dir) {
      this.fills = ((v_size.height / p_size.height + 0.5) | 0) + 2;
      cc.log(`垂直,视高${v_size.height},可承载数量:${this.fills}`);
    }
    for (let i = 0; i < this.fills; i++) {
      this.putContainer(cc.instantiate(this.container));
      this.putItem(cc.instantiate(this.pb_item));
    }
  }

  protected onEnable(): void {
    this.view.node.on("scrolling", this._onScrolling, this);
  }

  protected onDisable(): void {
    this.view.node.off("scrolling", this._onScrolling, this);
  }

  protected onDestroy(): void {
    this._pool_group.clear();
    this._pool_item.clear();
  }

  protected start(): void {
    this.append(10);
  }

  append(count: number) {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push(this._appendListData());
    }
    this._data = data;
    this.reload();
  }

  private _onScrolling() {
    this.view.content.children.forEach((childNode: cc.Node) => {
      childNode.emit("reload");
    });
  }

  public getContainer() {
    let node = null;
    if (this._pool_group.size() > 0) {
      node = this._pool_group.get();
    } else {
      node = cc.instantiate(this.container);
    }
    node.children[0].color = cc.color(
      randomRangeIntInclusive(0, 255),
      randomRangeIntInclusive(0, 255),
      randomRangeIntInclusive(0, 255)
    );
    node.setContentSize(this.pb_item.data.getContentSize());
    cc.log(`Container 对象池: ${this._pool_group.size()}`);
    return node;
  }

  public putContainer(container: cc.Node) {
    this._pool_group.put(container);
    cc.log(`Container 对象池: ${this._pool_group.size()}`);
  }

  public getItem() {
    return this._pool_item.size() > 0
      ? this._pool_item.get()
      : cc.instantiate(this.pb_item);
  }

  public putItem(item: cc.Node) {
    this._pool_item.put(item);
    cc.log(`Item 对象池: ${this._pool_item.size()}`);
  }

  private _appendListData() {
    return {
      name: randomChoices(LETTER, 4).join(""),
      num: randomRangeIntInclusive(1, 99),
    };
  }

  private _lazyLoad() {
    this._progress++;
    if (this._progress < this.fills) {
      this._onScrolling();
    }
    if (this._progress >= this._total) {
      this._progress = 0;
      this.unschedule(this._lazyLoad);
      return;
    }
    cc.log(`Progress: ${this._progress + 1}/${this._total}`);
    let child =
      this.view.content.children[this._progress] || this.getContainer();
    child.getComponent(FlowContainer).init(this, this._progress);
    if (!child.parent) {
      this.view.content.addChild(child);
    }
  }

  public getItemData(index: number) {
    return this._data[index];
  }

  public reload() {
    const count = this._data.length;
    const total = this.view.content.childrenCount;
    cc.log("--data: ", count, total);

    for (let c = total - 1; c >= 0; c--) {
      let v = this.view.content.children[c];
      let container = v.getComponent(FlowContainer);
      if (c >= count) {
        cc.log(`> deinit ${c + 1}/${count}`);
        container.deinit();
        this.putContainer(v);
      }
    }

    this._progress = -1;
    this._total = this._data.length;
    this.unschedule(this._lazyLoad);
    this.schedule(this._lazyLoad, PIECE);
  }

  // update (dt) {}
}
