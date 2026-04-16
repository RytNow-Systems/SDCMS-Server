// ============================================================================
// File: src/modules/product/product.service.js
// Description: Business logic layer for Products Master Data.
// ============================================================================

import productRepository from './product.repository.js';

class ProductService {
  
  /**
   * Internal mapper to format DB results for the API layer
   */
  _mapToApi(product) {
    if (!product) return null;
    const { materialName, ...rest } = product;
    return {
      ...rest,
      productName: materialName
    };
  }

  /**
   * Internal mapper to format API payloads for the Repository layer
   */
  _mapToInternal(apiData) {
    const { productName, ...rest } = apiData;
    const internal = { ...rest };
    if (productName) internal.materialName = productName;
    return internal;
  }

  async getProducts(page = 1, limit = 20, search = '') {
    const { data, total } = await productRepository.findAll(page, limit, search);
    return {
      data: data.map(p => this._mapToApi(p)),
      total
    };
  }

  async getProductById(id) {
    const product = await productRepository.findById(id);
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    return this._mapToApi(product);
  }

  async createProduct(productData) {
    const internalData = this._mapToInternal(productData);

    if (!internalData.materialName || internalData.materialRate === undefined) {
      const error = new Error('Product Name and Material Rate are required');
      error.statusCode = 400;
      throw error;
    }

    if (isNaN(parseFloat(internalData.materialRate)) || parseFloat(internalData.materialRate) < 0) {
      const error = new Error('Material rate must be a valid positive number');
      error.statusCode = 400;
      throw error;
    }

    const newProduct = await productRepository.create(internalData);
    return this._mapToApi(newProduct);
  }

  async updateProduct(id, updates) {
    // Ensure product exists
    await this.getProductById(id);

    const internalUpdates = this._mapToInternal(updates);

    if (internalUpdates.materialRate !== undefined) {
      if (isNaN(parseFloat(internalUpdates.materialRate)) || parseFloat(internalUpdates.materialRate) < 0) {
        const error = new Error('Material rate must be a valid positive number');
        error.statusCode = 400;
        throw error;
      }
    }

    const updatedProduct = await productRepository.update(id, internalUpdates);
    return this._mapToApi(updatedProduct);
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
