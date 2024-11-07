import mysql from 'mysql'

export const handler = async (event) => {
  
  
  var pool = mysql.createPool({
    host: "aucdb.cv0uky8u621r.us-east-2.rds.amazonaws.com",
    user: "aucAdmin",
    password: "aucPassword",
    database: "AuctionHouse"
  });
  
  
  let addItem = (name, description, image, setPrice, startDate, endDate, sellerOfItem) => {
    return new Promise((resolve, reject) => {
      pool.query("INSERT INTO Items (name,description,figureimageout,setPrice,publishDate,expirationDate,status,sellerOfItem,boughtByBuyer) VALUES(?,?,?,?,?,?,?,?,null)", [name, description, image, setPrice, startDate, endDate, "inactive", sellerOfItem], (error, rows) => {
        if (error) { 
          return reject("Error: Item Name Already Exists") 
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
          return reject("Error: Unable to add item")
        }
      });
    });
  }
  

  try {
    const added = await addItem(event.name, event.description, event.image, event.setPrice, event.startDate, event.endDate, event.sellerOfItem);
    return {
      statusCode: 200,
      name: event.name,
      description: event.description,
      image: event.image,
      setPrice: event.setPrice,
      startDate: event.startDate,
      endDate: event.endDate,
      sellerOfItem: event.sellerOfItem
    };
  } catch (error) {
    const statusCode = 400;
    return {
      statusCode: statusCode,
      message : "Failed to add item"
    };
  }




  
};
