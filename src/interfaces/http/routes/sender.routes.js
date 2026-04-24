// ============================================================================
// File: src/interfaces/http/routes/sender.routes.js
// Description: Route definitions for Sender (Party) module.
// ============================================================================

import express from 'express';
import senderController from '../controllers/sender.controller.js';
import { protect, authorizeRoles } from '../../../shared/middleware/auth.middleware.js';
import { validate } from '../../../shared/middleware/validate.middleware.js';
import { createSenderSchema, updateSenderSchema, createAddressSchema } from '../validations/validation.schemas.js';

const router = express.Router();

// All sender routes require authentication + ADMIN/OPERATOR role
router.use(protect);
router.use(authorizeRoles('ADMIN', 'OPERATOR'));

/**
 * @route   GET /api/v1/senders
 * @desc    Get all active senders
 */
router.get('/', senderController.getSenders);

/**
 * @route   GET /api/v1/senders/lookup
 * @desc    Lookup sender by phone number
 */
router.get('/lookup', senderController.lookupByPhone);

/**
 * @route   GET /api/v1/senders/names
 * @desc    Get all distinct active sender names (autocomplete dropdown)
 */
router.get('/names', senderController.getAllNames);

/**
 * @route   GET /api/v1/senders/phones
 * @desc    Get all distinct active phone numbers (autocomplete dropdown)
 */
router.get('/phones', senderController.getAllPhones);

/**
 * @route   GET /api/v1/senders/lookup-by-name
 * @desc    Search senders by name (partial match)
 */
router.get('/lookup-by-name', senderController.lookupByName);

/**
 * @route   GET /api/v1/senders/:id
 * @desc    Get sender by ID
 */
router.get('/:id', senderController.getSenderById);

/**
 * @route   POST /api/v1/senders
 * @desc    Create a new sender
 */
router.post('/', validate(createSenderSchema), senderController.createSender);

/**
 * @route   PUT /api/v1/senders/:id
 * @desc    Update an existing sender
 */
router.put('/:id', validate(updateSenderSchema), senderController.updateSender);

/**
 * @route   DELETE /api/v1/senders/:id
 * @desc    Soft-delete a sender
 */
router.delete('/:id', senderController.deleteSender);

// ============================================================================
// ADDRESS BOOK (PARTY_DETAILS) ROUTES
// ============================================================================

/**
 * @route   GET /api/v1/senders/:id/addresses
 * @desc    Get all addresses for a party (address book dropdown)
 */
router.get('/:id/addresses', senderController.getAddresses);

/**
 * @route   POST /api/v1/senders/:id/addresses
 * @desc    Create a new address for a party
 */
router.post('/:id/addresses', validate(createAddressSchema), senderController.createAddress);

export default router;
