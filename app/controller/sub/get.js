'use strict';

module.exports = app => {
  class SubController extends app.Controller {
    * index() {
            // this为 每一个访问到server时实例化的一个全新对象,会有如下几个属性
      const { ctx, config } = this;
      ctx.body = `hi, I am sub controller retrun value, evn: ${config.env}`;
    }
    }
  return SubController;
};
