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
      // variationId is included so the list view exposes the specific variation PK
      // alongside productId, enabling the frontend to target updates precisely.
      variationId: product.PkProductColorId || product.variationId || null,
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
      variationIsActive: product.VariationIsActive !== undefined
        ? (product.VariationIsActive == 1 || product.VariationIsActive === true)
        : null,
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
    if (apiData.colorId !== undefined)
      internal.FkLuColorId = apiData.colorId;
    else if (apiData.fkLuColorId !== undefined)
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
  async getProductById(id, options = {}) {
    const product = await productRepository.findById(id, options);
    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    // variationId, colorName, and size are color-matrix fields that do not exist
    // on product_master — strip them from the parent object so only the
    // variations array carries per-variation data.
    const { variationId: _vid, colorName: _cn, size: _sz, ...productFields } =
      this._mapToApi(product);

    productFields.variations = (product.variations || []).map((v) =>
      this._mapMatrixToApi(v),
    );
    return productFields;
  }

  /**
   * Returns deduplicated product name suggestions for the typeahead UI.
   * @param {string} q - Partial name query (min 1 char recommended).
   * @returns {Promise<Array<{productId: number, materialName: string}>>}
   */
  async searchProductsByName(q = "") {
    return productRepository.searchByName(q.trim());
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

    // Default unitId to 1 (Pieces) if not provided
    internalData.FkUnitId = internalData.FkUnitId || 1;

    const variations = productData.variations || [];

    // Check for existing product with same name + category
    const duplicateCount = await productRepository.checkDuplicate(
      0,
      internalData.FkProductCategoryId,
      internalData.FkUnitId,
      internalData.MaterialName,
    );

    let productId;
    let productRow;

    if (duplicateCount > 0) {
      // Auto-link: find existing product and add variations to it
      const existing = await productRepository.findByNameAndCategory(
        internalData.MaterialName,
        internalData.FkProductCategoryId,
      );
      if (!existing) {
        const error = new Error(
          "Duplicate detected but existing product could not be resolved.",
        );
        error.statusCode = 500;
        throw error;
      }
      productId = existing.PkProductId;
      productRow = existing;
    } else {
      // New product: set MaterialRate from first variation, or 0
      internalData.MaterialRate =
        variations.length > 0
          ? variations[0].materialRate
          : (internalData.MaterialRate ?? 0);

      let newProduct = await productRepository.create(internalData, adminId);

      const insertedId =
        newProduct?.InsertedId || newProduct?.PkProductId || newProduct?.id;
      if (insertedId) {
        newProduct = (await productRepository.findById(insertedId)) || newProduct;
      }

      productId = newProduct?.PkProductId || newProduct?.id;
      if (!productId) {
        throw new Error("Product was created but its ID could not be resolved.");
      }
      productRow = newProduct;
    }

    const createdVariations = await this._processCreateVariations(
      variations,
      productId,
      adminId,
    );

    const mapped = this._mapToApi(productRow);
    mapped.variations = createdVariations;
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
    const existingRaw = await productRepository.findById(id, { includeDeleted: true });
    if (!existingRaw) {
      const err = new Error("Product not found.");
      err.statusCode = 404;
      throw err;
    }
    const _isActive = (val) => {
      if (Buffer.isBuffer(val)) return val[0] === 1;
      return val === 1 || val === true || val === "1" || val === "Active";
    };
    if (!_isActive(existingRaw.IsActive)) {
      const err = new Error("Product is inactive. Reactivate it before making changes.");
      err.statusCode = 409;
      throw err;
    }
    const existing = this._mapToApi(existingRaw);

    // Track whether the caller sent a flat variation update (single field shorthand)
    // vs an explicit batch. This determines the shape of the response.
    let isFlatUpdate = false;

    // Convert flat variation identifiers (variationId or colorId+size) to variations array
    if (
      (updates.variationId || (updates.colorId && updates.size)) &&
      !Array.isArray(updates.variations)
    ) {
      isFlatUpdate = true; // caller used the flat shorthand — return a single object

      const existingVariations = await productRepository.getColorMatrix(id, { includeDeleted: true });
      let match;

      if (updates.variationId) {
        match = existingVariations.find(
          (e) => String(e.PkProductColorId) === String(updates.variationId),
        );
      } else {
        match = existingVariations.find(
          (e) =>
            String(e.FkLuColorId) === String(updates.colorId) &&
            e.Size === updates.size,
        );
      }

      if (!match) {
        const identifier = updates.variationId
          ? `variationId=${updates.variationId}`
          : `colorId=${updates.colorId}, size=${updates.size}`;
        const error = new Error(
          `No variation found for ${identifier}. Use POST /products/${id}/variations to add new variations.`,
        );
        error.statusCode = 404;
        throw error;
      }

      updates = {
        ...updates,
        variations: [
          {
            variationId: match.PkProductColorId,
            colorId: updates.colorId ?? match.FkLuColorId,
            size: updates.size ?? match.Size,
            materialRate: updates.materialRate ?? match.MaterialRate,
          },
        ],
      };
    }

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

    // -------------------------------------------------------------------------
    // Scope the response to only what was changed rather than the entire product.
    // NOTE: We use getColorMatrix directly (prc_product_color_matrix_get) because
    // getProductById relies on prc_product_master_search which does NOT join
    // variation columns — so full.variations would always come back empty.
    // -------------------------------------------------------------------------
    if (Array.isArray(updates.variations) && updates.variations.length > 0) {
      // Build a Set of the variation IDs that were part of this update
      const updatedVariationIds = new Set(
        updates.variations
          .filter((v) => v.variationId)
          .map((v) => String(v.variationId)),
      );

      // Fetch fresh variations directly from the color matrix SP
      const allVariations = await productRepository.getColorMatrix(id);
      const mappedVariations = allVariations.map((v) =>
        this._mapMatrixToApi(v),
      );

      // Filter to only those that were mutated in this request
      const updatedVariations = mappedVariations.filter((v) => {
        // Match by variationId when present
        if (updatedVariationIds.size > 0 && v.variationId) {
          return updatedVariationIds.has(String(v.variationId));
        }
        // Fallback: match by colorId + size for new insert operations
        return updates.variations.some(
          (u) =>
            String(u.colorId) === String(v.colorId) && u.size === v.size,
        );
      });

      if (isFlatUpdate) {
        // Flat update — caller expects a single variation object, not an array
        return updatedVariations[0] ?? mappedVariations[0];
      }
      // Batch update — return the array of matched variations only
      return updatedVariations;
    }

    // Only product-level fields were changed (no variation updates).
    // Return the product without the variations array to keep the response lean.
    const full = await this.getProductById(id);
    const { variations: _omitted, ...productFields } = full;
    return productFields;
  }

  /**
   * Processes inline variations for product creation (all inserts).
   * @param {Array} variations - Array of { colorId, size, materialRate }.
   * @param {number} productId - Newly created product PK.
   * @param {number} adminId - User ID.
   * @returns {Promise<Array>} API-friendly variation records.
   */
  async _processCreateVariations(variations, productId, adminId) {
    if (variations.length === 0) return [];

    // Fetch existing variations to guard against duplicates (no SP available yet)
    const existing = await productRepository.getColorMatrix(productId);

    for (const v of variations) {
      const isDuplicate = existing.some(
        (e) =>
          String(e.FkLuColorId) === String(v.colorId) &&
          e.Size === v.size &&
          parseFloat(e.MaterialRate) === parseFloat(v.materialRate),
      );

      if (isDuplicate) {
        const error = new Error(
          `Variation already exists: colorId=${v.colorId}, size=${v.size}, rate=${v.materialRate}.`,
        );
        error.statusCode = 409;
        throw error;
      }

      await productRepository.setColorMatrix(
        0,
        productId,
        { FkLuColorId: v.colorId, MaterialRate: v.materialRate, Size: v.size },
        adminId,
        1,
      );
    }

    const saved = await productRepository.getColorMatrix(productId);
    return saved.map((v) => this._mapMatrixToApi(v));
  }

  /**
   * Processes inline variation diff for product updates.
   * Diff strategy:
   *   - variationId present + isActive:false → soft-delete
   *   - variationId present → update existing
   *   - variationId absent/0 → insert new
   * @param {Array} variations - Array of variation diff items.
   * @param {number} productId - Product PK.
   * @param {number} adminId - User ID.
   */
  async _processUpdateVariations(variations, productId, adminId) {
    // Optimization: Fetch once if we have existing variations to update
    const hasUpdates = variations.some((v) => v.variationId > 0);
    const existingVariations = hasUpdates
      ? await productRepository.getColorMatrix(productId, { includeDeleted: true })
      : [];

    for (const v of variations) {
      const variationId = v.variationId || 0;
      const isActive = v.isActive === false ? 0 : 1;

      if (variationId > 0) {
        // UPDATE or DELETE path: ensure we have existing data to fill blanks
        const existing = existingVariations.find(
          (row) => row.PkProductColorId === variationId,
        );

        if (existing) {
          const internalData = {
            FkLuColorId: v.colorId ?? existing.FkLuColorId,
            MaterialRate: v.materialRate ?? existing.MaterialRate,
            Size: v.size ?? existing.Size,
          };
          await productRepository.setColorMatrix(
            variationId,
            productId,
            internalData,
            adminId,
            isActive,
          );
        }
      } else {
        // INSERT path (variationId is 0 or absent)
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
    }
  }

  /**
   * Adds or updates a color/size matrix entry for a product.
   * @param {number} productId - Product PK.
   * @param {object} matrixData - { fkLuColorId, materialRate, size, variationId? }.
   * @param {number} adminId - User ID.
   * @returns {Promise<object>} API-friendly matrix record.
   */
  async addOrUpdateColorMatrix(productId, matrixData, adminId) {
    // Verify the product exists first
    await this.getProductById(productId);

    const internalData = this._mapMatrixToInternal(matrixData);
    const variationId = matrixData.variationId || 0;
    const isActive = matrixData.isActive !== undefined ? (matrixData.isActive ? 1 : 0) : 1;
    const result = await productRepository.setColorMatrix(
      variationId,
      productId,
      internalData,
      adminId,
      isActive,
    );
    return this._mapMatrixToApi(result);
  }

  /**
   * Updates product active status (soft delete/reactivate).
   * @param {number|string} id - PkProductId.
   * @param {boolean} isActive - Desired active state.
   * @param {number} adminId - User ID.
   * @returns {Promise<boolean>} True on success.
   */
  async updateProductStatus(id, isActive, adminId) {
    const success = await productRepository.updateStatus(id, isActive, adminId);
    if (!success) {
      const error = new Error("Product not found or update failed.");
      error.statusCode = 404;
      throw error;
    }
    return true;
  }
}

export default new ProductService();
