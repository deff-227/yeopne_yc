/* Reliability fixes for drafts, queued replies, media lifecycle and date rollover. */
extrasV29.chatDrafts=extrasV29.chatDrafts&&typeof extrasV29.chatDrafts==='object'?extrasV29.chatDrafts:{};
extrasV29.replyQueue=Array.isArray(extrasV29.replyQueue)?extrasV29.replyQueue:[];
function captureDraftV31(){
 const input=$('#chatInput'),contact=input?.dataset.contactV31||activeChat;if(input&&contact){extrasV29.chatDrafts[contact]=input.value;saveExtrasV29()}
 const bubbleInput=$('#bubbleInput');if(bubbleInput){extrasV29.draft=bubbleInput.value;saveExtrasV29()}
}
// Preserve the draft and viewport when incoming messages refresh an open conversation.
let composingChatV31=false,chatRefreshDeferredV31=false;
const chatBeforeV31=renderChat;
renderChat=function(...args){
 if(composingChatV31&&document.activeElement===$('#chatInput')){chatRefreshDeferredV31=true;return}
 const old=$('#chatInput'),list=$('#chatScroll'),id=activeChat;
 const same=old?.dataset.contactV31===id,focused=same&&document.activeElement===old,selection=same?[old.selectionStart,old.selectionEnd]:null;
 const top=list?.scrollTop||0,nearBottom=!list||list.scrollHeight-list.clientHeight-top<65;
 if(same)captureDraftV31();
 const result=chatBeforeV31(...args),input=$('#chatInput');
 if(id&&unlocked&&!document.hidden&&!callStage&&!overlay.querySelector('.quick-panel')){const newest=(chats[id]||[]).filter(r=>!r[0]&&r[4]).at(-1)?.[4]||0;if(newest>(notificationReadV27[id]||0)){notificationReadV27[id]=newest;saveStore('notification-read-v27',notificationReadV27)}}
 if(input&&id){input.dataset.contactV31=id;input.addEventListener('compositionstart',()=>{composingChatV31=true});input.addEventListener('compositionend',()=>{composingChatV31=false;extrasV29.chatDrafts[id]=input.value;saveExtrasV29();if(chatRefreshDeferredV31){chatRefreshDeferredV31=false;renderChat()}});input.closest('form')?.addEventListener('submit',e=>{if(composingChatV31){e.preventDefault();e.stopImmediatePropagation()}},true);input.value=extrasV29.chatDrafts[id]||'';input.addEventListener('input',()=>{extrasV29.chatDrafts[id]=input.value;saveExtrasV29()});if(focused){input.focus({preventScroll:true});if(selection)input.setSelectionRange(...selection)}}
 if(same&&!nearBottom)requestAnimationFrame(()=>{const current=$('#chatScroll');if(current&&activeChat===id)current.scrollTop=top});
 return result;
};
// Retain older pending answers when several messages are sent in quick succession.
function perContactPendingV31(id,pending){if(!pending||typeof pending.text!=='string')return;pending.due=Number.isFinite(pending.due)?pending.due:Date.now()+2200}
const sendBeforeV31=sendChat;
sendChat=function(text){
 if(!activeChat||!String(text).trim()||composingChatV31)return;
 if(contactBlockV23()){denyContactV23();return}
 const id=activeChat,previous=realtimeStateV22.pending?.[id],before=chats[id]?.length||0;
 if(previous&&!extrasV29.replyQueue.some(e=>e.id===previous.id))extrasV29.replyQueue.push({...previous,contact:id});
 const input=$('#chatInput'),draft=extrasV29.chatDrafts[id]||'';extrasV29.chatDrafts[id]='';if(input)input.value='';
 const result=sendBeforeV31(text);
 if((chats[id]?.length||0)===before){extrasV29.chatDrafts[id]=draft;if(input)input.value=draft}
 const pending=realtimeStateV22.pending?.[id];if(pending){if(extrasV29.replyQueue.some(e=>e.id===pending.id))pending.id+=':'+Math.random().toString(36).slice(2);perContactPendingV31(id,pending);const prior=extrasV29.replyQueue.filter(e=>e.contact===id).reduce((n,e)=>Math.max(n,e.due),0);pending.due=Math.max(pending.due,prior+1300);persistRealtimeV22()}
 saveExtrasV29();return result;
};
const deliverBeforeV31=deliverPendingRepliesV22;
deliverPendingRepliesV22=function(now){
 let changed=false;
 extrasV29.replyQueue=extrasV29.replyQueue.filter(reply=>{
  if(!reply||typeof reply.contact!=='string'||typeof reply.text!=='string'||!Number.isFinite(reply.due)){changed=true;return false}
  if(reply.due>now)return true;
  if(contactBlockV23(reply.due)||(reply.contact==='yechan'&&sleepingV23(reply.due))){changed=true;return false}
  const rows=chats[reply.contact]||(chats[reply.contact]=[]);
  if(!rows.some(r=>r[3]===reply.id)){
   rows.push([0,reply.text,realtimeTimeV22(reply.due),reply.id,reply.due]);
   if(reply.contact==='yechan')allRead=!document.hidden&&unlocked&&activeChat===reply.contact&&screen==='kakao'&&!callStage;
   if(unlocked&&!document.hidden&&activeChat!==reply.contact)receiveBanner(reply.contact,reply.text);
  }
  changed=true;return false;
 });
 if(changed){saveExtrasV29();persistRealtimeV22();refreshUnreadBadges();if(!document.hidden&&screen==='kakao'&&activeChat)renderChat()}
 return deliverBeforeV31(now);
};
// Long presses cancel when the finger moves, avoiding reaction sheets during scrolling.
const reactionsBeforeV31=bindReactionsV29;
bindReactionsV29=function(){
 reactionsBeforeV31();surface.querySelectorAll('#chatScroll .message').forEach(el=>{
  let origin=null;const down=el.onpointerdown,cancel=el.onpointercancel;
  el.onpointerdown=e=>{origin={x:e.clientX,y:e.clientY};down?.(e)};
  el.onpointermove=e=>{if(origin&&Math.hypot(e.clientX-origin.x,e.clientY-origin.y)>9){cancel?.(e);origin=null}};
 });
};
// Save a running call once before leaving its screen or unloading the page.
function closeMediaV31(){
 if(refreshRingingV29||refreshConnectedV29)finishRefreshCallV29(refreshRingingV29?'부재중':'수신');
 else if(textCallV26)finishTextCallV26(false);
 else if(sleepDialV23)finishSleepDialV23(false);
 else if(outgoingActiveV13)finishOutgoingV13();
 else if(callStage==='connected')endIncomingCall();
 else if(callStage==='ringing')declineIncoming(true);
 surface.querySelectorAll('audio').forEach(a=>a.pause());overlay.querySelectorAll('audio').forEach(a=>a.pause());
}
const surfaceBeforeV31=setSurface;
setSurface=function(html,opts){
 captureDraftV31();composingChatV31=false;chatRefreshDeferredV31=false;
 if((refreshRingingV29||refreshConnectedV29)&&!html.includes('connected-call')&&!html.includes('incoming-call'))finishRefreshCallV29(refreshRingingV29?'부재중':'수신');
 return surfaceBeforeV31(html,opts);
};
for(const name of ['goHome','goBack','lockPhone','recentApps']){
 const original=window[name];window[name]=function(...args){captureDraftV31();if(callStage)closeMediaV31();return original.apply(this,args)};
}
function pauseRefreshTimerV31(){if(refreshTimerV29!==null){clearTimeout(refreshTimerV29);refreshTimerV29=null;refreshScheduledV29=false}}
window.addEventListener('pagehide',()=>{captureDraftV31();pauseRefreshTimerV31();closeMediaV31();persistRealtimeV22()});
document.addEventListener('visibilitychange',()=>{if(document.hidden){captureDraftV31();pauseRefreshTimerV31()}else if(unlocked)queueRefreshCallV29()});
// Keep the selected track after reload and the date label correct across midnight.
const storedSongV31=Number(readStore('selected-song-v29',-1));if(Number.isInteger(storedSongV31)&&SONGS[storedSongV31])currentSong=storedSongV31;
const clockBeforeV31=updatePhoneClock;
updatePhoneClock=function(...args){const result=clockBeforeV31(...args);if(screen==='lock')concertDDayV30();return result};
// Avoid layout shifts and honor reduced-motion preferences.
const styleV31=document.createElement('style');styleV31.textContent='.composer input{min-width:0}.chat-scroll{overflow-anchor:none;overscroll-behavior:contain}.reaction-v29{max-width:100%}.quick-panel input[type=range]{touch-action:pan-x}.lock-music-v29{box-sizing:border-box}.msg-favorite-v25{touch-action:manipulation}@media(prefers-reduced-motion:reduce){.typing-v29,.singing-wave i{animation:none!important}}';document.head.appendChild(styleV31);

