class TokenBucket {
	constructor(fillPerSecond, capacity, timeInMs) {
		this.capacity = capacity;
		this.tokens = capacity;
		setInterval(() => this.addToken(), timeInMs / fillPerSecond);
	}

	addToken() {
		if (this.tokens < this.capacity) {
			this.tokens += 1;
		}
	}

	take() {
		if (this.tokens > 0) {
			this.tokens -= 1;
			return true;
		}

		return false;
	}
}

module.exports = TokenBucket;
