import ColorHash from "color-hash";

export type ColorValueArray = [number, number, number];
export type HSLSetting = {
  hue?: number;
  saturation?: number;
  lightness?: number;
};
export type WcjColorHashCreator = (
  settings: HSLSetting
) => ColorHash; 