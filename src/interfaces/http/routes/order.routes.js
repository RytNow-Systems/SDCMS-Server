import express from 'express';
import { createOrder, getOrderList, getOrderById, updateOrder, cancelOrder } from '../controllers/order.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
import { validate } from '../../../shared/middleware/validate.middleware.js';
import { createOrderSchema, updateOrderSchema } from '../validations/validation.schemas.js';

const router = express.Router();

// ============================================================================
// Order Management Routes — API Contract §7
// ============================================================================

// POST   /api/v1/orders           → Create complex order (ADMIN, OPERATOR)
router.post('/', protect, authorizeRoles('ADMIN', 'OPERATOR'), validate(createOrderSchema), createOrder);

// GET    /api/v1/orders           → List orders with derived status (ALL roles)
router.get('/', protect, authorizeRoles('ADMIN', 'OPERATOR', 'COURIER'), getOrderList);

// GET    /api/v1/orders/:id       → Get full order aggregate (ADMIN, OPERATOR)
router.get('/:id', protect, authorizeRoles('ADMIN', 'OPERATOR'), getOrderById);

// PUT    /api/v1/orders/:id       → Update order before dispatch (ADMIN, OPERATOR)
router.put('/:id', protect, authorizeRoles('ADMIN', 'OPERATOR'), validate(updateOrderSchema), updateOrder);

// DELETE /api/v1/orders/:id/cancel → Cancel entire order (ADMIN, OPERATOR)
router.delete('/:id/cancel', protect, authorizeRoles('ADMIN', 'OPERATOR'), cancelOrder);

export default router;
