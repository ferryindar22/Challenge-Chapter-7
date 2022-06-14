const { urlencoded } = require('express');
const express = require ('express');
const session = require ('express-session');
const flash = require ('express-flash');
const PORT = process.env.PORT || 3000;
const app = express();
const router = require('./routers')
const passport = require('./lib/passport')

app.use(express.urlencoded({extended: false}));
app.use(express.json())

app.use(
    session({
    secret: 'rahasia',
    resave: false,
    saveUninitialized: false
}))

app.use(flash());
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs');

app.use('/', router);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));


