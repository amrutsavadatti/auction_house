import mysql from 'mysql'

export const handler = async (event) => {
  
  
  var pool = mysql.createPool({
    host: "aucdb.cv0uky8u621r.us-east-2.rds.amazonaws.com",
    user: "aucAdmin",
    password: "aucPassword",
    database: "AuctionHouse"
  });

  //let buyerFunds = 0;
  
  
  let placeBids = (value, buyer, itemName, dateMade) => {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT COUNT(*) AS count FROM AuctionHouse.Bids WHERE itemName = ?", [itemName], (error, rows) => {
          if (error) {
            return reject("Error 1");
          }
          if (Number(rows[0].count) > 0) {
            pool.query(
              "SELECT buyer FROM AuctionHouse.Bids WHERE itemName = ? AND isHighestBid = 1", [itemName], (error, rows) => {
                if (error) {
                  return reject("Error");
                }
                if (rows[0].buyer === buyer) {
                  return reject("Error: You are already the highest bidder");
                }
            pool.query(
              "SELECT value FROM AuctionHouse.Bids WHERE itemName = ? AND isHighestBid = 1", [itemName], (error, rows) => {
                if (error) {
                  return reject("Error 2");
                }
                if (Number(rows[0].value) > Number(value)) {
                  return reject(
                    "Error: Trying to enter a bid less than the current highest bid"
                  );
                }
                checkBuyerFunds();
              }
            );
          }
        );
          } else {
            pool.query(
              "SELECT setPrice FROM AuctionHouse.Items WHERE name = ?", [itemName], (error, rows) => {
                if (error) {
                  return reject("Error retrieving set price");
                }
                const setPriceHold = rows[0].setPrice;
                if (Number(value) !== Number(setPriceHold)) {
                  return reject(
                    "You are placing the first bid. It must be equal to the setPrice"
                  );
                }
                checkBuyerFunds();
              }
            );
          }
  
          function checkBuyerFunds() {
            pool.query(
              "SELECT SUM(value) AS sum FROM AuctionHouse.Bids WHERE buyer = ? AND isHighestBid = 1", [buyer], (error, rows) => {
                if (error) {
                  return reject("Error 3");
                }
                let currentSum = rows[0].sum || 0;
                pool.query(
                  "SELECT funds FROM AuctionHouse.Buyers WHERE username = ?", [buyer], (error, rows) => {
                    if (error) {
                      return reject("Error 4");
                    }
                    const buyerFunds = rows[0].funds;
                    if (buyerFunds - (currentSum + Number(value)) <= 0) {
                      return reject("Error: Insufficient Funds to place bid");
                    }
                    insertBid();
                  }
                );
              }
            );
          }
  
          function insertBid() {
            pool.query(
              "INSERT INTO AuctionHouse.Bids (value, buyer, itemName, dateMade, isHighestBid) VALUES (?, ?, ?, ?, 1)", [value, buyer, itemName, dateMade], (error) => {
                if (error) {
                  return reject("Error 5");
                }
                pool.query(
                  "UPDATE AuctionHouse.Bids SET isHighestBid = 0 WHERE itemName = ? AND value < ?", [itemName, value], (error) => {
                    if (error) {
                      return reject("Error 6");
                    }
                    return resolve("Bid Placed Successfully");
                  }
                );
              }
            );
          }
        }
      );
    });
  };
  
  

  try {
    const review = await placeBids(event.value, event.buyer, event.itemName, event.dateMade);
    return {
      statusCode: 200,
      result: review,
      value: event.value,
      buyer: event.buyer,
      itemName: event.itemName,
      dateMade: event.dateMade
    };
  } catch (error) {
    const statusCode = 400;
    return {
      statusCode: statusCode,
      message : "Failed to place Bids",
      error : error
    };
  }


  
};

