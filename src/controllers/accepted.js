const userModel = require("../models/user");
const service = require("../services/service");
const topupModel = require("../models/topup");
const topup = require("../models/topup");

module.exports = {
    success: async function(req,res){
        res.status(201).send({
            success: true,
            message: "topup is successful",
        })
    },

    failed: async function(req,res){
        res.status(403).send({
            success: false,
            message: "forbidden"
        })
    },

    accepted: async function(req, res){
        try {
            const {id, order_id, name} = req.query;
            const status = await service.getStatus(order_id);
            const user = await userModel.getUserLogin(id);
            let dataTransactions = {
                name: name,
                id_user: id
            }
            if(status.transaction_status == "settlement" && status.order_id == order_id){
                const currentBalance = user[0].balance;
                const successBalance = parseInt(status.gross_amount);
                const total = currentBalance + successBalance;
                const newDataTransactions = {...dataTransactions, amount: status.gross_amount};
                await topupModel.addTransactionsData(newDataTransactions);
                await userModel.editUser(id,{balance: total});
                res.redirect(`http://localhost:3000/dashboard`);
            }else{
                res.redirect(`http://localhost:3000/topup`).send('Topup Failed');
            }
        }catch(err){
            res.redirect(`http://localhost:3000/topup`).send('Topup Failed');
        }
    }
}