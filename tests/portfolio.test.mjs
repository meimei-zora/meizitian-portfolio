import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import vm from 'node:vm';
import { spawn } from 'node:child_process';

const context = { window: {} };
vm.runInNewContext(await readFile(new URL('../dist/content.js', import.meta.url), 'utf8'), context);
const data = context.window.PORTFOLIO;

test('能力入口保持指定名称，所有二级分类都有独立地址', () => {
  assert.deepEqual(Array.from(data.categories, c => c.title), ['需求洞察与方案判断', '设计转化与制作落地', '信息整理与协同推进', '创意构建与视觉表达']);
  const items = data.categories.flatMap(c => c.items);
  assert.equal(items.length, 12);
  assert.equal(new Set(items.map(item => item.id)).size, 12);
  assert.ok(data.categories.every(c => c.items.length === 3));
});

test('每个项目只有一个完整定义，十二个入口都有真实关联', () => {
  const items = data.categories.flatMap(c => c.items);
  assert.equal(new Set(data.projects.map(p => p.id)).size, data.projects.length);
  assert.ok(items.every(item => !Object.hasOwn(item, 'projects')));
  for (const item of items) assert.ok(data.projects.some(p => Object.hasOwn(p.abilities, item.id)), item.title);
  for (const project of data.projects) {
    assert.ok(project.role && project.status && project.type && project.sections.length);
    for (const [ability, section] of Object.entries(project.abilities)) {
      assert.ok(items.some(item => item.id === ability), ability);
      assert.ok(project.sections.some(item => item.id === section), `${project.id}:${section}`);
    }
  }
});

test('联系信息使用本人确认值，业务状态没有升级为最终交付', () => {
  assert.equal(data.contact.email, '18756369719@163.com');
  assert.equal(data.contact.wechatId, '18756369719');
  for (const field of ['phone', 'wechat', 'resume']) assert.equal(data.contact[field], '');
  assert.match(data.projects.find(p => p.id === 'lebanon').status, /未完成验收/);
  assert.match(data.projects.find(p => p.id === 'india').status, /未核实/);
  assert.match(data.projects.find(p => p.id === 'woven').status, /没有再次试穿/);
  assert.match(data.projects.find(p => p.id === 'songjian').status, /目标.*没有实际业绩/);
  assert.ok(data.honors.every(h => !/跳呱|像素鲸|服装设计大赛/.test(h.name)));
  assert.ok(!data.projects.some(p => /像素鲸|琥珀/.test(p.name)));
});

test('所有首页、分类、项目及段落标题都有对应英文', () => {
  const titles = ['梅子甜', '个人作品集', '能力分类', '获奖与荣誉', '技能', '联系我', '我的职责', '主要交付', '产出与当前状态'];
  data.categories.forEach(category => titles.push(category.title, ...category.items.map(item => item.title)));
  data.skills.forEach(skill => titles.push(skill.title));
  for (const project of data.projects) {
    titles.push(project.name);
    for (const section of project.sections) {
      titles.push(section.title);
      for (const block of section.blocks.filter(block => block.type === 'timeline')) titles.push(...block.items.map(item => item.title));
    }
  }
  for (const title of titles) assert.match(data.headingEnglish[title] || '', /[A-Za-z]/, title);
});

test('鼠标粒子尊重减少动态效果和触摸设备，WebGL不可用时不影响页面', async () => {
  const source = await readFile(new URL('../dist/swarm-cursor.js', import.meta.url), 'utf8');
  const run = (reduced, mouse) => {
    let created = 0;
    let removed = 0;
    vm.runInNewContext(source, {
      matchMedia: query => ({ matches: query.includes('reduced-motion') ? reduced : mouse, addEventListener() {} }),
      window: { addEventListener() {} },
      document: {
        body: { append() {} },
        createElement: () => { created++; return { setAttribute() {}, getContext: () => null, remove() { removed++; } }; }
      }
    });
    return { created, removed };
  };
  assert.deepEqual(run(true, true), { created: 0, removed: 0 });
  assert.deepEqual(run(false, false), { created: 0, removed: 0 });
  assert.deepEqual(run(false, true), { created: 1, removed: 1 });
});

function mediaPaths(value) {
  if (Array.isArray(value)) return value.flatMap(mediaPaths);
  if (value && typeof value === 'object') return Object.entries(value).flatMap(([key, child]) => ['src','poster'].includes(key) ? [child] : mediaPaths(child));
  return [];
}

test('全部图片与视频存在，展示数据不引用本机原路径', async () => {
  const paths = [...new Set(mediaPaths(data))];
  assert.ok(paths.length > 35);
  for (const file of paths) {
    assert.match(file, /^assets\//);
    assert.ok(!file.includes('..'));
    assert.ok((await stat(new URL(`../dist/${file}`, import.meta.url))).size > 0, file);
  }
  assert.ok(!/[A-Z]:[\\/]|file:\/\//i.test(JSON.stringify(data)));
});

let server;
before(async () => {
  server = spawn(process.execPath, ['server.mjs'], { cwd: new URL('../', import.meta.url), env: { ...process.env, PORT: '4184' }, windowsHide: true });
  await new Promise((resolve, reject) => {
    server.stdout.once('data', resolve);
    server.once('error', reject);
    server.once('exit', code => reject(new Error(`Preview server exited: ${code}`)));
  });
});
after(() => server?.kill());

test('首页、视频封面与静态资源都可在本地加载', async () => {
  for (const file of ['/', '/styles.css', '/app.js', '/content.js', '/swarm-cursor.js', '/react-bits-LICENSE.txt', '/assets/intro-poster.jpg']) {
    const response = await fetch(`http://127.0.0.1:4184${file}`);
    assert.equal(response.status, 200, file);
    assert.ok(Number(response.headers.get('content-length')) > 0);
    await response.arrayBuffer();
  }
});

test('视频支持字节范围请求和非法范围校验，移动端可定位播放', async () => {
  for (const file of mediaPaths(data).filter(file => file.endsWith('.mp4'))) {
    const response = await fetch(`http://127.0.0.1:4184/${file}`, { headers: { Range: 'bytes=0-1023' } });
    assert.equal(response.status, 206, file);
    assert.equal(response.headers.get('content-type'), 'video/mp4');
    assert.match(response.headers.get('content-range'), /^bytes 0-1023\/\d+$/);
    assert.equal((await response.arrayBuffer()).byteLength, 1024);
  }
  const invalid = await fetch('http://127.0.0.1:4184/assets/intro.mp4', { headers: { Range: 'bytes=999999999-' } });
  assert.equal(invalid.status, 416);
});

test('缺失资源明确返回 404，项目源文件不对外提供', async () => {
  assert.equal((await fetch('http://127.0.0.1:4184/missing.png')).status, 404);
  assert.equal((await fetch('http://127.0.0.1:4184/server.mjs')).status, 404);
});
