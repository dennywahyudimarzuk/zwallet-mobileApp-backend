const db = require('../config/mysql')
const service = require('../services/service');

module.exports = {
    getAllTopUp: function() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM topup ORDER BY sequence ASC', (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    //add transactions data topup 
    addTransactionsData: function(data){
        return new Promise((resolve,reject) => {
            db.query("INSERT INTO transaction SET ?", data, (err, result) => {
                if(!err){
                    resolve(result);
                }else{
                    reject(new Error(err));
                }
            })
        });
    },
    
    //topup charge
    charge: function(amount,data){
        const { id } = req.token;
        return new Promise((resolve,reject) => {
            services.postCharge(amount,data)
            .then(results => {
                resolve(results);
            }).catch(err => {
                reject(new Error(err));
            })
        })
    },
}