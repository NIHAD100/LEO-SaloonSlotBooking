const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    salonId:{
        type:mongoose.Types.ObjectId,
        ref:'salons'
    },
    slotTime:String,
    slotDate:String,
    price:Number,
    paymentType:{
        type:String,
        enum: ['online','offline'],
        default:'online'
    }
})

module.exports = mongoose.model("bookings",bookingSchema)