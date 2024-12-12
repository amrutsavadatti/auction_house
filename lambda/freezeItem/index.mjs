import mysql from 'mysql'

export const handler = async (event) => {
  
  
  var pool = mysql.createPool({
    host: "aucdb.cv0uky8u621r.us-east-2.rds.amazonaws.com",
    user: "aucAdmin",
    password: "aucPassword",
    database: "AuctionHouse"
  });
  
  
  let freeze = (seller, name) => {
    return new Promise((resolve, reject) => {
      pool.query(
      " UPDATE AuctionHouse.Items \
        SET status = ? \
        WHERE status = ? AND sellerOfItem = ? AND name = ?", ['frozen','active', seller, name], (error, rows) => {
          if (error) {
            return reject("Error: ERROR FREEZING ITEM");
          } else {
            return resolve("Item Frozen successfully");
          }
        }
      );
    });
  };

  
  

  try {
    const freezeItem = await freeze(event.seller, event.name);
    return {
      statusCode: 200,
      message: "Successfully Forze item",
    };
  } catch (error) {
    const statusCode = 400;
    return {
      statusCode: statusCode,
      message : "Failed to freeze item",
      error : error
    };
  }


  
};

