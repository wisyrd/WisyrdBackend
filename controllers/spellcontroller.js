const express = require("express");
const routes = require("./spellcontroller.js");
const db = require("../models")


module.exports = function(app) {
    
    app.get("/api/spells/:class", function(req, res) {
      db.Spell.find({
        
          classes:req.params.class
        
      })
        .then(function(dbPost) {
          res.json(dbPost);
        }).catch (err => res.status(400).json(err));
    });
  
  app.get("/", function(req, res) {
      res.send("routes are connected")
  }) 

  
}
  
   
  
  