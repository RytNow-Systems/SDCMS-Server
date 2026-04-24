// ============================================================================
// File: src/modules/product/product.repository.js
// Description: Data access layer for Products Master.
//
// Stored Procedures (api_procedure_spec_v2.md):
//   - prc_product_master_search: Retrieval & ID lookup
//   - prc_product_master_set: Insert (ID=0), Update (ID>0), Delete (IsActive=0)
//   - prc_check_duplicate_product_master: Uniqueness validation
// ============================================================================

import db from '../../infrastructure/database/db.js';

// ============================================================================
// MOCK DATA STORE (For USE_MOCK_DB=true)
// ============================================================================
let seedCategories = [
  { PkProductCategoryId: 1, CategoryName: 'Textiles', IsActive: true },
  { PkProductCategoryId: 2, CategoryName: 'Accessories', IsActive: true }
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
  // 2. RETRIEVAL PROCEDURES
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
   * Fetches a single product by its primary key.
   * @param {number|string} id - PkProductId.
   * @returns {Promise<object|null>} Product record or null.
   */
  async findById(id) {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_master_search(?, ?, ?)', [id, 0, 0]);
      return rows[0]?.[0] || null;
    }

    return seedProducts.find(p => p.PkProductId.toString() === id.toString() && p.IsActive) || null;
  }

  /**
   * Fetches products joined with category names for selection dropdowns.
   * @param {string} search - Partial match for name or category.
   */
  async getDropdown(search = '') {
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_master_search(?, ?, ?)', [0, 0, 0]);
      let products = rows[0];
      
      if (search) {
        const q = search.toLowerCase();
        products = products.filter(p => 
          p.MaterialName.toLowerCase().includes(q) || 
          (p.CategoryName && p.CategoryName.toLowerCase().includes(q))
        );
      }
      return products;
    }

    let results = seedProducts.filter(p => p.IsActive).map(p => {
      const cat = seedCategories.find(c => c.PkProductCategoryId === p.FkProductCategoryId);
      return { ...p, CategoryName: cat?.CategoryName || 'N/A' };
    });

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(p => p.MaterialName.toLowerCase().includes(q) || p.CategoryName.toLowerCase().includes(q));
    }
    return results;
  }

  // --------------------------------------------------------------------------
  // 3. MUTATION PROCEDURES (Upsert & Soft Delete)
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
