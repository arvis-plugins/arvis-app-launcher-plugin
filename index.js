const path = require("path");
const stringSimilarity = require("string-similarity");
const fg = require("fast-glob");
const os = require("os");
const arvish = require("arvish");
const { getIcon: getWin32Icon } = require("./win32");
const { getIcon: getDarwinIcon } = require("./darwin");
const { getIcon: getLinuxIcon } = require("./linux");
require("./init");

const conf = arvish.config.get("setting");
const sep = path.sep;

const getIcon =
  process.platform === "darwin"
    ? getDarwinIcon
    : process.platform === "win32"
    ? getWin32Icon
    : getLinuxIcon;

const getTargetPath = (inputStr) => {
  switch (process.platform) {
    case "win32":
      return `${
        conf.applicationFolder[process.platform]
      }${sep}**${sep}*${inputStr}*`
        .split("\\")
        .join("/");
    case "darwin":
      return `${conf.applicationFolder[process.platform]}${sep}*${inputStr}*`;
    case "linux":
      return "";
  }
};

const getPluginItem = async (inputStr) => {
  if (inputStr === "@config/arvis-app-launcher-plugin") {
    return {
      items: [
        {
          title: "Open config file of arvis-app-launcher-plugin",
          subtitle: arvish.config.path,
          arg: arvish.config.path,
        },
      ],
    };
  }

  return new Promise((resolve, reject) => {
    const globOpts = {
      dot: false,
      cwd: path.parse(process.cwd()).root,
      absolute: true,
      caseSensitiveMatch: false,
      concurrency: conf.concurrency ? conf.concurrency : os.cpus().length,
      suppressErrors: true,
      deep: process.platform === "darwin" ? 1 : conf.deep,
      onlyFiles: process.platform === "darwin" ? false : true,
    };

    const getFileOrDirName = (filePath) => {
      return filePath.endsWith(sep)
        ? filePath
            .substring(0, filePath.length - 1)
            .split(sep)
            .pop()
        : filePath.split(sep).pop();
    };

    const targetPath = getTargetPath(inputStr);

    fg(targetPath, globOpts)
      .then((targetApps) => {
        const items = targetApps.map((appPath) => {
          const appName = getFileOrDirName(appPath);
          return {
            title: appName,
            subtitle: appPath,
            arg: appPath,
            icon: {
              path: `${__dirname}${sep}icons${sep}${getIcon(appName)}`,
            },
            similarity: stringSimilarity.compareTwoStrings(inputStr, appName),
          };
        });

        resolve({
          items: items.sort((a, b) => (a.similarity < b.similarity ? 1 : -1)),
        });
      })
      .catch((err) => {
        console.error("arvis-app-launcher-plugin throws an Error", err);
        resolve({ items: [] });
      });
  });
};

module.exports = getPluginItem;
