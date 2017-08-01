'use strict';

module.exports = app => {
  app.get('/', 'home.index'); // app/controller/home.js 中的 index方法
  app.get('/sub/get', 'sub.get.index'); // app/controller/sub/get.js 中的 index方法
  app.get('/get', 'home.fn_get');
  app.post('/data', 'home.getData');

};
