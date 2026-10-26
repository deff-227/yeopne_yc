/* Freeze Yechan's concert story at 2026-10-26 00:00 KST and surface the requested finale text. */
(() => {
  'use strict';
  const finaleCutoffOct26 = Date.parse('2026-10-26T00:00:00+09:00');
  StoryClock.now = () => finaleCutoffOct26;
  timeNow = () => '00:00';

  const previousRefreshOct26 = refreshDate;
  refreshDate = function (...args) {
    const result = previousRefreshOct26(...args);
    const date = PhoneTimeline.dateInfo(finaleCutoffOct26);
    document.querySelectorAll('.date').forEach(el => {
      el.textContent = date.full + ' · 막콘이 끝난 밤';
    });
    document.querySelectorAll('.shade-date').forEach(el => {
      el.textContent = date.full;
    });
    document.querySelectorAll('.lock>p').forEach((el,i)=>{el.textContent=i===0?date.full+' · 막콘이 끝난 밤':'너희 덕분에 행복한 3일이었어.';});
    const footer = document.querySelector('.margin-note p');
    if (footer) footer.innerHTML = '그러니 우리 더 빛나자<br>이 순간이 영원할 것처럼';
    return result;
  };

  const fixStyleOct26 = document.createElement('style');
  fixStyleOct26.textContent = 'textarea.note[data-note="letter-oct25"]{min-height:360px}.margin-note p{font-size:12px;line-height:1.8;letter-spacing:1px}';
  document.head.appendChild(fixStyleOct26);

  const renderBeforeOct26 = render;
  render = function (...args) {
    const result = renderBeforeOct26(...args);
    refreshDate();
    return result;
  };
  const lockBeforeOct26 = lock;
  lock = function (...args) {
    const result = lockBeforeOct26(...args);
    refreshDate();
    return result;
  };
  const shadeBeforeOct26 = notificationShade;
  notificationShade = function (...args) {
    const result = shadeBeforeOct26(...args);
    document.querySelectorAll('.shade-date').forEach(el => {
      el.textContent = PhoneTimeline.dateInfo(finaleCutoffOct26).full;
    });
    return result;
  };

  tick();
  refreshDate();
})();
