const crypto = require("crypto");

function hashValue(value) {
  const hash = crypto.createHash("sha256");
  hash.update(value);
  return hash.digest("hex");
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const parseUserDataFromHash = (userHash) => {
  return {
    login: hashValue(userHash[0]),
    password: hashValue(userHash[1]),
  };
};

const getUserIDByEmail = (db, email) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT UserID FROM User WHERE Email = ?", [email], (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user ? user.UserID : null);
      }
    });
  });
};

module.exports = {
  parseUserDataFromHash,
  getRandomInt,
  hashValue,
  getUserIDByEmail,
};
