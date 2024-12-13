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
  
  let buyNowBuyer = (buyer, value, itemName, seller) => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT SUM(value) AS sum FROM AuctionHouse.Bids WHERE buyer = ? AND isHighestBid = 1", [buyer], (error, rows) => {
          if (error) {
            return reject(error);
          }
          let currentSum = rows[0].sum || 0;
          pool.query("SELECT funds FROM AuctionHouse.Buyers WHERE username = ?", [buyer], (error, rows) => {
              if (error) {
                return reject(error);
              }
              const buyerFunds = rows[0].funds;
              if (buyerFunds - (currentSum + Number(value)) <= 0) {
                return reject("Error: Insufficient Funds to Buy Now");
              }
              else{
                pool.query("UPDATE AuctionHouse.Items SET status=?, buyNowBuyer=? WHERE name=? AND sellerOfItem=?", ["completed", buyer, itemName, seller], (error, rows) => {
                  if (error) {
                    return reject(error);
                  }
                  return resolve("Item Set For Fulfillment")
                }
              );
              }
            }
          );
        }
      );
    });
  }
  

  try {
    const review = await buyNowBuyer(event.buyer, event.value, event.itemName, event.seller);
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
