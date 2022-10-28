const express = require("express")
const router = express.Router()
const Users = require("../models/user")

router.post('/pre_signup', async (req, res, next) => {
    let email = req.body.email
    await Users.deleteOne({ email: email })
    res.sendStatus(200);
})


module.exports = router;