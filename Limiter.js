const TokenBucket = require('./TokenBucket');

const Blacklist = [];

const limitRequests = (perSecond, maxBurst) => {
	//map of all the ip addresses
	const buckets = new Map();

	// Return an Express middleware function
	return function limitRequestsMiddleware(req, res, next) {
		if (!buckets.has(req.ip)) {
			buckets.set(req.ip, new TokenBucket(maxBurst, perSecond));
		}

		const bucketForIP = buckets.get(req.ip);
		if (bucketForIP.take()) {
			next();
		} else {
			Blacklist.push(req.ip);
		}
	};
};

module.exports = { limitRequests, Blacklist };
