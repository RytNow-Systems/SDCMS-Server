// ============================================================================
// File: src/interfaces/http/validations/validation.schemas.js
// Description: Zod validation schemas for all modules payload validation.
// ============================================================================

import { z } from "zod";

// ----------------------------------------------------------------------------
// AUTH SCHEMAS
// ----------------------------------------------------------------------------
export const loginSchema = z.object({
  email: z.string().email("Invalid email format").optional(),
  employeeCode: z
    .string()
    .min(1, "EmployeeCode or Email is required")
    .optional(),
  password: z.string().min(1, "Password is required"),
});

// ----------------------------------------------------------------------------
// EMPLOYEE SCHEMAS
// ----------------------------------------------------------------------------
export const createEmployeeSchema = z.object({
  name: z.string().min(1, "Employee name is required"),
  email: z.string().email("Invalid email format"),
  phoneNo: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["ADMIN", "OPERATOR", "COURIER"]),
  isActive: z.boolean().optional(),
});

export const updateEmployeeSchema = createEmployeeSchema.partial();

export const toggleAccessSchema = z.object({
  allowLogin: z.boolean({ required_error: "allowLogin boolean is required" }),
});

// ----------------------------------------------------------------------------
// COURIER SCHEMAS
// ----------------------------------------------------------------------------
export const createCourierSchema = z.object({
  courierName: z.string().min(1, "Courier name is required"),
  contactPerson: z.string().optional(),
  phoneNo: z.string().optional(),
  email: z.string().email().optional(),
  trackingUrlTemplate: z.string().optional(),
});

export const updateCourierSchema = createCourierSchema.partial();

// ----------------------------------------------------------------------------
// PRODUCT SCHEMAS
// ----------------------------------------------------------------------------

// Variation item shape for creating new variations (all fields required)
const createVariationItemSchema = z.object({
  colorId: z
    .number({ required_error: "Color ID is required" })
    .int()
    .positive("Valid color ID is required"),
  size: z
    .string({ required_error: "Size is required" })
    .min(1, "Size is required"),
  materialRate: z
    .number({ required_error: "Material rate is required" })
    .nonnegative("Rate cannot be negative"),
});

// Variation item shape for updates (diff strategy: matrixId present = update, absent = insert, isActive:false = delete)
const updateVariationItemSchema = z.object({
  matrixId: z.number().int().nonnegative().optional(),
  colorId: z.number().int().positive("Valid color ID is required").optional(),
  size: z.string().min(1, "Size is required").optional(),
  materialRate: z.number().nonnegative("Rate cannot be negative").optional(),
  isActive: z.boolean().optional(),
});

export const createProductSchema = z.object({
  materialName: z.string().min(1, "Material name is required"),
  materialRate: z
    .number()
    .nonnegative("Rate cannot be negative")
    .optional()
    .default(0),
  cuItemCode: z.string().optional(),
  categoryId: z
    .number({ required_error: "Category ID is required" })
    .int()
    .positive("Valid category ID is required"),
  unitId: z
    .number({ required_error: "Unit ID is required" })
    .int()
    .positive("Valid unit ID is required"),
  materialDescription: z.string().optional(),
  variations: z.array(createVariationItemSchema).optional(),
});

export const updateProductSchema = z.object({
  materialName: z.string().min(1, "Material name is required").optional(),
  materialRate: z.number().nonnegative("Rate cannot be negative").optional(),
  cuItemCode: z.string().optional(),
  categoryId: z.number().int().positive().optional(),
  unitId: z.number().int().positive().optional(),
  materialDescription: z.string().optional(),
  isActive: z.boolean().optional(),
  variations: z.array(updateVariationItemSchema).optional(),
});

export const productMatrixSchema = z.object({
  fkLuColorId: z
    .number({ required_error: "Color ID is required" })
    .int()
    .positive("Valid color ID is required"),
  materialRate: z
    .number({ required_error: "Material rate is required" })
    .nonnegative("Rate cannot be negative"),
  size: z
    .string({ required_error: "Size is required" })
    .min(1, "Size is required"),
  matrixId: z.number().int().nonnegative().optional(),
});

// ----------------------------------------------------------------------------
// PRODUCT LOOKUP SCHEMAS (Category, Color, Unit creation)
// ----------------------------------------------------------------------------
export const createCategorySchema = z.object({
  categoryName: z
    .string({ required_error: "Category name is required" })
    .min(1, "Category name is required"),
});

