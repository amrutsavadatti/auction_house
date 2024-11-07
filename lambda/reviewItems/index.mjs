import mysql from 'mysql'

export const handler = async (event) => {
  
  
  var pool = mysql.createPool({
    host: "aucdb.cv0uky8u621r.us-east-2.rds.amazonaws.com",
    user: "aucAdmin",
    password: "aucPassword",
    database: "AuctionHouse"
  });
  
  
  let reviewItems = (seller) => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM Items WHERE sellerOfItem=?", [seller], (error, rows) => {
        if (error) { 
          return reject("Error: Unable to review items") 
        }
        if ((rows)) {
          return resolve(rows)
        } 
        else {
          return reject("Error: Unable to add item")
        }
      });
    });
  }
  

  try {
    const review = await reviewItems(event.seller);
    return {
      statusCode: 200,
      items: review
    };
  } catch (error) {
    const statusCode = 400;
    return {
      statusCode: statusCode,
      message : "Failed to review items"
    };
  }


  
};
