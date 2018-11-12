/**
 * Created by xuanjinliang on 2018/02/23.
 */

const allowDomain = [];

module.exports = {
  DEV: 'development',
  devDomain: ['localhost:9000'].concat(allowDomain),
  devIpList: ['192.168.16.113'],
  TEST: 'test',
  testDomain: allowDomain,
  testIpList: [],
  PRO: 'production',
  productionDomain: allowDomain,
  productIpList: []
};
