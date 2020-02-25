const crypto = require('crypto');
const jwt = require('jsonwebtoken');

class Auth {
  constructor() {
    this._secret = crypto.randomBytes(32);
    this._secretCreatedTime = Date.now();

    // 24H 60Min 60Sec 1000MilliSec
    this._secretExpirationTime = 24 * 60 * 60 * 1000;
  }

  get secret() {
    if (Date.now() > this._secretCreatedTime + this._secretExpirationTime) {
      this._secret = crypto.randomBytes(32);
    }
    return this._secret;
  }

  signToken(id) {
    return jwt.sign({
      iss: 'SyskenLibray',
      sub: id,
    }, this.secret, {expiresIn: '3h'});
  }

  verifyToken(token) {
    return jwt.verify(token, this.secret, {algorithms: ['HS256']});
  }
};

module.exports = new Auth();
