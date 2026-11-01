# 梅子甜 · 个人作品集

中文个人作品集，包含服装设计、结构与纸样、CLO3D模拟、商品企划、业务跟进和视觉作品。四组能力导航关联十二个入口，每个项目保留一个完整详情。

在线作品集：https://meimei-zora.github.io/meizitian-portfolio/

网站使用原生 HTML、CSS、JavaScript，无需安装运行依赖。

## 本地预览

安装 Node.js 24 或更新版本后，在仓库根目录执行：

```sh
npm start
```

访问 `http://127.0.0.1:4173/`。运行检查：

```sh
npm test
```

## 内容与发布

- `dist/content.js`：分类、项目、标题英文、荣誉、技能与联系方式的集中配置。
- `dist/assets/`：网页采用的展示素材。
- `dist/app.js`、`dist/styles.css`：导航、文件夹、全屏详情、图片查看与页面排版。
- `.github/workflows/pages.yml`：检查通过后，将 `dist/` 发布到 GitHub Pages。

推送 `main` 分支会自动更新网站。该仓库仅包含网站代码与展示副本，不包含原始文档、完整聊天、内部素材清单或本机资料路径。

个人作品与照片版权归各自权利人所有。SwarmCursor 使用 React Bits 的原生适配，相关许可见 `dist/react-bits-LICENSE.txt`。
