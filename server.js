const fastify = require('fastify');
const fastifyStatic = require('fastify-static');
const path = require('path');

const app = fastify();

const BuildPath = path.join(__dirname, 'build');
const PORT = process.env.PORT || 8080;

app.register(fastifyStatic, {
  root: BuildPath,
});

app.get('*', (_, res) => {
  try {
    res.sendFile('index.html');
  } catch (error) {
    res.log.error(error.message);
  }
});

app.listen(PORT, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  // eslint-disable-next-line no-console
  console.log(`App running at ${PORT}`);
});
