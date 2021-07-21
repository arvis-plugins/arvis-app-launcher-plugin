const { cacheIcon: cacheIconOnMac } = require("./darwin");
const { cacheIcon: cacheIconOnWindows } = require("./win32");

(async function () {
  if (process.platform === "darwin") {
    await cacheIconOnMac();
  }
  if (process.platform === 'win32') {
    await cacheIconOnWindows();
  }
})();