const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Species = sequelize.define('Species', {
  // 和名
  japanese_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // 学名
  scientific_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // 目
  order_name_ja: {
    type: DataTypes.STRING,
    allowNull: true
  },
  order_name_en: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // 科
  family_name_ja: {
    type: DataTypes.STRING,
    allowNull: true
  },
  family_name_en: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // 属
  genus_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // 種
  species_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // 亜種
  subspecies_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // 分布
  distribution: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // 備考
  note: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Species;

