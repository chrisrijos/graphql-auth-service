const jwt = require('jsonwebtoken'),
      bcrypt = require('bcrypt');

const signToken = str => {
  return new Promise(resolve => {
    resolve(jwt.sign({apiKey: str}, process.env.JWT_KEY))
  });
}

const verifyJWT = req => {
  let token;
  if (req.query && req.query.hasOwnProperty('access_token')) {
    token = req.query.access_token
  } else if (req.headers.authorization && req.headers.authorization.includes('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (error) reject('401: User is not authenticated');

      resolve(decoded);
    })
  })
}

const hashPwd = pwd => {
  return bcrypt.hashSync(pwd, bcrypt.genSaltSync(8));
}

const validPwd = pwd => {
  return bcrypt.compareSync(password, this.password);
}

module.exports = {
  signToken,
  verifyJWT,
  hashPwd,
  validPwd
}