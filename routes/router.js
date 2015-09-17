var express = require('express'),
    router = express.Router(),
    url = require('../constants/url');

router.get(url.HOME, function(req, res) {
  res.render('pages/home', { title: 'THE GAMEBOOK OF MASTER KAI' });
});

router.get(url.HELP, function(req, res) {
  res.render('pages/help', { title: 'HELP' });
});

router.get(url.START, function(req, res) {
  res.render('pages/start', { title: 'START' });
});

router.get(url.PAGES, function(req, res) {
  res.render('pages/book/page' + req.params.pagenumber, { title: 'PAGES', pageNumber: req.params.pagenumber });
});

router.get(url.PAGES_TODO, function(req, res) {
  res.render('pages/book/pageTODO', { title: 'PAGES' });
});

module.exports = router;