// Clamp audio controls and consistently reuse the saved media-volume setting.
const volumeBeforeV31=setMediaVolumeV27;
setMediaVolumeV27=function(value){const n=Number(value);return volumeBeforeV31(Number.isFinite(n)?Math.max(0,Math.min(100,n)):65)};
function applyVolumeV31(){const volume=Math.max(0,Math.min(100,Number(mediaVolumeV27)||0))/100;callSong.volume=volume;outgoingVoiceV13.volume=volume;document.querySelectorAll('audio').forEach(a=>a.volume=volume)}
for(const name of ['acceptIncoming','startCall']){const original=window[name];window[name]=function(...args){const result=original.apply(this,args);applyVolumeV31();return result}}
document.addEventListener('play',event=>{if(event.target instanceof HTMLAudioElement)event.target.volume=Math.max(0,Math.min(100,Number(mediaVolumeV27)||0))/100},true);
// Keep one overlay active; Escape dismisses sheets without navigating away.
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!callStage&&overlay.children.length){overlay.innerHTML='';event.preventDefault()}});
const polishStyleV31=document.createElement('style');polishStyleV31.textContent='button:focus-visible,a:focus-visible,input:focus-visible{outline:2px solid #7da58c;outline-offset:2px}.artist-bubble,.bubble,.archived-line-v26{overflow-wrap:anywhere}.quick-notification-v27 p{overflow-wrap:anywhere}.collection-v25{overscroll-behavior:contain}button{-webkit-tap-highlight-color:transparent}';document.head.appendChild(polishStyleV31);
