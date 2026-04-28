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
//   - prc_lu_unit_get: Unit lookup (pAction=0: all active)
// ============================================================================

import db from '../../infrastructure/database/db.js';

// ============================================================================
// MOCK DATA STORE (For USE_MOCK_DB=true)
// ============================================================================
let seedCategories = [
  { PkProductCategoryId: 1, CategoryName: 'Textiles', IsActive: true },
  { PkProductCategoryId: 2, CategoryName: 'Accessories', IsActive: true }
];

let seedUnits = [
  { PkUnitId: 1, UnitTitle: 'Kilogram', UnitCode: 'KG', IsActive: 1 },
  { PkUnitId: 2, UnitTitle: 'Pieces', UnitCode: 'PCS', IsActive: 1 },
  { PkUnitId: 3, UnitTitle: 'Litre', UnitCode: 'LTR', IsActive: 1 }
];

let seedColorMatrix = [
  {
    PkProductColorId: 1,
    FkProductId: 1,
    FkLuColorId: 1,
    ColorName: 'Red',
    MaterialRate: 550.00,
    Size: 'M',
    IsActive: 1,
    CreatedDate: new Date().toISOString()
  },
  {
    PkProductColorId: 2,
    FkProductId: 1,
    FkLuColorId: 2,
    ColorName: 'Blue',
    MaterialRate: 520.00,
    Size: 'L',
    IsActive: 1,
    CreatedDate: new Date().toISOString()
  }
];

