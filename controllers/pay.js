//const mercadopago = require('mercadopago');



const postPay = async (req, res) => {
    try {
         mercadopago.configure({
            access_token: 'TEST-3531537817742662-083116-2b14a2410e8529fa3a3be5bdc8c1b9b5-1465651791'
        }) 
         const result = await mercadopago.preferences.create({
            items: [
                {
                    title: 'Samsung s21',
                    unit_price: 1500,
                    currency_id: 'ARS',
                    quantity: 3
                }
            ],
            //notification_url,
            back_urls: {
                success: 'http://localhost:3000/success',
                //pending,
                //failure
            }
        }) 
        console.log(result)
        res.send('ok')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    postPay
}