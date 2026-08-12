/**
 * 详情页逻辑
 *
 * 从 URL 参数 ?id= 读取景点 id，在 data.js 中查找并渲染。
 */

(function () {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);

  const spot = spots.find(s => s.id === id);

  if (!spot) {
    document.getElementById('detail-container').innerHTML =
      '<p style="text-align:center;padding:4rem;color:#999">未找到该景点信息</p>';
    return;
  }

  document.getElementById('detail-title').textContent = spot.name;
  document.getElementById('detail-intro').textContent = spot.intro;

  var bodyEl = document.getElementById('detail-body');
  var detailText = spot.detail;

  // 逐字显现效果
  bodyEl.innerHTML = '';
  var frag = document.createDocumentFragment();
  for (var i = 0; i < detailText.length; i++) {
    var span = document.createElement('span');
    span.textContent = detailText[i];
    span.style.opacity = '0';
    span.style.display = 'inline';
    frag.appendChild(span);
  }
  bodyEl.appendChild(frag);

  // anime.js 驱动逐字淡入
  if (typeof anime !== 'undefined') {
    anime({
      targets: bodyEl.querySelectorAll('span'),
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 40,
      delay: anime.stagger(15),
      easing: 'easeOutQuad'
    });
  } else {
    var spans = bodyEl.querySelectorAll('span');
    for (var j = 0; j < spans.length; j++) {
      spans[j].style.opacity = '1';
    }
  }

  // 半透明 hero 背景图
  var heroImg = document.getElementById('detail-img');
  if (heroImg && spot.image) {
    heroImg.style.backgroundImage = 'url("' + spot.image + '")';
  }

  // 饮食景点：添加烧烤文化入口
  if (spot.type === 'food') {
    var container = document.getElementById('detail-container');
    if (container) {
      var banner = document.createElement('a');
      banner.className = 'bbq-banner';
      banner.href = 'bbq-culture.html';
      banner.innerHTML =
        '<span class="bbq-banner-icon">🔥</span>' +
        '<span class="bbq-banner-text">' +
          '<strong>齐齐哈尔烤肉文化</strong>' +
          '<small>烤得香，也要烤得对 · 安全指南</small>' +
        '</span>' +
        '<span class="bbq-banner-arrow">→</span>';
      container.appendChild(banner);
    }
  }

  // 返回按钮：用浏览器历史回退，支持多级返回
  var backBtn = document.getElementById('detail-back');
  if (backBtn) {
    backBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (history.length > 1) {
        history.back();
      } else {
        window.location.href = 'index.html';
      }
    });
  }
})();
