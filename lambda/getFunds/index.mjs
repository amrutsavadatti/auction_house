import mysql from 'mysql'

export const handler = async (event) => {
  
  
  var pool = mysql.createPool({
    host: "aucdb.cv0uky8u621r.us-east-2.rds.amazonaws.com",
    user: "aucAdmin",
    password: "aucPassword",
    database: "AuctionHouse"
  });



  let buyerEmail = event.queryStringParameters?.email
  //const buyerEmail = event['queryStringParameters']['email']
  
  
    let getFunds = (buyerEmail) => {
      return new Promise((resolve, reject) => {
        pool.query(
          "SELECT funds FROM AuctionHouse.Buyers WHERE username=?", [buyerEmail], (error, rows) => {
            if (error) {
              return reject("Error: Unable to retrieve funds");
            }
              return resolve(rows[0].funds);
          }
        );
      });
    }
    
    try {
      const fundsReturn = await getFunds(buyerEmail);
      return {
        statusCode: 200,
        getFunds: fundsReturn,
        message: "good",
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Error"
      };
    }
  
};
