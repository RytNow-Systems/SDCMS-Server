// ============================================================================
// File: src/interfaces/http/controllers/employee.controller.js
// Description: HTTP controllers for Employee Management endpoints.
// Formats API responses to match the `{ success: true, data: { ... } }` contract.
// Uses express-async-handler to automatically pass exceptions to the
// global error handler (AGENTS.md §3D).
// ============================================================================

import asyncHandler from 'express-async-handler';
import employeeService from '../../../modules/employee/employee.service.js';

// @desc    Get all employees (paginated)
// @route   GET /api/v1/employees
// @access  Private/Admin
export const getEmployees = asyncHandler(async (req, res) => {
  const result = await employeeService.getEmployees(req.query);
  res.json({
    success: true,
    data: result.data,
    meta: result.meta
  });
});

// @desc    Get employee by ID
// @route   GET /api/v1/employees/:id
// @access  Private/Admin
export const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await employeeService.getEmployeeById(req.params.id);
  res.json({
    success: true,
    data: employee
  });
});

// @desc    Create a new employee
// @route   POST /api/v1/employees
// @access  Private/Admin
export const createEmployee = asyncHandler(async (req, res) => {
  const newEmployee = await employeeService.createEmployee(req.body);
  res.status(201).json({
    success: true,
    data: newEmployee
  });
});

// @desc    Update employee details
// @route   PUT /api/v1/employees/:id
// @access  Private/Admin
export const updateEmployee = asyncHandler(async (req, res) => {
  const updatedEmployee = await employeeService.updateEmployee(req.params.id, req.body);
  res.json({
    success: true,
    data: updatedEmployee
  });
});

// @desc    Toggle employee login access
// @route   PATCH /api/v1/employees/:id/toggle-access
// @access  Private/Admin
export const toggleAccess = asyncHandler(async (req, res) => {
  const { allowLogin } = req.body;
  
  if (allowLogin === undefined) {
    const error = new Error('allowLogin boolean is required');
    error.statusCode = 400;
    throw error;
  }

  // Pass the calling user's ID to prevent self-lockout
  const adminId = req.user.id; 
  const employeeIdToToggle = req.params.id;

  const updatedEmployee = await employeeService.toggleAccess(adminId, employeeIdToToggle, allowLogin);
  res.json({
    success: true,
    data: updatedEmployee
  });
});

// @desc    Toggle employee active status (soft delete / reactivate)
// @route   PATCH /api/v1/employees/:id/status
// @access  Private/Admin
export const updateEmployeeStatus = asyncHandler(async (req, res) => {
  const adminId = req.user.id;
  const { isActive } = req.body;
  const updatedEmployee = await employeeService.updateEmployeeStatus(adminId, req.params.id, isActive);

  res.status(200).json({
    success: true,
    message: `Employee successfully ${isActive ? 'activated' : 'deactivated'}`,
    data: updatedEmployee
  });
});
