/*
 * 注: 测试文件的路径与程序文件的路径无需一致
 */

'use strict';
const mm = require('egg-mock');
const assert = require('assert');
// const fs = require('fs');

// 描述(一般写测试的文件路径,也可随便写),在控制台显示, 方便确定文件位置
describe('test/app/controller/home.test.js', () => {
  let app,
    ctx;
    // Mocha 有五个钩子处理前置后置任务,执行顺序为: before -> beforeEach -> it -> afterEach -> after
    // Mocha 的 before钩子
  before(() => {
        // 创建当前应用的app实例
    app = mm.app();
        // 创建一个ctx实例
        // 等待 app 启动成功, 才执行测试用例
    return app.ready();
  });

  beforeEach(() => {
    ctx = app.mockContext({
      user: {
        name: 'weixiao',
      },
    });
  });

  afterEach(mm.restore);
  after(() => app.close());

    // 测试单元的名称, 通过的话控制台会显示: ✓ should assert
  it('should assert', () => {
    const pkg = require('../../../package.json');
    console.log(app.config.keys);
    assert(app.config.keys.startsWith(pkg.name));
  });

    // get请求
  it('should GET /', () => {
    return app.httpRequest()
            .get('/')
            .expect(200);
  });

    // post请求
  it('should POST /data', function() {
        // 框架默认启动CSRF防护, 此方法用来模拟取CSRF token的过程
    app.mockCsrf();
    console.log(ctx.query);
    return app.httpRequest()
            .post('/data')
            .type('form')
            .send({ // 发送的参数
              name: 'weixiao',
            })
            .expect(200);
  });

    // 一个用例中串行发起多个请求,用 generator 函数
  it('should send multi requests', function* () {
    let value;

    app.mockCsrf();
    yield value = app.httpRequest()
            .post('/data')
            .send({
              name: 'weixiao',
            })
            .expect(200);

        // 返回值的字符串,具体值参见: 底部附录1
    const oRet = JSON.parse(value.response.text);

        // 再发起get请求,参数为上一个请求的结果
    yield value = app.httpRequest()
            .get('/get?name=' + oRet.obj.name)
            .expect(200)
            .expect(`{"name":"${oRet.obj.name}"}`);


        // //把value.response的值写入到1.json文件中
        // fs.writeFile('1.json', JSON.stringify(value.response), function (err){
        //     if(err){
        //
        //     }else{
        //         console.log("writeFile 1.json success!");
        //     }
        // })

  });
});


// 附录1: app.httpRequest()请求返回值value中的value.response对象的值
// const valueRet = {
//   req: {
//     method: 'POST',
//     url: 'http://127.0.0.1:53525/data',
//     data: {
//       name: 'weixiao',
//     },
//     headers: {
//       'user-agent': 'node-superagent/3.5.2',
//       'content-type': 'application/json',
//     },
//   },
//   header: {
//     'set-cookie': [
//       'csrfToken=S_Bl_3xY8U-oAgHmuf_Q0VdO; path=/',
//     ],
//     'content-type': 'text/plain; charset=utf-8',
//     'content-length': '48',
//     'x-frame-options': 'SAMEORIGIN',
//     'x-xss-protection': '1; mode=block',
//     'x-content-type-options': 'nosniff',
//     'x-download-options': 'noopen',
//     'x-readtime': '2',
//     date: 'Tue, 01 Aug 2017 08:43:27 GMT',
//     connection: 'close',
//   },
//   status: 200,
//   text: '{"status":0,"msg":"ok","obj":{"name":"weixiao"}}',
// };

