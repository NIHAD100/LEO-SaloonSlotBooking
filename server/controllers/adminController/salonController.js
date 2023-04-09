const salons = require('../../models/salon.model')

module.exports = {
    getSalon: (req, res) => {
        salons.find().populate('vmId').then(response => {
            res.status(200).json({ response });
        }).catch(err => {
            console.log(err.message)
            res.status(400).json({ message: 'error occured', err: err.message })
        })
    },
    approve: async (req, res) => {
        const { id } = req.body;
        salons.updateOne({ _id: id }, { "$set": { approved: true } }).then(response => {
            res.status(200).json({ message: 'approved successfully' });
        }).catch(err => {
            console.log(err.message);
            res.status(400).json({ message: 'error occured' });
        })
    },
    deleteSalon: async (req, res) => {
        salons.findByIdAndDelete(req.params.id).then(response => {
            res.status(200).json({ message: 'salon deleted successfully' });
        }).catch(err => {
            console.log(err.message);
            res.status(400).json({ message: 'error occured' });
        })
    },
    changeBlock: async (req, res) => {
        const { id } = req.body;
        await salons.updateOne({ _id: id }, [{ "$set": { "isBlocked": { "$eq": [false, "$isBlocked"] } } }]).then(response => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err.message);
            res.status(400).json({ message: 'error occured' })
        })
    },
    getPerSalon: async (req, res) => {
        const { _id } = req.params
        await salons.findOne({ _id }).populate('vmId').then(response => {
            res.status(200).json(response)
        }).catch(err => {
            console.log(err.message);
            res.status(400).json({ message: 'error occured at getting a salon' })
        })
    }
}