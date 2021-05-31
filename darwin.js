const plistParser = require("plist");

const getIcon = () => {
  return "icon.png";
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

module.exports = { getIcon };
