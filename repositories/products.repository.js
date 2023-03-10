
const { Product } = require("../models");
const Sequelize = require('sequelize');
require("dotenv").config();
const env = process.env;
const sequelize = new Sequelize("olly_jju", "rooyt", env.password,{
    host: env.host,
    dialect: "mysql",
});

class ProductRepository {
  showAllProduct = async (page, pageCount) => {
    let offset = 0;
    if(page > 0){
      offset = (Number(page)-1)*pageCount
    }
    try {
      const data = await sequelize.query(
        `SELECT id, productImage, productName, productInfo, price, category From Products 
        ORDER BY createdAt DESC LIMIT `+ Number(offset) + `, ` + Number(pageCount),
        {
          raw:true,
          nest:true,
          type: sequelize.QueryTypes.SELECT,
        }
      )
      return data;
    } catch (error) {
      error.status = 500;
      throw error;
    }
  };
  findSearchProduct = async (page, text, pageCount) =>{
    let offset = 0;
    if(page > 0){
      offset = (Number(page)-1)*pageCount
    }
    const data = await sequelize.query(
      `SELECT id, productImage, productName, productInfo, price, category From Products 
      WHERE productName like '%` + text + `%' or category like '%` + text + `%' 
      ORDER BY createdAt DESC LIMIT `+ Number(offset) + `, ` + Number(pageCount),
      {
        raw:true,
        nest:true,
        type: sequelize.QueryTypes.SELECT,
      }
    )
    return data;
  }

  findAllCategory = async () =>{
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
  findTodayPick = async () =>{
    try {
      const data = await sequelize.query(
        `SELECT id, productImage, productName, productInfo, price, category 
        From Products ORDER BY rand() LIMIT 3`,
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
      error.message = "????????? ???????????? ????????????."
      throw error;
    }
  };
  findMyProduct = async (userIdx) => {
    try {
      const purchaseList = await sequelize.query(
        `SELECT oi.order_idx, oi.order_status, od.product_idx, od.order_count, pd.productName, pd.price 
        FROM orders oi
        INNER JOIN order_details od ON oi.order_idx = od.order_idx
        INNER JOIN Products pd on od.product_idx = pd.id
        WHERE oi.user_idx = ${userIdx}`
      )
      return purchaseList[0];
    } catch (error) {
      error.status = 500;
      throw error;
    }
    
  }
}

module.exports = ProductRepository;
