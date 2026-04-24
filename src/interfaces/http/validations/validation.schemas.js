// ============================================================================
// File: src/interfaces/http/validations/validation.schemas.js
// Description: Zod validation schemas for all modules payload validation.
// ============================================================================

import { z } from 'zod';

// ----------------------------------------------------------------------------
// AUTH SCHEMAS
// ----------------------------------------------------------------------------
export const loginSchema = z.object({
  email: z.string().email('Invalid email format').optional(),
  employeeCode: z.string().min(1, 'EmployeeCode or Email is required').optional(),
  password: z.string().min(1, 'Password is required')
});

// ----------------------------------------------------------------------------
// EMPLOYEE SCHEMAS
// ----------------------------------------------------------------------------
export const createEmployeeSchema = z.object({
  name: z.string().min(1, 'Employee name is required'),
  email: z.string().email('Invalid email format'),
  phoneNo: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['ADMIN', 'OPERATOR', 'COURIER']),
  isActive: z.boolean().optional()
});

export const updateEmployeeSchema = createEmployeeSchema.partial();

export const toggleAccessSchema = z.object({
  allowLogin: z.boolean({ required_error: 'allowLogin boolean is required' })
});

// ----------------------------------------------------------------------------
// COURIER SCHEMAS
// ----------------------------------------------------------------------------
export const createCourierSchema = z.object({
  courierName: z.string().min(1, 'Courier name is required'),
  contactPerson: z.string().optional(),
  phoneNo: z.string().optional(),
  email: z.string().email().optional(),
  trackingUrlTemplate: z.string().optional()
});

export const updateCourierSchema = createCourierSchema.partial();

// ----------------------------------------------------------------------------
// PRODUCT SCHEMAS
// ----------------------------------------------------------------------------
export const createProductSchema = z.object({
  materialName: z.string().min(1, 'Material name is required'),
  materialRate: z.number({ required_error: 'Material rate is required' }).nonnegative('Rate cannot be negative'),
  cuItemCode: z.string().optional(),
  categoryId: z.number().int().positive().optional(),
  unitId: z.number().int().positive().optional(),
  materialDescription: z.string().optional()
});

export const updateProductSchema = z.object({
  materialName: z.string().min(1, 'Material name is required').optional(),
  materialRate: z.number().nonnegative('Rate cannot be negative').optional(),
  cuItemCode: z.string().optional(),
  categoryId: z.number().int().positive().optional(),
  unitId: z.number().int().positive().optional(),
  materialDescription: z.string().optional(),
  isActive: z.boolean().optional()
});

// ----------------------------------------------------------------------------
// ORDER SCHEMAS
// ----------------------------------------------------------------------------
// Product item shape (shared between root-level and receiver-level products)
const productItemSchema = z.object({
  productId: z.number().int().positive('Valid product ID is required'),
  qty: z.number().int().positive('Quantity must be positive'),
  unitPrice: z.number().nonnegative().nullable().optional()
});

const baseOrderSchema = z.object({
  senderName: z.string().min(1, 'Sender name is required'),
  senderMobile: z.string().min(1, 'Sender mobile is required'),
  senderAddress: z.string().optional(),
  courierId: z.number().int().positive('Valid courier ID is required'),
  // Root-level products: used in Mode A (sender-to-self) and Mode C (combo)
  products: z.array(productItemSchema).optional(),
  // Receivers array: used in Mode B (normal) and Mode C (combo)
  receivers: z.array(
    z.object({
      receiverName: z.string().min(1, 'Receiver name is required'),
      receiverPhone: z.string().optional(),
      address: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      pincode: z.string().optional(),
      products: z.array(productItemSchema)
        .min(1, 'At least one product is required for each receiver')
    })
  ).optional()
});

export const createOrderSchema = baseOrderSchema.superRefine((data, ctx) => {
  const hasRootProducts = Array.isArray(data.products) && data.products.length > 0;
  const hasReceivers = Array.isArray(data.receivers) && data.receivers.length > 0;

  if (!hasRootProducts && !hasReceivers) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Order must have at least one of: root-level products (Mode A) or receivers (Mode B/C)',
      path: ['products']
    });
  }
});

export const updateOrderSchema = baseOrderSchema.partial();

// ----------------------------------------------------------------------------
// SENDER (PARTY) SCHEMAS
// ----------------------------------------------------------------------------
export const createSenderSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  phoneNo: z.string().min(10, 'Valid phone number is required'),
  emailId: z.string().email('Invalid email format').optional().nullable(),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().min(1, 'Pincode is required')
});

export const updateSenderSchema = createSenderSchema.partial();

// ----------------------------------------------------------------------------
// ADDRESS (PARTY_DETAILS) SCHEMAS
// ----------------------------------------------------------------------------
export const createAddressSchema = z.object({
  partyName: z.string().optional(),
  phoneNo: z.string().optional(),
  emailId: z.string().email('Invalid email format').optional().nullable(),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().min(1, 'Pincode is required'),
  country: z.string().optional(),
  isDefault: z.boolean().optional()
});
