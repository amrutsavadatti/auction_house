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
  
  let sort = (sorter) => {
    return new Promise((resolve, reject) => {
      if(sorter == "setPrice"){
        pool.query("SELECT i.*, CASE WHEN b.value IS NULL THEN 0 ELSE b.value END AS highestBid FROM AuctionHouse.Items i LEFT JOIN AuctionHouse.Bids b ON i.name = b.itemName AND b.isHighestBid = 1 WHERE status = ? ORDER BY setPrice", ["active"], (error, rows) => {
          if (error) { 
            return reject("Error: Unable to sort items") 
          }
          if ((rows)) {
            return resolve(rows)
          } 
          else {
            return reject("Error: Unable to sort items - 2")
          }
        });
      }
      if(sorter == "publishDate"){
        pool.query("SELECT i.*, CASE WHEN b.value IS NULL THEN 0 ELSE b.value END AS highestBid FROM AuctionHouse.Items i LEFT JOIN AuctionHouse.Bids b ON i.name = b.itemName AND b.isHighestBid = 1 WHERE status = ? ORDER BY publishDate", ["active"], (error, rows) => {
          if (error) { 
            return reject("Error: Unable to sort items") 
          }
          if ((rows)) {
            return resolve(rows)
          } 
          else {
            return reject("Error: Unable to sort items - 2")
          }
        });
      }
      if(sorter == "expirationDate"){
        pool.query("SELECT i.*, CASE WHEN b.value IS NULL THEN 0 ELSE b.value END AS highestBid FROM AuctionHouse.Items i LEFT JOIN AuctionHouse.Bids b ON i.name = b.itemName AND b.isHighestBid = 1 WHERE status = ? ORDER BY expirationDate", ["active"], (error, rows) => {
          if (error) { 
            return reject("Error: Unable to sort items") 
          }
          if ((rows)) {
            return resolve(rows)
          } 
          else {
            return reject("Error: Unable to sort items - 2")
          }
        });
      }
    });
  }
  

  try {
    const review = await sort(event.sorter);
    return {
      statusCode: 200,
      items: review
    };
  } catch (error) {
    const statusCode = 400;
    return {
      statusCode: statusCode,
      message : "Failed to review items",
      error : error
    };
  }


  
};

