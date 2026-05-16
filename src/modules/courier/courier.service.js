// ============================================================================
// File: src/modules/courier/courier.service.js
// Description: Business logic layer for Courier Partners Master Data.
// ============================================================================

import courierRepository from "./courier.repository.js";

class CourierService {
  _mapToApi(courier) {
    if (!courier) return null;
    return {
      courierId: courier.CourierId,
      courierName: courier.CourierName,
      phoneNumber: courier.PhoneNumber || null,
      trackingUrlTemplate: courier.TrackingUrlTemplate,
      isActive: courier.IsActive == true,
      createdAt: courier.CreatedDate,
    };
  }

  async getCouriers(page = 1, limit = 20, search = '', includeInactive = false) {
    const result = await courierRepository.findAll({ page, limit, search, includeInactive });
    return {
      data: result.data.map((c) => this._mapToApi(c)),
      meta: result.meta,
    };
  }

  async getCourierById(id) {
    const courier = await courierRepository.findById(id);
    if (!courier) {
      const error = new Error("Courier partner not found");
      error.statusCode = 404;
      throw error;
    }
    return this._mapToApi(courier);
  }

  async createCourier(courierData, adminId) {
    if (!courierData.courierName) {
      const error = new Error("Courier Name is required");
      error.statusCode = 400;
      throw error;
    }

    const duplicateCount = await courierRepository.checkDuplicate(
      0,
      courierData.courierName,
    );
    if (duplicateCount > 0) {
      const error = new Error("Courier name already exists");
      error.statusCode = 409;
      throw error;
    }

    const courier = await courierRepository.create(courierData, adminId);
    return this._mapToApi(courier);
  }

  async updateCourier(id, updates, adminId) {
    if (updates.courierName) {
      const duplicateCount = await courierRepository.checkDuplicate(
        id,
        updates.courierName,
      );
      if (duplicateCount > 0) {
        const error = new Error("Courier name already exists");
        error.statusCode = 409;
        throw error;
      }
    }

    const courier = await courierRepository.update(id, updates, adminId);
    if (!courier) {
      const error = new Error("Courier partner not found");
      error.statusCode = 404;
      throw error;
    }
    return this._mapToApi(courier);
  }

  async updateCourierStatus(id, isActive, adminId) {
    // Business Rule checking - in production, verify courier isn't linked to active orders
    // before allowing even a soft delete.
    const success = await courierRepository.updateStatus(id, isActive, adminId);
    if (!success) {
      const error = new Error("Courier partner not found");
      error.statusCode = 404;
      throw error;
    }

    return true;
  }
}

export default new CourierService();
