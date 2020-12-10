const db = require("../config/mysql");

module.exports = {
  searchAll: function (id,LIMIT) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT name, phone, photo, balance FROM users WHERE id <> ? AND role <> 6 ORDER BY name ASC LIMIT ${LIMIT}`,
        id,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  searchOneById: function (phone, token_id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE phone=${phone} AND role <> 6 AND id <> ${token_id}`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  searchByName: function (id, name, LIMIT) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT name, phone, photo, balance FROM users WHERE name LIKE '%${name}%' AND id <> ${id} AND role <> 6 ORDER BY name ASC LIMIT ${LIMIT}`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  getAllUser: function () {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  getUserLogin: function (id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT id, name, email, photo, phone, balance, verified, pin FROM users WHERE id=${id}`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  editUser: function (id, setData) {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET ? WHERE id=${id}`, setData, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
