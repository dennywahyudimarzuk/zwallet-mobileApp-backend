const db = require("../../config/mysql");

module.exports = {
  getTransfer: function (query) {
    return new Promise((resolve, reject) => {
      const { page, limit } = query;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const sql = `SELECT * FROM transfer`;
      db.query(sql, (err, result) => {
        if (!err) {
          const resultUsers = result.slice(startIndex, endIndex);
          resolve(resultUsers);
        } else {
          reject(err);
        }
      });
    });
  },

  deleteTransfer: (id, setData) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM transfer WHERE id=${id}`,
        setData,
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

  // searchUser: (query, token) => {
  //   return new Promise((resolve, reject) => {
  //     const { page, limit, receiver } = query;
  //     const { id } = token;
  //     const startIndex = (page - 1) * limit;
  //     const endIndex = page * limit;

  //     const sql = `SELECT * FROM transfer WHERE (receiver) LIKE '%${receiver}%' AND id <> ${id} ORDER BY receiver ASC`;
  //     db.query(sql, (err, result) => {
  //       let array = [];
  //       if (result.length === array.length) {
  //         reject(err);
  //       } else {
  //         if (!err) {
  //           const resultUsers = result.slice(startIndex, endIndex);
  //           resolve(resultUsers);
  //         } else {
  //           reject(err);
  //         }
  //       }
  //     });
  //   });
  // },

  searchReceiver: (receiver, id) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM transfer WHERE (receiver) LIKE '%${receiver}%' AND id <> ${id} ORDER BY receiver ASC`;
      db.query(sql, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
