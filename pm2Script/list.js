/**
 * Created by xuanjinliang on 2018/10/25.
 */

const pm2 = require("pm2");

pm2.list((err, processDescriptionList) => {
  if(err){
    throw err;
  }
  console.log(processDescriptionList);
  pm2.disconnect();
});
