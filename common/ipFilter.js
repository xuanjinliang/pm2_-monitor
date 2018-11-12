/**
 * Created by xuanjinliang on 2018/11/12.
 */

let config = require('./config');

function setIpFilter(ctx){

  let req = ctx.request,
    ipReg = config.productIpList,
    ip = (req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.ip || (req.connection && req.connection.remoteAddress)).toString().split(',')[0].trim();

  if(process.env.NODE_ENV === config.DEV){
    ipReg = config.devIpList;
  }else if(process.env.NODE_ENV === config.TEST){
    ipReg = config.testIpList;
  }

  return ipReg.find((str) => ip.match(str));
}

module.exports = setIpFilter;
