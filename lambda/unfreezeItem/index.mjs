import mysql from 'mysql'

export const handler = async (event) => {
  
  
  var pool = mysql.createPool({
    host: "aucdb.cv0uky8u621r.us-east-2.rds.amazonaws.com",
    user: "aucAdmin",
    password: "aucPassword",
    database: "AuctionHouse"
  });

  
  
  let unfreeze = (seller, name) => {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    return new Promise((resolve, reject) => {
      pool.query(
      " UPDATE AuctionHouse.Items \
        SET status = 'active' \
        WHERE status = 'frozen' AND expirationDate > ? AND sellerOfItem = ? AND name = ?", [currentDate, seller, name], (error, rows) => {
          if (error) {
            return reject("Error: ERROR FREEZING ITEM");
          }
            pool.query("DELETE FROM AuctionHouse.Requests WHERE itemName=? AND seller=?", [name, seller], (error, rows) => {
              if(error){
                return reject(error)
              }
              return resolve("Item Frozen successfully");
            })
        }
      );
    });
  };
  
  

  try {
    const review = await unfreeze(event.seller, event.name);
    return {
      statusCode: 200,
      message: "Successfully Un-Forze item",
      review: review
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

