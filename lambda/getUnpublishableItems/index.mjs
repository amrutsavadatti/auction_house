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
  
    let getUnpublishableItems = () => {
      return new Promise((resolve, reject) => {
          pool.query("SELECT i.name FROM AuctionHouse.Items i LEFT JOIN AuctionHouse.Bids b ON b.itemName = i.name WHERE i.status = 'active' AND b.itemName IS NULL ", ["active"], (error, rows) => {
          if (error) { 
            return reject("Error: Unable to get unpublishable items") 
          }
          if (rows) {
              return resolve(rows)
          } 
          else {
            return reject("Error: Unable to get unpublishable items")
          }
        });
      });
    }

    try {
      const unpublishable = await getUnpublishableItems();
      return {
        statusCode: 200,
        unpublishable: unpublishable
      };
    } catch (error) {
      const statusCode = 400;
      return {
        statusCode: statusCode,
        message : "Failed to get unpublishable items",
        error : error
      };
    }
  
};


