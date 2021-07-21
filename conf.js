module.exports = {
  applicationFolders: JSON.parse(process.env.applicationFolders),
  deep: Number(process.env.deep),
  cachingComplete: process.env.cachingComplete === "true",
};