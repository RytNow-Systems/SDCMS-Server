// ============================================================================
// File: src/modules/product/product.repository.js
// Description: Data access layer for Products Master.
//
// Stored Procedures (api_procedure_spec_v2.1.md):
//   - prc_product_master_search: Retrieval & ID lookup
//   - prc_product_master_set: Insert (ID=0), Update (ID>0), Delete (IsActive=0)
//   - prc_check_duplicate_product_master: Uniqueness validation
//   - prc_product_color_matrix_get: Color/size matrix retrieval
//   - prc_product_color_matrix_set: Color/size matrix upsert
//   - prc_product_category_get: Category lookup (pAction=0: all active)
//   - prc_product_category_set: Category upsert (ID=0: insert, ID>0: update)
//   - prc_lu_unit_get: Unit lookup (pAction=0: all active)
//   - prc_lu_unit_set: Unit upsert (ID=0: insert, ID>0: update)
//   - prc_lu_color_code_get: Color lookup (pAction=0: all active)
//   - prc_lu_color_code_set: Color upsert (ID=0: insert, ID>0: update)
// ============================================================================

import db from "../../infrastructure/database/db.js";

// ============================================================================
// MOCK DATA STORE (For USE_MOCK_DB=true)
// ============================================================================
let seedCategories = [
  { PkProductCategoryId: 1, CategoryName: "Textiles", IsActive: true },
  { PkProductCategoryId: 2, CategoryName: "Accessories", IsActive: true },
];

let seedUnits = [
  { PkUnitId: 1, UnitTitle: "Kilogram", UnitCode: "KG", IsActive: 1 },
  { PkUnitId: 2, UnitTitle: "Pieces", UnitCode: "PCS", IsActive: 1 },
  { PkUnitId: 3, UnitTitle: "Litre", UnitCode: "LTR", IsActive: 1 },
];

let seedColors = [
  { PkLuColorId: 1, ColorName: "Red", ColorCode: "RED", IsActive: 1 },
  { PkLuColorId: 2, ColorName: "Blue", ColorCode: "BLU", IsActive: 1 },
  { PkLuColorId: 3, ColorName: "Green", ColorCode: "GRN", IsActive: 1 },
];

let seedColorMatrix = [
  {
    PkProductColorId: 1,
    FkProductId: 1,
    FkLuColorId: 1,
    ColorName: "Red",
    MaterialRate: 550.0,
    Size: "M",
    IsActive: 1,
    CreatedDate: new Date().toISOString(),
  },
  {
    PkProductColorId: 2,
    FkProductId: 1,
    FkLuColorId: 2,
    ColorName: "Blue",
    MaterialRate: 520.0,
    Size: "L",
    IsActive: 1,
    CreatedDate: new Date().toISOString(),
  },
];

let seedProducts = [
  {
    PkProductId: 1,
    MaterialName: "Cotton Fiber",
    MaterialRate: 500.5,
    cu_item_code: "CF-001",
    FkProductCategoryId: 1,
    FkUnitId: 1,
    IsActive: true,
    CreatedDate: new Date().toISOString(),
  },
  {
    PkProductId: 2,
    MaterialName: "Polyester Yarn",
    MaterialRate: 300.0,
    cu_item_code: "PY-002",
    FkProductCategoryId: 1,
    FkUnitId: 1,
    IsActive: true,
    CreatedDate: new Date().toISOString(),
  },
  {
    PkProductId: 3,
    MaterialName: "Silk Thread",
    MaterialRate: 1500.0,
    cu_item_code: "ST-003",
    FkProductCategoryId: 1,
    FkUnitId: 1,
    IsActive: true,
    CreatedDate: new Date().toISOString(),
  },
];

class ProductRepository {
  // --------------------------------------------------------------------------
  // 1. VALIDATION PROCEDURES
  // --------------------------------------------------------------------------

