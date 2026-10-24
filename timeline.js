(function(g){
const slots=[['07:04','모닝콜','morning'],['12:16','밥 먹었어?','lunch'],['23:18','오늘도 수고했어','night']];
const events=[23,24,25].flatMap(day=>slots.map(([time,title,script])=>({id:`202610${day}-${script}`,at:`2026-10-${day}T${time}:00+09:00`,title,script,label:`10월 ${day}일 ${time}`,direction:'수신'})));
function available(now){const n=new Date(now).getTime();return events.filter(e=>new Date(e.at).getTime()<=n)}
function dateInfo(now){const d=new Date(now);const parts=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',hour12:false}).formatToParts(d).map(x=>[x.type,x.value]));const key=`${parts.year}-${parts.month}-${parts.day}`;const days=Math.round((Date.parse('2026-10-25T00:00:00+09:00')-Date.parse(key+'T00:00:00+09:00'))/86400000);return {key,day:Number(parts.day),hour:Number(parts.hour),short:`${Number(parts.month)}/${parts.day}`,full:new Intl.DateTimeFormat('ko-KR',{timeZone:'Asia/Seoul',month:'long',day:'numeric',weekday:'long'}).format(d),message:days>0?`콘서트 마무리까지 ${days===1?'단 하루':days+'일'}`:days===0?'마지막 공연도, 함께':'오래 기억할 우리의 밤'}}
g.PhoneTimeline={events,available,dateInfo};
})(window);
