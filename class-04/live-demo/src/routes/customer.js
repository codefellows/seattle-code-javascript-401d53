'use strict';

const express = require('express');

const router = express.Router();
const { customerModel, orderModel } = require('../models');

router.get('/customer', async (req, res, next) => {
  let customers = await customerModel.findAll();

  res.status(200).send(customers);
});

router.get('/customerWithOrders', async (req, res, next) => {
  let customers = await customerModel.findAll({include: {model: orderModel}});

  res.status(200).send(customers);
});

router.get('/customerWithSingleOrder/:id', async (req, res, next) => {
  let customers = await customerModel.findAll({
    include: {model: orderModel}, 
    where: {id: req.params.id},
  });

  res.status(200).send(customers);
});

router.get('/customer/:id', async (req, res, next) => {
  // where clause useful for update.  can also use findByPK()
  let singleCustomer = await customerModel.findAll({where: {id: req.params.id}});

  res.status(200).send(singleCustomer);
});


router.post('/customer', async (req, res, next) => {
  let newCustomer = await customerModel.create(req.body);

  res.status(200).send(newCustomer);
});

module.exports = router;
