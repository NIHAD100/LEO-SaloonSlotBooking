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
            if (!req.body.salonId || !req.body.slotDate) res.status(400).json({ message: 'salonId, slotDate - fields required' })
            console.log('getBookedSlots', req.body);
            const response = await bookings.find({ ...req.body, refund: 'not processed' }, { slotTime: 1, _id: 0 })
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    }
}