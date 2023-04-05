const salons = require('../../models/salon.model')
const bookings = require('../../models/bookings.model')
const Razorpay = require('razorpay')
const crypto = require('crypto')

module.exports = {
    getSalons: async (req, res) => {
        const { district } = req.params;
        salons.find({ district, approved: true, isBlocked: false, vmIsBlocked: false }).then(response => {
            res.status(200).json(response);
        }).catch(err => {
            console.log(err)
            res.status(400).json({ message: 'error occured at finding salon based on district' });
        })
    },
    getSalon: async (req, res) => {
        const { _id } = req.params;
        salons.findOne({ _id }).then(response => {
            res.status(200).json(response);
        }).catch(err => {
            console.log(err)
            res.status(400).json({ message: 'error occured' })
        })
    },
    getBookedSlots: async (req, res) => {
        try {
            const response = await bookings.find(req.body, { slotTime: 1, _id: 0 })
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    },
    bookSalon: async (req, res) => {

        try {
            const response = await salons.findOne({ _id: req.body.salon })
            const rs = response.actualPrice - (response.actualPrice * response.discountPercentage / 100)
            const instance = new Razorpay({
                key_id: process.env.RAZORPAY_KEYID,
                key_secret: process.env.RAZORPAY_SECRET
            })
            const options = {
                amount: rs * 100,
                currency: "INR",
                receipt: crypto.randomBytes(10).toString('hex')
            }
            instance.orders.create(options, (error, order) => {
                if (error) {
                    console.log(error)
                    return res.status(500).json({ message: 'something went wrong' })
                }
                res.status(200).json(order)
            })

        } catch (error) {
            console.log(error.message);
        }
    },

    verifyPayment: async (req, res) => {

        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature, salonId, slotTime, slotDate, price } = req.body;
            const sign = razorpay_order_id + "|" + razorpay_payment_id
            const setPrice = price / 100
            const expectedSign = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET).update(sign.toString()).digest('hex')
            if (razorpay_signature === expectedSign) {
                await bookings.create({ userId: req._id, salonId, slotTime, slotDate, price: setPrice })
                return res.status(200).json({ message: 'payment verified succesfully' })
            }
            return res.status(400).json({ message: 'Invalid signature sent!' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'internal server error' })
        }
    }
}