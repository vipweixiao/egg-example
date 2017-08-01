'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1500630618623_6200';

  // add your config here

  // config.security = {
  //   csrf: {
  //     //关闭csrf安全策略
  //     enable: false,
  //     // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
  //     // ignore: ctx => isInnerIp(ctx.ip),
  //   }
  // };

  config.bodyParser = {
    jsonLimit: '10mb',
  };

  return config;
};
