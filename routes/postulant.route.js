const express = require('express');
const { newPostulant } = require('../controllers/postulant.controller');

const api = express.Router();

api.post('/', newPostulant);

module.exports = api;
