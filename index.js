const { getItems: getDarwinItems } = require("./darwin");
const { getItems: getWindowsItems } = require("./win32");

const getPluginItem = async (inputStr) => {
  switch (process.platform) {
    case "win32":
      return getWindowsItems(inputStr);
    case "darwin":
      return getDarwinItems(inputStr);
    case "liunx":
      break;
    default:
      return [
        {
          title: "Not supported platform!",
          valid: false,
        },
      ];
  }
};

module.exports = getPluginItem;
