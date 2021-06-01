const arvish = require("arvish");

if (!arvish.config.has("setting")) {
  const defaultConfig = {
    applicationFolder: {
      win32: "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs",
      darwin: "/Applications",
      linux: "",
    },
    deep: 3,
  };

  arvish.config.set("setting", defaultConfig);
}
