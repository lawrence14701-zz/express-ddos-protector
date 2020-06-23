const TokenBucket = require('./TokenBucket');

class Limiter {
	constructor() {
		this.Blacklist = [];
	}

	/**
	 * Represents how many request a user can make before being blacklisted .
	 * @constructor
	 * @param {int} perSecond - How many requests the bucket fills per second.
	 * @param {int} maxReq - the max request capacity of the bucket.
	 * @param {int} timeInMs - Time in milliseconds.
	 */

	limitRequests(perSecond, maxReq, timeInMs) {
		//map of all the ip addresses
		const buckets = new Map();
		const that = this;

		// Return an Express middleware function
		return function limitRequestsMiddleware(req, res, next) {
			if (!buckets.has(req.ip)) {
				buckets.set(req.ip, new TokenBucket(perSecond, maxReq, timeInMs));
			}
			const bucketForIP = buckets.get(req.ip);
			if (bucketForIP.take()) {
				next();
			} else {
				res.send('Your Ip has been blacklisted');
				if (!that.Blacklist.includes(req.ip)) {
					that.Blacklist.push(req.ip);
				}
			}
		};
	}
}

module.exports = Limiter;
