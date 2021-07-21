const arvish = require('arvish');

module.exports = {
  applicationFolders: JSON.parse(process.env.applicationFolders),
  deep: Number(process.env.deep),
  cachingComplete: arvish.config.get('cachingComplete')
};