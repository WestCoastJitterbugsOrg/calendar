import ColorHash from 'color-hash';
import { customHash, hslToRgb } from './helpers';
import { ColorHashCreator } from './types';

export default function ColorFactory(colorHash = new ColorHash({ hash: customHash })): ColorHashCreator {

    return {
        createColorHash: hslSetting => {

            const hsl = (input: string) => {
                const hslVal = colorHash.hsl(input);
                hslVal[0] = hslSetting.hue || hslVal[0];
                hslVal[1] = hslSetting.saturation || hslVal[1];
                hslVal[2] = hslSetting.lightness || hslVal[2];

                return hslVal;
            }

            const rgb = (input: string) => {
                const hslVal = hsl(input);
                hslVal[0] = hslVal[0] / 360;
                return hslToRgb(...hslVal);
            }

            const hex = (input: string) => {
                const rgbOut = rgb(input);
                const ret = '#' + rgbOut.map(x => x.toString(16)).join('');
                return ret;
            }

            return { hsl, rgb, hex }
        }
    }
}

