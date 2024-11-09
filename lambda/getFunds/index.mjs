import mysql from 'mysql'

export const handler = async (event) => {
  
  
  var pool = mysql.createPool({
    host: "aucdb.cv0uky8u621r.us-east-2.rds.amazonaws.com",
    user: "aucAdmin",
    password: "aucPassword",
    database: "AuctionHouse"
  });
  
  
    let getFunds = (buyerEmail) => {
      return new Promise((resolve, reject) => {
          pool.query("SELECT funds FROM AuctionHouse.Buyers WHERE username=?", [buyerEmail], (error, rows) => {
          if (error) { 
            return reject("Error: Unable to add funds") 
          }
          if ((rows)) {
            return resolve(rows[0].funds)
          } 
          else {
            return reject("Error: Unable to add funds 2")
          }
        });
      });
    }
    
  const newAmount = await getFunds(event.buyerEmail)
  let result = newAmount
  
  return {
    statusCode: 200,
    body: result
  }
  
};
