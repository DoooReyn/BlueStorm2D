const { ccclass, property } = cc._decorator;

@ccclass
export default class FlowItem extends cc.Component {
  @property({
    type: [cc.Component.EventHandler],
    tooltip: "进入ScrollView时回调",
  })
  onEnterScorllViewEvents: cc.Component.EventHandler[] = [];

  @property({
    type: [cc.Component.EventHandler],
    tooltip: "离开ScrollView时回调",
  })
  onExitScorllViewEvents: cc.Component.EventHandler[] = [];

  @property(cc.Label)
  labNum: cc.Label = null;

  /**
   * 当前是否在展示中
   *
   * 1. 在进入和离开ScrollView期间，为true
   * 2. 在离开ScrolLView期间，为false
   */
  isShowing: boolean = false;

  private _index: number = 0;

  public get index() {
    return this._index;
  }

  /**
   * Item 进入 ScrollView 的时候回调
   */
  publishOnEnterScrollView() {
    if (this.onEnterScorllViewEvents.length == 0) {
      return;
    }
    this.onEnterScorllViewEvents.forEach((event) => {
      event.emit([]);
    });
  }

  /**
   * Item 离开 ScrollView 的时候回调
   */
  publishOnExitScrollView() {
    if (this.onExitScorllViewEvents.length == 0) {
      return;
    }
    this.onExitScorllViewEvents.forEach((event) => {
      event.emit([]);
    });
  }

  onEnterView(index: number, data: any) {
    this._index = index;
    // cc.log(`${this._index} > 进入视图`);
    this.labNum.string = `[${index + 1}] ${data.name}`;
  }

  onExitView() {
    // cc.log(`${this._index} > 退出视图`);
  }

  reuse() {
    cc.log(`节点重用: ${this._index}`);
  }

  unuse() {
    cc.log(`节点回收: ${this._index}`);
  }
}
