const { response } = require("../helpers");
const transferModel = require("../models/transfer");
var admin = require("firebase-admin");

module.exports = {
  getHistoryUser: async function (req, res) {
    try {
      const { id } = req.token;
      let { order } = req.query;
      const result = await transferModel.getHistoryUser(id, order);
      response(res, 200, result);
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
  getAllHistoryUser: async function (req, res) {
    try {
      const { id } = req.token;
      const result = await transferModel.getAllHistoryUser(id);
      response(res, 200, result);
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
  getHistoryToday: async function (req, res) {
    try {
      const { id } = req.token;
      const result = await transferModel.getHistoryToday(id);
      response(res, 200, result);
    } catch (error) {
      response(res, 500, { message: error.message });
    }
  },
  getHistoryByFilter: async function (req, res) {
    try {
      const { id } = req.token;
      const { start, end } = req.query;
      const result = await transferModel.getHistoryByFilter(start, end, id);
      response(res, 200, result);
    } catch (error) {
      response(res, 500, { message: error.message });
    }
  },
  postTransfer: async function (req, res) {
    try {
      const pinBody = req.body.pin;
      const { id, pin } = req.token;
      if (pinBody == pin) {
        const { phone } = req.body;
        const setData = req.body;
        delete setData.pin;
        delete setData.phone;
        setData.id_sender = id;

        await transferModel.patchBalanceReceiver(setData.id_receiver);
        delete setData.id_receiver;

        const idTransfer = await transferModel.getMaxId();

        const result = await transferModel.postTransfer(phone, setData);
        res.status(201).send({
          message: "Success created a transfer",
          data: result,
        });

        const dataSender = await transferModel.getSenderData(idTransfer[0].id);
        if (dataSender) {
          await admin.messaging().sendToDevice(dataSender[0].device_token, {
            notification: {
              title: "Receive Transfer",
              body: `Incoming transfer Rp.${dataSender[0].totalTransfer} from ${dataSender[0].sender}`,
            },
          });
        }
      } else {
        res.status(403).send({
          message: "Invalid PIN",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
};
