const fs = require("fs");
const fse = require("fs-extra");
const fileIcon = require("file-icon");
const _ = require("lodash");
const bundleId = require("bundle-id");
const arvish = require("arvish");
const conf = require("./conf");

const getIcon = (appName) => {
  if (conf.cachingComplete) {
    return `${appName}.app.png`;
  }

  return "icon.png";
};

const cacheIcon = async () => {
  try {
    const inApplicationFolder = await fse.readdir("/Applications");
    const apps = _.filter(inApplicationFolder, (appName) =>
      appName.endsWith(".app")
    );

    const appBundleIds = await Promise.allSettled(
      apps.map(async (appName) => {
        return {
          appName,
          bundleId: await bundleId(appName),
        };
      })
    );

    const appBundleIdsSuccess = appBundleIds
      .filter((item) => item.status === "fulfilled")
      .map((item) => item.value);

    const buffers = await fileIcon.buffer(
      appBundleIdsSuccess.map((item) => item.bundleId),
      { size: 64 }
    );

    let idx = 0;

    if (!(await fse.pathExists(`${arvish.env.cache}/icons`))) {
      await fse.mkdir(`${arvish.env.cache}/icons`);
    }

    buffers.forEach((buffer) => {
      fs.writeFileSync(
        `${arvish.env.cache}/icons/${appBundleIdsSuccess[idx++].appName}.png`,
        buffer
      );
    });

    arvish.config.set("cachingComplete", true);

  } catch (err) {
    console.log('Error occured', err);
  }
};

module.exports = { getIcon, cacheIcon };
