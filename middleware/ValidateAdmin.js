const nJwt = require('njwt');
const config = require('../config/keys');

const njwtAuth = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided' });
  }

  const tokenValue = token.split(' ')[1];

  nJwt.verify(tokenValue, config.SIGNING_KEY_TOKEN, (err, decoded) => {
    if (err || decoded.body.rol !== "ADMIN") {
      return res.status(400).send({ auth: false, message: err });
    };

    next();

    const { email, rol } = decoded.body;
    
   console.log(({ auth: true, message: { email, rol } }));


  });
};

module.exports = {
  njwtAuth
};
