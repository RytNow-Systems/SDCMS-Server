// ============================================================================
// File: src/modules/product/product.service.js
// Description: Business logic layer for Products Master.
//
// Clean Code Principles:
//   - Implicit Mapping: Mappers decouple API from DB schemas.
//   - Validation: Duplicate checks happen before repository calls.
//   - Consistency: camelCase API contract vs PascalCase DB/Internal.
// ============================================================================

import productRepository from "./product.repository.js";

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

    const matName = product.MaterialName || product.materialName || "";
    const catName = product.CategoryName || product.categoryName || "";
    const colName = product.ColorName || product.colorName || "";
    const size = product.Size || product.size || "";
    const unitTitle = product.UnitTitle || product.unitTitle || "";

    let generatedDesc = matName;
    if (catName) generatedDesc += ` (${catName})`;
    const specs = [];
    if (colName) specs.push(colName);
    if (size) specs.push(size);
    if (specs.length > 0) generatedDesc += ` - ${specs.join(", ")}`;
    if (unitTitle) generatedDesc += ` [${unitTitle}]`;

    return {
      productId: product.PkProductId || product.id,
      variationId: product.PkProductColorId ?? null,
      materialName: matName,
      materialRate: product.MaterialRate || product.materialRate,
      cuItemCode: product.cu_item_code || product.cuItemCode || null,
      materialDescription: generatedDesc || null,
      categoryId: product.FkProductCategoryId || product.categoryId || null,
      unitId: product.FkUnitId || product.unitId || null,
      categoryName: product.CategoryName || null,
      unitTitle: product.UnitTitle || null,
      colorName: product.ColorName || null,
      size: product.Size || null,
      isActive: (() => {
        const val =
          product.IsActive !== undefined ? product.IsActive : product.isActive;
        if (Buffer.isBuffer(val)) return val[0] === 1;
        return (
          val === 1 || val === true || val === "1" || val === "Active"
        );
      })(),
      createdAt: product.CreatedDate || product.createdAt,
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
    if (apiData.materialRate !== undefined)
      internal.MaterialRate = apiData.materialRate;
    if (apiData.cuItemCode) internal.cu_item_code = apiData.cuItemCode;
    if (apiData.materialDescription)
      internal.MaterialDescription = apiData.materialDescription;
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
      variationId: row.PkProductColorId || row.id,
      productId: row.FkProductId || row.productId,
      colorId: row.FkLuColorId || row.colorId,
      colorName: row.ColorName || row.colorName || null,
      materialRate: row.MaterialRate || row.materialRate,
      size: row.Size || row.size,
      isActive: (() => {
        const val = row.IsActive !== undefined ? row.IsActive : row.isActive;
        if (Buffer.isBuffer(val)) return val[0] === 1;
        return val === 1 || val === true;
      })(),
      createdAt: row.CreatedDate || row.createdAt,
    };
  }

  /**
   * Translates color matrix API payload to DB-native PascalCase.
   * @param {object} apiData - { fkLuColorId, materialRate, size }.
   * @returns {object} DB-friendly object.
   */
  _mapMatrixToInternal(apiData) {
    const internal = {};
    if (apiData.fkLuColorId !== undefined)
      internal.FkLuColorId = apiData.fkLuColorId;
    if (apiData.materialRate !== undefined)
      internal.MaterialRate = apiData.materialRate;
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
      categoryId: cat.PkProductCategoryId || cat.id,
      categoryName: cat.CategoryName || cat.categoryName,
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
      unitId: unit.PkUnitId || unit.id,
      unitTitle: unit.UnitTitle || unit.unitTitle,
      unitCode: unit.UnitCode || unit.unitCode,
    };
  }

  /**
   * Translates a raw lu_color_code DB record to API-friendly camelCase.
   * @param {object} color - Raw color record.
   * @returns {object} API object { id, colorName, colorCode }.
   */
  _mapColorToApi(color) {
    if (!color) return null;
    return {
      colorId: color.PkLuColorId || color.id,
      colorName: color.ColorName || color.colorName,
      colorCode: color.ColorCode || color.colorCode || null,
    };
  }

  // --------------------------------------------------------------------------
  // 2. RETRIEVAL METHODS
  // --------------------------------------------------------------------------

  /**
   * Retrieves all products with optional filters.
   */
  async getProducts(filters = {}) {
    const result = await productRepository.findAll(filters);
    return {
      data: result.data.map((p) => this._mapToApi(p)),
      total: result.total,
    };
  }

  /**
   * Retrieves a specific product by ID.
   */
  async getProductById(id) {
    const product = await productRepository.findById(id);
    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }
    const mapped = this._mapToApi(product);
    mapped.variations = (product.variations || []).map((v) =>
      this._mapMatrixToApi(v),
    );
    return mapped;
  }

  /**
   * Fetches search-friendly dropdown items.
   */
  async getProductDropdown(search = "") {
    const items = await productRepository.getDropdown(search);
    return items.map((item) => {
      const labelParts = [item.MaterialName];
      if (item.ColorName || item.Size) {
        const specs = [item.ColorName, item.Size].filter(Boolean).join(" / ");
        labelParts.push(`— ${specs}`);
      }
      if (item.CategoryName) {
        labelParts.push(`(${item.CategoryName})`);
      }
      if (item.cu_item_code) {
        labelParts.push(`[${item.cu_item_code}]`);
      }

      return {
        value: {
          productId: item.PkProductId,
          variationId: item.PkProductColorId || null,
          materialRate: item.MaterialRate,
        },
        label: labelParts.join(" "),
      };
    });
  }

  /**
   * Retrieves all product categories mapped to camelCase.
   * @returns {Promise<Array>} List of { id, categoryName } objects.
   */
  async getCategories() {
    const raw = await productRepository.getCategories();
    return raw.map((c) => this._mapCategoryToApi(c));
  }

  /**
   * Retrieves all product units mapped to camelCase.
   * @returns {Promise<Array>} List of { id, unitTitle, unitCode } objects.
   */
  async getUnits() {
    const raw = await productRepository.getUnits();
    return raw.map((u) => this._mapUnitToApi(u));
  }

  /**
   * Retrieves all active colors mapped to camelCase.
   * @returns {Promise<Array>} List of { id, colorName, colorCode } objects.
   */
  async getColors() {
    const raw = await productRepository.getColors();
    return raw.map((c) => this._mapColorToApi(c));
  }

  /**
   * Creates a new product category.
   * @param {string} categoryName - Name of the category.
   * @param {number} adminId - User ID of creator.
   * @returns {Promise<object>} API-friendly category object.
   */
  async createCategory(categoryName, adminId) {
    const result = await productRepository.createCategory(
      categoryName,
      adminId,
    );
    if (!result) {
      // Re-fetch by name as fallback (SP may not return the inserted row)
      const all = await productRepository.getCategories();
      const created = all.find(
        (c) =>
          (c.CategoryName || "").toLowerCase() === categoryName.toLowerCase(),
      );
      return this._mapCategoryToApi(created);
    }
    return this._mapCategoryToApi(result);
  }

  /**
   * Creates a new color lookup entry.
   * @param {string} colorName - Display name of the color.
   * @param {string} colorCode - Short code (e.g., 'RED').
   * @param {number} adminId - User ID of creator.
   * @returns {Promise<object>} API-friendly color object.
   */
  async createColor(colorName, colorCode, adminId) {
    const result = await productRepository.createColor(
      colorName,
      colorCode,
      adminId,
    );
    if (!result) {
      // Re-fetch by name as fallback (SP may not return the inserted row)
      const all = await productRepository.getColors();
      const created = all.find(
        (c) => (c.ColorName || "").toLowerCase() === colorName.toLowerCase(),
      );
      return this._mapColorToApi(created);
    }
    return this._mapColorToApi(result);
  }

  /**
   * Creates a new unit lookup entry.
   * @param {string} unitTitle - Display name (e.g., 'Kilogram').
   * @param {string} unitCode - Short code (e.g., 'KG').
   * @returns {Promise<object>} API-friendly unit object.
   */
  async createUnit(unitTitle, unitCode) {
    const result = await productRepository.createUnit(unitTitle, unitCode);
    if (!result) {
      // Re-fetch by code as fallback (SP may not return the inserted row)
      const all = await productRepository.getUnits();
      const created = all.find(
        (u) => (u.UnitCode || "").toLowerCase() === unitCode.toLowerCase(),
      );
      return this._mapUnitToApi(created);
    }
    return this._mapUnitToApi(result);
  }

  // --------------------------------------------------------------------------
  // 3. MUTATION METHODS
  // --------------------------------------------------------------------------

  /**
   * Creates a new product with uniqueness validation and optional inline variations.
   * @param {object} productData - API payload { materialName, categoryId, unitId, materialRate?, variations?[] }.
   * @param {number} adminId - User ID of creator.
   * @returns {Promise<object>} API-friendly product with variations.
   */
  async createProduct(productData, adminId) {
    const internalData = this._mapToInternal(productData);

    // Auto-generate MaterialCode / cu_item_code
    if (!internalData.cu_item_code) {
      const nextCode = await productRepository.getNextItemCode();
      internalData.cu_item_code = nextCode.padStart(4, "0");
      internalData.MaterialCode = internalData.cu_item_code;
    } else {
      internalData.MaterialCode = internalData.cu_item_code;
    }

    // Business Rule: Prevent duplicate products in the same category/unit
    const duplicateCount = await productRepository.checkDuplicate(
      0,
      internalData.FkProductCategoryId,
      internalData.FkUnitId,
      internalData.MaterialName,
    );

    if (duplicateCount > 0) {
      const error = new Error(
        "A product with this name already exists in the selected category/unit.",
      );
      error.statusCode = 409;
      throw error;
    }

    let newProduct = await productRepository.create(internalData, adminId);

    // Re-fetch fallback if SP returned null or incomplete data
    const insertedId =
      newProduct?.InsertedId || newProduct?.PkProductId || newProduct?.id;
    if (insertedId) {
      newProduct = (await productRepository.findById(insertedId)) || newProduct;
    } else if (!newProduct || (!newProduct.PkProductId && !newProduct.id)) {
      const searchRes = await productRepository.findAll({});
      newProduct =
        searchRes.data.find(
          (p) => p.cu_item_code === internalData.cu_item_code,
        ) || newProduct;
    }

    const productId = newProduct?.PkProductId || newProduct?.id;
    if (!productId) {
      throw new Error("Product was created but its ID could not be resolved.");
    }

    // Process inline variations if provided
    const variations = await this._processCreateVariations(
      productData.variations || [],
      productId,
      adminId,
    );

    const mapped = this._mapToApi(newProduct);
    mapped.variations = variations;
    return mapped;
  }

  /**
   * Updates product details with uniqueness validation and optional variation diff.
   * Merges partial updates with existing DB record to prevent undefined SP params.
   * @param {number|string} id - PkProductId.
   * @param {object} updates - API payload (all fields optional).
   * @param {number} adminId - User ID.
   * @returns {Promise<object>} API-friendly product with variations.
   */
  async updateProduct(id, updates, adminId) {
    const existing = await this.getProductById(id);
    const internalUpdates = this._mapToInternal(updates);

    // Merge partial updates with existing record to prevent undefined SP params
    const merged = {
      MaterialName: internalUpdates.MaterialName ?? existing.materialName,
      MaterialRate: internalUpdates.MaterialRate ?? existing.materialRate,
      FkProductCategoryId:
        internalUpdates.FkProductCategoryId ?? existing.categoryId,
      FkUnitId: internalUpdates.FkUnitId ?? existing.unitId,
      MaterialCode: internalUpdates.MaterialCode ?? existing.cuItemCode,
      cu_item_code: internalUpdates.cu_item_code ?? existing.cuItemCode,
      MaterialDescription:
        internalUpdates.MaterialDescription ?? existing.materialDescription,
    };

    // Business Rule: Check for name collision upon update
    const duplicateCount = await productRepository.checkDuplicate(
      id,
      merged.FkProductCategoryId,
      merged.FkUnitId,
      merged.MaterialName,
    );
    if (duplicateCount > 0) {
      const error = new Error(
        "Another product already uses this name in the selected category/unit.",
      );
      error.statusCode = 409;
      throw error;
    }

    let updatedProduct = await productRepository.update(id, merged, adminId);

    // Re-fetch fallback
    if (
      !updatedProduct ||
      (!updatedProduct.PkProductId && !updatedProduct.id)
    ) {
      updatedProduct = (await productRepository.findById(id)) || updatedProduct;
    }

    // Process inline variation diff if provided
    if (Array.isArray(updates.variations)) {
      await this._processUpdateVariations(updates.variations, id, adminId);
    }

    // Re-fetch full product with variations for response
    const full = await this.getProductById(id);
    return full;
  }

  /**
   * Processes inline variations for product creation (all inserts).
   * @param {Array} variations - Array of { colorId, size, materialRate }.
   * @param {number} productId - Newly created product PK.
   * @param {number} adminId - User ID.
   * @returns {Promise<Array>} API-friendly variation records.
   */
  async _processCreateVariations(variations, productId, adminId) {
    // Create all variations first
    for (const v of variations) {
      const internalData = {
        FkLuColorId: v.colorId,
        MaterialRate: v.materialRate,
        Size: v.size,
      };
      await productRepository.setColorMatrix(
        0,
        productId,
        internalData,
        adminId,
        1,
      );
    }

    // Re-fetch all variations for this product to get complete data
    const savedVariations = await productRepository.getColorMatrix(productId);
    return savedVariations.map((v) => this._mapMatrixToApi(v));
  }

  /**
   * Processes inline variation diff for product updates.
   * Diff strategy:
   *   - matrixId present + isActive:false → soft-delete
   *   - matrixId present → update existing
   *   - matrixId absent/0 → insert new
   * @param {Array} variations - Array of variation diff items.
   * @param {number} productId - Product PK.
   * @param {number} adminId - User ID.
   */
  async _processUpdateVariations(variations, productId, adminId) {
    for (const v of variations) {
      const matrixId = v.matrixId || 0;
      const isActive = v.isActive === false ? 0 : 1;

      if (matrixId > 0 && isActive === 0) {
        // Soft-delete: fetch existing to fill required SP params
        const existingVariations =
          await productRepository.getColorMatrix(productId);
        const existing = existingVariations.find(
          (row) => row.PkProductColorId === matrixId,
        );
        if (existing) {
          await productRepository.setColorMatrix(
            matrixId,
            productId,
            {
              FkLuColorId: existing.FkLuColorId,
              MaterialRate: existing.MaterialRate,
              Size: existing.Size,
            },
            adminId,
            0,
          );
        }
      } else {
        // Insert or update
        const internalData = {
          FkLuColorId: v.colorId,
          MaterialRate: v.materialRate,
          Size: v.size,
        };
        await productRepository.setColorMatrix(
          matrixId,
          productId,
          internalData,
          adminId,
          isActive,
        );
      }
    }
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
      matrixId,
      productId,
      internalData,
      adminId,
    );
    return this._mapMatrixToApi(result);
  }

  /**
   * Soft-deletes a product.
   */
  async deleteProduct(id, adminId) {
    const success = await productRepository.delete(id, adminId);
    if (!success) {
      const error = new Error("Product not found or deletion failed.");
      error.statusCode = 404;
      throw error;
    }
    return true;
  }
}

export default new ProductService();
