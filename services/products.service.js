const ProductRepository = require("../repositories/products.repository");

class ProductService {
  productRepository = new ProductRepository();

  showAllProduct = async (page, width) => {
    let pageCount = 5; 
    if(Number(width) > 1920){
      pageCount = 9
    }
    try {
      const data = await this.productRepository.showAllProduct(page, pageCount);

      return data;
    } catch (error) {
      throw error;
    }
  };

  findSearchProduct = async (page, text, width) => {
    let pageCount = 5; 
    if(Number(width) > 1920){
      pageCount = 9
    }
    try {
      const data = await this.productRepository.findSearchProduct(page, text, pageCount);

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
