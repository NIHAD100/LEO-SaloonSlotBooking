const bookings = require('../../models/bookings.model')

module.exports = {
    getBookings: async (req, res) => {
        bookings.find().populate('salonId').populate('userId').then(response => {
            console.log(response)
            res.status(200).json(response)
        }).catch(err => {
            res.status(500).json(err.message)
        })
    }
}