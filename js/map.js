/**
 * 地图页面逻辑
 *
 * 使用高德地图 JS API 加载齐齐哈尔地图，根据 URL 参数 ?type= 过滤景点并生成 Marker。
 */

(function () {
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type') || 'red';

  // ---- 主题 UI ----
  const badge = document.getElementById('theme-badge');
  const title = document.getElementById('cur-title');

  if (badge) {
    badge.textContent = type === 'red' ? '红色文化' : '饮食文化';
    badge.className = 'theme-badge ' + (type === 'red' ? 'red' : 'food');
  }
  if (title) {
    title.textContent = type === 'red' ? '红色文化旅游地图' : '城市饮食文化地图';
  }

  // ---- 过滤数据 ----
  const filtered = spots.filter(s => s.type === type);

  // ---- 初始化高德地图 ----
  // 高德使用 [lng, lat] 顺序，与 Leaflet 相反
  const map = new AMap.Map('map', {
    center: [123.94, 47.354],
    zoom: 13
  });

  // ---- 自动生成标记（红色=星，饮食=红心）----
  const markers = [];
  filtered.forEach(spot => {
    const emoji = type === 'food' ? '❤️' : '⭐';
    const markerClass = type === 'food' ? 'heart-marker' : 'star-marker';
    const marker = new AMap.Marker({
      position: [spot.lng, spot.lat],
      content: '<div class="' + markerClass + '">' + emoji + '</div>',
      offset: new AMap.Pixel(-14, -14),
      map: map
    });
    markers.push(marker);

    const content =
      '<div style="min-width:180px">' +
        '<strong>' + spot.name + '</strong>' +
        '<div style="margin:6px 0;width:100%;height:100px;background:#eee;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#999;font-size:12px">' +
          (spot.image ? '<img src="' + spot.image + '" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:4px">' : '图片待补充') +
        '</div>' +
        '<p style="margin:4px 0;font-size:13px;color:#555">' + spot.intro + '</p>' +
        '<a href="detail.html?id=' + spot.id + '" style="display:inline-block;margin-top:4px;font-size:13px;color:#c41e3a">详细了解 →</a>' +
      '</div>';

    marker.on('click', function () {
      const infoWindow = new AMap.InfoWindow({
        content: content,
        offset: new AMap.Pixel(0, -30)
      });
      infoWindow.open(map, marker.getPosition());
    });
  });

  // 自动缩放视野，包含所有标记点
  if (markers.length > 0) {
    map.setFitView(markers, false, [60, 60, 60, 60], 11);
  }

  // 离场前隐藏地图，避免转场动画卡顿（不销毁，便于返回时恢复）
  window._beforeExit = function () {
    var mapEl = document.getElementById('map');
    if (mapEl) mapEl.style.display = 'none';
  };

  // 从 bfcache 恢复时重新显示地图
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      var mapEl = document.getElementById('map');
      if (mapEl) mapEl.style.display = '';
    }
  });
})();
