// ============================================================================
// File: src/modules/product/product.service.js
// Description: Business logic layer for Products Master Data.
// ============================================================================

import productRepository from './product.repository.js';

class ProductService {
  
  async getProducts(page = 1, limit = 20, search = '') {
    return await productRepository.findAll(page, limit, search);
  }

  async getProductById(id) {
    const product = await productRepository.findById(id);
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    return product;
  }

  async createProduct(productData) {
    if (!productData.materialName || productData.materialRate === undefined) {
      const error = new Error('Material Name and Material Rate are required');
      error.statusCode = 400;
      throw error;
    }

    if (isNaN(parseFloat(productData.materialRate)) || parseFloat(productData.materialRate) < 0) {
      const error = new Error('Material rate must be a valid positive number');
      error.statusCode = 400;
      throw error;
    }

    return await productRepository.create(productData);
  }

  async updateProduct(id, updates) {
    // Ensure product exists
    await this.getProductById(id);

    if (updates.materialRate !== undefined) {
      if (isNaN(parseFloat(updates.materialRate)) || parseFloat(updates.materialRate) < 0) {
        const error = new Error('Material rate must be a valid positive number');
        error.statusCode = 400;
        throw error;
      }
    }

    return await productRepository.update(id, updates);
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
