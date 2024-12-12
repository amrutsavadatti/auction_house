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
  
  let sort = (sorter) => {
    return new Promise((resolve, reject) => {
      if(sorter == "finalSalePrice"){
        pool.query("SELECT * FROM AuctionHouse.Items WHERE boughtByBuyer IS NOT NULL ORDER BY finalSalePrice", [], (error, rows) => {
          if (error) { 
            return reject(error) 
          }
          if ((rows)) {
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
            else{
              return resolve([]);
            }
          }
          return reject(error); 
        });
      }
      if(sorter == "publishDate"){
        pool.query("SELECT * FROM AuctionHouse.Items WHERE boughtByBuyer IS NOT NULL ORDER BY publishDate", [], (error, rows) => {
          if (error) { 
            return reject(error) 
          }
          if ((rows)) {
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
            else{
              return resolve([]);
            }
          }
          return reject(error); 
        });
      }
      if(sorter == "expirationDate"){
        pool.query("SELECT * FROM AuctionHouse.Items WHERE boughtByBuyer IS NOT NULL ORDER BY expirationDate", [], (error, rows) => {
          if (error) { 
            return reject(error) 
          }
          if ((rows)) {
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
            else{
              return resolve([]);
            }
          }
          return reject(error); 
        });
      }
    });
  }
  

  try {
    const review = await sort(event.sorter);
    return {
      statusCode: 200,
      items: review
    };
  } catch (error) {
    const statusCode = 400;
    return {
      statusCode: statusCode,
      message : "Failed to review items",
      error : error
    };
  }


  
};

