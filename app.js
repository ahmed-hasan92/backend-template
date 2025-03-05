const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();

const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');
const databaseConnection = require('./database');
const passport = require('passport');
const { localStrategy, jwtStrategy } = require('./middlewares/passport');
const userRoutes = require('./api/user/user.routes');

const port = process.env.PORT;

const corsOptions = {
  origin: '*', // Change it with your app domain
  methods: 'POST,PUT,GET,DELETE',
  credentials: true,
};

// Don't forgot to create your .env file. This app might crush because of absence of the .env file please add and replace the currnt environmental variables with yours

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use(passport.initialize());
passport.use('local', localStrategy);
passport.use('jwt', jwtStrategy);

app.use('/api', userRoutes);
app.use(errorHandler);
app.use(notFound);
databaseConnection();
app.listen(port, () => {
  console.log(`The app works on port: ${port}`);
});
