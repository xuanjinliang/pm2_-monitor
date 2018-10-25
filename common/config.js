/**
 * Created by xuanjinliang on 2018/02/23.
 */

const _ = require('lodash'),
  moment = require('moment');

const allowDomain = ['rayjump.com', 'www.heiniubao.com', 'wap.newtank.cn', 'www.ycj1058.cn', 'www.redceph.cn'];

module.exports = {
  DEV: 'development',
  devDomain: ['www.h5ad.com'].concat(allowDomain),
  TEST: 'test',
  testDomain: allowDomain,
  PRO: 'production',
  productionDomain: allowDomain,
  domainSafety: function(referer){
    if(!(_.isString(referer) && referer.trim().length > 0)){
      return false;
    }
    let domainReg = this.productionDomain;

    if(process.env.NODE_ENV === this.DEV){
      domainReg = this.devDomain;
    }else if(process.env.NODE_ENV === this.TEST){
      domainReg = this.testDomain;
    }

    if((/https?:\/\/([^/]+)\//gi).test(referer)){
      const pageHost = RegExp.$1;
      return !!domainReg.find((str) => pageHost.match(str));
    }
    return false;
  },
  responseFormat: (data) => {
    if(_.isObject(data)){
      const info = data && data.msg ? "error" : "success";
      data = _.merge({
        status : 200,
        info : info, //错误是error
        timestamp : moment().format('X')
      }, data);
    }
    return data;
  },
  throwError: (str) => {
    if(!str){
      return;
    }

    let err = new Error(str);
    throw err;
  }
};
