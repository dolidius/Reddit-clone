const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//enable cors
app.use(cors());


//passport
const passport = require('passport');
app.use(passport.initialize());
require('./config/passport')(passport);

//bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db
const db = require('./config/config').mongoURI;
mongoose.connect(db, { useNewUrlParser: true })
    .then(() =>console.log('Connected to database'))
    .catch(err => console.log(`Something is wrong with database connection ;() - ${err}`));


// routes
const users = require('./routes/api/users');
const subreddits = require('./routes/api/subreddits');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

app.use('/api/users', users);
app.use('/api/subreddits', subreddits);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

const port = process.env.port || 5000;

// Server static assets if in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Server running on port ${port}`));