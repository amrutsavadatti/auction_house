import mysql from 'mysql'


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
  
  let turnOnBuyNow = (itemName, seller) => {
    return new Promise((resolve, reject) => {
      pool.query("UPDATE AuctionHouse.Items SET buyNow = ? WHERE name = ? AND sellerOfItem = ?", ["1", itemName, seller], (error, rows) => {
        if (error) { 
          return reject(error) 
        }
        if ((rows)) {
          return resolve(rows)
        } 
        else {
          return reject(error)
        }
      });
    });
  }
  

  try {
    const review = await turnOnBuyNow(event.itemName, event.seller);
    return {
      statusCode: 200,
      items: review
    };
  } catch (error) {
    const statusCode = 400;
    return {
      statusCode: statusCode,
      message : "Failed",
      error : error
    };
  }
  
};
