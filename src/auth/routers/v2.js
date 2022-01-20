'use strict';

const express = require('express');
const dataModules = require('../models');
const basic = require('../middleware/basic.js')
const bearer = require('../middleware/bearer.js')
const acl = require('../middleware/acl.js')


const router = express.Router();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRheWxvciIsImlhdCI6MTY0MjY1MjkyNH0.BL-X_vqKsM2kdoTEuvelj0ql8t5pMbPYDOh9T9Ha178

router.get('/:model', basic, acl('read'), handleGetAll);
router.get('/:model/:id', basic, acl('read'), handleGetOne);
router.post('/:model', bearer, acl('create'), handleCreate);
router.put('/:model/:id', bearer, acl('update'), handleUpdate);
router.delete('/:model/:id', bearer, acl('delete'), handleDelete);

async function handleGetAll(req, res) {
  console.log('hit on the get all')
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id)
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj)
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}


module.exports = router;
