import express from 'express';
import { createOrderEntry, getOrderList, getOrderById } from '../controllers/order.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';

const router = express.Router();

router.post('/entry', protect, authorizeRoles('ADMIN', 'OPERATOR'), createOrderEntry);
router.get('/', protect, authorizeRoles('ADMIN', 'OPERATOR', 'COURIER'), getOrderList);
router.get('/:id', protect, authorizeRoles('ADMIN', 'OPERATOR'), getOrderById);

export default router;
