// ============================================================================
// File: src/interfaces/http/controllers/sender.controller.js
// Description: HTTP controllers for Sender (Party) module.
// Uses express-async-handler for centralized error handling.
// ============================================================================

import asyncHandler from 'express-async-handler';
import senderService from '../../../modules/sender/sender.service.js';

/**
 * @desc    Get all active senders
 * @route   GET /api/v1/senders
 * @access  Private
 */
export const getSenders = asyncHandler(async (req, res) => {
  const senders = await senderService.getSenders();
  
  res.status(200).json({
    success: true,
    data: senders
  });
});

/**
 * @desc    Get sender by ID
 * @route   GET /api/v1/senders/:id
 * @access  Private
 */
export const getSenderById = asyncHandler(async (req, res) => {
  const sender = await senderService.getSenderById(req.params.id);
  
  res.status(200).json({
    success: true,
    data: sender
  });
});

/**
 * @desc    Lookup sender by phone number
 * @route   GET /api/v1/senders/lookup
 * @access  Private
 */
export const lookupByPhone = asyncHandler(async (req, res) => {
  const phone = req.query.phone;
  const sender = await senderService.lookupByPhone(phone);
  
  res.status(200).json({
    success: true,
    data: sender
  });
});

/**
 * @desc    Create a new sender
 * @route   POST /api/v1/senders
 * @access  Private
 */
export const createSender = asyncHandler(async (req, res) => {
  const sender = await senderService.createSender(req.body);
  
  res.status(201).json({
    success: true,
    data: sender
  });
});

/**
 * @desc    Update an existing sender
 * @route   PUT /api/v1/senders/:id
 * @access  Private
 */
export const updateSender = asyncHandler(async (req, res) => {
  const sender = await senderService.updateSender(req.params.id, req.body);
  
  res.status(200).json({
    success: true,
    data: sender
  });
});

/**
 * @desc    Soft-delete a sender
 * @route   DELETE /api/v1/senders/:id
 * @access  Private
 */
export const deleteSender = asyncHandler(async (req, res) => {
  await senderService.deleteSender(req.params.id);
  
  res.status(200).json({
    success: true,
    message: 'Sender successfully deactivated'
  });
});

// ============================================================================
// SENDER LOOKUP CONTROLLERS (autocomplete dropdowns)
// ============================================================================

/**
 * @desc    Get all distinct active sender names
 * @route   GET /api/v1/senders/names
 * @access  Private (ADMIN, OPERATOR)
 */
export const getAllNames = asyncHandler(async (req, res) => {
  const names = await senderService.getAllSenderNames(1);

  res.status(200).json({
    success: true,
    data: names
  });
});

/**
 * @desc    Get all distinct active phone numbers
 * @route   GET /api/v1/senders/phones
 * @access  Private (ADMIN, OPERATOR)
 */
export const getAllPhones = asyncHandler(async (req, res) => {
  const phones = await senderService.getAllPhoneNumbers(1);

  res.status(200).json({
    success: true,
    data: phones
  });
});

/**
 * @desc    Lookup senders by name (partial match)
 * @route   GET /api/v1/senders/lookup-by-name?name=...
 * @access  Private (ADMIN, OPERATOR)
 */
export const lookupByName = asyncHandler(async (req, res) => {
  const senders = await senderService.lookupByName(req.query.name, 1);

  res.status(200).json({
    success: true,
    data: senders
  });
});

// ============================================================================
// ADDRESS BOOK (PARTY_DETAILS) CONTROLLERS
// ============================================================================

/**
 * @desc    Get all addresses for a party (address book dropdown)
 * @route   GET /api/v1/senders/:id/addresses
 * @access  Private (ADMIN, OPERATOR)
 */
export const getAddresses = asyncHandler(async (req, res) => {
  const addresses = await senderService.getAddressesByPartyId(req.params.id);

  res.status(200).json({
    success: true,
    data: addresses
  });
});

/**
 * @desc    Create a new address for a party
 * @route   POST /api/v1/senders/:id/addresses
 * @access  Private (ADMIN, OPERATOR)
 */
export const createAddress = asyncHandler(async (req, res) => {
  const address = await senderService.createAddress(req.params.id, req.body, req.user);

  res.status(201).json({
    success: true,
    data: address
  });
});
