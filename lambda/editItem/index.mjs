import mysql from 'mysql'

export const handler = async (event) => {
  
  
  var pool = mysql.createPool({
    host: "aucdb.cv0uky8u621r.us-east-2.rds.amazonaws.com",
    user: "aucAdmin",
    password: "aucPassword",
    database: "AuctionHouse"
  });
  
  
  let editItem = (name, description, image, setPrice, startDate, endDate) => {
    return new Promise((resolve, reject) => {
      pool.query("UPDATE Items SET description=?, figureimageout=?, setPrice=?, publishDate=?, expirationDate=? WHERE name=?", [description, image, setPrice, startDate, endDate, name], (error, rows) => {
        if (error) { 
          return reject("Error: Unable to Edit Item") 
        }
        if ((rows) && (rows.affectedRows == 1)) {
          pool.query("SELECT * FROM AuctionHouse.Items WHERE name = ?", [name], (error, rows) => {
          if (error) {
            return reject("Error");
          }
          return resolve(rows[0])
          }
        );
        } 
        else {
          return reject("Error: Unable to edit item")
        }
      });
    });
  }
  

  try {
    const edited = await editItem(event.name, event.description, event.image, event.setPrice, event.startDate, event.endDate);
    return {
      statusCode: 200,
      name: event.name,
      description: event.description,
      image: event.image,
      setPrice: event.setPrice,
      startDate: event.startDate,
      endDate: event.endDate,
    };
  } catch (error) {
    const statusCode = 400;
    return {
      statusCode: statusCode,
      message : "Failed to edit item"
    };
  }







  
};
