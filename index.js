// Import dependencies
const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const port = 3000;

const blackList = [];

const limiter = rateLimit({
	windowMs: 1000, // 1 second
	max: 1, // Limit each IP to 100 requests per windowMs
	message: 'access denied',
	onLimitReached(req, res, options) {
		blackList.push(req.ip);
	},
});

// Apply to all requests
app.get('/', limiter, (req, res) => {
	console.log(blackList);
	if (blackList.includes(req.ip)) {
		res.send('access denied');
	} else {
		res.send('hello world');
	}
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
