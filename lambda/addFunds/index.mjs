import mysql from 'mysql'

export const handler = async (event) => {
  
  
  var pool = mysql.createPool({
    host: "aucdb.cv0uky8u621r.us-east-2.rds.amazonaws.com",
    user: "aucAdmin",
    password: "aucPassword",
    database: "AuctionHouse"
  });
  
  
    let addFunds = (buyerEmail, fundsAmountAdd) => {
      return new Promise((resolve, reject) => {
        if(Number(fundsAmountAdd) < 0){
          return reject("Error: Cannot enter negative amount to add")
        }
        else{
          pool.query("UPDATE AuctionHouse.Buyers SET funds=funds+? WHERE username=?", [fundsAmountAdd, buyerEmail], (error, rows) => {
          if (error) { 
            return reject("Error: Unable to add funds") 
          }
          if ((rows) && (rows.affectedRows == 1)) {
            pool.query(
              "SELECT * FROM AuctionHouse.Buyers WHERE username=?", [buyerEmail], (error, rows) => {
                if (error) {
                  return reject("Error: Unable to find buyer");
                }
                return resolve(rows[0].funds);
              }
            );
          } 
          else {
            return reject("Error: Unable to add funds 2")
          }
        });
      }
      });
    }
    
  const newAmount = await addFunds(event.buyerEmail, event.fundsAmountAdd)
  let result = newAmount
  
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  }
  
};
