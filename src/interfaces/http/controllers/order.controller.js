import orderService from '../../../modules/order/order.service.js';

export const createOrderEntry = async (req, res, next) => {
  try {
    const result = await orderService.processNewOrder(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getOrderList = async (req, res, next) => {
  try {
    const orders = await orderService.getOrderSummaryList();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const orderDetails = await orderService.getOrderDetails(req.params.id);
    res.json(orderDetails);
  } catch (error) {
    next(error);
  }
};
