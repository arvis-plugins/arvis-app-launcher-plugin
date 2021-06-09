const path = require("path");
const stringSimilarity = require("string-similarity");
const fg = require("fast-glob");
const os = require("os");
const arvish = require("@jopemachine/arvish");
const { getIcon: getWin32Icon } = require("./win32");
const { getIcon: getDarwinIcon } = require("./darwin");
const { getIcon: getLinuxIcon } = require("./linux");
require("./init");

const conf = arvish.getConfig().get("setting");
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
      return `${
        conf.applicationFolder[process.platform]
      }${sep}**${sep}*${inputStr}*`;
  }
};

const getPluginItem = async ({ inputStr }) => {
  if (
    inputStr === "@config" ||
    inputStr.startsWith("@config/arvis-app-launcher-plugin")
  ) {
    return {
      items: [
        {
          title: "Open config file of arvis-app-launcher-plugin",
          subtitle: arvish.getConfig().path,
          arg: arvish.getConfig().path,
        },
      ],
    };
  }

  return new Promise((resolve, reject) => {
    const globOpts = {
      absolute: true,
      caseSensitiveMatch: false,
      concurrency: conf.concurrency ? conf.concurrency : os.cpus().length,
      cwd: path.parse(process.cwd()).root,
      deep: process.platform === "darwin" ? 1 : conf.deep,
      dot: false,
      onlyFiles: process.platform === "darwin" ? false : true,
      suppressErrors: true,
    };

    const getFileOrDirName = (filePath) => {
      return filePath.endsWith("/")
        ? filePath
            .substring(0, filePath.length - 1)
            .split("/")
            .pop()
        : filePath.split("/").pop();
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
