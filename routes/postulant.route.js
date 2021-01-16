const express = require('express');
const { newPostulant, getPostulant } = require('../controllers/postulant.controller');

const api = express.Router();

api.get('/', getPostulant);
api.post('/', newPostulant);

module.exports = api;