export const createColorSchema = z.object({
  colorName: z
    .string({ required_error: "Color name is required" })
    .min(1, "Color name is required"),
  colorCode: z.string().optional().default(""),
});

export const createUnitSchema = z.object({
  unitTitle: z
    .string({ required_error: "Unit title is required" })
    .min(1, "Unit title is required"),
  unitCode: z
    .string({ required_error: "Unit code is required" })
    .min(1, "Unit code is required"),
});

// ----------------------------------------------------------------------------
// ORDER SCHEMAS
// ----------------------------------------------------------------------------
// Product item shape (shared between root-level and receiver-level products)
const productItemSchema = z.object({
  variationId: z.number().int().positive("Valid variation ID is required"),
  quantity: z.number().int().positive("Quantity must be positive"),
});

const baseOrderSchema = z.object({
  senderId: z.number().int().positive("Valid sender ID is required"),
  senderAddressId: z
    .number()
    .int()
    .positive("Valid sender address ID is required"),
  courierId: z
    .number()
    .int()
    .positive("Valid courier ID is required")
    .optional()
    .nullable(),
  // Root-level products: used in Mode A (sender-to-self) and Mode C (combo)
  products: z.array(productItemSchema).optional(),
  // Receivers array: used in Mode B (normal) and Mode C (combo)
  receivers: z
    .array(
      z.object({
        receiverId: z.number().int().positive("Valid receiver ID is required"),
        receiverAddressId: z
          .number()
          .int()
          .positive("Valid receiver address ID is required"),
        products: z
          .array(productItemSchema)
          .min(1, "At least one product is required for each receiver"),
      }),
    )
    .optional(),
});

export const createOrderSchema = baseOrderSchema.superRefine((data, ctx) => {
  const hasRootProducts =
    Array.isArray(data.products) && data.products.length > 0;
  const hasReceivers =
    Array.isArray(data.receivers) && data.receivers.length > 0;

  if (!hasRootProducts && !hasReceivers) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        "Order must have at least one of: root-level products (Mode A) or receivers (Mode B/C)",
      path: ["products"],
    });
  }
});

// Update receiver product item shape (diff strategy: orderItemId present = update, absent = insert)
const updateReceiverProductSchema = z.object({
  orderItemId: z.number().int().positive().optional(), // present = update existing, absent = new
  variationId: z.number().int().positive("Valid variation ID is required"),
  quantity: z.number().int().positive("Quantity must be positive"),
});

// Update receiver shape (diff strategy: receiverDetailsId present = update, absent = insert)
const updateOrderReceiverSchema = z.object({
  receiverDetailsId: z.number().int().positive().optional(), // present = update existing, absent = new
  receiverId: z.number().int().positive("Valid receiver ID is required"),
  receiverAddressId: z
    .number()
    .int()
    .positive("Valid receiver address ID is required"),
  products: z
    .array(updateReceiverProductSchema)
    .min(1, "At least one product is required for each receiver"),
});

export const updateOrderSchema = z
  .object({
    senderId: z
      .number()
      .int()
      .positive("Valid sender ID is required")
      .optional(),
    senderAddressId: z
      .number()
      .int()
      .positive("Valid sender address ID is required")
      .optional(),
    receivers: z.array(updateOrderReceiverSchema).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

// ----------------------------------------------------------------------------
// SENDER (PARTY) SCHEMAS
// ----------------------------------------------------------------------------
export const createSenderSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  phoneNo: z.string().min(10, "Valid phone number is required"),
  emailId: z.string().email("Invalid email format").optional().nullable(),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(1, "Pincode is required"),
});

export const updateSenderSchema = createSenderSchema.partial();

export const createReceiverSchema = createSenderSchema;
export const updateReceiverSchema = updateSenderSchema;

// ----------------------------------------------------------------------------
// ADDRESS (PARTY_DETAILS) SCHEMAS
// ----------------------------------------------------------------------------
export const createAddressSchema = z.object({
  partyName: z.string().optional(),
  phoneNo: z.string().optional(),
  // emailId removed - email should always come from party_master, not party_details
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(1, "Pincode is required"),
  country: z.string().optional(),
  isDefault: z.boolean().optional(),
});
