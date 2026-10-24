/* The concert weekend continues with date-specific text calls and durable transcripts. */
function concertDayV26(ms){const d=new Date(ms);return d.getFullYear()===2026&&d.getMonth()===9&&d.getDate()>=23&&d.getDate()<=25}
function concertWindowV26(ms){
 const d=new Date(ms);if(!concertDayV26(ms))return null;
 const day=d.getDate();if(day===23)return {start:19,end:22};
 const entry=(EVENTS[day]||[]).find(e=>/^\d{1,2}:\d{2}$/.test(e[0])&&/CONCERT/i.test(e[1]));
 const start=entry?Number(entry[0].split(':')[0])+Number(entry[0].split(':')[1])/60:(day===24?18:17);
 return {start,end:start+3};
}
concertDayV23=concertDayV26;
contactBlockV23=function(ms=Date.now()){
 const d=new Date(ms),h=d.getHours()+d.getMinutes()/60,window=concertWindowV26(ms);
 if(!window)return '';
 if(d.getDate()===23&&h>=8&&h<12)return '우리 콘서트 연습 중이잖아';
 return h>=window.start&&h<window.end?'우리 지금 콘서트 중이잖아':'';
};
const weekendEventsBeforeV26=realtimeEventsV22;
realtimeEventsV22=function(from,to){
 const events=weekendEventsBeforeV26(from,to).filter(e=>{const d=new Date(e.ms);return !(d.getFullYear()===2026&&d.getMonth()===9&&[24,25].includes(d.getDate()))});
 const day=new Date(from);day.setHours(0,0,0,0);
 while(day.getTime()<=to){
  const n=day.getDate();
  if(day.getFullYear()===2026&&day.getMonth()===9&&[24,25].includes(n)){
   const w=concertWindowV26(day.getTime()),end=Math.floor(w.end),programme=n===24?[
    [9,15,'chat',0,'엽아 일어났어? 목은 좀 괜찮아? 어제 많이 불렀잖아'],[9,17,'chat',1,'응 괜찮아. 형도 손 안 아파? 오늘도 무리하지 말자'],
    [12,30,'chat',0,'중콘이라고 방심하지 말고 밥부터 먹자 ㅎㅎ'],[12,32,'chat',1,'알았어 형. 어제 좋았던 거 오늘도 같이 하자'],
    [w.start-2,0,'bubble',1,'어제 와준 왈왈이들 고마워요. 오늘도 재밌게 놀자 :)'],
    [end,20,'chat',0,'엽아 오늘도 수고했어. 어제보다 더 편하게 웃으면서 한 것 같아'],[end,22,'chat',1,'형도 수고했어. 오늘 눈 마주칠 때마다 웃음 났다ㅋㅋ'],
    [end,30,'bubble',1,'둘째 날도 정말 즐거웠다. 덕분에 힘 많이 받았어요. 내일 마지막까지 같이 놀자']
   ]:[
    [9,15,'chat',0,'오늘이 벌써 마지막이네. 엽아 잘 잤어?'],[9,17,'chat',1,'응 형. 아직 끝나지도 않았는데 벌써 아쉽다'],
    [12,0,'chat',0,'우리 오늘도 다치지 말고 재밌게 하자. 끝나고 내가 꼭 안아줄게'],[12,2,'chat',1,'좋아. 형도 끝까지 내 옆에 있어줘'],
    [w.start-2,0,'bubble',1,'벌써 마지막 날이네. 오늘 남은 힘까지 다 쓰고 가자. 이따 만나요 :)'],
    [end,20,'chat',0,'엽아 정말 수고했어. 끝났다는 게 아직 실감이 안 나'],[end,22,'chat',1,'나도 그래. 형이랑 같이해서 더 행복했어. 고마워'],
    [end,30,'bubble',1,'사흘 내내 너무 행복했다. 같이 노래해 줘서 고마워요. 조심히 들어가고 우리 또 만나자'],
    [23,10,'chat',0,'내일은 알람 끄고 푹 자. 일어나면 같이 밥 먹자'],[23,12,'chat',1,'응 형. 내일은 내가 맛있는 거 사줄게']
   ];
   for(const [h,m,channel,dir,text] of programme){const t=new Date(day);t.setHours(h,m,0,0);const ms=t.getTime();if(ms>from&&ms<=to)events.push({ms,channel,dir,text,id:`weekend26:${n}:${h}:${m}:${channel}`})}
  }
  day.setDate(day.getDate()+1);
 }
 return events.sort((a,b)=>a.ms-b.ms);
};
const textScriptsV26={
 24:{early:['아직 안 잤어 엽아?','첫날 끝나고 나니까 좀 긴장 풀렸지.','오늘도 같이 잘해 보자. 이제 얼른 자.','일어나면 연락해. 나도 폰 내려놓을게 ㅎㅎ'],morning:['엽아 일어났어?','목은 좀 괜찮아? 어제 많이 불렀잖아.','밥 먹고 따뜻한 물도 마시고 나와.','이따 봐. 오늘도 잘 부탁해 ㅎㅎ'],before:['지금 준비하고 있어?','어제 맞췄던 부분 오늘도 눈 한 번만 맞춰줘.','네가 웃으면 나도 자꾸 웃게 되더라ㅋㅋ','조심히 와. 나 먼저 가서 기다릴게.'],after:['엽아 오늘 진짜 좋았어.','어제보다 좀 편하게 즐긴 것 같지?','네가 객석 보면서 웃는데 나까지 기분 좋더라.','밥 먹었어? 안 먹었으면 같이 먹자.'],night:['이틀 연속 하니까 이제 좀 피곤하지.','오늘도 고생 많았어 엽아.','내일 하루만 더 잘하고 우리 푹 쉬자.','잘 자. 일어나면 연락해 ㅎㅎ']},
 25:{early:['엽아 안 자고 뭐 해.','날짜 바뀌니까 벌써 막콘 날이네.','아쉬운 건 내일 같이 얘기하고 지금은 좀 자자.','잘 자. 오늘도 네 옆에 있을게.'],morning:['잘 잤어 엽아?','오늘이 벌써 마지막이라니까 좀 이상하다.','그래도 무대에서는 평소처럼 재밌게 하자.','밥 꼭 먹고 나와. 이따 보자 ㅎㅎ'],before:['엽아 어디쯤이야?','오늘은 마지막 곡에서 네 얼굴 좀 오래 봐야겠다.','ㅋㅋㅋㅋ왜. 그냥 잘 기억해 두려고.','끝나고 내가 꼭 안아줄게. 조심히 와.'],after:['다 끝났다 엽아.','근데 아직 끝난 것 같지가 않네.','사흘 동안 네 옆에서 같이해서 너무 좋았어.','수고했어. 오늘은 내가 네 얘기 다 들어줄게.'],night:['씻고 누웠어?','이제 진짜 다 끝났다는 게 실감이 나네.','고마워 엽아. 같이해서 더 행복했어.','내일 일어나면 맛있는 거 먹자. 잘 자.']}
};
function textScriptV26(ms=Date.now()){
 const d=new Date(ms),day=d.getDate(),h=d.getHours(),w=concertWindowV26(ms);if(!textScriptsV26[day]||!w)return null;
 const band=h<2?'early':h<12?'morning':h<w.start?'before':h>=22?'night':'after';return {day,band,lines:textScriptsV26[day][band].slice()};
}
let textCallV26=null;
function stopSharedMediaV26(){callSong.pause();outgoingVoiceV13.pause();surface.querySelectorAll('audio').forEach(a=>a.pause())}
function showTextLineV26(){
 if(!textCallV26)return;
 const entry=textCallV26,box=$('#textCallLinesV26');if(entry.index>=entry.script.lines.length){finishTextCallV26();return}
 const text=entry.script.lines[entry.index++];entry.shown.push({text,at:Date.now()});
 if(box){box.innerHTML=entry.shown.map(row=>`<p>${esc(row.text)}</p>`).join('');box.scrollTop=box.scrollHeight}
 clearTimeout(entry.next);entry.next=setTimeout(()=>showTextLineV26(),entry.index===entry.script.lines.length?5000:6000);
}
function startTextCallV26(type){
 if(textCallV26)return;const script=textScriptV26();if(!script)return;
 clearTimeout(storyCallTimer);clearCallTimers();stopSharedMediaV26();outgoingActiveV13=false;overlay.innerHTML='';activeChat=null;screen='call';callStage='connected';storyStage='calling';
 textCallV26={type,script,index:0,shown:[],started:Date.now(),next:null,ticker:null};
 setSurface(`<section class="adot-call outgoing-call-v13 text-call-v26"><div class="adot-top"><span class="adot-mark">A.</span><span>에이닷 전화</span><span>${type==='수신'?'휴대전화 수신':'휴대전화 발신'}</span></div><div class="adot-person"><h2>${esc(CONTACTS.yechan.name)}</h2><p id="textCallTimeV26">00:00</p></div><div class="adot-portrait">${profile('yechan')}</div><div class="text-call-lines-v26" id="textCallLinesV26" aria-live="polite"></div><button class="text-call-next-v26" onclick="showTextLineV26()">다음 대사</button><button class="hangup" aria-label="통화 종료" onclick="finishTextCallV26()">${icon('phone')}</button></section>`);
 showTextLineV26();textCallV26.ticker=setInterval(()=>{if(textCallV26&&$('#textCallTimeV26'))$('#textCallTimeV26').textContent=recordingTimeV12((Date.now()-textCallV26.started)/1000)},1000);
}
function finishTextCallV26(returnToPhone=true){
 if(!textCallV26)return;const entry=textCallV26;textCallV26=null;clearTimeout(entry.next);clearInterval(entry.ticker);callStage=null;storyStage='finished';
 callLog.unshift({recordId:'text26:'+entry.started,id:'yechan',type:entry.type,time:realtimeTimeV22(entry.started),date:`10월 ${entry.script.day}일`,startedAt:entry.started,seconds:Math.floor((Date.now()-entry.started)/1000),transcript:entry.shown.map(row=>({...row}))});
 saveStore('call-log',callLog);persistRealtimeV22();if(returnToPhone)renderPhone();
}
let outgoingArchiveV26=null;
const startBeforeV26=startCall,acceptBeforeV26=acceptIncoming;
startCall=function(id){if(id==='yechan'&&textScriptV26()){if(denyContactV23())return;if(sleepingV23()){startSleepDialV23();return}startTextCallV26('발신');return}const started=Date.now(),src=selectedCallAudioV23();startBeforeV26(id);if(outgoingActiveV13)outgoingArchiveV26={started,src}};
let audioArchiveV26=null;
acceptIncoming=function(){
 if(textScriptV26()){if(denyContactV23())return;if(sleepingV23()){declineIncoming();return}startTextCallV26('수신');return}
 audioArchiveV26={started:Date.now(),src:selectedCallAudioV23()};acceptBeforeV26();
};
const finishAudioBeforeV26=finishOutgoingV13;
finishOutgoingV13=function(...args){const active=outgoingActiveV13,src=outgoingArchiveV26?.src||selectedCallAudioV23(),started=outgoingArchiveV26?.started||(Date.now()-Math.floor(outgoingVoiceV13.currentTime)*1000);const before=callLog.length;const result=finishAudioBeforeV26(...args);if(active&&callLog.length>before){Object.assign(callLog[0],{recordId:'audio26:'+started,startedAt:started,audioSrc:src,date:`${new Date(started).getMonth()+1}월 ${new Date(started).getDate()}일`});saveStore('call-log',callLog)}return result};
for(const name of ['endCall','endIncomingCall']){
 const original=window[name];window[name]=function(...args){
  if(textCallV26){finishTextCallV26();return}
  const incoming=audioArchiveV26&&callStage==='connected'&&!outgoingActiveV13,before=callLog.length,entry=audioArchiveV26,result=original.apply(this,args);
  if(incoming&&callLog.length>before){Object.assign(callLog[0],{recordId:'audio26:'+entry.started,startedAt:entry.started,audioSrc:entry.src,date:`${new Date(entry.started).getMonth()+1}월 ${new Date(entry.started).getDate()}일`});audioArchiveV26=null;saveStore('call-log',callLog)}return result;
 };
}
const surfaceBeforeV26=setSurface;
setSurface=function(html,opts){if(textCallV26&&!html.includes('text-call-v26'))finishTextCallV26(false);surfaceBeforeV26(html,opts)};
for(const name of ['goHome','goBack','lockPhone','recentApps','openQuick']){const original=window[name];window[name]=function(...args){if(textCallV26)finishTextCallV26(false);return original.apply(this,args)}}
function openCallArchiveV26(recordId){
 const entry=callLog.find(row=>row.recordId===recordId);if(!entry)return;
 collectionSheetV25('통화 기록',`<p>${esc(entry.date)} · ${esc(entry.time)} · ${esc(durationV5(entry.seconds)||'0초')}</p>${entry.audioSrc?`<audio controls preload="metadata" src="${esc(entry.audioSrc)}" style="width:100%"></audio>`:(entry.transcript||[]).map(row=>`<p class="archived-line-v26">${esc(row.text)}</p>`).join('')}`);
}
function showCallArchivesV26(){collectionSheetV25('지난 통화',callLog.filter(row=>row.recordId).map(row=>`<button class="collection-item-v25" onclick="openCallArchiveV26('${esc(row.recordId)}')"><b>${esc(row.date)} · ${esc(row.time)}</b><small>${row.audioSrc?'음성 통화':'대화 기록'} · ${esc(durationV5(row.seconds)||'0초')}</small></button>`).join(''))}
const phoneBeforeV26=renderPhone;
renderPhone=function(tab='recent'){
 phoneBeforeV26(tab);if(tab==='keypad')return;
 const rows=[...callLog,...savedRecentV5].filter(r=>phoneFilterV5!=='missed'||r.type==='부재중');surface.querySelectorAll('.adot-date').forEach(el=>el.remove());let previous='';
 surface.querySelectorAll('.adot-history-row').forEach((el,i)=>{const row=rows[i];if(!row)return;const date=row.startedAt?`${new Date(row.startedAt).getMonth()+1}월 ${new Date(row.startedAt).getDate()}일`:row.date||`${phoneDate().getMonth()+1}월 ${phoneDate().getDate()}일`;if(date!==previous){el.insertAdjacentHTML('beforebegin',`<div class="adot-date">${esc(date)}</div>`);previous=date}if(row.recordId)el.insertAdjacentHTML('beforeend',`<button class="call-archive-btn-v26" aria-label="${esc(date+' '+row.time)} 통화 다시 보기" onclick="openCallArchiveV26('${esc(row.recordId)}')">기록</button>`)});
 surface.querySelector('.adot-filter')?.insertAdjacentHTML('afterend','<button class="call-archive-link-v26" onclick="showCallArchivesV26()">지난 통화 다시 보기 ›</button>');
};
function addStoryNoteV26(key,title,body,ms){
 if(readStore('story-note26:'+key,false))return;
 notes.push({title,body,date:`${new Date(ms).getMonth()+1}월 ${new Date(ms).getDate()}일`});saveStore('notes',notes);saveStore('story-note26:'+key,true);
}
const advanceWeekendBeforeV26=advanceRealtimeV22;
advanceRealtimeV22=function(now,away){
 advanceWeekendBeforeV26(now,away);
 for(const day of [24,25,26]){const ms=new Date(2026,9,day,9,0).getTime();if(now>=ms&&now<new Date(2026,10,1).getTime())addStoryNoteV26('concert-'+day,day===24?'첫콘 다음 날':day===25?'마지막 공연 전에':'사흘이 끝나고',day===24?'어제 좋았던 부분 잊지 말기.\n목 관리하고 물 자주 마시기.\n형 손은 괜찮은지 물어보기.':day===25?'마지막이라고 너무 아쉬워하지 말기.\n무대에서 형이랑 눈 맞추기.\n끝나면 고생했다고 꼭 말해주기.':'일어나면 형한테 연락하기.\n같이 밥 먹으면서 공연 얘기 마저 하기.\n사흘 동안 고마웠다고 말하기.',ms)}
};
const replyNotesBeforeV26=makeReply;
makeReply=function(id,text){const reply=replyNotesBeforeV26(id,text);if(id==='yechan'&&/같이|형이랑/.test(text)&&/고기|찜닭|밥|먹/.test(text)){const d=phoneDate(),key=`meal-${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;addStoryNoteV26(key,'형이랑 저녁',/찜닭/.test(text)?'형이랑 찜닭 먹기.':/고기/.test(text)?'형이랑 고기 먹기.':'형이랑 같이 밥 먹기.',Date.now())}return reply};
const calendarBeforeV26=renderCalendar;
renderCalendar=function(...args){calendarBeforeV26(...args);const today=surface.querySelector('.cal-today');if(today){today.textContent=phoneDate().getDate();today.onclick=()=>{calendarMonth=phoneDate().getMonth()+1;renderCalendar(phoneDate().getDate())}}};
selectedDay=phoneDate().getDate();
if(realtimeStateV22.created===realtimeNowV22&&concertDayV26(realtimeNowV22))saveCursorV22(new Date(new Date(realtimeNowV22).setHours(0,0,0,0)).getTime());
initializeRealtimeV22();
