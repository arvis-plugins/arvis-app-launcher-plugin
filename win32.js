const _ = require("lodash");
const fse = require("fs-extra");
const arvish = require("arvish");
const path = require("path");
// To do:: Change below logic using arvish.conf
const conf = require("conf.json");

const getIcon = () => {
  return "icon.png";
};

const getItems = async (inputStr) => {
  const inApplicationFolder = await fse.readdir(conf.applicationFolder.win32);
  const apps = _.filter(inApplicationFolder, (appName) =>
    appName.endsWith(".exe")
  );

  const targetApps = _.filter(apps, (appName) =>
    appName.toLowerCase().startsWith(inputStr.toLowerCase())
  );

  return arvish.output(
    targetApps.map((appName) => {
      return {
        title: appName,
        arg: `${conf.applicationFolder.win32}${path.sep}${appName}`,
        icon: {
          path: `${__dirname}${sep}icons${sep}${getIcon(fileName)}`,
        },
      };
    }),
    { print: false }
  );
};

module.exports = { getItems };
