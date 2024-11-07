import mysql from 'mysql'

export const handler = async (event) => {
  
  
  var pool = mysql.createPool({
    host: "aucdb.cv0uky8u621r.us-east-2.rds.amazonaws.com",
    user: "aucAdmin",
    password: "aucPassword",
    database: "AuctionHouse"
  });
  
  
  let insertSeller = (email, password) => {
    return new Promise((resolve, reject) => {
      pool.query("INSERT INTO Sellers (username,password,isActive,funds) VALUES(?,?,1,0)", [email, password], (error, rows) => {
        if (error) { 
          return reject("Error: Username Already Exists") 
        }
        if ((rows) && (rows.affectedRows == 1)) {
          return resolve("Seller Added Successfully")
        } 
        else {
          return reject("Error: Unable to add seller")
        }
      });
    });
  }
  
  const email = await insertSeller(event.email, event.password)
  let result = email
  
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  }
  
};
