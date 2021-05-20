const _ = require("lodash");
const fse = require("fs-extra");
const plistParser = require("plist");
const arvish = require('arvish');

const getItems = async (inputStr) => {
  const inApplicationFolder = await fse.readdir("/Applications");
  const apps = _.filter(inApplicationFolder, (appName) =>
    appName.endsWith(".app")
  );

  const targetApps = _.filter(apps, (appName) =>
    appName.toLowerCase().startsWith(inputStr.toLowerCase())
  );

  return arvish.output(
    targetApps.map((appName) => {
      return {
        title: appName,
        arg: `/Applications/${appName}`,
      };
    }),
    { print: false }
  );
};

const cacheIcon = async () => {
  const inApplicationFolder = await fse.readdir("/Applications");
  const apps = _.filter(inApplicationFolder, (appName) =>
    appName.endsWith(".app")
  );

  const targetApps = _.filter(apps, (appName) =>
    appName.toLowerCase().startsWith(inputStr.toLowerCase())
  );

  await Promise.all(
    targetApps.map(async (appName) => {
      const plist = plistParser.parse(
        await fse.readFile(`/Applications/${appName}/Info.plist`)
      );

      const iconName = plist.CFBundleIconName;
      const iconPath = `/Applications/${appName}/Resources/${iconName}.icns`;
    })
  );
};

module.exports = { getItems };
