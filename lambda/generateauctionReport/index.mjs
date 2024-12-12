import mysql from 'mysql';

let pool;

if (!pool) {
  pool = mysql.createPool({
    host: "aucdb.cv0uky8u621r.us-east-2.rds.amazonaws.com",
    user: "aucAdmin",
    password: "aucPassword",
    database: "AuctionHouse",
    connectionLimit: 10, 
  });
}

export const handler = async (event) => {
  
  let getSoldItemsWithCommission = () => {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT name AS itemName, finalSalePrice AS salePrice, finalSalePrice * 0.05 AS commision FROM AuctionHouse.Items WHERE boughtByBuyer IS NOT NULL",
        (error, rows) => {
          if (error) { 
            return reject("Error: Unable to fetch sold items."); 
          }
          if (rows) {
            return resolve(rows);
          } else {
            return reject("Error: No sold items found.");
          }
        }
      );
    });
  };
  
  try {
    const soldItems = await getSoldItemsWithCommission();
    return {
      statusCode: 200,
      items: soldItems
    };
  } catch (error) {
    return {
      statusCode: 400,
      message: "Failed to fetch sold items with commission.",
      error: error.toString()
    };
  }
}