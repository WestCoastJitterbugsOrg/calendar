const postcss = require('postcss');
const postcssCustomProperties = require('postcss-custom-properties');

postcss([
  postcssCustomProperties(/* pluginOptions */)
]).process(YOUR_CSS /*, processOptions */);