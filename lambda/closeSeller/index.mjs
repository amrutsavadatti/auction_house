import mysql from 'mysql'

export const handler = async (event) => {
  
  
  var pool = mysql.createPool({
    host: "aucdb.cv0uky8u621r.us-east-2.rds.amazonaws.com",
    user: "aucAdmin",
    password: "aucPassword",
    database: "AuctionHouse"
  });
  
  
  let closeSeller = (email) => {
    return new Promise((resolve, reject) => {
      pool.query("UPDATE AuctionHouse.Sellers SET isActive=0 WHERE username=? AND isActive=1", [email], (error, rows) => {
        if (error) { 
          return reject("Error: Seller Not Found") 
        }
        if ((rows) && (rows.affectedRows == 1)) {
          return resolve("Seller Account Closed Successfully")
        } 
        else {  
          return reject("Error: Seller Not Found")
        }
      });
    });
  }
  

  try {
    const email = await closeSeller(event.email);
    return {
      statusCode: 200,
      message: "Account closed successfully"
    };
  } catch (error) {
    const statusCode = 400;
    return {
      statusCode: statusCode,
      message : "Failed to close account"
    };
  }

  
};