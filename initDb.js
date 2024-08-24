const { Sequelize } = require('sequelize');
const Species = require('./models/species');
const sequelize = require('./config/database');

async function initializeDatabase() {
  try {
    // データベース接続の確認
    await sequelize.authenticate();
    console.log('データベースに接続しました。');

    // テーブルの作成（既存の場合は再作成）
    await Species.sync({ force: true });
    console.log('Speciesテーブルが作成されました。');

    // サンプルデータの挿入
    await Species.bulkCreate([
      {
        japanese_name: 'ニホンザル',
        scientific_name: 'Macaca fuscata',
        order_name_ja: '霊長目',
        order_name_en: 'Primates',
        family_name_ja: 'オナガザル科',
        family_name_en: 'Cercopithecidae',
        genus_name: 'Macaca',
        species_name: 'fuscata',
        distribution: '本州，四国，九州，屋久島',
        note: '日本固有種'
      },
      {
        japanese_name: 'ミズラモグラ',
        scientific_name: 'Euroscaptor mizura',
        order_name_ja: '食虫目',
        order_name_en: 'Insectivora',
        family_name_ja: 'モグラ科',
        family_name_en: 'Talpidae',
        genus_name: 'Euroscaptor',
        species_name: 'mizura',
        distribution: '本州の山地',
        note: ''
      },
    ]);
    console.log('サンプルデータが挿入されました。');

    console.log('データベースの初期化が完了しました。');
  } catch (error) {
    console.error('データベースの初期化中にエラーが発生しました:', error);
  } finally {
    await sequelize.close();
  }
}

initializeDatabase();
