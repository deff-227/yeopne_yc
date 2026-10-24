/* Daytime outgoing calls become Kakao follow-ups; recordings can be shared in chat. */
const outgoingBeforeV24=startCall;
startCall=function(id){
 if(id!=='yechan'||phoneDate().getHours()<8||phoneDate().getHours()>=22){outgoingBeforeV24(id);return}
 if(denyContactV23())return;
 clearTimeout(storyCallTimer);storyStage='finished';persistRealtimeV22();
 renderPhone();toast('연결되지 않았습니다. 잠시 후 카카오톡을 확인해 주세요.');
 const now=Date.now();
 if(now-(realtimeStateV22.lastRehearsalCall||0)<30000)return;
 realtimeStateV22.lastRehearsalCall=now;
 const event={dir:0,text:'헉 연습 중이어서 못 봐따ㅠㅠ 무슨 일 이써?',ms:now+3000,id:'rehearsal-call:'+now};
 (realtimeStateV22.dayCall||(realtimeStateV22.dayCall=[])).push(event);
 callLog.unshift({id:'yechan',type:'발신',time:phoneTime(),seconds:0,note:'연습 중 · 미연결'});
 saveStore('call-log',callLog);persistRealtimeV22();renderPhone();
 setTimeout(()=>deliverDayCallV24(Date.now()),3000);
};
const replyBeforeV24=makeReply;
makeReply=function(id,text){
 if(id==='yechan'){
  if(/^\[음성 녹음:/.test(text))return '뭐야 너무 좋다아 ㅎㅎ';
  if(/보고싶어서/.test(normalizeText(text).replace(/\s/g,'')))return '나두 ㅎㅎ 연습 끝나고 연락할게';
 }
 return replyBeforeV24(id,text);
};
function recordingKeyV24(record){return String(record.id||record.src||record.name)}
function sharedRecordingV24(text){
 const match=text.match(/^\[음성 녹음:([^\]]+)\]$/);if(!match)return null;
 try{const key=decodeURIComponent(match[1]);return RECORDINGS.find(record=>recordingKeyV24(record)===key)||null}catch{return null}
}
const messageBeforeV24=msgHTML;
msgHTML=function(message,id){
 const recording=sharedRecordingV24(message[1]);if(!recording?.src)return messageBeforeV24(message,id);
 return `<div class="message ${message[0]?'mine':''}">${message[0]?'':profile(id)}<div class="msg-body"><div class="bubble-line"><div class="bubble" style="max-width:230px"><b style="display:block;margin-bottom:7px">🎙 ${esc(recording.name)}</b><audio class="shared-recording-v24" controls preload="none" src="${esc(recording.src)}" aria-label="${esc(recording.name)} 공유 녹음 재생" style="display:block;width:210px;max-width:100%;height:38px"></audio><button type="button" aria-label="공유 녹음 재생 또는 일시정지" onclick="toggleSharedRecordingV24(this)" style="margin:6px 0;padding:5px 10px;border:0;border-radius:8px">▶ 재생</button><small>${esc(recording.length||'음성 녹음')}</small></div><span class="msg-time">${esc(message[2])}</span></div></div></div>`;
};
function shareRecordingToYechanV24(index){
 if(denyContactV23())return;
 const record=RECORDINGS[index];if(!record?.src){toast('재생 가능한 음성 파일이 있는 녹음만 보낼 수 있습니다.');return}
 openChat('yechan');
 sendChat('[음성 녹음:'+encodeURIComponent(recordingKeyV24(record))+']');
}
const recordingBeforeV24=openRecording;
openRecording=function(index){
 recordingBeforeV24(index);if(!RECORDINGS[index]?.src)return;
 const button=surface.querySelector('.record-edit-v12');
 if(button)button.insertAdjacentHTML('beforebegin',`<button class="record-edit-v12" aria-label="예찬이에게 녹음 보내기" onclick="shareRecordingToYechanV24(${index})">카카오톡 · 예찬이형♥에게 보내기</button>`);
};
const surfaceBeforeV24=setSurface;
setSurface=function(html,opts){surface.querySelectorAll('audio.shared-recording-v24').forEach(audio=>audio.pause());surfaceBeforeV24(html,opts)};
const incomingBeforeV24=showIncomingCall;
showIncomingCall=function(){surface.querySelectorAll('audio.shared-recording-v24').forEach(audio=>audio.pause());incomingBeforeV24()};

function toggleSharedRecordingV24(button){
 const audio=button.parentElement.querySelector('audio');if(!audio)return;
 if(!audio.paused){audio.pause();button.textContent='▶ 재생';return}
 document.querySelectorAll('audio.shared-recording-v24').forEach(other=>{if(other!==audio)other.pause()});
 audio.play().then(()=>{button.textContent='Ⅱ 일시정지';audio.onended=()=>button.textContent='▶ 재생'}).catch(()=>toast('녹음 재생 버튼을 다시 눌러 주세요.'));
}
