/**
 * 红点表现形式
 */
export const CERedDotStyle = cc.Enum({
  Pure: 0,
  WithNumber: 1,
  Custom: 2,
});
export type TRedDotStyle = keyof typeof CERedDotStyle;

/**
 * 红点数据结构
 */
export interface IRedDotData {
  [key: string]: number;
}

/**
 * 红点树结构抽象
 */
export interface IRedDotStruct {
  name: string;
  style: TRedDotStyle;
  children?: IRedDotStruct[];
}
