module.exports = {
  applicationFolders: JSON.parse(process.env.applicationFolders),
  deep: Number(process.env.deep),
  cachingComplete: Boolean(process.env.cachingComplete),
};