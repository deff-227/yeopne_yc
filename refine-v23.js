/* Concert-day communication rules and time-selected call media. */
const firstCallAudioV23='assets/yechan-call.mp3',secondCallAudioV23='assets/yechan-outgoing-call.mp3';
function selectedCallAudioV23(){return phoneDate().getHours()>=22||phoneDate().getHours()<2?secondCallAudioV23:firstCallAudioV23}
function denyContactV23(){const reason=contactBlockV23();if(!reason)return false;showInfo('잠깐만',reason);return true}
for(const name of ['sendChat','sendBubble','sendSMS','shareToChat']){
 const original=window[name];window[name]=function(...args){
  if(contactBlockV23()){if(name==='sendSMS')args[0]?.preventDefault();denyContactV23();return}
  const result=original.apply(this,args);
  if(name==='sendBubble'&&bubble.at(-1)?.[0]){const row=bubble.at(-1);row[4]=Date.now();row[3]='bubble-typed:'+row[4];saveStore('bubble',bubble);if(screen==='bubble')renderBubble(bubbleTab)}
  return result;
 };
}
const incomingBeforeV23=showIncomingCall,acceptBeforeV23=acceptIncoming;
showIncomingCall=function(){if(contactBlockV23()||sleepingV23()){clearTimeout(storyCallTimer);storyStage='finished';persistRealtimeV22();return}incomingBeforeV23()};
acceptIncoming=function(){if(denyContactV23())return;if(sleepingV23()){declineIncoming();return}callSong.src=selectedCallAudioV23();acceptBeforeV23()};
let sleepDialV23=null;
function ringbackV23(){
 if(!soundOn||!sleepDialV23)return;
 try{primeNoticeAudioV17();const ctx=noticeAudioV17.context;if(!ctx||ctx.state!=='running')return;
  for(const hz of [440,480]){const osc=ctx.createOscillator(),gain=ctx.createGain(),now=ctx.currentTime;osc.frequency.value=hz;gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.018,now+.03);gain.gain.setValueAtTime(.018,now+.85);gain.gain.exponentialRampToValueAtTime(.0001,now+1);osc.connect(gain);gain.connect(ctx.destination);noticeAudioV17.nodes.set(osc,'ringback');osc.onended=()=>{noticeAudioV17.nodes.delete(osc);osc.disconnect();gain.disconnect()};osc.start();osc.stop(now+1.05)}
 }catch{}
}
function finishSleepDialV23(returnToPhone=true){
 if(!sleepDialV23)return;
 clearTimeout(sleepDialV23.timeout);clearInterval(sleepDialV23.ring);sleepDialV23=null;stopNoticeV17('ringback');callStage=null;storyStage='finished';
 callLog.unshift({id:'yechan',type:'발신',time:phoneTime(),seconds:0,note:'응답 없음'});saveStore('call-log',callLog);persistRealtimeV22();
 if(returnToPhone){renderPhone();toast('응답이 없어 통화가 종료되었습니다.')}
}
function startSleepDialV23(){
 if(sleepDialV23)return;
 clearTimeout(storyCallTimer);clearCallTimers();postCallMessageTimers.forEach(clearTimeout);postCallMessageTimers=[];
 callSong.pause();outgoingVoiceV13.pause();const recording=$('#recordAudioV12');if(recording)recording.pause();
 outgoingActiveV13=false;callStage='dialing';storyStage='finished';activeChat=null;screen='call';overlay.innerHTML='';
 sleepDialV23={};
 setSurface(`<section class="outgoing-call-v13 adot-call sleep-call-v23"><div class="adot-top"><span class="adot-mark">A.</span><span>에이닷 전화</span><span>휴대전화 발신</span></div><div class="adot-person"><h2>${esc(CONTACTS.yechan.name)}</h2><p>연결 중...</p></div><div class="adot-portrait">${profile('yechan')}</div><div class="outgoing-status-v13">신호가 가고 있습니다</div><div class="connected-options"><button onclick="toast('연결을 기다리고 있습니다.')">${icon('volume')}<span>스피커</span></button></div><button class="hangup" aria-label="통화 종료" onclick="finishSleepDialV23()">${icon('phone')}</button></section>`);
 ringbackV23();sleepDialV23.ring=setInterval(ringbackV23,4000);sleepDialV23.timeout=setTimeout(()=>finishSleepDialV23(),30000);persistRealtimeV22();
}
const outgoingBeforeV23=startCall;
startCall=function(id){
 if(denyContactV23())return;
 if(id!=='yechan'){outgoingBeforeV23(id);return}
 if(sleepingV23()){startSleepDialV23();return}
 if(sleepDialV23)finishSleepDialV23(false);
 outgoingVoiceV13.src=selectedCallAudioV23();
 // Use the outgoing screen directly after the first Kakao event has been queued.
 if(storyStage==='locked')queueIncomingCall();
 startCallBeforeV14(id);
 const btn=surface.querySelector('[aria-label="통화 키패드"]');if(btn)btn.onclick=callKeypadV15;
};
const surfaceBeforeV23=setSurface;
setSurface=function(html,opts){if(sleepDialV23&&!html.includes('sleep-call-v23'))finishSleepDialV23(false);surfaceBeforeV23(html,opts)};
for(const name of ['endCall','endIncomingCall','goHome','goBack','lockPhone','recentApps','openQuick']){
 const original=window[name];window[name]=function(...args){if(sleepDialV23){finishSleepDialV23(name==='endCall'||name==='endIncomingCall');if(name==='endCall'||name==='endIncomingCall')return}return original.apply(this,args)};
}
// Calls end at the start of rehearsal/performance, without a post-call conversation.
let lastContactBlockV23=contactBlockV23();
setInterval(()=>{
 const reason=contactBlockV23();
 if(reason&&!lastContactBlockV23){
  clearTimeout(storyCallTimer);
  if(sleepDialV23)finishSleepDialV23();
  else if(outgoingActiveV13)finishOutgoingV13();
  else if(callStage==='connected')endIncomingCall();
  else if(callStage==='ringing'){clearCallTimers();callStage=null;overlay.innerHTML=''}
  postCallMessageTimers.forEach(clearTimeout);postCallMessageTimers=[];
  for(const timer of Object.values(replyTimers))clearTimeout(timer);
  replyTimers={};realtimeStateV22.pending={};storyStage='finished';persistRealtimeV22();
 }
 lastContactBlockV23=reason;
},1000);
const bubbleBeforeV23=renderBubble;
renderBubble=function(tab=bubbleTab){
 bubbleBeforeV23(tab);const list=$('#bubbleScroll');if(!list)return;
 list.querySelectorAll('.bubble-date,.chat-date').forEach(el=>el.remove());
 const messages=Array.from(list.querySelectorAll('.artist-message,.artist-outgoing')),rows=bubble.filter(row=>row[0]);let previous='';
 messages.forEach((element,i)=>{const row=rows[i],date=row?.[4]?realtimeDateLabelV22(row[4]):'이전 메시지';if(date!==previous){const label=document.createElement('div');label.className='bubble-date';label.textContent=date;list.insertBefore(label,element);previous=date}});
};
/* The first call is a daytime conversation, including when it ends after 22:00. */
let incomingDayCallV24=false;
const acceptDayBeforeV24=acceptIncoming;
acceptIncoming=function(){
 incomingDayCallV24=callStage==='ringing'&&!contactBlockV23()&&!sleepingV23()&&selectedCallAudioV23()===firstCallAudioV23;
 return acceptDayBeforeV24();
};
const incomingEndBeforeV24=endIncomingCall;
endIncomingCall=function(){
 const dayCall=incomingDayCallV24&&callStage==='connected'&&!outgoingActiveV13;
 const result=incomingEndBeforeV24();incomingDayCallV24=false;
 if(!dayCall)return result;
 postCallMessageTimers.forEach(clearTimeout);postCallMessageTimers=[];
 if(contactBlockV23())return result;
 const ended=Date.now();
 realtimeStateV22.dayCall=[
  {dir:0,text:'보고싶다아... 오는 중이야?',ms:ended+3000,id:'daycall:'+ended+':0'},
  {dir:1,text:'곧 도착할 것 같은데',ms:ended+4200,id:'daycall:'+ended+':1'},
  {dir:0,text:'알아써어 이따 봐',ms:ended+5400,id:'daycall:'+ended+':2'}
 ];
 persistRealtimeV22();
 for(const event of realtimeStateV22.dayCall)postCallMessageTimers.push(setTimeout(()=>deliverDayCallV24(Date.now()),event.ms-ended));
 return result;
};
