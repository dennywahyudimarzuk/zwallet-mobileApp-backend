const topupModel = require('../models/topup')
const service = require("../services/service");

module.exports = {
    getAllTopUp: async function(req, res) {
        try {
            const result = await topupModel.getAllTopUp()
            res.status(200).send({
                message: 'Success get all post',
                data: result
            })
        } catch (err) {
            res.status(500).send({
                message: err.message
            })
        }
    },

    chargeTopUp: async function(req,res){
        try {
            const { amount } = req.body;
            const { id, email, balance} = req.token;
            const result = {
                id: id,
                email: email,
            }
            const token = await service.postCharge(amount,req.token);
            res.status(200).send({
                success: true,
                data: {...result, token: token}
            })
        }catch(err){
            res.status(500).send({
                success: false,
                message: err.message
            })
        }
    },
}