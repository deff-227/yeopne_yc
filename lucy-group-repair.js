/* LUCY group chat repair: keep contact nicknames, show separate senders, preserve written messages. */
(function () {
  'use strict';
  const nativeNames = { wonsang: '조원상', gwangil: '신광일', sangyeop: '최상엽', yechan: '신예찬' };
  const knownPrefixes = /^(96|97|엽이♥|조원상|신광일|최상엽|신예찬)\s*:\s*/;
  const groupSeed = [
    ['2026-10-24', '오후 11:47', 'wonsang', '오늘도 재밌었다ㅋㅋ 내일 벌써 막콘이네'],
    ['2026-10-24', '오후 11:48', 'gwangil', '나 아직도 귀에서 함성 들림ㅋㅋ'],
    ['2026-10-24', '오후 11:49', 'yechan', 'ㅋㅋㅋㅋ 나도 아직 신나'],
    ['2026-10-24', '오후 11:50', 'sangyeop', '형 손목은 괜찮아? 오늘 엄청 뛰던데'],
    ['2026-10-24', '오후 11:51', 'yechan', '괜찮아 ㅎㅎ 너도 목 좀 쉬어'],
    ['2026-10-24', '오후 11:52', 'wonsang', '내일 늦는 사람 커피 사기'],
    ['2026-10-24', '오후 11:53', 'gwangil', 'ㅋㅋㅋ 다들 일찍 와'],
    ['2026-10-25', '오전 11:40', 'wonsang', '다들 일어났냐'],
    ['2026-10-25', '오전 11:41', 'gwangil', 'ㅇㅇ 나 준비 중'],
    ['2026-10-25', '오전 11:42', 'yechan', '나도 이제 나가려고'],
    ['2026-10-25', '오전 11:43', 'sangyeop', '형 밥 먹고 와'],
    ['2026-10-25', '오전 11:44', 'yechan', '응 ㅋㅋ 이따 같이 먹자'],
    ['2026-10-25', '오전 11:45', 'wonsang', '좋아 시간 맞춰서 봐']
  ];
  // Phonebook names belong to Yechan's phone only.
  people.sangyeop.name = '엽이♥';
  people.wonsang.name = '96';
  people.gwangil.name = '97';
  people.group.name = '루시 (4)';

  const seedBeforeGroupRepair = seedFor;
  seedFor = function (id) {
    if (id !== 'group') return seedBeforeGroupRepair(id);
    return groupSeed.map(function (item, i) {
      const day = item[0], time = item[1], who = item[2], text = item[3];
      return [who === 'yechan' ? 1 : 0, text, time, 'lucy-group-repair:' + i, storyStamp(day, time), who];
    });
  };

  function senderOf(row) {
    if (row[0]) return 'yechan';
    if (nativeNames[row[5]]) return row[5];
    const match = String(row[1] || '').match(knownPrefixes);
    if (!match) return null;
    return ({ '96': 'wonsang', '조원상': 'wonsang',
      '97': 'gwangil', '신광일': 'gwangil',
      '엽이♥': 'sangyeop', '최상엽': 'sangyeop', '신예찬': 'yechan' })[match[1]] || null;
  }
  function groupRowHtml(row) {
    const who = senderOf(row), own = !!row[0];
    const raw = String(row[1] || '');
    const clean = who && !own ? raw.replace(knownPrefixes, '') : raw;
    const name = who ? nativeNames[who] : '루시';
    const portrait = !own && who && people[who] ? avatar(people[who]) : '';
    const header = own ? '' : '<span class="lucy-sender-name">' + esc(name) + '</span>';
    const time = '<time>' + esc(row[2] || '지금') + '</time>';
    const bubble = '<div class="bubble-row' + (own ? ' mine' : '') + '">' +
      (own ? time : '') + '<p>' + esc(clean) + '</p>' + (own ? '' : time) + '</div>';
    return '<div class="lucy-group-entry' + (own ? ' from-me' : '') + '">' +
      (own ? '' : '<div class="lucy-group-portrait">' + portrait + '</div>') +
      '<div class="lucy-group-main">' + header + bubble + '</div></div>';
  }
  const conversationBeforeGroupRepair = conversation;
  conversation = function (id) {
    if (id !== 'group') return conversationBeforeGroupRepair(id);
    let previous = '';
    const html = chatRows('group').map(function (row) {
      const day = rowDay(row);
      const dateHeader = day === previous ? '' : '<div class="chat-date">' + chatDayLabel(day) + '</div>';
      previous = day;
      return dateHeader + groupRowHtml(row);
    }).join('');
    V.innerHTML = '<div class="chat lucy-group-thread">' +
      bar(esc(people.group.name)) +
      '<div class="chat-body">' + html + '</div>' +
      '<form class="composer" id="chat-form"><input id="message" aria-label="메시지" placeholder="메시지 입력" maxlength="1000" autocomplete="off">' +
      '<button class="primary" type="submit">전송</button></form></div>';
    requestAnimationFrame(function () { V.scrollTop = V.scrollHeight; });
  };
  // Keep existing typed group messages. Generated responses rotate naturally by context.
  const replyBeforeGroupRepair = reply;
  reply = function (id, message) {
    if (id !== 'group') return replyBeforeGroupRepair(id, message);
    if (/밥|먹|배고/.test(message)) return '조원상: ㅋㅋㅋ 좋아 밥부터 먹자';
    if (/연습|합주|맞춰|장비/.test(message)) return '신광일: ㅇㅋ 이따 가서 한 번 더 맞추자';
    if (/공연|막콘|마지막|무대/.test(message)) return '최상엽: 오늘도 재밌게 해보자';
    return '조원상: 오케이 ㅋㅋ 이따 봐';
  };
  const css = document.createElement('style');
  css.textContent =
    '.lucy-group-thread .lucy-group-entry{display:flex;align-items:flex-end;gap:7px;margin:11px 0}' +
    '.lucy-group-thread .lucy-group-entry.from-me{justify-content:flex-end}' +
    '.lucy-group-thread .lucy-group-main{max-width:calc(100% - 37px);min-width:0;flex:1}' +
    '.lucy-group-thread .lucy-group-entry.from-me .lucy-group-main{flex:0 1 auto}' +
    '.lucy-group-thread .lucy-sender-name{display:block;color:#78677b;font-size:11px;margin:0 0 4px 3px}' +
    '.lucy-group-thread .lucy-group-portrait{width:27px;flex:0 0 27px;align-self:flex-start;padding-top:3px}' +
    '.lucy-group-thread .lucy-group-portrait .avatar{width:27px;height:27px;border-radius:10px;font-size:14px}' +
    '.lucy-group-thread .lucy-group-portrait .avatar img{width:100%;height:100%;object-fit:cover;border-radius:inherit}' +
    '.lucy-group-thread .bubble-row{margin:0;max-width:100%}' +
    '.lucy-group-thread .bubble-row p{min-width:0;max-width:84%;word-break:keep-all}' +
    '.lucy-group-thread .lucy-group-entry.from-me .bubble-row p{max-width:100%}';
  document.head.appendChild(css);
})();