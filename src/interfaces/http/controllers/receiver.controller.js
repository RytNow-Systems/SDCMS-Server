// ============================================================================
// File: src/interfaces/http/controllers/receiver.controller.js
// Description: Lightweight receiver lookup controllers.
//              Reuses SenderService with partyTypeId=2 (Receiver).
// ============================================================================

import asyncHandler from 'express-async-handler';
import senderService from '../../../modules/sender/sender.service.js';

// ============================================================================
// RECEIVER LOOKUP CONTROLLERS (autocomplete dropdowns)
// Shares the same service layer as senders — only partyTypeId differs.
// ============================================================================

/**
 * @route GET /api/v1/receivers
 * @desc  Retrieves all active receivers.
 */
export const getReceivers = asyncHandler(async (req, res) => {
  const receivers = await senderService.getParties(2);
  res.json({ success: true, data: receivers });
});

/**
 * @route GET /api/v1/receivers/:id
 * @desc  Retrieves a specific receiver by ID.
 */
export const getReceiverById = asyncHandler(async (req, res) => {
  const receiver = await senderService.getPartyById(req.params.id, 2);
  res.json({ success: true, data: receiver });
});

/**
 * @route POST /api/v1/receivers
 * @desc  Creates a new receiver (PartyTypeId=2).
 */
export const createReceiver = asyncHandler(async (req, res) => {
  const receiver = await senderService.createParty(req.body, req.user, 2);
  res.status(201).json({ success: true, data: receiver });
});

/**
 * @route PUT /api/v1/receivers/:id
 * @desc  Updates an existing receiver.
 */
export const updateReceiver = asyncHandler(async (req, res) => {
  const receiver = await senderService.updateParty(req.params.id, req.body, req.user, 2);
  res.json({ success: true, data: receiver });
});

/**
 * @route DELETE /api/v1/receivers/:id
 * @desc  Soft-deletes a receiver.
 */
export const deleteReceiver = asyncHandler(async (req, res) => {
  await senderService.deleteParty(req.params.id, req.user, 2);
  res.json({ success: true, message: 'Receiver deleted successfully' });
});

/**
 * @desc    Get all distinct active party names (senders and receivers)
 * @route   GET /api/v1/receivers/names
 * @access  Private (ADMIN, OPERATOR)
 */
export const getAllNames = asyncHandler(async (req, res) => {
  const names = await senderService.getAllSenderNames(null);

  res.status(200).json({
    success: true,
    data: names
  });
});

/**
 * @desc    Get all distinct active party phone numbers (senders and receivers)
 * @route   GET /api/v1/receivers/phones
 * @access  Private (ADMIN, OPERATOR)
 */
export const getAllPhones = asyncHandler(async (req, res) => {
  const phones = await senderService.getAllPhoneNumbers(null);

  res.status(200).json({
    success: true,
    data: phones
  });
});

/**
 * @desc    Lookup parties by name (partial match, searches both senders and receivers)
 * @route   GET /api/v1/receivers/lookup-by-name?name=...
 * @access  Private (ADMIN, OPERATOR)
 */
export const lookupByName = asyncHandler(async (req, res) => {
  const receivers = await senderService.lookupByName(req.query.name, null);

  res.status(200).json({
    success: true,
    data: receivers
  });
});

/**
 * @desc    Lookup parties by phone number (searches both senders and receivers)
 * @route   GET /api/v1/receivers/lookup-by-phone?phone=...
 * @access  Private (ADMIN, OPERATOR)
 */
export const lookupByPhone = asyncHandler(async (req, res) => {
  const receivers = await senderService.lookupByPhone(req.query.phone, null);

  res.status(200).json({
    success: true,
    data: receivers
  });
});

/** 
 * @desc Get all addresses for a receiver
 * @route GET /api/v1/receivers/:id/addresses
 * @access Private (ADMIN, OPERATOR)
 */
export const getAddresses = asyncHandler(async (req, res) => {
  const addresses = await senderService.getAddressesByPartyId(req.params.id, 2);

  res.status(200).json({
    success: true,
    data: addresses
  });
});

/**
 * @desc Create a new address for a receiver
 * @route POST /api/v1/receivers/:id/addresses
 * @access Private (ADMIN, OPERATOR)
 */
export const createAddress = asyncHandler(async (req, res) => {
  const address = await senderService.createAddress(req.params.id, req.body, req.user, 2);

  res.status(201).json({
    success: true,
    data: address
  });
});