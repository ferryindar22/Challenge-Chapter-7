const express = require ('express');
const router = express.Router();
const authRouter = require('./auth');
const restrict = require('../middleware/restrict')

router.get('/', (req, res) => res.render('index'))
router.use('/auth', authRouter)

module.exports = router;