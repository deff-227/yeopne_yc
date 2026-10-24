// Dedicated outgoing audio preserves the existing incoming-call song.
const outgoingVoiceV13=new Audio('assets/yechan-outgoing-call.mp3');outgoingVoiceV13.preload='metadata';
let outgoingActiveV13=false;
const startCallBeforeV13=startCall,endIncomingBeforeV13=endIncomingCall,endCallBeforeV13=endCall,surfaceBeforeV13=setSurface;
startCall=function(id){if(id!=='yechan'){startCallBeforeV13(id);return}if(outgoingActiveV13)return;clearCallTimers();clearTimeout(storyCallTimer);postCallMessageTimers.forEach(clearTimeout);postCallMessageTimers=[];callSong.pause();const recording=$('#recordAudioV12');if(recording)recording.pause();callStage='connected';storyStage='calling';callElapsed=0;callMuted=false;callSpeaker=true;activeChat=null;screen='call';outgoingActiveV13=true;overlay.innerHTML='';setSurface(`<section class="outgoing-call-v13 adot-call"><div class="adot-top"><span class="adot-mark">A.</span><span>에이닷 전화</span><span class="adot-secure">휴대전화 발신</span></div><div class="adot-person"><h2>${esc(CONTACTS.yechan.name)}</h2><p id="outgoingTimerV13">00:00</p></div><div class="adot-portrait">${profile('yechan')}</div><div class="outgoing-status-v13">통화 중</div><div class="connected-options"><button aria-label="통화 음소거" onclick="muteOutgoingV13(this)">${icon('recorder')}<span>음소거</span></button><button class="on" aria-label="통화 스피커" onclick="speakerOutgoingV13(this)">${icon('volume')}<span>스피커</span></button><button aria-label="통화 키패드" onclick="toast('통화 중입니다.')">${phoneNavIconV6('keypad')}<span>키패드</span></button></div><button class="hangup" aria-label="통화 종료" onclick="endCall()">${icon('phone')}</button><div id="outgoingFallbackV13" class="call-play-fallback"></div></section>`);outgoingVoiceV13.currentTime=0;outgoingVoiceV13.muted=false;outgoingVoiceV13.volume=.75;resumeOutgoingV13()};
function resumeOutgoingV13(){outgoingVoiceV13.play().then(()=>{const el=$('#outgoingFallbackV13');if(el)el.innerHTML=''}).catch(()=>{const el=$('#outgoingFallbackV13');if(el)el.innerHTML='<button onclick="resumeOutgoingV13()">눌러서 통화 음성 듣기</button>'})}
function muteOutgoingV13(button){callMuted=!callMuted;outgoingVoiceV13.muted=callMuted;button.classList.toggle('on',callMuted)}
function speakerOutgoingV13(button){callSpeaker=!callSpeaker;outgoingVoiceV13.volume=callSpeaker?.75:.32;button.classList.toggle('on',callSpeaker)}
outgoingVoiceV13.addEventListener('timeupdate',()=>{if(!outgoingActiveV13)return;callElapsed=Math.floor(outgoingVoiceV13.currentTime);const el=$('#outgoingTimerV13');if(el)el.textContent=recordingTimeV12(callElapsed)});
function finishOutgoingV13(returnToPhone=true){
 if(!outgoingActiveV13)return;
 outgoingActiveV13=false;outgoingVoiceV13.pause();callElapsed=Math.floor(outgoingVoiceV13.currentTime);outgoingVoiceV13.currentTime=0;clearCallTimers();
 callLog.unshift({id:'yechan',type:'발신',time:phoneTime(),seconds:callElapsed});saveStore('call-log',callLog);callStage=null;storyStage='finished';overlay.innerHTML='';
 postCallMessageTimers.forEach(clearTimeout);postCallMessageTimers=[];
 postCallMessageTimers.push(setTimeout(()=>{const text='목소리 들으니까 좋다 ㅎㅎ';chats.yechan.push([0,text,phoneTime()]);saveStore('chats',chats);if(activeChat==='yechan'&&screen==='kakao'){allRead=true;saveStore('allRead',true);renderChat();refreshUnreadBadges()}else receiveBanner('yechan',text)},3000));
 if(returnToPhone)renderPhone()
}
outgoingVoiceV13.addEventListener('ended',()=>finishOutgoingV13());
outgoingVoiceV13.addEventListener('error',()=>{if(outgoingActiveV13)toast('음성을 불러오지 못했습니다. 통화를 종료하고 다시 걸어 주세요.')});
endIncomingCall=function(){if(outgoingActiveV13)finishOutgoingV13();else endIncomingBeforeV13()};
endCall=function(){if(outgoingActiveV13)finishOutgoingV13();else endCallBeforeV13()};
setSurface=function(html,opts){if(outgoingActiveV13&&!html.includes('outgoing-call-v13'))finishOutgoingV13(false);surfaceBeforeV13(html,opts)};
