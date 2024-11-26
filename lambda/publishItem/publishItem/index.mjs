import mysql from 'mysql'

export const handler = async (event) => {
  
  
  var pool = mysql.createPool({
    host: "aucdb.cv0uky8u621r.us-east-2.rds.amazonaws.com",
    user: "aucAdmin",
    password: "aucPassword",
    database: "AuctionHouse"
  });
  
  
    let publishItem = (publishDate, expirationDate, itemName, seller) => {
      return new Promise((resolve, reject) => {
          pool.query("UPDATE AuctionHouse.Items SET status=?, publishDate=?, expirationDate=? WHERE name=? AND sellerOfItem=? AND status=?", ["active", publishDate, expirationDate, itemName, seller, "inactive"], (error, rows) => {
          if (error) { 
            return reject("Error: Unable to publish item") 
          }
          if (rows.affectedRows == 1) {
            pool.query("SELECT * FROM AuctionHouse.Items WHERE name = ? AND sellerOfItem = ?", [itemName, seller], (error, rows) => {
              if (error) {
                return reject("Error: unable to retrieve");
              }
              return resolve(rows[0])
              }
            );
          } 
          else {
            return reject("Error: Unable to publish item")
          }
        });
      });
    }

    try {
      const published = await publishItem(event.publishDate, event.expirationDate, event.itemName, event.seller);
      return {
        statusCode: 200,
        publishedItem: published
      };
    } catch (error) {
      const statusCode = 400;
      return {
        statusCode: statusCode,
        message : "Failed to publish item",
        error : error
      };
    }
  
};

