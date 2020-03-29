const jwt = require('../utils/jwt');

module.exports = (req, res, next) => {
  const authorizationHeader = req.get('Authorization');
  if (!authorizationHeader) {
    return res.status(401).end();
  }
  const [type, token] = authorizationHeader.split(' ');
  if (type != 'Bearer') {
    return res.status(401).end();
  }

  try {
    const id = jwt.verifyToken(token)['sub'];
    req.body.userId = id;
  } catch (error) {
    return res.status(401).end();
  }
  next();
};
