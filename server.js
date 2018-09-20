const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const profile = require('./routes/api/profiles');
const posts = require('./routes/api/posts');

const app = express();
const port = process.env.PORT || 5000;

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('An Error Ocurred', err));

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// port listening
app.listen(port, () => console.log(`Listening on port -> ${port}`));
