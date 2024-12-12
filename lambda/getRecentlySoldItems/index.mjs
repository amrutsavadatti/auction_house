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
  
  let getItems = () => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM AuctionHouse.Items WHERE boughtByBuyer IS NOT NULL", [], (error, rows) => {

        if (error) { 
          return reject(error) 
        }

         let currentDateTime = new Date();
         let last24 = new Date();
         last24.setHours(currentDateTime.getHours() - 24);
 
         const soldItems = rows.filter(row => {
           let rowExpirationDate = row.expirationDate;
           return rowExpirationDate > last24 && rowExpirationDate <= currentDateTime;
         });
 
         if (soldItems.length > 0) {
           return resolve(soldItems);
         }
         else {
           return resolve([]);
         }
         return reject(error);
       });
     });
   };
  

  try {
    const items = await getItems();
    return {
      statusCode: 200,
      items: items
    };
  } catch (error) {
    const statusCode = 400;
    return {
      statusCode: statusCode,
      message : "Failed to get recently sold items",
      error : error
    };
  }


  
};

