/**
 * Created by xuanjinliang on 2018/02/23.
 */

"use strict";
let config = require('./config');

function setCrossOrigin(ctx){

  let req = ctx.request,
    res = ctx.response,
    domainReg = config.productionDomain;

  if(req.app.env === config.DEV){
    domainReg = config.devDomain;
  }

  if(req.headers.origin && domainReg.find((str) => req.headers.origin.match(str))){
    res.set({
      "Access-Control-Allow-Origin": req.headers.origin,
      "Access-Control-Allow-Methods": "POST,GET",
      "Access-Control-Allow-Credentials": "true"
    });
  }

}

module.exports = setCrossOrigin;
