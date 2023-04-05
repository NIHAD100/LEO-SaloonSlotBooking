const vms = require('../../models/vms.model');
const salons = require('../../models/salon.model');

module.exports = {
  addSalon: async (req, res) => {
    console.log(req.body);
    salons.create({ vmId: req._id, ...req.body }).then(response => {
      console.log('ehllo', response);
      res.status(200).json({ message: 'success' })
    }).catch(err => {
      console.log(err.message)
      res.status(400).json({ message: 'error occured' })
    })
  },
  updateSalon: async (req, res) => {
    console.log(req.body)
    const vmId = req._id
    const { id, venueName, mobile, district, place, actualPrice, discountPercentage, description, image, document, slots, lat, lng } = req.body
    salons.updateOne({ _id: id }, { venueName, mobile, district, place, actualPrice, discountPercentage, description, image, document, slots, lat, lng }).then(response => {
      console.log(response)
      res.status(200).json({ message: 'success' })
    })
  },
  getSalons: async (req, res) => {
    salons.find({ vmId: req._id }).then(response => {
      console.log(response)
      res.status(200).json(response);
    }).catch(err => {
      console.log(err);
      res.status(400).json({ message: 'error occured at getting Salons' })
    })
  },
  getSalon: async (req, res) => {
    salons.findOne({ _id: req.params.id }).then(response => {
      console.log(response)
      res.status(200).json(response);
    }).catch(err => {
      console.log(err.message);
      res.status(400).json({ message: 'error occured at getting Salons' })
    })
  },
  changeBlock: async (req, res) => {
    const { id } = req.body;
    await salons.updateOne({ _id: id }, [{ "$set": { "vmIsBlocked": { "$eq": [false, "$vmIsBlocked"] } } }]).then(response => {
      console.log(response);
      res.sendStatus(200)
    }).catch(err => {
      console.log(err.message);
      res.status(400).json({ message: 'error occured' })
    })
  }
} 