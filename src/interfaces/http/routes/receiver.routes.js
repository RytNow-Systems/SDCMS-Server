// ============================================================================
// File: src/interfaces/http/routes/receiver.routes.js
// Description: Route definitions for Receiver lookup endpoints.
//              Reuses SenderService with partyTypeId=2 via receiver controller.
// ============================================================================

import express from 'express';
import * as receiverController from '../controllers/receiver.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';

const router = express.Router();

// All receiver routes require authentication + ADMIN/OPERATOR role
router.use(protect);
router.use(authorizeRoles('ADMIN', 'OPERATOR'));

/**
 * @route   GET /api/v1/receivers/names
 * @desc    Get all distinct active receiver names (autocomplete dropdown)
 */
router.get('/names', receiverController.getAllNames);

/**
 * @route   GET /api/v1/receivers/phones
 * @desc    Get all distinct active receiver phone numbers (autocomplete dropdown)
 */
router.get('/phones', receiverController.getAllPhones);

/**
 * @route   GET /api/v1/receivers/lookup-by-name
 * @desc    Search receivers by name (partial match)
 */
router.get('/lookup-by-name', receiverController.lookupByName);

/**
 * @route   GET /api/v1/receivers/:id/addresses
 * @desc    Get all addresses for a receiver
 */
router.get('/:id/addresses', receiverController.getAddresses);

/**
 * @route   POST /api/v1/receivers/:id/addresses
 * @desc    Create a new address for a receiver
 */
router.post('/:id/addresses', receiverController.createAddress);

export default router;