  /**
   * Checks if a product with the same name exists in a specific category/unit.
   * @param {number} id - PkProductId (0 for new records).
   * @param {number} categoryId - FkProductCategoryId.
   * @param {number} unitId - FkUnitId.
   * @param {string} name - MaterialName.
   * @returns {Promise<number>} Number of duplicates found.
   */
  async checkDuplicate(id, categoryId, unitId, name) {
    // --- LIVE DB EXECUTION ---
    if (process.env.USE_MOCK_DB !== "true") {
      const [rows] = await db.execute(
        "CALL prc_check_duplicate_product_master(?, ?, ?, ?)",
        [id || 0, categoryId || 0, unitId || 0, name],
      );
      return rows[0]?.[0]?.duplicate_count || 0;
    }

    // --- MOCK IN-MEMORY LOGIC ---
    const isDuplicate = seedProducts.some(
      (p) =>
        p.MaterialName.toLowerCase() === name.toLowerCase() &&
        p.PkProductId !== id &&
        p.IsActive,
    );
    return isDuplicate ? 1 : 0;
  }

  // --------------------------------------------------------------------------
  // 2. LOOKUP PROCEDURES (Categories, Units & Colors)
  // --------------------------------------------------------------------------

  /**
   * Fetches all active product categories.
   * CALL prc_product_category_get(pAction=0)
   * @returns {Promise<Array>} List of category records.
   */
  async getCategories() {
    if (process.env.USE_MOCK_DB !== "true") {
      const [rows] = await db.execute(
        "CALL prc_product_category_get(?, ?)",
        [0, 0],
      );
      return rows[0] || [];
    }
    return seedCategories.filter((c) => c.IsActive);
  }

  /**
   * Fetches a single category by its name (case-insensitive).
   * CALL prc_product_category_get(pAction=0) — filtered in JS.
   * @param {string} name - CategoryName to search.
   * @returns {Promise<object|null>} Matching category or null.
   */
  async getCategoryByName(name) {
    const categories = await this.getCategories();
    const lower = name.toLowerCase();
    return (
      categories.find((c) => (c.CategoryName || "").toLowerCase() === lower) ||
      null
    );
  }

  /**
   * Fetches all active units.
   * CALL prc_lu_unit_get(pAction=0)
   * @returns {Promise<Array>} List of unit records.
   */
  async getUnits() {
    if (process.env.USE_MOCK_DB !== "true") {
      const [rows] = await db.execute("CALL prc_lu_unit_get(?)", [0]);
      return rows[0] || [];
    }
    return seedUnits.filter((u) => u.IsActive);
  }

  /**
   * Fetches a single unit by its code (case-insensitive).
   * CALL prc_lu_unit_get(pAction=0) — filtered in JS.
   * @param {string} code - UnitCode to search (e.g., 'PCS', 'KG').
   * @returns {Promise<object|null>} Matching unit or null.
   */
  async getUnitByCode(code) {
    const units = await this.getUnits();
    const lower = code.toLowerCase();
    return (
      units.find((u) => (u.UnitCode || "").toLowerCase() === lower) || null
    );
  }

  /**
   * Fetches all active colors.
   * CALL prc_lu_color_code_get(pAction=0)
   * @returns {Promise<Array>} List of color records.
   */
  async getColors() {
    if (process.env.USE_MOCK_DB !== "true") {
      const [rows] = await db.execute(
        "CALL prc_lu_color_code_get(?, ?)",
        [0, 0],
      );
      return rows[0] || [];
    }
    return seedColors.filter((c) => c.IsActive);
  }

  /**
   * Creates a new product category.
   * CALL prc_product_category_set(0, pCategoryName, pIsActive)
   * @param {string} categoryName - Name of the category.
   * @param {number} adminId - User ID of creator.
   * @returns {Promise<object|null>} Created category or null.
   */
  async createCategory(categoryName, adminId) {
    if (process.env.USE_MOCK_DB !== "true") {
      const [rows] = await db.execute(
        "CALL prc_product_category_set(?, ?, ?, ?)",
        [0, categoryName, adminId, 1],
      );
      return rows[0]?.[0] || null;
    }
    const newCat = {
      PkProductCategoryId: seedCategories.length + 1,
      CategoryName: categoryName,
      IsActive: true,
    };
    seedCategories.push(newCat);
    return newCat;
  }

