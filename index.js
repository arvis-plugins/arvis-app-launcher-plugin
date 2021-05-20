const { getItems: getDarwinItems } = require("./darwin");

const getPluginItem = async (inputStr) => {
  switch (process.platform) {
    case "win32":
      break;
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
