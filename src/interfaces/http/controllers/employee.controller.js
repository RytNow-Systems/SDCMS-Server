// ============================================================================
// File: src/interfaces/http/controllers/employee.controller.js
// Description: HTTP controllers for Employee Management endpoints.
// Formats API responses to match the `{ success: true, data: { ... } }` contract.
// ============================================================================

import employeeService from '../../../modules/employee/employee.service.js';

// @desc    Get all employees (paginated)
// @route   GET /api/v1/employees
// @access  Private/Admin
export const getEmployees = async (req, res, next) => {
  try {
    const result = await employeeService.getEmployees(req.query);
    res.json({
      success: true,
      data: result.data,
      meta: result.meta
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get employee by ID
// @route   GET /api/v1/employees/:id
// @access  Private/Admin
export const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    res.json({
      success: true,
      data: employee
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new employee
// @route   POST /api/v1/employees
// @access  Private/Admin
export const createEmployee = async (req, res, next) => {
  try {
    const newEmployee = await employeeService.createEmployee(req.body);
    res.status(201).json({
      success: true,
      data: newEmployee
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update employee details
// @route   PUT /api/v1/employees/:id
// @access  Private/Admin
export const updateEmployee = async (req, res, next) => {
  try {
    const updatedEmployee = await employeeService.updateEmployee(req.params.id, req.body);
    res.json({
      success: true,
      data: updatedEmployee
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle employee login access
// @route   PATCH /api/v1/employees/:id/toggle-access
// @access  Private/Admin
export const toggleAccess = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};
