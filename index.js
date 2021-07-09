const path = require("path");
const fg = require("fast-glob");
const os = require("os");
const arvish = require("arvish");
const { getIcon: getWin32Icon } = require("./win32");
const { getIcon: getDarwinIcon } = require("./darwin");
const { getIcon: getLinuxIcon } = require("./linux");
const conf = require("./conf");

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
      return `${conf.applicationFolder[process.platform]
        }${sep}**${sep}*${inputStr}*`
        .split("\\")
        .join("/");
    case "darwin":
      return `${conf.applicationFolder[process.platform]}${sep}*${inputStr}*`;
    case "linux":
      return `${conf.applicationFolder[process.platform]
        }${sep}**${sep}*${inputStr}*`;
  }
};

const getPluginItem = async ({ inputStr }) => {
  if (inputStr === "")
    return {
      items: [],
    };

  const configItems = [
    process.platform === "darwin"
      ? {
        command: "@cache/arvis-app-launcher-plugin",
        title: "Cache app icons of arvis-app-launcher-plugin",
        subtitle: "@cache/arvis-app-launcher-plugin",
        variables: {
          action: "cache",
        },
      }
      : undefined,
  ];

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
      const name = filePath.endsWith("/")
        ? filePath
          .substring(0, filePath.length - 1)
          .split("/")
          .pop()
        : filePath.split("/").pop();

      if (name.includes(".")) {
        return name.split(".")[0];
      } else {
        return name;
      }
    };

    const targetPath = getTargetPath(inputStr);

    fg(targetPath, globOpts)
      .then((targetApps) => {
        const items = [
          ...targetApps.map((appPath) => {
            const appName = getFileOrDirName(appPath);

            return {
              title: appName,
              subtitle: appPath,
              arg: appPath,
              icon: {
                path: conf.cachingComplete ?
                  `${arvish.env.cache}${sep}icons${sep}${getIcon(appName)}` :
                  `${__dirname}${sep}icon.png`,
              },
              variables: {
                action: "open",
              },
            };
          }),
          ...configItems,
        ];

        resolve({
          items,
        });
      })
      .catch((err) => {
        console.error("arvis-app-launcher-plugin throws an Error", err);
        resolve({ items: [] });
      });
  });
};

module.exports = getPluginItem;
