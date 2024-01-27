const Jimp = require("jimp");

const jimp = async (img) => {
  const result = await Jimp.read(img);
  await result.resize(250, 250).autocrop().write(img);
};

module.exports = jimp;
