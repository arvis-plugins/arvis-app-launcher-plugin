const plistParser = require("plist");
const conf = require("conf.json");
const path = require("path");

const getIcon = () => {
  return "icon.png";
};

const getItems = async (inputStr) => {
  const inApplicationFolder = await fse.readdir(conf.applicationFolder.darwin);
  const apps = _.filter(inApplicationFolder, (appName) =>
    appName.endsWith(".app")
  );

  const targetApps = _.filter(apps, (appName) =>
    appName.toLowerCase().startsWith(inputStr.toLowerCase())
  );

  return {
    items: targetApps.map((appName) => {
      return {
        title: appName,
        arg: `${conf.applicationFolder.darwin}${path.sep}${appName}`,
        icon: {
          path: `${__dirname}${sep}icons${sep}${getIcon(fileName)}`,
        },
      };
    }),
  };
};

// * Need method to import icns to png format

// const cacheIcon = async () => {
//   const inApplicationFolder = await fse.readdir("/Applications");
//   const apps = _.filter(inApplicationFolder, (appName) =>
//     appName.endsWith(".app")
//   );

//   const targetApps = _.filter(apps, (appName) =>
//     appName.toLowerCase().startsWith(inputStr.toLowerCase())
//   );

//   await Promise.all(
//     targetApps.map(async (appName) => {
//       const plist = plistParser.parse(
//         await fse.readFile(`/Applications/${appName}/Info.plist`)
//       );

//       const iconName = plist.CFBundleIconName;
//       const iconPath = `/Applications/${appName}/Resources/${iconName}.icns`;
//     })
//   );
// };

module.exports = { getItems };
