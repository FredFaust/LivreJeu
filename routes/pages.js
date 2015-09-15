var express = require('express');
var router = express.Router();

router.use(function(req,res,next) {
	console.log("faust a un petit pen");
	console.log("/" + req.method);
	next();
})

/* GET page. */
//:pagenumber
router.get('/pages/:pagenumber', function(req, res, next) {
	var pageNumber = req.params.pagenumber;
	res.render('page', { page: pageNumber} );
	console.log("faust a bande");
});

module.exports = router;
