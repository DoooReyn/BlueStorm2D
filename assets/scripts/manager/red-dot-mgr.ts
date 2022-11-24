/**
 * 红点管理器
 */
import { TRedDotKeys } from "../data/red-dot-data";
import { IRedDotData, IRedDotStruct } from "../types/red-dot-type";
import { Singleton } from "./singleton";

export class RedDotTreeNode {
  private _parent: RedDotTreeNode = null;
  private _children: RedDotTreeNode[] = null;
  private _name: string = "";
  private _count: number = 0;

  public constructor(struct: IRedDotStruct, parent: RedDotTreeNode = null) {
    this._parent = parent;
    this._name = struct.name;
    this._count = 0;
    if (struct.children && struct.children.length > 0) {
      this._children = [];
      struct.children.forEach((s) => {
        this._children.push(new RedDotTreeNode(s, this));
      });
    }
  }

  public get name() {
    return this._name;
  }

  public get count() {
    return this._count;
  }

  public set count(count) {
    count = Math.max(0, count | 0);
    if (count !== this._count) {
      this._count = count;
      this._notify();
    }
  }

  public get hasChildren() {
    return this._children && this._children.length > 0;
  }

  public clear() {
    this.count = 0;
  }

  public collect() {
    let sum = 0;
    for (let child of this._children) {
      sum += child.count;
    }
    cc.log(`[红点] <${this._name}> 更新统计：${sum}`);
    this.count = sum;
  }

  private _notify() {
    if (this._parent) {
      this._parent.collect();
      Singleton.event.emit(this._name);
    }
  }

  public increase(count: number = 1) {
    if (!this.hasChildren) {
      this.count += count | 0;
    }
  }

  public decrease(count: number = 1) {
    if (!this.hasChildren) {
      this.count -= count | 0;
    }
  }

  public update(count: number) {
    if (!this.hasChildren) {
      cc.log(`[红点] <${this._name}> 更新数值: ${count}`);
      this.count = count | 0;
    }
  }

  public find(key: TRedDotKeys): RedDotTreeNode | undefined {
    if (this._name == key) return this;

    if (this.hasChildren) {
      for (let child of this._children) {
        let node = child.find(key);
        if (node) {
          return node;
        }
      }
    }
  }

  public findAndUpdate(key: TRedDotKeys, count: number) {
    let node = this.find(key);
    node && node.update(count);
  }

  public get leafs() {
    const leafs = [];

    if (this.hasChildren) {
      for (let child of this._children) {
        if (child.hasChildren) {
          leafs.push(...child.leafs);
        } else {
          leafs.push(child);
        }
      }
    }

    return leafs;
  }
}

export class RedDotMgr {
  public root: RedDotTreeNode = null;

  public get isValid() {
    return this.root !== null;
  }

  public build(data: IRedDotData, struct?: IRedDotStruct) {
    if (!this.isValid && struct) {
      this.root = new RedDotTreeNode(struct);
    }

    this._clear();

    for (let key in data) {
      const count = data[key];
      this.root.findAndUpdate(key as TRedDotKeys, count);
    }
  }

  public isEnabled(key: TRedDotKeys) {
    return this.count(key) > 0;
  }

  public count(key: TRedDotKeys) {
    if (!this.isValid) return 0;

    const node = this.root.find(key as TRedDotKeys);
    return node ? node.count : 0;
  }

  public find(key: TRedDotKeys) {
    if (this.isValid) {
      return this.root.find(key);
    }
  }

  private _clear() {
    if (this.isValid) {
      this.root.leafs.forEach((leaf) => leaf.clear());
    }
  }
}