  /**
   * Creates a new color lookup entry.
   * CALL prc_lu_color_code_set(0, pColorName, pColorCode, pCreatedBy, pIsActive)
   * @param {string} colorName - Display name of the color.
   * @param {string} colorCode - Short code (e.g., 'RED').
   * @param {number} adminId - User ID of creator.
   * @returns {Promise<object|null>} Created color or null.
   */
  async createColor(colorName, colorCode, adminId) {
    if (process.env.USE_MOCK_DB !== "true") {
      const [rows] = await db.execute(
        "CALL prc_lu_color_code_set(?, ?, ?, ?, ?)",
        [0, colorName, colorCode || "", adminId, 1],
      );
      return rows[0]?.[0] || null;
    }
    const newColor = {
      PkLuColorId: seedColors.length + 1,
      ColorName: colorName,
      ColorCode: colorCode || "",
      IsActive: 1,
    };
    seedColors.push(newColor);
    return newColor;
  }

  /**
   * Creates a new unit lookup entry.
   * CALL prc_lu_unit_set(0, pUnitTitle, pUnitCode, pIsActive)
   * @param {string} unitTitle - Display name (e.g., 'Kilogram').
   * @param {string} unitCode - Short code (e.g., 'KG').
   * @returns {Promise<object|null>} Created unit or null.
   */
  async createUnit(unitTitle, unitCode) {
    if (process.env.USE_MOCK_DB !== "true") {
      const [rows] = await db.execute("CALL prc_lu_unit_set(?, ?, ?, ?)", [
        0,
        unitTitle,
        unitCode,
        1,
      ]);
      return rows[0]?.[0] || null;
    }
    const newUnit = {
      PkUnitId: seedUnits.length + 1,
      UnitTitle: unitTitle,
      UnitCode: unitCode,
      IsActive: 1,
    };
    seedUnits.push(newUnit);
    return newUnit;
  }

  /**
   * Determines the next sequential cu_item_code / MaterialCode.
   * Queries MAX(cu_item_code) from product_master and increments.
   * CALL prc_product_master_search(0, 0, 0) — reads all products to find max code.
   * @returns {Promise<string>} Next available code (e.g., '1002').
   */
  async getNextItemCode() {
    if (process.env.USE_MOCK_DB !== "true") {
      const [rows] = await db.execute(
        "CALL prc_product_master_search(?, ?, ?)",
        [0, 0, 0],
      );
      const products = rows[0] || [];
      const maxCode = products.reduce((max, p) => {
        const num = parseInt(p.cu_item_code, 10);
        return !isNaN(num) && num > max ? num : max;
      }, 1000);
      return String(maxCode + 1);
    }

    const maxCode = seedProducts.reduce((max, p) => {
      const num = parseInt(p.cu_item_code, 10);
      return !isNaN(num) && num > max ? num : max;
    }, 1000);
    return String(maxCode + 1);
  }

  // --------------------------------------------------------------------------
  // 3. RETRIEVAL PROCEDURES
  // --------------------------------------------------------------------------

