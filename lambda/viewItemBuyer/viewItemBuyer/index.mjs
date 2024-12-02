import mysql from 'mysql';

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

  const viewItem = (itemName) => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT dateMade, value, buyer FROM AuctionHouse.Bids WHERE itemName = ? ORDER BY value DESC",[itemName],(error, rows) => 
      {
          if (error) {
            return reject("Error: Unable to fetch bids");
          }
          if((rows.length > 0)){
            return resolve(rows);
          }
          else{
            return resolve([])
          }
        });
    });
  };

  try {
    const bids = await viewItem(event.itemName);

    return {
      statusCode: 200,
      body: bids,
      message: "Bids retrieved successfully"
    };
  } catch (error) {
    return {
      statusCode: 400,
      message : "Failed to view item",
      error : error
    };
  }
};
