const express = require("express")
const router = express.Router()
const User = require("../models/user")

router.post('/pre_signup', async (req, res, next) => {
    let email = req.body.email
    await User.deleteOne({ email: email })
    res.sendStatus(200);
})

router.post('/make_test_account', async (req, res, next) => {
    let name = req.body.name
    let email = req.body.email
    console.log("🚀 ~ file: testData.js ~ line 14 ~ router.post ~ req.body", req.body)
    let password = req.body.password
    const user = await User.findOne({ email: email });
    if (!user) {
        const newUser = await new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.username = name;
        await newUser.save();
    }
    res.sendStatus(200);
})


module.exports = router;