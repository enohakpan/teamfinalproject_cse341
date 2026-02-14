const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));

// router.get('/', (req, res) => {
//   res.send('Welcome to my personal project for week 3-4 of CSE341!');
// });

router.use('/african', require('./african'));
router.use('/asian', require('./asian'));
router.use('/western', require('./western'));
router.use('/other', require('./other'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;