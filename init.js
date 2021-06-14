const arvish = require("arvish");

if (!arvish.getConfig().has("setting")) {
  const defaultConfig = {
    applicationFolder: {
      win32: "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs",
      darwin: "/Applications",
      linux: "/usr/share/applications",
    },
    deep: 3,
  };

  arvish.getConfig().set("setting", defaultConfig);
}