let seedProducts = [
  {
    PkProductId: 1,
    MaterialName: 'Cotton Fiber',
    MaterialRate: 500.50,
    cu_item_code: 'CF-001',
    FkProductCategoryId: 1,
    FkUnitId: 1,
    IsActive: true,
    CreatedDate: new Date().toISOString()
  },
  {
    PkProductId: 2,
    MaterialName: 'Polyester Yarn',
    MaterialRate: 300.00,
    cu_item_code: 'PY-002',
    FkProductCategoryId: 1,
    FkUnitId: 1,
    IsActive: true,
    CreatedDate: new Date().toISOString()
  },
  {
    PkProductId: 3,
    MaterialName: 'Silk Thread',
    MaterialRate: 1500.00,
    cu_item_code: 'ST-003',
    FkProductCategoryId: 1,
    FkUnitId: 1,
    IsActive: true,
    CreatedDate: new Date().toISOString()
  }
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
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_check_duplicate_product_master(?, ?, ?, ?)', [
        id || 0,
        categoryId || 0,
        unitId || 0,
        name
      ]);
      return rows[0]?.[0]?.duplicate_count || 0;
    }

    // --- MOCK IN-MEMORY LOGIC ---
    const isDuplicate = seedProducts.some(p => 
      p.MaterialName.toLowerCase() === name.toLowerCase() && 
      p.PkProductId !== id && 
      p.IsActive
    );
    return isDuplicate ? 1 : 0;
  }

  // --------------------------------------------------------------------------
  // 2. LOOKUP PROCEDURES (Categories & Units)
  // --------------------------------------------------------------------------

  /**
   * Fetches all active product categories.
   * CALL prc_product_category_get(pAction=0)
   * @returns {Promise<Array>} List of category records.
   */
  async getCategories() {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_category_get(?)', [0]);
      return rows[0] || [];
    }
    return seedCategories.filter(c => c.IsActive);
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
    return categories.find(c => (c.CategoryName || '').toLowerCase() === lower) || null;
  }

  /**
   * Fetches all active units.
   * CALL prc_lu_unit_get(pAction=0)
   * @returns {Promise<Array>} List of unit records.
   */
  async getUnits() {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_lu_unit_get(?)', [0]);
      return rows[0] || [];
    }
    return seedUnits.filter(u => u.IsActive);
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
    return units.find(u => (u.UnitCode || '').toLowerCase() === lower) || null;
  }

  /**
   * Determines the next sequential cu_item_code / MaterialCode.
   * Queries MAX(cu_item_code) from product_master and increments.
   * CALL prc_product_master_search(0, 0, 0) — reads all products to find max code.
   * @returns {Promise<string>} Next available code (e.g., '1002').
   */
  async getNextItemCode() {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_master_search(?, ?, ?)', [0, 0, 0]);
      const products = rows[0] || [];
      const maxCode = products.reduce((max, p) => {
        const num = parseInt(p.cu_item_code, 10);
        return (!isNaN(num) && num > max) ? num : max;
      }, 1000);
      return String(maxCode + 1);
    }

    const maxCode = seedProducts.reduce((max, p) => {
      const num = parseInt(p.cu_item_code, 10);
      return (!isNaN(num) && num > max) ? num : max;
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
  async findAll(categoryId = 0, unitId = 0) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_master_search(?, ?, ?)', [0, categoryId, unitId]);
      return rows[0];
    }

    return seedProducts.filter(p => 
      p.IsActive && 
      (!categoryId || p.FkProductCategoryId === categoryId) &&
      (!unitId || p.FkUnitId === unitId)
    );
  }

  /**
   * Fetches a single product by its primary key, enriched with color matrix variations.
   * @param {number|string} id - PkProductId.
   * @returns {Promise<object|null>} Product record (with variations) or null.
   */
  async findById(id) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_master_search(?, ?, ?)', [id, 0, 0]);
      const product = rows[0]?.[0] || null;
      if (product) {
        product.variations = await this.getColorMatrix(id);
      }
      return product;
    }

    const product = seedProducts.find(p => p.PkProductId.toString() === id.toString() && p.IsActive) || null;
    if (product) {
      product.variations = seedColorMatrix.filter(
        m => m.FkProductId.toString() === id.toString() && m.IsActive
      );
    }
    return product;
  }

  /**
   * Fetches products joined with category names for selection dropdowns.
   * @param {string} search - Partial match for name or category.
   */
  async getDropdown(search = '') {
    let products = [];
    let matrices = [];

    if (process.env.USE_MOCK_DB !== 'true') {
      const [pRows] = await db.execute('CALL prc_product_master_search(?, ?, ?)', [0, 0, 0]);
      products = pRows[0] || [];
      matrices = await this.getAllColorMatrix();
    } else {
      products = seedProducts.filter(p => p.IsActive).map(p => {
        const cat = seedCategories.find(c => c.PkProductCategoryId === p.FkProductCategoryId);
        const unit = seedUnits.find(u => u.PkUnitId === p.FkUnitId);
        return { ...p, CategoryName: cat?.CategoryName || 'N/A', UnitTitle: unit?.UnitTitle || 'N/A' };
      });
      matrices = seedColorMatrix.filter(m => m.IsActive);
    }

    let flatList = [];
    for (const p of products) {
      const pVariations = matrices.filter(m => String(m.FkProductId) === String(p.PkProductId));
      
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
            UnitTitle: p.UnitTitle || null
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
          UnitTitle: p.UnitTitle || null
        });
      }
    }

    if (search) {
      const q = search.toLowerCase();
      flatList = flatList.filter(item => 
        (item.MaterialName && item.MaterialName.toLowerCase().includes(q)) || 
        (item.CategoryName && item.CategoryName.toLowerCase().includes(q)) ||
        (item.ColorName && item.ColorName.toLowerCase().includes(q))
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
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        0, // Insert mode
        data.FkProductCategoryId || 0,
        data.FkUnitId || 0,
        data.MaterialCode || null,
        data.MaterialName,
        data.cu_item_code || null,
        data.MaterialRate,
        data.MaterialDescription || null,
        adminId,
        1 // Active
      ]);
      return rows[0]?.[0];
    }

    const newProduct = {
      PkProductId: seedProducts.length + 1,
      ...data,
      IsActive: true,
      CreatedDate: new Date().toISOString()
    };
    seedProducts.push(newProduct);
    return newProduct;
  }

  /**
   * Updates an existing product record.
   */
  async update(id, data, adminId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        id,
        data.FkProductCategoryId || 0,
        data.FkUnitId || 0,
        data.MaterialCode || null,
        data.MaterialName,
        data.cu_item_code || null,
        data.MaterialRate,
        data.MaterialDescription || null,
        adminId,
        1
      ]);
      return rows[0]?.[0] || null;
    }

    const idx = seedProducts.findIndex(p => p.PkProductId.toString() === id.toString());
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
  async getColorMatrix(productId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_color_matrix_get(?, ?)', [0, productId]);
      const allRows = rows[0] || [];
      // Defensive JS-side filter: SP pAction=0 may return all rows if
      // the WHERE clause for FkProductId is missing (known SP bug).
      return allRows.filter(
        r => String(r.FkProductId) === String(productId)
      );
    }

    return seedColorMatrix.filter(
      m => m.FkProductId.toString() === productId.toString() && m.IsActive
    );
  }

  /**
   * Retrieves ALL color/size matrix variations across all products.
   * Used by the flat-variation dropdown (Bug 4).
   * CALL prc_product_color_matrix_get(pAction=0, 0)
   * @returns {Promise<Array>} All color matrix records.
   */
  async getAllColorMatrix() {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_color_matrix_get(?, ?)', [0, 0]);
      return rows[0] || [];
    }
    return seedColorMatrix.filter(m => m.IsActive);
  }

  /**
   * Creates or updates a color/size matrix entry for a product.
   * @param {number} matrixId - PkProductColorId (0 = insert, >0 = update).
   * @param {number} productId - FkProductId.
   * @param {object} data - { FkLuColorId, MaterialRate, Size }.
   * @param {number} adminId - User ID of creator.
   * @returns {Promise<object>} The upserted matrix record.
   */
  async setColorMatrix(matrixId, productId, data, adminId) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_color_matrix_set(?, ?, ?, ?, ?, ?, ?)', [
        matrixId || 0,
        productId,
        data.FkLuColorId,
        data.MaterialRate,
        data.Size,
        adminId,
        1
      ]);
      return rows[0]?.[0] || null;
    }

    // --- MOCK IN-MEMORY LOGIC ---
    if (matrixId && matrixId > 0) {
      const idx = seedColorMatrix.findIndex(m => m.PkProductColorId === matrixId);
      if (idx !== -1) {
        seedColorMatrix[idx] = { ...seedColorMatrix[idx], ...data, FkProductId: productId };
        return seedColorMatrix[idx];
      }
      return null;
    }
    const newEntry = {
      PkProductColorId: seedColorMatrix.length + 1,
      FkProductId: productId,
      ...data,
      IsActive: 1,
      CreatedDate: new Date().toISOString()
    };
    seedColorMatrix.push(newEntry);
    return newEntry;
  }

  // --------------------------------------------------------------------------
  // 6. SOFT DELETE
  // --------------------------------------------------------------------------

  /**
   * Soft-deletes a product by setting IsActive to 0.
   * Requires fetching current state to satisfy the full SP parameter list.
   */
  async delete(id, adminId) {
    const current = await this.findById(id);
    if (!current) return false;

    if (process.env.USE_MOCK_DB !== 'true') {
      await db.execute('CALL prc_product_master_set(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        id,
        current.FkProductCategoryId,
        current.FkUnitId,
        current.MaterialCode,
        current.MaterialName,
        current.cu_item_code,
        current.MaterialRate,
        current.MaterialDescription,
        adminId,
        0 // Soft Delete
      ]);
      return true;
    }

    const idx = seedProducts.findIndex(p => p.PkProductId.toString() === id.toString());
    if (idx !== -1) seedProducts[idx].IsActive = false;
    return true;
  }
}

export default new ProductRepository();
