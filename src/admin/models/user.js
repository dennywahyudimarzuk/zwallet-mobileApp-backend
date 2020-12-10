const db = require("../../config/mysql");

module.exports = {
  getAllUser: (query) => {
    return new Promise((resolve, reject) => {
      const { page, limit } = query;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const sql = `SELECT * FROM users WHERE role <> 6`;
      db.query(sql, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          const resultUsers = result.slice(startIndex, endIndex);
          resolve(resultUsers);
        }
      });
    });
  },

  searchByName: (id, name) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE name LIKE '%${name}%' AND id <> ${id} AND role <> 6 ORDER BY name ASC`,
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

  editUser: (id, setData) => {
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

  deleteUser: (id, setData) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM users WHERE id=${id}`, setData, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