  /**
   * Fetches the product catalog with optional category/unit filters.
   * @param {number} categoryId - Filter by Category PK.
   * @param {number} unitId - Filter by Unit PK.
   * @returns {Promise<Array>} List of product records.
   */
  /**
   * Retrieves all products with their color/size variations and applies pagination.
   * @param {Object} filters - Filter and pagination parameters
   * @param {number} [filters.categoryId=0] - Category ID to filter by (0 for all)
   * @param {number} [filters.unitId=0] - Unit ID to filter by (0 for all)
   * @param {number} [filters.page=1] - Page number for pagination
   * @param {number} [filters.limit=20] - Number of items per page
   * @returns {Promise<{data: Array, total: number}>} Paginated product list with color/size matrix
   */
  async findAll(filters = {}) {
    const { categoryId = 0, unitId = 0, page = 1, limit = 20, includeInactive = false } = filters;

    let products = [];
    let matrices = [];

    // Step 1: Fetch all products based on filters
    if (process.env.USE_MOCK_DB !== "true") {
      const [pRows] = await db.execute(
        "CALL prc_product_master_search(?, ?, ?)",
        [0, categoryId, unitId],
      );
      const _isActiveRow = (val) => {
        if (Buffer.isBuffer(val)) return val[0] === 1;
        return val === 1 || val === true || val === "1" || val === "Active";
      };
      products = (pRows[0] || []).filter((p) => _isActiveRow(p.IsActive));
      matrices = await this.getAllColorMatrix({ includeDeleted: includeInactive });
    } else {
      // Apply filters in mock mode
      products = seedProducts
        .filter(
          (p) =>
            p.IsActive &&
            (!categoryId || p.FkProductCategoryId === categoryId) &&
            (!unitId || p.FkUnitId === unitId),
        )
        .map((p) => {
          const cat = seedCategories.find(
            (c) => c.PkProductCategoryId === p.FkProductCategoryId,
          );
          const unit = seedUnits.find((u) => u.PkUnitId === p.FkUnitId);
          return {
            ...p,
            CategoryName: cat?.CategoryName || "N/A",
            UnitTitle: unit?.UnitTitle || "N/A",
          };
        });
      matrices = includeInactive ? seedColorMatrix : seedColorMatrix.filter((m) => m.IsActive);
    }

    // Step 2: Build flat list with color/size matrix (same logic as getDropdown)
    let fullResults = [];
    for (const p of products) {
      const pVariations = matrices.filter(
        (m) => String(m.FkProductId) === String(p.PkProductId),
      );

      if (pVariations.length > 0) {
        // Product has variations - create one entry per variation
        for (const v of pVariations) {
          fullResults.push({
            PkProductId: p.PkProductId,
            PkProductColorId: v.PkProductColorId,
            MaterialName: p.MaterialName,
            ColorName: v.ColorName || null,
            Size: v.Size || null,
            MaterialRate: v.MaterialRate || p.MaterialRate,
            cu_item_code: p.cu_item_code,
            CategoryName: p.CategoryName || null,
            UnitTitle: p.UnitTitle || null,
            FkProductCategoryId: p.FkProductCategoryId,
            FkUnitId: p.FkUnitId,
            IsActive: p.IsActive,
            VariationIsActive: v.IsActive,
            CreatedDate: p.CreatedDate,
          });
        }
      } else {
        // Product without variations - create single entry with null color/size
        fullResults.push({
          PkProductId: p.PkProductId,
          PkProductColorId: null,
          MaterialName: p.MaterialName,
          ColorName: null,
          Size: null,
          MaterialRate: p.MaterialRate,
          cu_item_code: p.cu_item_code,
          CategoryName: p.CategoryName || null,
          UnitTitle: p.UnitTitle || null,
          FkProductCategoryId: p.FkProductCategoryId,
          FkUnitId: p.FkUnitId,
          IsActive: p.IsActive,
          CreatedDate: p.CreatedDate,
        });
      }
    }

    // Step 3: Apply pagination (using the same pattern as order.repository.js _paginateData)
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 20;
    const paginatedResults = fullResults.slice(
      (pageNum - 1) * limitNum,
      pageNum * limitNum,
    );

    // Step 4: Return paginated result with total count
    return {
      data: paginatedResults,
      total: fullResults.length,
    };
  }

  /**
   * Fetches a single product by its primary key, enriched with color matrix variations.
   * @param {number|string} id - PkProductId.
   * @returns {Promise<object|null>} Product record (with variations) or null.
   */
  async findById(id, options = {}) {
    if (process.env.USE_MOCK_DB !== "true") {
      const [rows] = await db.execute(
        "CALL prc_product_master_search(?, ?, ?)",
        [id, 0, 0],
      );
      const product = rows[0]?.[0] || null;
      if (product) {
        if (!options.includeDeleted && !product.IsActive) return null;
        product.variations = await this.getColorMatrix(id, options);
      }
      return product;
    }

    const product = seedProducts.find((p) => p.PkProductId.toString() === id.toString());
    if (product) {
      if (!options.includeDeleted && !product.IsActive) return null;
      product.variations = await this.getColorMatrix(id, options);
    }
    return product;
  }

  /**
   * Fetches products joined with category names for selection dropdowns.
   * @param {string} search - Partial match for name or category.
   */

