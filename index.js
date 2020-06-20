// Import dependencies
const express = require('express');
const fs = require('fs');
const { limitRequests, Blacklist } = require('./Limiter');

const app = express();
const port = 3000;

// Apply to all requests
app.get('/', limitRequests(1, 1), (req, res) => {
	if (Blacklist.includes(req.ip)) {
		res.send('access denied');
	} else {
		res.send('hello world');
	}
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));