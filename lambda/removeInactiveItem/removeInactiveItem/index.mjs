import mysql from 'mysql'

export const handler = async (event) => {
  
  var pool = mysql.createPool({
    host: "aucdb.cv0uky8u621r.us-east-2.rds.amazonaws.com",
    user: "aucAdmin",
    password: "aucPassword",
    database: "AuctionHouse"
  });
  
  let removeInactiveItem = (itemName, seller) => {
    return new Promise((resolve, reject) => {
      pool.query("DELETE FROM AuctionHouse.Items WHERE name=? AND sellerOfItem=? AND status=?", [itemName, seller, "inactive"], (error, rows) => {
        if (error) { 
          return reject("Error: Failed to Remove Item. Item is active") 
        }
        if (rows.affectedRows > 0) {
          return resolve("Successfully removed item")
        } 
        else {  
          return reject("Error: Failed to Remove Item. Item is active")
        }
      });
    });
  }


  try {
    const result = await removeInactiveItem(event.itemName, event.seller);
    return {
      statusCode: 200,
      body: result
    };
  } catch (error) {
    const statusCode = 404;
    return {
      statusCode: statusCode,
      message : "Failed to remove inactive item",
      error: error
    };
  }
  
  
};

