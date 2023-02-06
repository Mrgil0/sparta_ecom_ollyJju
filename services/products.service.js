const ProductRepository = require("../repositories/products.repository");

class ProductService {
  productRepository = new ProductRepository();

  showAllProduct = async (page, text) => {
    try {
      const data = await this.productRepository.showAllProduct(page, text);

      return data;
    } catch (error) {
      throw error;
    }
  };

  findSearchProduct = async (page, text) => {
    try {
      const data = await this.productRepository.findSearchProduct(page, text);

      return data;
    } catch (error) {
      throw error;
    }
  }

  findOneProduct = async (productId) => {
    try {
      const data = await this.productRepository.findOneProduct(productId);

      return data;
    } catch (error) {
      throw error;
    }
  };

  findProductId = async (productId) => {
    try {
      const dbproductId = await this.productRepository.findProductId(productId);

      return dbproductId;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = ProductService;
