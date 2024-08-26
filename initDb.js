const { Sequelize } = require('sequelize');
const Species = require('./models/species');
const sequelize = require('./config/database');
const fs = require('fs');
const { parse } = require('csv-parse');
const path = require('path');

async function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(parse({ delimiter: ',', columns: true, trim: true }))
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

async function initializeDatabase() {
  try {
    // データベース接続の確認
    await sequelize.authenticate();
    console.log('データベースに接続しました。');

    // テーブルの作成（既存の場合は再作成）
    await Species.sync({ force: true });
    console.log('Speciesテーブルが作成されました。');

    // CSVファイルからデータを読み込む
    const csvFilePath = path.join(__dirname, 'data', 'species.csv');
    const speciesData = await readCSV(csvFilePath);

    // データの挿入
    await Species.bulkCreate(speciesData);
    console.log(`${speciesData.length}件のデータが挿入されました。`);

    console.log('データベースの初期化が完了しました。');
  } catch (error) {
    console.error('データベースの初期化中にエラーが発生しました:', error);
  } finally {
    await sequelize.close();
  }
}

initializeDatabase();

