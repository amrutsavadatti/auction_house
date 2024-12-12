import mysql from 'mysql'

export const handler = async (event) => {
  
  
  var pool = mysql.createPool({
    host: "aucdb.cv0uky8u621r.us-east-2.rds.amazonaws.com",
    user: "aucAdmin",
    password: "aucPassword",
    database: "AuctionHouse"
  });
  
  
  let searchItems = (lowerBound, upperBound, keyword) => {
    if(lowerBound == ""){
      lowerBound = "0"
    }
    if(upperBound == ""){
      upperBound = "999999999999999999999999999999999999999999999999999999999999999"
    }
    return new Promise((resolve, reject) => {
      const searchKeyword = `%${keyword}%`;
      if(Number(lowerBound) > Number(upperBound)){
        return resolve([])
      }

      pool.query("SELECT * FROM AuctionHouse.Items WHERE boughtByBuyer IS NOT NULL AND finalSalePrice >= ? AND finalSalePrice <= ? AND (name LIKE ? OR description LIKE ?)", [lowerBound, upperBound, searchKeyword, searchKeyword], (error, rows) => {
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
  }
  

  try {
    const review = await searchItems(event.lowerBound, event.upperBound, event.keyword);
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


