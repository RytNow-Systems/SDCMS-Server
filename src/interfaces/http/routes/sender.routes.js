// ============================================================================
// File: src/interfaces/http/routes/sender.routes.js
// Description: Route definitions for Sender (Party) module.
// ============================================================================

import express from 'express';
import * as senderController from '../controllers/sender.controller.js';
import { validate } from '../../../shared/middleware/validate.middleware.js';
import { createSenderSchema, updateSenderSchema } from '../validations/validation.schemas.js';

const router = express.Router();

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

export default router;
