const vms = require('../../models/vms.model');
const saloons = require('../../models/saloon.model');

module.exports = {
    
  addSaloon:async (req,res) => {
        saloons.create({vmId:req._id,...req.body}).then(response=>{
          console.log(response);
          res.status(200).json({message:'success'})
        }).catch(err=>{
          console.log(err.message)
          res.status(400).json({message:'error occured'})

        })
    },
  getSaloons: async (req,res) => {
    saloons.find().then(response=>{
      console.log(response);
      res.status(200).json(response);
    }).catch(err=>res.status(400).json({message:'error occured'}))
  },
  changeBlock: async (req, res) => {
    const { id } = req.body;
    await saloons.updateOne({ _id: id }, [{ "$set": { "vmIsBlocked": { "$eq": [false, "$vmIsBlocked"] } } }]).then(response => {
      console.log(response);
      res.sendStatus(200)
    }).catch(err => {
      console.log(err.message);
      res.status(400).json({ message: 'error occured' })
    })
  }
}