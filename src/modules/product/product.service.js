// ============================================================================
// File: src/modules/product/product.service.js
// Description: Business logic layer for Products Master.
//
// Clean Code Principles:
//   - Implicit Mapping: Mappers decouple API from DB schemas.
//   - Validation: Duplicate checks happen before repository calls.
//   - Consistency: camelCase API contract vs PascalCase DB/Internal.
// ============================================================================

import productRepository from './product.repository.js';

class ProductService {

  // --------------------------------------------------------------------------
  // 1. DATA MAPPERS (API ↔ INTERNAL)
  // --------------------------------------------------------------------------

  /**
   * Translates DB/Internal record to API-friendly camelCase object.
   * @param {object} product - Raw DB record.
   * @returns {object|null} API object.
   */
  _mapToApi(product) {
    if (!product) return null;
    return {
      id: product.PkProductId || product.id,
      materialName: product.MaterialName || product.materialName,
      materialRate: product.MaterialRate || product.materialRate,
      cuItemCode: product.cu_item_code || product.cuItemCode || null,
      materialDescription: product.MaterialDescription || product.materialDescription || product.description || null,
      categoryId: product.FkProductCategoryId || product.categoryId || null,
      unitId: product.FkUnitId || product.unitId || null,
      categoryName: product.CategoryName || null,
      unitTitle: product.UnitTitle || null,
      isActive: product.IsActive !== undefined ? product.IsActive : product.isActive,
      createdAt: product.CreatedDate || product.createdAt
    };
  }

  /**
   * Translates API payload to DB-native PascalCase object.
   * @param {object} apiData - Payload from request.
   * @returns {object} DB-friendly object.
   */
  _mapToInternal(apiData) {
    const internal = {};
    if (apiData.materialName) internal.MaterialName = apiData.materialName;
    if (apiData.materialRate !== undefined) internal.MaterialRate = apiData.materialRate;
    if (apiData.cuItemCode) internal.cu_item_code = apiData.cuItemCode;
    if (apiData.materialDescription) internal.MaterialDescription = apiData.materialDescription;
    if (apiData.categoryId) internal.FkProductCategoryId = apiData.categoryId;
    if (apiData.unitId) internal.FkUnitId = apiData.unitId;
    return internal;
  }

  /**
   * Translates a color matrix DB record to API-friendly camelCase.
   * @param {object} row - Raw color matrix record.
   * @returns {object} API-friendly matrix entry.
   */
  _mapMatrixToApi(row) {
    if (!row) return null;
    return {
      id: row.PkProductColorId || row.id,
      productId: row.FkProductId || row.productId,
      colorId: row.FkLuColorId || row.colorId,
      colorName: row.ColorName || row.colorName || null,
      materialRate: row.MaterialRate || row.materialRate,
      size: row.Size || row.size,
      isActive: row.IsActive !== undefined ? row.IsActive : row.isActive,
      createdAt: row.CreatedDate || row.createdAt
    };
  }

  /**
   * Translates color matrix API payload to DB-native PascalCase.
   * @param {object} apiData - { fkLuColorId, materialRate, size }.
   * @returns {object} DB-friendly object.
   */
  _mapMatrixToInternal(apiData) {
    const internal = {};
    if (apiData.fkLuColorId !== undefined) internal.FkLuColorId = apiData.fkLuColorId;
    if (apiData.materialRate !== undefined) internal.MaterialRate = apiData.materialRate;
    if (apiData.size !== undefined) internal.Size = apiData.size;
    return internal;
  }

  // --------------------------------------------------------------------------
  // 2. RETRIEVAL METHODS
  // --------------------------------------------------------------------------

  /**
   * Retrieves all products with optional filters.
   */
  async getProducts(categoryId = 0, unitId = 0) {
    const data = await productRepository.findAll(categoryId, unitId);
    return {
      data: data.map(p => this._mapToApi(p)),
      total: data.length
    };
  }

  /**
   * Retrieves a specific product by ID.
   */
  async getProductById(id) {
    const product = await productRepository.findById(id);
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    const mapped = this._mapToApi(product);
    mapped.variations = (product.variations || []).map(v => this._mapMatrixToApi(v));
    return mapped;
  }

  /**
   * Fetches search-friendly dropdown items.
   */
  async getProductDropdown(search = '') {
    const products = await productRepository.getDropdown(search);
    return products.map(p => ({
      ...this._mapToApi(p),
      label: `${p.MaterialName || p.materialName} (${p.CategoryName || p.categoryName || 'No Category'})`
    }));
  }

  // --------------------------------------------------------------------------
  // 3. MUTATION METHODS
  // --------------------------------------------------------------------------

  /**
   * Creates a new product with uniqueness validation.
   */
  async createProduct(productData, adminId) {
    const internalData = this._mapToInternal(productData);

    // Business Rule: Prevent duplicate products in the same category/unit
    const duplicateCount = await productRepository.checkDuplicate(
      0, 
      internalData.FkProductCategoryId, 
      internalData.FkUnitId, 
      internalData.MaterialName
    );

    if (duplicateCount > 0) {
      const error = new Error('A product with this name already exists in the selected category/unit.');
      error.statusCode = 409;
      throw error;
    }

    const newProduct = await productRepository.create(internalData, adminId);
    return this._mapToApi(newProduct);
  }

  /**
   * Updates product details with uniqueness validation.
   */
  async updateProduct(id, updates, adminId) {
    const existing = await this.getProductById(id);
    const internalUpdates = this._mapToInternal(updates);

    // Business Rule: Check for name collision upon update
    const name = internalUpdates.MaterialName || existing.materialName;
    const catId = internalUpdates.FkProductCategoryId || existing.categoryId;
    const unitId = internalUpdates.FkUnitId || existing.unitId;

    const duplicateCount = await productRepository.checkDuplicate(id, catId, unitId, name);
    if (duplicateCount > 0) {
      const error = new Error('Another product already uses this name in the selected category/unit.');
      error.statusCode = 409;
      throw error;
    }

    const updatedProduct = await productRepository.update(id, internalUpdates, adminId);
    return this._mapToApi(updatedProduct);
  }

  /**
   * Adds or updates a color/size matrix entry for a product.
   * @param {number} productId - Product PK.
   * @param {object} matrixData - { fkLuColorId, materialRate, size, matrixId? }.
   * @param {number} adminId - User ID.
   * @returns {Promise<object>} API-friendly matrix record.
   */
  async addOrUpdateColorMatrix(productId, matrixData, adminId) {
    // Verify the product exists first
    await this.getProductById(productId);

    const internalData = this._mapMatrixToInternal(matrixData);
    const matrixId = matrixData.matrixId || 0;
    const result = await productRepository.setColorMatrix(
      matrixId, productId, internalData, adminId
    );
    return this._mapMatrixToApi(result);
  }

  /**
   * Soft-deletes a product.
   */
  async deleteProduct(id, adminId) {
    const success = await productRepository.delete(id, adminId);
    if (!success) {
      const error = new Error('Product not found or deletion failed.');
      error.statusCode = 404;
      throw error;
    }
    return true;
  }
}

export default new ProductService();
