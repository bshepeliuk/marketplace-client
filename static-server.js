/* eslint-disable no-console */
const fastify = require('fastify');
const fastifyStatic = require('fastify-static');
const path = require('path');

const app = fastify();
const PORT = process.env.PORT || 8080;

app.register(fastifyStatic, {
  root: path.join(__dirname, 'build'),
  wildcard: false,
  prefix: '/',
});

app.setNotFoundHandler((req, res) => {
  res.sendFile('index.html');
});

app.listen(PORT, '0.0.0.0', (error) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  console.log(`---> server running at ${PORT}`);
});
