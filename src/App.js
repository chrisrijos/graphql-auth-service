const express = require('express'),
      graphqlHTTP = require('express-graphql'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      pg = require('pg');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: 'development.env' })
}

//MOVE TO CONFIG
const pgPool = new pg.Pool({
  database: 'expressdb',
  host: 'localhost',
  port: 5432,
  user: 'chism',
  password: 'password',
});

pgPool.query('SELECT NOW()', (err, res) => {
  if (err) { 
    console.log(err); 
    process.exit();
  }
  console.log('Connected to -> ExpressDB');
});

const app = express();

app.set('port', process.env.PORT || 7000);

const ncSchema  = require('./schema');

const middleware = [
  cors(),
  bodyParser.json()
];

app.use('/graphql', ...middleware, (req, res) => {
      graphqlHTTP({
        schema: ncSchema,
        graphiql: process.env.NODE_ENV === 'development',
        context: { pgPool, req }
      })(req, res)
});

const server = app.listen(app.get('port'), () => {
  console.log(`Server running -> PORT ${server.address().port}`);
});

module.exports = app;
