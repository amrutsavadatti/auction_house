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
  
  let requestUnfreezeItem = (itemName, seller) => {
    return new Promise((resolve, reject) => {
      pool.query("INSERT INTO AuctionHouse.Requests (itemName, seller) VALUES(?, ?)", [itemName, seller], (error, rows) => {
        if (error) { 
          return reject(error) 
        }
        if ((rows)) {
          return resolve("Successfully requested to unfreeze item")
        } 
        else {
          return reject(error)
        }
      });
    });
  }
  

  try {
    const review = await requestUnfreezeItem(event.itemName, event.seller);
    return {
      statusCode: 200,
      items: review
    };
  } catch (error) {
    const statusCode = 400;
    return {
      statusCode: statusCode,
      message : "Failed to request unfreeze",
      error : error
    };
  }


  
};
