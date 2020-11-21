const express = require("express");
const mongojs = require("mongojs");
const db = require("../models");
const router = express.Router();


router.get("/", (req, res) => {
    console.log(db);
    db.Sheet.find({}).then(dbSheets => {
        res.json(dbSheets);
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
})

router.get("/:id", (req, res) => {
    console.log(db);
    db.Sheet.findById(

    mongojs.ObjectId(req.params.id)

    ).then(dbSheets => {
        res.json(dbSheets);
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
})




router.post("/", ({ body }, res) => {
    console.log(body);
    db.Sheet.create(body)
    .then(createSheet => {
        res.json({createSheet,body});
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
})





module.exports = router
