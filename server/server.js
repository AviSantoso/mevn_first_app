const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./models');

const todoRouter = require('./routes/todo.js');

const PORT_APP = process.env.PORT_APP || 8081;
const PORT_SERVER = process.env.PORT_SERVER || 8080;

const corsOrigin = `http://localhost:${PORT_APP}`;
const corsOptions = { origin: corsOrigin };

async function main() {
  const app = express();

  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  try {
    await db.mongoose.connect(db.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database!');
  } catch (err) {
    console.log('Cannot connect to the database!', err);
    process.exit();
  }

  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my todo list!' });
  });

  app.use('/api/todos', todoRouter);

  app.listen(PORT_SERVER, () =>
    console.log(`listening on port ${PORT_SERVER}`)
  );
}

main();
