(() => {
  'use strict';
  const data = window.PORTFOLIO;
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const english = title => `<span class="heading-en" lang="en">${esc(data.headingEnglish[title])}</span>`;
  const heading = title => `${esc(title)}${english(title)}`;
  document.querySelectorAll('[data-heading]').forEach(element => element.insertAdjacentHTML('beforeend', english(element.dataset.heading)));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const stage = $('#folder-stage');
  const cardsHost = $('#fan-cards');
  const detail = $('#detail-dialog');
  const viewer = $('#image-dialog');
  let selected = null;
  let desired = null;
  let transitionId = 0;
  let currentDetail = null;
  let currentAbility = null;
  let indexReturnFocus = null;
  let detailReturnFocus = null;
  let imageReturnFocus = null;
  let savedScroll = null;
  let imageGroups = new Map();
  let currentImages = [];
  let imageIndex = 0;

  function folderArt(category) {
    const id = category.id;
    return `<svg viewBox="0 0 300 245" aria-hidden="true"><defs>
      <linearGradient id="back-${id}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${category.light}"/><stop offset=".18" stop-color="${category.color}"/><stop offset="1" stop-color="${category.dark}"/></linearGradient>
      <linearGradient id="front-${id}" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="${category.light}"/><stop offset=".45" stop-color="${category.color}" stop-opacity=".88"/><stop offset="1" stop-color="${category.light}"/></linearGradient>
      <linearGradient id="shine-${id}" x1="0" y1="0" x2=".6" y2="1"><stop stop-color="white" stop-opacity=".65"/><stop offset=".18" stop-color="white" stop-opacity=".12"/><stop offset=".75" stop-color="white" stop-opacity="0"/><stop offset="1" stop-color="white" stop-opacity=".35"/></linearGradient>
      <filter id="shadow-${id}" x="-.2" y="-.3" width="1.4" height="1.6"><feGaussianBlur stdDeviation="6"/></filter>
    </defs>
    <ellipse cx="151" cy="226" rx="125" ry="8" fill="${category.dark}" opacity=".22" filter="url(#shadow-${id})"/>
    <path d="M15 214V43Q15 19 39 19H125Q138 19 144 31L151 39H261Q286 39 286 65V214Q286 228 270 228H31Q15 228 15 214Z" fill="url(#back-${id})" stroke="${category.light}" stroke-width="3"/>
    <path d="M21 65V43Q21 25 39 25H123Q135 25 141 37" fill="none" stroke="#fff" stroke-opacity=".65" stroke-width="2" stroke-linecap="round"/>
    <g class="folder-paper"><rect x="39" y="55" width="218" height="139" rx="10" fill="#fff8e7" transform="rotate(-4 150 130)"/><rect x="43" y="59" width="218" height="139" rx="10" fill="#fffdf5" transform="rotate(3 150 130)"/></g>
    <g class="folder-front"><path d="M21 208V83Q21 59 45 59H121Q132 59 138 70L145 76H270Q291 76 291 99V208Q291 228 271 228H41Q21 228 21 208Z" fill="url(#front-${id})" stroke="${category.light}" stroke-width="3"/>
    <path d="M21 208V83Q21 59 45 59H121Q132 59 138 70L145 76H270Q291 76 291 99V208Q291 228 271 228H41Q21 228 21 208Z" fill="url(#shine-${id})" stroke="#fff" stroke-opacity=".55" stroke-width="1.5"/>
    <path d="M28 115V86Q28 66 46 66H118Q128 66 133 74" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="2" stroke-linecap="round"/>
    <path d="M29 193V206Q29 220 45 220H268Q283 220 283 206" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="2" stroke-linecap="round"/></g></svg>`;
  }

  $('#folder-row').innerHTML = data.categories.map((category, index) => `<button class="folder-button" type="button" data-folder="${category.id}" style="--folder-color:${category.color}" aria-expanded="false" aria-controls="fan-cards" aria-label="${category.title}"><span class="folder-art">${folderArt(category)}</span><span class="folder-title">${heading(category.title)}</span><span class="folder-caption" aria-hidden="true"><span class="folder-dot"></span>0${index + 1}<span> / </span><span class="folder-action">点击打开</span></span></button>`).join('');

  function getCategory(id) { return data.categories.find(category => category.id === id); }
  function getItem(id) {
    for (const category of data.categories) {
      const item = category.items.find(item => item.id === id);
      if (item) return { category, item };
    }
    return null;
  }
  function cardLayout(index) {
    const width = stage.clientWidth;
    const mobile = matchMedia('(max-width:700px)').matches;
    const w = mobile ? width - 40 : Math.min(280, width * .255);
    const h = mobile ? 120 : 250;
    return { w, h, x: mobile ? 20 : width * [.22, .5, .78][index] - w / 2, y: mobile ? 24 + index * 132 : stage.clientHeight * (index === 1 ? .105 : .17), rotation: mobile ? 0 : [-8, 0, 8][index] };
  }
  function transform(position, scale = 1) { return `translate(${position.x}px, ${position.y}px) rotate(${position.rotation || 0}deg) scale(${scale})`; }
  function originFor(folder, w, h) {
    const bounds = stage.getBoundingClientRect();
    const art = $(`[data-folder="${folder}"] .folder-art`).getBoundingClientRect();
    return { x: art.left - bounds.left + art.width / 2 - w / 2, y: art.top - bounds.top + art.height * .42 - h / 2, rotation: 0 };
  }
  function stopAnimation(element) {
    const style = getComputedStyle(element);
    const current = { transform: style.transform, opacity: style.opacity };
    element.getAnimations().forEach(animation => animation.cancel());
    return current;
  }
  function updateFolders(id) {
    stage.toggleAttribute('data-expanded', !!id);
    document.querySelectorAll('.folder-button').forEach(button => {
      const open = button.dataset.folder === id;
      button.setAttribute('aria-expanded', String(open));
      button.querySelector('.folder-action').textContent = open ? '点击收起' : '点击打开';
    });
  }
  async function selectFolder(id, { persist = true } = {}) {
    const version = ++transitionId;
    desired = id;
    if (persist && !detail.open) history.replaceState({ ...history.state, portfolio: true, folder: id }, '', location.href);
    const oldCards = [...cardsHost.children];
    const returningFocus = oldCards.includes(document.activeElement);
    if (returningFocus && selected) $(`[data-folder="${selected}"]`).focus({ preventScroll: true });
    oldCards.forEach(card => { card.inert = true; card.setAttribute('aria-hidden', 'true'); });
    await Promise.all(oldCards.map(card => {
      const from = stopAnimation(card);
      const origin = originFor(card.dataset.owner, card.offsetWidth, card.offsetHeight);
      const target = { transform: transform(origin, .18), opacity: 0 };
      Object.assign(card.style, target);
      return card.animate(reduceMotion.matches ? [{ opacity: from.opacity }, { opacity: 0 }] : [from, target], { duration: reduceMotion.matches ? 100 : 250, easing: 'cubic-bezier(.22,1,.36,1)' }).finished.catch(() => {});
    }));
    if (version !== transitionId) return;
    cardsHost.replaceChildren();
    selected = id;
    updateFolders(id);
    if (!id) { $('#folder-status').textContent = '选一个文件夹，看看相关作品。'; return; }
    const category = getCategory(id);
    $('#folder-status').textContent = `${category.title} · 选择一张卡片浏览，按 Escape 收起`;
    category.items.forEach((item, index) => {
      const position = cardLayout(index);
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'fan-card';
      card.dataset.owner = id;
      card.dataset.item = item.id;
      card.setAttribute('aria-label', item.title);
      card.style.cssText = `width:${position.w}px;height:${position.h}px;--folder-color:${category.color};transform:${transform(position)}`;
      card.innerHTML = `<span class="fan-card-inner"><span class="card-top"><span>0${index + 1}</span><span class="card-mark"></span></span><span class="card-title">${heading(item.title)}</span><span class="card-bottom"><span>查看相关作品</span><b aria-hidden="true">↗</b></span></span>`;
      card.addEventListener('click', () => openAbility(item.id, card));
      cardsHost.append(card);
      const origin = originFor(id, position.w, position.h);
      const frames = reduceMotion.matches ? [{ opacity: 0 }, { opacity: 1 }] : [{ transform: transform(origin, .18), opacity: 0 }, { transform: transform(position), opacity: 1 }];
      card.animate(frames, { duration: reduceMotion.matches ? 140 : 560, delay: reduceMotion.matches ? 0 : index * 45, easing: 'cubic-bezier(.22,1.18,.36,1)', fill: 'backwards' });
    });
  }
  document.querySelectorAll('.folder-button').forEach(button => button.addEventListener('click', () => selectFolder(desired === button.dataset.folder ? null : button.dataset.folder)));
  stage.addEventListener('click', event => { if (!event.target.closest('button')) selectFolder(null); });
  new ResizeObserver(() => {
    [...cardsHost.children].forEach((card, index) => {
      if (card.inert) return;
      const position = cardLayout(index);
      stopAnimation(card);
      Object.assign(card.style, { width: `${position.w}px`, height: `${position.h}px`, transform: transform(position), opacity: '1' });
    });
  }).observe(stage);

  function lockPage() {
    if (savedScroll !== null) return;
    savedScroll = window.scrollY;
    Object.assign(document.body.style, { position: 'fixed', top: `-${savedScroll}px`, width: '100%', overflow: 'hidden' });
  }
  function unlockPage() {
    if (savedScroll === null) return;
    const y = savedScroll;
    savedScroll = null;
    Object.assign(document.body.style, { position: '', top: '', width: '', overflow: '' });
    window.scrollTo({ top: y, behavior: 'instant' });
  }
  const projectIndex = $('#project-index');
  function getProject(id) { return data.projects.find(project => project.id === id); }
  function imageAttributes(image) {
    const size = data.mediaSizes?.[image.src];
    return size ? ` width="${size[0]}" height="${size[1]}"` : '';
  }
  function renderIndex(ability) {
    if (currentAbility === ability) return;
    currentAbility = ability;
    projectIndex.hidden = !ability;
    if (!ability) {
      if (indexReturnFocus?.isConnected) indexReturnFocus.focus({ preventScroll: true });
      return;
    }
    const { category, item } = getItem(ability);
    document.title = `${item.title} · 梅子甜`;
    const projects = data.projects.filter(project => Object.hasOwn(project.abilities, ability));
    projectIndex.innerHTML = `<div class="project-index-heading"><div><p class="eyebrow">${category.title}</p><h3 id="project-index-title" tabindex="-1">${heading(item.title)}</h3><p>${item.description}</p></div><button type="button" class="index-close" aria-label="收起项目列表">收起 ×</button></div><div class="project-grid">${projects.map(project => `<button type="button" class="project-card" data-project="${project.id}" aria-label="查看项目：${esc(project.name)}"><span class="project-card-image"><img src="${esc(project.cover.src)}" alt="${esc(project.cover.alt)}"${imageAttributes(project.cover)} loading="lazy" decoding="async"></span><span class="project-card-type">${esc(project.type)}</span><span class="project-card-title"><span>${heading(project.name)}</span><span aria-hidden="true">↗</span></span><span class="project-card-summary">${esc(project.summary)}</span></button>`).join('')}</div>`;
    projectIndex.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.project, button)));
    projectIndex.querySelector('.index-close').addEventListener('click', () => {
      if (history.state?.indexLayer) history.back();
    });
  }
  function openAbility(id, trigger) {
    indexReturnFocus = trigger;
    if (currentAbility !== id) {
      const url = new URL(location.href);
      ['work', 'project', 'section', 'image'].forEach(key => url.searchParams.delete(key));
      url.searchParams.set('ability', id);
      history.pushState({ portfolio: true, folder: selected, ability: id, indexLayer: true }, '', url);
      renderIndex(id);
    }
    projectIndex.scrollIntoView({ behavior: reduceMotion.matches ? 'instant' : 'smooth', block: 'start' });
    $('#project-index-title').focus({ preventScroll: true });
  }
  function mediaFigure(image, group, index) {
    const size = data.mediaSizes?.[image.src];
    const narrow = size && size[0] < 800 ? ` style="--media-width:${size[0]}px"` : '';
    return `<figure class="media-block"${narrow}>${image.label ? `<p class="media-label">${esc(image.label)}</p>` : ''}<button class="media-button" type="button" data-image-group="${group}" data-image-index="${index}" aria-label="放大：${esc(image.alt || image.caption || '作品图片')}"><img src="${esc(image.src)}" alt="${esc(image.alt || image.caption || '')}"${imageAttributes(image)} loading="lazy" decoding="async"></button>${image.caption ? `<figcaption>${esc(image.caption)}</figcaption>` : ''}</figure>`;
  }
  function blockHTML(block, key) {
    if (block.type === 'image' || block.type === 'comparison' || block.type === 'pair') {
      const images = block.type === 'image' ? [block] : block.images;
      imageGroups.set(key, images);
      return block.type === 'image' ? mediaFigure(block, key, 0) : `<div class="media-pair">${images.map((image, index) => mediaFigure(image, key, index)).join('')}</div>`;
    }
    if (block.type === 'video') return `<figure class="media-block"><video class="flow-video" src="${esc(block.src)}" ${block.poster ? `poster="${esc(block.poster)}"` : ''} controls playsinline preload="none" aria-label="${esc(block.caption || '项目视频')}"></video>${block.caption ? `<figcaption>${esc(block.caption)}</figcaption>` : ''}</figure>`;
    if (block.type === 'info') return `<dl class="info-list">${block.rows.map(row => `<div><dt>${esc(row.label)}</dt><dd>${esc(row.value)}</dd></div>`).join('')}</dl>`;
    if (block.type === 'timeline') return `<ol class="project-timeline">${block.items.map((item, index) => `<li><span aria-hidden="true">0${index + 1}</span><div><h3>${heading(item.title)}</h3><p>${esc(item.text)}</p></div></li>`).join('')}</ol>`;
    return '';
  }
  function jumpToSection(id) {
    const target = document.getElementById(`project-section-${id}`);
    if (!target) return;
    const top = target.getBoundingClientRect().top - detail.getBoundingClientRect().top + detail.scrollTop - 96;
    detail.scrollTo({ top, behavior: reduceMotion.matches ? 'instant' : 'smooth' });
    const url = new URL(location.href);
    url.searchParams.set('section', id);
    history.replaceState(history.state, '', url);
    target.querySelector('h2').focus({ preventScroll: true });
  }
  function renderDetail(project) {
    imageGroups = new Map();
    const entry = getItem(currentAbility);
    const tags = Object.entries(project.abilities).map(([id, section]) => `<button type="button" data-section="${section}"${id === currentAbility ? ' aria-current="true"' : ''}>${getItem(id).item.title}</button>`).join('');
    detail.style.setProperty('--detail-accent', entry?.category.color || '#6f795f');
    $('#detail-content').innerHTML = `<div class="detail-topbar"><span>${esc(project.name)}</span><button type="button" id="project-overview">查看完整项目 ↑</button></div><header class="detail-header"><p class="detail-kicker">${esc(project.type)}${project.time ? ` / ${esc(project.time)}` : ''}</p><h1 id="detail-title" tabindex="-1">${heading(project.name)}</h1><p class="detail-description">${esc(project.summary)}</p><div class="ability-tags" aria-label="项目关联能力">${tags}</div>${entry && project.abilities[currentAbility] ? `<button type="button" class="entry-link" data-section="${project.abilities[currentAbility]}">从「${entry.item.title}」进入 · 查看相关段落 ↓</button>` : ''}</header><div class="detail-flow"><div class="project-lead">${blockHTML({ type: 'image', ...project.cover }, 'cover')}</div><dl class="project-overview-meta"><div><dt>我的职责${project.team ? ` / ${esc(project.team)}` : ''}${english('我的职责')}</dt><dd>${esc(project.role)}</dd></div><div><dt>${heading('主要交付')}</dt><dd>${esc(project.deliverables)}</dd></div></dl>${project.sections.map((section, index) => `<section class="project-section" id="project-section-${section.id}"><div class="editorial-copy"><div><p class="eyebrow">0${index + 1}</p><h2 tabindex="-1">${heading(section.title)}</h2></div><div>${section.paragraphs.map(text => `<p>${esc(text)}</p>`).join('')}</div></div>${section.blocks.map((block, bi) => blockHTML(block, `${section.id}-${bi}`)).join('')}</section>`).join('')}<section class="project-status"><h2 class="status-title">${heading('产出与当前状态')}</h2><p>${esc(project.status)}</p></section><div class="detail-end"><span>完整项目 · ${entry ? entry.item.title : '能力作品集'}</span><button type="button" class="text-close" data-close-detail>返回项目列表 ↗</button></div></div>`;
    $('#detail-content').querySelector('[data-close-detail]').addEventListener('click', closeTopLayer);
    $('#project-overview').addEventListener('click', () => {
      detail.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'instant' : 'smooth' });
      const url = new URL(location.href); url.searchParams.delete('section'); history.replaceState(history.state, '', url);
      $('#detail-title').focus({ preventScroll: true });
    });
    detail.querySelectorAll('[data-section]').forEach(button => button.addEventListener('click', () => jumpToSection(button.dataset.section)));
    // All project images form one coherent gallery, regardless of capability entry.
    const allImages = [];
    detail.querySelectorAll('[data-image-group]').forEach(button => {
      const image = imageGroups.get(button.dataset.imageGroup)[Number(button.dataset.imageIndex)];
      button.dataset.imageGroup = project.id;
      button.dataset.imageIndex = allImages.length;
      allImages.push(image);
      button.addEventListener('click', () => openImage(project.id, Number(button.dataset.imageIndex), button));
    });
    imageGroups = new Map([[project.id, allImages]]);
    detail.querySelectorAll('img').forEach(image => image.addEventListener('error', () => {
      image.closest('button').outerHTML = '<p class="media-error">图片暂时无法显示。</p>';
    }));
    detail.scrollTop = 0;
  }
  function openProject(id, trigger) {
    detailReturnFocus = trigger;
    history.replaceState({ ...history.state, portfolio: true, folder: selected }, '', location.href);
    const url = new URL(location.href);
    url.searchParams.set('project', id);
    ['section', 'image'].forEach(key => url.searchParams.delete(key));
    history.pushState({ ...history.state, indexLayer: false, depth: 1 }, '', url);
    syncLayers();
  }
  function openImage(group, index, trigger) {
    imageReturnFocus = trigger;
    const url = new URL(location.href);
    url.searchParams.set('image', `${group}:${index}`);
    history.pushState({ ...history.state, depth: detail.open ? 2 : 1 }, '', url);
    syncLayers();
  }
  function resetZoom() {
    $('#image-canvas').removeAttribute('data-zoomed');
    $('#image-zoom').textContent = '放大 ＋';
    $('#image-zoom').setAttribute('aria-label', '放大图片');
    $('#image-zoom').setAttribute('aria-pressed', 'false');
  }
  function displayImage() {
    const image = currentImages[imageIndex];
    resetZoom();
    const img = $('#viewer-image');
    img.src = image.src;
    img.alt = image.alt || image.caption || '作品图片';
    $('#image-count').textContent = `${imageIndex + 1} / ${currentImages.length}`;
    $('#image-caption').textContent = image.caption || image.label || '';
    $('#image-prev').disabled = imageIndex === 0;
    $('#image-next').disabled = imageIndex === currentImages.length - 1;
  }
  function navigateImage(delta) {
    const next = imageIndex + delta;
    if (next < 0 || next >= currentImages.length) return;
    const url = new URL(location.href);
    const group = url.searchParams.get('image').split(':')[0];
    url.searchParams.set('image', `${group}:${next}`);
    history.replaceState(history.state, '', url);
    imageIndex = next;
    displayImage();
  }
  function toggleZoom() {
    const zoomed = $('#image-canvas').toggleAttribute('data-zoomed');
    $('#image-zoom').textContent = zoomed ? '适应屏幕 −' : '放大 ＋';
    $('#image-zoom').setAttribute('aria-label', zoomed ? '适应屏幕' : '放大图片');
    $('#image-zoom').setAttribute('aria-pressed', String(zoomed));
  }
  function closeTopLayer() { if (viewer.open || detail.open) history.back(); }
  function syncLayers() {
    const url = new URL(location.href);
    const project = getProject(url.searchParams.get('project'));
    const imageParam = url.searchParams.get('image');
    if (!imageParam && viewer.open) {
      viewer.close();
      if (imageReturnFocus?.isConnected) imageReturnFocus.focus({ preventScroll: true });
    }
    if (project) {
      const isNewProject = currentDetail !== project.id;
      if (isNewProject) { renderDetail(project); currentDetail = project.id; }
      if (!detail.open) {
        lockPage();
        detail.showModal();
        $('#detail-title').focus({ preventScroll: true });
        if (url.searchParams.get('section')) requestAnimationFrame(() => jumpToSection(url.searchParams.get('section')));
      }
    } else if (detail.open) {
      if (viewer.open) viewer.close();
      detail.querySelectorAll('video').forEach(video => video.pause());
      detail.close();
      currentDetail = null;
      if (detailReturnFocus?.isConnected) detailReturnFocus.focus({ preventScroll: true });
    }
    if (imageParam) {
      const [group, rawIndex] = imageParam.split(':');
      const images = group === 'wechat' && data.contact.wechat ? [{ src: data.contact.wechat, alt: '梅子甜的微信二维码', caption: '微信二维码' }] : imageGroups.get(group);
      const index = Number(rawIndex);
      if (images && Number.isInteger(index) && images[index]) {
        currentImages = images;
        imageIndex = index;
        displayImage();
        if (!viewer.open) { lockPage(); viewer.showModal(); $('#image-close').focus(); }
      }
    }
    if (!detail.open && !viewer.open) unlockPage();
    document.title = project ? `${project.name} · 梅子甜` : currentAbility ? `${getItem(currentAbility).item.title} · 梅子甜` : '梅子甜 · 个人作品集';
  }
  $('#detail-close').addEventListener('click', closeTopLayer);
  $('#image-close').addEventListener('click', closeTopLayer);
  [detail, viewer].forEach(dialog => dialog.addEventListener('cancel', event => { event.preventDefault(); closeTopLayer(); }));
  $('#image-prev').addEventListener('click', () => navigateImage(-1));
  $('#image-next').addEventListener('click', () => navigateImage(1));
  $('#image-zoom').addEventListener('click', toggleZoom);
  $('#viewer-image').addEventListener('click', toggleZoom);
  document.addEventListener('keydown', event => {
    if (viewer.open && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) { event.preventDefault(); navigateImage(event.key === 'ArrowLeft' ? -1 : 1); }
    else if (event.key === 'Escape' && !detail.open && !viewer.open && desired) { event.preventDefault(); selectFolder(null); }
  });
  window.addEventListener('popstate', () => {
    const ability = new URL(location.href).searchParams.get('ability');
    renderIndex(getItem(ability) ? ability : null);
    syncLayers();
    if (!detail.open && !viewer.open && history.state?.folder !== undefined && history.state.folder !== desired) selectFolder(history.state.folder, { persist: false });
  });

  $('#honors-content').innerHTML = `<div class="honors-head" aria-hidden="true"><span>${heading('名称')}</span><span>${heading('颁发单位或赛事')}</span><span>${heading('等级')}</span><span>${heading('时间')}</span></div>${data.honors.length ? `<div role="list">${data.honors.map(honor => `<div class="honor-row" role="listitem"><span>${esc(honor.name)}${honor.status ? ` · ${esc(honor.status)}` : ''}</span><span>${esc(honor.organizer)}</span><span>${esc(honor.level || '—')}</span><span>${esc(honor.time)}</span></div>`).join('')}</div>` : '<div class="honors-empty"><p>获奖与荣誉资料待确认后补充。</p><span>参赛、入围与获奖，将分别标明。</span></div>'}`;
  $('#skill-groups').innerHTML = data.skills.map((skill, index) => `<section class="skill-group" data-color="${skill.color}"><p class="skill-number" aria-hidden="true">0${index + 1}</p><h3>${heading(skill.title)}</h3><p class="skill-items">${(skill.confirmed.length ? skill.confirmed : skill.pending).map(esc).join(' / ')}</p>${!skill.confirmed.length ? '<p class="skill-pending">预留条目 · 待本人确认</p>' : ''}</section>`).join('');
  const contact = data.contact;
  if (contact.portrait) {
    Object.assign($('#contact-portrait'), contact.portrait, { hidden: false });
    $('#contact').classList.add('has-portrait');
  }
  const contactLinks = [];
  if (contact.email) contactLinks.push(`<a href="mailto:${esc(contact.email)}"><span class="contact-label">邮箱 <span lang="en">Email</span></span><span>${esc(contact.email)} ↗</span></a>`);
  if (contact.phone) contactLinks.push(`<a href="tel:${esc(contact.phone.replace(/[^+\d]/g, ''))}">${esc(contact.phone)} ↗</a>`);
  if (contact.wechatId) contactLinks.push(`<div class="wechat-contact"><span class="contact-label">微信 <span lang="en">WeChat</span></span><div><span id="wechat-id">${esc(contact.wechatId)}</span><button type="button" id="copy-wechat" aria-label="复制微信号">复制</button></div><span id="copy-status" class="copy-status" role="status" aria-live="polite"></span></div>`);
  if (contact.wechat) contactLinks.push('<button type="button" id="wechat-button">微信二维码 ↗</button>');
  if (contact.resume) contactLinks.push(`<a href="${esc(contact.resume)}" download>下载简历 ↓</a>`);
  $('#contact-content').innerHTML = contactLinks.length ? `<div class="contact-links">${contactLinks.join('')}</div>` : '<p class="contact-empty">邮箱、电话、微信与简历，待真实信息补充后开放。</p>';
  $('#wechat-button')?.addEventListener('click', event => openImage('wechat', 0, event.currentTarget));
  $('#copy-wechat')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(contact.wechatId);
      $('#copy-status').textContent = '微信号已复制';
    } catch {
      const range = document.createRange();
      range.selectNodeContents($('#wechat-id'));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      $('#copy-status').textContent = '请复制已选中的微信号';
    }
  });

  const video = $('#intro-video');
  let videoFinished = false;
  let videoFailed = false;
  let playbackTimer;
  function videoButton(icon, label) { $('#video-icon').textContent = icon; $('#video-label').textContent = label; $('#video-toggle').setAttribute('aria-label', `${label}开场视频`); }
  function stopAtEnd() {
    clearTimeout(playbackTimer);
    if (Number.isFinite(video.duration)) video.currentTime = Math.min(data.intro.duration, video.duration - .01);
    video.pause();
    videoFinished = true;
    videoButton('↻', '重新播放');
  }
  function checkVideoEnd() { if (!videoFinished && video.currentTime >= Math.min(data.intro.duration, video.duration) - .025) stopAtEnd(); }
  async function playVideo(restart = false) {
    if (videoFailed) return;
    if (restart || videoFinished) { video.currentTime = 0; videoFinished = false; }
    try { await video.play(); } catch { videoButton('▷', '播放'); }
  }
  if (data.intro.src) {
    video.src = data.intro.src;
    if (data.intro.poster) video.poster = data.intro.poster;
    video.muted = true;
    video.addEventListener('loadedmetadata', () => {
      if (reduceMotion.matches) { video.currentTime = Math.min(.001, video.duration); videoButton('▷', '播放'); }
      else playVideo();
    }, { once: true });
    video.addEventListener('play', () => {
      videoButton('Ⅱ', '暂停');
      clearTimeout(playbackTimer);
      playbackTimer = setTimeout(stopAtEnd, Math.max(0, data.intro.duration - video.currentTime) * 1000);
    });
    video.addEventListener('pause', () => { clearTimeout(playbackTimer); if (!videoFinished && !videoFailed) videoButton('▷', '继续播放'); });
    video.addEventListener('timeupdate', checkVideoEnd);
    video.addEventListener('ended', stopAtEnd);
    video.addEventListener('error', () => { videoFailed = true; $('#video-missing').hidden = false; $('#video-missing p').textContent = '开场视频暂时无法播放'; $('#video-toggle').hidden = true; });
    $('#video-toggle').addEventListener('click', () => { if (!video.paused) { video.pause(); } else playVideo(); });
  } else { video.hidden = true; $('#video-missing').hidden = false; $('#video-toggle').hidden = true; }
  reduceMotion.addEventListener('change', () => { if (reduceMotion.matches) video.pause(); });
  const navObserver = new IntersectionObserver(entries => {
    const active = entries.find(entry => entry.isIntersecting);
    if (!active) return;
    document.querySelectorAll('.site-header nav a').forEach(link => {
      if (link.hash === `#${active.target.id}` || (active.target.id === 'skills' && link.hash === '#about')) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-10% 0px -65% 0px' });
  ['top', 'abilities', 'about', 'skills', 'contact'].forEach(id => navObserver.observe(document.getElementById(id)));

  async function initializeRoute() {
    const original = new URL(location.href);
    const project = getProject(original.searchParams.get('project'));
    const abilityId = original.searchParams.get('ability') || original.searchParams.get('work') || (project && Object.keys(project.abilities)[0]);
    const entry = getItem(abilityId);
    const base = new URL(original);
    ['work', 'ability', 'project', 'section', 'image'].forEach(key => base.searchParams.delete(key));
    history.replaceState({ portfolio: true, folder: entry?.category.id || null }, '', base);
    if (entry) {
      await selectFolder(entry.category.id, { persist: false });
      indexReturnFocus = $(`[data-item="${entry.item.id}"]`);
      const indexURL = new URL(base);
      indexURL.searchParams.set('ability', entry.item.id);
      history.pushState({ portfolio: true, folder: entry.category.id, ability: entry.item.id, indexLayer: true }, '', indexURL);
      renderIndex(entry.item.id);
      projectIndex.scrollIntoView({ behavior: 'instant' });
      if (project) {
        detailReturnFocus = $(`[data-project="${project.id}"]`);
        const projectURL = new URL(indexURL);
        projectURL.searchParams.set('project', project.id);
        if (original.searchParams.get('section')) projectURL.searchParams.set('section', original.searchParams.get('section'));
        history.pushState({ ...history.state, indexLayer: false, depth: 1 }, '', projectURL);
        syncLayers();
        if (original.searchParams.get('image')) {
          projectURL.searchParams.set('image', original.searchParams.get('image'));
          history.pushState({ ...history.state, depth: 2 }, '', projectURL); syncLayers();
        }
      }
    } else if (original.searchParams.get('image')?.startsWith('wechat:') && contact.wechat) {
      history.pushState({ portfolio: true, folder: null, depth: 1 }, '', original); syncLayers();
    }
  }
  initializeRoute();
})();
