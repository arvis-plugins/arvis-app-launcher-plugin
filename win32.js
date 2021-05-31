const path = require("path");
// To do:: Change below logic using arvish.conf
const conf = require("./conf.json");
const fg = require("fast-glob");
const os = require("os");

const sep = path.sep;

const getIcon = () => {
  return "icon.png";
};

const getItems = async (inputStr) => {
  return new Promise((resolve, reject) => {
    const globOpts = {
      dot: true,
      cwd: path.parse(process.cwd()).root,
      absolute: true,
      caseSensitiveMatch: false,
      deep: conf.deep,
      concurrency: conf.concurrency ? conf.concurrency : os.cpus().length,
      suppressErrors: true,
      followSymbolicLinks: true,
      onlyFiles: true,
    };

    const targetPath = `${conf.applicationFolder.win32}${sep}**${sep}*${inputStr}*`
      .split("\\")
      .join("/");

    fg(targetPath, {})
      .then((targetApps) => {
        resolve({
          items: targetApps.map((appPath) => {
            const appName = appPath.split("/").pop();
            let appNameWithoutExt = appName.split(".");
            appNameWithoutExt.pop();
            appNameWithoutExt = appNameWithoutExt.join('.');

            return {
              title: appNameWithoutExt,
              subtitle: appPath,
              arg: appPath,
              icon: {
                path: `${__dirname}${sep}icons${sep}${getIcon(appName)}`,
              },
            };
          }),
        });
      })
      .catch((err) => {
        console.error("arvis-app-launcher-plugin throws an Error", err);
        resolve({ items: [] });
      });
  });
};

module.exports = { getItems };
