const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cardsRoutes = require('./routes/cards');
const userRoutes = require('./routes/users');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // in 15 minutes
  max: 100, // you can make a maximum of 100 requests from one IP
});

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
});

const { PORT = 3000 } = process.env;

mongoose.connection
  .once('open', () => {
    console.log('Connected');
  })
  .on('error', (error) => {
    console.log('Your Error', error);
  });

const app = express();
app.use(
  cors({
    origin: '*',
  })
);

app.use(limiter);

app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});
app.use('/', cardsRoutes);
app.use('/', userRoutes);
app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});
app.listen(PORT, () => {});
