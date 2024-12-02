import mysql from 'mysql'

export const handler = async (event) => {
  
  
  var pool = mysql.createPool({
    host: "aucdb.cv0uky8u621r.us-east-2.rds.amazonaws.com",
    user: "aucAdmin",
    password: "aucPassword",
    database: "AuctionHouse"
  });
  
  
    let unpublishItem = (itemName, seller) => {
      return new Promise((resolve, reject) => {
          pool.query("UPDATE AuctionHouse.Items SET status=? WHERE name=? AND sellerOfItem=?", ["inactive", itemName, seller], (error, rows) => {
          if (error) { 
            return reject("Error: Unable to unpublish item") 
          }
          if (rows) {
              return resolve(rows)
          } 
          else {
            return reject("Error: Unable to unpublish item")
          }
        });
      });
    }

    try {
      const unpublished = await unpublishItem(event.itemName, event.seller);
      return {
        statusCode: 200,
        unpublishedItem: event.itemName,
        newStatus: "inactive"
      };
    } catch (error) {
      const statusCode = 400;
      return {
        statusCode: statusCode,
        message : "Failed to unpublish item",
        error : error
      };
    }
  
};


