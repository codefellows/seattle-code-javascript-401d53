'use strict';

const { db, customerCollection, orderCollection } = require('../models/');

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe('Customers and Orders Collections', () => {

  let testCustomer = {
    name: 'test customer',
  }
  let testOrder = {
    name: 'test order',
  }
  let customers = null;
  let customer = null;
  let orders = null;
  let order = null;

  it('should be able to create a Customer and an Order', async () => {
    customer = await customerCollection.create(testCustomer);
    testOrder['customerId'] = customer.id;
    order = await orderCollection.create(testOrder);

    expect(customer.name).toEqual(testCustomer.name);
    expect(order.name).toEqual(testOrder.name);
    expect(order.customerId).toEqual(customer.id);
  });

  it ('should be able to fetch Customers and include Orders', async () => {
    customers = await customerCollection.read(null, { include: orderCollection.model });

    expect(customers).toBeTruthy();
    expect(customers[0].name).toEqual(testCustomer.name);
    expect(customers[0].Orders).toBeTruthy();
  });

  it('should be able to fetch Orders with an associated Customer', async () => {
    orders = await orderCollection.read(null, { include: customerCollection.model });

    expect(orders).toBeTruthy();
    expect(orders[0].name).toEqual(testOrder.name);
    expect(orders[0].Customer).toBeTruthy();
  });

  it('should be able to update a Customer', async () => {
    customer = await customerCollection.update(customer.id, {name: 'test customer 2'});

    expect(customer).toBeTruthy();
    expect(customer.name).toEqual('test customer 2');
  });

  it ('should be able to update an Order', async () => {
    order = await orderCollection.update(order.id, {name: 'test order 2'});

    expect(order).toBeTruthy();
    expect(order.name).toEqual('test order 2');
  });

  it('should be able to delete a Order', async () => {
    let orderId = await orderCollection.delete(order.id);

    expect(orderId).toEqual(order.id);

    orders = await orderCollection.read();

    expect(orders.length).not.toBeTruthy();
  });

  it('should be able to delete a Customer', async () => {
    let customerId = await customerCollection.delete(customer.id);

    expect(customerId).toEqual(customer.id);

    customers = await customerCollection.read();
    
    expect(customers.length).not.toBeTruthy();
  })
});
