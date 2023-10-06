const bcrypt = require('bcrypt');


function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

module.exports = verifyPassword;
