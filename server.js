const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//routes
app.get('/', (req, res) => {
  res.render('body');
});

app.listen(3000, () => {
  console.log('Server started');
});
