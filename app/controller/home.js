'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      // this为 每一个访问到server时实例化的一个全新对象,会有如下几个属性: app, ctx, service, config, logger
      const { _app, ctx } = this;
      ctx.logger.debug('debug logger');
      ctx.logger.info('info logger');
      ctx.logger.warn('warn logger');
      ctx.logger.error('error logger');

      console.log('_app === app', _app === app); // false
      ctx.body = `hi, egg, bar: ${app.bar}; ctx的foo方法返回值: ` + ctx.foo({ name: 'weixiao' });
    }

    * fn_get() {
      const { ctx } = this;
      console.log(ctx.query);
      ctx.body = JSON.stringify(ctx.query);
    }

    * getData() {
      const data = { status: 0, msg: 'ok', obj: this.ctx.request.body };
      this.ctx.body = JSON.stringify(data);
    }
  }
  return HomeController;
};
