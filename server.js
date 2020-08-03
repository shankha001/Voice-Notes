require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

//======MONGODB(LOCAL)=====//
// mongoose.connect('mongodb://localhost:27017/notesDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

//======MONGODB(ATLAS)=====//
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const notesSchema = {
  content: String,
};
const Note = mongoose.model('Note', notesSchema);

//=======ROUTES======//

//read
app.get('/', (req, res) => {
  Note.find({}, (err, notes) => {
    res.render('body', { noteslist: notes });
  });
});

//add
app.post('/add', (req, res) => {
  let notecontent = req.body.notecontent;
  // console.log(notecontent);
  const note = new Note({
    content: notecontent,
  });
  note.save();
  res.redirect('/');
});

//delete
app.post('/delete', (req, res) => {
  const checkedItemId = req.body.checkbox;
  // console.log(checkedItemId);
  Note.findByIdAndDelete(checkedItemId, (err) => {
    if (!err) {
      res.redirect('/');
    }
  });
});

//=====LISTEN=====//

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
