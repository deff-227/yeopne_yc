/* Real-time, browser-local conversations. No background server or polling requests. */
function concertDayV23(ms){const d=new Date(ms);return d.getFullYear()===2026&&d.getMonth()===9&&d.getDate()===23}
function contactBlockV23(ms=Date.now()){
 const d=new Date(ms),h=d.getHours();
 if(!concertDayV23(ms))return '';
 if(h>=8&&h<12)return '우리 콘서트 연습 중이잖아';
 if(h>=19&&h<22)return '우리 지금 콘서트 중이잖아';
 return '';
}
function sleepingV23(ms=Date.now()){const h=new Date(ms).getHours();return h>=2&&h<8}
const realtimeKeyV22='realtime-conversations-v22', presenceKeyV22='realtime-cursor-v22';
phoneDate=function(){return new Date()};
const realtimeDaysV22=['일요일','월요일','화요일','수요일','목요일','금요일','토요일'];
function realtimeDateLabelV22(ms){const d=new Date(ms);return `${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일 ${realtimeDaysV22[d.getDay()]}`}
function realtimeTimeV22(ms){const d=new Date(ms),h=d.getHours();return `${h<12?'오전':'오후'} ${h%12||12}:${String(d.getMinutes()).padStart(2,'0')}`}
let realtimeStateV22=readStore(realtimeKeyV22,null);
const realtimeNowV22=Date.now();
if(realtimeStateV22?.chats){chats=realtimeStateV22.chats;callLog=realtimeStateV22.calls||[];allRead=realtimeStateV22.allRead??true;storyStage=realtimeStateV22.story==='calling'?'finished':(realtimeStateV22.story||'finished')}
else {realtimeStateV22={created:realtimeNowV22};storyStage='locked'}
const firstConcertCursorV23=concertDayV23(realtimeNowV22)?new Date(new Date(realtimeNowV22).setHours(0,0,0,0)).getTime():realtimeNowV22;
let realtimeCursorV22=readStore(presenceKeyV22,realtimeStateV22.created===realtimeNowV22?firstConcertCursorV23:(realtimeStateV22.created||realtimeNowV22));
let realtimeHiddenV22=document.hidden;
function persistRealtimeV22(){
 for(const rows of Object.values(chats))rows.sort((a,b)=>(a[4]||0)-(b[4]||0));
 realtimeStateV22={...realtimeStateV22,chats,calls:callLog,allRead,story:storyStage,saved:Date.now()};
 saveBeforeV14(realtimeKeyV22,realtimeStateV22);
}
function saveCursorV22(ms){realtimeCursorV22=ms;saveBeforeV14(presenceKeyV22,ms)}
const saveStoreBeforeV22=saveStore;
saveStore=function(key,value){
 saveStoreBeforeV22(key,value);
 if(['chats','call-log','allRead'].includes(key))persistRealtimeV22();
};
// Every row has a stable event ID and an absolute time; old edited rows remain valid.
function addRealtimeRowV22(direction,text,ms,id,notify=false){
 const rows=chats.yechan||(chats.yechan=[]);
 if(rows.some(row=>row[3]===id))return false;
 rows.push([direction,text,realtimeTimeV22(ms),id,ms]);
 if(!direction){allRead=!document.hidden&&unlocked&&screen==='kakao'&&activeChat==='yechan'&&!callStage;if(notify&&unlocked&&!allRead)receiveBanner('yechan',text)}
 return true;
}
// A small daily timetable; scheduled self replies are only generated while away.
const realtimeScheduleV22=[
 {hour:1,minute:10,pairs:[['엽아 아직 안 자?','응 형. 나도 아직 깨어 있어'],['이 시간만 되면 네 생각 나네 ㅎㅎ','나도 형 생각하고 있었어']]},
 {hour:9,minute:20,pairs:[['엽아 일어났어? 밥 챙겨 먹어','형도 아침 챙겨 먹어'],['잘 잤어? 오늘도 너무 무리하지 말고','응 잘 잤어. 형도 좋은 하루 보내']]},
 {hour:12,minute:30,pairs:[['점심 먹었어? 난 이제 먹으려고','나도 이제 먹으려던 참이야. 형 뭐 먹어?'],['엽아 밥 거르지 말고. 이따 보자','알았어 형 ㅎㅎ 이따 봐']]},
 {hour:19,minute:0,pairs:[['저녁 뭐 먹을지 정했어? 애들이 고기 먹자던데','고기 좋지. 형도 같이 먹을 거지?'],['엽아 저녁 뭐 먹을래? 애들이 찜닭 먹자던데','찜닭 좋다. 형도 같이 가자']]},
 {hour:23,minute:20,pairs:[['이제 좀 쉬고 있어? 오늘도 고생했어','형도 고생했어. 푹 쉬어'],['엽아 오늘도 보고 싶었어 ㅎㅎ','나도 보고 싶었어 형. 잘 자']]} 
];
function realtimeEventsV22(from,to){
 const events=[],day=new Date(from);day.setHours(0,0,0,0);
 while(day.getTime()<=to){
  const dayKey=`${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}`;
  const variant=Math.floor(Date.UTC(day.getFullYear(),day.getMonth(),day.getDate())/86400000)%2;
  if(concertDayV23(day.getTime())){
   const programme=[
    [8,5,'chat',0,'엽아 오늘은 연습 때문에 정신없겠다. 나도 이제 들어가. 끝나고 연락하자'],
    [8,7,'chat',1,'응 형. 나도 준비하러 가야 해. 이따 무대에서 보자'],
    [16,0,'bubble',1,'이따가 보자 :)'],
    [23,0,'chat',0,'엽아 오늘 진짜 수고했어. 네 목소리 들으면서 나도 너무 좋았어'],
    [23,2,'chat',1,'형도 수고했어. 오늘 진짜 행복했다. 얼른 쉬고 내일 보자'],
    [23,5,'bubble',1,'오늘 정말 즐거웠고 너무 행복했다. 내일 또 보자']
   ];
   for(const [h,m,channel,dir,text] of programme){const t=new Date(day);t.setHours(h,m,0,0);const ms=t.getTime();if(ms>from&&ms<=to)events.push({ms,dir,text,channel,id:`concert23:${h}:${m}:${channel}`})}
  }else for(const slot of realtimeScheduleV22){
   const time=new Date(day);time.setHours(slot.hour,slot.minute,0,0);
   const pair=slot.pairs[variant];
   for(let dir=0;dir<2;dir++){
    const ms=time.getTime()+dir*120000;
    if(ms>from&&ms<=to)events.push({ms,dir,text:pair[dir],id:`rt22:${dayKey}:${slot.hour}:${dir}`});
   }
  }
  day.setDate(day.getDate()+1);
 }
 return events.sort((a,b)=>a.ms-b.ms);
}
function advanceRealtimeV22(now,away){
 realtimeCursorV22=Math.max(realtimeCursorV22,readStore(presenceKeyV22,realtimeCursorV22));
 if(now<realtimeCursorV22){saveCursorV22(now);return}
 let changed=false;
 for(const event of realtimeEventsV22(realtimeCursorV22,now)){
  if(event.channel==='bubble'){
   if(!bubble.some(row=>row[3]===event.id)){
    bubble.push([1,event.text,realtimeTimeV22(event.ms),event.id,event.ms]);saveStore('bubble',bubble);changed=true;
    if(!away&&unlocked)toast('bubble에 새 메시지를 보냈습니다.');
    if(screen==='bubble'&&!document.hidden)renderBubble(bubbleTab);
   }
   continue;
  }
  if(event.dir&&!away)continue;
  if(event.dir&&(chats.yechan||[]).some(row=>row[0]&&row[4]>event.ms-120000&&row[4]<=event.ms))continue;
  changed=addRealtimeRowV22(event.dir,event.text,event.ms,event.id,!away)||changed;
 }
 saveCursorV22(now);
 if(changed){persistRealtimeV22();refreshUnreadBadges();if(!document.hidden&&screen==='kakao'&&activeChat==='yechan')renderChat();else if(!document.hidden&&screen==='kakao'&&!activeChat)renderKakao()}
}
queueIncomingCall=function(){
 if(storyStage!=='locked')return;
 storyStage='message';
 if(contactBlockV23()||sleepingV23()){storyStage='finished';persistRealtimeV22();refreshUnreadBadges();return}
 const hour=phoneDate().getHours();
 const text=hour<6||hour>=23?storyMessage:'엽아 뭐 해? 잠깐 전화 가능해?';
 addRealtimeRowV22(0,text,Date.now(),'rt22:intro',true);persistRealtimeV22();refreshUnreadBadges();
};
const realClockBeforeV22=updatePhoneClock;
updatePhoneClock=function(){
 realClockBeforeV22();const d=phoneDate(),label=`${d.getMonth()+1}월 ${d.getDate()}일 ${realtimeDaysV22[d.getDay()]}`;
 document.querySelectorAll('.lock-date').forEach(el=>el.textContent=label);
 const under=document.querySelector('.under-device>span:nth-child(2)');if(under)under.textContent=label;
 const underTime=document.querySelector('.under-device>span:last-child');if(underTime)underTime.textContent=`${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
 const dateWidget=document.querySelector('.date-widget');if(dateWidget&&dateWidget.dataset.realDate!==label){dateWidget.dataset.realDate=label;dateWidget.innerHTML=esc(label)+'<b>오늘도 좋은 하루</b>'}
 const weatherStamp=document.querySelector('.weather-widget small:last-child');if(weatherStamp)weatherStamp.textContent=`${d.getMonth()+1}.${d.getDate()} ${phoneTime()}`;
 const schedule=document.querySelector('.schedule-widget');if(schedule&&schedule.dataset.realDate!==label){
  schedule.dataset.realDate=label;
  const items=d.getFullYear()===2026?(d.getMonth()===9?EVENTS:d.getMonth()===10?EXTRA_EVENTS[11]:{})[d.getDate()]||[]:[];
  schedule.innerHTML='오늘의 일정<b>'+esc(items[0]?.[1]||'등록된 일정 없음')+'</b><span style="font-size:8px;opacity:.7">'+esc(items[0]?.[0]||'오늘도 좋은 하루')+'</span>';
 }
};
const realRenderBeforeV22=renderChat;
renderChat=function(){
 realRenderBeforeV22();const el=$('#chatScroll');if(!el||!activeChat)return;
 let previous='';
 el.innerHTML=(chats[activeChat]||[]).map(row=>{
  const date=row[4]?realtimeDateLabelV22(row[4]):'이전 대화';
  const heading=date!==previous?`<div class="chat-date">${esc(date)}</div>`:'';previous=date;
  return heading+msgHTML(row,activeChat);
 }).join('');
};
// Timestamp user messages and their ordinary automatic replies at their actual send times.
function stampRealtimeRowsV22(){let changed=false;for(const rows of Object.values(chats))for(const row of rows)if(!row[4]&&!realtimeKnownRowsV22.has(row)){row[4]=Date.now();row[2]=realtimeTimeV22(row[4]);changed=true}if(changed)persistRealtimeV22()}
const realtimeKnownRowsV22=new WeakSet(Object.values(chats).flat());
const realtimeSaveBeforeV22=saveStore;
saveStore=function(key,value){if(key==='chats')stampRealtimeRowsV22();realtimeSaveBeforeV22(key,value)};
function deliverDayCallV24(now){
 const pending=realtimeStateV22.dayCall||[];let changed=false;
 realtimeStateV22.dayCall=pending.filter(event=>{
  if(event.ms>now)return true;
  if(!contactBlockV23(event.ms)&&!sleepingV23(event.ms))changed=addRealtimeRowV22(event.dir,event.text,event.ms,event.id,!document.hidden)||changed;
  return false;
 });
 if(pending.length!==realtimeStateV22.dayCall.length)persistRealtimeV22();
 if(changed){refreshUnreadBadges();if(!document.hidden&&screen==='kakao'&&activeChat==='yechan')renderChat()}
}
function deliverPendingRepliesV22(now){
 deliverDayCallV24(now);
 const pending=realtimeStateV22.pending||{};let changed=false;
 for(const [id,reply] of Object.entries(pending)){
  if(reply.due>now)continue;
  if(contactBlockV23(reply.due)||(id==='yechan'&&sleepingV23(reply.due))){delete pending[id];delete replyTimers[id];changed=true;continue}
  const rows=chats[id]||(chats[id]=[]);
  if(!rows.some(row=>row[3]===reply.id)){
   rows.push([0,reply.text,realtimeTimeV22(reply.due),reply.id,reply.due]);
   if(id==='yechan')allRead=!document.hidden&&unlocked&&activeChat===id&&screen==='kakao'&&!callStage;
   if(!document.hidden&&unlocked&&activeChat!==id)receiveBanner(id,reply.text);
  }
  delete pending[id];delete replyTimers[id];changed=true;
 }
 if(changed){persistRealtimeV22();refreshUnreadBadges();if(!document.hidden&&screen==='kakao'&&activeChat)renderChat()}
}
sendChat=function(text){
 const id=activeChat;if(!id||!text.trim())return;
 const now=Date.now();(chats[id]||(chats[id]=[])).push([1,text,phoneTime(),'typed:'+now+':'+Math.random().toString(36).slice(2),now]);
 if(replyTimers[id])clearTimeout(replyTimers[id]);
 const pending=realtimeStateV22.pending||(realtimeStateV22.pending={});
 if(!(id==='yechan'&&sleepingV23(now)))pending[id]={id:'reply:'+now+':'+id,text:makeReply(id,text),due:now+1200};
 saveStore('chats',chats);
 replyTimers[id]=setTimeout(()=>deliverPendingRepliesV22(Date.now()),1200);renderChat();
};
for(const name of ['endIncomingCall','declineIncoming','finishOutgoingV13']){
 const original=window[name];if(typeof original==='function')window[name]=function(...args){const result=original.apply(this,args);
 if(name==='declineIncoming'){
  if(callLog[0])callLog[0].time=phoneTime();
  const last=chats.yechan?.at(-1),hour=phoneDate().getHours();
  if(last&&hour>=6&&hour<23){
   if(last[1]==='바쁘면 이따 해도 돼ㅋㅋ 나 아직 안 자')last[1]='바쁘면 이따 해도 돼ㅋㅋ 시간 될 때 연락해';
   if(last[1]==='엽아 잤어? 나 잠깐 전화했는데')last[1]='엽아 잠깐 전화했는데, 시간 될 때 연락해';
  }
  if(activeChat==='yechan'&&screen==='kakao')renderChat();
 }
 persistRealtimeV22();return result};
}
function hideRealtimeV22(){if(!realtimeHiddenV22)advanceRealtimeV22(Date.now(),false);realtimeHiddenV22=true;persistRealtimeV22()}
function resumeRealtimeV22(){if(document.hidden)return;if(realtimeHiddenV22){advanceRealtimeV22(Date.now(),true);realtimeHiddenV22=false}deliverPendingRepliesV22(Date.now());updatePhoneClock();refreshUnreadBadges()}
document.addEventListener('visibilitychange',()=>document.hidden?hideRealtimeV22():resumeRealtimeV22());
window.addEventListener('pagehide',hideRealtimeV22);
window.addEventListener('pageshow',resumeRealtimeV22);
window.addEventListener('storage',event=>{
 if(event.key!=='yeop-'+realtimeKeyV22)return;
 const latest=readStore(realtimeKeyV22,null);if(!latest?.chats||latest.saved<realtimeStateV22.saved)return;
 realtimeStateV22=latest;chats=latest.chats;callLog=latest.calls||[];allRead=latest.allRead;
 for(const row of Object.values(chats).flat())realtimeKnownRowsV22.add(row);
 if(!callStage)storyStage=latest.story==='calling'?'finished':latest.story;
 refreshUnreadBadges();
 if(screen==='kakao'&&activeChat&&!$('#chatInput')?.value)renderChat();
});
// Heartbeat is local, lightweight cursor storage; hidden tabs do no scheduler work.
setInterval(()=>{if(!document.hidden){advanceRealtimeV22(Date.now(),false);deliverPendingRepliesV22(Date.now());persistRealtimeV22()}},15000);
function initializeRealtimeV22(){advanceRealtimeV22(realtimeNowV22,true);deliverPendingRepliesV22(realtimeNowV22);persistRealtimeV22();updatePhoneClock();refreshUnreadBadges()}
if(!document.querySelector('meta[name="realtime-extension"]'))initializeRealtimeV22();
setInterval(()=>updatePhoneClock(),1000);
