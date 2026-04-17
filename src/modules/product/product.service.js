// ============================================================================
// File: src/modules/product/product.service.js
// Description: Business logic layer for Products Master Data.
//
// Dual-Mode Mapping: Handles both mock field names and DB column names.
//   - Mock/DB: { PkProductId, MaterialName, MaterialRate, cu_item_code }
//   - API:     { id, productName, materialRate, cuItemCode }
// ============================================================================

import productRepository from './product.repository.js';

class ProductService {

  /**
   * Internal mapper to format DB/mock results for the API layer.
   * Handles both DB column names and legacy mock field names gracefully.
   *
   * @param {object} product - Raw product record from repository.
   * @returns {object|null} API-formatted product object.
   */
  _mapToApi(product) {
    if (!product) return null;
    return {
      id: product.PkProductId || product.id,
      productName: product.MaterialName || product.materialName,
      materialRate: product.MaterialRate || product.materialRate,
      cuItemCode: product.cu_item_code || product.cuItemCode,
      description: product.MaterialDescription || product.description || null,
      categoryId: product.FkProductCategoryId || product.categoryId || null,
      unitId: product.FkUnitId || product.unitId || null,
      isActive: product.IsActive !== undefined ? product.IsActive : product.isActive,
      createdAt: product.CreatedDate || product.createdAt
    };
  }

  /**
   * Internal mapper to format API payloads for the Repository layer.
   * Translates API field names to DB-native column names.
   *
   * @param {object} apiData - API payload.
   * @returns {object} Repository-formatted object.
   */
  _mapToInternal(apiData) {
    const internal = {};
    if (apiData.productName) internal.MaterialName = apiData.productName;
    if (apiData.materialName) internal.MaterialName = apiData.materialName;
    if (apiData.materialRate !== undefined) internal.MaterialRate = apiData.materialRate;
    if (apiData.cuItemCode) internal.cu_item_code = apiData.cuItemCode;
    if (apiData.description) internal.MaterialDescription = apiData.description;
    if (apiData.categoryId) internal.FkProductCategoryId = apiData.categoryId;
    if (apiData.unitId) internal.FkUnitId = apiData.unitId;
    return internal;
  }

  async getProducts(page = 1, limit = 20, search = '') {
    const { data, total } = await productRepository.findAll(page, limit, search);
    return {
      data: data.map(p => this._mapToApi(p)),
      total
    };
  }

  async getProductById(id) {
    const product = await productRepository.findById(id);
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    return this._mapToApi(product);
  }

  async createProduct(productData) {
    const internalData = this._mapToInternal(productData);

    if (!internalData.MaterialName || internalData.MaterialRate === undefined) {
      const error = new Error('Product Name and Material Rate are required');
      error.statusCode = 400;
      throw error;
    }

    if (isNaN(parseFloat(internalData.MaterialRate)) || parseFloat(internalData.MaterialRate) < 0) {
      const error = new Error('Material rate must be a valid positive number');
      error.statusCode = 400;
      throw error;
    }

    const newProduct = await productRepository.create(internalData);
    return this._mapToApi(newProduct);
  }

  async updateProduct(id, updates) {
    // Ensure product exists
    await this.getProductById(id);

    const internalUpdates = this._mapToInternal(updates);

    if (internalUpdates.MaterialRate !== undefined) {
      if (isNaN(parseFloat(internalUpdates.MaterialRate)) || parseFloat(internalUpdates.MaterialRate) < 0) {
        const error = new Error('Material rate must be a valid positive number');
        error.statusCode = 400;
        throw error;
      }
    }

    const updatedProduct = await productRepository.update(id, internalUpdates);
    return this._mapToApi(updatedProduct);
  }

  async deleteProduct(id) {
    // Ensure product exists
    await this.getProductById(id);

    // In production, verify product isn't linked to active orders before deleting.

    const success = await productRepository.delete(id);
    if (!success) {
      const error = new Error('Failed to delete product');
      error.statusCode = 500;
      throw error;
    }

    return true;
  }
}

export default new ProductService();
