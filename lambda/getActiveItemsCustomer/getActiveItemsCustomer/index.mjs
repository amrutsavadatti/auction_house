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
  
  let getItems = () => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT i.*, CASE WHEN b.value IS NULL THEN 0 ELSE b.value END AS highestBid FROM AuctionHouse.Items i LEFT JOIN AuctionHouse.Bids b ON i.name = b.itemName AND b.isHighestBid = 1 WHERE i.status = ?", ["active"], (error, rows) => {
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
    const review = await getItems();
    return {
      statusCode: 200,
      items: review
    };
  } catch (error) {
    const statusCode = 400;
    return {
      statusCode: statusCode,
      message : "Failed to get active items",
      error : error
    };
  }


  
};
