import ColorHash from 'color-hash';
import md5 from 'md5';

type ColorValueArray = [number, number, number];
type HSLSetting = {
    hue?: number
    saturation?: number
    lightness?: number
}
type ColorHashFactoryType = {
    hsl: (input: string) => ColorValueArray
    rgb: (input: string) => ColorValueArray,
    hex: (input: string) => string,
};


export default function ColorFactory(hslSetting: HSLSetting): ColorHashFactoryType {
    const colorHash = new ColorHash({ hash: customHash});

    function hsl(input: string) {
        const hslVal = colorHash.hsl(input);
        hslVal[0] = hslSetting.hue || hslVal[0];
        hslVal[1] = hslSetting.saturation || hslVal[1];
        hslVal[2] = hslSetting.lightness || hslVal[2];

        return hslVal;
    }

    function rgb(input: string) {
        const hslVal = hsl(input);
        hslVal[0] = hslVal[0] / 360;
        return hslToRgb(...hslVal);
    }

    function hex(input: string) {
        const rgbOut = rgb(input);
        const ret = '#' + rgbOut.map(x => x.toString(16)).join('');
        return ret;
    }

    return {
        hsl: hsl,
        rgb: rgb,
        hex: hex,
    }
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    let r: number, g: number, b: number;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function customHash(str: string) {
    return parseInt(md5(str) as string, 16);
    // let hash = 0;
    // for (let i = 0; i < str.length; i++) {
    //     hash += str.charCodeAt(i) ** 2;
    // }
    // return hash;
}