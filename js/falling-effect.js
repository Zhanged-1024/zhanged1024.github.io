/**
 * 首页照片飘落装饰（繁花版）
 *
 * 从 FALLING_PHOTOS 中随机取图，生成大量半透明照片，
 * 随机分配运动轨迹（直坠 / 落叶 / 之字 / 升腾）、尺寸、透明度与金色辉光。
 */

(function () {
  if (typeof FALLING_PHOTOS === 'undefined' || !FALLING_PHOTOS.length) return;

  var COUNT = 26;              // 同时飘落的照片数
  var TYPES = ['fast', 'drift', 'zigzag', 'rise'];
  var container = document.body;

  for (var i = 0; i < COUNT; i++) {
    var img = document.createElement('img');
    img.className = 'falling-photo';
    img.alt = '';

    // 随机取一张
    img.src = FALLING_PHOTOS[Math.floor(Math.random() * FALLING_PHOTOS.length)];

    // 随机运动轨迹（余烬升腾占比稍低）
    var r = Math.random();
    var type = r < 0.3 ? 'fast' : r < 0.6 ? 'drift' : r < 0.85 ? 'zigzag' : 'rise';
    img.classList.add('type-' + type);

    // 随机尺寸 60~170px
    var size = 60 + Math.random() * 110;
    img.style.width = size + 'px';

    // 随机水平位置
    img.style.left = (2 + Math.random() * 92) + '%';

    // 随机半透明度 0.3~0.65
    img.style.setProperty('--fp-opacity', (0.3 + Math.random() * 0.35).toFixed(2));

    // 部分照片加金色辉光
    if (Math.random() < 0.25) img.classList.add('glow');

    // 随机时长：直坠快、缓飘慢、升腾最慢
    var base = type === 'fast' ? 8 : type === 'drift' ? 16 : type === 'zigzag' ? 13 : 22;
    var duration = base + Math.random() * 8;
    img.style.animationDuration = duration + 's';

    // 负延迟：让照片一开始就分布在飘落途中
    img.style.animationDelay = '-' + (Math.random() * duration).toFixed(1) + 's';

    container.appendChild(img);
  }
})();
