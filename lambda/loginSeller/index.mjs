import mysql from 'mysql'

export const handler = async (event) => {
  
  
  var pool = mysql.createPool({
    host: "aucdb.cv0uky8u621r.us-east-2.rds.amazonaws.com",
    user: "aucAdmin",
    password: "aucPassword",
    database: "AuctionHouse"
  });
  
  
  let loginSeller = (email, password) => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM AuctionHouse.Sellers WHERE username=? AND password=? AND isActive=1", [email, password], (error, rows) => {
        if (error) { 
          return reject("Error: Seller Not Found") 
        }
        if ((rows) && (rows.length == 1)) {
          pool.query("SELECT username FROM AuctionHouse.Sellers WHERE username = ?", [email], (error, rows) => {
            if (error) {
              return reject("Error: Failed");
            }
            return resolve(rows[0])
            }
          )
        } 
        else {  
          return reject("Error: Seller Not Found")
        }
      });
    });
  }


  try {
    const user = await loginSeller(event.email, event.password);
    return {
      statusCode: 200,
      userid: event.email
    };
  } catch (error) {
    const statusCode = 404;
    return {
      statusCode: statusCode,
      body: JSON.stringify({"Error" : "Failed"}),
      message : "Failed to login"
    };
  }
  
  
};
