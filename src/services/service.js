const midtransClient = require("midtrans-client");
const axios = require("axios");
const moment = require("moment");
const startDate = moment().format("yyyy.MM.DD h:mm:ss"); 
const newDate = moment(startDate,"yyyy-MM-DD h:mm:ss").add(1,"days").format("yyyy-MM-DD h:mm:ss");

const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.SERVER_KEY,
    clientKey: process.env.CLIENT_KEY
});

module.exports = {
    postCharge: (amount,data) => {
        return new Promise((resolve,reject) => {
            const parameter = {
                transaction_details: {
                    order_id: `transactions-${Date.now()}`,
                    gross_amount: amount
                  },
                  item_details: [{
                    id: `id-${Date.now()}`,
                    price: amount,
                    quantity: 1,
                    name: "Topup",
                    brand: "Zwallet",
                    category: "Transaction",
                    merchant_name: "Zwallet"
                  }],
                  customer_details: {
                    first_name: data.firstName,
                    last_name: data.lastName,
                    email: data.email,
                    phone: `0${data.phone}`,
                  },
                  enabled_payments: ["credit_card", "mandiri_clickpay", "cimb_clicks","bca_klikbca", "bca_klikpay", "bri_epay", "echannel","mandiri_ecash", "permata_va", "bca_va", "bni_va", "other_va", "gopay", "indomaret", "alfamart", "danamon_online", "akulaku"],
                  credit_card: {
                    secure: true,
                    bank: "bca",
                    installment: {
                      required: false,
                      terms: {
                        bni: [3, 6, 12],
                        mandiri: [3, 6, 12],
                        cimb: [3],
                        bca: [3, 6, 12],
                        offline: [6, 12]
                      }
                    },
                    whitelist_bins: [
                      "48111111",
                      "41111111"
                    ]
                  },
                  bca_va: {
                    va_number: `0280${data.phone}`,
                    free_text: {
                      inquiry: [
                        {
                          en: "text in English",
                          id: "text in Bahasa Indonesia"
                        }
                      ],
                      payment: [
                        {
                          en: "text in English",
                          id: "text in Bahasa Indonesia"
                        }
                      ]
                    }
                  },
                  bni_va: {
                    va_number: `0280${data.phone}`
                  },
                  permata_va: {
                    va_number: `1234567890`,
                    recipient_name: `${data.name}`
                  },
                  callbacks: {
                    finish: `${process.env.API_URI}/accepted/?id=${data.id}&name=${data.name}&`
                  },
                  expiry: {
                    start_time: `${newDate} +0700`,
                    unit: "minutes",
                    duration: 1
                  },
            }
            snap.createTransactionToken(parameter)
            .then(transactionToken => {
                resolve(transactionToken);
            }).catch(err => {
                reject(err);
            })
        })
    },

    getStatus: (order_id) => {
        return new Promise((resolve,reject) => {
            axios.get(`${process.env.URI}/${order_id}/status`,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic U0ItTWlkLXNlcnZlci1HU1FXVThfclp2VVNnZ0VLUm5NbFNZUS0=`
                }
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            })
        });
    }
}