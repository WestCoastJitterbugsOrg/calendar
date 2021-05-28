import ColorHash from "color-hash";

type ColorValueArray = [number, number, number]

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 * 
 * (c) Michael Jackson
 * Modified from https://gist.githuub.com/mjackson/5311256
 */
const hsl2rgb =
    ([h, s, l]: ColorValueArray) => {
        let r: number, g: number, b: number;

        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb([p, q, h + 1 / 3]);
            g = hue2rgb([p, q, h]);
            b = hue2rgb([p, q, h - 1 / 3]);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    };

const hue2rgb: (hue: ColorValueArray) => number = ([p, q, t]) => {
    if (t < 0) { t++; }
    else if (t > 1) { t--; }

    if (t < 1 / 6) { return p + (q - p) * 6 * t; }
    else if (t < 1 / 2) { return q; }
    else if (t < 2 / 3) { return p + (q - p) * (2 / 3 - t) * 6; }
    else { return p; }
}

export type HSLSetting = {
    hue?: number;
    saturation?: number;
    lightness?: number;
};
const hslSetting: HSLSetting = {};

const colorHash = new ColorHash(hslSetting);

const hsl = (input: string) => {
    const hslVal = colorHash.hsl(input);
    hslVal[0] = hslSetting?.hue || hslVal[0];
    hslVal[1] = hslSetting?.saturation || hslVal[1];
    hslVal[2] = hslSetting?.lightness || hslVal[2];

    return hslVal;
}

const rgb = (input: string) => {
    const hslVal = hsl(input);
    hslVal[0] = hslVal[0] / 360;
    return hsl2rgb(hslVal);
}

const hex = (input: string) => {
    const rgbOut = rgb(input);
    const ret = "#" + rgbOut.map((x) => x.toString(16)).join("");
    return ret;
}

export default { ...colorHash, hsl, rgb, hex };
