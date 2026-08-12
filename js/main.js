/**
 * 首页主逻辑
 */

function _go(url) {
  if (window._navigate) { window._navigate(url); }
  else { window.location.href = url; }
}

document.addEventListener('DOMContentLoaded', () => {
  // 红色文化旅游按钮：先播放专属照片过渡，再跳转
  var redBtn = document.getElementById('btn-red');
  if (redBtn) {
    redBtn.addEventListener('click', function () {
      var overlay = document.getElementById('red-photo-overlay');
      if (overlay) {
        overlay.classList.add('show');
        setTimeout(function () {
          _go('map.html?type=red');
        }, 1000);
      } else {
        _go('map.html?type=red');
      }
    });
  }

  // 城市饮食文化按钮：先播放专属照片过渡，再跳转
  var foodBtn = document.getElementById('btn-food');
  if (foodBtn) {
    foodBtn.addEventListener('click', function () {
      var overlay = document.getElementById('food-photo-overlay');
      if (overlay) {
        overlay.classList.add('show');
        setTimeout(function () {
          _go('map.html?type=food');
        }, 1000);
      } else {
        _go('map.html?type=food');
      }
    });
  }
});
