/**
 * 页面转场：金印帷幕（纯 CSS + 原生 JS，零外部依赖）
 *
 * 仅离场有动画：金印徽章显现 → 帷幕交错合拢 → 金粒爆散 → 跳转
 * 入场无动画，直接显示页面。
 */

(function () {
  var DURATION = 700;

  var overlay = document.getElementById('page-trans-overlay');
  if (!overlay) {
    window._navigate = function (url) { window.location.href = url; };
    return;
  }

  var cL = overlay.querySelector('.trans-curtain.left');
  var cR = overlay.querySelector('.trans-curtain.right');
  var gL = overlay.querySelector('.trans-glow-line');
  var seal = overlay.querySelector('.trans-seal');
  var sp = overlay.querySelector('.trans-sparkles');

  // 清除可能残留的入场状态
  if (cL) { cL.style.transform = 'translateX(-100%)'; cL.style.transition = 'none'; }
  if (cR) { cR.style.transform = 'translateX(100%)';  cR.style.transition = 'none'; }
  if (gL) gL.style.opacity = '0';
  if (seal) { seal.style.opacity = '0'; seal.style.transform = 'translate(-50%,-50%) scale(0)'; }
  if (sp) sp.innerHTML = '';

  // 从 bfcache 恢复时，重新打开帷幕（否则会卡在关闭的黑幕上）
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      if (cL) { cL.style.transition = 'none'; cL.style.transform = 'translateX(-100%)'; }
      if (cR) { cR.style.transition = 'none'; cR.style.transform = 'translateX(100%)'; }
      if (gL) gL.style.opacity = '0';
      if (seal) { seal.style.opacity = '0'; seal.style.transform = 'translate(-50%,-50%) scale(0)'; }
      if (sp) sp.innerHTML = '';
    }
  });

  // ========== 离场 ==========
  window._navigate = function (url) {
    // 记录来源页，供返回按钮使用（referrer 不可靠）
    try { sessionStorage.setItem('_prev', window.location.href); } catch (e) {}

    // 安全网：2 秒后强制跳转，防止动画卡死
    var safety = setTimeout(function () {
      window.location.href = url;
    }, 2000);

    // 让页面有机会清理重资源（如地图）
    if (window._beforeExit) window._beforeExit();

    // 金印显现
    if (seal) {
      seal.style.transition = 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease-out';
      seal.style.transform = 'translate(-50%,-50%) scale(1)';
      seal.style.opacity = '1';
    }

    setTimeout(function () { doClose(url, safety); }, seal ? 380 : 0);
  };

  function doClose(url, safety) {
    if (gL) { gL.style.transition = 'opacity 0.3s ease-out'; gL.style.opacity = '1'; }
    if (cL) { cL.style.transition = 'transform 0.7s cubic-bezier(0.76,0,0.24,1)'; cL.style.transform = 'translateX(0)'; }
    if (cR) { cR.style.transition = 'transform 0.7s cubic-bezier(0.76,0,0.24,1)'; cR.style.transform = 'translateX(0)'; }
    spawnSparkles(20);

    setTimeout(function () {
      clearTimeout(safety);
      sessionStorage.setItem('_pt', '1');
      window.location.href = url;
    }, 750);
  }

  function spawnSparkles(count) {
    if (!sp) return;
    var html = '';
    for (var i = 0; i < count; i++) {
      var size = 3 + Math.random() * 5;
      var left = 42 + Math.random() * 16;
      var top = 10 + Math.random() * 80;
      var sx = (Math.random() - 0.5) * 160;
      var sy = (Math.random() - 0.5) * 240;
      var delay = Math.random() * 0.2;
      html += '<div class="trans-sparkle" style="' +
        'width:' + size + 'px;height:' + size + 'px;' +
        'left:' + left + '%;top:' + top + '%;' +
        'animation-delay:' + delay + 's;' +
        '--sx:' + sx + 'px;--sy:' + sy + 'px;' +
        'box-shadow:0 0 ' + (4 + Math.random() * 8) + 'px ' + (1 + Math.random() * 2) + 'px rgba(212,168,83,0.7)' +
        '"></div>';
    }
    sp.innerHTML = html;
    setTimeout(function () { sp.innerHTML = ''; }, 1000);
  }

  // ========== 拦截 <a> 内部导航 ==========
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (href && href.charAt(0) !== '#' && href.indexOf('javascript:') !== 0 && href.indexOf('http') !== 0 && href.indexOf('//') !== 0) {
      e.preventDefault();
      window._navigate(href);
    }
  });
})();
