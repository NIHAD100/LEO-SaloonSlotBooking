const saloons = require('../../models/saloon.model')

module.exports = {
    getVenue: (req, res) => {
        try {
            saloons.find().populate('vmId').then(response => {
                console.log(response);
                res.status(200).json({ response });
            })
        } catch (error) {
            console.log(error.message)
            res.status(400).json({ message: 'error occured', error: error.message })
        }
    },
    approve: async (req, res) => {
        const { id } = req.body;
            saloons.updateOne({ _id: id }, { "$set": { approved: true } }).then(response=>{
                res.status(200).json({message:'approved successfully'})
            }).catch(err=>{
                console.log(err.message);
                res.status(400).json({message:'error occured'})
            })
    },
    deleteTurf: async (req, res) => {
        console.log('deleting');
        console.log(req.params._id, 'req.params._id');
        saloons.findByIdAndDelete(req.params._id).then(response => {
            console.log(response);
            res.status(200).json({ message: 'saloon deleted successfully' });
        }).catch(err => {
            console.log(err.message);
            res.status(400).json({ message: 'error occured' });
        })
    },
    changeBlock: async (req, res) => {
        const { id } = req.body;
        await saloons.updateOne({ _id:id }, [{ "$set": { "isBlocked": { "$eq": [false, "$isBlocked"] } } }]).then(response => {
            res.sendStatus(200);
        }).catch(err=>{
            console.log(err.message);
            res.status(400).json({message:'error occured'})
        })
    },
    getPerSaloon: async (req,res) => {
        console.log('aslsdfjdsk');
        const {_id} = req.params
        await saloons.findOne({_id}).populate('vmId').then(response=>{
            console.log(response);
            res.status(200).json(response)
        }).catch(err=>{
            console.log(err.message);
            res.status(400).json({message:'error occured at getting a saloon'})
        })
    }
}