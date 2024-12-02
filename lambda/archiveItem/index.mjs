import mysql from 'mysql'

export const handler = async (event) => {
  
  
  var pool = mysql.createPool({
    host: "aucdb.cv0uky8u621r.us-east-2.rds.amazonaws.com",
    user: "aucAdmin",
    password: "aucPassword",
    database: "AuctionHouse"
  });
  
  
    let archiveItem = (itemName, seller) => {
      return new Promise((resolve, reject) => {
          pool.query("UPDATE AuctionHouse.Items SET status=? WHERE name=? AND sellerOfItem=? AND status=?", ["archived", itemName, seller, "inactive"], (error, rows) => {
          if (error) { 
            return reject("Error: Unable to archive item") 
          }
          if (rows.affectedRows > 0) {
            return resolve(rows)
          } 
          else {
            return reject("Error: Unable to archive item")
          }
        });
      });
    }

    try {
      const archived = await archiveItem(event.itemName, event.seller);
      return {
        statusCode: 200,
        itemName: event.itemName,
        status: "archived"
      };
    } catch (error) {
      const statusCode = 400;
      return {
        statusCode: statusCode,
        message : "Failed to archive item",
        error : error
      };
    }
  
};


