// ============================================================================
// File: src/modules/courier/courier.service.js
// Description: Business logic layer for Courier Partners Master Data.
// ============================================================================

import courierRepository from "./courier.repository.js";

class CourierService {
  async getCouriers(page = 1, limit = 20, search = "") {
    return await courierRepository.findAll(page, limit, search);
  }

  async getCourierById(id) {
    const courier = await courierRepository.findById(id);
    if (!courier) {
      const error = new Error("Courier partner not found");
      error.statusCode = 404;
      throw error;
    }
    return courier;
  }

  async createCourier(courierData) {
    if (!courierData.courierName || !courierData.trackingUrlTemplate) {
      const error = new Error(
        "Courier Name and Tracking URL Template are required",
      );
      error.statusCode = 400;
      throw error;
    }

    return await courierRepository.create(courierData);
  }

  async updateCourier(id, updates) {
    const courier = await courierRepository.update(id, updates);
    if (!courier) {
      const error = new Error("Courier partner not found");
      error.statusCode = 404;
      throw error;
    }
    return courier;
  }

  async deleteCourier(id) {
    // Business Rule checking - in production, verify courier isn't linked to active orders
    // before allowing even a soft delete.
    const success = await courierRepository.delete(id);
    if (!success) {
      const error = new Error("Courier partner not found");
      error.statusCode = 404;
      throw error;
    }

    return true;
  }
}

export default new CourierService();
