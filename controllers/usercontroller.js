const express = require("express");
const mongojs = require("mongojs");
const db = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const checkAuthStatus = request => {
    console.log(request.headers);
    if (!request.headers.authorization) {
        return false
    }
    const token = request.headers.authorization.split(" ")[1]
    console.log(token);
    const loggedInUser = jwt.verify(token, 'secretString', (err, data) => {
        if (err) {
            return false
        }
        else {
            return data
        }
    });
    console.log(loggedInUser)
    return loggedInUser
}


router.get("/", (req, res) => {
    console.log(db);
    db.User.find({}).then(dbUsers => {
        res.json(dbUsers);
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
})



router.post("/", (req, res) => {
    console.log(req.body);
    db.User.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    }).then(newUser => {
        res.json(newUser);
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
})

router.post("/login", (req, res) => {
    db.User.findOne({
         
        email: req.body.email                       
        
    }).then(foundUser => {
        if (!foundUser) {
            return res.status(404).send("USER NOT FOUND")
        }
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            const userTokenInfo = {
                email: foundUser.email,
                id: foundUser.id,
                username: foundUser.username
            }
            const token = jwt.sign(userTokenInfo, "secretString", { expiresIn: "2h" });
            return res.status(200).json({ token: token })
        } else {
            return res.status(403).send("wrong password")
        }
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
})

router.get("/secretProfile", (req, res) => {
    const loggedInUser = checkAuthStatus(req);
    console.log(loggedInUser);
    if (!loggedInUser) {
        return res.status(401).send("invalid token")
    }
    db.User.findOne({
    
            email: loggedInUser.email

    }).then(dbUser => {
        res.json(dbUser)
    }).catch(err => {
        console.log(err);
        res.status(500).send("an error occured please try again later");
    })

})




module.exports = router