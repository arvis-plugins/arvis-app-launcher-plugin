const { cacheIcon: cacheIconOnMac } = require("./darwin");

(async function () {
  if (process.platform === "darwin") {
    await cacheIconOnMac();
  }
})();