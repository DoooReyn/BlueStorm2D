import { RedDotMgr } from "./red-dot-mgr";

export class Singleton {
  private static _red: RedDotMgr = null;
  public static get red() {
    return (this._red = this._red || new RedDotMgr());
  }

  private static _event: cc.EventTarget = null;
  public static get event() {
    return (this._event = this._event || new cc.EventTarget());
  }
}

(window as any).Singleton = Singleton;