  /**
   * Finds a single product_master row by exact MaterialName + FkProductCategoryId.
   * Uses prc_product_master_search filtered in-memory — no SP change required.
   * @param {string} name - MaterialName to match (case-insensitive)
   * @param {number} categoryId - FkProductCategoryId to match
   * @returns {Promise<object|null>}
   */
  async findByNameAndCategory(name, categoryId) {
    if (process.env.USE_MOCK_DB !== "true") {
      const [rows] = await db.execute(
        "CALL prc_product_master_search(?, ?, ?)",
        [0, categoryId, 0],
      );
      const allRows = rows[0] || [];
      return (
        allRows.find(
          (p) => p.MaterialName.toLowerCase() === name.toLowerCase(),
        ) || null
      );
    }

    return (
      seedProducts.find(
        (p) =>
          p.IsActive &&
          p.MaterialName.toLowerCase() === name.toLowerCase() &&
          p.FkProductCategoryId === categoryId,
      ) || null
    );
  }

  /**
   * Returns deduplicated product names matching a partial query string.
   * Used exclusively for the Product Name typeahead/autosuggest UI.
   * CALL prc_product_master_search(0, 0, 0) — filtered + deduplicated in JS.
   * @param {string} q - Partial name to match (case-insensitive).
   * @param {number} [limit=10] - Max suggestions to return.
   * @returns {Promise<Array<{productId: number, materialName: string}>>}
   */
  async searchByName(q = "", limit = 10) {
    let products = [];

    if (process.env.USE_MOCK_DB !== "true") {
      const [rows] = await db.execute(
        "CALL prc_product_master_search(?, ?, ?)",
        [0, 0, 0],
      );
      const _isActive = (val) => {
        if (Buffer.isBuffer(val)) return val[0] === 1;
        return val === 1 || val === true || val === "1" || val === "Active";
      };
      products = (rows[0] || []).filter((p) => _isActive(p.IsActive));
    } else {
      products = seedProducts.filter((p) => p.IsActive);
    }

    const lower = q.toLowerCase();
    const seen = new Set();
    const results = [];

    for (const p of products) {
      const name = p.MaterialName || "";
      if (name.toLowerCase().includes(lower) && !seen.has(p.PkProductId)) {
        seen.add(p.PkProductId);
        results.push({ productId: p.PkProductId, materialName: name });
        if (results.length >= limit) break;
      }
    }

    return results;
  }

  async getDropdown(search = "") {
    let products = [];
    let matrices = [];

    if (process.env.USE_MOCK_DB !== "true") {
      const [pRows] = await db.execute(
        "CALL prc_product_master_search(?, ?, ?)",
        [0, 0, 0],
      );
      const _isActiveRow = (val) => {
        if (Buffer.isBuffer(val)) return val[0] === 1;
        return val === 1 || val === true || val === "1" || val === "Active";
      };
      products = (pRows[0] || []).filter((p) => _isActiveRow(p.IsActive));
      matrices = await this.getAllColorMatrix();
    } else {
      products = seedProducts
        .filter((p) => p.IsActive)
        .map((p) => {
          const cat = seedCategories.find(
            (c) => c.PkProductCategoryId === p.FkProductCategoryId,
          );
          const unit = seedUnits.find((u) => u.PkUnitId === p.FkUnitId);
          return {
            ...p,
            CategoryName: cat?.CategoryName || "N/A",
            UnitTitle: unit?.UnitTitle || "N/A",
          };
        });
      matrices = seedColorMatrix.filter((m) => m.IsActive);
    }

    let flatList = [];
    for (const p of products) {
      const pVariations = matrices.filter(
        (m) => String(m.FkProductId) === String(p.PkProductId),
      );

      if (pVariations.length > 0) {
        for (const v of pVariations) {
          flatList.push({
            PkProductId: p.PkProductId,
            PkProductColorId: v.PkProductColorId,
            MaterialName: p.MaterialName,
            ColorName: v.ColorName || null,
            Size: v.Size || null,
            MaterialRate: v.MaterialRate || p.MaterialRate, // Override with variation rate
            cu_item_code: p.cu_item_code,
            CategoryName: p.CategoryName || null,
            UnitTitle: p.UnitTitle || null,
          });
        }
      } else {
        flatList.push({
          PkProductId: p.PkProductId,
          PkProductColorId: null,
          MaterialName: p.MaterialName,
          ColorName: null,
          Size: null,
          MaterialRate: p.MaterialRate,
          cu_item_code: p.cu_item_code,
          CategoryName: p.CategoryName || null,
          UnitTitle: p.UnitTitle || null,
        });
      }
    }

    if (search) {
      const q = search.toLowerCase();
      flatList = flatList.filter(
        (item) =>
          (item.MaterialName && item.MaterialName.toLowerCase().includes(q)) ||
          (item.CategoryName && item.CategoryName.toLowerCase().includes(q)) ||
          (item.ColorName && item.ColorName.toLowerCase().includes(q)),
      );
    }

    return flatList;
  }

