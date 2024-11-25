import mysql from 'mysql'

export const handler = async (event) => {
  
  
  var pool = mysql.createPool({
    host: "aucdb.cv0uky8u621r.us-east-2.rds.amazonaws.com",
    user: "aucAdmin",
    password: "aucPassword",
    database: "AuctionHouse"
  });
  

  // NEED TO ADD "AND STATUS = ACTIVE TO QUERY BELOW"
  
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
      pool.query("SELECT i.*, CASE WHEN b.value IS NULL THEN 0 ELSE b.value END AS highestBid FROM AuctionHouse.Items i LEFT JOIN AuctionHouse.Bids b ON i.name = b.itemName AND b.isHighestBid = 1 WHERE i.status = ? AND setPrice >= ? AND setPrice <= ? AND (name LIKE ? OR description LIKE ?)", ["active", lowerBound, upperBound, searchKeyword, searchKeyword], (error, rows) => {
        if (error) { 
          return reject("Error: Unable to get items") 
        }
        if ((rows)) {
          return resolve(rows)
        } 
        else {
          return reject("Error: Unable to get items - 2")
        }
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


