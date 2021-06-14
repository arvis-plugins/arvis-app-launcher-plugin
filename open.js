const arvish = require("arvish");
const fse = require("fs-extra");
const open = require("open");
const execa = require("execa");

const handleDesktopFile = async (input) => {
  const desktopFile = await fse.readFile(input, { encoding: "utf8" });
  const lines = desktopFile.split("\n");
  const dict = {};
  for (const line of lines) {
    const [key, ...value] = line.split("=");
    dict[key] = value.join("=");
  }

  if (!dict["Exec"]) {
    return "";
  } else {
    return dict["Exec"];
  }
};

(async function () {
  if (process.platform === "linux") {
    const command = await handleDesktopFile(arvish.input);
    execa.commandSync(command);
  } else {
    await open(arvish.input);
  }
})();