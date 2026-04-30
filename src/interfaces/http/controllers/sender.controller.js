// ============================================================================
// File: src/interfaces/http/controllers/sender.controller.js
// Description: HTTP Controller for Senders (Parties) and Address Book.
//
// [INJECTION SITE] Controller Dependencies:
// - senderService: Encapsulates business logic and uniqueness constraints.
// - express-async-handler: Automates global error catching for async routes.
// ============================================================================

import asyncHandler from 'express-async-handler';
import senderService from '../../../modules/sender/sender.service.js';

/**
 * Controller for managing Senders and Party Address Book entries.
 */
class SenderController {
  /**
   * @route GET /api/v1/senders
   * @desc  Retrieves all active senders.
   */
  getSenders = asyncHandler(async (req, res) => {
    const senders = await senderService.getSenders();
    res.json({ success: true, data: senders });
  });

  /**
   * @route GET /api/v1/senders/:id
   * @desc  Retrieves a specific sender by ID.
   */
  getSenderById = asyncHandler(async (req, res) => {
    const sender = await senderService.getSenderById(req.params.id);
    res.json({ success: true, data: sender });
  });

  /**
   * @route POST /api/v1/senders
   * @desc  Creates a new sender (PartyTypeId=1).
   */
  createSender = asyncHandler(async (req, res) => {
    const sender = await senderService.createSender(req.body, req.user);
    res.status(201).json({ success: true, data: sender });
  });

  /**
   * @route PUT /api/v1/senders/:id
   * @desc  Updates an existing sender.
   */
  updateSender = asyncHandler(async (req, res) => {
    const sender = await senderService.updateSender(req.params.id, req.body, req.user);
    res.json({ success: true, data: sender });
  });

  /**
   * @route DELETE /api/v1/senders/:id
   * @desc  Soft-deletes a sender.
   */
  deleteSender = asyncHandler(async (req, res) => {
    await senderService.deleteSender(req.params.id, req.user);
    res.json({ success: true, message: 'Sender deleted successfully' });
  });

  /**
   * @route GET /api/v1/senders/lookup?phone=...
   * @desc  Finds a sender by phone number for form auto-fill.
   */
  lookupByPhone = asyncHandler(async (req, res) => {
    const sender = await senderService.lookupByPhone(req.query.phone, 1);
    res.json({ success: true, data: sender });
  });

  /**
   * @route GET /api/v1/senders/names
   * @desc  Autocomplete for distinct sender names.
   */
  getAllNames = asyncHandler(async (req, res) => {
    const names = await senderService.getAllSenderNames(1);
    res.json({ success: true, data: names });
  });

  /**
   * @route GET /api/v1/senders/phones
   * @desc  Autocomplete for distinct sender phone numbers.
   */
  getAllPhones = asyncHandler(async (req, res) => {
    const phones = await senderService.getAllPhoneNumbers(1);
    res.json({ success: true, data: phones });
  });

  /**
   * @route GET /api/v1/senders/lookup-by-name?name=...
   * @desc  Partial name search for party suggestions.
   */
  lookupByName = asyncHandler(async (req, res) => {
    const parties = await senderService.lookupByName(req.query.name, 1);
    res.json({ success: true, data: parties });
  });

  /**
   * @route GET /api/v1/senders/:id/addresses
   * @desc  Retrieves secondary addresses from the Address Book.
   */
  getAddresses = asyncHandler(async (req, res) => {
    const addresses = await senderService.getAddressesByPartyId(req.params.id, 1);
    res.json({ success: true, data: addresses });
  });

  /**
   * @route POST /api/v1/senders/:id/addresses
   * @desc  Adds a new secondary address to a sender's profile.
   */
  createAddress = asyncHandler(async (req, res) => {
    const address = await senderService.createAddress(req.params.id, req.body, req.user, 1);
    res.status(201).json({ success: true, data: address });
  });
}

const senderControllerInstance = new SenderController();
export default senderControllerInstance;

// Named exports to support both import styles
export const {
  getSenders, getSenderById, createSender, updateSender, deleteSender,
  lookupByPhone, getAllNames, getAllPhones, lookupByName, getAddresses, createAddress
} = senderControllerInstance;
