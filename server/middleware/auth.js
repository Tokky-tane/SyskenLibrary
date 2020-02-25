const auth = require('../utils/auth');

module.exports = (req, res, next) => {
  const authorizationHeader = req.get('Authorization');
  if (!authorizationHeader) {
    return res.status(401).end();
  }
  const [type, token] = authorizationHeader.split(' ');
  if (type != 'Bearer') {
    return res.status(400).end();
  }

  try {
    const id = auth.verifyToken(token)['sub'];
    req.body.user_id = id;
  } catch (error) {
    return res.status(401).end();
  }
  next();
};
