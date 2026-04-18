// ============================================================================
// File: src/modules/courier/courier.service.js
// Description: Business logic layer for Courier Partners Master Data.
// ============================================================================

import courierRepository from "./courier.repository.js";

class CourierService {
  _mapToApi(courier) {
    if (!courier) return null;
    return {
      id: courier.CourierId,
      courierName: courier.CourierName,
      trackingUrlTemplate: courier.TrackingUrlTemplate,
      isActive: courier.IsActive === 1 || courier.IsActive === true,
      createdAt: courier.CreatedDate
    };
  }

  async getCouriers(page = 1, limit = 20, search = "") {
    const result = await courierRepository.findAll(page, limit, search);
    return {
      ...result,
      data: result.data.map(c => this._mapToApi(c))
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

  async createCourier(courierData) {
    if (!courierData.courierName || !courierData.trackingUrlTemplate) {
      const error = new Error(
        "Courier Name and Tracking URL Template are required",
      );
      error.statusCode = 400;
      throw error;
    }

    const courier = await courierRepository.create(courierData);
    return this._mapToApi(courier);
  }

  async updateCourier(id, updates) {
    const courier = await courierRepository.update(id, updates);
    if (!courier) {
      const error = new Error("Courier partner not found");
      error.statusCode = 404;
      throw error;
    }
    return this._mapToApi(courier);
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
