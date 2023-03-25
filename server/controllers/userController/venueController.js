const saloons = require('../../models/saloon.model')

module.exports = {
    getVenues:async (req,res) => {
        const {district} = req.params;
        saloons.find({district,approved:true,isBlocked:false,vmIsBlocked:false}).then(response=>{
            res.status(200).json(response);
        }).catch(err=>{
            console.log(err)
            res.status(400).json({message:'error occured at finding turf based on district'});
        })
    },
    getVenue: async (req,res)=>{
        const {_id} = req.params;
        saloons.findOne({_id}).then(response => {
            res.status(200).json(response);
        }).catch(err=>{
            console.log(err)
            res.status(400).json({message:'error occured'})
        })
    }
}