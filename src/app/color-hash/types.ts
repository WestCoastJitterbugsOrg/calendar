export type ColorValueArray = [number, number, number];
export type HSLSetting = {
    hue?: number
    saturation?: number
    lightness?: number
}
export type ColorHashCreator = {
    createColorHash: (settings: HSLSetting) => ({
        hsl: (input: string) => ColorValueArray
        rgb: (input: string) => ColorValueArray,
        hex: (input: string) => string,
    })
};