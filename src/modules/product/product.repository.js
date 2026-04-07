// ============================================================================
// File: src/modules/product/product.repository.js
// Description: Data access layer for Products, explicitly mocking 
// the Stored Procedure architecture defined in Database_Procedures_Requirements.md
// ============================================================================

import db from '../../infrastructure/database/db.js';

// In-Memory Seed Data Fallback per strict 'Zero Direct DB' rule until SPs are ready
let seedProducts = [];

const initializeSeedData = () => {
  seedProducts = [
    {
      id: 1,
      materialName: 'Cotton Shirt',
      materialRate: 450.00,
      cuItemCode: 'CS-001',
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      materialName: 'Denim Jeans',
      materialRate: 1200.00,
      cuItemCode: 'DJ-002',
      isActive: true,
      createdAt: new Date().toISOString()
    }
  ];
};

initializeSeedData();

class ProductRepository {
  /**
   * Mock implementation of: CALL sp_get_all_products(?, ?, ?)
   */
  async findAll(page = 1, limit = 20, search = '') {
    // ------------------------------------------------------------------
    // Future Implementation (Placeholder Procedure)
    // const [rows] = await db.execute('CALL sp_get_all_products(?, ?, ?)', [page, limit, search]);
    // return { data: rows[0], total: rows[1][0].total_records };
    // ------------------------------------------------------------------

    const activeProducts = seedProducts.filter(p => p.isActive);
    let filtered = activeProducts;
    
    if (search) {
      filtered = filtered.filter(p => 
        p.materialName.toLowerCase().includes(search.toLowerCase()) ||
        (p.cuItemCode && p.cuItemCode.toLowerCase().includes(search.toLowerCase()))
      );
    }
    
    return {
      data: filtered,
      total: filtered.length
    };
  }

  /**
   * Mock implementation of: CALL sp_get_product_by_id(?)
   */
  async findById(id) {
    // ------------------------------------------------------------------
    // Future Implementation (Placeholder Procedure)
    // const [rows] = await db.execute('CALL sp_get_product_by_id(?)', [id]);
    // return rows[0][0] || null;
    // ------------------------------------------------------------------

    const product = seedProducts.find((p) => p.id.toString() === id.toString() && p.isActive);
    return product || null;
  }

  /**
   * Mock implementation of: CALL sp_create_product(?, ?, ?, ?)
   * Maps Payload: cuItemCode -> p_sku, materialName -> p_name, materialRate -> p_mrp
   */
  async create(productData) {
    // ------------------------------------------------------------------
    // Future Implementation (Placeholder Procedure)
    // const [rows] = await db.execute('CALL sp_create_product(?, ?, ?, ?)', [
    //   productData.cuItemCode || null,
    //   productData.materialName,
    //   productData.description || null,
    //   productData.materialRate
    // ]);
    // return rows[0][0];
    // ------------------------------------------------------------------

    const newId = seedProducts.length > 0 ? Math.max(...seedProducts.map(p => p.id)) + 1 : 1;
    const newProduct = {
      id: newId,
      materialName: productData.materialName,
      materialRate: parseFloat(productData.materialRate),
      cuItemCode: productData.cuItemCode || null,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    seedProducts.push(newProduct);
    return newProduct;
  }

  /**
   * Mock implementation of: CALL sp_update_product(?, ?, ?, ?)
   */
  async update(id, updates) {
    // ------------------------------------------------------------------
    // Future Implementation (Placeholder Procedure)
    // const [rows] = await db.execute('CALL sp_update_product(?, ?, ?, ?)', [
    //   id,
    //   updates.materialName,
    //   updates.description || null,
    //   updates.materialRate
    // ]);
    // return rows[0][0] || null;
    // ------------------------------------------------------------------

    const index = seedProducts.findIndex(p => p.id.toString() === id.toString() && p.isActive);
    if (index === -1) return null;

    seedProducts[index] = {
      ...seedProducts[index],
      ...updates
    };

    return seedProducts[index];
  }

  /**
   * Mock implementation of: CALL sp_soft_delete_product(?)
   */
  async delete(id) {
    // ------------------------------------------------------------------
    // Future Implementation (Placeholder Procedure)
    // const [rows] = await db.execute('CALL sp_soft_delete_product(?)', [id]);
    // return true; // Success
    // ------------------------------------------------------------------

    const index = seedProducts.findIndex(p => p.id.toString() === id.toString() && p.isActive);
    if (index === -1) return false;

    seedProducts[index].isActive = false;
    return true;
  }
}

export default new ProductRepository();
