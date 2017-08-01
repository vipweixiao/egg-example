/**
 * Created by weixiao on 17/8/1.
 */

/*
 * 注: 测试文件的路径与程序文件的路径无需一致
 */
'use strict';
const mm = require('egg-mock');
const assert = require('assert');

// 描述(一般写测试的文件路径,也可随便写),在控制台显示, 方便确定文件位置
describe('test/app/controller/sub/get.test.js', () => {
  let app;
  before(() => {
    app = mm.app();
    return app.ready();
  });

  afterEach(mm.restore);
  after(() => app.close());

  it('should assert', () => {
    const pkg = require('../../../../package.json');
    console.log(app.config.keys);
    assert(app.config.keys.startsWith(pkg.name));
  });

    // 测试单元的名称, 通过的话控制台会显示: ✓ should GET /get
  it('should GET /sub/get', () => {
    return app.httpRequest()
            .get('/sub/get')
            // .expect('hi, egg')
            .expect(200);
  });
});
