# DDOS_protector

# Bucket strategy

## Protects Api from malicious users.

### To use this npm package please do \$npm i bucket-ddos

### import the npm package

#### const { limitRequests, Blacklist } = require('./Limiter');

### This package works as a callback function, to use it please refer to this example.

```javascript
const express = require('express');
const { limitRequests, Blacklist } = require('./Limiter');

const app = express();
const port = 3000;

// Apply to all requests
app.get('/', limitRequests(1, 2, 1000), (req, res) => {
	console.log(Blacklist);
	if (Blacklist.includes(req.ip)) {
		res.send('access denied');
	} else {
		res.send('hello world');
	}
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
```

### limiter function takes in three parameters (bucketFillPerInterval, maxReqInBucke, and intervalToFillBucket)

### In the above example I am filling the bucket once per second. If the user depletes the bucket quicker than it can fill up than he will be inserted in a blackList array. The bucket size in this example is two and I am filling the bucket once every 1000 ms (1 second)
