import mysql from 'mysql'

export const handler = async (event) => {
  
  
  var pool = mysql.createPool({
    host: "aucdb.cv0uky8u621r.us-east-2.rds.amazonaws.com",
    user: "aucAdmin",
    password: "aucPassword",
    database: "AuctionHouse"
  });
  
  
  let reviewActiveBids = (email) => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT itemName, value FROM AuctionHouse.Bids WHERE buyer = ? AND isHighestBid = 1", [email], (error, rows) => {
        if (error) { 
          return reject("Error: Unable to review active bids") 
        }
        if (rows) {
          const result = rows.map(row => ({
            itemName: row.itemName,
            value: row.value
          }));
          return resolve(result);
        } 
        else {
          return reject("Error: Unable to review active bids")
        }
      });
    });
  }
  

  try {
    const review = await reviewActiveBids(event.email);
    return {
      statusCode: 200,
      itemNames: review
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


