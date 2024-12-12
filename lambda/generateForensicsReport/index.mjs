import mysql from 'mysql'

export const handler = async (event) => {
  
  
  var pool = mysql.createPool({
    host: "aucdb.cv0uky8u621r.us-east-2.rds.amazonaws.com",
    user: "aucAdmin",
    password: "aucPassword",
    database: "AuctionHouse"
  });

  
  
  let getMean = () => {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT AVG(finalSalePrice) FROM AuctionHouse.Items WHERE status = 'archived'", (error, rows) => {
          if (error) {
            return reject("Error: Could not fetch mean");
          } else {
            return resolve(rows[0]["AVG(finalSalePrice)"]);
          }
        }
      );
    });
  };

  let getTop = () => {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT * FROM AuctionHouse.Items \
        WHERE status = 'archived' ORDER BY finalSalePrice DESC LIMIT 3; ", (error, rows) => {
          if (error) {
            return reject("Error: Could not fetch Top");
          } else {
            return resolve(rows);
          }
        }
      );
    });
  };

  let getMedian = () => {
    return new Promise((resolve, reject) => {
      pool.query(
      "WITH SortedPrices AS ( \
          SELECT finalSalePrice, ROW_NUMBER() OVER (ORDER BY finalSalePrice) AS RowAsc, \
                 ROW_NUMBER() OVER (ORDER BY finalSalePrice DESC) AS RowDesc \
          FROM AuctionHouse.Items \
          WHERE status = 'archived' AND finalSalePrice IS NOT NULL \
      ) \
      SELECT AVG(finalSalePrice) AS medianSalePrice \
      FROM SortedPrices \
      WHERE RowAsc = RowDesc \
         OR RowAsc + 1 = RowDesc \
         OR RowAsc = RowDesc + 1 ", (error, rows) => {
          if (error) {
            return reject("Error: Could not fetch Median");
          } else {
            return resolve(rows[0]["medianSalePrice"]);
          }
        }
      );
    });
  };

  let getMode = () => {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT finalSalePrice, COUNT(*) AS Frequency \
        FROM Items \
        WHERE status = 'archived' AND finalSalePrice IS NOT NULL \
        GROUP BY finalSalePrice \
        ORDER BY Frequency DESC \
        LIMIT 1; ", (error, rows) => {
          if (error) {
            return reject("Error: Could not fetch Mode");
          } else {
            return resolve(rows);
          }
        }
      );
    });
  };
  
  

  try {
    const mean = await getMean();
    const medianVal = await getMedian();
    const mode = await getMode();
    const top = await getTop();

    return {
      statusCode: 200,
      mean: mean,
      median: medianVal,
      mode: mode,
      top: top,
    };
  } catch (error) {
    const statusCode = 400;
    return {
      statusCode: statusCode,
      message : "Failed to fetch Forensic report",
      error : error
    };
  }
};

