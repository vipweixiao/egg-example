'use strict';

const BAR = Symbol('Application#bar');

module.exports = {
  get bar() {
        // this 就是app对象, 在其中可以调用app上的其他方法或属性
    if (!this[BAR]) {
      this[BAR] = this.config.env;
    }

    return this[BAR];
  },
};
