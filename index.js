const path = require("path");

const getPluginItem = (inputStr) => {
  switch (process.platform) {
    case "win32":
      break;
    case "darwin":
      break;
    case "liunx":
      break;
  }
  return {
    items,
  };
};

// Export a function that has inputStr as a argument.
module.exports = getPluginItem;
