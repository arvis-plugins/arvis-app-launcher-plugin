const fse = require("fs-extra");
const _ = require("lodash");
const arvish = require("arvish");
const path = require("path");
const os = require("os");
const fg = require("fast-glob");
// const { extractIcon } = require("@bitdisaster/exe-icon-extractor");
const conf = require("./conf");

const sep = path.sep;

const getIcon = (appName) => {
  if (arvish.config.has('cachingComplete')) {
    return `${appName}.app.png`;
  }

  return "icon.png";
};

const cacheIcon = async () => {
  try {
    if (!(await fse.pathExists(`${arvish.env.cache}/icons`))) {
      await fse.mkdir(`${arvish.env.cache}/icons`);
    }

    const globOpts = {
      absolute: true,
      caseSensitiveMatch: false,
      concurrency: conf.concurrency ? conf.concurrency : os.cpus().length,
      deep: process.platform === "darwin" ? 1 : conf.deep,
      dot: false,
      onlyFiles: true,
    };

    const appPaths = [];
    const targetPath =
      `${conf.applicationFolders["win32"][0]}${sep}**${sep}*.lnk`
        .split("\\")
        .join("/");

    fg(targetPath, globOpts)
      .then((lnkPaths) => {

      })
      .catch(console.error);

    // appPaths.map(async appPath => {
    //   const fileName = appPath.split(path.sep).pop();
    //   const buf = extractIcon(appPath, "large");
    //   await fse.writeFile(`${arvish.env.cache}/icons/${fileName}.png`, buf);
    // });

    arvish.config.set("cachingComplete", true);

  } catch (err) {
    console.log("Error occured", err);
  }
};

module.exports = { getIcon, cacheIcon };
