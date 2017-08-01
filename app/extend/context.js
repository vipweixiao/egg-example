'use strict';

module.exports = {
  foo(param) {
        // this 就是ctx对象,在其中可以调用ctx上的其他方法和属性

    return '我是ctx上的方法foo, param为' + JSON.stringify(param);
  },
};
