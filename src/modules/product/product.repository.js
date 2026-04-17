// ============================================================================
// File: src/modules/product/product.repository.js
// Description: Data access layer for Products.
//
// Dual-Mode: Controlled by USE_MOCK_DB environment variable.
//   - USE_MOCK_DB=true  → In-memory seed data (frontend development)
//   - USE_MOCK_DB=false → Live MySQL stored procedures
//
// SP Convention (api_procedure_spec_v1.md):
//   - Reads:   prc_product_master_get (pAction=0 list, pAction=1 specific)
//   - Upserts: prc_product_master_set (PkProductId=0 insert, >0 update, IsActive=0 delete)
// ============================================================================

import db from '../../infrastructure/database/db.js';

// ============================================================================
// MOCK MODE: In-Memory Seed Data
// Used when USE_MOCK_DB=true for frontend development without a live database.
// ============================================================================
let seedProducts = [];

const initializeSeedData = () => {
  seedProducts = [
    {
      PkProductId: 1,
      MaterialName: 'Cotton Shirt',
      MaterialRate: 450.00,
      cu_item_code: 'CS-001',
      MaterialDescription: null,
      FkProductCategoryId: null,
      FkUnitId: null,
      IsActive: true,
      CreatedDate: new Date().toISOString()
    },
    {
      PkProductId: 2,
      MaterialName: 'Denim Jeans',
      MaterialRate: 1200.00,
      cu_item_code: 'DJ-002',
      MaterialDescription: null,
      FkProductCategoryId: null,
      FkUnitId: null,
      IsActive: true,
      CreatedDate: new Date().toISOString()
    }
  ];
};

initializeSeedData();

