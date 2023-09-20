const { check, validationResult } = require('express-validator');


let validatorParams = [
  check('email').isEmail(),
  check('password').isLength({ min: 8, max: 15}),
  check('name_user').isLength({ min: 1, max: 255}),
  check('lastName').isLength({ min: 1, max: 255})
];
   

function validator(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}


module.exports = {
    validatorParams,
    validator
}


