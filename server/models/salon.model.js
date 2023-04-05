const mongoose = require('mongoose')

const salonSchema = new mongoose.Schema({
    vmId:{
        type:mongoose.Types.ObjectId,
        ref:'vms'
    },
    venueName: String,
    mobile: Number,
    district: String,
    place:String,
    actualPrice: Number,
    discountPercentage: Number,
    description: String,
    image:String,
    document: String,
    slots: [],
    lat: Number,
    lng: Number,
    isBlocked: {
        type: Boolean,
        default: false
    },
    vmIsBlocked: {
        type: Boolean,
        default: false
    },
    approved: {
        type: Boolean,
        default: false
    }
},
{
    timestamps:{
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
})

module.exports = mongoose.model('salons',salonSchema);
