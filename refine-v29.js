/* Small daily interactions. All personal state stays in the current browser. */
const extrasV29=readStore('little-extras-v29',{reactions:{},draft:'',released:[],missedAt:0});
extrasV29.reactions??={};extrasV29.released??=[];
function saveExtrasV29(){saveStore('little-extras-v29',extrasV29)}
function scheduleLittleMessageV29(text,delay=3000,key='little29:'+Date.now()){
 if((realtimeStateV22.dayCall||[]).some(e=>e.id===key))return;
 const event={dir:0,text,ms:nextFreeTimeV25(Date.now()+delay),id:key};
 (realtimeStateV22.dayCall||(realtimeStateV22.dayCall=[])).push(event);persistRealtimeV22();
 setTimeout(()=>deliverDayCallV24(Date.now()),Math.max(0,event.ms-Date.now()));
}
// A genuine reload gets one direct incoming call, without replaying the intro chat.
let refreshTimerV29=null;
let refreshPendingV29=performance.getEntriesByType('navigation')[0]?.type==='reload',refreshRingingV29=false,refreshConnectedV29=false,refreshStartedV29=0,refreshScheduledV29=false;
function queueRefreshCallV29(){
 if(!refreshPendingV29||refreshScheduledV29)return;
 refreshScheduledV29=true;clearTimeout(storyCallTimer);storyStage='finished';persistRealtimeV22();
 refreshTimerV29=setTimeout(()=>{refreshTimerV29=null;refreshScheduledV29=false;if(!unlocked||document.hidden||callStage)return;refreshPendingV29=false;refreshRingingV29=true;refreshStartedV29=Date.now();incomingBeforeV23();},3000);
}
const queueBeforeV29=queueIncomingCall;
queueIncomingCall=function(){if(refreshPendingV29){queueRefreshCallV29();return}return queueBeforeV29()};
const homeBeforeV29=goHome;
goHome=function(...args){const result=homeBeforeV29(...args);if(unlocked)queueRefreshCallV29();return result};
const showBeforeV29=showIncomingCall;
showIncomingCall=function(){if(refreshPendingV29||refreshRingingV29||refreshConnectedV29)return;return showBeforeV29()};
const acceptBeforeV29=acceptIncoming;
acceptIncoming=function(){
 if(!refreshRingingV29){if(callStage!=='ringing')return;return acceptBeforeV29()}
 if(callStage!=='ringing')return;
 refreshRingingV29=false;refreshConnectedV29=true;refreshStartedV29=Date.now();storyStage='calling';
 callSong.src=firstCallAudioV23;incomingDayCallV24=false;acceptBeforeV23();
};
function finishRefreshCallV29(type='수신'){
 if(!refreshRingingV29&&!refreshConnectedV29)return;
 clearCallTimers();callSong.pause();callSong.currentTime=0;
 const started=refreshStartedV29||Date.now();
 callLog.unshift({id:'yechan',type,time:realtimeTimeV22(started),seconds:refreshConnectedV29?Math.max(0,Math.floor((Date.now()-started)/1000)):0,startedAt:started,date:realtimeDateLabelV22(started),...(refreshConnectedV29?{recordId:'refresh29:'+started,audioSrc:firstCallAudioV23}:{})});
 saveStore('call-log',callLog);refreshRingingV29=false;refreshConnectedV29=false;refreshStartedV29=0;callStage=null;storyStage='finished';overlay.innerHTML='';persistRealtimeV22();
}
for(const name of ['endIncomingCall','endCall','declineIncoming','finishOutgoingV13']){
 const original=window[name];window[name]=function(...args){
  if(refreshRingingV29||refreshConnectedV29){finishRefreshCallV29(name==='declineIncoming'?(args[0]?'부재중':'거절'):'수신');return}
  const wasConnected=callStage==='connected',before=callLog.length,result=original.apply(this,args);
  if(name!=='declineIncoming'&&wasConnected&&callLog.length>before&&!contactBlockV23()&&!sleepingV23()&&Date.now()-(extrasV29.lastPostCall||0)>1000){
   extrasV29.lastPostCall=Date.now();saveExtrasV29();
   const h=phoneDate().getHours(),texts=h>=22||h<2?['아까 하려던 말 까먹었다ㅋㅋ 내일 얘기해 줄게','목소리 들으니까 좀 괜찮아졌어. 너도 푹 쉬어']:['아까 하려던 말 까먹었다ㅋㅋ 이따 얘기해 줄게','목소리 들으니까 힘난다. 이따 보자 엽아'];
   scheduleLittleMessageV29(texts[new Date().getDate()%texts.length],18000);
  }
  return result;
 };
}
const startBeforeV29=startCall;
startCall=function(id){
 const now=Date.now(),repeated=now-extrasV29.missedAt<120000,before=callLog.length;const result=startBeforeV29(id);
 if(id==='yechan'&&repeated&&callLog.length===before&&!callStage&&!contactBlockV23()&&!sleepingV23()){scheduleLittleMessageV29('급한 거야? 잠깐 나갈까?');return result}
 if(id==='yechan'&&callLog.length>before&&callLog[0]?.seconds===0&&!contactBlockV23()&&!sleepingV23()){
  extrasV29.missedAt=now;saveExtrasV29();const event=realtimeStateV22.dayCall?.find(e=>e.id==='rehearsal-call:'+now)||realtimeStateV22.dayCall?.filter(e=>e.id?.startsWith('rehearsal-call:')).at(-1);
  if(repeated){if(event&&event.ms>now){event.text='급한 거야? 잠깐 나갈까?';persistRealtimeV22()}else scheduleLittleMessageV29('급한 거야? 잠깐 나갈까?')}
 }
 return result;
};
// Typing indicators and longer replies split into natural bubbles.
function syncTypingV29(){
 const list=$('#chatScroll');if(!list)return;
 surface.querySelector('.typing')?.remove();const pending=realtimeStateV22.pending?.[activeChat],old=$('#typingV29');
 if(pending&&pending.due>Date.now()){
  if(!old){const el=document.createElement('div');el.id='typingV29';el.className='typing-v29';el.setAttribute('role','status');el.textContent=(CONTACTS[activeChat]?.name||'상대방')+' 입력 중…';list.appendChild(el);list.scrollTop=list.scrollHeight}
 }else old?.remove();
}
const renderChatBeforeV29=renderChat;
renderChat=function(...args){renderChatBeforeV29(...args);syncTypingV29();bindReactionsV29()};
const sendBeforeV29=sendChat;
sendChat=function(text){
 const id=activeChat,before=chats[id]?.length||0,result=sendBeforeV29(text),pending=realtimeStateV22.pending?.[id];
 if((chats[id]?.length||0)===before)return result;
 if(pending){pending.due=Date.now()+2200;persistRealtimeV22();setTimeout(()=>deliverPendingRepliesV22(Date.now()),2250)}
 syncTypingV29();return result;
};
const pendingBeforeV29=deliverPendingRepliesV22;
deliverPendingRepliesV22=function(now){
 for(const [id,p] of Object.entries(realtimeStateV22.pending||{})){
  if(p.due>now||p.text.length<20||contactBlockV23(p.due)||sleepingV23(p.due))continue;
  if(p.splitV29)continue;
  const match=p.text.match(/^(.+?[.!?。]|.+?ㅎㅎ|.+?ㅋㅋ)\s+(.+)$/);
  if(match){p.splitV29=true;p.text=match[1];const e={dir:0,text:match[2],ms:p.due+1100,id:p.id+':tail29'};if(id==='yechan')(realtimeStateV22.dayCall||(realtimeStateV22.dayCall=[])).some(x=>x.id===e.id)||(realtimeStateV22.dayCall.push(e));else p.text=match[0];}
 }
 const result=pendingBeforeV29(now);syncTypingV29();return result;
};
function reactionKeyV29(id,row,i){return messageIdentityV25(id,row,i)}
function setReactionV29(id,index,value){const row=chats[id]?.[index];if(!row)return;const key=reactionKeyV29(id,row,index);if(extrasV29.reactions[key]===value)delete extrasV29.reactions[key];else extrasV29.reactions[key]=value;saveExtrasV29();overlay.innerHTML='';renderChat()}
function reactionMenuV29(id,index){collectionSheetV25('메시지 반응',`<div class="reaction-options-v29">${['♥','😂','👍'].map(v=>`<button onclick="setReactionV29('${id}',${index},'${v}')" aria-label="${v} 반응">${v}</button>`).join('')}</div>`)}
function bindReactionsV29(){
 const messages=surface.querySelectorAll('#chatScroll .message');messages.forEach((el,i)=>{const row=chats[activeChat]?.[i];if(!row)return;let timer;const id=activeChat;el.oncontextmenu=e=>{e.preventDefault();reactionMenuV29(id,i)};el.onpointerdown=e=>{if(e.target.closest('button,a,audio,input'))return;timer=setTimeout(()=>reactionMenuV29(id,i),550)};for(const name of ['onpointerup','onpointercancel','onpointerleave'])el[name]=()=>clearTimeout(timer);const reaction=extrasV29.reactions[reactionKeyV29(id,row,i)];if(reaction){const badge=document.createElement('span');badge.className='reaction-v29';badge.textContent=reaction;el.querySelector('.msg-body')?.appendChild(badge)}});
}
const replyBeforeV29=makeReply;
makeReply=function(id,text){const reply=replyBeforeV29(id,text);if(id==='yechan'&&/사랑|고마워|보고 싶|보고싶/.test(text)){const rows=chats[id],row=rows?.at(-1);if(row?.[0]===1){extrasV29.reactions[reactionKeyV29(id,row,rows.length-1)]='♥';saveExtrasV29()}}return reply};
// Bubble drafts persist across navigation and reload, and clear only after sending.
const bubbleRenderBeforeV29=renderBubble;
renderBubble=function(...args){bubbleRenderBeforeV29(...args);const input=$('#bubbleInput');if(input){input.value=extrasV29.draft||'';input.addEventListener('input',()=>{extrasV29.draft=input.value;saveExtrasV29()})}};
const bubbleSendBeforeV29=sendBubble;
sendBubble=function(...args){if(contactBlockV23())return bubbleSendBeforeV29(...args);const before=bubble.length;const result=bubbleSendBeforeV29(...args);if(bubble.length>before){extrasV29.draft='';saveExtrasV29();const input=$('#bubbleInput');if(input)input.value=''}return result};
// One selected track appears consistently on the lock screen and in quick settings.
function selectedTrackV29(){return SONGS[readStore('selected-song-v29',-1)]||null}
function syncTrackV29(){
 const song=selectedTrackV29();if(!song)return;
 const quick=overlay.querySelector('[aria-label="LUCY Opening 열기"]');if(quick){quick.setAttribute('aria-label','선택한 음악 열기');quick.innerHTML=`<img src="${esc(coverImg(song))}" alt="앨범"><span><small>YouTube Music</small><b>${esc(song.title)}</b><small>${esc(song.artist)}</small></span><strong>▷</strong>`;quick.onclick=()=>{overlay.innerHTML='';if(unlocked)openPlayer(SONGS.indexOf(song));else beginUnlock('music')}}
 const lock=surface.querySelector('.lock-screen');if(lock&&!$('#lockMusicV29'))lock.insertAdjacentHTML('beforeend',`<button id="lockMusicV29" class="lock-music-v29" onclick="beginUnlock('music')"><img src="${esc(coverImg(song))}" alt="앨범"><span>${esc(song.title)}<small>${esc(song.artist)}</small></span><b>▷</b></button>`);
}
const playerBeforeV29=openPlayer;
openPlayer=function(i){saveStore('selected-song-v29',(i+SONGS.length)%SONGS.length);return playerBeforeV29(i)};
for(const name of ['renderLock','openQuick']){const original=window[name];window[name]=function(...args){const r=original.apply(this,args);syncTrackV29();return r}}
// Concert preparation notes complete after each performance.
function updateMemoriesV29(now=Date.now()){
 for(const day of [23,24,25]){
  const end=concertWindowV26(new Date(2026,9,day).getTime()).end,release=new Date(2026,9,day,Math.floor(end),15).getTime(),key='concert29:'+day;
  if(now<release||extrasV29.released.includes(key))continue;
  const prep=notes.find(n=>n.title===`${day}일 공연 준비`);if(prep){prep.body='✓ 인이어 확인\n✓ 기타 줄 확인\n✓ 물 챙기기\n✓ 오늘 공연 완료\n오늘도 함께해서 좋았다.';saveStore('notes',notes)}else addStoryNoteV26('checklist29:'+day,`${day}일 공연 준비`, '✓ 인이어 확인\n✓ 기타 줄 확인\n✓ 물 챙기기\n✓ 오늘 공연 완료\n오늘도 함께해서 좋았다.',release);
  if(extrasV29.released.includes(key))continue;
  extrasV29.released.push(key);saveExtrasV29();
 }
 const d=phoneDate();if(concertDayV26(now)&&!extrasV29.released.includes('concert29:'+d.getDate()))addStoryNoteV26('prep29:'+d.getDate(),`${d.getDate()}일 공연 준비`,'□ 인이어 확인\n□ 기타 줄 확인\n□ 물 챙기기\n첫 곡 급하게 들어가지 말기.',now);
}
updateMemoriesV29();setInterval(syncTypingV29,1000);setInterval(()=>updateMemoriesV29(),30000);
const styleV29=document.createElement('style');styleV29.textContent=`.typing-v29{font-size:11px;color:#65757c;padding:10px 16px;animation:pulse29 1.2s infinite}.reaction-v29{display:block;width:max-content;padding:2px 8px;background:#fff9;border:1px solid #d3d9dc;border-radius:14px;margin:3px 0;font-size:12px}.reaction-options-v29{display:flex;gap:16px;justify-content:center}.reaction-options-v29 button{font-size:28px;padding:14px;border:0;border-radius:18px;background:#f2f5f0}.lock-music-v29{position:absolute;bottom:115px;left:8%;width:84%;border:1px solid #ffffff40;background:#20352c99;backdrop-filter:blur(18px);border-radius:20px;display:flex;align-items:center;gap:12px;padding:12px;color:white;text-align:left}.lock-music-v29 img{width:40px;height:40px;border-radius:9px;object-fit:cover}.lock-music-v29 span{flex:1;font-size:12px}.lock-music-v29 small{display:block;font-size:10px;opacity:.7;margin-top:4px}@keyframes pulse29{50%{opacity:.5}}`;document.head.appendChild(styleV29);
