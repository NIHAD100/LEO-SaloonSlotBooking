const users = require('../../models/users.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv/config')


module.exports = {
    mobileExist: (req, res) => {
        users.findOne({ mobile: req.body.mobile }).then((response) => {
            if (response) {
                return res.sendStatus(409); //user already exist
            } else {
                return res.sendStatus(200);
            }
        }).catch(err => {
            console.log(err.message)
            res.status(400).json({ message: 'error occured', err: err.message })
        })
    },
    userSignup: (req, res) => {
        users.findOne({ mobile: req.body.mobile }).then(async (response) => {
            if (response) {
                return res.sendStatus(409); //user already exist
            } else {
                req.body.password = await bcrypt.hash(req.body.password, 10)
                await users.create(req.body).then((response) => {
                    const accessToken = jwt.sign({
                        id: response._id
                    }, process.env.JWT_SECRET,
                        { expiresIn: '7d' }
                    );
                    res.status(201).json({ accessToken })
                }).catch(err => {
                    console.log(err.message)
                    res.status(400).json({ message: 'error occured', err: err.message })
                })
            }
        }).catch(err => {
            console.log(err.message)
            res.status(400).json({ message: 'error occured', err: err.message })
        })
    },
    userSignin: async (req, res) => {
        const { mobile, password } = req.body
        if (!mobile || !password) return res.status(400).json({ 'message': 'mobile number and password required.' });
        else {
            const foundUser = await users.findOne({ mobile })
            if (!foundUser) return res.status(401).json({ message: 'incorrect mobile number or password' }) //unauthorized
            else {
                bcrypt.compare(password, foundUser.password).then((response) => {
                    if (response) {
                        if (foundUser.blockStatus) {
                            return res.status(403).json({ message: 'user blocked by admin' }) //refuse to authorize it
                        } else {
                            const accessToken = jwt.sign({ id: foundUser._id, }, process.env.JWT_SECRET, { expiresIn: '7d' });
                            res.status(200).json({ accessToken, name: foundUser.name, mobile: foundUser.mobile });
                        }
                    } else {
                        res.status(401).json({ message: 'incorrect mobile number or password' })
                    }
                }).catch(err => {
                    console.log(err.message)
                    res.status(400).json({ message: 'erro occured' })
                })
            }
        }
    },
    getUser: (req, res) => {
        const token = req.headers['x-access-token'];
        try {
            const { id } = jwt.verify(token, process.env.JWT_SECRET);
            return res.status(200).json({ id })
        } catch (error) {
            console.log(error.message)
            res.status(401).json({ error: 'invalid token' })
        }
    },
    MobileExistForForgot: (req, res) => {
        users.findOne(req.query).then(async (response) => {
            if (response) {
                return res.sendStatus(200); //user already exist
            } else {
                return res.sendStatus(404);  //not found
            }
        }).catch(err => {
            console.log(err.message)
            res.status(400).json({ message: 'error occured', err: err.message })
        })
    },
    newPassSet: async (req, res) => {
        req.body.pwd = await bcrypt.hash(req.body.pwd, 10)
        users.updateOne({ mobile: req.body.mobile }, { $set: { password: req.body.pwd } }).then(response => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err.message)
            res.status(400).json({ message: 'error occured', err: err.message })
        })
    },
    googleSignin: async (req, res) => {
        const { email, fullName } = req.body
        users.findOne({ email }).then(async (response) => {
            if (response) {
                const accessToken = jwt.sign({ id: response._id, }, process.env.JWT_SECRET, { expiresIn: '7d' });
                res.status(200).json({ accessToken, name: response.name, mobile: response.email })
            } else {
                let data = await users.create({ email, name: fullName })
                const accessToken = jwt.sign({ id: data._id, }, process.env.JWT_SECRET, { expiresIn: '7d' });
                res.status(200).json({ accessToken, name: data.name, mobile: data.email })
            }
        })
    },
    updateProfile: async (req, res) => {
        const id = req._id;
        const { name, image, rejectUpdate } = req.body
        if (rejectUpdate) {
            if (image) {
                vms.findOneAndUpdate({ _id: id }, { '$set': { name, image, reason: '', status: 'pending' } }).then(response => {
                    res.status(200).json(response)
                })
            } else if (req.body?.rejectUpdate) {
                vms.findOneAndUpdate({ _id: id }, { '$set': { name, reason: '', status: 'pending' } }).then(response => {
                    res.status(200).json(response)
                })

            }
        }
    }
}