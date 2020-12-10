const transferModel = require("../models/transfer");
const { response } = require("../../helpers");

module.exports = {
  getTransfer: async function (req, res) {
    try {
      const result = await transferModel.getTransfer(req.query);
      response(res, 200, result);
    } catch (err) {
      response(res, 500, { message: err.message });
    }
  },

  deleteTransfer: async (req, res) => {
    try {
      const { id } = req.params;
      await transferModel.deleteTransfer(id);
      res.status(200).send({
        message: "Success delete data users",
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },

  searchReceiver: async function (req, res) {
    try {
      const { q } = req.query;
      const { id } = req.token;
      const result = await transferModel.searchReceiver(q, id);
      response(res, 200, result);
    } catch (err) {
      response(res, 500, { message: err.message });
    }
  },
};
