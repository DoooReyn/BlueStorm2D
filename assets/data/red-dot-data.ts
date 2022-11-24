import { IRedDotStruct } from "../types/red-dot";

/**
 * 红点KEYS定义
 */
export type TRedDotKeys =
  | "Root"
  | "Root.Mail"
  | "Root.Mail.System"
  | "Root.Mail.Private"
  | "Root.Mail.Team"
  | "Root.Bag"
  | "Root.Bag.Weapon"
  | "Root.Bag.Armor"
  | "Root.Bag.Prop"
  | "Root.Bag.Piece"
  | "Root.DailyTask";

/**
 * 红点树结构设定
 */
export const RedDotStruct: IRedDotStruct = {
  name: "Root",
  style: "Pure",
  children: [
    {
      name: "Root.Mail",
      style: "Pure",
      children: [
        { name: "Root.Mail.System", style: "WithNumber" },
        { name: "Root.Mail.Team", style: "WithNumber" },
        { name: "Root.Mail.Private", style: "WithNumber" },
      ],
    },
    {
      name: "Root.Bag",
      style: "Pure",
      children: [
        { name: "Root.Bag.Weapon", style: "Pure" },
        { name: "Root.Bag.Armor", style: "Pure" },
        { name: "Root.Bag.Piece", style: "Pure" },
        { name: "Root.Bag.Prop", style: "Pure" },
      ],
    },
    {
      name: "Root.DailyTask",
      style: "Pure",
    },
  ],
};

/**
 * 红点KEYS枚举
 */
export const CERedDotKeys = cc.Enum({
  Root: 0,
  "Root.Mail": 10,
  "Root.Mail.System": 11,
  "Root.Mail.Private": 12,
  "Root.Mail.Team": 13,
  "Root.Bag": 20,
  "Root.Bag.Weapon": 21,
  "Root.Bag.Armor": 22,
  "Root.Bag.Prop": 23,
  "Root.Bag.Piece": 24,
  "Root.DailyTask": 30,
});

export const RedDotDataForTest = {
  "Root.Mail.System": 11,
  "Root.Mail.Private": 12,
  "Root.Mail.Team": 13,
  "Root.Bag.Weapon": 21,
  "Root.Bag.Armor": 22,
  "Root.Bag.Prop": 23,
  "Root.Bag.Piece": 24,
  "Root.DailyTask": 30,
};
