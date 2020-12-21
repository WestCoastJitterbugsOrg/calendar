import { Factory } from '../types';
import { hsl2rgb } from './helpers';
import { ColorHashCreator } from './types';

const ColorFactory: Factory<ColorHashCreator> =
    deps => hslSetting => {

        function hsl(input: string) {
            const hslVal = deps.colorHash.hsl(input);
            hslVal[0] = hslSetting.hue || hslVal[0];
            hslVal[1] = hslSetting.saturation || hslVal[1];
            hslVal[2] = hslSetting.lightness || hslVal[2];

            return hslVal;
        }

        function rgb(input: string) {
            const hslVal = hsl(input);
            hslVal[0] = hslVal[0] / 360;
            return hsl2rgb(...hslVal);
        }

        function hex(input: string) {
            const rgbOut = rgb(input);
            const ret = '#' + rgbOut.map(x => x.toString(16)).join('');
            return ret;
        }

        return { hsl, rgb, hex }
    }

export default ColorFactory;