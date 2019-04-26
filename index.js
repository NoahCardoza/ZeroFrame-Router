const Router = require('./router');
const utils = require('./utils');
const ZeroframeRouter = require('./vue-zeroframe-router');

module.exports = {
  Router,
  ...utils
  ...ZeroframeRouter
}
