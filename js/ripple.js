/**
 * 鼠标彗星拖尾
 *
 * 鼠标移动时沿路径散落细小的金色光点，光点向上飘散并淡出，
 * 形成彗星般的拖尾效果。
 */

(function () {
  var THROTTLE = 18;   // 节流间隔 ms，控制光点密度
  var last = 0;

  function spawnDot(x, y) {
    var dot = document.createElement('span');
    dot.className = 'trail-dot';
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';

    // 随机尺寸 4~7px
    var size = 4 + Math.random() * 3;
    dot.style.width = size + 'px';
    dot.style.height = size + 'px';
    dot.style.marginLeft = (-size / 2) + 'px';
    dot.style.marginTop = (-size / 2) + 'px';

    // 随机漂移方向（略向上，模拟余烬）
    dot.style.setProperty('--dx', ((Math.random() - 0.5) * 28) + 'px');
    dot.style.setProperty('--dy', (-5 - Math.random() * 20) + 'px');

    document.body.appendChild(dot);
    dot.addEventListener('animationend', function () {
      if (dot.parentNode) dot.parentNode.removeChild(dot);
    });
  }

  window.addEventListener('mousemove', function (e) {
    var now = Date.now();
    if (now - last < THROTTLE) return;
    last = now;
    spawnDot(e.clientX, e.clientY);
  });

  window.addEventListener('touchmove', function (e) {
    var t = e.touches[0];
    spawnDot(t.clientX, t.clientY);
  }, { passive: true });
})();
