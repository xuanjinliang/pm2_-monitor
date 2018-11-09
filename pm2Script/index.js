/**
 * Created by xuanjinliang on 2018/10/25.
 */

const pm2 = require("pm2");

async function getPm2List() {
  try {
    return await new Promise((resolve, reject) => {
      pm2.list((err, processDescriptionList) => {
        if(err){
          reject(err);
        }
        pm2.disconnect();
        resolve(processDescriptionList)
      });
    });
  }catch (err) {
    if(err){
      throw err;
    }
  }
}

module.exports = {
  getPm2List
};
