/**
 * 详情页侧边飘落照片
 *
 * 照片只在文字内容两侧的空白区域飘落，不遮挡中间正文。
 */

(function () {
  if (typeof FALLING_PHOTOS === 'undefined' || !FALLING_PHOTOS.length) return;

  var COUNT = 16;          // 总照片数（左右各半）
  var CONTENT_W = 760;     // 中间内容区宽度（含边距）

  function margin() {
    return Math.max((window.innerWidth - CONTENT_W) / 2, 0);
  }

  function createPhoto(side) {
    var mw = margin();
    if (mw < 60) return;   // 屏幕太窄（如手机）就不显示侧边照片

    var img = document.createElement('img');
    img.className = 'falling-photo type-drift';
    img.alt = '';
    img.src = FALLING_PHOTOS[Math.floor(Math.random() * FALLING_PHOTOS.length)];

    var size = 46 + Math.random() * 60;
    img.style.width = size + 'px';

    // 左侧或右侧空白区
    var maxLeft = mw - size;
    if (side === 'left') {
      img.style.left = (8 + Math.random() * Math.max(maxLeft - 8, 1)) + 'px';
    } else {
      img.style.left = (window.innerWidth - mw + 8 + Math.random() * Math.max(maxLeft - 8, 1)) + 'px';
    }

    img.style.setProperty('--fp-opacity', (0.3 + Math.random() * 0.35).toFixed(2));

    var duration = 14 + Math.random() * 12;
    img.style.animationDuration = duration + 's';
    img.style.animationDelay = '-' + (Math.random() * duration).toFixed(1) + 's';

    document.body.appendChild(img);
  }

  for (var i = 0; i < COUNT; i++) {
    createPhoto(i % 2 === 0 ? 'left' : 'right');
  }
})();
