const express = require('express');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');
const sequelize = require('./config/database');
const Species = require('./models/species');

const app = express();
const PORT = process.env.PORT || 4511;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

console.log('Current directory:', __dirname);
console.log('Files in public/styles:', fs.readdirSync(path.join(__dirname, 'public', 'styles')));

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

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(error => console.error('データベース初期化エラー:', error));

