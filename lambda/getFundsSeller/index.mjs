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
  
    let getFundsSeller = (sellerEmail) => {
      return new Promise((resolve, reject) => {
          pool.query("SELECT funds FROM AuctionHouse.Sellers WHERE username=?", [sellerEmail], (error, rows) => {
          if (error) { 
            return reject("Error: Unable to get funds") 
          }
          if ((rows)) {
            return resolve(rows[0].funds)
          } 
          else {
            return reject("Error: Unable to get funds 2")
          }
        });
      });
    }
    
  const newAmount = await getFundsSeller(event.sellerEmail)
  let result = newAmount
  
  return {
    statusCode: 200,
    funds: result
  }
  
};

