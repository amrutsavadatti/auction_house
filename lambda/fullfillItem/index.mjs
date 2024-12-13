import mysql from 'mysql'

export const handler = async (event) => {
  

  var pool = mysql.createPool({
    host: "aucdb.cv0uky8u621r.us-east-2.rds.amazonaws.com",
    user: "aucAdmin",
    password: "aucPassword",
    database: "AuctionHouse"
  });

  
  let fulfillItem = (itemName, seller) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT value, buyer FROM AuctionHouse.Bids WHERE isHighestBid=? AND itemName=?", ["1", itemName], (error, rows) => {
        if (error) { 
          return reject(error) 
        }
        if ((rows)) {
          const salePrice = Number(rows[0].value)
          const buyer = rows[0].buyer

          pool.query("UPDATE AuctionHouse.Buyers SET funds=funds-? WHERE username=?", [salePrice, buyer], (error, rows) => {
              if (error) {
                return reject(error);
              }
            }
          );

          pool.query("UPDATE AuctionHouse.Sellers SET funds=funds+? WHERE username=?", [salePrice, seller], (error, rows) => {
            if (error) {
              return reject(error);
            }
          }
        );

          pool.query("UPDATE AuctionHouse.Items SET boughtByBuyer=?, finalSalePrice=? WHERE sellerOfItem=? AND name=?", [buyer, salePrice, seller, itemName], (error, rows) => {
            if (error) {
              return reject(error);
            }
          }
        );

          pool.query("UPDATE AuctionHouse.Bids SET isHighestBid=? WHERE itemName=? AND buyer=?", ["0", itemName, buyer], (error, rows) => {
            if (error) {
              return reject(error);
            }
          }
        );

          pool.query("UPDATE AuctionHouse.Items SET status=? WHERE name=? AND sellerOfItem=?", ["archived", itemName, seller], (error, rows) => {
            if (error) {
              return reject(error);
            }
            return resolve("Item Fulfilled")
          }
        );

        } 
        else {
          return reject(error)
        }
      });
    });
  }






  let fulfillItemBuyNow = (itemName, seller) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT setPrice, buyNowBuyer FROM AuctionHouse.Items WHERE name=? AND sellerOfItem=?", [itemName, seller], (error, rows) => {
        if (error) { 
          return reject(error) 
        }
        if ((rows)) {
          const salePrice = Number(rows[0].setPrice)
          const buyer = rows[0].buyNowBuyer

          pool.query("UPDATE AuctionHouse.Buyers SET funds=funds-? WHERE username=?", [salePrice, buyer], (error, rows) => {
              if (error) {
                return reject(error);
              }
            }
          );

          pool.query("UPDATE AuctionHouse.Sellers SET funds=funds+? WHERE username=?", [salePrice, seller], (error, rows) => {
            if (error) {
              return reject(error);
            }
          }
        );

          pool.query("UPDATE AuctionHouse.Items SET boughtByBuyer=?, finalSalePrice=? WHERE sellerOfItem=? AND name=?", [buyer, salePrice, seller, itemName], (error, rows) => {
            if (error) {
              return reject(error);
            }
          }
        );

          pool.query("UPDATE AuctionHouse.Items SET status=? WHERE name=? AND sellerOfItem=?", ["archived", itemName, seller], (error, rows) => {
            if (error) {
              return reject(error);
            }
            return resolve("Item Fulfilled")
          }
        );

        } 
        else {
          return reject(error)
        }
      });
    });
  }
  











  

  try {
    if(event.buyNow === "1"){
      const review = await fulfillItemBuyNow(event.itemName, event.seller);
    }
    else{
      const review = await fulfillItem(event.itemName, event.seller);
    }
    return {
      statusCode: 200,
      result: review
    };
  } catch (error) {
    const statusCode = 400;
    return {
      statusCode: statusCode,
      message : "Failed to fulfill item",
      error : error
    };
  }


  
};

