const ProductRepository = require("../repositories/products.repository");

class ProductService {
  productRepository = new ProductRepository();

  showNewProduct = async () => {
    try {
      const data = await this.productRepository.showNewProduct();

      return data;
    } catch (error) {
      throw error;
    }
  };

  showBestProduct = async () => {
    try {
      const data = await this.productRepository.showBestProduct();

      return data;
    } catch (error) {
      throw error;
    }
  };

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
