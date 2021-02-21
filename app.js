const express = require('express');
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');


const app = express();

// View engine setup
app.engine('handlebars', exphbs({
  extname: '.hbs',
  defaultLayout: null
}));

app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('./routes/home'));

app.use(require('./routes/send'));




// app.listen(PORT, () => console.log('Server started...'));

app.listen(PORT, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});