/**
 * Created by xuanjinliang on 2018/11/12.
 */

let config = require('./config');

function setIpFilter(ctx){

  let req = ctx.request,
    domainReg = config.productIpList,
    ip = (req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.ip).toString().split(',')[0].trim();

  if(req.app.env === config.DEV){
    domainReg = config.devIpList;
  }

  if(req.app.env === config.TEST){
    domainReg = config.testIpList;
  }

  return domainReg.find((str) => ip.match(str));
}

module.exports = setIpFilter;
