
const { Product } = require("../models");
const Sequelize = require('sequelize');
require("dotenv").config();
const env = process.env;
const sequelize = new Sequelize("olly_jju", "rooyt", env.password,{
    host: env.host,
    dialect: "mysql",
});

class ProductRepository {
  showAllProduct = async (page) => {
    try {
      const data = await sequelize.query(
        `SELECT id, productImage, productName, productInfo, price, category From Products ORDER BY createdAt DESC LIMIT `+ Number(page) + `, 5`,
        {
          raw:true,
          nest:true,
          type: sequelize.QueryTypes.SELECT,
        }
      )

      const returndata = data.map((data) => {
        const { id, productImage, productName, price, productInfo } = data;

        return {
          id,
          productImage,
          productName,
          price,
          productInfo,
        };
      });

      return returndata;
    } catch (error) {
      error.status = 500;
      throw error;
    }
  };

  fincAllCategory = async () =>{
    try {
      const data = await sequelize.query(
        `SELECT category From Products where id in (select id from Products group by category having count(category)>=1)`,
        {
          raw:true,
          nest:true,
          type: sequelize.QueryTypes.SELECT,
        }
      )
      return data;
    }catch (error) {
      return false
    }
  }

  findOneProduct = async (productId) => {
    try {
      const data = await Product.findOne({
        where: { id: productId },
      });

      return data;
    } catch (error) {
      error.status = 500;
      throw error;
    }
  };

  findProductId = async (productId) => {
    try {
      const dbproductId = await Product.findOne({
        where: { id: productId },
      });

      return dbproductId.id;
    } catch (error) {
      error.status = 500;
      error.message = "상품이 존재하지 않습니다."
      throw error;
    }
  };
}

module.exports = ProductRepository;
