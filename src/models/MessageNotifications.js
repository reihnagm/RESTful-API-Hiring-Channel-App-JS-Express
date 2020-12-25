const connection = require('../configs/db');

module.exports = {
  
  getNotifications: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM message_notifications`;
      connection.query(query, (error,result) => {
        if(error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  }, 
  
  sendNotifications: (data) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO message_notifications SET ?`;
      connection.query(query, data, (error, result) => {
        if(error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      });
    });
  }

}