class ProductRepository {
  /**
   * Fetches a paginated list of products with optional search.
   * Procedure: CALL prc_product_master_get(?, ?, ?, ?)
   * Convention: pAction=0 → paginated list.
   *
   * @param {number} page - Page number.
   * @param {number} limit - Results per page.
   * @param {string} search - Optional search term.
   * @returns {Promise<object>} { data: [...], total: number }
   */
  async findAll(page = 1, limit = 20, search = '') {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_product_master_get (pAction=0)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_master_get(?, ?, ?, ?)', [
        0, // pAction=0 → Get all products (paginated)
        page,
        limit,
        search || null
      ]);
      return { data: rows[0], total: rows[1]?.[0]?.total_records || 0 };
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory filtering
    // ------------------------------------------------------------------
    const activeProducts = seedProducts.filter(p => p.IsActive);
    let filtered = activeProducts;

    if (search) {
      filtered = filtered.filter(p =>
        p.MaterialName.toLowerCase().includes(search.toLowerCase()) ||
        (p.cu_item_code && p.cu_item_code.toLowerCase().includes(search.toLowerCase()))
      );
    }

    return {
      data: filtered,
      total: filtered.length
    };
  }

  /**
   * Fetches a product by ID.
   * Procedure: CALL prc_product_master_get(?, ?)
   * Convention: pAction=1 → specific record.
   *
   * @param {number|string} id - PkProductId.
   * @returns {Promise<object|null>} Product record or null.
   */
  async findById(id) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_product_master_get (pAction=1)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_master_get(?, ?)', [1, id]);
      return rows[0]?.[0] || null;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory lookup by PkProductId
    // ------------------------------------------------------------------
    const product = seedProducts.find((p) => p.PkProductId.toString() === id.toString() && p.IsActive);
    return product || null;
  }

  /**
   * Creates a new product.
   * Procedure: CALL prc_product_master_set(?, ?, ?, ?, ?, ?, ?, ?)
   * Convention: PkProductId=0 triggers insert. No pAction on _set calls.
   *
   * @param {object} productData - Product fields.
   * @returns {Promise<object>} The newly created product record.
   */
  async create(productData) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_product_master_set (PkProductId=0 → Insert)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_master_set(?, ?, ?, ?, ?, ?, ?, ?)', [
        0, // PkProductId=0 → Insert new product
        productData.FkProductCategoryId || productData.categoryId || null,
        productData.FkUnitId || productData.unitId || null,
        productData.MaterialCode || productData.materialCode || null,
        productData.MaterialName || productData.materialName,
        productData.cu_item_code || productData.cuItemCode || null,
        productData.MaterialRate || productData.materialRate,
        productData.MaterialDescription || productData.description || null
      ]);
      return rows[0]?.[0];
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory push
    // ------------------------------------------------------------------
    const newId = seedProducts.length > 0 ? Math.max(...seedProducts.map(p => p.PkProductId)) + 1 : 1;
    const newProduct = {
      PkProductId: newId,
      MaterialName: productData.MaterialName || productData.materialName,
      MaterialRate: parseFloat(productData.MaterialRate || productData.materialRate),
      cu_item_code: productData.cu_item_code || productData.cuItemCode || null,
      MaterialDescription: productData.MaterialDescription || productData.description || null,
      IsActive: true,
      CreatedDate: new Date().toISOString()
    };

    seedProducts.push(newProduct);
    return newProduct;
  }

  /**
   * Updates an existing product.
   * Procedure: CALL prc_product_master_set(?, ?, ?, ?, ?, ?, ?, ?)
   * Convention: PkProductId>0 triggers update. No pAction on _set calls.
   *
   * @param {number|string} id - PkProductId.
   * @param {object} updates - Fields to update.
   * @returns {Promise<object|null>} Updated product record or null.
   */
  async update(id, updates) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_product_master_set (PkProductId>0 → Update)
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      const [rows] = await db.execute('CALL prc_product_master_set(?, ?, ?, ?, ?, ?, ?, ?)', [
        id, // PkProductId>0 → Update existing product
        updates.FkProductCategoryId || updates.categoryId || null,
        updates.FkUnitId || updates.unitId || null,
        updates.MaterialCode || updates.materialCode || null,
        updates.MaterialName || updates.materialName || null,
        updates.cu_item_code || updates.cuItemCode || null,
        updates.MaterialRate || updates.materialRate || null,
        updates.MaterialDescription || updates.description || null
      ]);
      return rows[0]?.[0] || null;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory update
    // ------------------------------------------------------------------
    const index = seedProducts.findIndex(p => p.PkProductId.toString() === id.toString() && p.IsActive);
    if (index === -1) return null;

    if (updates.MaterialName || updates.materialName) {
      seedProducts[index].MaterialName = updates.MaterialName || updates.materialName;
    }
    if (updates.MaterialRate || updates.materialRate) {
      seedProducts[index].MaterialRate = parseFloat(updates.MaterialRate || updates.materialRate);
    }
    if (updates.cu_item_code || updates.cuItemCode) {
      seedProducts[index].cu_item_code = updates.cu_item_code || updates.cuItemCode;
    }

    return seedProducts[index];
  }

  /**
   * Soft-deletes a product (sets IsActive=0).
   * Procedure: CALL prc_product_master_set(?, ?, ?, ?, ?, ?, ?, ?)
   * Convention: Pass IsActive=0 for soft-delete. No pAction on _set calls.
   *
   * @param {number|string} id - PkProductId.
   * @returns {Promise<boolean>} True if deleted, false if not found.
   */
  async delete(id) {
    // ------------------------------------------------------------------
    // LIVE DB MODE: prc_product_master_set (IsActive=0 → Soft Delete)
    // Note: We pass the ID and set IsActive=0. The SP handles the rest.
    // ------------------------------------------------------------------
    if (process.env.USE_MOCK_DB !== 'true') {
      await db.execute('CALL prc_product_master_set(?, ?, ?, ?, ?, ?, ?, ?)', [
        id,
        null, null, null, null, null, null, // No field changes
        0     // IsActive=0 — soft delete marker (passed as last param)
      ]);
      return true;
    }

    // ------------------------------------------------------------------
    // MOCK MODE: In-memory soft delete
    // ------------------------------------------------------------------
    const index = seedProducts.findIndex(p => p.PkProductId.toString() === id.toString() && p.IsActive);
    if (index === -1) return false;

    seedProducts[index].IsActive = false;
    return true;
  }
}

export default new ProductRepository();
