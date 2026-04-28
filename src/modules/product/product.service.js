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

  /**
   * Translates a raw product_category DB record to API-friendly camelCase.
   * @param {object} cat - Raw category record.
   * @returns {object} API object { id, categoryName }.
   */
  _mapCategoryToApi(cat) {
    if (!cat) return null;
    return {
      id: cat.PkProductCategoryId || cat.id,
      categoryName: cat.CategoryName || cat.categoryName
    };
  }

  /**
   * Translates a raw lu_unit DB record to API-friendly camelCase.
   * @param {object} unit - Raw unit record.
   * @returns {object} API object { id, unitTitle, unitCode }.
   */
  _mapUnitToApi(unit) {
    if (!unit) return null;
    return {
      id: unit.PkUnitId || unit.id,
      unitTitle: unit.UnitTitle || unit.unitTitle,
      unitCode: unit.UnitCode || unit.unitCode
    };
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
    const items = await productRepository.getDropdown(search);
    return items.map(item => {
      const labelParts = [item.MaterialName];
      if (item.ColorName || item.Size) {
        const specs = [item.ColorName, item.Size].filter(Boolean).join(' / ');
        labelParts.push(`— ${specs}`);
      }
      if (item.CategoryName) {
        labelParts.push(`(${item.CategoryName})`);
      }
      
      return {
        productId: item.PkProductId,
        variationId: item.PkProductColorId || null,
        materialName: item.MaterialName,
        colorName: item.ColorName,
        size: item.Size,
        materialRate: item.MaterialRate,
        cuItemCode: item.cu_item_code,
        categoryName: item.CategoryName,
        unitTitle: item.UnitTitle,
        label: labelParts.join(' ')
      };
    });
  }

  /**
   * Retrieves all product categories mapped to camelCase.
   * @returns {Promise<Array>} List of { id, categoryName } objects.
   */
  async getCategories() {
    const raw = await productRepository.getCategories();
    return raw.map(c => this._mapCategoryToApi(c));
  }

  /**
   * Retrieves all product units mapped to camelCase.
   * @returns {Promise<Array>} List of { id, unitTitle, unitCode } objects.
   */
  async getUnits() {
    const raw = await productRepository.getUnits();
    return raw.map(u => this._mapUnitToApi(u));
  }

  // --------------------------------------------------------------------------
  // 3. MUTATION METHODS
  // --------------------------------------------------------------------------

  /**
   * Creates a new product with uniqueness validation.
   */
  async createProduct(productData, adminId) {
    const internalData = this._mapToInternal(productData);

    // Bug 1a: Name to ID resolution
    if (productData.categoryName && !internalData.FkProductCategoryId) {
      const cat = await productRepository.getCategoryByName(productData.categoryName);
      if (!cat) {
        const error = new Error(`Category '${productData.categoryName}' not found.`);
        error.statusCode = 400;
        throw error;
      }
      internalData.FkProductCategoryId = cat.PkProductCategoryId || cat.id;
    }
    if (productData.unitCode && !internalData.FkUnitId) {
      const unit = await productRepository.getUnitByCode(productData.unitCode);
      if (!unit) {
        const error = new Error(`Unit code '${productData.unitCode}' not found.`);
        error.statusCode = 400;
        throw error;
      }
      internalData.FkUnitId = unit.PkUnitId || unit.id;
    }

    // Bug 1b: MaterialCode and cu_item_code auto-gen
    if (!internalData.cu_item_code) {
      const nextCode = await productRepository.getNextItemCode();
      internalData.cu_item_code = nextCode.padStart(4, '0');
      internalData.MaterialCode = internalData.cu_item_code;
    } else {
      internalData.MaterialCode = internalData.cu_item_code;
    }

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

    let newProduct = await productRepository.create(internalData, adminId);
    
    // Bug 1c: Re-fetch fallback if SP returned null or incomplete data
    const insertedId = newProduct?.InsertedId || newProduct?.PkProductId || newProduct?.id;
    if (insertedId) {
       newProduct = await productRepository.findById(insertedId) || newProduct;
    } else if (!newProduct || (!newProduct.PkProductId && !newProduct.id)) {
      // Find by cu_item_code if ID is completely missing
      const searchRes = await productRepository.findAll(0, 0);
      newProduct = searchRes.find(p => p.cu_item_code === internalData.cu_item_code) || newProduct;
    }

    return this._mapToApi(newProduct);
  }

  /**
   * Updates product details with uniqueness validation.
   */
  async updateProduct(id, updates, adminId) {
    const existing = await this.getProductById(id);
    const internalUpdates = this._mapToInternal(updates);

    // Bug 1a: Name to ID resolution
    if (updates.categoryName && !internalUpdates.FkProductCategoryId) {
      const cat = await productRepository.getCategoryByName(updates.categoryName);
      if (!cat) {
        const error = new Error(`Category '${updates.categoryName}' not found.`);
        error.statusCode = 400;
        throw error;
      }
      internalUpdates.FkProductCategoryId = cat.PkProductCategoryId || cat.id;
    }
    if (updates.unitCode && !internalUpdates.FkUnitId) {
      const unit = await productRepository.getUnitByCode(updates.unitCode);
      if (!unit) {
        const error = new Error(`Unit code '${updates.unitCode}' not found.`);
        error.statusCode = 400;
        throw error;
      }
      internalUpdates.FkUnitId = unit.PkUnitId || unit.id;
    }

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

    let updatedProduct = await productRepository.update(id, internalUpdates, adminId);
    
    // Bug 1c: Re-fetch fallback
    if (!updatedProduct || (!updatedProduct.PkProductId && !updatedProduct.id)) {
      updatedProduct = await productRepository.findById(id) || updatedProduct;
    }

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