  // --------------------------------------------------------------------------
  // 4. MUTATION PROCEDURES (Upsert & Soft Delete)
  // --------------------------------------------------------------------------

  /**
   * Inserts a new product record.
   * @param {object} data - Internal field mapping.
   * @param {number} adminId - User ID of creator.
   */
  async create(data, adminId) {
    if (process.env.USE_MOCK_DB !== "true") {
      const [rows] = await db.execute(
        "CALL prc_product_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          0, // Insert mode
          data.FkProductCategoryId || 0,
          data.FkUnitId || 0,
          data.MaterialCode || null,
          data.MaterialName,
          data.cu_item_code || null,
          data.MaterialRate,
          data.MaterialDescription || null,
          adminId,
          1, // Active
        ],
      );
      // SP may SELECT the new row (rows[0][0]) or return only an OkPacket.
      // When it's an OkPacket, rows[0].insertId carries the auto-increment ID.
      const row = rows[0]?.[0];
      if (row?.PkProductId) return row;
      if (row?.InsertedId) return { InsertedId: row.InsertedId };
      const insertId = rows[0]?.insertId;
      return insertId ? { InsertedId: insertId } : null;
    }

    const newProduct = {
      PkProductId: seedProducts.length + 1,
      ...data,
      IsActive: true,
      CreatedDate: new Date().toISOString(),
    };
    seedProducts.push(newProduct);
    return newProduct;
  }

  /**
   * Updates an existing product record.
   */
  async update(id, data, adminId) {
    if (process.env.USE_MOCK_DB !== "true") {
      const [rows] = await db.execute(
        "CALL prc_product_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          id,
          data.FkProductCategoryId || 0,
          data.FkUnitId || 0,
          data.MaterialCode || null,
          data.MaterialName,
          data.cu_item_code || null,
          data.MaterialRate,
          data.MaterialDescription || null,
          adminId,
          1,
        ],
      );
      return rows[0]?.[0] || null;
    }

    const idx = seedProducts.findIndex(
      (p) => p.PkProductId.toString() === id.toString(),
    );
    if (idx === -1) return null;
    seedProducts[idx] = { ...seedProducts[idx], ...data };
    return seedProducts[idx];
  }

  // --------------------------------------------------------------------------
  // 5. COLOR MATRIX PROCEDURES
  // --------------------------------------------------------------------------

  /**
   * Retrieves all color/size matrix variations for a given product.
   * @param {number|string} productId - FkProductId.
   * @returns {Promise<Array>} List of color matrix records.
   */
  async getColorMatrix(productId, options = {}) {
    if (process.env.USE_MOCK_DB !== "true") {
      // Note: If SP prc_product_color_matrix_get always filters by IsActive=1,
      // reactivation might require a different action or SP update.
      const [rows] = await db.execute(
        "CALL prc_product_color_matrix_get(?, ?)",
        [0, productId],
      );
      const allRows = rows[0] || [];
      return allRows.filter((r) => {
        const matchesProduct = String(r.FkProductId) === String(productId);
        if (!matchesProduct) return false;
        if (!options.includeDeleted && !r.IsActive) return false;
        return true;
      });
    }

    return seedColorMatrix.filter((m) => {
      const matchesProduct = m.FkProductId.toString() === productId.toString();
      if (!matchesProduct) return false;
      if (!options.includeDeleted && !m.IsActive) return false;
      return true;
    });
  }

  /**
   * Retrieves ALL color/size matrix variations across all products.
   * Used by the flat-variation dropdown (Bug 4).
   * CALL prc_product_color_matrix_get(pAction=0, 0)
   * @returns {Promise<Array>} All color matrix records.
   */
  async getAllColorMatrix(options = {}) {
    if (process.env.USE_MOCK_DB !== "true") {
      const [rows] = await db.execute(
        "CALL prc_product_color_matrix_get(?, ?)",
        [0, 0],
      );
      const allRows = rows[0] || [];
      return options.includeDeleted ? allRows : allRows.filter((r) => r.IsActive == 1);
    }
    return options.includeDeleted ? seedColorMatrix : seedColorMatrix.filter((m) => m.IsActive);
  }

  /**
   * Creates or updates a color/size matrix entry for a product.
   * @param {number} variationId - PkProductColorId (0 = insert, >0 = update).
   * @param {number} productId - FkProductId.
   * @param {object} data - { FkLuColorId, MaterialRate, Size }.
   * @param {number} adminId - User ID of creator.
   * @returns {Promise<object>} The upserted matrix record.
   */
  async setColorMatrix(variationId, productId, data, adminId, isActive = 1) {
    if (process.env.USE_MOCK_DB !== "true") {
      await db.execute(
        "CALL prc_product_color_matrix_set(?, ?, ?, ?, ?, ?, ?)",
        [
          variationId || 0,
          productId,
          data.FkLuColorId,
          data.MaterialRate,
          data.Size,
          adminId,
          isActive,
        ],
      );
      // SP UPDATE branch has no SELECT — fetch the updated row explicitly
      const [fetchRows] = await db.execute(
        "CALL prc_product_color_matrix_get(?, ?)",
        [0, productId],
      );
      const allRows = fetchRows[0] || [];
      const targetId = variationId || 0;
      return allRows.find((r) => r.PkProductColorId === targetId) || null;
    }

    // --- MOCK IN-MEMORY LOGIC ---
    if (variationId && variationId > 0) {
      const idx = seedColorMatrix.findIndex(
        (m) => m.PkProductColorId === variationId,
      );
      if (idx !== -1) {
        seedColorMatrix[idx] = {
          ...seedColorMatrix[idx],
          ...data,
          FkProductId: productId,
          IsActive: isActive,
        };
        return seedColorMatrix[idx];
      }
      return null;
    }
    const newEntry = {
      PkProductColorId: seedColorMatrix.length + 1,
      FkProductId: productId,
      ...data,
      IsActive: isActive,
      CreatedDate: new Date().toISOString(),
    };
    seedColorMatrix.push(newEntry);
    return newEntry;
  }

  // --------------------------------------------------------------------------
  // 6. SOFT DELETE
  // --------------------------------------------------------------------------

  /**
   * Updates the active status of a product (soft delete/reactivate).
   * Cascades the status change to all linked variations.
   *
   * @param {number|string} id - Product ID.
   * @param {boolean} isActive - Desired status.
   * @param {number} adminId - Performer ID.
   */
  async updateStatus(id, isActive, adminId) {
    const current = await this.findById(id, { includeDeleted: true });
    if (!current) return false;

    // Cascade status change to color matrix variations
    // We fetch ALL variations (including inactive) to ensure we can reactivate them
    const variations = await this.getColorMatrix(id, { includeDeleted: true });
    for (const v of variations) {
      await this.setColorMatrix(
        v.PkProductColorId,
        id,
        {
          FkLuColorId: v.FkLuColorId,
          MaterialRate: v.MaterialRate,
          Size: v.Size,
        },
        adminId,
        isActive ? 1 : 0, // Cascade the status
      );
    }

    if (process.env.USE_MOCK_DB !== "true") {
      await db.execute(
        "CALL prc_product_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          id,
          current.FkProductCategoryId,
          current.FkUnitId,
          current.MaterialCode,
          current.MaterialName,
          current.cu_item_code,
          current.MaterialRate,
          current.MaterialDescription,
          adminId,
          isActive ? 1 : 0, // Toggle Status
        ],
      );
      return true;
    }

    const idx = seedProducts.findIndex(
      (p) => p.PkProductId.toString() === id.toString(),
    );
    if (idx !== -1) seedProducts[idx].IsActive = isActive;
    return true;
  }
}

export default new ProductRepository();
