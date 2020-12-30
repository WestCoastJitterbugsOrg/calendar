import {Factory} from "../types";
import {hsl2rgb} from "./helpers";
import {WcjColorHashCreator} from "./types";

const initWcjColorHash: Factory<WcjColorHashCreator, "colorHash">
  = ({colorHash}) => hslSetting => {

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
      return hsl2rgb(hslVal);
    }

    const hex = (input: string) => {
      const rgbOut = rgb(input);
      const ret = "#" + rgbOut.map((x) => x.toString(16)).join("");
      return ret;
    }

    return {...colorHash, hsl, rgb, hex};
  };

export default initWcjColorHash;
