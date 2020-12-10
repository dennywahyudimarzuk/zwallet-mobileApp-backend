const bcrypt = require("bcrypt");
const userModels = require("../models/user");
const { updateHistoryReceiver, updateHistorySender} = require('../../models/transfer')
const { response } = require("../../helpers");

module.exports = {
  getAllUser: async (req, res) => {
    try {
      const result = await userModels.getAllUser(req.query);
      response(res, 200, result);
    } catch (error) {
      response(res, 500, { message: error.message });
    }
  },

  searchByName: async function (req, res) {
    try {
      const { q } = req.query;
      const { id } = req.token;
      const result = await userModels.searchByName(id, q);
      response(res, 200, result);
    } catch (error) {
      response(res, 500, { message: error.message });
    }
  },

  editUser: async (req, res) => {
    try {
      const { id } = req.params;
      const setData = req.body;

      if (req.file) {
        setData.photo = req.file.filename;
        await updateHistorySender({photo_sender: req.file.filename}, id)
        await updateHistoryReceiver({ photo: req.file.filename}, id)
      }

      if(req.body.name) {
        await updateHistorySender({sender: req.body.name}, id)
        await updateHistoryReceiver({receiver: req.body.name}, id)
      }

      if (setData.password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(setData.password, salt);
        setData.password = hash;
      }

      const result = await userModels.editUser(id, setData);
      if (result.affectedRows) {
        res.status(201).send({
          message: `${Object.keys(req.file || req.body)} successfully edited`,
          data: result,
        });
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      await userModels.deleteUser(id);
      res.status(200).send({
        message: "Success delete data users",
      });
    } catch {
      res.status(500).send({
        message: error.message,
      });
    }
  },
};
