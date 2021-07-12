module.exports = {
  applicationFolder: JSON.parse(process.env.applicationFolder),
  deep: Number(process.env.deep),
  cachingComplete: Boolean(process.env.cachingComplete),
};