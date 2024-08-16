const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Species = sequelize.define('Species', {
  // 和名
  japanese_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // 学名
  scientific_name: DataTypes.STRING,
  // 目
  order_name_ja: DataTypes.STRING,
  order_name_en: DataTypes.STRING,
  // 科
  family_name_ja: DataTypes.STRING,
  family_name_en: DataTypes.STRING,
  // 属
  genus_name: DataTypes.STRING,
  // 種
  species_name: DataTypes.STRING,
  // 亜種
  subspecies_name: DataTypes.STRING,
  // 分布
  distribution: DataTypes.TEXT,
  // 備考
  note: DataTypes.TEXT
});

module.exports = Species;

