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
 * @desc    Get all distinct active receiver names
 * @route   GET /api/v1/receivers/names
 * @access  Private (ADMIN, OPERATOR)
 */
export const getAllNames = asyncHandler(async (req, res) => {
  const names = await senderService.getAllSenderNames(2);

  res.status(200).json({
    success: true,
    data: names
  });
});

/**
 * @desc    Get all distinct active receiver phone numbers
 * @route   GET /api/v1/receivers/phones
 * @access  Private (ADMIN, OPERATOR)
 */
export const getAllPhones = asyncHandler(async (req, res) => {
  const phones = await senderService.getAllPhoneNumbers(2);

  res.status(200).json({
    success: true,
    data: phones
  });
});

/**
 * @desc    Lookup receivers by name (partial match)
 * @route   GET /api/v1/receivers/lookup-by-name?name=...
 * @access  Private (ADMIN, OPERATOR)
 */
export const lookupByName = asyncHandler(async (req, res) => {
  const receivers = await senderService.lookupByName(req.query.name, 2);

  res.status(200).json({
    success: true,
    data: receivers
  });
});

/**
 * @desc    Lookup receivers by phone number (partial match)
 * @route   GET /api/v1/receivers/lookup-by-phone?phone=...
 * @access  Private (ADMIN, OPERATOR)
 */
export const lookupByPhone = asyncHandler(async (req, res) => {
  const receivers = await senderService.lookupByPhone(req.query.phone, 2);

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