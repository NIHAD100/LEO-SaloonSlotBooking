const bookings = require('../../models/bookings.model')
const { ObjectId } = require('mongodb');

module.exports = {
    getBookings: async (req, res) => {
        try {
            const data = await bookings.aggregate([{ $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'userDetails' } }, { $unwind: '$userDetails' }
                , { $lookup: { from: 'salons', localField: 'salonId', foreignField: '_id', as: 'salonDetails' } }, { $unwind: '$salonDetails' }, { $match: { 'salonDetails.vmId': new ObjectId(req._id) } },
            {
                $project: {
                    _id: 1,
                    venueId: '$salonDetails._id',
                    venueName: '$salonDetails.venueName',
                    slotTime: 1,
                    slotDate: 1,
                    price: 1,
                    paymentType: 1,
                    name: '$userDetails.name',
                    mobile: '$userDetails.mobile'
                }
            }
            ])
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'error occured', error: error.message })
        }
    }
}