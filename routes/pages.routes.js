const express = require("express");
const router = express();

//길재형 page
router.get('/signin', (req, res) => {
	res.render('signin', {user: null})
});

router.get('/signup', (req, res) => {
	res.render('signup', {user: null})
});
//

//변정민 page

//

//이호균 page

//

//이설인 page

//

module.exports = router;