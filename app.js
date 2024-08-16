const express = require('express');
const { Op } = require('sequelize');
const sequelize = require('./config/database');
const Species = require('./models/species');

const app = express();
const port = 4511;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const { query } = req.query;
  let species = [];
  let error = null;

  if (query) {
    try {
      species = await Species.findAll({
        where: {
          [Op.or]: [
            { japanese_name: { [Op.like]: `%${query}%` } },
            { scientific_name: { [Op.like]: `%${query}%` } },
            { order_name_ja: { [Op.like]: `%${query}%` } },
            { order_name_en: { [Op.like]: `%${query}%` } },
            { family_name_ja: { [Op.like]: `%${query}%` } },
            { family_name_en: { [Op.like]: `%${query}%` } },
            { genus_name: { [Op.like]: `%${query}%` } },
            { species_name: { [Op.like]: `%${query}%` } },
            { subspecies_name: { [Op.like]: `%${query}%` } },
            { distribution: { [Op.like]: `%${query}%` } }
          ]
        }
      });
    } catch (err) {
      console.error(err);
      error = '検索中にエラーが発生しました。';
    }
  }

  res.render('index', { species, query, error });
});

// データの初期化（アプリケーション起動時に一度だけ実行）
async function initializeData() {
  await Species.sync({ force: true });
  
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
  ]);

  console.log('データベースが初期化されました。');
}

sequelize.sync()
  .then(() => initializeData())
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch(error => console.error('データベース初期化エラー:', error));

