/**
 * 单例管理器
 * - 类不使用内置单例的写法，需要制作为单例的请在此类下获取
 */
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

  public static releaseAll() {
    if (this._red) {
      const release = this._red["release"];
      release && release.constructor.name == "Function" && release();
      this._red = null;
    }
  }
}

(window as any).Singleton = Singleton;
