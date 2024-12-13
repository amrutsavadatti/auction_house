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
  
  let getUnfreezeRequests = () => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM AuctionHouse.Requests", [], (error, rows) => {
        if (error) { 
          return reject(error) 
        }
        if ((rows)) {
          return resolve(rows)
        } 
        else {
          return reject(error)
        }
      });
    });
  }
  

  try {
    const review = await getUnfreezeRequests();
    return {
      statusCode: 200,
      items: review
    };
  } catch (error) {
    const statusCode = 400;
    return {
      statusCode: statusCode,
      message : "Failed to get active items",
      error : error
    };
  }


  
};
