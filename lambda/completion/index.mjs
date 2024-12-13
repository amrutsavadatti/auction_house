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

  let checkCompletion = () => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM AuctionHouse.Items WHERE status=?", ["active"], (error, rows) => {
        if (error) { 
          return reject("Error") 
        }

        if (rows.length === 0) {
          return resolve("No Items Returned");
        }

        let expired = false;

          for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let rowName = rows[i].name;
            let rowSellerOfItem = rows[i].sellerOfItem;
            let rowExpirationDate = rows[i].expirationDate; // "2024-11-29T18:27:00.000Z"
            let currentDateTime = new Date()                // "2024-11-21T02:58:15.282Z"

            if(currentDateTime > rowExpirationDate){
              expired = true;
              pool.query("SELECT * FROM AuctionHouse.Bids WHERE itemName=?", [rowName], (error, rows) => {
                if (error) { 
                  return reject("Error 1") 
                }
                if(rows.length > 0){
                  pool.query("UPDATE AuctionHouse.Items SET status=? WHERE name=? AND sellerOfItem=?", ["completed", rowName, rowSellerOfItem], (error, rows) => {
                    if(error){
                      return reject("Error 2")
                    }
                    if(rows.affectedRows > 0){
                      return resolve("Done")
                    }
                    else{
                      return reject("Error 3")
                    }
                  })
                }
                else{
                  pool.query("UPDATE AuctionHouse.Items SET status=? WHERE name=? AND sellerOfItem=?", ["failed", rowName, rowSellerOfItem], (error, rows) => {
                    if(error){
                      return reject("Error 4")
                    }
                    if(rows.affectedRows > 0){
                      return resolve("Done")
                    }
                    else{
                      return reject("Error 5")
                    }
                  })
                }
              });
            }
          }
          if (!expired) {
            return resolve("No Items to Modify");
          }
      });
    });
  }


  let checkCompletionFrozen = () => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM AuctionHouse.Items WHERE status=?", ["frozen"], (error, rows) => {
        if (error) { 
          return reject("Error") 
        }
        if (rows.length === 0) {
          return resolve("No Items Returned");
        }
        let expired = false;
          for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let rowName = rows[i].name;
            let rowSellerOfItem = rows[i].sellerOfItem;
            let rowExpirationDate = rows[i].expirationDate; // "2024-11-29T18:27:00.000Z"
            let currentDateTime = new Date()                // "2024-11-21T02:58:15.282Z"
            if(currentDateTime > rowExpirationDate){
              expired = true;
              pool.query("UPDATE AuctionHouse.Items SET status=?, wasFrozen=? WHERE name=? AND sellerOfItem=?", ["failed", "1", rowName, rowSellerOfItem], (error, rows) => {
                if (error) { 
                  return reject(error) 
                }
                if(rows.affectedRows > 0){
                  return resolve("Done")
                }
                else{
                  return reject(error)
                }
              });
              pool.query("UPDATE AuctionHouse.Bids SET isHighestBid=? WHERE isHighestBid=? AND itemName=?", ["0", "1", rowName], (error, rows) => {
                if (error) { 
                  return reject(error) 
                }
                if(rows.affectedRows > 0){
                  return resolve("Done")
                }
                else{
                  return reject(error)
                }
              });

            }
          }
          if (!expired) {
            return resolve("No Items to Modify");
          }
      });
    });
  }


  // Add and call another function here - DONE
  // Look for frozen items past expiration date, change status to completed - DONE
  // Set isHighestBid for frozen items to 0 - DONE
  // Add wasFrozen column to Items DB (1/0) . Set wasFrozen to 1 here. - DONE
  // Update frontend for fulfill item accordingly




  try {
    const review = await checkCompletion();
    const review2 = await checkCompletionFrozen();
    return {
      statusCode: 200,
      items: review,
      items2: review2
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



