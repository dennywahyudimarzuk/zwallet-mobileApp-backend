const db = require("../config/mysql");

module.exports = {
  getHistoryUser: function (id, order, offset) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT amount, receiver, photo, sender, photo_sender, date FROM transfer WHERE id_sender=${id} OR id_receiver=${id} ORDER BY ${order}(date))) DESC`,
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
  getAllHistoryUser: function (id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT amount, receiver, photo, sender, note, photo_sender, id_sender FROM transfer WHERE id_sender=${id} OR id_receiver=${id} ORDER BY date DESC LIMIT 4`,
        (err, res) => {
          if (!err) {
            resolve(res);
            // db.query(`SELECT amount, name FROM transaction WHERE id_user=${id} ORDER BY createdAt DESC`, (error, result) => {
            //     if(!error) {
            //         const newData = [
            //             ...result,
            //             ...res
            //         ]
            //         resolve(newData)
            //     } else {
            //         reject(new Error(error))
            //     }
            // })
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  getAllsHistoryUser: function (id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT amount, receiver, photo, sender, note, photo_sender, id_sender FROM transfer WHERE id_sender=${id} OR id_receiver=${id} ORDER BY date DESC`,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  getHistoryToday: function (id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT amount, receiver, photo, sender, photo_sender, date FROM transfer WHERE DATE(date) = CURDATE() AND id_receiver=${id} OR DATE(date) = CURDATE() AND id_sender=${id}`,
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
  getHistoryByFilter: function (start, end, id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT amount, receiver, photo, sender, photo_sender FROM transfer WHERE DATE(date) BETWEEN '${start} AND ${end}' AND id_receiver=${id} OR DATE(date) BETWEEN '${start}' AND '${end}' AND id_sender=${id}`,
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
  updateHistorySender: function (data, id) {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE transfer SET ? WHERE id_sender=${id}`,
        data,
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
  updateHistoryReceiver: function (data, id) {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE transfer SET ? WHERE id_receiver=${id}`,
        data,
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
  postTransfer: function (phone, setData) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT id AS id_receiver, name AS receiver, photo FROM users WHERE phone=${phone}`,
        (err, result) => {
          if (!err) {
            const newData = {
              ...setData,
              ...result[0],
            };
            db.query(`INSERT INTO transfer SET ?`, newData, (err, result) => {
              if (!err) {
                resolve(result);
              } else {
                reject(new Error(err));
              }
            });
          }
        }
      );
    });
  },
  patchBalanceReceiver: (id_receiver) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT balance AS newBalance from users where id=${id_receiver}`,
        (err, result) => {
          if (!err) {
            db.query(
              `UPDATE users SET balance=${result[0].newBalance} WHERE id=${id_receiver}`,
              (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                  reject(new Error(err));
                }
              });
          }
        }
      );
    });
  },
  getSenderData: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select transfer.amount as totalTransfer, u1.name as sender, u2.device_token as device_token from transfer inner join users as u1 on transfer.id_sender=u1.id inner join users as u2 on transfer.id_receiver=u2.id where transfer.id =${id}`,
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
  getMaxId: () => {
    return new Promise((resolve, reject) => {
      db.query(`select max(id+1) as id from transfer`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
