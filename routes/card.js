const express = require('express');
const mongoose = require('mongoose');

const cardRouter = express.Router();



cardRouter.get("/cards", (req, res) =>{
  res.send ({ data:cards })
})
module.exports =cardRouter