const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const {createSchema} = require('./controllers/createSchemaController'); 

const app = express();
const port = 3000;

app.use(bodyParser.json(),bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
  // res.send('hello')
});
app.post('/createSchema',createSchema);


app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

