const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes/user');

const app = express();


app.use(cors());

app.use(bodyParser.json({ type: 'application/json' }));
app.use('/api', routes);
// Serve front end a
app.listen(5000, () =>
  // eslint-disable-next-line no-console
  console.log(
    `App listening on port 5000.\n\nLoad it in your browser at http://localhost:5000`
  )
);
