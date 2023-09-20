const nJwt = require('njwt');
const config = require('../config/keys');

const njwtAuth = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided' });
  }

  const tokenValue = token.split(' ')[1];

  console.log("TOKEN", tokenValue);

  nJwt.verify(tokenValue, config.SIGNING_KEY_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(400).send({ auth: false, message: err });
    }

    const { email, rol } = decoded.body;
    
    res.status(200).send({ auth: true, message: { email, rol } });
  });
};

module.exports = {
  njwtAuth
};
