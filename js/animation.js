/**
 * 开幕动画逻辑
 *
 * 动画时间轴:
 *   0.5s   — 第一个字升起
 *   0.7s   — 第二个字
 *   0.9s   — 第三个字
 *   1.1s   — 第四个字
 *   1.6s   — 装饰线展开
 *   2.2s   — 副标题淡入
 *   3.8s   — 整体淡出
 */

function initSplash() {
  const splash = document.getElementById('splash');
  const homePage = document.getElementById('home-page');

  if (!splash || !homePage) return;

  setTimeout(() => {
    splash.classList.add('fade-out');
    homePage.classList.add('visible');

    splash.addEventListener('transitionend', () => {
      splash.remove();
    }, { once: true });
  }, 3800);
}

document.addEventListener('DOMContentLoaded', initSplash);
