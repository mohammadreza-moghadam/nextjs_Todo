const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const validateRegisterInput = require("../validation/registerValidation")
const requiresAuth = require("../middleware/permissions");

router.get("/test", (req, res) => {
    res.send("Auth route working")
})

router.post("/register", async (req, res) => {
    try {
        const {errors, isValid} = validateRegisterInput(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }
        // check for existing user
        const existingEmail = await User.findOne({
            email: new RegExp("^" + req.body.email + "$", "i")
        })

        if (existingEmail) {
            return res.status(400).json({error: "User already exists with this email"})
        }

        // hashing the password
        const hashPassword = await bcrypt.hash(req.body.password, 12)
        const newUser = new User({
            email: req.body.email,
            password: hashPassword,
            name: req.body.name
        })

        // save user to the database
        const savedUser = await newUser.save()

        const userToReturn = {...savedUser._doc}
        delete userToReturn.password

        // return the new user
        return res.json(userToReturn)
    } catch (err){
        console.log(err)
        return res.status(500).send(err.message)
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            email: new RegExp("^" + req.body.email + "$" , "i")
        })
        if (!user) {
            return res.status(400).json({error: "There was a problem with your login credentials"})
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password)

        if (!passwordMatch) {
            return res.status(400).json({error: "There was a problem with your login credentials"})
        }

        const payload = {userId: user._id}
        const token=  jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        res.cookie("access-token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        })

        const userToReturn = {...user._doc}
        delete userToReturn.password

        return res.json({
            token: token,
            user: userToReturn
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send(err.message)
    }
})

router.get("/current", requiresAuth, (req, res) => {
    if(!req.user) {
        return res.status(401).send("Unauthorized")
    }

    return res.json(req.user)
})

module.exports = router